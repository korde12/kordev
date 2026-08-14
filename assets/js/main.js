/* =========================================================
   Portfolio — Marco Cordero
   JS sin dependencias.
   ⚙️  TODO lo que tienes que cambiar está en CONFIG.
   ========================================================= */

const CONFIG = {
  // Tu WhatsApp en formato internacional, solo números (34 = España)
  whatsapp: '34672096769',

  // Cómo se muestra el teléfono en pantalla
  telefonoVisible: '+34 672 09 67 69',

  // Tu email de contacto
  email: 'corderojuradomarco@gmail.com',

  // OPCIONAL: si algún día quieres recibir el formulario por email de verdad,
  // crea una cuenta gratis en https://formspree.io y pega aquí tu endpoint.
  // Ejemplo: 'https://formspree.io/f/xxxxxxx'
  // Si lo dejas vacío, el formulario abrirá WhatsApp con el mensaje ya escrito.
  formEndpoint: ''
};

/* ---------------------------------------------------------
   0. Contador de carga (0 â†’ 100) y nebulosa de fondo
   --------------------------------------------------------- */
(function loaderYNebula() {
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('loader');
  const count = document.getElementById('loaderCount');
  const canvas = document.getElementById('nebula');

  // --- Contador de carga ---
  if (loader && count) {
    if (reducido) {
      loader.classList.add('is-done');
    } else {
      document.body.classList.add('is-loading');
      let n = 0;
      const total = 100;
      const duracion = 1100;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duracion);
        n = Math.round(p * total);
        count.textContent = n;
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          document.body.classList.remove('is-loading');
          loader.classList.add('is-done');
        }
      };
      requestAnimationFrame(tick);
    }
  }

  // --- Nebulosa animada (shader "a mano" con canvas 2D) ---
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const blobs = [
    { color: '99,60,220', rx: .32, ry: .28, r: .55, sx: .00011, sy: .00016, phase: 0 },
    { color: '46,245,143', rx: .68, ry: .62, r: .5,  sx: .00014, sy: .0001,  phase: 2 },
    { color: '110,168,255', rx: .55, ry: .18, r: .46, sx: .00009, sy: .00019, phase: 4 },
    { color: '185,139,255', rx: .2, ry: .74, r: .4,  sx: .00017, sy: .00012, phase: 1 }
  ];

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#05050d';
    ctx.fillRect(0, 0, w, h);

    blobs.forEach(b => {
      const cx = (b.rx + Math.sin(t * b.sx + b.phase) * .12) * w;
      const cy = (b.ry + Math.cos(t * b.sy + b.phase) * .12) * h;
      const radius = b.r * Math.max(w, h);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `rgba(${b.color},.55)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    });

    if (!reducido) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ---------------------------------------------------------
   0b. Cursor con estela de distorsión (solo puntero fino)
   --------------------------------------------------------- */
(function cursorPersonalizado() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.classList.add('is-active');
  });

  document.querySelectorAll('a, button, .window').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  function seguir() {
    cx += (mx - cx) * .16;
    cy += (my - cy) * .16;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(seguir);
  }
  requestAnimationFrame(seguir);
})();

/* ---------------------------------------------------------
   1. Datos de contacto dinámicos
   --------------------------------------------------------- */
(function aplicarContacto() {
  const waBase = `https://wa.me/${CONFIG.whatsapp}`;
  const saludo = encodeURIComponent('¡Hola Marco! Te escribo desde tu web, me gustaría pedirte presupuesto para un proyecto.');

  const set = (id, attr, value) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
  };
  const text = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  set('waLink', 'href', `${waBase}?text=${saludo}`);
  set('fabWa', 'href', `${waBase}?text=${saludo}`);
  set('mailLink', 'href', `mailto:${CONFIG.email}`);
  set('callLink', 'href', `tel:+${CONFIG.whatsapp}`);

  text('waText', CONFIG.telefonoVisible);
  text('callText', CONFIG.telefonoVisible);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------------------------------------------------------
   2. Navegación (fondo al hacer scroll + menú móvil)
   --------------------------------------------------------- */
(function navegacion() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const fab = document.getElementById('fabWa');

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 20);
    if (fab) fab.classList.toggle('is-visible', y > 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const cerrarMenu = () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const abierto = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', abierto);
    toggle.setAttribute('aria-expanded', String(abierto));
  });

  links.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrarMenu));
})();

/* ---------------------------------------------------------
   3. Animaciones al hacer scroll
   --------------------------------------------------------- */
(function revelar() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('is-visible'), i * 90);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => io.observe(el));
})();

/* ---------------------------------------------------------
   4. Formulario de contacto
   --------------------------------------------------------- */
