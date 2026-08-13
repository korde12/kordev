# Portfolio — Marco Cordero

Landing page de portfolio para captar clientes: muestra los proyectos reales
(Wall Burger y The Factory Phone) y lleva a **agendar cita / pedir presupuesto**.

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

## Publicarla

Al ser estática vale cualquier hosting gratuito: sube la carpeta entera a
Netlify (arrastrar y soltar), Vercel, Cloudflare Pages o GitHub Pages.

## Actualizar las capturas de los proyectos

Las imágenes de `assets/img/` se generaron con Chrome en modo headless:

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,1000 --screenshot="assets/img/wallburguer.png" https://wallburguer.com
```

Para la versión móvil se usa `--window-size=480,1040 --force-device-scale-factor=2`
y un user-agent de iPhone.

## Añadir un proyecto nuevo

Copia un bloque `<article class="project">` completo en `index.html`, cambia
imágenes, textos y enlaces. Si va a la izquierda o a la derecha lo decide la
clase `project--reverse`.
