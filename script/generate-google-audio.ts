import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyAxmMQG6G8gaYK0fq4VJnUxlGB7HTfwVkw';
const VOICE = 'es-US-Standard-C';
const LANGUAGE_CODE = 'es-US';
const BOOK_NAME = 'exodo';
const CHAPTER = '1';

async function generateChapter() {
  console.log(`Iniciando generación con Google Cloud TTS para ${BOOK_NAME} Capítulo ${CHAPTER} con la voz ${VOICE}...`);
  
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

  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

  for (let i = 0; i < chapterData.length; i++) {
    const verseNum = i + 1;
    const text = chapterData[i].text;
    const fileName = `${BOOK_NAME}_${CHAPTER}_${verseNum}.mp3`;
    const filePath = path.join(audioDir, fileName);

    console.log(`Generando: ${fileName} -> "${text.substring(0, 30)}..."`);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: text
          },
          voice: {
            languageCode: LANGUAGE_CODE,
            name: VOICE
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.85
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      // Google Cloud devuelve el MP3 en Base64 dentro de 'audioContent'
      const audioBuffer = Buffer.from(data.audioContent, 'base64');
      fs.writeFileSync(filePath, audioBuffer);
      
      console.log(`- ¡Éxito! (${audioBuffer.length} bytes guardados)`);
      
      // Pequeña pausa de cortesía para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error generando ${fileName}:`, error);
    }
  }

  console.log('¡Generación del capítulo completada exitosamente con Google Cloud!');
}

generateChapter().catch(console.error);
