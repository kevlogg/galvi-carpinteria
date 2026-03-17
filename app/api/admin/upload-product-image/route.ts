import { NextResponse } from "next/server";
import { getAdminStorage, getStorageBucketName } from "@/lib/firebase/admin";

/**
 * Sube imágenes de producto a Firebase Storage (ruta product-images/).
 * Devuelve las URLs públicas para enviar en el body al crear/editar producto.
 */
function sanitizeFileName(name: string): string {
  const base = (name || "image").replace(/^.*[/\\]/, "").trim() || "image";
  return base.slice(0, 100).replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    if (!files.length) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    const bucketName = getStorageBucketName();
    if (!bucketName) {
      console.error("upload-product-image: No bucket name. Set FIREBASE_STORAGE_BUCKET in .env");
      return NextResponse.json(
        { error: "Faltan configuración de Storage. Agregá FIREBASE_STORAGE_BUCKET en .env." },
        { status: 500 }
      );
    }
    const storage = getAdminStorage();
    const bucket = storage.bucket(bucketName);

    const urls: string[] = [];

    for (const file of files) {
      const safeName = sanitizeFileName(file.name);
      const ext = safeName.includes(".") ? safeName.slice(safeName.lastIndexOf(".")) : "";
      const name = `product-images/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
      const buf = Buffer.from(await file.arrayBuffer());
      const blob = bucket.file(name);
      await blob.save(buf, {
        contentType: file.type || "image/jpeg",
        metadata: { cacheControl: "public, max-age=31536000" },
      });
      try {
        await blob.makePublic();
      } catch (makePublicErr) {
        console.warn("upload-product-image makePublic failed (bucket may use IAM):", makePublicErr);
      }
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(name)}?alt=media`;
      urls.push(publicUrl);
    }

    return NextResponse.json({ urls });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("upload-product-image error:", e);
    const is404 = message.includes("404") || message.includes("does not exist");
    return NextResponse.json(
      {
        error: is404
          ? "El bucket de Storage no existe. En Firebase Console → Storage revisá el nombre del bucket y definí FIREBASE_STORAGE_BUCKET en .env con ese valor exacto."
          : "Upload failed",
        detail: message,
      },
      { status: 500 }
    );
  }
}
