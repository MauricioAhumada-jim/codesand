import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

interface BibleVerseReminder {
  citation: string;
  text: string;
}

const BIBLE_VERSES: BibleVerseReminder[] = [
  { citation: "Filipenses 4:13", text: "Todo lo puedo en Cristo que me fortalece." },
  { citation: "Salmos 23:1", text: "Jehová es mi pastor; nada me faltará." },
  { citation: "Juan 3:16", text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito." },
  { citation: "Josué 1:9", text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes." },
  { citation: "Romanos 8:28", text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien." },
  { citation: "Proverbios 3:5", text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia." },
  { citation: "Salmos 46:1", text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones." },
  { citation: "Juan 14:6", text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí." },
  { citation: "Gálatas 5:22", text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe." },
  { citation: "1 Corintios 13:4", text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso." },
  { citation: "Salmos 119:105", text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." },
  { citation: "Isaías 40:31", text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas." },
  { citation: "Mateo 6:33", text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas." },
  { citation: "Romanos 12:2", text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento." },
  { citation: "Proverbios 16:3", text: "Encomienda a Jehová tus obras, y tus pensamientos serán afirmados." },
  { citation: "Salmos 37:4", text: "Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón." },
  { citation: "Filipenses 4:6", text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios." },
  { citation: "Deuteronomio 31:6", text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios va contigo." },
  { citation: "Salmos 121:1-2", text: "Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová." },
  { citation: "Mateo 11:28", text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." },
  { citation: "Hebreos 11:1", text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve." },
  { citation: "Santiago 1:5", text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente." },
  { citation: "1 Pedro 5:7", text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros." },
  { citation: "Salmos 34:8", text: "Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él." },
  { citation: "Isaías 41:10", text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo." },
  { citation: "Apocalipsis 3:20", text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él." },
  { citation: "Juan 16:33", text: "Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo." },
  { citation: "Efesios 4:32", text: "Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros." },
  { citation: "Salmos 19:14", text: "Sean gratos los dichos de mi boca y la meditación de mi corazón delante de ti, oh Jehová." },
  { citation: "Proverbios 4:23", text: "Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida." }
];

export async function initializeNotifications() {
  if (!Capacitor.isNativePlatform()) {
    console.log("ℹ️ Notificaciones locales omitidas (No estamos en plataforma nativa)");
    return;
  }

  try {
    // 1. Verificar y solicitar permisos de notificaciones de forma segura
    let status = await LocalNotifications.checkPermissions();
    if (status.display !== 'granted') {
      status = await LocalNotifications.requestPermissions();
    }

    if (status.display === 'granted') {
      console.log("✅ Permiso de notificaciones otorgado.");
      await scheduleDailyBibleVerses();
    } else {
      console.warn("⚠️ Permiso de notificaciones denegado por el usuario.");
    }
  } catch (error) {
    console.error("❌ Error al inicializar notificaciones:", error);
  }
}

export async function scheduleDailyBibleVerses() {
  try {
    // 1. Cancelar las notificaciones programadas anteriores para evitar duplicados y desorden
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({
        notifications: pending.notifications.map(n => ({ id: n.id }))
      });
      console.log("🧹 Notificaciones anteriores canceladas.");
    }

    const notifications = [];
    const chosenIndices = new Set<number>();

    // 2. Programar 14 días de notificaciones (las próximas dos semanas)
    for (let i = 1; i <= 14; i++) {
      // Obtener un versículo aleatorio sin repetir en la misma tanda si es posible
      let randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
      while (chosenIndices.size < BIBLE_VERSES.length && chosenIndices.has(randomIndex)) {
        randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
      }
      chosenIndices.add(randomIndex);
      const verse = BIBLE_VERSES[randomIndex];

      // Definir la fecha del recordatorio para las 9:00 AM del día 'i'
      const scheduleDate = new Date();
      scheduleDate.setDate(scheduleDate.getDate() + i);
      scheduleDate.setHours(9, 0, 0, 0);

      notifications.push({
        id: 1000 + i, // IDs únicos del 1001 al 1014
        title: "📖 Momento de reflexionar",
        body: `"${verse.text}" — ${verse.citation}. Tómate un momento hoy para leer la palabra de Dios.`,
        schedule: {
          at: scheduleDate
        },
        sound: undefined,
        attachments: [],
        extra: null
      });
    }

    await LocalNotifications.schedule({ notifications });
    console.log("📅 14 días de versículos diarios programados con éxito.");
  } catch (error) {
    console.error("❌ Error programando versículos diarios:", error);
  }
}
