/**
 * Configuración de Firebase (app web "web locosporlapinotea").
 * Las variables NEXT_PUBLIC_* se usan en el cliente.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBthMmuM4iB16gJJ-nrEnA2KM0WjSj1EzQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "locosporlapinotea-bc0c1.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "https://locosporlapinotea-bc0c1-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "locosporlapinotea-bc0c1",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "locosporlapinotea-bc0c1.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "639790919414",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:639790919414:web:af3ab8d167e54d2a7646d7",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-7T2VP06XKF",
};

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "loggia.1996@gmail.com";
