import sharp from 'sharp';
import fs from 'fs';

async function processIcon() {
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets');
  }

  console.log("✂️ Recortando orillas blancas (zoom in)...");

  // Primero recortamos las orillas para quitar los filos redondeados blancos
  const croppedImageBuffer = await sharp('nuevo_icono.png')
    .extract({ left: 60, top: 60, width: 904, height: 904 }) // Nos comemos las orillas problemáticas
    .resize(1024, 1024) // Regresamos al tamaño original (Estirado)
    .toBuffer();

  const boxWidth = 180;
  const boxHeight = 180;

  console.log("🎨 Pintando y limpiando zona de agua...");

  // Aplicamos la marca negra
  await sharp(croppedImageBuffer)
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
        gravity: 'southeast' // Pegado abajo a la derecha
      }
    ])
    .toFile('assets/icon.png');
    
  console.log("✅ ¡Ícono procesado limpiamente!");

  console.log("🌑 Generando fondo de pantalla estático de carga (Black Splash Screen)...");
  
  // Creamos la pantalla de inicio negra de 2732x2732 px (máximo soportado)
  await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 } // Todo negro
    }
  })
  .png()
  .toFile('assets/splash.png');

  console.log("✅ ¡Splash Screen Oscuro y misterioso completado!");
}

processIcon().catch(console.error);
