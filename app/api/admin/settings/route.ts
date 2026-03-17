import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

const SETTINGS_DOC_ID = "main";

/** Campos del documento "main" en la colección settings. */
const FIELDS = [
  "business_name",
  "whatsapp",
  "email",
  "address",
  "city",
  "opening_hours",
  "instagram",
  "facebook",
] as const;

export async function GET() {
  try {
    const db = getAdminFirestore();
    const doc = await db.collection("settings").doc(SETTINGS_DOC_ID).get();
    return NextResponse.json(doc.exists ? doc.data() : null);
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data: Record<string, string | null> = {};
    for (const key of FIELDS) {
      const v = body[key];
      data[key] = v === undefined || v === null ? null : String(v).trim() || null;
    }
    const db = getAdminFirestore();
    await db.collection("settings").doc(SETTINGS_DOC_ID).set(
      { ...data, updated_at: FieldValue.serverTimestamp() },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
