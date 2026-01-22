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

export const bibleContent: BibleContentStructure = {
  genesis: {
    1: [
      { text: "En el principio creó Dios los cielos y la tierra.", audioUrl: "https://drive.google.com/file/d/1zhK-KLSq2lE74cNHX8sOPBq_6FND5dPu/view?usp=sharing" },
      { text: "La tierra era caos y confusión y oscuridad por encima del abismo, y un viento de Dios aleteaba por encima de las aguas.", audioUrl: "https://drive.google.com/file/d/1zhK-KLSq2lE74cNHX8sOPBq_6FND5dPu/view?usp=sharing" },
      { text: "Dijo Dios: «Haya luz», y hubo luz.", audioUrl: "" },
      { text: "Vio Dios que la luz estaba bien, y apartó Dios la luz de la oscuridad.", audioUrl: "" },
      { text: "Llamó Dios a la luz «día», y a la oscuridad la llamó «noche». Atardeció y amaneció: día primero.", audioUrl: "" },
      { text: "Dijo Dios: «Haya un firmamento por en medio de las aguas, que las aparte unas de otras».", audioUrl: "" },
      { text: "E hizo Dios el firmamento; y apartó las aguas de debajo del firmamento de las aguas de encima del firmamento. Y así fue.", audioUrl: "" },
      { text: "Llamó Dios al firmamento «cielo». Atardeció y amaneció: día segundo.", audioUrl: "" }
    ],
    2: [
      { text: "Así quedaron acabados el cielo y la tierra y todo su aparato.", audioUrl: "" },
      { text: "Terminó Dios en el día séptimo la obra que había hecho, y descansó en el día séptimo de toda la obra que había hecho.", audioUrl: "" },
      { text: "Y bendijo Dios el día séptimo y lo santificó, porque en él descansó Dios de toda la obra que había realizado en la creación.", audioUrl: "" },
      { text: "Esa es la historia de la creación del cielo y de la tierra. El día en que hizo el Señor Dios la tierra y el cielo,", audioUrl: "" },
      { text: "no había aún matorral alguno sobre la tierra ni había brotado aún ninguna hierba del campo, porque el Señor Dios no había hecho llover sobre la tierra ni había hombre que labrara el suelo.", audioUrl: "" },
      { text: "Pero un manantial brotaba de la tierra y regaba toda la superficie del suelo.", audioUrl: "" },
      { text: "Entonces el Señor Dios modeló al hombre con polvo del suelo e insufló en sus narices aliento de vida, y el hombre se convirtió en ser vivo.", audioUrl: "" },
      { text: "Luego plantó el Señor Dios un jardín en Edén, al oriente, donde puso al hombre que había modelado.", audioUrl: "" },
      { text: "Hizo el Señor Dios brotar del suelo toda clase de árboles deleitosos a la vista y buenos para comer, el árbol de la vida en medio del jardín y el árbol del conocimiento del bien y del mal.", audioUrl: "" },
      { text: "De Edén salía un río para regar el jardín, y desde allí se repartía en cuatro brazos.", audioUrl: "" },
      { text: "El nombre del primero es Pisón; es el que rodea todo el país de Javilá, donde hay oro.", audioUrl: "" },
      { text: "El oro de aquel país es fino; allí hay también bedelio y ágata.", audioUrl: "" },
      { text: "El nombre del segundo río es Guijón; es el que rodea todo el país de Cus.", audioUrl: "" },
      { text: "El nombre del tercer río es Tigris; es el que corre al oriente de Asiria. El cuarto río es el Éufrates.", audioUrl: "" },
      { text: "Tomó, pues, el Señor Dios al hombre y lo dejó en el jardín de Edén para que lo labrase y cuidase.", audioUrl: "" },
      { text: "Y Dios impuso al hombre este mandamiento: «De cualquier árbol del jardín puedes comer,", audioUrl: "" },
      { text: "pero del árbol del conocimiento del bien y del mal no comerás, porque el día que comas de él, morirás sin remedio».", audioUrl: "" },
      { text: "Dijo luego el Señor Dios: «No es bueno que el hombre esté solo. Voy a hacerle una ayuda adecuada».", audioUrl: "" },
      { text: "Y el Señor Dios modeló de la tierra todas las fieras del campo y todas las aves del cielo y las llevó ante el hombre para ver cómo las llamaba; y lo que el hombre llamó a cada ser vivo, ese es su nombre.", audioUrl: "" },
      { text: "Así el hombre puso nombres a todos los ganados, a las aves del cielo y a todas las fieras del campo; pero no encontró una ayuda adecuada para sí.", audioUrl: "" },
      { text: "Entonces el Señor Dios hizo caer un profundo sueño sobre el hombre, el cual se durmió. Le quitó una de sus costillas y rellenó el vacío con carne.", audioUrl: "" },
      { text: "De la costilla que el Señor Dios había tomado del hombre, formó una mujer y la llevó ante el hombre.", audioUrl: "" },
      { text: "Entonces dijo el hombre: «¡Esta sí que es hueso de mis huesos y carne de mi carne! Su nombre será Mujer, porque del varón ha sido tomada».", audioUrl: "" },
      { text: "Por eso abandona el hombre a su padre y a su madre, se une a su mujer y se hacen una sola carne.", audioUrl: "" },
      { text: "Estaban ambos desnudos, el hombre y su mujer, pero no se avergonzaban.", audioUrl: "" }
    ],
    3: [
      { text: 'La serpiente era el más astuto de todos los animales del campo que el Señor Dios había hecho. Y dijo a la mujer: «¿Conque Dios os ha dicho: "No comáis de ningún árbol del jardín"?»', audioUrl: "" },
      { text: 'La mujer respondió a la serpiente: «Podemos comer del fruto de los árboles del jardín;', audioUrl: "" },
      { text: 'pero del fruto del árbol que está en medio del jardín ha dicho Dios: "No comáis de él, ni lo toquéis, bajo pena de muerte"».', audioUrl: "" },
      { text: 'La serpiente dijo a la mujer: «No, no moriréis.', audioUrl: "" },
      { text: 'Es que Dios sabe que el día en que comáis de él se os abrirán los ojos y seréis como dioses, conocedores del bien y del mal».', audioUrl: "" },
      { text: 'Vio, pues, la mujer que el árbol era bueno para comer, de aspecto deleitoso y codiciable para alcanzar sabiduría. Tomó de su fruto y comió; dio también a su marido, que estaba con ella, y él comió.', audioUrl: "" },
      { text: 'Entonces se les abrieron los ojos a los dos y conocieron que estaban desnudos; entrelazaron hojas de higuera y se hicieron ceñidores.', audioUrl: "" },
      { text: 'Oyeron luego los pasos del Señor Dios que se paseaba por el jardín a la brisa del día, y el hombre y su mujer se ocultaron de la vista del Señor Dios por entre los árboles del jardín.', audioUrl: "" },
      { text: 'El Señor Dios llamó al hombre y le dijo: «¿Dónde estás?»', audioUrl: "" },
      { text: 'Él respondió: «He oído tus pasos en el jardín y he tenido miedo, porque estoy desnudo; por eso me he escondido».', audioUrl: "" },
      { text: 'Él replicó: «¿Quién te ha hecho ver que estabas desnudo? ¿Has comido acaso del árbol del que te prohibí comer?»', audioUrl: "" },
      { text: 'El hombre respondió: «La mujer que me diste por compañera me dio del árbol y comí».', audioUrl: "" },
      { text: 'Dijo, pues, el Señor Dios a la mujer: «¿Por qué has hecho esto?» Y respondió la mujer: «La serpiente me sedujo y comí».', audioUrl: "" },
      { text: 'Entonces el Señor Dios dijo a la serpiente: «Por haber hecho esto, maldita serás entre todos los ganados y entre todas las fieras del campo. Sobre tu vientre caminarás y polvo comerás todos los días de tu vida.', audioUrl: "" },
      { text: 'Pondré enemistad entre ti y la mujer, y entre tu linaje y su linaje: él te pisará la cabeza mientras acechas tú su calcañar».', audioUrl: "" },
      { text: 'A la mujer le dijo: «Tantas haré tus fatigas cuantos sean tus embarazos; con dolor parirás a tus hijos. Hacia tu marido irá tu apetencia, y él te dominará».', audioUrl: "" },
      { text: 'Al hombre le dijo: «Por haber escuchado la voz de tu mujer y haber comido del árbol del que yo te había prohibido comer, maldito sea el suelo por tu causa: con fatiga sacarás de él el alimento todos los días de tu vida.', audioUrl: "" },
      { text: 'Espinas y abrojos te producirá, y comerás la hierba del campo.', audioUrl: "" },
      { text: 'Con el sudor de tu frente comerás el pan hasta que vuelvas al suelo, pues de él fuiste tomado. Porque eres polvo y al polvo volverás».', audioUrl: "" },
      { text: 'El hombre llamó a su mujer «Eva», por ser ella la madre de todos los vivientes.', audioUrl: "" },
      { text: 'El Señor Dios hizo al hombre y a su mujer túnicas de piel y los vistió.', audioUrl: "" },
      { text: 'Y dijo el Señor Dios: «¡He aquí que el hombre ha llegado a ser como uno de nosotros en el conocimiento del bien y del mal! No sea que ahora alargue su mano y tome también del árbol de la vida y, comiendo de él, viva para siempre».', audioUrl: "" },
      { text: 'Y el Señor Dios lo echó del jardín de Edén para que labrase el suelo de donde había sido tomado.', audioUrl: "" },
      { text: 'Habiendo expulsado al hombre, puso delante del jardín de Edén querubines y la llama de la espada vibrante, para guardar el camino del árbol de la vida.', audioUrl: "" }
    ],
    4: [
      { text: 'Conoció el hombre a Eva, su mujer, la cual concibió y dio a luz a Caín, y dijo: «He adquirido un varón con la ayuda del Señor».', audioUrl: "" },
      { text: 'Volvió a dar a luz, y tuvo a Abel su hermano. Fue Abel pastor de ovejas y Caín labrador.', audioUrl: "" },
      { text: 'Al cabo del tiempo, Caín ofreció al Señor pringue de los frutos de la tierra.', audioUrl: "" },
      { text: 'También Abel ofreció de los primogénitos de su rebaño, y de la grasa de los mismos. El Señor miró con agrado a Abel y su ofrenda,', audioUrl: "" },
      { text: 'pero no miró con agrado a Caín y su ofrenda. Caín se irritó mucho y andaba cabizbajo.', audioUrl: "" },
      { text: 'El Señor dijo a Caín: «¿Por qué estás irritado y por qué andas cabizbajo?', audioUrl: "" },
      { text: '¿No es cierto que si obras bien podrás levantar la cabeza? Pero si no obras bien, el pecado está a la puerta acechándote, como fiera que te codicia, y a la que tú debes dominar».', audioUrl: "" },
      { text: 'Caín dijo a su hermano Abel: «Vamos afuera». Y cuando estaban en el campo, se lanzó Caín contra su hermano Abel y lo mató.', audioUrl: "" },
      { text: 'El Señor dijo a Caín: «¿Dónde está tu hermano Abel?» Él respondió: «No sé. ¿Soy yo acaso el guardián de mi hermano?»', audioUrl: "" },
      { text: 'Replicó el Señor: «¿Qué has hecho? Se oye la sangre de tu hermano clamar a mí desde el suelo.', audioUrl: "" },
      { text: 'Por eso, maldito seas ahora lejos de este suelo que abrió su boca para recibir de tu mano la sangre de tu hermano.', audioUrl: "" },
      { text: 'Cuando labres el suelo, no te dará más su fruto; vagabundo y errante serás en la tierra».', audioUrl: "" },
      { text: 'Caín dijo al Señor: «Mi culpa es demasiado grande para soportarla.', audioUrl: "" },
      { text: 'Hoy me echas de este suelo y tendré que ocultarme de tu presencia; seré un vagabundo errante por la tierra, y cualquiera que me encuentre me matará».', audioUrl: "" },
      { text: 'El Señor le respondió: «Al contrario; si alguien mata a Caín, será vengado siete veces». Y el Señor puso una señal a Caín para que nadie que lo encontrase lo matara.', audioUrl: "" },
      { text: 'Caín salió de la presencia del Señor y se estableció en el país de Nod, al oriente de Edén.', audioUrl: "" },
      { text: 'Conoció Caín a su mujer, la cual concibió y dio a luz a Henoc. Estaba construyendo una ciudad, y la llamó Henoc, como el nombre de su hijo.', audioUrl: "" },
      { text: 'A Henoc le nació Irad; e Irad engendró a Mejuyael; Mejuyael engendró a Metusael, y Metusael engendró a Lamec.', audioUrl: "" },
      { text: 'Lamec tomó dos mujeres: el nombre de la primera era Ada, y el nombre de la segunda, Silá.', audioUrl: "" },
      { text: 'Ada dio a luz a Yabal, que fue el padre de los que habitan en tiendas y crían ganado.', audioUrl: "" },
      { text: 'El nombre de su hermano era Yubal, padre de todos los que tocan la cítara y la flauta.', audioUrl: "" },
      { text: 'Por su parte, Silá dio a luz a Túbal Caín, forjador de toda clase de herramientas de bronce y de hierro. La hermana de Túbal Caín fue Naamá.', audioUrl: "" },
      { text: 'Lamec dijo a sus mujeres: «Ada y Silá, escuchad mi voz; mujeres de Lamec, prestad oído a mi palabra: Yo maté a un hombre por una herida, y a un muchacho por un cardenal.', audioUrl: "" },
      { text: 'Si Caín será vengado siete veces, Lamec lo será setenta y siete».', audioUrl: "" },
      { text: 'Adán conoció de nuevo a su mujer, y ella dio a luz un hijo, a quien puso por nombre Set, diciendo: «Dios me ha otorgado otro descendiente en lugar de Abel, porque lo mató Caín».', audioUrl: "" },
      { text: 'También a Set le nació un hijo, a quien puso por nombre Enós. Entonces se comenzó a invocar el nombre del Señor.', audioUrl: "" }
    ]
  },
  exodo: {
    1: [
      { text: "Estos son los nombres de los hijos de Israel que fueron a Egipto con Jacob, cada uno con su familia:", audioUrl: "" },
      { text: "Rubén, Simeón, Leví y Judá;", audioUrl: "" },
      { text: "Isacar, Zabulón y Benjamín;", audioUrl: "" },
      { text: "Dan y Neftalí, Gad y Aser.", audioUrl: "" },
      { text: "El número total de las personas descendientes de Jacob era de setenta. José estaba ya en Egipto.", audioUrl: "" },
      { text: "Murió José, y todos sus hermanos y toda aquella generación.", audioUrl: "" },
      { text: "Pero los hijos de Israel fueron fecundos y se multiplicaron; llegaron a ser muy numerosos y fuertes, y llenaron el país.", audioUrl: "" },
      { text: "Surgió en Egipto un nuevo rey, que no había conocido a José.", audioUrl: "" },
      { text: "Y dijo a su pueblo: «Mirad, el pueblo de los hijos de Israel es más numeroso y fuerte que nosotros.", audioUrl: "" },
      { text: "Vamos a actuar con prudencia contra él para que no se multiplique; no vaya a suceder que, en caso de guerra, se una a nuestros enemigos para combatir contra nosotros y salir del país».", audioUrl: "" },
      { text: "Les impusieron, pues, capataces para que los explotasen con trabajos forzados. Así edificaron para el faraón las ciudades de depósito: Pitón y Ramsés.", audioUrl: "" },
      { text: "Pero cuanto más los oprimían, tanto más se multiplicaban y crecían, de modo que los egipcios llegaron a temer a los hijos de Israel.", audioUrl: "" },
      { text: "Los egipcios esclavizaron cruelmente a los hijos de Israel,", audioUrl: "" },
      { text: "y les amargaron la vida con duro trabajo de arcilla y ladrillos, y con toda clase de labores del campo; los sometieron a dura esclavitud en todos sus trabajos.", audioUrl: "" },
      { text: "El rey de Egipto habló también a las parteras de las hebreas, una de las cuales se llamaba Sifrá y la otra Fuá,", audioUrl: "" },
      { text: "y les dijo: «Cuando asistáis a las hebreas y veáis que el hijo va a nacer, si es niño, matadlo; si es niña, dejadla con vida».", audioUrl: "" },
      { text: "Pero las parteras temían a Dios, y no hicieron lo que les había mandado el rey de Egipto, sino que dejaron con vida a los niños.", audioUrl: "" },
      { text: "El rey de Egipto llamó a las parteras y les dijo: «¿Por qué habéis hecho esto y habéis dejado con vida a los niños?»", audioUrl: "" },
      { text: "Las parteras respondieron al faraón: «Es que las mujeres hebreas no son como las egipcias; son robustas y dan a luz antes de que llegue la partera».", audioUrl: "" },
      { text: "Dios favoreció a las parteras, y el pueblo se multiplicó y se hizo muy fuerte.", audioUrl: "" },
      { text: "Y por haber temido a Dios, él les concedió numerosa descendencia.", audioUrl: "" },
      { text: "Entonces el faraón dio esta orden a todo su pueblo: «Echad al Río a todo niño que nazca, pero a las niñas dejadlas con vida».", audioUrl: "" }
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
