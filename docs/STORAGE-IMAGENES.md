# Cómo hacer que se vean las imágenes (Firebase Storage)

Para que las imágenes de productos se muestren en el admin y en la tienda, hace falta **configurar Storage** así:

## 1. Reglas de Storage (obligatorio)

Las reglas permiten **lectura pública** de los archivos (las imágenes se pueden leer sin login).

1. En la raíz del proyecto están `storage.rules` y `firebase.json`.
2. Desplegá las reglas:
   ```bash
   firebase deploy --only storage
   ```
3. Si no usás Firebase CLI, en **Firebase Console → Storage → Rules** pegá:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
   y publicá.

Sin esto, las imágenes devuelven 403 y no se ven (ni con el proxy ni directas).

## 2. CORS (opcional, para cargar directo desde Firebase)

Si querés que las imágenes se pidan **directo** a Firebase (sin pasar por el proxy de la app), configurá CORS en el bucket:

```bash
gsutil cors set storage.cors.json gs://TU-BUCKET.appspot.com
```

(O el nombre de tu bucket, ej. `locosporlapinotea-bc0c1.firebasestorage.app`.)

El archivo `storage.cors.json` ya está en la raíz del proyecto.

---

**Resumen:** con solo desplegar las **reglas de Storage** (paso 1) suele alcanzar para que las imágenes se vean, porque la app usa un proxy (`/api/image`) que descarga la imagen en el servidor. Si además configurás CORS (paso 2), podés usar la URL de Firebase directo en el navegador si lo necesitás.
