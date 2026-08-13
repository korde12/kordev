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
