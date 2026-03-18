/**
 * Firebase Admin SDK para uso en API routes y Server Components.
 * Requiere FIREBASE_SERVICE_ACCOUNT_JSON (JSON string) o archivo en
 * GOOGLE_APPLICATION_CREDENTIALS.
 */
import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getStorage, type Storage } from "firebase-admin/storage";

let adminApp: any | null = null;

function getAdminApp(): any {
  if (adminApp) return adminApp;
  if (getApps().length > 0) {
    adminApp = getApp();
    return adminApp;
  }
  let json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json && process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    try {
      const path = require("path");
      const fs = require("fs");
      const filePath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      if (fs.existsSync(filePath)) {
        json = fs.readFileSync(filePath, "utf8");
      }
    } catch (e) {
      console.error("FIREBASE_SERVICE_ACCOUNT_PATH read error:", e);
    }
  }
  if (!json) {
    try {
      const path = require("path");
      const fs = require("fs");
      const defaultPath = path.resolve(process.cwd(), ".firebase-service-account.json");
      if (fs.existsSync(defaultPath)) {
        json = fs.readFileSync(defaultPath, "utf8");
      }
    } catch {
      // ignore
    }
  }
  if (json) {
    try {
      const credentials = JSON.parse(json) as Record<string, unknown>;
      const projectId = credentials.project_id as string | undefined;
      const storageBucket =
        process.env.FIREBASE_STORAGE_BUCKET ||
        (projectId ? `${projectId}.firebasestorage.app` : undefined);
      adminApp = initializeApp({
        credential: cert(credentials),
        ...(storageBucket && { storageBucket }),
      });
      return adminApp;
    } catch (e) {
      console.error("Firebase service account JSON invalid:", e);
    }
  }
  adminApp = initializeApp();
  return adminApp;
}

export function getAdminFirestore(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function getAdminStorage(): Storage {
  return getStorage(getAdminApp());
}

/** Nombre del bucket de Storage (para usar en storage.bucket(nombre)). */
export function getStorageBucketName(): string | undefined {
  if (process.env.FIREBASE_STORAGE_BUCKET) {
    return process.env.FIREBASE_STORAGE_BUCKET;
  }
  let json: string | undefined = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json && process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    try {
      const path = require("path");
      const fs = require("fs");
      const filePath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      if (fs.existsSync(filePath)) json = fs.readFileSync(filePath, "utf8");
    } catch {
      // ignore
    }
  }
  if (!json) {
    try {
      const path = require("path");
      const fs = require("fs");
      const defaultPath = path.resolve(process.cwd(), ".firebase-service-account.json");
      if (fs.existsSync(defaultPath)) json = fs.readFileSync(defaultPath, "utf8");
    } catch {
      // ignore
    }
  }
  if (json) {
    try {
      const credentials = JSON.parse(json) as { project_id?: string };
      if (credentials.project_id) {
        // Proyectos nuevos usan .firebasestorage.app; antiguos .appspot.com
        return `${credentials.project_id}.firebasestorage.app`;
      }
    } catch {
      // ignore
    }
  }
  return undefined;
}
