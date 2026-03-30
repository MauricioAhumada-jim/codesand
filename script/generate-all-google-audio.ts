import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyAxmMQG6G8gaYK0fq4VJnUxlGB7HTfwVkw';
const VOICE = 'es-US-Standard-C';
const LANGUAGE_CODE = 'es-US';

// ==========================================
// CONFIGURACIÓN PRINCIPAL
// ==========================================
// Aquí defines dónde se van a guardar los audios (Tu memoria USB en el disco D)
const TARGET_DRIVE = 'D:\\biblia-audios'; 
// ==========================================

const BIBLE_BOOKS = [
  "genesis", "exodo", "levitico", "numeros", "deuteronomio", "josue", "jueces",
  "rut", "1samuel", "2samuel", "1reyes", "2reyes", "1cronicas", "2cronicas",
  "esdras", "nehemias", "ester", "job", "salmos", "proverbios", "eclesiastes",
  "cantares", "isaias", "jeremias", "lamentaciones", "ezequiel", "daniel",
  "oseas", "joel", "amos", "abdias", "jonas", "miqueas", "nahum", "habacuc",
  "sofonias", "hageo", "zacarias", "malaquias", "mateo", "marcos", "lucas",
  "juan", "hechos", "romanos", "1corintios", "2corintios", "galatas", "efesios",
  "filipenses", "colosenses", "1tesalonicenses", "2tesalonicenses", "1timoteo",
  "2timoteo", "tito", "filemon", "hebreos", "santiago", "1pedro", "2pedro",
  "1juan", "2juan", "3juan", "judas", "apocalipsis"
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, body: any, retries = 5): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${await response.text()}`);
      }

      return await response.json();
    } catch (error: any) {
       console.error(`  [Intento ${attempt}/${retries} falló] ${error.message}`);
       if (attempt === retries) throw error;
       
       // Si es error 429 (Cuota excedida de Google), descansamos 60 segundos antes del próximo intento.
       // Si es otro error, descansamos 10 segundos.
       const msToWait = error.message?.includes('429') ? 65000 : 10000;
       console.log(`  Dando un descanso de ${msToWait / 1000} segundos...`);
       await sleep(msToWait);
    }
  }
}

async function generateAllAudios() {
  console.log(`\n======================================================`);
  console.log(`🤖 Iniciando Generación Masiva de la Biblia (Google TTS)`);
  console.log(`🎯 Destino: ${TARGET_DRIVE}`);
  console.log(`🗣️ Voz: ${VOICE} (Velocidad: 0.85)`);
  console.log(`======================================================\n`);
  
  const bibleDir = path.join(process.cwd(), 'client', 'public', 'bible');
  
  if (!fs.existsSync(TARGET_DRIVE)) {
    console.log(`Creando carpeta principal en ${TARGET_DRIVE}...`);
    fs.mkdirSync(TARGET_DRIVE, { recursive: true });
  }

  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
  let totalGenerated = 0;
  let totalSkipped = 0;

  for (const book of BIBLE_BOOKS) {
    const bookPath = path.join(bibleDir, `${book}.json`);
    
    if (!fs.existsSync(bookPath)) {
      console.warn(`⚠️ Libro "${book}" no encontrado en el proyecto, omitiendo...`);
      continue;
    }

    const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
    const bookAudioDir = path.join(TARGET_DRIVE, book);
    
    if (!fs.existsSync(bookAudioDir)) {
      fs.mkdirSync(bookAudioDir, { recursive: true });
    }

    console.log(`\n📖 Procesando libro: ${book.toUpperCase()}`);

    for (const [chapterStr, versesArray] of Object.entries(bookData)) {
      const chapter = parseInt(chapterStr);
      const verses = versesArray as { text: string }[];
      
      for (let i = 0; i < verses.length; i++) {
        const verseNum = i + 1;
        const text = verses[i].text;
        const fileName = `${book}_${chapter}_${verseNum}.mp3`;
        const filePath = path.join(bookAudioDir, fileName);

        // Sistema de "Resume": Si el archivo ya existe (y no pesa 0), lo saltamos.
        // Esto te permite detener el script y continuarlo otro día.
        if (fs.existsSync(filePath)) {
           const stats = fs.statSync(filePath);
           if (stats.size > 0) {
              totalSkipped++;
              console.log(`  ⏭️ Saltando ${fileName} (Ya existe en la USB)`);
              continue;
           }
        }

        console.log(`  ▶️ Generando: ${fileName} -> "${text.substring(0, 25)}..."`);
        
        try {
          const data = await fetchWithRetry(url, {
            input: { text: text },
            voice: { languageCode: LANGUAGE_CODE, name: VOICE },
            audioConfig: { audioEncoding: 'MP3', speakingRate: 0.85 }
          });

          const audioBuffer = Buffer.from(data.audioContent, 'base64');
          fs.writeFileSync(filePath, audioBuffer);
          
          totalGenerated++;
          // Pausa entre versículos aumentada a 400ms para no saturar la API (límite de 300 requests/minuto)
          await sleep(400);
        } catch (error: any) {
          console.error(`\n  ❌ ERROR CRÍTICO en ${fileName} después de varios intentos.`);
          console.error(`  Detalle del error:`, error.message);
          console.log("\n  ⚠️ EL SCRIPT SE DETENDRÁ AHORA. Puedes volver a ejecutarlo y continuará donde se quedó.");
          return;
        }
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 ¡PROCESO FINALIZADO CON ÉXITO!`);
  console.log(`Archivos creados en esta sesión: ${totalGenerated}`);
  console.log(`Archivos omitidos (Ya existían): ${totalSkipped}`);
  console.log(`Archivos Totales listos en tu memoria USB: ${totalGenerated + totalSkipped}`);
  console.log(`======================================================`);
}

generateAllAudios().catch(console.error);
