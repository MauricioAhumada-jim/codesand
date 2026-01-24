export interface BibleBook {
  id: string;
  name: string;
  chapters: number;
}

export interface BibleCategory {
  [category: string]: BibleBook[];
}

export interface BibleStructure {
  [testament: string]: BibleCategory;
}

export interface Bookmark {
  id: number;
  book: string;
  chapter: number;
  verse?: number;
  verseText?: string;
  bookName: string;
  timestamp: string;
}

export interface VerseData {
  text: string;
  audioUrl?: string;
}

export type VerseContent = string | VerseData;

export interface BibleContentChapter {
  [chapter: number]: VerseContent[];
}

export interface BibleContentStructure {
  [bookId: string]: BibleContentChapter;
}

export const bibleStructure: BibleStructure = {
  'Antiguo Testamento': {
    'Pentateuco': [
      { id: 'genesis', name: 'Génesis', chapters: 50 },
      { id: 'exodo', name: 'Éxodo', chapters: 40 },
      { id: 'levitico', name: 'Levítico', chapters: 27 },
      { id: 'numeros', name: 'Números', chapters: 36 },
      { id: 'deuteronomio', name: 'Deuteronomio', chapters: 34 }
    ],
    'Históricos': [
      { id: 'josue', name: 'Josué', chapters: 24 },
      { id: 'jueces', name: 'Jueces', chapters: 21 },
      { id: 'rut', name: 'Rut', chapters: 4 },
      { id: '1samuel', name: '1 Samuel', chapters: 31 },
      { id: '2samuel', name: '2 Samuel', chapters: 24 },
      { id: '1reyes', name: '1 Reyes', chapters: 22 },
      { id: '2reyes', name: '2 Reyes', chapters: 25 },
      { id: '1cronicas', name: '1 Crónicas', chapters: 29 },
      { id: '2cronicas', name: '2 Crónicas', chapters: 36 },
      { id: 'esdras', name: 'Esdras', chapters: 10 },
      { id: 'nehemias', name: 'Nehemías', chapters: 13 },
      { id: 'tobias', name: 'Tobías', chapters: 14 },
      { id: 'judit', name: 'Judit', chapters: 16 },
      { id: 'ester', name: 'Ester', chapters: 10 },
      { id: '1macabeos', name: '1 Macabeos', chapters: 16 },
      { id: '2macabeos', name: '2 Macabeos', chapters: 15 }
    ],
    'Sapienciales y Poéticos': [
      { id: 'job', name: 'Job', chapters: 42 },
      { id: 'salmos', name: 'Salmos', chapters: 150 },
      { id: 'proverbios', name: 'Proverbios', chapters: 31 },
      { id: 'eclesiastes', name: 'Eclesiastés', chapters: 12 },
      { id: 'cantares', name: 'Cantar de los Cantares', chapters: 8 },
      { id: 'sabiduria', name: 'Sabiduría', chapters: 19 },
      { id: 'eclesiastico', name: 'Eclesiástico', chapters: 51 }
    ],
    'Profetas Mayores': [
      { id: 'isaias', name: 'Isaías', chapters: 66 },
      { id: 'jeremias', name: 'Jeremías', chapters: 52 },
      { id: 'lamentaciones', name: 'Lamentaciones', chapters: 5 },
      { id: 'baruc', name: 'Baruc', chapters: 6 },
      { id: 'ezequiel', name: 'Ezequiel', chapters: 48 },
      { id: 'daniel', name: 'Daniel', chapters: 14 }
    ],
    'Profetas Menores': [
      { id: 'oseas', name: 'Oseas', chapters: 14 },
      { id: 'joel', name: 'Joel', chapters: 3 },
      { id: 'amos', name: 'Amós', chapters: 9 },
      { id: 'abdias', name: 'Abdías', chapters: 1 },
      { id: 'jonas', name: 'Jonás', chapters: 4 },
      { id: 'miqueas', name: 'Miqueas', chapters: 7 },
      { id: 'nahum', name: 'Nahum', chapters: 3 },
      { id: 'habacuc', name: 'Habacuc', chapters: 3 },
      { id: 'sofonias', name: 'Sofonías', chapters: 3 },
      { id: 'ageo', name: 'Ageo', chapters: 2 },
      { id: 'zacarias', name: 'Zacarías', chapters: 14 },
      { id: 'malaquias', name: 'Malaquías', chapters: 4 }
    ]
  },
  'Nuevo Testamento': {
    'Evangelios': [
      { id: 'mateo', name: 'Mateo', chapters: 28 },
      { id: 'marcos', name: 'Marcos', chapters: 16 },
      { id: 'lucas', name: 'Lucas', chapters: 24 },
      { id: 'juan', name: 'Juan', chapters: 21 }
    ],
    'Históricos': [
      { id: 'hechos', name: 'Hechos', chapters: 28 }
    ],
    'Cartas Paulinas': [
      { id: 'romanos', name: 'Romanos', chapters: 16 },
      { id: '1corintios', name: '1 Corintios', chapters: 16 },
      { id: '2corintios', name: '2 Corintios', chapters: 13 },
      { id: 'galatas', name: 'Gálatas', chapters: 6 },
      { id: 'efesios', name: 'Efesios', chapters: 6 },
      { id: 'filipenses', name: 'Filipenses', chapters: 4 },
      { id: 'colosenses', name: 'Colosenses', chapters: 4 },
      { id: '1tesalonicenses', name: '1 Tesalonicenses', chapters: 5 },
      { id: '2tesalonicenses', name: '2 Tesalonicenses', chapters: 3 },
      { id: '1timoteo', name: '1 Timoteo', chapters: 6 },
      { id: '2timoteo', name: '2 Timoteo', chapters: 4 },
      { id: 'tito', name: 'Tito', chapters: 3 },
      { id: 'filemon', name: 'Filemón', chapters: 1 }
    ],
    'Cartas Católicas y otros': [
      { id: 'hebreos', name: 'Hebreos', chapters: 13 },
      { id: 'santiago', name: 'Santiago', chapters: 5 },
      { id: '1pedro', name: '1 Pedro', chapters: 5 },
      { id: '2pedro', name: '2 Pedro', chapters: 3 },
      { id: '1juan', name: '1 Juan', chapters: 5 },
      { id: '2juan', name: '2 Juan', chapters: 1 },
      { id: '3juan', name: '3 Juan', chapters: 1 },
      { id: 'judas', name: 'Judas', chapters: 1 },
      { id: 'apocalipsis', name: 'Apocalipsis', chapters: 22 }
    ]
  }
};

