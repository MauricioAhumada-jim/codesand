import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

interface BibleVerseReminder {
  citation: string;
  text: string;
}

const BIBLE_VERSES: BibleVerseReminder[] = [
  { citation: "Filipenses 4:13", text: "Todo lo puedo en Cristo que me fortalece." },
  { citation: "Salmos 23:1", text: "El Señor es mi pastor; nada me faltará." },
  { citation: "Juan 3:16", text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito." },
  { citation: "Josué 1:9", text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes." },
  { citation: "Romanos 8:28", text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien." },
  { citation: "Proverbios 3:5", text: "Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia." },
  { citation: "Salmos 46:1", text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones." },
  { citation: "Juan 14:6", text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí." },
  { citation: "Gálatas 5:22", text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe." },
  { citation: "1 Corintios 13:4", text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso." },
  { citation: "Salmos 119:105", text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." },
  { citation: "Isaías 40:31", text: "Pero los que esperan en el Señor renovarán sus fuerzas; volarán como las águilas." },
  { citation: "Mateo 6:33", text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas." },
  { citation: "Romanos 12:2", text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento." },
  { citation: "Proverbios 16:3", text: "Encomienda tus obras al Señor, y se realizarán tus proyectos." },
  { citation: "Salmos 37:4", text: "Busca tu delicia en el Señor, y él te dará lo que pide tu corazón." },
  { citation: "Filipenses 4:6", text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios." },
  { citation: "Deuteronomio 31:6", text: "Sean fuertes y valientes, no teman, porque el Señor tu Dios va contigo." },
  { citation: "Salmos 121:1-2", text: "Levanto mi mirada a los montes: ¿de dónde me vendrá el auxilio? Mi auxilio viene del Señor." },
  { citation: "Mateo 11:28", text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." },
  { citation: "Hebreos 11:1", text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve." },
  { citation: "Santiago 1:5", text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente." },
  { citation: "1 Pedro 5:7", text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros." },
  { citation: "Salmos 34:8", text: "Gusten y vean qué bueno es el Señor; dichoso el hombre que confía en él." },
  { citation: "Isaías 41:10", text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo." },
  { citation: "Apocalipsis 3:20", text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él." },
  { citation: "Juan 16:33", text: "Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo." },
  { citation: "Efesios 4:32", text: "Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros." },
  { citation: "Salmos 19:14", text: "Sean gratas las palabras de mi boca, y el susurro de mi corazón ante ti, Señor." },
  { citation: "Proverbios 4:23", text: "Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida." }
];

export async function initializeNotifications() {
  if (!Capacitor.isNativePlatform()) {
    console.log("ℹ️ Notificaciones locales omitidas (No estamos en plataforma nativa)");
    return;
  }

  try {
    // 1. Crear el canal de notificaciones con importancia alta (Banner + Sonido)
    await LocalNotifications.createChannel({
      id: 'daily-verses-v1',
      name: 'Versículos Diarios',
      description: 'Recordatorios con versículos de la Biblia por la mañana, tarde y noche',
      importance: 5, // 5 = IMPORTANCE_MAX / IMPORTANCE_HIGH (muestra el banner)
      visibility: 1, // 1 = VISIBILITY_PUBLIC (visible en pantalla de bloqueo)
      vibration: true,
      sound: 'default'
    });
    console.log("✅ Canal de notificaciones 'daily-verses-v1' creado correctamente.");

    // 2. Verificar y solicitar permisos de notificaciones de forma segura
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
    // 1. Cancelar las notificaciones programadas anteriores para evitar duplicados
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({
        notifications: pending.notifications.map(n => ({ id: n.id }))
      });
      console.log("🧹 Notificaciones anteriores canceladas.");
    }

    const notifications = [];
    const chosenIndices = new Set<number>();
    const now = new Date();

    const timeConfigs = {
      8: {
        titles: [
          "✨ Un nuevo día en su Palabra",
          "☀️ Tu bendición de la mañana",
          "🕊️ Comienza tu día con fe"
        ],
        suffix: "Que la palabra de Dios guíe hoy tus pasos. Toca para abrir."
      },
      14: {
        titles: [
          "📖 Un respiro para tu alma",
          "🌱 Renueva tus fuerzas hoy",
          "⚡ Tu pausa de fe y paz"
        ],
        suffix: "Tómate un breve momento para reconectar con Dios. Toca para leer."
      },
      20: {
        titles: [
          "🌙 Paz para tu descanso",
          "🌌 Termina tu día en su amor",
          "🙏 Descansa confiado en el Señor"
        ],
        suffix: "Entrega tu noche a Dios y descansa en paz. Toca aquí."
      }
    };

    // 2. Programar para los próximos 10 días, 3 veces al día
    for (let dayOffset = 0; dayOffset < 10; dayOffset++) {
      const times = [
        { hour: 8, label: "Mañana" },
        { hour: 14, label: "Tarde" },
        { hour: 20, label: "Noche" }
      ];

      for (const timeObj of times) {
        const scheduleDate = new Date();
        scheduleDate.setDate(scheduleDate.getDate() + dayOffset);
        scheduleDate.setHours(timeObj.hour, 0, 0, 0);

        // Si la hora programada ya pasó, saltar esta iteración
        if (scheduleDate.getTime() <= now.getTime()) {
          continue;
        }

        // Obtener un versículo aleatorio sin repetir en la misma tanda si es posible
        let randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
        while (chosenIndices.size < BIBLE_VERSES.length && chosenIndices.has(randomIndex)) {
          randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
        }
        chosenIndices.add(randomIndex);
        if (chosenIndices.size === BIBLE_VERSES.length) {
          chosenIndices.clear(); // Resetear si agotamos los versículos
        }
        const verse = BIBLE_VERSES[randomIndex];

        const config = timeConfigs[timeObj.hour as 8 | 14 | 20];
        const randomTitleIndex = Math.floor(Math.random() * config.titles.length);
        const title = config.titles[randomTitleIndex];
        const body = `"${verse.text}" — ${verse.citation}. ${config.suffix}`;

        notifications.push({
          id: 2000 + dayOffset * 3 + (timeObj.hour === 8 ? 0 : timeObj.hour === 14 ? 1 : 2),
          title: title,
          body: body,
          channelId: 'daily-verses-v1', // Canal de alta prioridad para banner emergente
          schedule: {
            at: scheduleDate
          },
          sound: undefined,
          attachments: [],
          extra: null
        });
      }
    }

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
      console.log(`📅 ${notifications.length} notificaciones de versículos programadas con éxito (3 veces al día).`);
    } else {
      console.log("ℹ️ No se programaron nuevas notificaciones porque todas las horas asignadas para hoy ya pasaron.");
    }
  } catch (error) {
    console.error("❌ Error programando versículos diarios:", error);
  }
}
