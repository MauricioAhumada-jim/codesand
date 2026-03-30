import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';

// ==========================================
// CONFIGURACIÓN PRINCIPAL
// ==========================================
// El nombre del archivo que copiaste:
const KEY_NAME = 'bible-69359-firebase-adminsdk-fbsvc-59cf0d36ea.json'; 
const BUCKET_NAME = 'bible-69359.firebasestorage.app';
const TARGET_DRIVE = 'D:\\biblia-audios';
// ==========================================

const serviceAccountPath = path.join(process.cwd(), KEY_NAME);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`\n❌ ERROR: No encuentro el archivo de credenciales en la raíz: ${KEY_NAME}`);
  console.log('Asegúrate de haberlo arrastrado a la carpeta principal.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Inicializando Firebase con tu llave maestra temporal
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_NAME
});

const bucket = admin.storage().bucket();

async function scanFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      await scanFiles(filePath, fileList);
    } else if (file.endsWith('.mp3')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function uploadFiles() {
  console.log('\n======================================================');
  console.log('🚀 Iniciando el Sincronizador Automático de Audios');
  console.log('======================================================');

  console.log('\n🔍 Escaneando tu D:\\biblia-audios... (Esto es rapidísimo)');
  if (!fs.existsSync(TARGET_DRIVE)) {
    console.error(`\n❌ No se encontró tu memoria USB o carpeta en la ruta: ${TARGET_DRIVE}`);
    console.log('Por favor conéctala y vuelve a correr el script.');
    return;
  }

  const allFiles = await scanFiles(TARGET_DRIVE);
  console.log(`✅ ¡Encontré ${allFiles.length} audios locales mp3 listos para revisar!`);

  let uploadedCount = 0;
  let skippedCount = 0;

  console.log('\n☁️ Modo Cero Memoria Activado: Consultando estatus directo de a 1 por 1...');
  console.log('\n🚀 ¡Iniciando Inyección de Audios Faltantes!\n');
  
  for (const filePath of allFiles) {
    // Tomamos sólo el nombre limpio (ej. genesis_1_1.mp3) y evitamos las subcarpetas tal como pediste
    const fileName = path.basename(filePath);

    // Verificamos directamente en Firebase en lugar de descargar el catálogo a RAM
    const fileRef = bucket.file(fileName);
    const [exists] = await fileRef.exists();

    if (exists) {
      skippedCount++;
      // Solo mostramos algunos en pantalla para no ahogar la consola
      if (skippedCount <= 3) {
         console.log(`  ⏭️ Ya existe (protegido): ${fileName}`);
      } else if (skippedCount === 4) {
         console.log(`  ⏭️ (Ocultando los mensajes iniciales para no trabar la terminal...)`);
      } 
      
      // Imprimir solo de 500 en 500 para evidenciar el progreso real
      if (skippedCount % 500 === 0) {
         console.log(`  ... Progreso rápido: se validaron y saltaron ${skippedCount} audios ya existentes rápidamente.`);
      }
      continue;
    }

    try {
      console.log(`  ⬆️ Subiendo nuevo: ${fileName}...`);
      await bucket.upload(filePath, {
        destination: fileName,
        metadata: {
          contentType: 'audio/mpeg',
          cacheControl: 'public, max-age=31536000' // Para que sean ultra rápidos en la App y no gastes cuota doble
        }
      });
      uploadedCount++;
    } catch (error: any) {
      console.error(`  ❌ Error al subir ${fileName}, reintentaré con los demás...`, error.message);
      // Pausa por si el internet tuvo un microcorte
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n======================================================');
  console.log('🎉 ¡PROCESO FINALIZADO CON ÉXITO CIBERNÉTICO!');
  console.log(`Archivos INYECTADOS a la nube: ${uploadedCount}`);
  console.log(`Archivos AHORRADOS (ya estaban): ${skippedCount}`);
  if (uploadedCount === 0) {
     console.log('💡 ¡Increíble! Parece que ya tenías todo 100% sincronizado.');
  }
  console.log('======================================================\n');
}

uploadFiles().catch(console.error);
