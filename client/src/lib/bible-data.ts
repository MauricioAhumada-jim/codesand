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
      { id: '2samuel', name: '2 Samuel', chapters: 24 }
    ],
    'Poéticos': [
      { id: 'job', name: 'Job', chapters: 42 },
      { id: 'salmos', name: 'Salmos', chapters: 150 },
      { id: 'proverbios', name: 'Proverbios', chapters: 31 },
      { id: 'eclesiastes', name: 'Eclesiastés', chapters: 12 },
      { id: 'cantares', name: 'Cantares', chapters: 8 }
    ],
    'Profetas Mayores': [
      { id: 'isaias', name: 'Isaías', chapters: 66 },
      { id: 'jeremias', name: 'Jeremías', chapters: 52 },
      { id: 'lamentaciones', name: 'Lamentaciones', chapters: 5 },
      { id: 'ezequiel', name: 'Ezequiel', chapters: 48 },
      { id: 'daniel', name: 'Daniel', chapters: 12 }
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
      { id: 'colosenses', name: 'Colosenses', chapters: 4 }
    ],
    'Cartas Generales': [
      { id: 'hebreos', name: 'Hebreos', chapters: 13 },
      { id: 'santiago', name: 'Santiago', chapters: 5 },
      { id: '1pedro', name: '1 Pedro', chapters: 5 },
      { id: '2pedro', name: '2 Pedro', chapters: 3 },
      { id: '1juan', name: '1 Juan', chapters: 5 },
      { id: 'apocalipsis', name: 'Apocalipsis', chapters: 22 }
    ]
  }
};

export const bibleContent: BibleContentStructure = {
  genesis: {
    1: [
      { text: "En el principio creó Dios los cielos y la tierra.", audioUrl: "" },
      { text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.", audioUrl: "" },
      { text: "Y dijo Dios: Sea la luz; y fue la luz.", audioUrl: "" },
      { text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.", audioUrl: "" },
      { text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.", audioUrl: "" },
      { text: "Luego dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas.", audioUrl: "" },
      { text: "E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así.", audioUrl: "" },
      { text: "Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo.", audioUrl: "" }
    ]
  },
  exodo: {
    1: [
      { text: "Estos son los nombres de los hijos de Israel que entraron en Egipto con Jacob; cada uno entró con su familia:", audioUrl: "" },
      { text: "Rubén, Simeón, Leví y Judá;", audioUrl: "" },
      { text: "Isacar, Zabulón y Benjamín;", audioUrl: "" },
      { text: "Dan, Neftalí, Gad y Aser.", audioUrl: "" },
      { text: "Todas las personas que descendieron de Jacob eran setenta. Y José estaba en Egipto.", audioUrl: "" },
      { text: "Y murió José, y todos sus hermanos, y toda aquella generación.", audioUrl: "" },
      { text: "Y los hijos de Israel fructificaron y se multiplicaron, y fueron aumentados y fortalecidos en extremo, y se llenó de ellos la tierra.", audioUrl: "" },
      { text: "Levantose entre tanto un nuevo rey sobre Egipto, que no conocía a José; y dijo a su pueblo:", audioUrl: "" },
      { text: "He aquí, el pueblo de los hijos de Israel es mayor y más fuerte que nosotros.", audioUrl: "" },
      { text: "Ahora, pues, seamos sabios para con él, para que no se multiplique, y acontezca que viniendo guerra, él también se una a nuestros enemigos y pelee contra nosotros, y se vaya de la tierra.", audioUrl: "" },
      { text: "Entonces pusieron sobre ellos comisarios de tributos que los molestasen con sus cargas; y edificaron a Faraón las ciudades de almacenaje, Pitón y Ramesés.", audioUrl: "" },
      { text: "Pero cuanto más los oprimían, tanto más se multiplicaban y crecían, de manera que los egipcios temían a los hijos de Israel.", audioUrl: "" },
      { text: "Y los egipcios hicieron servir a los hijos de Israel con dureza,", audioUrl: "" },
      { text: "y amargaron su vida con dura servidumbre, en hacer barro y ladrillo, y en toda labor del campo y en todo su servicio, al cual los obligaban con rigor.", audioUrl: "" },
      { text: "Y habló el rey de Egipto a las parteras de las hebreas, una de las cuales se llamaba Sifra, y otra Fúa, y les dijo:", audioUrl: "" },
      { text: "Cuando asistáis a las hebreas en sus partos, y veáis el sexo, si es hijo, matadlo; y si es hija, entonces viva.", audioUrl: "" },
      { text: "Pero las parteras temieron a Dios, y no hicieron como les mandó el rey de Egipto, sino que preservaron la vida a los niños.", audioUrl: "" },
      { text: "Y el rey de Egipto hizo llamar a las parteras y les dijo: ¿Por qué habéis hecho esto, que habéis preservado la vida a los niños?", audioUrl: "" },
      { text: "Y las parteras respondieron a Faraón: Porque las mujeres hebreas no son como las egipcias; pues son robustas, y dan a luz antes que la partera venga a ellas.", audioUrl: "" },
      { text: "Y Dios hizo bien a las parteras; y el pueblo se multiplicó y se fortaleció en gran manera.", audioUrl: "" },
      { text: "Y por haber las parteras temido a Dios, él prosperó sus familias.", audioUrl: "" },
      { text: "Entonces Faraón mandó a todo su pueblo, diciendo: Echad al río a todo hijo que naciere, y a toda hija preservad la vida.", audioUrl: "" }
    ]
  }
};

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
