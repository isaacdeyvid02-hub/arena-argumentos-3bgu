'use strict';

/**
 * Arena de Argumentos — Configuración global
 * Para publicar, editar SURVEY_URL con la URL real de la encuesta.
 */
const CONFIG = {
  SURVEY_URL: 'https://docs.google.com/forms/d/e/1FAIpQLScd_jIwbic-BOtc3rRLKRd-bQzMoB6QCZNUZt5z7rujj1OBVA/viewform',
  MIN_WORDS: 80,
  MAX_WORDS: 120,
  PASS_CHALLENGES: 2,       // aciertos mínimos para superar un nivel
  POINTS_FIRST: 10,         // puntos al acertar en primer intento
  POINTS_SECOND: 5,         // puntos al acertar en segundo intento
  MAX_LIVES: 3,             // vidas por nivel
  TOTAL_LEVELS: 5,
  CHALLENGES_PER_LEVEL: 3,
  VERSION: '1.0.0',
  STORAGE_KEY: 'arena_argumentos_v1'
};
