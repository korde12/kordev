---
name: kordev
description: Portal de entrada a una conferencia de diseño en órbita — nebulosa animada, titulares monumentales, portafolio de un desarrollador freelance.
colors:
  bg: "#05050d"
  bg-alt: "#090a16"
  surface: "#10101f"
  surface-2: "#161829"
  border: "#262a42"
  border-soft: "#1a1c2f"
  text: "#f1eff7"
  text-dim: "#a6a5bf"
  text-faint: "#6f6e8c"
  accent-green: "#2ef58f"
  accent-blue: "#6ea8ff"
  accent-violet: "#b98bff"
  syntax-comment: "#5c6478"
  syntax-number: "#fbbf24"
  device-bezel: "#1b1e28"
  whatsapp-brand: "#25d366"
typography:
  display:
    fontFamily: "Unbounded, Hanken Grotesk, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Unbounded, Hanken Grotesk, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Unbounded, Hanken Grotesk, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.005em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, Consolas, monospace"
    fontSize: "0.74rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "3px"
  md: "4px"
  lg: "20px"
  pill: "100px"
spacing:
  sm: "18px"
  md: "32px"
  lg: "60px"
  xl: "104px"
components:
  button-primary:
    backgroundColor: "{colors.accent-green}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "16px 30px"
  button-primary-hover:
    backgroundColor: "{colors.accent-green}"
    textColor: "{colors.bg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "16px 30px"
---

# Design System: kordev

## Overview

**Creative North Star: "El portal de la conferencia en órbita"**

kordev no se presenta como una web de plantilla con un par de acentos de color: se presenta como el punto de entrada a una conferencia de diseño que ocurre en el espacio, donde una nebulosa respira despacio detrás de titulares monumentales en mayúsculas. El visitante entra por un contador de carga que cuenta hasta 100, como si estuviera accediendo a una sala, y aterriza en un primer viewport dominado por el titular y el color en movimiento. El resto del sistema — servicios como "sesiones" de programa, el proceso como protocolo de lanzamiento, los proyectos como demos en directo — mantiene ese mismo registro: preciso, confiado, sin plantillas genéricas de icono+texto.

Rechazado explícitamente: el tema oscuro con acento neón único y bordes con resplandor plano (dirección anterior de la web), las tarjetas de icono+título+texto del mismo tamaño, y cualquier hero genérico de título+párrafo+dos botones sin una demostración real detrás.

**Key Characteristics:**
- Fondo de nebulosa animada en canvas (violeta, verde, azul) que se mueve muy despacio detrás de toda la página.
- Titulares en Unbounded, mayúsculas, a escala de cartel.
- Cursor propio con estela que se agranda sobre elementos interactivos.
- Contador de carga 0→100 antes de revelar la página.
- Componentes reales (proyecto.js, mockups de navegador/móvil) como prueba, no decoración.

## Colors

Casi negro azulado como base, con tres acentos saturados (verde terminal, azul eléctrico, violeta) que solo aparecen en la nebulosa, en llamadas a la acción y en detalles de código — nunca los tres a la vez en un mismo componente.

### Primary
- **Verde terminal** (`#2ef58f`): color de acción — botones primarios, badge de disponibilidad, salida `> listo` de proyecto.js, hover de tarjetas.

### Secondary
- **Azul eléctrico** (`#6ea8ff`): segundo acento — enlaces de código, iconos de contacto, foco de campos de formulario, sello 02 de la línea de tiempo.

### Tertiary
- **Violeta órbita** (`#b98bff`): tercer acento, más contenido — palabras clave de proyecto.js, detalle de nebulosa; nunca en botones.

### Neutral
- **Índigo casi negro** (`#05050d`): fondo base de toda la página.
- **Índigo alterno** (`#090a16`): fondo de secciones alternas (servicios, contacto).
- **Superficie** (`#10101f`) / **Superficie elevada** (`#161829`): tarjetas, ventana de código, formulario.
- **Borde** (`#262a42`) / **Borde suave** (`#1a1c2f`): separadores y contornos de tarjeta.
- **Texto** (`#f1eff7`): texto principal sobre fondo oscuro.
- **Texto atenuado** (`#a6a5bf`) / **Texto tenue** (`#6f6e8c`): cuerpo secundario y metadatos.

### Named Rules
**The One Nebula Rule.** El degradado de tres colores completo solo vive en el canvas de fondo. En componentes de UI, cada superficie usa como máximo un acento saturado a la vez.

