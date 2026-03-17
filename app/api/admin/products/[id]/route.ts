import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();
    const productRef = db.collection("products").doc(id);
    const imagesSnap = await productRef.collection("images").get();
    await Promise.all(imagesSnap.docs.map((d) => d.ref.delete()));
    await productRef.delete();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { image_urls, ...rest } = body;
    const db = getAdminFirestore();
    const productRef = db.collection("products").doc(id);
    await productRef.update({
      ...rest,
      updated_at: FieldValue.serverTimestamp(),
    });
    if (Array.isArray(image_urls)) {
      const snap = await productRef.collection("images").get();
      await Promise.all(snap.docs.map((d) => d.ref.delete()));
      for (let i = 0; i < image_urls.length; i++) {
        await productRef.collection("images").add({ url: image_urls[i], sort_order: i });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
