'use strict';

/**
 * Arena de Argumentos — Síntesis de voz
 * Usa Web Speech API (es-EC preferido, luego es).
 */
const Speech = {
  _synth: window.speechSynthesis || null,
  _voices: [],
  enabled: true,

  init() {
    if (!this._synth) return;
    const load = () => { this._voices = this._synth.getVoices(); };
    if (this._synth.onvoiceschanged !== undefined) {
      this._synth.addEventListener('voiceschanged', load);
    }
    load();
  },

  _bestVoice() {
    const prefs = ['es-EC', 'es-US', 'es-MX', 'es-ES', 'es'];
    for (const lang of prefs) {
      const v = this._voices.find(v =>
        v.lang === lang || v.lang.startsWith(lang.split('-')[0])
      );
      if (v) return v;
    }
    return null;
  },

  speak(text) {
    if (!this._synth || !this.enabled || !text) return;
    this._synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-EC';
    const voice = this._bestVoice();
    if (voice) utt.voice = voice;
    utt.rate = 0.88;
    utt.pitch = 1.05;
    this._synth.speak(utt);
  },

  stop() {
    if (this._synth) this._synth.cancel();
  },

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    return this.enabled;
  },

  isAvailable() {
    return !!this._synth;
  }
};

Speech.init();
