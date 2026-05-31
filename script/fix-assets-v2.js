import sharp from 'sharp';
import fs from 'fs';

async function processIcon() {
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets');
  }

  console.log("🔍 Analizando el archivo 'icono_nuevo1.png'...");
  const image = sharp('icono_nuevo1.png');

  // Tomamos una muestra de la esquina superior izquierda (0,0) para detectar el color real de fondo
  const rawPixel = await image.extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
  
  const r = rawPixel[0];
  const g = rawPixel[1];
  const b = rawPixel[2];
  
  const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  console.log(`🎨 Color de fondo de tu original detectado: ${hexColor}`);

  // Empaquetamos la nueva imagen con 'contain'
  console.log("⚙️ Re-ajustando icono para no deformarse a la caja oficial 1024x1024...");
  await sharp('icono_nuevo1.png')
    .resize(1024, 1024, {
      fit: 'contain',
      background: { r, g, b, alpha: 1 }
    })
    .toFile('assets/icon.png');
    
  // Generamos el splash estático
  console.log(`🌑 Generando pantalla de carga con color matemático: ${hexColor}...`);
  await sharp({
    create: { width: 2732, height: 2732, channels: 4, background: { r, g, b, alpha: 1 } }
  }).png().toFile('assets/splash.png');
  
  await sharp({
    create: { width: 2732, height: 2732, channels: 4, background: { r, g, b, alpha: 1 } }
  }).png().toFile('assets/splash-dark.png');
  
  // Modificamos capacitor.config.ts dinámicamente
  const configPath = 'capacitor.config.ts';
  let configStr = fs.readFileSync(configPath, 'utf8');
  configStr = configStr.replace(/backgroundColor: "#[0-9a-fA-F]*"/, `backgroundColor: "${hexColor}"`);
  fs.writeFileSync(configPath, configStr);

  console.log("✅ ¡Todo calculado! ¡A iniciar generador Android!");
}

processIcon().catch(console.error);
