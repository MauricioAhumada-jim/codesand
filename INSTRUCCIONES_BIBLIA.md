# Instrucciones para Agregar Versículos y Audio a la Biblia

Este documento explica cómo agregar contenido a la aplicación de lectura de la Biblia.

## Estructura de Archivos

El archivo principal que necesitas editar es:
```
client/src/lib/bible-data.ts
```

## Cómo Agregar Versículos

### Formato de los Versículos

Cada versículo tiene dos partes:
- `text`: El texto del versículo
- `audioUrl`: La URL del archivo de audio (puede estar vacía si no hay audio)

### Ejemplo de Estructura

```typescript
export const bibleContent: BibleContentStructure = {
  genesis: {
    1: [
      { text: "En el principio creó Dios los cielos y la tierra.", audioUrl: "https://tu-servidor.com/audio/genesis/1/1.mp3" },
      { text: "Y la tierra estaba desordenada y vacía...", audioUrl: "https://tu-servidor.com/audio/genesis/1/2.mp3" },
      // ... más versículos
    ],
    2: [
      { text: "Fueron, pues, acabados los cielos y la tierra...", audioUrl: "https://tu-servidor.com/audio/genesis/2/1.mp3" },
      // ... más versículos del capítulo 2
    ]
  },
  exodo: {
    1: [
      { text: "Estos son los nombres de los hijos de Israel...", audioUrl: "https://tu-servidor.com/audio/exodo/1/1.mp3" },
      // ... más versículos
    ]
  }
};
```

### Pasos para Agregar un Nuevo Libro

1. Abre el archivo `client/src/lib/bible-data.ts`
2. Busca el objeto `bibleContent`
3. Agrega el nuevo libro usando su ID (ver lista de IDs abajo)
4. Agrega cada capítulo como un número
5. Dentro de cada capítulo, agrega un array de versículos

### IDs de los Libros

Los IDs deben coincidir con los definidos en `bibleStructure`. Aquí están algunos ejemplos:

**Antiguo Testamento:**
- `genesis`, `exodo`, `levitico`, `numeros`, `deuteronomio`
- `josue`, `jueces`, `rut`, `1samuel`, `2samuel`
- `job`, `salmos`, `proverbios`, `eclesiastes`, `cantares`
- `isaias`, `jeremias`, `lamentaciones`, `ezequiel`, `daniel`

**Nuevo Testamento:**
- `mateo`, `marcos`, `lucas`, `juan`
- `hechos`
- `romanos`, `1corintios`, `2corintios`, `galatas`, `efesios`, `filipenses`, `colosenses`
- `hebreos`, `santiago`, `1pedro`, `2pedro`, `1juan`, `apocalipsis`

## Cómo Agregar Audio

### Preparar los Archivos de Audio

1. Graba o prepara archivos de audio para cada versículo
2. Guárdalos en formato MP3 (recomendado) o M4A
3. Organiza los archivos por libro/capítulo/versículo

### Subir los Archivos

Tienes varias opciones para hospedar los archivos de audio:

1. **Servicio de hosting de archivos** (recomendado para Netlify):
   - Cloudinary (plan gratuito disponible)
   - AWS S3
   - Google Cloud Storage
   - Firebase Storage

2. **Carpeta pública en Netlify**:
   - Crea una carpeta `public/audio/` en tu proyecto
   - Coloca los archivos ahí organizados por libro/capítulo
   - La URL sería: `https://tu-sitio.netlify.app/audio/genesis/1/1.mp3`

### Agregar las URLs de Audio

Una vez que tengas las URLs de tus archivos de audio, actualiza el archivo `bible-data.ts`:

```typescript
{ text: "En el principio creó Dios los cielos y la tierra.", audioUrl: "https://tu-cdn.com/genesis_1_1.mp3" },
```

Si un versículo no tiene audio todavía, deja la URL vacía:

```typescript
{ text: "Texto del versículo sin audio.", audioUrl: "" },
```

## Funcionamiento del Audio

### Reproducción de Versículo Individual
- Haz clic en un versículo para abrir el menú
- Presiona el botón de reproducir (icono de play)
- Solo se reproducirá ese versículo

### Reproducción Continua (Audiolibro)
- Haz clic en cualquier versículo para seleccionarlo como punto de inicio
- Presiona el botón "Reproducir" en la parte inferior
- La reproducción comenzará desde el versículo seleccionado
- Automáticamente pasará al siguiente versículo
- Cuando termine un capítulo, pasará al siguiente
- Cuando termine un libro, pasará al siguiente libro

## Despliegue en Netlify

### Opción 1: Desde GitHub

1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com) y crea una cuenta
3. Haz clic en "Add new site" > "Import an existing project"
4. Conecta tu repositorio de GitHub
5. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Haz clic en "Deploy site"

### Opción 2: Arrastrar y Soltar

1. Ejecuta `npm run build` en tu proyecto
2. Esto creará una carpeta `dist`
3. Ve a [netlify.com](https://netlify.com)
4. Arrastra la carpeta `dist` a la zona de carga

### Configuración Adicional para Netlify

Crea un archivo `netlify.toml` en la raíz del proyecto:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Esto asegura que las rutas funcionen correctamente en tu aplicación.

## Consejos

1. **Nombra los archivos de audio de forma consistente**: Usa un patrón como `libro_capitulo_versiculo.mp3`

2. **Prueba localmente primero**: Antes de subir, prueba que los audios se reproduzcan correctamente

3. **Usa un CDN para audio**: Para mejor rendimiento, considera usar un CDN para los archivos de audio

4. **Comprime los archivos**: Usa una tasa de bits de 64-128 kbps para audio de voz, esto reduce el tamaño sin perder calidad

5. **Haz backups**: Guarda una copia del archivo `bible-data.ts` antes de hacer cambios grandes