### Sub-paletas con contexto propio
Tres familias de color viven fuera de la paleta principal a propósito, porque responden a una convención distinta a la del sitio:
- **Resaltado de sintaxis** (`syntax-comment` `#5c6478`, `syntax-number` `#fbbf24`): dentro de `proyecto.js`, comentarios y números siguen la convención de un editor de código, no el acento de marca.
- **Marca de WhatsApp** (`whatsapp-brand` `#25d366`): el botón flotante y su icono deben coincidir con el verde oficial de WhatsApp, no con el verde de acento del sitio — es una identidad ajena, no una elección de kordev.
- **Bisel de dispositivo** (`device-bezel` `#1b1e28`): el marco del mockup de móvil es un tono propio, ligeramente más claro que `surface`, para leerse como el borde físico de un teléfono y no como una tarjeta más.

## Typography

**Display Font:** Unbounded (con Hanken Grotesk de respaldo)
**Body Font:** Hanken Grotesk (con system-ui de respaldo)
**Label/Mono Font:** JetBrains Mono

**Character:** Unbounded aporta el peso de cartel de conferencia — geométrica, sin remates, mayúsculas por defecto en los titulares. Hanken Grotesk lleva el cuerpo con una lectura neutra y cálida. JetBrains Mono queda reservado a código real y etiquetas técnicas, nunca como decoración de "aire tech".

### Hierarchy
- **Display** (800, `clamp(2.4rem, 5.6vw, 4.4rem)`, 1.05): titular del hero, en mayúsculas.
- **Headline** (800, `clamp(1.8rem, 4vw, 2.9rem)`, 1.08): títulos de sección, en mayúsculas.
- **Title** (700-800, `1.1–1.9rem`): títulos de tarjeta de servicio y de proyecto.
- **Body** (400, 1rem, 1.65): párrafos; medida cómoda, sin justificar.
- **Label** (500, `.74–.86rem`, tracking `.08–.14em`, mayúsculas): navegación, etiquetas de sección, contador de carga.

### Named Rules
**The Uppercase-For-Weight Rule.** Las mayúsculas se reservan para titulares y etiquetas cortas; el cuerpo de texto siempre va en minúsculas para no fatigar la lectura.

## Layout

Contenedor centrado a `1180px` con `24px` de padding lateral. El hero usa una rejilla de dos columnas (contenido / ventana de código) que colapsa a una columna por debajo de `980px`. Las secciones alternan fondo base y fondo alterno (`--bg` / `--bg-alt`) para marcar ritmo sin usar bordes decorativos. Padding vertical de sección: `104px` en escritorio, `76px` en móvil (`<760px`). El listado de servicios es una tabla de filas (`.ledger`), no tarjetas; el proceso es una línea de tiempo vertical con sellos numerados.

## Elevation & Depth

Sistema mixto: superficies mayormente planas sobre el fondo, con profundidad real solo en los elementos "objeto" — la ventana de código y los mockups de navegador/móvil — que llevan sombra difusa hacia abajo y una ligera perspectiva 3D en reposo que se endereza al pasar el ratón.

### Shadow Vocabulary
- **Elevación de panel** (`0 24px 60px -22px rgba(0,0,0,.85)`): ventana de código, mockups de navegador, tarjetas de formulario.
- **Pulso de finalización** (`0 0 46px -8px rgba(46,245,143,.5)`): destello único cuando `proyecto.js` termina de "ejecutarse".

### Named Rules
**The Object Depth Rule.** Solo los elementos que representan un objeto físico (ventana, navegador, teléfono) llevan sombra y perspectiva; el resto de la interfaz permanece plano.

## Shapes

Esquinas discretas y consistentes: `3px` en botones, entradas y contenedores estándar; `4px` en tarjetas y el formulario. Sin esquinas muy redondeadas ni esquinas a cero; el badge de disponibilidad y las etiquetas (`tags`) usan cápsula completa (`100px`) como único elemento circular del sistema, junto al punto del cursor y el sello de la línea de tiempo. Las tarjetas flotantes de servicios (`.ledger__row`) son la única excepción deliberada: usan `20px` (`rounded.lg`), un radio más generoso propio de su tratamiento de cristal esmerilado, para diferenciarse visualmente de las tarjetas planas estándar.

## Components

### Buttons
- **Shape:** `3px` de radio.
- **Primary:** fondo verde terminal (`#2ef58f`), texto en el color de fondo base (`#05050d`), `16px 30px`; se eleva `-2px` y refuerza su resplandor al hover.
- **Ghost:** transparente con borde `--border`; al hover cambia borde y texto a azul eléctrico y se eleva `-2px`.