(function formulario() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nota = document.getElementById('formNote');
  const boton = form.querySelector('button[type="submit"]');

  const aviso = (msg, tipo) => {
    nota.textContent = msg;
    nota.className = 'form__note' + (tipo ? ` is-${tipo}` : '');
  };

  const validar = () => {
    let ok = true;
    form.querySelectorAll('[required]').forEach(campo => {
      const grupo = campo.closest('.field');
      const vacio = !campo.value.trim();
      const emailMal = campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campo.value.trim());
      const malo = vacio || emailMal;
      grupo.classList.toggle('has-error', malo);
      if (malo) ok = false;
    });
    return ok;
  };

  form.querySelectorAll('[required]').forEach(campo => {
    campo.addEventListener('input', () => campo.closest('.field').classList.remove('has-error'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validar()) {
      aviso('Revisa los campos marcados en rojo.', 'err');
      return;
    }

    const d = Object.fromEntries(new FormData(form).entries());

    // --- Opción A: endpoint configurado (Formspree u otro) ---
    if (CONFIG.formEndpoint) {
      const textoOriginal = boton.innerHTML;
      boton.disabled = true;
      boton.textContent = 'Enviando…';
      try {
        const res = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (!res.ok) throw new Error('Respuesta no válida');
        form.reset();
        aviso('¡Mensaje enviado! Te respondo en menos de 24 h.', 'ok');
      } catch (err) {
        aviso('No se pudo enviar. Escríbeme por WhatsApp o a ' + CONFIG.email, 'err');
      } finally {
        boton.disabled = false;
        boton.innerHTML = textoOriginal;
      }
      return;
    }

    // --- Opción B (por defecto): abrir WhatsApp con el mensaje ya escrito ---
    const mensaje =
      `¡Hola Marco! Quiero pedirte presupuesto.\n\n` +
      `• Nombre: ${d.nombre}\n` +
      `• Email: ${d.email}\n` +
      (d.telefono ? `• Teléfono: ${d.telefono}\n` : '') +
      `• Necesito: ${d.tipo}\n` +
      `• Presupuesto: ${d.presupuesto}\n\n` +
      `${d.mensaje}`;

    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
    aviso('Se ha abierto WhatsApp con tu mensaje listo para enviar.', 'ok');
  });
})();

/* ---------------------------------------------------------
   5. Ventana "proyecto.js": tecleo real, no un parpadeo fijo.
   Se escribe carácter a carácter con ritmo irregular (como
   alguien tecleando de verdad) y "ejecuta" con una pausa y
   un pulso al terminar. Una sola pasada, no en bucle.
   --------------------------------------------------------- */
(function animarVentanaCodigo() {
  const codeEl = document.querySelector('.window__code');
  const windowEl = document.querySelector('.hero__window .window');
  if (!codeEl || !windowEl) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Captura el contenido original como una secuencia de "tramos" (texto + clase)
  const runs = Array.from(codeEl.childNodes)
    .map(node => ({
      text: node.textContent,
      cls: node.nodeType === Node.ELEMENT_NODE ? node.className : null
    }))
    .filter(r => r.text.length);

  codeEl.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'caret';
  codeEl.appendChild(caret);

  const azar = (min, max) => min + Math.random() * (max - min);
  const pausaTras = (ch) => {
    if (ch === '\n') return azar(210, 340);
    if (ch === ' ') return azar(10, 22);
    if (',;{}'.includes(ch)) return azar(90, 160);
    return azar(15, 46);
  };

  let ri = 0, ci = 0, esperandoEjecucion = false;

  function paso() {
    const run = runs[ri];

    if (ci === 0 && !esperandoEjecucion) {
      run.el = run.cls
        ? Object.assign(document.createElement('span'), { className: run.cls })
        : document.createTextNode('');
      codeEl.insertBefore(run.el, caret);

      // Pequeña pausa de "ejecución" antes de imprimir la salida final
      if (run.cls === 'c-out') {
        esperandoEjecucion = true;
        windowEl.classList.add('is-running');
        setTimeout(paso, 560);
        return;
      }
    }
    esperandoEjecucion = false;

    const ch = run.text[ci];
    if (run.el.nodeType === Node.TEXT_NODE) run.el.nodeValue += ch;
    else run.el.textContent += ch;
    ci++;

    if (ci >= run.text.length) {
      ri++;
      ci = 0;
      if (ri >= runs.length) {
        windowEl.classList.remove('is-running');
        windowEl.classList.add('is-done');
        // El resplandor entra y se retira solo; si la clase se quedara puesta,
        // la ventana se quedaría iluminada para siempre.
        setTimeout(() => windowEl.classList.remove('is-done'), 1150);
        return;
      }
      setTimeout(paso, pausaTras('\n') * 0.45);
      return;
    }
    setTimeout(paso, pausaTras(ch));
  }

  const comenzar = () => setTimeout(paso, 450);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        comenzar();
        io.disconnect();
      });
    }, { threshold: .4 });
    io.observe(windowEl);
  } else {
    comenzar();
  }
})();
