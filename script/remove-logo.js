import sharp from 'sharp';
import fs from 'fs';

async function processIcon() {
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets');
  }

  const boxWidth = 180;
  const boxHeight = 180;

  console.log("🎨 Procesando imagen...");

  await sharp('nuevo_icono.png')
    .composite([
      {
        input: {
          create: {
            width: boxWidth,
            height: boxHeight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 1 } // Caja Negra sólida
          }
        },
        gravity: 'southeast' // Esquina inferior derecha
      }
    ])
    .toFile('assets/icon.png');
    
  console.log("✅ ¡Ícono procesado limpiamente y sin marca de agua!");
}

processIcon().catch(console.error);