### Cards / Containers
- **Corner Style:** `4px`.
- **Background:** superficie (`#10101f`) sobre fondo de sección.
- **Shadow Strategy:** ver Elevación — solo la ventana de código y los mockups llevan sombra; las tarjetas de contacto y el formulario van planos con borde.
- **Border:** `1px solid var(--border)`.

### Tarjetas de cristal (servicios)
Variante de tarjeta reservada al listado de servicios (`.ledger__row`) y al botón secundario del hero (`.btn--glass`): fondo semitransparente (`rgba(22,24,41,.46–.5)`) con `backdrop-filter: blur(18px)`, radio `20px` (`rounded.lg`) y sombra difusa amplia. Las tarjetas flotan con una animación vertical sutil y desfasada entre sí, que se pausa al hover o foco para no interferir con la lectura.

### Inputs / Fields
- **Style:** fondo `--bg`, borde `--border`, radio `3px`.
- **Focus:** borde azul eléctrico + halo `0 0 0 3px rgba(110,168,255,.14)`.
- **Error:** borde violeta órbita.

### Navigation
- Enlaces finos en JetBrains Mono, mayúsculas, `.74rem`, tracking `.14em`, color texto atenuado; al hover se aclaran y el tracking se abre a `.2em` (sin subrayado ni barra inferior). El CTA final se destaca como botón primario. En móvil, el menú se despliega como panel a pantalla completa bajo la barra.

### Marca kordev
Isotipo de Marco: anillo rectangular redondeado con dos vértices de llave (`{` `}`) en los costados y un trazo tipo `Ʒ` en el interior. Vive como `<symbol id="marcaKordev">` en el sprite de `index.html` y se invoca con `<use>`, de forma que hereda el color del contexto (`currentColor`) y siempre va en el verde de acento. Tres usos: lockup de navegación y pie (marca 30px + «KORDEV» en Unbounded 700, mayúsculas, tracking `.15em`), pantalla de carga (62px con halo verde sobre el contador) y favicon (`favicon.svg`, marca sobre cuadrado redondeado `--bg`). El archivo suelto vive en `assets/img/logo.svg`.

### Ventana proyecto.js (componente de firma)
Panel de código con barra de tres puntos (violeta/azul/verde) y título de archivo en mono. El código se teclea carácter a carácter con ritmo irregular, se detiene brevemente antes de imprimir la salida `> listo` y remata con un pulso de color al terminar. Respeta `prefers-reduced-motion` mostrando el contenido ya completo. El resaltado de sintaxis usa los tres acentos de marca para claves/funciones/strings, más `syntax-comment` y `syntax-number` (ver Sub-paletas) para comentarios y literales numéricos, siguiendo la convención de un editor de código real.

### Mockups de navegador y móvil
Ventanas "objeto" que enmarcan las capturas de proyectos reales. El mockup de móvil usa `device-bezel` como color de marco y fondo, un tono propio pensado para leerse como carcasa física, no como superficie de la interfaz.

### Nebulosa de fondo (componente de firma)
Canvas fijo a pantalla completa detrás de todo el contenido, con cuatro manchas radiales (violeta, verde, azul, violeta claro) que se desplazan lentamente mediante funciones seno/coseno. Sirve de fondo ambiental para toda la página, no solo el hero.

## Do's and Don'ts

### Do:
- **Do** mantener el degradado completo de la nebulosa únicamente en el canvas de fondo; los componentes de UI usan un acento saturado a la vez (The One Nebula Rule).
- **Do** usar Unbounded en mayúsculas solo para titulares y etiquetas cortas; el cuerpo siempre en minúsculas.
- **Do** dar sombra y perspectiva solo a los elementos "objeto" (ventana de código, mockups); el resto de la interfaz va plano.
- **Do** respetar `prefers-reduced-motion` en la nebulosa, el cursor, el contador de carga y la animación de `proyecto.js`.

### Don't:
- **Don't** volver al trío verde/cian/violeta neón de la dirección anterior ni al horizonte de rejilla en perspectiva.
- **Don't** usar tarjetas de icono+título+texto del mismo tamaño como estructura de página.
- **Don't** añadir un kicker o eyebrow encima de un titular nuevo.
- **Don't** usar sombras duras con offset (`box-shadow` sin difuminado); la única sombra dura del sistema es decorativa dentro de `proyecto.js`, no un patrón a repetir.
