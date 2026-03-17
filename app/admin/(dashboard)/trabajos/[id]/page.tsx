import { notFound } from "next/navigation";
import { getAdminFirestore } from "@/lib/firebase/admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTrabajoEditPage({ params }: PageProps) {
  const { id } = await params;
  const db = getAdminFirestore();
  const doc = await db.collection("projects").doc(id).get();
  if (!doc.exists) notFound();
  const project = doc.data();

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">
        Editar trabajo: {project?.title}
      </h1>
      <p className="mt-2 text-wood-600">
        Formulario de edición de proyecto (podés extender el CRUD aquí).
      </p>
    </div>
  );
}
