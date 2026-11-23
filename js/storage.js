'use strict';

/**
 * Arena de Argumentos — Almacenamiento local
 * Todo el registro se guarda en localStorage por seudónimo.
 * No se almacenan datos personales.
 */
const Storage = {
  _key: CONFIG.STORAGE_KEY,

  _load() {
    try {
      const raw = localStorage.getItem(this._key);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },

  _save(data) {
    try {
      localStorage.setItem(this._key, JSON.stringify(data));
    } catch (e) {
      console.warn('localStorage no disponible:', e);
    }
  },

  _newProgress(pseudonym) {
    return {
      pseudonym,
      currentLevel: 1,
      score: 0,
      badges: [],
      attempts: [],
      finalDraft: {
        tesis: '', evidencia1: '', cita1: '',
        evidencia2: '', contraargumento: '', refutacion: ''
      },
      finalChecklist: [false, false, false, false, false],
      completedFinal: false
    };
  },

  getProgress(pseudonym) {
    const all = this._load();
    return all[pseudonym] || this._newProgress(pseudonym);
  },

  setProgress(pseudonym, progress) {
    const all = this._load();
    all[pseudonym] = progress;
    this._save(all);
  },

  pushAttempt(pseudonym, attempt) {
    const all = this._load();
    if (!all[pseudonym]) all[pseudonym] = this._newProgress(pseudonym);
    all[pseudonym].attempts = all[pseudonym].attempts || [];
    all[pseudonym].attempts.push(attempt);
    this._save(all);
  },

  saveFinalDraft(pseudonym, draft, checklist) {
    const all = this._load();
    if (!all[pseudonym]) all[pseudonym] = this._newProgress(pseudonym);
    all[pseudonym].finalDraft = draft;
    all[pseudonym].finalChecklist = checklist;
    this._save(all);
  },

  markFinalComplete(pseudonym, score) {
    const all = this._load();
    if (!all[pseudonym]) all[pseudonym] = this._newProgress(pseudonym);
    all[pseudonym].completedFinal = true;
    all[pseudonym].score = score;
    if (!all[pseudonym].badges.includes('orador-asamblea')) {
      all[pseudonym].badges.push('orador-asamblea');
    }
    this._save(all);
  },

  buildCSV(pseudonym) {
    const data = this._load()[pseudonym];
    if (!data || !data.attempts || !data.attempts.length) return null;

    const cols = [
      'id_seudonimo', 'fecha_hora', 'nivel', 'reto_id', 'saber',
      'correcto', 'intentos', 'pista_usada', 'vidas_perdidas',
      'tiempo_seg', 'puntaje_total', 'nivel_max'
    ];

    const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;

    const rows = data.attempts.map(a =>
      cols.map(c => {
        const v = a[c];
        return typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : esc(v);
      }).join(',')
    );

    return [cols.join(','), ...rows].join('\r\n');
  },

  downloadCSV(pseudonym) {
    const csv = this.buildCSV(pseudonym);
    if (!csv) return false;
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arena_argumentos_${pseudonym}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  }
};
