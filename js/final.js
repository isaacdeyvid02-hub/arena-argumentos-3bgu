'use strict';

/**
 * Arena de Argumentos — Reto final
 * 6 cajas editables → párrafo ensamblado en tiempo real
 * Conteo de palabras y checklist de criterios.
 * Sin valoración automática; el docente hace la evaluación.
 */
const Final = {
  _draft: {},
  _checklist: [false, false, false, false, false],

  start() {
    this._draft     = { ...Game.progress.finalDraft };
    this._checklist = [...Game.progress.finalChecklist];
    this._render();
  },

  _render() {
    const cajas = FINAL_CHALLENGE.cajas.map(c => `
<div class="final-box">
  <label for="box-${c.id}">${c.label}</label>
  <span class="box-hint">${c.pista}</span>
  <textarea id="box-${c.id}" name="${c.id}"
            placeholder="${c.placeholder}"
            aria-label="${c.label}"
            rows="3">${this._draft[c.id] || ''}</textarea>
</div>`).join('');

    const checks = FINAL_CHALLENGE.criterios.map((cr, i) => `
<label class="check-item">
  <input type="checkbox" id="chk-${i}" ${this._checklist[i] ? 'checked' : ''}
         aria-label="${cr}"/>
  <span>${cr}</span>
</label>`).join('');

    UI._render(`
<div class="screen active" id="sc-final">
  <div class="hud">
    <span class="hud-level">Reto final — El Gran Discurso</span>
    <span class="hud-score">⭐ ${Game.score}</span>
  </div>

  ${UI.scenario('gran-tribuna')}

  <div class="card">
    <div class="quinde-row">
      ${UI.quinde('neutral', 'sm')}
      <div class="bubble">«${FINAL_CHALLENGE.instruccion}»</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-bottom:14px">Escribe tu párrafo argumentativo</h3>
    <p style="font-size:var(--f-sm);color:var(--gris);margin-bottom:16px">
      Tema: <strong>«¿Debe permitirse el uso de inteligencia artificial generativa en las tareas del bachillerato?»</strong>
    </p>
    <div class="final-grid" id="final-grid">
      ${cajas}
    </div>
  </div>

  <div class="card">
    <h3 style="margin-bottom:10px">Tu párrafo ensamblado</h3>
    <div class="paragraph-preview" id="para-preview" aria-live="polite" aria-label="Párrafo ensamblado">
      <em style="color:var(--gris)">Llena las cajas para ver tu párrafo aquí.</em>
    </div>
    <div class="word-counter" id="word-counter" aria-live="polite"></div>
    ${Speech.isAvailable()
      ? `<button class="btn btn-ghost btn-sm" id="btn-listen-para" style="margin-top:8px"
               aria-label="Escuchar el párrafo">🔊 Escuchar párrafo</button>`
      : ''}
  </div>

  <div class="card">
    <h3 style="margin-bottom:12px">Lista de verificación</h3>
    <p style="font-size:var(--f-sm);color:var(--gris);margin-bottom:14px">
      Marca los criterios que crees que cumpliste. Tu docente hará la valoración final.
    </p>
    <div class="checklist" id="checklist">
      ${checks}
    </div>
    <p style="font-size:12px;color:var(--gris);margin-top:12px">
      ✏️ La valoración de estos criterios la realizará tu docente. El juego no califica automáticamente.
    </p>
  </div>

  <div style="display:flex;gap:12px;flex-wrap:wrap;width:100%">
    <button class="btn btn-ghost" id="btn-final-menu" style="flex:1">← Volver al menú</button>
    <button class="btn btn-verde" id="btn-final-done" style="flex:2">
      ✅ Finalizar y ver resultados
    </button>
  </div>
  ${UI.a11yBar()}
</div>`);

    UI._bindA11y();
    this._bindEvents();
    this._update();
  },

  _bindEvents() {
    // Textareas → update on input
    FINAL_CHALLENGE.cajas.forEach(c => {
      const ta = document.getElementById(`box-${c.id}`);
      if (ta) {
        ta.addEventListener('input', () => {
          this._draft[c.id] = ta.value;
          this._update();
          this._autosave();
        });
      }
    });

    // Checkboxes
    FINAL_CHALLENGE.criterios.forEach((_, i) => {
      const chk = document.getElementById(`chk-${i}`);
      if (chk) {
        chk.addEventListener('change', () => {
          this._checklist[i] = chk.checked;
          this._autosave();
        });
      }
    });

    // Listen
    const lp = document.getElementById('btn-listen-para');
    if (lp) {
      lp.addEventListener('click', () => {
        const text = document.getElementById('para-preview').textContent;
        Speech.speak(text);
      });
    }

    // Done
    document.getElementById('btn-final-done').addEventListener('click', () => this._finish());
    document.getElementById('btn-final-menu').addEventListener('click', () => {
      this._autosave();
      UI.renderMenu();
    });
  },

  // Assemble paragraph from boxes
  _assemble() {
    const d = this._draft;
    const parts = [];

    if (d.tesis?.trim())         parts.push(d.tesis.trim());
    if (d.evidencia1?.trim()) {
      let e1 = `En primer lugar, ${d.evidencia1.trim()}`;
      if (d.cita1?.trim())       e1 += ` ${d.cita1.trim()}`;
      e1 += '.';
      parts.push(e1);
    }
    if (d.evidencia2?.trim())    parts.push(`Además, ${d.evidencia2.trim()}.`);
    if (d.contraargumento?.trim() || d.refutacion?.trim()) {
      let conc = '';
      if (d.contraargumento?.trim()) conc += `Si bien es cierto que ${d.contraargumento.trim()}`;
      if (d.refutacion?.trim())      conc += `, sin embargo, ${d.refutacion.trim()}.`;
      else if (conc)                 conc += '.';
      if (conc) parts.push(conc);
    }

    return parts.join(' ');
  },

  _countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  },

  _update() {
    const para    = this._assemble();
    const preview = document.getElementById('para-preview');
    const counter = document.getElementById('word-counter');
    if (!preview) return;

    if (para.trim()) {
      preview.textContent = para;
    } else {
      preview.innerHTML = '<em style="color:var(--gris)">Llena las cajas para ver tu párrafo aquí.</em>';
    }

    if (counter) {
      const wc  = this._countWords(para);
      const ok  = wc >= CONFIG.MIN_WORDS && wc <= CONFIG.MAX_WORDS;
      const low = wc < CONFIG.MIN_WORDS;
      const cls = ok ? 'ok' : (low ? 'low' : 'high');
      counter.className  = `word-counter ${cls}`;
      counter.textContent = wc === 0
        ? ''
        : `${wc} palabras${ok
            ? ' ✅ (meta cumplida: 80–120)'
            : low
              ? ` (faltan ${CONFIG.MIN_WORDS - wc} para la meta mínima)`
              : ` (supera la meta máxima por ${wc - CONFIG.MAX_WORDS})`}`;
    }
  },

  _autosave() {
    Storage.saveFinalDraft(Game.pseudonym, this._draft, this._checklist);
  },

  _finish() {
    this._autosave();
    Storage.markFinalComplete(Game.pseudonym, Game.score);
    Game.progress = Storage.getProgress(Game.pseudonym);
    // Add final attempt record
    const attempt = {
      id_seudonimo:  Game.pseudonym,
      fecha_hora:    new Date().toISOString(),
      nivel:         'final',
      reto_id:       'FINAL',
      saber:         'd.4, p.3, p.4, p.5, a.6, a.7',
      correcto:      true,
      intentos:      1,
      pista_usada:   false,
      vidas_perdidas:0,
      tiempo_seg:    0,
      puntaje_total: Game.score,
      nivel_max:     'final'
    };
    Storage.pushAttempt(Game.pseudonym, attempt);
    UI.renderResults(Game.progress);
  }
};
