'use strict';

/**
 * Arena de Argumentos — Contenido del juego
 *
 * Fuente real usada: Miao, F. y Holmes, W. (2023).
 *   Guidance for generative AI in education and research. París: UNESCO.
 *
 * Todas las demás lecturas están marcadas como
 * "Texto elaborado por el docente."
 * No se incluyen datos estadísticos sin fuente verificada.
 */

// ─── Insignias ────────────────────────────────────────────
const BADGES = [
  { id: 'tesis-clara',       label: 'Tesis clara',           nivel: 1, icon: 'bulb'    },
  { id: 'evidencia-solida',  label: 'Evidencia sólida',      nivel: 2, icon: 'scroll'  },
  { id: 'refutador-cortes',  label: 'Refutador cortés',      nivel: 3, icon: 'dove'    },
  { id: 'texto-cohesionado', label: 'Texto cohesionado',     nivel: 4, icon: 'link'    },
  { id: 'cita-responsable',  label: 'Cita responsable',      nivel: 5, icon: 'quill'   },
  { id: 'orador-asamblea',   label: 'Orador de la Asamblea', nivel: 0, icon: 'star'    }
];

// ─── Niveles y retos ──────────────────────────────────────
const GAME_DATA = [

  // ═══════════════════════════════════════════════════════
  // NIVEL 1 — ENCUENTRA LA TESIS
  // ═══════════════════════════════════════════════════════
  {
    nivel: 1,
    titulo: 'Encuentra la tesis',
    saber: 'd.4',
    escenario: 'atrio',
    lectura: {
      texto: 'En 2023, la UNESCO publicó una guía que advierte que las herramientas de inteligencia artificial generativa pueden generar textos con errores presentados con aparente confianza. Los autores recomiendan que las instituciones educativas adopten políticas claras antes de permitir su uso estudiantil. Sin una política institucional definida, los riesgos de deshonestidad académica y de aprendizaje superficial se incrementan de manera significativa.',
      fuente: 'Miao, F. y Holmes, W. (2023). Guidance for generative AI in education and research. París: UNESCO.'
    },
    retos: [
      {
        id: 'N1-R1',
        saber: 'd.4',
        quinde: '¿Cuál es la tesis del texto que acabas de leer?',
        opciones: [
          'Las instituciones educativas deben tener políticas claras antes de permitir el uso de IA generativa.',
          'La UNESCO publicó una guía sobre inteligencia artificial en 2023.',
          'La IA generativa puede cometer errores en sus respuestas.',
          'La inteligencia artificial es una tecnología reciente en la educación.'
        ],
        correcta: 0,
        pista1: 'La tesis es la idea que el autor defiende, no un dato ni un ejemplo.',
        pista2: 'Pregúntate: ¿qué quiere el autor que yo acepte como cierto? La opción correcta responde eso con una postura ("debe", "es necesario").',
        ok: '¡Exacto! La tesis dice qué debe hacerse o creerse, no solo describe hechos. Recibe tu pluma. 🪶',
        error: 'Esa opción cuenta un hecho o da información, pero no defiende una postura. Vuelve a leer la última oración del párrafo.'
      },
      {
        id: 'N1-R2',
        saber: 'd.4',
        quinde: 'Lee este fragmento: «Según Miao y Holmes (2023), la IA puede producir errores. Por eso, el bachillerato ecuatoriano no debería usar IA sin supervisión docente.» ¿Cuál es la tesis de ese texto?',
        opciones: [
          'Miao y Holmes publicaron su guía en el año 2023.',
          'La IA puede producir errores en sus respuestas.',
          'El bachillerato ecuatoriano ya utiliza inteligencia artificial en sus aulas.',
          'El bachillerato ecuatoriano no debería usar IA sin supervisión docente.'
        ],
        correcta: 3,
        pista1: 'La tesis es la postura que el autor defiende. Los datos son el apoyo, no la tesis.',
        pista2: 'Busca la oración que dice qué "debe" o "no debe" hacerse. Esa es la idea que el autor quiere que aceptes.',
        ok: '¡Correcto! «No debería usarse sin supervisión» es una postura que el autor defiende. Los demás son datos o hechos. 🪶',
        error: 'Fíjate bien: una tesis toma postura («debe», «no debe», «es necesario»). Los otros son solo datos o información.'
      },
      {
        id: 'N1-R3',
        saber: 'd.4',
        quinde: '¿Cuál de estas oraciones cumple la función de tesis en un texto argumentativo?',
        opciones: [
          'Un chatbot es un programa informático que responde preguntas de forma automática.',
          'Muchos jóvenes usan aplicaciones de inteligencia artificial para hacer sus tareas.',
          'En Ecuador, el bachillerato general unificado tiene una duración de tres años.',
          'La IA generativa debe usarse en el aula solo cuando el docente establece criterios claros de evaluación.'
        ],
        correcta: 3,
        pista1: 'Una tesis defiende una postura sobre un tema. Las definiciones y datos no son tesis.',
        pista2: 'Busca la oración que exprese lo que el autor cree que "debe" o "debería" hacerse, no lo que simplemente "es".',
        ok: '¡Muy bien! Esa oración toma postura y defiende una idea. Las demás solo describen o informan. 🪶',
        error: 'Las otras opciones describen hechos o definen conceptos. La tesis siempre expresa una postura o un juicio de valor.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // NIVEL 2 — EVIDENCIAS CONFIABLES
  // ═══════════════════════════════════════════════════════
  {
    nivel: 2,
    titulo: 'Evidencias confiables',
    saber: 'd.4, a.6, p.5',
    escenario: 'biblioteca',
    lectura: {
      texto: 'Cuando argumentamos, no basta con tener una opinión: necesitamos evidencias que otros puedan comprobar. Una evidencia confiable proviene de una fuente reconocida —una institución, una investigación, un organismo oficial— e indica quién la produce y cuándo. En el debate sobre la inteligencia artificial en las tareas escolares, abundan las opiniones en redes sociales, pero escasean los datos verificables. Distinguir entre unos y otros es una habilidad académica fundamental.',
      fuente: 'Texto elaborado por el docente.'
    },
    retos: [
      {
        id: 'N2-R1',
        saber: 'd.4, a.6',
        quinde: 'Estás escribiendo un texto que defiende la idea de que la IA puede usarse con responsabilidad. ¿Cuál de estas opciones es una evidencia confiable para apoyarla?',
        opciones: [
          'Según la UNESCO (Miao y Holmes, 2023), la IA generativa puede usarse con fines pedagógicos si las instituciones establecen políticas claras de uso responsable.',
          'Mi compañero dice que la IA le ayudó a sacar buenas notas en Matemáticas este trimestre.',
          'Todo el mundo sabe que la tecnología siempre avanza y que no se puede detener.',
          'En internet hay miles de videos que explican cómo usar herramientas de IA de forma correcta.'
        ],
        correcta: 0,
        pista1: 'Una evidencia confiable tiene autor, año y organización reconocida. Se puede comprobar por cualquier persona.',
        pista2: '«Mi compañero dijo» o «todo el mundo sabe» son opiniones sin respaldo. Una fuente institucional con año sí tiene respaldo verificable.',
        ok: '¡Bien visto! Los datos con fuente reconocida son la columna vertebral de un texto académico. 🪶',
        error: 'Revisa si la opción que elegiste tiene autor, fecha u organización verificable. Si no tiene esos datos, es solo opinión.'
      },
      {
        id: 'N2-R2',
        saber: 'd.4, a.6',
        quinde: 'Un estudiante quiere argumentar que la IA puede generar información incorrecta. ¿Cuál de estas opciones es solo una opinión sin respaldo?',
        opciones: [
          'Miao y Holmes (2023) advierten que los sistemas de IA generativa pueden producir información falsa con aparente confianza.',
          'La guía de la UNESCO (2023) recomienda que las instituciones definan políticas de uso antes de adoptar estas herramientas.',
          'La IA siempre inventa cosas; nadie debería confiar en ella para nada.',
          'Un organismo internacional de educación señala la necesidad de supervisión docente en el uso de la IA.'
        ],
        correcta: 2,
        pista1: 'Una opinión sin respaldo no indica quién la dice, cuándo ni dónde. Solo expresa una creencia de manera absoluta.',
        pista2: 'Las opciones A, B y D citan fuentes o instituciones. ¿Cuál no tiene ninguna fuente y además usa palabras absolutas como «siempre» y «nadie»?',
        ok: '¡Correcto! «La IA siempre inventa cosas» es una generalización sin fuente. Las otras opciones citan documentos o instituciones. 🪶',
        error: 'Busca la opción que no menciona ninguna fuente y que usa palabras absolutas como «siempre» o «nadie». Esas son señales de opinión sin respaldo.'
      },
      {
        id: 'N2-R3',
        saber: 'p.5',
        quinde: '¿Cuál es la mejor manera de incluir esta información en tu texto: «La UNESCO recomienda que las instituciones definan políticas antes de adoptar la IA»?',
        opciones: [
          'Hay que tener políticas antes de usar la IA en la escuela; eso lo saben todos.',
          'La UNESCO es una organización internacional muy importante que trabaja en educación.',
          'Todos los expertos del mundo coinciden en que necesitamos políticas claras para la IA.',
          'Según la UNESCO (Miao y Holmes, 2023), las instituciones deben establecer políticas de uso antes de adoptar la IA generativa en sus aulas.'
        ],
        correcta: 3,
        pista1: 'La mejor evidencia indica la fuente y es fiel a lo que dice el documento original.',
        pista2: 'La opción correcta es la única que cita al autor, el año y la organización. Las otras son vagas o no citan a nadie concreto.',
        ok: '¡Excelente! Incluir autor y año hace que tu argumento sea verificable y académicamente sólido. 🪶',
        error: 'La opción correcta indica quién dijo algo y cuándo. Revisa cuál es la única que lo hace de forma precisa y verificable.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // NIVEL 3 — CONTRAARGUMENTO Y REFUTACIÓN
  // ═══════════════════════════════════════════════════════
  {
    nivel: 3,
    titulo: 'Contraargumento y refutación',
    saber: 'd.4, p.3',
    escenario: 'tribuna-debate',
    lectura: {
      texto: 'En un debate académico, es necesario reconocer que existen posturas distintas a la nuestra. El contraargumento presenta la objeción más fuerte que podría hacerse a nuestra tesis. La refutación no ignora esa objeción: la reconoce con respeto y luego la responde con razones o evidencias. Un texto que solo repite su propia postura sin atender las objeciones no es verdaderamente argumentativo.',
      fuente: 'Texto elaborado por el docente.'
    },
    retos: [
      {
        id: 'N3-R1',
        saber: 'd.4, p.3',
        quinde: 'Lee este contraargumento: «Permitir la IA en las tareas destruye el pensamiento crítico del estudiante.» ¿Cuál opción lo refuta de forma respetuosa y con una razón válida?',
        opciones: [
          'Eso no es verdad; la IA es perfectamente segura y quienes la prohíben están equivocados.',
          'El pensamiento crítico tampoco se desarrolla con los métodos tradicionales, así que da igual.',
          'Es cierto que un uso sin guía puede reducir el esfuerzo cognitivo; sin embargo, cuando el docente establece criterios claros —como pedir al estudiante que critique la respuesta de la IA—, la herramienta puede, al contrario, estimular el pensamiento crítico.',
          'Nadie ha probado con datos que la IA sea dañina, así que ese argumento no tiene ninguna validez.'
        ],
        correcta: 2,
        pista1: 'Una buena refutación reconoce primero la parte válida del contraargumento antes de responderle.',
        pista2: '«Es cierto que… sin embargo…» es un conector de refutación. Las opciones que solo atacan o ignoran al otro no son refutaciones académicas respetuosas.',
        ok: '¡Perfecto! Reconocer lo válido del otro y luego responder con una razón es el sello de un orador respetuoso. 🪶',
        error: 'Fíjate si tu opción ataca a la persona, cambia de tema o simplemente niega sin argumentar. Una refutación académica hace algo diferente.'
      },
      {
        id: 'N3-R2',
        saber: 'd.4',
        quinde: 'Lee el párrafo y elige la oración que cumple la función de contraargumento:\n\n«La IA puede apoyar el aprendizaje si se usa con responsabilidad. [A] Algunos especialistas sostienen que, sin supervisión, esta herramienta fomenta la copia. [B] Sin embargo, el uso guiado puede desarrollar habilidades críticas. [C] La clave está en el diseño pedagógico de cada actividad. [D] La UNESCO recomienda políticas institucionales claras.»',
        opciones: [
          'Algunos especialistas sostienen que, sin supervisión, esta herramienta fomenta la copia.',
          'Sin embargo, el uso guiado puede desarrollar habilidades críticas.',
          'La clave está en el diseño pedagógico de cada actividad.',
          'La UNESCO recomienda políticas institucionales claras.'
        ],
        correcta: 0,
        pista1: 'El contraargumento es la objeción a nuestra postura, no nuestra respuesta ni nuestra conclusión.',
        pista2: 'Busca la oración que presenta la postura contraria, es decir, el argumento del lado opuesto a la tesis del párrafo.',
        ok: '¡Muy bien! Esa oración presenta la postura contraria. Las demás apoyan o concluyen la postura principal. 🪶',
        error: 'El contraargumento es la voz opuesta, no la respuesta ni el argumento a favor de la tesis.'
      },
      {
        id: 'N3-R3',
        saber: 'p.3',
        quinde: '¿Cuál de estas refutaciones responde con respeto y con una razón válida al contraargumento: «La IA solo sirve para hacer trampa»?',
        opciones: [
          'Esa afirmación es ridícula; cualquier herramienta puede usarse bien o mal, como un lápiz.',
          'Si fuera así, tampoco deberían existir calculadoras ni internet en las instituciones educativas.',
          'Si bien la IA puede facilitar la deshonestidad académica, su uso con criterios pedagógicos claros —como la revisión crítica de los textos generados— convierte la herramienta en un apoyo al aprendizaje, no en un sustituto del esfuerzo propio.',
          'La trampa existía mucho antes de que existiera la IA, así que prohibirla no resuelve ningún problema.'
        ],
        correcta: 2,
        pista1: 'La refutación parte de «es cierto que…» o «si bien…» y luego responde con una razón o solución concreta.',
        pista2: 'La opción A insulta. La B cambia el tema con otro ejemplo. La D evita responder el argumento original. La correcta reconoce el riesgo real y responde con una solución.',
        ok: '¡Excelente! Reconocer el riesgo y responderle con una solución concreta es una refutación sólida y respetuosa. 🪶',
        error: 'Las otras opciones evitan responder el argumento o atacan al interlocutor. Una buena refutación lo enfrenta directamente con respeto.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // NIVEL 4 — CONECTORES
  // ═══════════════════════════════════════════════════════
  {
    nivel: 4,
    titulo: 'Conectores',
    saber: 'p.4',
    escenario: 'puente',
    lectura: {
      texto: 'Un texto argumentativo bien estructurado usa conectores para que el lector entienda la relación entre las ideas: si es una adición («además»), una concesión («aunque», «si bien»), una consecuencia («por lo tanto», «en consecuencia») o una oposición («sin embargo», «no obstante»). Elegir el conector equivocado puede invertir el sentido de un argumento y confundir al lector. Por esta razón, dominar su función lógica permite defender una postura con claridad, coherencia y rigor académico.',
      fuente: 'Texto elaborado por el docente.'
    },
    retos: [
      {
        id: 'N4-R1',
        saber: 'p.4',
        quinde: 'Elige el conector que mejor une estas dos ideas:\n\n«La IA puede cometer errores graves en datos históricos. _______, es indispensable que el estudiante verifique siempre la información que genera.»',
        opciones: [
          'Por lo tanto',
          'Aunque',
          'Además',
          'Sin embargo'
        ],
        correcta: 0,
        pista1: 'Busca la relación lógica: ¿la segunda idea se opone, suma o se desprende de la primera?',
        pista2: 'Los errores de la IA llevan a una consecuencia lógica: hay que verificar. Los conectores de consecuencia son: «por lo tanto», «en consecuencia», «de ahí que».',
        ok: '¡Exacto! «Por lo tanto» indica que la segunda idea se desprende lógicamente de la primera. 🪶',
        error: 'Lee las dos ideas en voz alta y piensa: ¿la segunda resulta de la primera? Si es así, necesitas un conector de consecuencia, no de oposición ni de adición.'
      },
      {
        id: 'N4-R2',
        saber: 'p.4',
        quinde: 'Elige el conector que mejor une estas ideas:\n\n«El uso de la IA en las tareas puede ahorrar tiempo. _______, no reemplaza el proceso de reflexión y redacción personal del estudiante.»',
        opciones: [
          'Además',
          'Por lo tanto',
          'Sin embargo',
          'Dado que'
        ],
        correcta: 2,
        pista1: 'Las dos ideas se contrastan: una señala algo positivo de la IA y la otra señala una limitación importante.',
        pista2: 'Cuando dos ideas se oponen o contrastan, se usan conectores de oposición: «sin embargo», «no obstante», «pero». No «además» (que suma) ni «por lo tanto» (que da consecuencias).',
        ok: '¡Correcto! «Sin embargo» señala que la segunda idea contrasta o limita lo dicho en la primera. 🪶',
        error: 'Las dos ideas no se suman (no es «además») ni una resulta de la otra (no es «por lo tanto»). Se contrastan. ¿Qué conector indica contraste u oposición?'
      },
      {
        id: 'N4-R3',
        saber: 'p.4',
        quinde: 'Completa el texto con el conector más adecuado:\n\n«La guía de la UNESCO reconoce los riesgos de la IA generativa. _______, propone acompañarla de políticas institucionales, en lugar de prohibirla de manera absoluta.»',
        opciones: [
          'No obstante',
          'Por eso',
          'Incluso',
          'Ya que'
        ],
        correcta: 0,
        pista1: 'La primera oración reconoce un problema; la segunda propone algo diferente a lo que se esperaría. ¿Qué tipo de relación es?',
        pista2: '«No obstante» y «sin embargo» expresan que, a pesar de lo dicho antes, viene una idea diferente o sorpresiva. «Por eso» indicaría consecuencia directa, pero la UNESCO hace algo inesperado: propone regular en vez de prohibir.',
        ok: '¡Muy bien! «No obstante» señala que, a pesar de los riesgos reconocidos, la UNESCO opta por regular en vez de prohibir. Es una postura que contrasta con lo esperado. 🪶',
        error: '«Por eso» indicaría que prohibir sería la consecuencia lógica. Pero la segunda idea sorprende: propone regular, no prohibir. Eso pide un conector de oposición o concesión.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // NIVEL 5 — CITA RESPONSABLE
  // ═══════════════════════════════════════════════════════
  {
    nivel: 5,
    titulo: 'Cita responsable',
    saber: 'p.5, a.7',
    escenario: 'sala-acuerdos',
    lectura: {
      texto: 'Citar una fuente significa indicar al lector de dónde proviene la información, ya sea con una cita textual (entre comillas) o con una paráfrasis (en tus propias palabras). En ambos casos, el autor, el año y, si es posible, la página deben aparecer. No citar equivale a presentar como propio algo que no lo es, lo que se llama plagio y afecta la integridad académica.',
      fuente: 'Texto elaborado por el docente.'
    },
    retos: [
      {
        id: 'N5-R1',
        saber: 'p.5',
        quinde: '¿Cuál de estos fragmentos presenta una cita correctamente?',
        opciones: [
          'Según la UNESCO (Miao y Holmes, 2023), la IA generativa «puede producir información falsa con un nivel de confianza que parece auténtico».',
          'La UNESCO dice que la IA miente mucho y que es muy peligrosa para los jóvenes estudiantes.',
          '«Los sistemas de IA pueden producir información falsa.»',
          'Algunos expertos creen que la IA tiene serios problemas con la veracidad de la información.'
        ],
        correcta: 0,
        pista1: 'Una cita correcta indica quién dijo algo (autor) y cuándo (año). Si es textual, va entre comillas «».',
        pista2: 'La opción B distorsiona el tono del original (exagera). La C tiene comillas pero no tiene autor ni año. La D es vaga: ¿quiénes son esos «expertos»?',
        ok: '¡Muy bien! Autor + año + comillas en la cita textual = cita responsable y verificable. 🪶',
        error: 'Revisa si falta el autor, el año o las comillas cuando la cita es textual. Los tres elementos son necesarios.'
      },
      {
        id: 'N5-R2',
        saber: 'p.5, a.7',
        quinde: 'Un estudiante escribe: «La inteligencia artificial generativa puede crear contenido que parece verdadero pero contiene errores.» Esta idea proviene de Miao y Holmes (2023). ¿Qué debe hacer para citar correctamente?',
        opciones: [
          'Nada más: usó sus propias palabras, así que no necesita citar.',
          'Solo escribir «UNESCO» en algún lugar del párrafo es suficiente.',
          'Poner toda la oración entre comillas y agregar la cita al final.',
          'Agregar (Miao y Holmes, 2023) al final de la oración, porque aunque está parafraseada, la idea no es del estudiante.'
        ],
        correcta: 3,
        pista1: 'Cuando parafraseas una idea ajena, la cita sigue siendo obligatoria aunque no uses las palabras exactas del original.',
        pista2: 'Parafrasear no es lo mismo que inventar. Si la idea vino de otro, debes indicar de quién. La paráfrasis no lleva comillas, pero sí lleva la referencia entre paréntesis.',
        ok: '¡Exacto! La paráfrasis también requiere cita. Solo se omite la referencia cuando la idea es genuinamente tuya. 🪶',
        error: 'Usar tus propias palabras no exime de citar la fuente original. Una paráfrasis sin referencia también es plagio académico.'
      },
      {
        id: 'N5-R3',
        saber: 'a.7',
        quinde: 'Lee este fragmento: «La IA puede cometer errores. Esto es un problema para los estudiantes que la usan sin supervisión.» El estudiante no cita ninguna fuente. ¿Cuál es el problema principal?',
        opciones: [
          'Ninguno: es información de conocimiento general que no necesita cita.',
          'El párrafo es demasiado corto para ser parte de un texto académico.',
          'Si esta información proviene de un autor o documento específico, omitir la cita equivale a plagio; y si es una conclusión propia, el texto debería dejar claro que el estudiante la elaboró a partir de lo leído.',
          'El vocabulario es demasiado simple para un texto académico formal de bachillerato.'
        ],
        correcta: 2,
        pista1: 'En un texto académico, el lector necesita saber qué ideas son propias del autor y cuáles provienen de otra fuente.',
        pista2: 'Si la idea sobre los errores de la IA viene de Miao y Holmes (2023), omitir la cita es plagio. Si es conclusión propia del estudiante, puede quedarse, pero el texto debe dejar claro que la elaboró el propio estudiante.',
        ok: '¡Excelente! La integridad académica exige que el lector sepa qué ideas son propias y cuáles vienen de otras fuentes. 🪶',
        error: 'En el texto académico, toda idea que proviene de una fuente debe citarse. «Es de conocimiento general» no es una razón válida para omitir la referencia en un argumento basado en datos.'
      }
    ]
  }
];

// ─── Reto final ───────────────────────────────────────────
const FINAL_CHALLENGE = {
  titulo: 'El Gran Discurso',
  instruccion: 'Llena cada caja. El juego unirá tus ideas en un solo párrafo. Revisa el conteo de palabras (meta: 80 a 120) y marca los criterios que crees que cumpliste. Tu docente hará la valoración final.',
  cajas: [
    {
      id: 'tesis',
      label: '1. Tesis',
      pista: 'Escribe en una oración la idea principal que defiendes.',
      placeholder: 'Ej.: El uso de la IA generativa en las tareas del bachillerato debe permitirse con supervisión docente.',
      conector: ''
    },
    {
      id: 'evidencia1',
      label: '2. Evidencia 1',
      pista: 'Escribe un dato de una fuente reconocida que apoye tu tesis (sin incluir la cita aquí).',
      placeholder: 'Ej.: La IA puede usarse con fines pedagógicos si las instituciones establecen políticas claras.',
      conector: 'En primer lugar, '
    },
    {
      id: 'cita1',
      label: '3. Cita de la evidencia 1',
      pista: 'Escribe la referencia: (Autor, año) o «cita textual» (Autor, año).',
      placeholder: 'Ej.: (Miao y Holmes, 2023).',
      conector: ''
    },
    {
      id: 'evidencia2',
      label: '4. Evidencia 2',
      pista: 'Escribe una segunda razón o dato que apoye tu tesis.',
      placeholder: 'Ej.: Los estudiantes que verifican las respuestas de la IA practican la lectura crítica.',
      conector: 'Además, '
    },
    {
      id: 'contraargumento',
      label: '5. Contraargumento',
      pista: 'Escribe la objeción más fuerte que podría hacerse a tu tesis.',
      placeholder: 'Ej.: se argumenta que la IA fomenta la copia y reduce el esfuerzo cognitivo.',
      conector: 'Si bien es cierto que '
    },
    {
      id: 'refutacion',
      label: '6. Refutación',
      pista: 'Responde con respeto y con una razón válida al contraargumento.',
      placeholder: 'Ej.: con criterios pedagógicos claros, la herramienta se convierte en apoyo, no en sustituto.',
      conector: 'sin embargo, '
    }
  ],
  criterios: [
    'La tesis toma postura clara sobre el tema de debate.',
    'La evidencia 1 proviene de una fuente verificable y tiene cita.',
    'La evidencia 2 proviene de una fuente verificable y tiene cita.',
    'El contraargumento reconoce la postura contraria con respeto.',
    'La refutación responde al contraargumento con una razón válida.'
  ]
};
