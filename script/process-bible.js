
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping from biblia.json book names to our App IDs
const bookMapping = {
    'Génesis': 'genesis',
    'Exodo': 'exodo',
    'Levítico': 'levitico',
    'Números': 'numeros',
    'Deuteronomio': 'deuteronomio',
    'Josué': 'josue',
    'Jueces': 'jueces',
    'Rut': 'rut',
    'I Samuel': '1samuel',
    'II Samuel': '2samuel',
    'I Reyes': '1reyes',
    'II Reyes': '2reyes',
    'I Crónicas': '1cronicas',
    'II Crónicas': '2cronicas',
    'Esdras': 'esdras',
    'Nehemías': 'nehemias',
    'Tobías': 'tobias',
    'Judit': 'judit',
    'Ester': 'ester',
    'I Macabeos': '1macabeos',
    'II Macabeos': '2macabeos',
    'Job': 'job',
    'Salmos': 'salmos',
    'Proverbios': 'proverbios',
    'Eclesiastés': 'eclesiastes',
    'Cantar': 'cantares',
    'Sabiduría': 'sabiduria',
    'Eclesiástico': 'eclesiastico',
    'Isaías': 'isaias',
    'Jeremías': 'jeremias',
    'Lamentaciones': 'lamentaciones',
    'Baruc': 'baruc',
    'Ezequiel': 'ezequiel',
    'Daniel': 'daniel',
    'Oseas': 'oseas',
    'Joel': 'joel',
    'Amós': 'amos',
    'Abdías': 'abdias',
    'Jonás': 'jonas',
    'Miqueas': 'miqueas',
    'Nahún': 'nahum',
    'Habacuc': 'habacuc',
    'Sofonías': 'sofonias',
    'Ageo': 'ageo',
    'Zacarías': 'zacarias',
    'Malaquías': 'malaquias',
    'Mateo': 'mateo',
    'Marcos': 'marcos',
    'Lucas': 'lucas',
    'Juan': 'juan',
    'Hechos': 'hechos',
    'Romanos': 'romanos',
    'I Corintios': '1corintios',
    'II Corintios': '2corintios',
    'Gálatas': 'galatas',
    'Efesios': 'efesios',
    'Filipenses': 'filipenses',
    'Colosenses': 'colosenses',
    'I Tesalonicenses': '1tesalonicenses',
    'II Tesalonicenses': '2tesalonicenses',
    'I Timoteo': '1timoteo',
    'II Timoteo': '2timoteo',
    'Tito': 'tito',
    'Filemon': 'filemon',
    'Hebreos': 'hebreos',
    'Santiago': 'santiago',
    'I Pedro': '1pedro',
    'II Pedro': '2pedro',
    'I Juan': '1juan',
    'II Juan': '2juan',
    'III Juan': '3juan',
    'Judas': 'judas',
    'Apocalipsis': 'apocalipsis'
};

const inputFile = path.join(__dirname, '../client/public/bible/biblia.json');
const outputDir = path.join(__dirname, '../client/public/bible');

try {
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const bibleData = JSON.parse(rawData);

    console.log('Bible data loaded. Processing...');

    let processedCount = 0;

    for (const [key, sourceBookData] of Object.entries(bibleData)) {
        // TRIM the key to handle " Mateo" or " I Cronicas"
        const sourceName = key.trim();
        const bookId = bookMapping[sourceName];

        if (!bookId) {
            console.warn(`Warning: No mapping found for book "${sourceName}" (original: "${key}"). Skipping.`);
            continue;
        }

        console.log(`Processing ${sourceName} -> ${bookId}...`);

        // Transform content
        const newBookContent = {};

        sourceBookData.chapters.forEach(chapterData => {
            const chapterNum = parseInt(chapterData.chapter, 10);

            const verseArray = [];

            // Get max verse number to size array correctly
            const verseEntries = Object.entries(chapterData.verses).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

            verseEntries.forEach(([verseNum, text]) => {
                // Push just the text as string. The app handles string | VerseData
                verseArray.push({
                    text: text.replace(/Yahveh/g, 'Dios').replace(/Dios Dios/g, 'Dios')
                    // audioUrl: undefined
                });
            });

            newBookContent[chapterNum] = verseArray;
        });

        // Write to file
        const outputPath = path.join(outputDir, `${bookId}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(newBookContent, null, 2), 'utf8');
        processedCount++;
    }

    console.log(`\nSuccessfully processed ${processedCount} books.`);

} catch (error) {
    console.error('Error processing bible data:', error);
}