export async function fetchBookContent(bookId: string): Promise<BibleContentChapter | null> {
  try {
    const response = await fetch(`/bible/${bookId}.json`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Bible content for book ${bookId} not found`);
        return null;
      }
      throw new Error(`Failed to fetch book content: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching bible content for ${bookId}:`, error);
    return null;
  }
}

export function getVerseText(verse: VerseContent): string {
  if (typeof verse === 'string') {
    return verse;
  }
  return verse.text;
}

export function getVerseAudioUrl(verse: VerseContent): string | undefined {
  if (typeof verse === 'string') {
    return undefined;
  }
  return verse.audioUrl || undefined;
}

export function getBibleBook(bookId: string): BibleBook | null {
  for (const testament in bibleStructure) {
    for (const category in bibleStructure[testament]) {
      const book = bibleStructure[testament][category].find(b => b.id === bookId);
      if (book) return book;
    }
  }
  return null;
}

export function getAllBooksInOrder(): BibleBook[] {
  const books: BibleBook[] = [];
  for (const testament of ['Antiguo Testamento', 'Nuevo Testamento']) {
    if (bibleStructure[testament]) {
      for (const category in bibleStructure[testament]) {
        books.push(...bibleStructure[testament][category]);
      }
    }
  }
  return books;
}

export function getNextBook(currentBookId: string): BibleBook | null {
  const books = getAllBooksInOrder();
  const currentIndex = books.findIndex(b => b.id === currentBookId);
  if (currentIndex >= 0 && currentIndex < books.length - 1) {
    return books[currentIndex + 1];
  }
  return null;
}

export function getPreviousBook(currentBookId: string): BibleBook | null {
  const books = getAllBooksInOrder();
  const currentIndex = books.findIndex(b => b.id === currentBookId);
  if (currentIndex > 0) {
    return books[currentIndex - 1];
  }
  return null;
}
