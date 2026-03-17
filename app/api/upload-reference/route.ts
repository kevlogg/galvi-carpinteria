import { NextResponse } from "next/server";
import { getAdminStorage, getStorageBucketName } from "@/lib/firebase/admin";

/**
 * Sube imágenes de referencia de solicitudes a medida a Firebase Storage.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    if (!files.length) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    const bucketName = getStorageBucketName();
    if (!bucketName) {
      return NextResponse.json(
        { error: "Faltan configuración de Storage. Agregá FIREBASE_STORAGE_BUCKET en .env." },
        { status: 500 }
      );
    }
    const storage = getAdminStorage();
    const bucket = storage.bucket(bucketName);
    const urls: string[] = [];

    for (const file of files) {
      const name = `refs/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const buf = Buffer.from(await file.arrayBuffer());
      const blob = bucket.file(name);
      await blob.save(buf, {
        contentType: file.type,
        metadata: { cacheControl: "public, max-age=31536000" },
      });
      await blob.makePublic();
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(name)}?alt=media`;
      urls.push(publicUrl);
    }

    return NextResponse.json({ urls });
  } catch (e) {
    console.error("upload-reference error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
