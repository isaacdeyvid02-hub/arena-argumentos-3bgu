'use strict';

/**
 * Arena de Argumentos — UI
 * Renderiza todas las pantallas e incluye los SVG inline:
 *   - Quinde (4 estados)
 *   - 6 escenarios
 *   - 6 insignias
 */
const UI = {
  _app: null,

  init() { this._app = document.getElementById('app'); },

  _render(html) { this._app.innerHTML = html; },

  // ── Quinde SVG ─────────────────────────────────────────
  // state: 'neutral' | 'celebra' | 'aliento' | 'final'
  // size: 'md'(80px) | 'sm'(48px)
  quinde(state = 'neutral', size = 'md') {
    const dim = size === 'sm' ? 48 : 80;
    // Wing transforms by state
    const wL = state === 'celebra' ? 'rotate(-40,22,74)' :
               state === 'aliento' ? 'rotate(10,22,74)'  : 'rotate(-10,22,74)';
    const wR = state === 'celebra' ? 'rotate(40,78,74)'  :
               state === 'aliento' ? 'rotate(-10,78,74)' : 'rotate(10,78,74)';
    const eyeHighlight = state === 'celebra' ? '#fff' : '#fff';
    const feathers     = state === 'final'   ? this._quindeCrown() : this._quindeFeather();
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130"
     width="${dim}" height="${Math.round(dim*1.3)}" aria-hidden="true" role="img">
  <defs>
    <radialGradient id="qbody" cx="38%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#6cba5e"/>
      <stop offset="100%" stop-color="#1F5F8B"/>
    </radialGradient>
    <radialGradient id="qhead" cx="45%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#7ecf6e"/>
      <stop offset="100%" stop-color="#4F7942"/>
    </radialGradient>
  </defs>
  <!-- Cape -->
  <ellipse cx="50" cy="98" rx="36" ry="22" fill="#1F5F8B"/>
  <path d="M 16,98 Q 50,124 84,98" stroke="#E0A84B" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Wings -->
  <ellipse class="quinde-wing" cx="22" cy="74" rx="22" ry="9"
           fill="#4F7942" opacity=".82" transform="${wL}"/>
  <ellipse class="quinde-wing" cx="78" cy="74" rx="22" ry="9"
           fill="#1F5F8B" opacity=".82" transform="${wR}"/>
  <!-- Body -->
  <ellipse cx="50" cy="84" rx="20" ry="23" fill="url(#qbody)"/>
  <!-- Head -->
  <circle cx="50" cy="55" r="20" fill="url(#qhead)"/>
  <!-- Beak -->
  <path d="M 67,52 Q 84,51 100,54" stroke="#2B2118" stroke-width="4.5"
        fill="none" stroke-linecap="round"/>
  <!-- Eye -->
  <circle cx="62" cy="49" r="7" fill="#fff"/>
  <circle cx="64" cy="50" r="4" fill="#2B2118"/>
  <circle cx="65.5" cy="48.5" r="1.4" fill="${eyeHighlight}"/>
  <!-- Head feathers -->
  ${feathers}
  <!-- Feet -->
  <path d="M 44,106 L 37,118 M 44,106 L 42,120" stroke="#2B2118" stroke-width="2.2"
        stroke-linecap="round" fill="none"/>
  <path d="M 56,106 L 63,118 M 56,106 L 58,120" stroke="#2B2118" stroke-width="2.2"
        stroke-linecap="round" fill="none"/>
</svg>`;
  },

  _quindeFeather() {
    return `<path d="M 44,36 Q 40,22 44,10 Q 47,2 45,-2" stroke="#E0A84B"
              stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <ellipse cx="45" cy="-1" rx="4" ry="6" fill="#E0A84B"
              transform="rotate(-12,45,-1)"/>`;
  },

  _quindeCrown() {
    return `
      <path d="M 44,36 Q 40,22 44,10 Q 47,2 45,-2" stroke="#E0A84B"
            stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="45" cy="-1" rx="4" ry="6" fill="#E0A84B" transform="rotate(-12,45,-1)"/>
      <path d="M 50,34 Q 50,18 52,6 Q 54,-2 53,-6" stroke="#C8553D"
            stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="53" cy="-5" rx="3.5" ry="5.5" fill="#C8553D"/>
      <path d="M 36,38 Q 30,24 32,12" stroke="#4F7942"
            stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="32" cy="11" r="4" fill="#4F7942"/>
    `;
  },

  // ── Scenario SVGs ──────────────────────────────────────
  scenario(id) {
    const map = {
      'atrio':         this._scAtrio(),
      'biblioteca':    this._scBiblioteca(),
      'tribuna-debate':this._scTribunaDebate(),
      'puente':        this._scPuente(),
      'sala-acuerdos': this._scSalaAcuerdos(),
      'gran-tribuna':  this._scGranTribuna()
    };
    return `<div class="scenario-wrap">${map[id] || map['atrio']}</div>`;
  },

  _scAtrio() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" aria-hidden="true">
  <!-- Sky -->
  <defs>
    <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f0d090"/>
      <stop offset="100%" stop-color="#F6F1E9"/>
    </linearGradient>
  </defs>
  <rect width="400" height="180" fill="url(#sky1)"/>
  <!-- Hills -->
  <ellipse cx="320" cy="160" rx="120" ry="55" fill="#4F7942" opacity=".4"/>
  <ellipse cx="90"  cy="165" rx="90"  ry="45" fill="#4F7942" opacity=".3"/>
  <!-- Ground -->
  <rect y="140" width="400" height="40" fill="#4F7942" opacity=".55"/>
  <!-- Steps -->
  <rect x="100" y="130" width="200" height="12" rx="3" fill="#E0C89B"/>
  <rect x="120" y="118" width="160" height="14" rx="3" fill="#EDD5AC"/>
  <rect x="145" y="107" width="110" height="13" rx="3" fill="#F3DFB8"/>
  <!-- Left column -->
  <rect x="122" y="40" width="22" height="82" rx="6" fill="#F6F1E9" stroke="#D4C4A0" stroke-width="2"/>
  <rect x="118" y="36" width="30" height="10" rx="4" fill="#D4C4A0"/>
  <rect x="118" y="118" width="30" height="8"  rx="3" fill="#D4C4A0"/>
  <!-- Right column -->
  <rect x="256" y="40" width="22" height="82" rx="6" fill="#F6F1E9" stroke="#D4C4A0" stroke-width="2"/>
  <rect x="252" y="36" width="30" height="10" rx="4" fill="#D4C4A0"/>
  <rect x="252" y="118" width="30" height="8"  rx="3" fill="#D4C4A0"/>
  <!-- Dome -->
  <path d="M 155,40 Q 200,2 245,40 Z" fill="#1F5F8B"/>
  <rect x="155" y="38" width="90" height="8" rx="2" fill="#154a6e"/>
  <!-- Door -->
  <path d="M 183,107 Q 200,88 217,107 L 217,120 L 183,120 Z" fill="#2B2118" opacity=".7"/>
  <!-- Stars/details -->
  <circle cx="200" cy="20" r="3" fill="#E0A84B" opacity=".8"/>
  <circle cx="185" cy="28" r="2" fill="#E0A84B" opacity=".5"/>
  <circle cx="215" cy="28" r="2" fill="#E0A84B" opacity=".5"/>
</svg>`;
  },

  _scBiblioteca() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" aria-hidden="true">
  <!-- Wall -->
  <rect width="400" height="180" fill="#F3E8D0"/>
  <!-- Bookshelf back -->
  <rect x="0" y="30" width="280" height="150" fill="#C8A86B" opacity=".3"/>
  <!-- Shelf lines -->
  <rect x="0" y="80"  width="280" height="6" fill="#8B6914" opacity=".5"/>
  <rect x="0" y="130" width="280" height="6" fill="#8B6914" opacity=".5"/>
  <!-- Books shelf 1 (y 30-80) -->
  ${this._books(10, 32, 46, [
    '#1F5F8B','#C8553D','#E0A84B','#4F7942','#1F5F8B','#C8553D',
    '#4F7942','#E0A84B','#1F5F8B','#C8553D','#4F7942','#E0A84B'
  ])}
  <!-- Books shelf 2 (y 86-130) -->
  ${this._books(10, 88, 40, [
    '#C8553D','#4F7942','#1F5F8B','#E0A84B','#C8553D','#1F5F8B',
    '#E0A84B','#4F7942','#C8553D','#1F5F8B','#4F7942','#E0A84B'
  ])}
  <!-- Books shelf 3 (y 136-180) -->
  ${this._books(10, 138, 38, [
    '#4F7942','#E0A84B','#C8553D','#1F5F8B','#4F7942','#C8553D',
    '#1F5F8B','#E0A84B','#4F7942','#1F5F8B'
  ])}
  <!-- Window -->
  <rect x="295" y="20" width="95" height="130" rx="8" fill="#BDD9F5"/>
  <rect x="295" y="20" width="95" height="130" rx="8" fill="none" stroke="#8B6914" stroke-width="4"/>
  <!-- Window cross -->
  <line x1="342" y1="20" x2="342" y2="150" stroke="#8B6914" stroke-width="3"/>
  <line x1="295" y1="85" x2="390" y2="85" stroke="#8B6914" stroke-width="3"/>
  <!-- Mountain through window -->
  <polygon points="295,150 330,60 365,110 390,80 390,150" fill="#4F7942" opacity=".5"/>
  <polygon points="295,150 310,90 340,130 295,150" fill="#4F7942" opacity=".35"/>
  <!-- Light spot -->
  <ellipse cx="350" cy="85" rx="30" ry="40" fill="#fff" opacity=".18"/>
  <!-- Table lamp -->
  <rect x="20" y="150" width="60" height="8" rx="3" fill="#8B6914"/>
  <rect x="45" y="130" width="10" height="22" rx="2" fill="#8B6914"/>
  <path d="M 28,130 L 50,110 L 72,130 Z" fill="#E0A84B" opacity=".8"/>
</svg>`;
  },

  _books(x, y, h, colors) {
    let out = '';
    let cx = x;
    colors.forEach((c, i) => {
      const w = 10 + (i % 3) * 5;
      out += `<rect x="${cx}" y="${y}" width="${w}" height="${h}" rx="1" fill="${c}" opacity=".85"/>`;
      out += `<rect x="${cx+1}" y="${y}" width="${w-2}" height="4" rx="1" fill="#fff" opacity=".25"/>`;
      cx += w + 2;
    });
    return out;
  },

  _scTribunaDebate() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" aria-hidden="true">
  <defs>
    <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#87CEEB"/>
      <stop offset="60%" stop-color="#b8dff0"/>
      <stop offset="100%" stop-color="#4F7942"/>
    </linearGradient>
  </defs>
  <rect width="400" height="180" fill="url(#sky3)"/>
  <!-- Páramo hills -->
  <ellipse cx="200" cy="175" rx="220" ry="60" fill="#4F7942"/>
  <ellipse cx="50"  cy="170" rx="100" ry="40" fill="#3a5c30"/>
  <ellipse cx="360" cy="168" rx="90"  ry="38" fill="#3a5c30"/>
  <!-- Left lectern -->
  <rect x="40" y="88" width="68" height="55" rx="8" fill="#D4A05E"/>
  <rect x="36" y="84" width="76" height="12" rx="5" fill="#C8A060"/>
  <rect x="52" y="143" width="12" height="18" rx="3" fill="#A07840"/>
  <rect x="80" y="143" width="12" height="18" rx="3" fill="#A07840"/>
  <!-- Left mic -->
  <circle cx="74" cy="78" r="6" fill="#888" stroke="#666" stroke-width="1.5"/>
  <line x1="74" y1="84" x2="74" y2="90" stroke="#888" stroke-width="2"/>
  <!-- Right lectern -->
  <rect x="292" y="88" width="68" height="55" rx="8" fill="#6B9BCE"/>
  <rect x="288" y="84" width="76" height="12" rx="5" fill="#5A88BB"/>
  <rect x="304" y="143" width="12" height="18" rx="3" fill="#3D6090"/>
  <rect x="332" y="143" width="12" height="18" rx="3" fill="#3D6090"/>
  <!-- Right mic -->
  <circle cx="326" cy="78" r="6" fill="#888" stroke="#666" stroke-width="1.5"/>
  <line x1="326" y1="84" x2="326" y2="90" stroke="#888" stroke-width="2"/>
  <!-- VS badge -->
  <circle cx="200" cy="105" r="22" fill="#E0A84B"/>
  <text x="200" y="112" text-anchor="middle" font-family="Arial" font-size="14"
        font-weight="bold" fill="#2B2118">VS</text>
  <!-- Clouds -->
  <ellipse cx="80"  cy="30" rx="35" ry="14" fill="#fff" opacity=".7"/>
  <ellipse cx="310" cy="25" rx="40" ry="15" fill="#fff" opacity=".6"/>
</svg>`;
  },

  _scPuente() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" aria-hidden="true">
  <defs>
    <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#C8E8F8"/>
      <stop offset="100%" stop-color="#87CEEB"/>
    </linearGradient>
    <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A9FD4"/>
      <stop offset="100%" stop-color="#2B7AB0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="180" fill="url(#sky4)"/>
  <!-- Mountains bg -->
  <polygon points="0,120 60,55 130,100 200,45 270,90 340,50 400,80 400,120" fill="#4F7942" opacity=".45"/>
  <!-- Green banks -->
  <rect x="0"   y="110" width="120" height="70" fill="#4F7942"/>
  <rect x="280" y="110" width="120" height="70" fill="#4F7942"/>
  <!-- River -->
  <rect x="0" y="110" width="400" height="45" fill="url(#river)"/>
  <!-- Water ripples -->
  <ellipse cx="160" cy="128" rx="30" ry="5" fill="#fff" opacity=".25"/>
  <ellipse cx="260" cy="140" rx="25" ry="4" fill="#fff" opacity=".2"/>
  <!-- Bridge arch -->
  <path d="M 80,110 Q 200,42 320,110" stroke="#8B7355" stroke-width="12"
        fill="none" stroke-linecap="round"/>
  <!-- Bridge deck -->
  <rect x="80" y="104" width="240" height="14" rx="4" fill="#A08860"/>
  <!-- Bridge pillars -->
  <rect x="92"  y="110" width="16" height="45" rx="3" fill="#8B7355"/>
  <rect x="292" y="110" width="16" height="45" rx="3" fill="#8B7355"/>
  <!-- Railing posts -->
  ${[100,120,140,160,180,200,220,240,260,280].map(x =>
    `<rect x="${x}" y="96" width="4" height="12" rx="2" fill="#6B5A42"/>`
  ).join('')}
  <line x1="82" y1="98" x2="318" y2="98" stroke="#6B5A42" stroke-width="3" stroke-linecap="round"/>
  <!-- Clouds -->
  <ellipse cx="70"  cy="28" rx="38" ry="14" fill="#fff" opacity=".75"/>
  <ellipse cx="330" cy="22" rx="42" ry="15" fill="#fff" opacity=".65"/>
</svg>`;
  },

  _scSalaAcuerdos() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" aria-hidden="true">
  <!-- Wall -->
  <rect width="400" height="180" fill="#F0E8D5"/>
  <!-- Floor -->
  <rect y="130" width="400" height="50" fill="#D4B896" opacity=".6"/>
  <!-- Back wall panel -->
  <rect x="20" y="10" width="360" height="120" rx="10" fill="#E8DCC8"/>
  <!-- Windows (2) -->
  <rect x="40"  y="20" width="80" height="90" rx="6" fill="#BDD9F5"/>
  <rect x="40"  y="20" width="80" height="90" rx="6" fill="none" stroke="#C8A060" stroke-width="3"/>
  <line x1="80"  y1="20" x2="80"  y2="110" stroke="#C8A060" stroke-width="2"/>
  <line x1="40"  y1="65" x2="120" y2="65"  stroke="#C8A060" stroke-width="2"/>
  <rect x="280" y="20" width="80" height="90" rx="6" fill="#BDD9F5"/>
  <rect x="280" y="20" width="80" height="90" rx="6" fill="none" stroke="#C8A060" stroke-width="3"/>
  <line x1="320" y1="20" x2="320" y2="110" stroke="#C8A060" stroke-width="2"/>
  <line x1="280" y1="65" x2="360" y2="65"  stroke="#C8A060" stroke-width="2"/>
  <!-- Warm light from windows -->
  <ellipse cx="80"  cy="65" rx="38" ry="45" fill="#E0A84B" opacity=".12"/>
  <ellipse cx="320" cy="65" rx="38" ry="45" fill="#E0A84B" opacity=".12"/>
  <!-- Round table (perspective oval) -->
  <ellipse cx="200" cy="148" rx="130" ry="28" fill="#A07840"/>
  <ellipse cx="200" cy="140" rx="130" ry="28" fill="#C8A060"/>
  <!-- Papers on table -->
  <rect x="150" y="128" width="40" height="28" rx="3" fill="#fff" transform="rotate(-8,150,128)"/>
  <rect x="210" y="130" width="40" height="28" rx="3" fill="#fff" transform="rotate(5,210,130)"/>
  <!-- Chairs (simplified arcs) -->
  ${[70,130,200,270,330].map((x,i) =>
    `<path d="M ${x-18},125 Q ${x},112 ${x+18},125" stroke="#8B6914" stroke-width="5"
      fill="none" stroke-linecap="round" opacity=".7"/>`
  ).join('')}
  <!-- Center flag / scroll decoration -->
  <rect x="195" y="100" width="10" height="38" rx="2" fill="#C8A060"/>
  <path d="M 205,100 L 235,110 L 205,120 Z" fill="#E0A84B"/>
</svg>`;
  },

  _scGranTribuna() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" aria-hidden="true">
  <defs>
    <linearGradient id="sky6" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0D2D4A"/>
      <stop offset="50%" stop-color="#1F5F8B"/>
      <stop offset="100%" stop-color="#2E7DA8"/>
    </linearGradient>
  </defs>
  <rect width="400" height="180" fill="url(#sky6)"/>
  <!-- Stars -->
  ${[[30,15],[70,8],[100,20],[150,5],[200,12],[250,8],[300,18],[340,6],[370,22],[50,35],[130,32],[280,30],[360,38]].map(
    ([x,y]) => `<circle cx="${x}" cy="${y}" r="${1+Math.random()}" fill="#fff" opacity="${.5+Math.random()*.5}"/>`
  ).join('')}
  <!-- Mountains -->
  <polygon points="0,130 50,70  120,105 0,130"   fill="#2a4a1e"/>
  <polygon points="0,130 80,55  180,100 90,130"   fill="#3a5c30"/>
  <polygon points="300,130 350,60 400,80 400,130" fill="#2a4a1e"/>
  <polygon points="220,130 300,50 380,90 400,130" fill="#3a5c30"/>
  <!-- River far -->
  <rect x="100" y="122" width="200" height="10" rx="4" fill="#2B7AB0" opacity=".5"/>
  <!-- Stage platform steps -->
  <rect x="80" y="148" width="240" height="10" rx="3" fill="#E0C090"/>
  <rect x="100" y="138" width="200" height="12" rx="3" fill="#EDD5AC"/>
  <rect x="120" y="128" width="160" height="12" rx="3" fill="#F3DFB8"/>
  <rect x="140" y="118" width="120" height="12" rx="3" fill="#F6F1E9"/>
  <!-- Main tribune -->
  <rect x="155" y="80" width="90" height="40" rx="6" fill="#1F5F8B"/>
  <rect x="150" y="76" width="100" height="10" rx="4" fill="#154a6e"/>
  <!-- Microphone -->
  <rect x="197" y="60" width="6" height="20" rx="2" fill="#C8A060"/>
  <ellipse cx="200" cy="58" rx="8" ry="10" fill="#888" stroke="#666" stroke-width="1.5"/>
  <!-- Flags -->
  <rect x="145" y="50" width="5" height="50" rx="2" fill="#C8A060"/>
  <path d="M 150,50 L 175,60 L 150,70 Z" fill="#E0A84B"/>
  <rect x="250" y="50" width="5" height="50" rx="2" fill="#C8A060"/>
  <path d="M 255,50 L 230,60 L 255,70 Z" fill="#E0A84B"/>
  <!-- Spotlights -->
  <path d="M 50,0 L 155,80 L 185,80 Z"  fill="#E0A84B" opacity=".08"/>
  <path d="M 350,0 L 215,80 L 245,80 Z" fill="#E0A84B" opacity=".08"/>
  <!-- Celebration dots -->
  ${[[100,90],[150,70],[250,70],[300,90],[180,55],[220,55]].map(
    ([x,y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#E0A84B" opacity=".7"/>`
  ).join('')}
  ${[[120,80],[160,65],[240,65],[280,80]].map(
    ([x,y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#C8553D" opacity=".6"/>`
  ).join('')}
</svg>`;
  },

  // ── Badge SVGs ─────────────────────────────────────────
  badge(id, earned = false) {
    const cfg = {
      'tesis-clara':       { icon: this._iconBulb(),   bg: '#1F5F8B' },
      'evidencia-solida':  { icon: this._iconScroll(),  bg: '#E0A84B' },
      'refutador-cortes':  { icon: this._iconDove(),    bg: '#4F7942' },
      'texto-cohesionado': { icon: this._iconLink(),    bg: '#C8553D' },
      'cita-responsable':  { icon: this._iconQuill(),   bg: '#1F5F8B' },
      'orador-asamblea':   { icon: this._iconStar(),    bg: '#E0A84B' }
    };
    const c = cfg[id] || cfg['tesis-clara'];
    const op = earned ? '1' : '0.3';
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 70" width="64" height="70"
     aria-hidden="true" style="opacity:${op}">
  <!-- Hexagon -->
  <path d="M 32,3 L 59,18.5 L 59,49.5 L 32,65 L 5,49.5 L 5,18.5 Z"
        fill="${c.bg}" stroke="#E0A84B" stroke-width="3"/>
  <!-- Icon -->
  <g transform="translate(20,16) scale(.6)">${c.icon}</g>
</svg>`;
  },

  _iconBulb() {
    return `<path d="M20,2 C12,2 6,8 6,16 C6,21 9,25 13,27 L13,32 L27,32 L27,27 C31,25 34,21 34,16 C34,8 28,2 20,2 Z" fill="#fff"/>
      <rect x="13" y="34" width="14" height="4" rx="2" fill="#fff" opacity=".8"/>
      <rect x="15" y="40" width="10" height="3" rx="2" fill="#fff" opacity=".6"/>`;
  },

  _iconScroll() {
    return `<path d="M6,2 C6,2 2,2 2,6 L2,38 C2,42 6,42 6,42 L34,42 C34,42 38,42 38,38 L38,6 C38,6 38,2 34,2 Z" fill="#fff"/>
      <rect x="8"  y="10" width="24" height="3" rx="1.5" fill="${'#E0A84B'}"/>
      <rect x="8"  y="17" width="24" height="3" rx="1.5" fill="#ccc"/>
      <rect x="8"  y="24" width="18" height="3" rx="1.5" fill="#ccc"/>
      <ellipse cx="6"  cy="22" rx="4" ry="20" fill="#D4C0A0"/>
      <ellipse cx="34" cy="22" rx="4" ry="20" fill="#D4C0A0"/>`;
  },

  _iconDove() {
    return `<path d="M20,20 C10,10 2,14 2,22 C2,28 8,32 14,30 L20,20 Z" fill="#fff"/>
      <path d="M20,20 C30,10 38,14 38,22 C38,28 32,32 26,30 L20,20 Z" fill="#fff" opacity=".85"/>
      <circle cx="20" cy="30" r="6" fill="#fff"/>
      <path d="M 20,36 L 14,46 L 20,43 L 26,46 Z" fill="#fff" opacity=".8"/>
      <circle cx="23" cy="27" r="2" fill="#2B2118"/>
      <path d="M 20,20 L 28,8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/>`;
  },

  _iconLink() {
    return `<path d="M 10,20 L 24,6 C 28,2 36,2 40,6 C 44,10 44,18 40,22 L 28,34" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 30,20 L 16,34 C 12,38 4,38 0,34 C -4,30 -4,22 0,18 L 12,6" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" transform="translate(10,0)"/>`;
  },

  _iconQuill() {
    return `<path d="M 36,0 C 20,8 4,24 2,40 L 8,40 C 10,28 22,16 36,6 Z" fill="#fff"/>
      <path d="M 8,40 L 4,50 L 14,44 Z" fill="#fff" opacity=".7"/>
      <line x1="14" y1="44" x2="4" y2="54" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <text x="2" y="30" font-family="Arial" font-size="14" fill="#fff" font-weight="bold">« »</text>`;
  },

  _iconStar() {
    return `<polygon points="20,2 25,15 40,15 28,24 32,38 20,30 8,38 12,24 0,15 15,15"
       fill="#fff"/>`;
  },

  // ── Accessibility bar ──────────────────────────────────
  a11yBar() {
    return `
<div class="a11y-bar" role="toolbar" aria-label="Accesibilidad">
  <button class="btn btn-ghost btn-sm" id="btn-font" aria-pressed="false"
          title="Aumentar texto" aria-label="Aumentar tamaño de texto">A+</button>
  <button class="btn btn-ghost btn-sm" id="btn-motion" aria-pressed="false"
          title="Reducir animaciones" aria-label="Reducir animaciones">✦</button>
  <button class="btn btn-ghost btn-sm" id="btn-contrast" aria-pressed="false"
          title="Alto contraste" aria-label="Activar alto contraste">◑</button>
</div>`;
  },

  _bindA11y() {
    const toggle = (id, cls, attr) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', () => {
        document.body.classList.toggle(cls);
        const on = document.body.classList.contains(cls);
        btn.setAttribute('aria-pressed', on);
        btn.style.background = on ? 'var(--azul)' : '';
        btn.style.color      = on ? 'var(--blanco)' : '';
      });
    };
    toggle('btn-font', 'big-text', 'big-text');
    toggle('btn-motion', 'reduce-motion', 'motion');
    toggle('btn-contrast', 'high-contrast', 'contrast');
  },

  // ── SCREEN: Login ──────────────────────────────────────
  renderLogin() {
    this._render(`
<div class="screen active" id="sc-login">
  <div style="text-align:center;padding:16px 0 0">
    ${this.quinde('neutral', 'md')}
  </div>
  <h1>Arena de<br>Argumentos</h1>
  <p style="text-align:center;color:var(--gris);max-width:360px">
    Gánate un lugar en la tribuna de la Gran Asamblea.<br>
    Quinde, el colibrí orador, te guiará.
  </p>
  <div class="login-wrap">
    <label for="inp-pseudo" style="font-weight:700;font-size:var(--f-sm);color:var(--azul)">
      Ingresa tu código de estudiante
    </label>
    <input id="inp-pseudo" class="login-input" type="text" maxlength="8"
           autocomplete="off" spellcheck="false"
           placeholder="E01" aria-label="Código de estudiante"
           inputmode="text"/>
    <div class="login-error" id="login-error" role="alert" aria-live="polite"></div>
    <button class="btn btn-primary btn-full" id="btn-login">Entrar a la Asamblea</button>
    <p class="login-hint">Usa el código que te dio tu docente (ej.: E01, E02…).<br>
      No se guarda ningún dato personal.</p>
  </div>
  ${this.a11yBar()}
</div>`);
    this._bindA11y();
    const inp = document.getElementById('inp-pseudo');
    const err = document.getElementById('login-error');
    const btn = document.getElementById('btn-login');
    const go  = () => {
      const v = inp.value.trim().toUpperCase();
      if (!v || v.length < 2) {
        err.textContent = 'Escribe tu código antes de continuar.';
        inp.focus();
        return;
      }
      err.textContent = '';
      Game.login(v);
    };
    btn.addEventListener('click', go);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    inp.focus();
  },

  // ── SCREEN: Menu ──────────────────────────────────────
  renderMenu(progress) {
    const p = progress || Game.progress;
    const totalBadges = p.badges.length;
    const levelBtns = GAME_DATA.map(ld => {
      const done    = p.badges.includes(BADGES[ld.nivel - 1].id);
      const current = ld.nivel === p.currentLevel;
      const locked  = ld.nivel > p.currentLevel;
      let cls = 'level-card';
      if (done) cls += ' done';
      else if (current) cls += ' current';
      return `
<button class="${cls}" data-level="${ld.nivel}"
        ${locked ? 'disabled aria-disabled="true"' : ''}
        aria-label="Nivel ${ld.nivel}: ${ld.titulo}${done ? ', completado' : current ? ', actual' : ', bloqueado'}">
  <span class="level-num">Nivel ${ld.nivel}</span>
  <span class="level-name">${ld.titulo}</span>
  <span class="level-saber">Saber: ${ld.saber}</span>
  <span class="level-status">${done ? '✅' : current ? '🎯' : '🔒'}</span>
</button>`;
    }).join('');

    const finalUnlocked = p.currentLevel > CONFIG.TOTAL_LEVELS || p.badges.filter(b => b !== 'orador-asamblea').length >= CONFIG.TOTAL_LEVELS;
    const finalBtn = finalUnlocked
      ? `<button class="btn btn-ocre btn-full" id="btn-final">
           ✍️ Reto final — El Gran Discurso
         </button>`
      : `<button class="btn btn-ghost btn-full" disabled aria-disabled="true"
           title="Completa los 5 niveles primero">
           🔒 Reto final (completa los 5 niveles)
         </button>`;

    const badgesHtml = BADGES.slice(0, 5).map(b =>
      `<div class="badge-item ${p.badges.includes(b.id) ? 'earned' : ''}" aria-label="${b.label}${p.badges.includes(b.id) ? ', obtenida' : ', pendiente'}">
         ${this.badge(b.id, p.badges.includes(b.id))}
         <span class="badge-lbl">${b.label}</span>
       </div>`
    ).join('');

    this._render(`
<div class="screen active" id="sc-menu">
  <div class="menu-title-wrap">
    <h1>Arena de Argumentos</h1>
    <div class="menu-title-sub">Bienvenido/a, <strong>${p.pseudonym}</strong>
      · Puntaje: <span class="score-pill">⭐ ${p.score}</span>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-bottom:12px">Niveles</h3>
    <div class="levels-grid">${levelBtns}</div>
  </div>

  ${finalBtn}

  <div class="card">
    <h3 style="margin-bottom:12px">Tus insignias (${totalBadges}/6)</h3>
    <div class="badges-grid">${badgesHtml}</div>
  </div>

  ${this.a11yBar()}
</div>`);

    this._bindA11y();
    document.querySelectorAll('.level-card:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => Game.startLevel(parseInt(btn.dataset.level)));
    });
    const fb = document.getElementById('btn-final');
    if (fb) fb.addEventListener('click', () => Final.start());
  },

  // ── SCREEN: Level intro ────────────────────────────────
  renderLevelIntro(levelData, lives, score) {
    const badge = BADGES[levelData.nivel - 1];
    this._render(`
<div class="screen active" id="sc-intro">
  <div class="hud">
    <span class="hud-level">Nivel ${levelData.nivel} · ${levelData.titulo}</span>
    <span class="hud-score">⭐ ${score}</span>
    <div class="hud-lives" aria-label="Vidas: ${lives}">${this._livesHtml(lives)}</div>
  </div>

  ${this.scenario(levelData.escenario)}

  <div style="text-align:center">
    <span class="nivel-pill">Nivel ${levelData.nivel}</span>
    <h2 style="margin-top:8px">${levelData.titulo}</h2>
    <p style="font-size:var(--f-sm);color:var(--gris)">Saber: ${levelData.saber}</p>
  </div>

  <div class="reading-card" role="region" aria-label="Lectura previa">
    <h3 style="color:var(--azul);margin-bottom:10px">📖 Lee antes de responder</h3>
    <p class="reading-text" id="reading-text">${levelData.lectura.texto}</p>
    <p class="reading-src">Fuente: ${levelData.lectura.fuente}</p>
    <div class="read-btn-row">
      ${Speech.isAvailable() ? `<button class="btn btn-ghost btn-sm" id="btn-listen-reading"
        aria-label="Escuchar la lectura">🔊 Escuchar</button>` : ''}
      <span style="font-size:var(--f-sm);color:var(--gris)">Lee con atención; después vendrán las preguntas.</span>
    </div>
  </div>

  <div class="quinde-row">
    ${this.quinde('neutral', 'sm')}
    <div class="bubble">«Busca la idea principal antes de continuar. ¡Puedes hacerlo!»</div>
  </div>

  <div style="display:flex;gap:12px;width:100%;flex-wrap:wrap">
    <button class="btn btn-ghost" id="btn-menu-back" style="flex:1">← Menú</button>
    <button class="btn btn-primary" id="btn-start" style="flex:2">Empezar los retos →</button>
  </div>
  ${this.a11yBar()}
</div>`);

    this._bindA11y();
    document.getElementById('btn-start').addEventListener('click', () => Game.startChallenge());
    document.getElementById('btn-menu-back').addEventListener('click', () => UI.renderMenu());
    const lb = document.getElementById('btn-listen-reading');
    if (lb) {
      lb.addEventListener('click', () =>
        Speech.speak(levelData.lectura.texto + '. Fuente: ' + levelData.lectura.fuente)
      );
    }
  },

  // ── SCREEN: Challenge ──────────────────────────────────
  renderChallenge(levelData, reto, state) {
    const letters = ['A', 'B', 'C', 'D'];
    const opts = reto.opciones.map((o, i) => `
<button class="opt-btn" data-idx="${i}"
        aria-label="Opción ${letters[i]}: ${o}">
  <span class="opt-letter">${letters[i]}</span>
  <span>${o}</span>
</button>`).join('');

    const progress = (state.currentChallenge + 1) / CONFIG.CHALLENGES_PER_LEVEL * 100;
    const globalProgress = ((levelData.nivel - 1) * 3 + state.currentChallenge) / 15 * 100;
    const extraBanner = state.extraHint
      ? `<div class="hint-box" style="border-color:var(--verde);background:#E8F5E9;padding:10px 14px;width:100%">
           <span class="hint-label" style="color:var(--verde);margin-bottom:2px">🪶 Pista extra de Quinde</span>
           <p class="hint-text" style="font-size:var(--f-sm)">¡Ánimo! Conservas los retos que ya superaste. Revisa las palabras clave de la lectura antes de elegir.</p>
         </div>`
      : '';

    this._render(`
<div class="screen active" id="sc-challenge">
  <div class="hud">
    <span class="hud-level">N${levelData.nivel} · Reto ${state.currentChallenge + 1}/3</span>
    <span class="hud-score">⭐ ${state.score}</span>
    <div class="hud-lives" aria-label="Vidas restantes: ${state.lives}">${this._livesHtml(state.lives)}</div>
  </div>
  <div class="progress-wrap" role="progressbar"
       aria-valuenow="${Math.round(globalProgress)}" aria-valuemin="0" aria-valuemax="100"
       aria-label="Progreso total">
    <div class="progress-fill" style="width:${globalProgress}%"></div>
  </div>

  <div class="quinde-row">
    ${this.quinde('neutral', 'sm')}
    <div class="bubble" id="quinde-bubble">«${reto.quinde}»</div>
  </div>

  ${extraBanner}

  ${Speech.isAvailable() ? `<button class="btn btn-ghost btn-sm" id="btn-listen-q"
    style="align-self:flex-start" aria-label="Escuchar la pregunta">🔊 Escuchar</button>` : ''}

  <div class="options-list" id="options-list" role="group" aria-label="Opciones de respuesta">
    ${opts}
  </div>

  <div id="hint-container"></div>
  <div id="feedback-container" aria-live="polite"></div>

  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <button class="btn btn-ghost btn-sm" id="btn-hint"
            aria-label="Pedir pista (máximo 2)">💡 Pista</button>
  </div>
</div>`);

    // Listen to question
    const lq = document.getElementById('btn-listen-q');
    if (lq) lq.addEventListener('click', () => Speech.speak(reto.quinde));

    // Options
    document.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        Game.checkAnswer(parseInt(btn.dataset.idx));
      });
    });

    // Hint
    document.getElementById('btn-hint').addEventListener('click', () => Game.showHint());
  },

  // ── Feedback on answer ─────────────────────────────────
  showAnswerFeedback(correct, reto, selectedIdx, points, onContinue) {
    const letters = ['A', 'B', 'C', 'D'];
    // Mark options
    document.querySelectorAll('.opt-btn').forEach(btn => {
      const idx = parseInt(btn.dataset.idx);
      btn.disabled = true;
      if (idx === reto.correcta) btn.classList.add('correct');
      else if (idx === selectedIdx && !correct) btn.classList.add('wrong');
    });

    // Update bubble
    const bubble = document.getElementById('quinde-bubble');
    if (bubble) {
      bubble.textContent = correct
        ? '«' + reto.ok + '»'
        : '«' + reto.error + '»';
      bubble.className = 'bubble ' + (correct ? 'celebra' : 'aliento');
    }

    // Update Quinde icon
    const qi = document.querySelector('.quinde-icon');
    if (qi) qi.innerHTML = this.quinde(correct ? 'celebra' : 'aliento', 'sm');

    // Show feedback box
    const fb = document.getElementById('feedback-container');
    if (fb) {
      fb.innerHTML = `
<div class="feedback-box ${correct ? 'ok' : 'error'}">
  ${correct
    ? `✅ <strong>¡Correcto!</strong> ${points > 0 ? `+${points} puntos.` : ''} ${reto.ok}`
    : `❌ <strong>Respuesta incorrecta.</strong> ${reto.error}`
  }
</div>
<button class="btn btn-primary btn-full" id="btn-continue" style="margin-top:10px">
  ${correct ? 'Continuar →' : 'Intentar de nuevo →'}
</button>`;
      Speech.speak(correct ? reto.ok : reto.error);
      document.getElementById('btn-continue').addEventListener('click', onContinue);
      document.getElementById('btn-continue').focus();
    }
  },

  // ── Show hint text ─────────────────────────────────────
  showHintText(text, num) {
    const c = document.getElementById('hint-container');
    if (!c) return;
    c.innerHTML = `
<div class="hint-box">
  <span class="hint-label">${num === 1 ? '💡 Pista 1 — Orientación' : '💡 Pista 2 — Ejemplo'}</span>
  <p class="hint-text">${text}</p>
</div>`;
  },

  // ── SCREEN: Badge earned ───────────────────────────────
  renderBadge(badge, score, onContinue) {
    this._render(`
<div class="screen active" id="sc-badge">
  <div class="badge-reveal">
    <h2>¡Nivel superado!</h2>
    <div style="transform:scale(1.5);margin:20px 0">
      ${this.badge(badge.id, true)}
    </div>
    <h3 style="color:var(--ocre)">${badge.label}</h3>
    <p style="color:var(--gris)">Has ganado una nueva pluma para tu colección.</p>
    <p><strong>Puntaje acumulado: ⭐ ${score}</strong></p>
    ${this.quinde('celebra', 'md')}
    <button class="btn btn-primary" id="btn-badge-cont">Continuar →</button>
  </div>
  ${this.a11yBar()}
</div>`);
    this._bindA11y();
    Speech.speak('¡Nivel superado! Has ganado la insignia ' + badge.label);
    document.getElementById('btn-badge-cont').addEventListener('click', onContinue);
    document.getElementById('btn-badge-cont').focus();
  },

  // ── SCREEN: Level failed ───────────────────────────────
  renderLevelFailed(level, onRetry) {
    this._render(`
<div class="screen active" id="sc-failed">
  <div class="badge-reveal">
    <h2>Este nivel se repite</h2>
    ${this.quinde('aliento', 'md')}
    <div class="bubble aliento" style="max-width:340px;border-radius:var(--radio)">
      «¡No te rindas! Tienes una pista extra para este intento. Vuelve a leer la lectura con cuidado.»
    </div>
    <p style="color:var(--gris)">Necesitas al menos 2 de 3 aciertos.<br>
      Conservas todo lo que ya ganaste.</p>
    <button class="btn btn-ocre" id="btn-retry">🔄 Intentar de nuevo</button>
    <button class="btn btn-ghost btn-sm" id="btn-back-menu">← Volver al menú</button>
  </div>
  ${this.a11yBar()}
</div>`);
    this._bindA11y();
    Speech.speak('Este nivel se repite. Tienes una pista extra. ¡Vuelve a leer la lectura!');
    document.getElementById('btn-retry').addEventListener('click', onRetry);
    document.getElementById('btn-back-menu').addEventListener('click', () => UI.renderMenu());
    document.getElementById('btn-retry').focus();
  },

  // ── SCREEN: Results ────────────────────────────────────
  renderResults(progress) {
    const badgesHtml = BADGES.map(b =>
      `<div class="badge-item ${progress.badges.includes(b.id) ? 'earned' : ''}"
            aria-label="${b.label}${progress.badges.includes(b.id) ? ', obtenida' : ', pendiente'}">
         ${this.badge(b.id, progress.badges.includes(b.id))}
         <span class="badge-lbl">${b.label}</span>
       </div>`
    ).join('');

    this._render(`
<div class="screen active" id="sc-results">
  <div class="card" style="text-align:center">
    ${this.quinde('final', 'md')}
    <h2 style="margin-top:16px">¡Gran Asamblea completada!</h2>
    <div class="results-score-num">⭐ ${progress.score}</div>
    <div class="results-score-label">puntos totales</div>
  </div>

  <div class="card">
    <h3 style="margin-bottom:14px">Tus insignias</h3>
    <div class="badges-grid">${badgesHtml}</div>
  </div>

  <div class="card">
    <h3 style="margin-bottom:10px">¿Qué sigue?</h3>
    <p style="margin-bottom:14px;color:var(--gris)">
      Descarga tu registro para entregarlo a tu docente.
      Después puedes responder la encuesta de retroalimentación.
    </p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn btn-verde" id="btn-csv" style="flex:1">
        ⬇ Descargar mis resultados (CSV)
      </button>
      <a class="btn btn-ghost" id="lnk-survey" href="${CONFIG.SURVEY_URL}"
         target="_blank" rel="noopener" style="flex:1">
        📋 Responder encuesta
      </a>
    </div>
    <p id="csv-status" style="color:var(--verde);font-size:var(--f-sm);margin-top:8px;min-height:18px"></p>
  </div>

  <button class="btn btn-ghost" id="btn-results-menu">← Volver al menú</button>
  ${this.a11yBar()}
</div>`);

    this._bindA11y();
    document.getElementById('btn-csv').addEventListener('click', () => {
      const ok = Storage.downloadCSV(progress.pseudonym);
      document.getElementById('csv-status').textContent = ok
        ? '✅ Archivo descargado correctamente.'
        : '⚠️ No hay datos para exportar todavía.';
    });
    document.getElementById('btn-results-menu').addEventListener('click', () => UI.renderMenu());
  },

  // ── Helper: lives HTML ─────────────────────────────────
  _livesHtml(lives) {
    let h = '';
    for (let i = 0; i < CONFIG.MAX_LIVES; i++) {
      h += `<span class="life ${i >= lives ? 'lost' : ''}" aria-hidden="true">🪶</span>`;
    }
    return h;
  }
};
