import fs from 'fs/promises';
import path from 'path';

// Manual .env parsing
async function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        console.log(`Loading .env from: ${envPath}`);
        const envFile = await fs.readFile(envPath, 'utf-8');

        // Handle BOM if present
        const content = envFile.charCodeAt(0) === 0xFEFF ? envFile.slice(1) : envFile;

        const lines = content.split(/\r?\n/);
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return;

            const equalsIndex = trimmedLine.indexOf('=');
            if (equalsIndex > 0) {
                const key = trimmedLine.substring(0, equalsIndex).trim();
                const value = trimmedLine.substring(equalsIndex + 1).trim();
                process.env[key] = value;
                console.log(`Loaded key: ${key}`);
            }
        });

    } catch (error) {
        console.error('Failed to load .env:', error);
    }
}

// Main execution block wrapped in async IIFE
(async () => {
    await loadEnv();

    // Configuration
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    const VOICE_ID = 'AeRdCCKzvd23BpJoofzx';
    const MODEL_ID = 'eleven_turbo_v2_5';

    if (!ELEVENLABS_API_KEY) {
        console.error('Error: ELEVENLABS_API_KEY is not set in .env file');
        process.exit(1);
    }

    // Arguments
    const args = process.argv.slice(2);
    const bookArg = args.find(arg => arg.startsWith('--book='))?.split('=')[1];
    const chapterArg = args.find(arg => arg.startsWith('--chapter='))?.split('=')[1];

    if (!bookArg || !chapterArg) {
        console.error('Usage: npx tsx script/generate-audio.ts --book=<book_id> --chapter=<chapter_number>');
        process.exit(1);
    }

    const BOOK_ID = bookArg;
    const CHAPTER_NUMBER = parseInt(chapterArg, 10);

    if (isNaN(CHAPTER_NUMBER)) {
        console.error('Error: Chapter must be a number');
        process.exit(1);
    }

    // Paths
    const BIBLE_JSON_PATH = path.join(process.cwd(), 'client', 'public', 'bible', `${BOOK_ID}.json`);
    const OUTPUT_DIR = path.join(process.cwd(), 'generated_audio');

    async function generateAudio(text: string, outputPath: string) {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
        const headers = {
            'Accept': 'audio/mpeg',
            'xi-api-key': ELEVENLABS_API_KEY as string,
            'Content-Type': 'application/json',
        };

        const body = {
            text: text,
            model_id: MODEL_ID,
            voice_settings: {
                stability: 0.42,
                similarity_boost: 0.13,
                style: 0.0,
                use_speaker_boost: true,
            },
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            await fs.writeFile(outputPath, buffer);
            console.log(`Generated: ${outputPath}`);
        } catch (error) {
            console.error(`Failed to generate audio for ${outputPath}:`, error);
        }
    }

    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        const bibleData = await fs.readFile(BIBLE_JSON_PATH, 'utf-8');
        const bibleJson = JSON.parse(bibleData);

        const verses = bibleJson[String(CHAPTER_NUMBER)];

        if (!verses) {
            console.error(`Error: Chapter ${CHAPTER_NUMBER} not found in ${BOOK_ID}.json`);
            process.exit(1);
        }

        console.log(`Generating audio for ${BOOK_ID} Chapter ${CHAPTER_NUMBER} (${verses.length} verses)...`);

        for (let i = 0; i < verses.length; i++) {
            const verse = verses[i];
            const verseNumber = i + 1;
            const verseText = verse.text;
            const fileName = `${BOOK_ID}_${CHAPTER_NUMBER}_${verseNumber}.mp3`;
            const outputPath = path.join(OUTPUT_DIR, fileName);

            // Check if file exists to avoid regenerating
            try {
                await fs.access(outputPath);
                console.log(`Skipping existing file: ${fileName}`);
                continue;
            } catch {
                // File does not exist, proceed
            }

            console.log(`Generating verse ${verseNumber}: "${verseText.substring(0, 30)}..."`);
            await generateAudio(verseText, outputPath);
        }

        console.log('Done!');

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
