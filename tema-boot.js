/* v3.2 · Pantalla de carga con el Tema de la escuela (o del panel), antes de que cargue la app.
   Lee la versión mínima guardada en este dispositivo («<escuela>:app.tema.boot»), la valida y la dibuja con textContent
   (nada de HTML). Si no hay nada guardado, se queda la pantalla de carga normal. */
(function () {
  try {
    var boot = document.getElementById('boot'); if (!boot) return;
    var baseEl = document.querySelector('base'); var base = (baseEl && baseEl.getAttribute('href')) || '/';
    var p = location.pathname; var seg = '';
    if (base.charAt(0) === '/' && p.indexOf(base) === 0) seg = p.slice(base.length).split('/')[0].toLowerCase();
    var SLUG = /^[a-z0-9][a-z0-9-]{1,39}$/;
    var key = (seg === 'admin' || (SLUG.test(seg) && seg !== 'index.html')) ? seg + ':app.tema.boot' : 'app.tema.boot';
    var raw = null; try { raw = localStorage.getItem(key); } catch (e) { return; }
    if (!raw) return;
    var b = JSON.parse(raw); if (!b || typeof b !== 'object') return;
    var HEX = /^#[0-9a-fA-F]{6}$/;
    var bg = HEX.test(b.bg) ? b.bg : '#ffffff', fg = HEX.test(b.fg) ? b.fg : '#111111';
    var str = function (s, n) { return typeof s === 'string' ? s.replace(/[\u0000-\u001f<>{}\\]/g, '').slice(0, n) : ''; };
    var show = b.show === 'logo' || b.show === 'texto' ? b.show : 'ambos';
    var anim = /^(pulso|giro|rebote|barra|puntos|ninguna)$/.test(b.anim) ? b.anim : 'pulso';
    var font = typeof b.font === 'string' && /^[A-Za-z0-9 ,'"-]{1,120}$/.test(b.font) ? b.font : '';
    var logo = typeof b.logo === 'string' && /^https:\/\/[a-z0-9.-]+\/[^\s"'()<>\\]{1,300}$/.test(b.logo) ? b.logo : '';
    var box = document.createElement('div'); box.className = 'tb tb-' + anim; box.setAttribute('data-testid', 'tema-boot');
    if (font) box.style.fontFamily = font;
    if (logo && show !== 'texto') { var img = document.createElement('img'); img.className = 'tb-logo'; img.alt = ''; img.src = logo; box.appendChild(img); }
    var text = str(b.text, 60);
    if (text && (show !== 'logo' || !logo)) { var t = document.createElement('div'); t.className = 'tb-text'; t.textContent = text; box.appendChild(t); }
    if (anim !== 'ninguna') { var a = document.createElement('div'); a.className = 'tb-anim'; a.setAttribute('aria-hidden', 'true'); a.appendChild(document.createElement('i')); a.appendChild(document.createElement('i')); a.appendChild(document.createElement('i')); box.appendChild(a); }
    var phrase = str(b.phrase, 80);
    if (phrase) { var f = document.createElement('p'); f.className = 'tb-phrase'; f.textContent = phrase; box.appendChild(f); }
    while (boot.firstChild) boot.removeChild(boot.firstChild);
    boot.appendChild(box);
    boot.style.background = bg; boot.style.color = fg;
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', bg);
  } catch (e) { /* se queda la pantalla normal */ }
})();
