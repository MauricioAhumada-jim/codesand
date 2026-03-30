import fs from 'fs';
import path from 'path';
import { EdgeTTS } from 'node-edge-tts';

const VOICE = 'es-MX-BeatrizNeural';
const BOOK_NAME = 'exodo';
const CHAPTER = '1';

async function generateChapter() {
  console.log(`Iniciando generación de audios para ${BOOK_NAME} Capítulo ${CHAPTER} con la voz ${VOICE}...`);
  
  const bibleDir = path.join(process.cwd(), 'client', 'public', 'bible');
  const audioDir = path.join(process.cwd(), 'client', 'public', 'bible-audio', BOOK_NAME);
  
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const bookPath = path.join(bibleDir, `${BOOK_NAME}.json`);
  const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
  const chapterData = bookData[CHAPTER];

  if (!chapterData) {
    console.error(`No se encontró el capítulo ${CHAPTER} en ${BOOK_NAME}`);
    return;
  }

  const tts = new EdgeTTS({
    voice: VOICE,
    lang: VOICE.split('-').slice(0, 2).join('-'), // "es-MX"
    outputFormat: 'audio-24khz-48kbitrate-mono-mp3'
  });

  for (let i = 0; i < chapterData.length; i++) {
    const verseNum = i + 1;
    const text = chapterData[i].text;
    const fileName = `${BOOK_NAME}_${CHAPTER}_${verseNum}.mp3`;
    const filePath = path.join(audioDir, fileName);

    console.log(`Generando: ${fileName} -> "${text.substring(0, 30)}..."`);
    
    try {
      await tts.ttsPromise(text, filePath);
      
      const stats = fs.statSync(filePath);
      console.log(`- Generado correctamente (${stats.size} bytes)`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error generando ${fileName}:`, error);
    }
  }

  console.log('¡Generación del capítulo 1 completada exitosamente!');
}

generateChapter().catch(console.error);
