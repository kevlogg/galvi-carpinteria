import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image_urls, ...rest } = body;
    const slug = rest.slug || String(rest.title).toLowerCase().replace(/\s+/g, "-");
    const db = getAdminFirestore();
    const ref = await db.collection("products").add({
      ...rest,
      slug,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    });
    const urls = Array.isArray(image_urls) ? image_urls as string[] : [];
    for (let i = 0; i < urls.length; i++) {
      await ref.collection("images").add({ url: urls[i], sort_order: i });
    }
    return NextResponse.json({ id: ref.id });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
