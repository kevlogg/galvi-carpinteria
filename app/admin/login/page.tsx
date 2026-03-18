"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { ADMIN_EMAIL } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const auth = getFirebaseAuth();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user.email !== ADMIN_EMAIL) {
        await auth.signOut();
        setError("Solo el administrador puede entrar.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Error al iniciar sesión";
      setError(msg);
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-wood-900/50 p-6 shadow-sm">
      <h1 className="font-serif text-xl font-medium text-foreground">
        Admin - Galvi Carpintería
      </h1>
      <p className="mt-2 text-sm text-muted">Ingresá con tu cuenta de administrador.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
