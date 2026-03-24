# Guía de Configuración Móvil (APK, AdMob, Google Play y RevenueCat)

Esta guía te ayudará a configurar todo lo necesario para poder procesar pagos de Google Play, mostrar anuncios de AdMob, generar la aplicación en su versión APK mediante GitHub, y conectarla con tu código.

---

## 🚀 1. Descargar el APK con GitHub Actions

El proyecto ahora está configurado con **GitHub Actions**. Esto significa que cada vez que subas (push) tus cambios a tu rama móvil (o `main`, `mobile`, `feature/xyz`), GitHub generará el `.apk` por ti automáticamente en sus propios servidores de manera gratuita.

### Cómo descargar tu APK:
1. Ve al repositorio de tu proyecto en GitHub.com.
2. Haz clic en la pestaña **"Actions"** (Acciones) en el menú superior.
3. En la barra lateral izquierda, verás un flujo llamado **"Build Android APK"**. Haz clic en él.
4. Verás una lista de "Runs" (Ejecuciones). Haz clic en la ejecución más reciente (que debería tener un check verde ✅).
5. Desplázate hacia abajo en la página de resumen de la ejecución hasta encontrar la sección **"Artifacts"**.
6. Haz clic en **"app-debug"**. Comenzará a descargarse un archivo `app-debug.zip` que contiene tu **`app-debug.apk`**.

> **Nota:** Por defecto el APK se compila en modo "Debug" (pruebas). Si vas a subirla a Play Store, necesitarás firmarla digitalmente (genera una KeyStore) y cambiar el workflow a que compile en modo "Release" (`assembleRelease`).

---

## 💰 2. Configuración de Google AdMob (Anuncios)

### En la Web de AdMob:
1. Inicia sesión en [AdMob](https://admob.google.com/).
2. Haz clic en **Aplicaciones** > **Añadir aplicación**.
3. Selecciona **Android** como plataforma (indica si está en la tienda de aplicaciones).
4. Guarda el **ID de la aplicación de AdMob** (ejemplo: `ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy`).
5. Crea al menos un bloque de anuncios (por ejemplo, "Banner" o "Intersticial") y guarda el **ID del bloque de anuncios** (ejemplo: `ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz`).
   - *Nota:* Si estás probando la app, utiliza los [IDs de prueba oficiales](https://developers.google.com/admob/android/test-ads) para no ser penalizado.

### En tu Código:
Deberás editar dos lugares:

1. **`capacitor.config.ts` o `android/app/src/main/AndroidManifest.xml`**:
   Capacitor AdMob requiere que declares el `APPLICATION_ID` en el Manifest de Android.
   - Abre `android/app/src/main/AndroidManifest.xml`.
   - Dentro de la etiqueta `<application>`, asegúrate de agregar o modificar este elemento:
     ```xml
     <meta-data
         android:name="com.google.android.gms.ads.APPLICATION_ID"
         android:value="ca-app-pub-TU_ID_DE_APP_AQUI~YYYYYYYY" /> <!-- REEMPLAZAR -->
     ```

2. **`client/src/lib/monetization.ts`**:
   - Abre este archivo provisto.
   - Reemplaza el valor de `BANNER_AD_UNIT_ID` y `INTERSTITIAL_AD_UNIT_ID` con tus IDs reales (o los de prueba mientras desarrollas).

---

## 🛒 3. Configuración de Google Play Console & RevenueCat (Pagos)

Asegúrate de tener una cuenta de desarrollador de Google ($25 USD, pago único).

### A) En Google Play Console:
1. Crea tu aplicación en Google Play Console.
2. Necesitarás subir al menos una versión en un canal de "Pruebas Cerradas" o "Pruebas Internas" para poder crear productos (Suscripciones o Productos Integrados).
3. Una vez subido tu primer APK/AAB firmado, ve a la sección de **Monetización** > **Suscripciones** (o Productos Integrados).
4. Crea un producto y anota el **ID del Producto** (ejemplo: `suscripcion_premium_1_mes`).
5. Crea una clave de cuenta de servicio (Service Account) en Google Cloud vinculada a tu Google Play Console para darle acceso a RevenueCat.

### B) En la Web de RevenueCat:
1. Inicia sesión en [RevenueCat](https://www.revenuecat.com/).
2. Crea un nuevo proyecto.
3. Agrega tu App en formato "Android (Google Play)".
4. Proporciona tus credenciales (Service Account de Google Cloud) creadas en el paso A para conectar Google Play con RevenueCat.
5. Copia la **"Public API Key"** de RevenueCat (suele empezar por `goog_`).
6. Crea un "Entitlement" (Derecho/Nivel, ej. "premium") y vincula el producto de Google Play (`suscripcion_premium_1_mes`) a este.

### C) En tu Código:
1. **`client/src/lib/monetization.ts`**:
   - Abre este archivo.
   - Reemplaza el valor de `REVENUECAT_PUBLIC_GOOGLE_API_KEY` con tu clave pública de Google generada en RevenueCat.

---

## 🛠 4. Resumen: ¿Dónde coloco las APIs en el código?

Si has seguido los pasos anteriores, esto es lo único que debes modificar en el código de tu proyecto:

* **Para Admob**:
  - `android/app/src/main/AndroidManifest.xml` (El "App ID").
  - `client/src/lib/monetization.ts` (Los "Ad unit IDs").

* **Para RevenueCat**:
  - `client/src/lib/monetization.ts` (La "Public API Key" para Android).

Una vez modificados y guardados esos archivos, solo debes hacer otro subida (Commit y Push) a GitHub. ¡La acción se activará de nuevo creando un APK que ya tendrá las claves correctas!
