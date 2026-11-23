'use strict';

/**
 * Arena de Argumentos — Motor del juego
 * Máquina de estados: login → menu → intro → challenge → badge / failed → final → results
 */
const Game = {
  // ── Estado persistente ───────────────────────────
  pseudonym:  '',
  progress:   null,

  // ── Estado de sesión actual ──────────────────────
  currentLevel:       1,
  currentChallenge:   0,
  lives:              CONFIG.MAX_LIVES,
  score:              0,
  correctInLevel:     0,
  completedInLevel:   [false, false, false],
  currentAttempts:    0,
  hintsShown:         0,
  challengeStart:     0,   // timestamp
  extraHint:          false,  // pista extra tras repetir nivel

  // ── Init ─────────────────────────────────────────
  init() {
    UI.init();
    UI.renderLogin();
  },

  // ── Login ─────────────────────────────────────────
  login(pseudonym) {
    this.pseudonym = pseudonym.toUpperCase().trim();
    this.progress  = Storage.getProgress(this.pseudonym);
    this.score     = this.progress.score || 0;
    UI.renderMenu(this.progress);
  },

  // ── Start a level ──────────────────────────────────
  startLevel(levelNum, resetCompleted = true) {
    this.currentLevel     = levelNum;
    this.lives            = CONFIG.MAX_LIVES;
    if (resetCompleted) {
      this.completedInLevel = [false, false, false];
      this.correctInLevel   = 0;
      this.extraHint        = false;
      this.currentChallenge = 0;
    } else {
      // Conservar lo ya superado: buscar el primer reto no completado
      const nextPending = this.completedInLevel.indexOf(false);
      this.currentChallenge = nextPending !== -1 ? nextPending : 0;
    }
    const levelData = GAME_DATA[levelNum - 1];
    UI.renderLevelIntro(levelData, this.lives, this.score);
  },

  // ── Start a single challenge ───────────────────────
  startChallenge() {
    this.challengeStart = Date.now();
    const levelData = GAME_DATA[this.currentLevel - 1];
    const reto      = levelData.retos[this.currentChallenge];
    UI.renderChallenge(levelData, reto, this);

    // Si tiene pista extra y no ha pedido pistas, orientar
    if (this.extraHint && this.hintsShown === 0) {
      setTimeout(() => this.showHint(), 400);
    }
  },

  // ── Check student's answer ─────────────────────────
  checkAnswer(selectedIdx) {
    const levelData = GAME_DATA[this.currentLevel - 1];
    const reto      = levelData.retos[this.currentChallenge];
    this.currentAttempts++;

    const correct = selectedIdx === reto.correcta;
    const timeSec = Math.round((Date.now() - this.challengeStart) / 1000);

    let points = 0;
    if (correct) {
      if (this.currentAttempts === 1)      points = CONFIG.POINTS_FIRST;
      else if (this.currentAttempts === 2)  points = CONFIG.POINTS_SECOND;
      this.score += points;
      if (!this.completedInLevel[this.currentChallenge]) {
        this.completedInLevel[this.currentChallenge] = true;
        this.correctInLevel++;
      }
    } else {
      this.lives--;
    }

    // Persist attempt record
    const nivelMax = Math.max(
      this.currentLevel,
      parseInt(this.progress.currentLevel) || 1
    );
    Storage.pushAttempt(this.pseudonym, {
      id_seudonimo:  this.pseudonym,
      fecha_hora:    new Date().toISOString(),
      nivel:         this.currentLevel,
      reto_id:       reto.id,
      saber:         reto.saber,
      correcto:      correct,
      intentos:      this.currentAttempts,
      pista_usada:   this.hintsShown > 0,
      vidas_perdidas:CONFIG.MAX_LIVES - this.lives,
      tiempo_seg:    timeSec,
      puntaje_total: this.score,
      nivel_max:     nivelMax
    });

    // Show feedback, then advance
    UI.showAnswerFeedback(correct, reto, selectedIdx, points, () => {
      this._afterFeedback(correct);
    });
  },

  _afterFeedback(wasCorrect) {
    // Vidas agotadas → repetir nivel conservando lo ya superado y con pista extra
    if (this.lives <= 0) {
      UI.renderLevelFailed(this.currentLevel, () => {
        this.extraHint = true;
        this.startLevel(this.currentLevel, false);
      });
      return;
    }

    if (wasCorrect) {
      // Buscar siguiente reto pendiente en el nivel
      const nextPending = this.completedInLevel.indexOf(false);
      if (nextPending !== -1 && this.currentChallenge < CONFIG.CHALLENGES_PER_LEVEL - 1) {
        this.currentChallenge++;
        this.currentAttempts = 0;
        this.hintsShown      = 0;
        this.startChallenge();
      } else {
        // Fin del nivel
        this._endLevel();
      }
    } else {
      // Falló pero aún le quedan vidas: reintenta el mismo reto sin resetear número de intentos
      this.startChallenge();
    }
  },

  _endLevel() {
    if (this.correctInLevel >= CONFIG.PASS_CHALLENGES) {
      // Level passed!
      const badge    = BADGES.find(b => b.nivel === this.currentLevel);
      const nextLevel = this.currentLevel + 1;

      // Update progress
      this.progress.score = this.score;
      if (!this.progress.badges.includes(badge.id)) {
        this.progress.badges.push(badge.id);
      }
      this.progress.currentLevel = Math.max(
        parseInt(this.progress.currentLevel) || 1,
        nextLevel
      );
      Storage.setProgress(this.pseudonym, this.progress);

      UI.renderBadge(badge, this.score, () => {
        if (this.currentLevel >= CONFIG.TOTAL_LEVELS) {
          Final.start();
        } else {
          this.currentLevel = nextLevel;
          UI.renderMenu(this.progress);
        }
      });
    } else {
      // Completed all challenges but fewer than 2 correct
      UI.renderLevelFailed(this.currentLevel, () => {
        this.extraHint = true;
        this.startLevel(this.currentLevel);
      });
    }
  },

  // ── Hint ──────────────────────────────────────────
  showHint() {
    const levelData = GAME_DATA[this.currentLevel - 1];
    const reto      = levelData.retos[this.currentChallenge];
    this.hintsShown++;

    if (this.hintsShown === 1) {
      UI.showHintText(reto.pista1, 1);
      Speech.speak('Pista: ' + reto.pista1);
    } else {
      UI.showHintText(reto.pista2, 2);
      Speech.speak('Ejemplo: ' + reto.pista2);
    }

    // Hide hint button after both hints shown
    if (this.hintsShown >= 2) {
      const hb = document.getElementById('btn-hint');
      if (hb) {
        hb.disabled = true;
        hb.textContent = '💡 Sin más pistas';
      }
    }
  }
};

// ── Bootstrap ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => Game.init());
