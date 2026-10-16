# Portfolio — Marco Cordero

Landing page de portfolio para captar clientes: muestra los proyectos reales
(Wall Burger, The Factory Phone y Tapisol) y lleva a **agendar cita / pedir presupuesto**.

HTML, CSS y JavaScript puros. Sin dependencias, sin compilar nada.

## Estructura

```
index.html                → toda la página (textos y secciones)
assets/css/styles.css     → estilos
assets/js/main.js         → interacción (menú, animaciones, formulario)
assets/img/               → capturas de las webs (escritorio + móvil)
```

## Antes de publicarla: cambia esto

1. **Tus datos de contacto** → `assets/js/main.js`, bloque `CONFIG` (arriba del todo):
   - `whatsapp`: tu número con prefijo, solo dígitos → `'34600112233'`
   - `telefonoVisible`: cómo se ve en pantalla
   - `email`: tu correo de contacto
2. **Tu nombre** → busca `Marco Cordero` en `index.html` (aparece en el título,
   el hero, el footer) y en el logo `<marco/>`.
3. **Textos y precios del formulario** → los tramos de presupuesto están en
   `index.html`, dentro del `<select id="presupuesto">`.

## Cómo funciona el formulario

Por defecto **no necesita servidor**: al enviarlo se abre WhatsApp con todos los
datos ya escritos, listo para mandar.

Si prefieres recibirlo por email, crea una cuenta gratuita en
[formspree.io](https://formspree.io), copia tu endpoint y pégalo en
`CONFIG.formEndpoint` dentro de `assets/js/main.js`. El resto es automático.

## Ver la página en local

Abre `index.html` con doble clic. Ya está.

## Publicarla en Vercel (kordev.es)

La carpeta ya es un repositorio git con el primer commit hecho y lleva
`vercel.json` con cabeceras de caché y seguridad.

1. Crea un repositorio **vacío** en <https://github.com/new> llamado `kordev`
   (sin README, sin .gitignore).
2. En una terminal dentro de esta carpeta:

   ```bash
   git remote add origin https://github.com/TU-USUARIO/kordev.git
   git push -u origin main
   ```

3. Entra en <https://vercel.com/new>, importa el repositorio `kordev` y pulsa
   **Deploy**. No hay que configurar nada: es una web estática.
4. Queda publicada en `https://www.kordev.es` (el dominio principal en Vercel es
   `www`; `kordev.es` responde 308 hacia él).

A partir de ahí, cada `git push` la actualiza sola.

### Si prefieres no usar GitHub

Instala Node (`winget install OpenJS.NodeJS.LTS`), abre una terminal en esta
carpeta y ejecuta `npx vercel login` y después `npx vercel --prod`. Cuando
pregunte el nombre del proyecto, escribe `kordev`.

### Al cambiar de dominio

El dominio es `https://www.kordev.es` (con `www`: es el principal en Vercel).
Si cambia, busca y reemplaza `www.kordev.es` en
`index.html`, `robots.txt` y `sitemap.xml`.

## Actualizar las capturas de los proyectos

Las imágenes de `assets/img/` se generaron con Chrome en modo headless:

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,1000 --screenshot="captura.png" https://wallburguer.com
```

Para la versión móvil se usa `--window-size=480,1040 --force-device-scale-factor=2`
y un user-agent de iPhone.

La web sirve WebP (un PNG pesa ~10 veces más). Convierte la captura y borra el PNG:

```bash
ffmpeg -i captura.png -c:v libwebp -quality 82 -compression_level 6 assets/img/wallburguer.webp
```

La captura móvil sale a 960x2080, pero en pantalla el móvil mide 130 px: reescálala
a 480x1040 para que no pese de más.

```bash
ffmpeg -i captura-movil.png -vf scale=480:1040 -c:v libwebp -quality 82 -compression_level 6 assets/img/wallburguer-mobile.webp
```

De la captura de escritorio hacen falta **dos tamaños**: la de 1440 px (pantallas
retina) y una de 800 px que es la que se baja el móvil. El `srcset` del `index.html`
elige sola la que toque.

```bash
ffmpeg -i captura.png -vf scale=800:556 -c:v libwebp -quality 82 -compression_level 6 assets/img/wallburguer-800.webp
```

## Añadir un proyecto nuevo

Copia un bloque `<article class="project">` completo en `index.html`, cambia
imágenes, textos y enlaces. Si va a la izquierda o a la derecha lo decide la
clase `project--reverse`.
