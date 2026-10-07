import {
  CaseStudy,
  ExamQuestion,
  InstitutionalValue,
  ProductiveAlternative,
  RegulationRule,
  SymbolElement,
  WellnessDimension,
} from '../types/induction';

export const SENA_PROFILE_DEFAULT = {
  fullName: 'Gloria Inés Martínez',
  documentType: 'C.C.',
  documentNumber: '1023456789',
  trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  ficheNumber: '2874910',
  regional: 'Regional Distrito Capital',
  trainingCenter: 'Centro de Servicios Financieros',
  joinedDate: '2026-03-01',
};

export const REGIONAL_OPTIONS = [
  'Regional Distrito Capital',
  'Regional Antioquia',
  'Regional Valle del Cauca',
  'Regional Santander',
  'Regional Atlántico',
  'Regional Bolívar',
  'Regional Cundinamarca',
  'Regional Boyacá',
  'Regional Caldas',
  'Regional Risaralda',
  'Regional Quindío',
  'Regional Tolima',
  'Regional Huila',
  'Regional Nariño',
  'Regional Cauca',
  'Regional Meta',
  'Regional Cesar',
  'Regional Córdoba',
  'Regional Magdalena',
  'Regional Sucre',
  'Regional La Guajira',
  'Regional Norte de Santander',
  'Regional Casanare',
  'Regional Arauca',
  'Regional Chocó',
  'Regional Caquetá',
  'Regional Putumayo',
  'Regional Amazonas',
  'Regional Guainía',
  'Regional Guaviare',
  'Regional Vaupés',
  'Regional Vichada',
  'Regional San Andrés y Providencia',
];

export const INSTITUTIONAL_VALUES: InstitutionalValue[] = [
  {
    id: 'respeto',
    title: 'Respeto',
    definition:
      'Reconocemos la dignidad innata de cada persona, sus derechos, diferencias y opiniones en todo momento.',
    example:
      'Escuchar activamente los puntos de vista de instructores y compañeros en debates técnicos, valorando la diversidad cultural de las regiones.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'librepensamiento',
    title: 'Librepensamiento y Actitud Crítica',
    definition:
      'Fomentamos la libertad de ideas, el debate constructivo, la argumentación reflexiva y la búsqueda constante de la verdad.',
    example:
      'Cuestionar soluciones tecnológicas obsoletas y proponer alternativas innovadoras fundamentadas en datos y buenas prácticas.',
    iconName: 'Brain',
  },
  {
    id: 'liderazgo',
    title: 'Liderazgo',
    definition:
      'Inspiramos y movilizamos a otros para alcanzar metas comunes que transformen positivamente a Colombia.',
    example:
      'Asumir el rol de vocero de ficha con responsabilidad, impulsando a los compañeros para que nadie deserte de su proceso formativo.',
    iconName: 'Compass',
  },
  {
    id: 'solidaridad',
    title: 'Solidaridad',
    definition:
      'Nos comprometemos con el bienestar de los demás, apoyando especialmente a quienes enfrentan mayores dificultades.',
    example:
      'Crear grupos de estudio voluntarios para apoyar a compañeros que tengan dificultades con competencias difíciles o acceso a internet.',
    iconName: 'Users',
  },
  {
    id: 'justicia-equidad',
    title: 'Justicia y Equidad',
    definition:
      'Garantizamos oportunidades de formación de calidad para todos sin discriminación de género, etnia, credo o condición socioeconómica.',
    example:
      'Defender la inclusión de personas con capacidades diversas en ambientes de aprendizaje y proyectos formativos colaborativos.',
    iconName: 'Scale',
  },
  {
    id: 'transparencia',
    title: 'Transparencia',
    definition:
      'Actuamos con honestidad, rectitud y claridad en la gestión académica, evaluación y uso de los recursos públicos.',
    example:
      'Entregar evidencias de aprendizaje auténticas y de autoría propia, rechazando el plagio y la suplantación.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'creatividad-innovacion',
    title: 'Creatividad e Innovación',
    definition:
      'Buscamos formas originales y efectivas de solucionar problemas productivos y sociales a través de la ciencia y la tecnología.',
    example:
      'Formular proyectos formativos con base en SENNOVA y TecnoParques que respondan a necesidades reales de las comunidades locales.',
    iconName: 'Lightbulb',
  },
];

export const HISTORY_TIMELINE = [
  {
    year: '1957',
    title: 'Nacimiento del SENA',
    description:
      'Fundado el 21 de junio de 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118, como una iniciativa concertada entre trabajadores (UTC y CTC), empresarios (ANDI) y el Estado.',
    impact: 'Se crea la institución bandera de la formación técnica para el trabajo en Colombia.',
  },
  {
    year: '1960 - 1970',
    title: 'Expansión Nacional y FPI',
    description:
      'Se construyen sedes en las principales ciudades y se consolida el modelo de Formación Profesional Integral (FPI), combinando conocimientos técnicos con formación humana integral.',
    impact: 'Miles de obreros y campesinos acceden por primera vez a cualificación técnica certificada.',
  },
  {
    year: '1990 - 2000',
    title: 'Modernización Tecnológica',
    description:
      'El SENA incorpora centros de teleinformática, automatización industrial y convenios internacionales. Se crean los centros de formación agropecuaria y de biotecnología.',
    impact: 'Adaptación del talento humano colombiano a la apertura económica y la era digital.',
  },
  {
    year: '2004 - 2015',
    title: 'Plataformas Digitales y Emprendimiento',
    description:
      'Lanzamiento del Fondo Emprender para financiar iniciativas de aprendices. Creación de la plataforma SOFIA Plus y la red nacional de TecnoParques para la innovación.',
    impact: 'Fomento al autoempleo, investigación aplicada (SENNOVA) y formación virtual en todo el país.',
  },
  {
    year: 'Actualidad',
    title: 'Transformación Digital y Justicia Social',
    description:
      'Estrategia CampeSENA para campesinos, formación en Inteligencia Artificial, tecnologías cuánticas, transición energética y presencia en las 33 regionales y 117 centros.',
    impact: 'Formación 100% gratuita, pertinente y accesible para más de un millón de colombianos al año.',
  },
];

export const SYMBOLS_ELEMENTS: SymbolElement[] = [
  {
    id: 'rueda',
    name: 'La Rueda Dentada (Piñón)',
    meaning: 'Sector Industria y de la Construcción',
    description:
      'Simboliza el trabajo mecánico, la manufactura, la ingeniería, la infraestructura y el avance tecnológico que mueve los sectores productivos de la nación.',
  },
  {
    id: 'caduceo',
    name: 'El Caduceo de Mercurio',
    meaning: 'Sector Comercio y Servicios',
    description:
      'Representa las transacciones comerciales, la logística, la administración, el turismo, la salud y la amplia gama de servicios que sustentan la economía nacional.',
  },
  {
    id: 'cafe-espiga',
    name: 'El Grano de Café y la Espiga',
    meaning: 'Sector Agropecuario y Forestal',
    description:
      'Evoca las raíces del campo colombiano, la seguridad alimentaria, el agro, la biodiversidad y el trabajo incansable de los campesinos de nuestra patria.',
  },
];

export const ANTHEM_LYRICS = {
  authorLyrics: 'Luis Alfredo Osorio',
  authorMusic: 'Daniel Marlez',
  chorus: [
    'Estudiantes del SENA adelante,',
    'por Colombia luchad con amor,',
    'con amor a la patria y al trabajo,',
    'sus hijos triunfarán con honor.',
  ],
  stanzas: [
    {
      number: 'I',
      lines: [
        'En la forja del SENA se forman',
        'hombres libres que van a triunfar,',
        'con la ciencia y la técnica unidas',
        'un futuro grandioso forjar.',
      ],
    },
    {
      number: 'II',
      lines: [
        'Hoy la patria nos llama al trabajo,',
        'nuestra fuerza debemos brindar,',
        'con tesón y esperanza en el alma',
        'por Colombia queremos luchar.',
      ],
    },
    {
      number: 'III',
      lines: [
        'Es el SENA la cuna del pueblo,',
        'donde aprende la fe en el deber,',
        'y marchando seguros al triunfo',
        'nueva patria sabremos tener.',
      ],
    },
    {
      number: 'IV',
      lines: [
        'Compañeros de estudio marchemos',
        'con la frente muy alta hacia el sol,',
        'que en el pecho llevamos la antorcha',
        'de la paz, la justicia y la unión.',
      ],
    },
  ],
};

export const REGULATION_RULES: RegulationRule[] = [
  // Derechos (Capítulo II - Acuerdo 009 de 2024)
  {
    id: 'der-1',
    category: 'derechos',
    title: 'Formación Profesional Integral de Calidad',
    article: 'Acuerdo 009/2024, Art. 5',
    description:
      'Recibir una formación profesional integral acorde con el programa formativo, con enfoque humanista, tecnológico y socioemocional, orientada por instructores competentes en ambientes dignos.',
    practicalTip:
      'Tienes derecho a que tus instructores expliquen con claridad los resultados de aprendizaje, criterios de evaluación y resuelvan tus dudas académicas.',
  },
  {
    id: 'der-2',
    category: 'derechos',
    title: 'Acceso a Infraestructura, Ambientes y EPP',
    article: 'Acuerdo 009/2024, Art. 5',
    description:
      'Hacer uso de los ambientes de aprendizaje, laboratorios, talleres, biblioteca, plataformas digitales, conectividad, bienestar y recibir los elementos de protección personal (EPP) necesarios.',
    practicalTip:
      'Puedes ingresar a talleres y bibliotecas con tu acreditación de aprendiz vigente cumpliendo siempre las normas de seguridad y salud en el trabajo.',
  },
  {
    id: 'der-3',
    category: 'derechos',
    title: 'Debido Proceso, Dignidad y Defensa',
    article: 'Acuerdo 009/2024, Art. 5 y Art. 39',
    description:
      'Garantía plena del debido proceso, presunción de inocencia, confidencialidad, derecho a ser escuchado en descargos ante el Comité de Evaluación y Seguimiento, y presentar pruebas.',
    practicalTip:
      'Si tienes una inconformidad con un juicio evaluativo, tienes dos (2) días hábiles tras su notificación para solicitar revisión formal o designación de segundo evaluador.',
  },
  {
    id: 'der-4',
    category: 'derechos',
    title: 'Representatividad Democrática y Enfoque Diferencial',
    article: 'Acuerdo 009/2024, Art. 7',
    description:
      'Participación democrática organizada en 3 rutas: Representantes por jornada/modalidad, Voceros de grupo y Voceros con enfoque diferencial (Indígena, NARP, LGTBIQ+, Campesino, Discapacidad y Mujer).',
    practicalTip:
      'Cualquier aprendiz puede postularse como vocero de su grupo o participar en los comités con voz y voto para canalizar iniciativas estudiantiles.',
  },
  {
    id: 'der-5',
    category: 'derechos',
    title: 'Protección a Gestantes, Lactancia y Paternidad',
    article: 'Acuerdo 009/2024 (Ley 2394 de 2024)',
    description:
      'Protección especial para aprendices gestantes, en periodo de lactancia o con licencias de paternidad, garantizando la continuidad de su proceso formativo sin discriminación.',
    practicalTip:
      'Notifica tu estado a la coordinación para concertar planes de acompañamiento pedagógico flexible y salvaguardar tu permanencia.',
  },

  // Deberes (Capítulo III - Acuerdo 009 de 2024)
  {
    id: 'deb-1',
    category: 'deberes',
    title: 'Asistencia y Puntualidad en la Formación',
    article: 'Acuerdo 009/2024, Art. 8 y Art. 28',
    description:
      'Asistir puntualmente a todas las actividades formativas presenciales o sincrónicas y cumplir con las obligaciones pactadas en la etapa lectiva y productiva.',
    practicalTip:
      'Las inasistencias por fuerza mayor médica o calamidad deben justificarse documentalmente dentro de los tres (3) días hábiles siguientes al reintegro.',
  },
  {
    id: 'deb-2',
    category: 'deberes',
    title: 'Porte Digno de Carné y Elementos de Protección',
    article: 'Acuerdo 009/2024, Art. 8',
    description:
      'Portar visiblemente el carné institucional dentro de las instalaciones y vestir el uniforme o elementos de protección personal (EPP) requeridos en talleres y laboratorios.',
    practicalTip:
      'El carné es personal e intransferible. En talleres industriales, de salud o agropecuarios, los EPP salvan vidas y su uso es de estricto cumplimiento.',
  },
  {
    id: 'deb-3',
    category: 'deberes',
    title: 'Honestidad Intelectual y Originalidad',
    article: 'Acuerdo 009/2024, Art. 8 y Art. 33',
    description:
      'Entregar evidencias de aprendizaje de autoría propia, citando debidamente las fuentes y absteniéndose de plagio, fraude o suplantación en plataformas virtuales o presenciales.',
    practicalTip:
      'Citar fuentes según normas técnicas no solo evita sanciones por falta grave, sino que fortalece tu rigor profesional.',
  },
  {
    id: 'deb-4',
    category: 'deberes',
    title: 'Cuidado de Bienes y Sostenibilidad Ambiental',
    article: 'Acuerdo 009/2024, Art. 3 y Art. 8',
    description:
      'Cuidar los equipos, herramientas, software e instalaciones puestos a disposición, promoviendo el desarrollo sostenible y la separación adecuada de residuos.',
    practicalTip:
      'Reporta cualquier novedad técnica en máquinas o equipos antes de iniciar tu práctica técnica al instructor a cargo.',
  },

  // Prohibiciones (Capítulo III - Acuerdo 009 de 2024)
  {
    id: 'pro-1',
    category: 'prohibiciones',
    title: 'Plagio, Fraude y Suplantación',
    article: 'Acuerdo 009/2024, Art. 9',
    description:
      'Plagiar material intelectual, comercializar o comprar trabajos académicos, o suplantar a compañeros en plataformas virtuales (Zajuna) o evaluaciones presenciales.',
    practicalTip:
      'Constituye falta grave o gravísima que da lugar a no aprobación y remisión inmediata ante el Comité de Evaluación y Seguimiento.',
  },
  {
    id: 'pro-2',
    category: 'prohibiciones',
    title: 'Sustancias Psicoactivas, Alcohol y Armas',
    article: 'Acuerdo 009/2024, Art. 9',
    description:
      'Ingresar, comercializar, portar o consumir bebidas alcohólicas o sustancias psicoactivas; o ingresar cualquier tipo de arma en centros de formación o empresas.',
    practicalTip:
      'Es calificada como falta gravísima, activando el procedimiento sancionatorio inmediato con posible cancelación de matrícula e inhabilidad.',
  },
  {
    id: 'pro-3',
    category: 'prohibiciones',
    title: 'Acoso Sexual, Discriminación y Violencia',
    article: 'Acuerdo 009/2024, Art. 9 (Ley 2365 de 2024)',
    description:
      'Incurrir en cualquier acto de acoso sexual, violencia física, verbal, ciberacoso o discriminación por razones de género, orientación sexual, etnia, credo o discapacidad.',
    practicalTip:
      'El nuevo reglamento aplica cero tolerancia contra el acoso y la violencia, activando protocolos inmediatos de protección a las víctimas.',
  },
  {
    id: 'pro-4',
    category: 'prohibiciones',
    title: 'Uso Indebido de Plataformas y Datos',
    article: 'Acuerdo 009/2024, Art. 9',
    description:
      'Vulnerar la seguridad informática del SENA, alterar registros de asistencia o calificaciones, o compartir credenciales personales de acceso a los sistemas institucionales.',
    practicalTip:
      'Tus claves de Zajuna y SOFIA Plus son personales; la alteración de registros informáticos acarrea consecuencias disciplinarias y legales.',
  },
];

export const PRODUCTIVE_ALTERNATIVES: ProductiveAlternative[] = [
  {
    id: 'contrato-aprendizaje',
    title: 'Contrato de Aprendizaje',
    description:
      'Vinculación formativa con una empresa patrocinadora regulada por la Ley 789 de 2002. Es la modalidad más común en el SENA.',
    requirements: [
      'Estar en estado "Por certificar" de etapa lectiva o en los tiempos estipulados por el centro.',
      'No haber tenido previamente un contrato de aprendizaje en el mismo nivel técnico/tecnológico.',
      'Aprobación de la totalidad de Resultados de Aprendizaje (RAP) de etapa lectiva.',
    ],
    benefits: [
      'Apoyo de sostenimiento económico mensual (mínimo el 75% o 100% de un SMMLV según tasa de desempleo nacional).',
      'Afiliación a EPS durante lectiva y EPS + ARL cubierto 100% por la empresa durante la productiva.',
      'Alta probabilidad de contratación laboral formal al culminar el periodo.',
    ],
    badgeText: 'Alternativa Empresarial Más Popular',
  },
  {
    id: 'vinculacion-laboral',
    title: 'Vinculación Laboral o Contractual',
    description:
      'Aplica cuando el aprendiz ya labora en una empresa o suscribe un contrato laboral cuyas funciones se relacionan directamente con el programa de formación.',
    requirements: [
      'Contrato laboral formal vigente en funciones acordes a las competencias del programa.',
      'Certificación laboral expedida por la empresa con detalle de funciones y horario.',
      'Concertación del plan de trabajo con el instructor de seguimiento SENA.',
    ],
    benefits: [
      'Salario legal completo pactado con la empresa (no topado al apoyo de aprendizaje).',
      'Compatibilidad entre el trabajo productivo real y la acreditación de la etapa práctica.',
      'Acumulación de experiencia laboral certificada.',
    ],
    badgeText: 'Para Aprendices Trabajadores',
  },
  {
    id: 'proyecto-productivo',
    title: 'Proyecto Productivo (Emprendimiento)',
    description:
      'Formulación y puesta en marcha de una idea de negocio propia o articulada con el Fondo Emprender SENA y las unidades de emprendimiento.',
    requirements: [
      'Plan de negocio estructurado y validado por los gestores de emprendimiento del centro.',
      'Aplicación práctica de las competencias técnicas adquiridas.',
      'Cumplimiento de hitos productivos verificables mediante bitácoras.',
    ],
    benefits: [
      'Creación de empresa propia y generación de empleo futuro.',
      'Acompañamiento técnico especializado de la Unidad de Emprendimiento SENA.',
      'Posibilidad de postulación a capital semilla no reembolsable en Fondo Emprender.',
    ],
    badgeText: 'Ruta Emprendedora e Innovadora',
  },
  {
    id: 'pasantia',
    title: 'Pasantía Empresarial o Institucional',
    description:
      'Práctica concertada entre el SENA, el aprendiz y una empresa u organización (públicas, ONG, fundaciones o PYMEs) para el desarrollo de actividades específicas.',
    requirements: [
      'Convenio o acuerdo de pasantía formal firmado por las partes.',
      'Definición de objetivos pedagógicos y plan concertado de actividades.',
      'Afiliación a ARL por parte de la empresa o del SENA según el caso.',
    ],
    benefits: [
      'Excelente opción para entidades sin personería para contrato de aprendizaje.',
      'Desarrollo de proyectos con alto impacto social o comunitario.',
      'Flexibilidad en los esquemas de concertación horaria.',
    ],
    badgeText: 'Sector Público y Organizaciones',
  },
  {
    id: 'monitoria',
    title: 'Monitoría Institucional en el SENA',
    description:
      'Apoyo académico, técnico o tecnológico directo en laboratorios, talleres o ambientes especializados del propio Centro de Formación SENA.',
    requirements: [
      'Rendimiento académico destacado (100% de competencias aprobadas con excelencia).',
      'Convocatoria pública de monitorías abierta en el centro de formación.',
      'Dedicación horaria según resolución de monitorías.',
    ],
    benefits: [
      'Apoyo económico de sostenimiento institucional pagado por el SENA.',
      'Fortalecimiento profundo de habilidades pedagógicas y técnicas avanzadas.',
      'Certificación institucional de monitoría con alto valor en la hoja de vida.',
    ],
    badgeText: 'Mérito Académico Destacado',
  },
  {
    id: 'apoyo-unidad-familiar',
    title: 'Apoyo a Unidad Productiva Familiar',
    description:
      'Aplicación de las competencias técnicas en el negocio o microempresa de la familia del aprendiz, mejorando sus procesos productivos.',
    requirements: [
      'Existencia comprobada de la unidad económica o negocio familiar (RUT o registro mercantil).',
      'Plan de mejoramiento técnico concertado con el instructor de seguimiento.',
      'Evidencias documentadas del impacto generado por el aprendiz en el negocio.',
    ],
    benefits: [
      'Fortalecimiento del patrimonio familiar mediante la aplicación de buenas prácticas.',
      'Impacto socioeconómico directo en el hogar del aprendiz.',
      'Supervisión y retroalimentación personalizada de instructores SENA.',
    ],
    badgeText: 'Impacto Sociofamiliar Directo',
  },
];

export const WELLNESS_DIMENSIONS: WellnessDimension[] = [
  {
    id: 'salud',
    title: 'Salud Integral',
    description:
      'Promoción de estilos de vida saludables, primeros auxilios, prevención de enfermedades y salud mental.',
    programs: [
      'Jornadas de salud visual y oral en el centro',
      'Campañas de prevención del consumo de sustancias psicoactivas',
      'Póliza de accidentes estudiantiles vigente durante toda la formación',
    ],
    icon: 'Activity',
  },
  {
    id: 'socioemocional',
    title: 'Desarrollo Socioemocional',
    description:
      'Acompañamiento psicológico y psicopedagógico para fortalecer la resiliencia y el manejo de emociones.',
    programs: [
      'Atención psicológica individual confidencial',
      'Talleres de manejo de estrés y resolución pacífica de conflictos',
      'Orientación vocacional y adaptación a la vida formativa',
    ],
    icon: 'Smile',
  },
  {
    id: 'deporte',
    title: 'Deporte y Recreación',
    description:
      'Fomento de la actividad física, torneos intercentros y uso adecuado del tiempo libre.',
    programs: [
      'Juegos Nacionales de Aprendices SENA (fútbol, baloncesto, voleibol, atletismo)',
      'Gimnasio y pausas activas dirigidas en ambientes de formación',
      'Caminatas ecológicas y torneos relámpago',
    ],
    icon: 'Trophy',
  },
  {
    id: 'arte-cultura',
    title: 'Arte y Cultura',
    description:
      'Espacios de expresión artística, danza, música, teatro y reconocimiento de la diversidad colombiana.',
    programs: [
      'Encuentro Nacional de la Canción y Danza SENA',
      'Grupos representativos de teatro, percusión y orquestas institucionales',
      'Exposiciones de fotografía y artes plásticas en sedes',
    ],
    icon: 'Palette',
  },
  {
    id: 'liderazgo',
    title: 'Liderazgo y Representación',
    description:
      'Espacios democráticos de participación activa y formación ciudadana responsable.',
    programs: [
      'Elección democrática de Voceros de Ficha y Representante de Centro',
      'Escuela de Liderazgo para Aprendices',
      'Participación activa con voz y voto en Comités de Evaluación y Seguimiento',
    ],
    icon: 'Users',
  },
  {
    id: 'socioeconomico',
    title: 'Apoyos Socioeconómicos',
    description:
      'Estrategias para mitigar la deserción escolar en aprendices en situación de vulnerabilidad.',
    programs: [
      'Apoyo de Sostenimiento Regular (estipendio mensual)',
      'Apoyo de Sostenimiento FIC (para aprendices de construcción)',
      'Servicio de alimentación y transporte según la sede y disponibilidad',
    ],
    icon: 'Coins',
  },
];

export const DIGITAL_ECOSYSTEM = [
  {
    id: 'sofia-plus',
    title: 'SOFIA Plus (y Betowa)',
    subtitle: 'Sistema Oficial de Información Académica',
    description:
      'La plataforma neurálgica donde se gestiona toda tu vida formativa: matrícula, consulta de horario, inscripción a convocatorias, registro de novedades (traslados, aplazamientos) y descarga de certificados con firma digital.',
    features: [
      'Consulta de Juicios Evaluativos (Aprobado / Por Mejorar)',
      'Descarga de certificados y constancias de estudio en línea',
      'Gestión de novedades académicas y retiro voluntario formal',
    ],
    actionText: 'Gestionar Matrícula y Notas',
  },
  {
    id: 'zajuna',
    title: 'Zajuna (LMS Institucional)',
    subtitle: 'Ambiente Virtual de Aprendizaje (AVA)',
    description:
      'Plataforma oficial de aprendizaje virtual basada en Moodle donde interactúas con tus instructores, accedes al material didáctico, descargas las Guías de Aprendizaje, participas en foros técnicos y subes tus evidencias.',
    features: [
      'Entrega de evidencias con retroalimentación escrita del instructor',
      'Foros de dudas e inquietudes y foros sociales',
      'Sesiones en línea sincrónicas y cuestionarios evaluativos interactivos',
    ],
    actionText: 'Ingresar a las Aulas Virtuales',
  },
  {
    id: 'ape',
    title: 'Agencia Pública de Empleo (APE)',
    subtitle: 'Intermediación Laboral Gratuita e Incluyente',
    description:
      'El servicio público del SENA que conecta a los aprendices y egresados con miles de vacantes laborales formales en empresas de todo el país y el exterior.',
    features: [
      'Postulación gratuita a vacantes laborales verificadas',
      'Talleres de orientación ocupacional para armado de hoja de vida y entrevistas',
      'Convocatorias internacionales de trabajo (Alemania, Canadá, España)',
    ],
    actionText: 'Registrar Hoja de Vida',
  },
  {
    id: 'biblioteca',
    title: 'Sistema de Bibliotecas SENA (SBS)',
    subtitle: 'Recursos Científicos y Bases de Datos Especializadas',
    description:
      'Acceso gratuito e ilimitado a más de 30 bases de datos científicas internacionales (ScienceDirect, Scopus, e-Libro, Normas Técnicas ICONTEC completas) y repositorios institucionales.',
    features: [
      'Consulta libre de normas técnicas colombianas ICONTEC oficiales',
      'Millones de libros digitales, artículos científicos y revistas indexadas',
      'Repositorio institucional de proyectos de grado y patentes SENA',
    ],
    actionText: 'Explorar Catálogo Digital',
  },
  {
    id: 'sennova',
    title: 'SENNOVA y TecnoParques',
    subtitle: 'Investigación, Desarrollo Tecnológico e Innovación',
    description:
      'El ecosistema donde aprendices e instructores convierten proyectos formativos en prototipos reales, patentes, software y soluciones de base tecnológica para el sector productivo.',
    features: [
      'Laboratorios de nanotecnología, biotecnología, robótica e IA sin costo',
      'Semilleros de investigación formativa avalados por MinCiencias',
      'Asesoría técnica especializada para el desarrollo de prototipos',
    ],
    actionText: 'Vincularse a Semilleros',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'caso-1',
    title: 'Caso 1: Inasistencia por Emergencia Médica',
    situation:
      'Andrés, aprendiz de la ficha de Electricidad Industrial, tuvo un accidente en su motocicleta el lunes en la mañana y fue internado en el hospital durante 2 días. El instructor del taller reporta su falta como injustificada porque no se presentó a la práctica técnica obligatoria.',
    context:
      'Andrés no pudo avisar con anticipación debido al impacto médico. ¿Cuál es el procedimiento reglamentario correcto?',
    options: [
      {
        id: 'opt-1a',
        text: 'Andrés debe resignarse a la sanción porque las prácticas técnicas no admiten ninguna excepción bajo ninguna circunstancia.',
        isCorrect: false,
        feedback:
          'Incorrecto. El SENA ampara situaciones de fuerza mayor o caso fortuito debidamente comprobadas.',
        regulationRef: 'Reglamento Art. 8 y Art. 22',
      },
      {
        id: 'opt-1b',
        text: 'Andrés tiene hasta tres (3) días hábiles después de reintegrarse para presentar la incapacidad médica oficial ante la coordinación y su instructor.',
        isCorrect: true,
        feedback:
          '¡Correcto! El Reglamento del Aprendiz estipula que las inasistencias por fuerza mayor médica o calamidad doméstica deben justificarse dentro de los tres (3) días hábiles siguientes al hecho con el soporte correspondiente.',
        regulationRef: 'Acuerdo 009 de 2024, Art. 28',
      },
      {
        id: 'opt-1c',
        text: 'El vocero de ficha debe falsificar la firma de Andrés en la planilla de asistencia del taller para evitar el reporte.',
        isCorrect: false,
        feedback:
          'Incorrecto. La falsedad en firmas es una falta gravísima que acarrea sanción disciplinaria y cancelación de matrícula para ambos.',
        regulationRef: 'Acuerdo 009 de 2024, Art. 9',
      },
    ],
  },
  {
    id: 'caso-2',
    title: 'Caso 2: Plagio en la Entrega de Evidencia de Aprendizaje',
    situation:
      'Camila tenía poco tiempo para entregar el informe de investigación formativa en Zajuna. Decidió descargar un trabajo completo de un blog de internet, cambiar la portada con su nombre y subirlo a la plataforma sin citar ninguna fuente ni autor.',
    context:
      'El instructor somete el archivo a la herramienta antiplagio y detecta una coincidencia del 98% con un documento de otra universidad.',
    options: [
      {
        id: 'opt-2a',
        text: 'Constituye una falta grave contra la honestidad académica. El instructor no aprueba la evidencia, emite llamado de atención formal y puede remitir el caso al Comité de Evaluación y Seguimiento.',
        isCorrect: true,
        feedback:
          '¡Correcto! El plagio vulnera los principios de transparencia y honestidad académica del SENA. Conlleva la no aprobación del resultado y la apertura de proceso formativo o sancionatorio con plan de mejoramiento o condicionamiento.',
        regulationRef: 'Reglamento del Aprendiz, Art. 9 Numeral 1 y Art. 27',
      },
      {
        id: 'opt-2b',
        text: 'No hay ninguna consecuencia si Camila le pide disculpas por WhatsApp al autor original del blog.',
        isCorrect: false,
        feedback:
          'Incorrecto. La falta cometida dentro de la plataforma institucional SENA debe ser tratada bajo los cánones del reglamento interno.',
        regulationRef: 'Reglamento del Aprendiz, Art. 27',
      },
      {
        id: 'opt-2c',
        text: 'El instructor está obligado a aprobarla si Camila promete no volverlo a hacer en el siguiente trimestre formativo.',
        isCorrect: false,
        feedback:
          'Incorrecto. La evaluación debe basarse en el logro real y ético de la competencia laboral.',
        regulationRef: 'Reglamento del Aprendiz, Art. 12',
      },
    ],
  },
  {
    id: 'caso-3',
    title: 'Caso 3: Convivencia y Porte de Carné Institucional',
    situation:
      'Al ingresar a la sede del Centro de Formación, el guarda de seguridad le solicita a David mostrar su carné institucional. David responde de forma agresiva e irrespetuosa, empuja el torniquete de acceso e ingresa a la fuerza diciendo que "nadie le puede exigir nada".',
    context:
      'Los compañeros presencian la situación y el personal de vigilancia elabora un informe disciplinario.',
    options: [
      {
        id: 'opt-3a',
        text: 'David tiene la razón porque el carné es solo un adorno opcional y los guardas no tienen autoridad en el SENA.',
        isCorrect: false,
        feedback:
          'Incorrecto. El personal de apoyo logístico y de seguridad vela por la integridad física de toda la comunidad educativa.',
        regulationRef: 'Reglamento del Aprendiz, Art. 8',
      },
      {
        id: 'opt-3b',
        text: 'Es un incumplimiento directo del deber de portar visiblemente el carné y un acto de irrespeto que califica como falta disciplinaria grave por vulnerar las normas de seguridad y convivencia.',
        isCorrect: true,
        feedback:
          '¡Correcto! Portar el carné es obligatorio por seguridad de todos los aprendices. La agresión verbal o física contra cualquier miembro de la comunidad es causal de llamado al Comité de Evaluación y Seguimiento.',
        regulationRef: 'Reglamento del Aprendiz, Art. 8 Numeral 13 y Art. 9',
      },
      {
        id: 'opt-3c',
        text: 'La sanción es automática e irrevocable de expulsión inmediata sin derecho a ser escuchado en descargos.',
        isCorrect: false,
        feedback:
          'Incorrecto. Todo aprendiz tiene derecho constitucional al Debido Proceso y a presentar sus descargos ante el Comité.',
        regulationRef: 'Reglamento del Aprendiz, Art. 30 (Debido Proceso)',
      },
    ],
  },
  {
    id: 'caso-4',
    title: 'Caso 4: Elección de Alternativa de Etapa Productiva',
    situation:
      'Valeria está por culminar su etapa lectiva en Gestión Empresarial. Una empresa le ofrece un contrato de aprendizaje pagando el 75% del SMMLV más afiliación a EPS y ARL, pero su familia tiene una tienda de barrio y le propone ayudarles allí.',
    context:
      'Valeria quiere saber si ambas son válidas y qué debe tener en cuenta para su certificación.',
    options: [
      {
        id: 'opt-4a',
        text: 'Solo el contrato de aprendizaje es válido; ninguna otra modalidad es reconocida por el SENA.',
        isCorrect: false,
        feedback:
          'Incorrecto. El SENA contempla seis (6) alternativas formales de etapa productiva, incluyendo proyecto productivo, pasantía y apoyo a unidad familiar.',
        regulationRef: 'Reglamento del Aprendiz, Art. 14',
      },
      {
        id: 'opt-4b',
        text: 'Ambas opciones son viables según el Reglamento, pero en la unidad familiar debe existir registro formal (RUT) y concertar previamente un plan de mejora técnica con su instructor de seguimiento.',
        isCorrect: true,
        feedback:
          '¡Correcto! Ambas alternativas están avaladas por el SENA. El aprendiz puede elegir libremente la que mejor se adapte a su proyecto de vida, cumpliendo los requisitos formales de concertación y bitácoras.',
        regulationRef: 'Reglamento del Aprendiz, Art. 14',
      },
      {
        id: 'opt-4c',
        text: 'Puede firmar el contrato de aprendizaje y al mismo tiempo hacer la práctica familiar sin avisar a nadie.',
        isCorrect: false,
        feedback:
          'Incorrecto. Solo se puede cursar una alternativa a la vez y el contrato de aprendizaje exige exclusividad de tiempo pactado.',
        regulationRef: 'Ley 789 de 2002 y Reglamento SENA',
      },
    ],
  },
];

export const CERTIFICATION_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q-1',
    question: '¿En qué año y por quién fue fundado el Servicio Nacional de Aprendizaje (SENA)?',
    options: [
      'En 1980 por Luis Carlos Galán mediante consulta popular.',
      'En 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118.',
      'En 1930 por Alfonso López Pumarejo en la reforma agraria.',
      'En 2002 por Álvaro Uribe Vélez en la Ley de Emprendimiento.',
    ],
    correctIndex: 1,
    explanation:
      'El SENA fue fundado el 21 de junio de 1957 por Rodolfo Martínez Tono en una alianza histórica entre gremios empresariales, trabajadores y el gobierno colombiano.',
    moduleSource: 'Módulo 1: Identidad Institucional',
  },
  {
    id: 'q-2',
    question: '¿Qué sectores económicos de Colombia representan los tres elementos del Escudo del SENA?',
    options: [
      'Financiero, Minero y Aeroespacial.',
      'Industria y Construcción (Rueda dentada), Comercio y Servicios (Caduceo), y Agropecuario (Café y espiga).',
      'Educativo, Militar y Gubernamental.',
      'Salud, Deporte y Turismo regional.',
    ],
    correctIndex: 1,
    explanation:
      'El escudo sintetiza los pilares productivos del país: piñón (industria/construcción), caduceo (comercio/servicios) y rama de café/espiga (sector agropecuario).',
    moduleSource: 'Módulo 2: Símbolos SENA',
  },
  {
    id: 'q-3',
    question: '¿Qué representa de manera estilizada el Logo-símbolo institucional del SENA?',
    options: [
      'Un árbol de café sembrado en la cordillera andina.',
      'Un engranaje mecánico de un motor de combustión.',
      'Un ser humano erguido marchando con dinamismo hacia el futuro a través de la educación y el trabajo.',
      'Un puente de acero que une a las 33 regiones del país.',
    ],
    correctIndex: 2,
    explanation:
      'El logo-símbolo representa la proyección del individuo que progresa, camina erguido y transforma su realidad mediante el estudio y el trabajo productivo.',
    moduleSource: 'Módulo 2: Símbolos SENA',
  },
  {
    id: 'q-4',
    question: '¿Cuál es el valor institucional SENA que promueve reconocer la dignidad innata y las diferencias de todas las personas?',
    options: [
      'Respeto.',
      'Competitividad.',
      'Subordinación.',
      'Lucro económico.',
    ],
    correctIndex: 0,
    explanation:
      'El Respeto es el pilar primordial de los 7 valores del SENA, base de la convivencia pacífica y el trabajo en equipo en la formación profesional.',
    moduleSource: 'Módulo 1: Identidad y Valores',
  },
  {
    id: 'q-5',
    question: 'Según el Reglamento del Aprendiz (Acuerdo 009 de 2024), ¿cuál es el plazo máximo para justificar documentalmente una inasistencia por fuerza mayor?',
    options: [
      'Al finalizar el trimestre de formación.',
      'Treinta (30) días calendario posteriores.',
      'Hasta tres (3) días hábiles siguientes al hecho generador.',
      'No es necesario justificar si el vocero avisa de palabra.',
    ],
    correctIndex: 2,
    explanation:
      'El aprendiz debe presentar los soportes (incapacidad EPS o soporte de calamidad) dentro de los 3 días hábiles siguientes ante su instructor y coordinación.',
    moduleSource: 'Módulo 3: Reglamento del Aprendiz',
  },
  {
    id: 'q-6',
    question: '¿Cuál de las siguientes acciones está expresamente prohibida y calificada como falta gravísima en el Reglamento del Aprendiz?',
    options: [
      'Solicitar tutoría adicional a un instructor en horario de atención.',
      'Portar, consumir o comercializar bebidas alcohólicas o sustancias psicoactivas en el centro de formación.',
      'Crear grupos de estudio autónomos con compañeros de ficha.',
      'Participar como candidato a vocero de ficha.',
    ],
    correctIndex: 1,
    explanation:
      'El consumo, porte o distribución de sustancias psicoactivas o alcohol en el SENA es una falta gravísima que activa el comité disciplinario y puede causar expulsión.',
    moduleSource: 'Módulo 3: Reglamento del Aprendiz',
  },
  {
    id: 'q-7',
    question: 'En el Contrato de Aprendizaje, ¿a qué entidades de seguridad social debe afiliar la empresa al aprendiz durante su etapa productiva?',
    options: [
      'Únicamente al Fondo de Pensiones.',
      'A EPS (Salud) y ARL (Riesgos Laborales) cubiertas al 100% por la empresa.',
      'Solo al Seguro Obligatorio de Tránsito (SOAT).',
      'A ninguna entidad porque es un estudiante temporal.',
    ],
    correctIndex: 1,
    explanation:
      'La ley 789 de 2002 establece que la empresa patrocinadora debe cubrir al 100% la afiliación a EPS (salud) y ARL (riesgos laborales) durante toda la etapa productiva.',
    moduleSource: 'Módulo 4: Ruta Formativa y Productiva',
  },
  {
    id: 'q-8',
    question: '¿Qué es Zajuna en el ecosistema digital del SENA?',
    options: [
      'El restaurante institucional de comidas típicas.',
      'El LMS o Ambiente Virtual de Aprendizaje oficial donde se gestionan guías, evidencias y foros de formación.',
      'Un videojuego creado por instructores para recreación.',
      'La tienda virtual donde se compran los uniformes.',
    ],
    correctIndex: 1,
    explanation:
      'Zajuna es la plataforma LMS institucional del SENA en la que los aprendices acceden al material pedagógico, suben evidencias y se comunican con sus instructores.',
    moduleSource: 'Módulo 6: Ecosistema Digital',
  },
  {
    id: 'q-9',
    question: '¿Cuál es la función principal del Vocero de Ficha elegido democráticamente por sus compañeros?',
    options: [
      'Calificar los exámenes de los demás aprendices.',
      'Servir de canal de comunicación constructivo entre la ficha, los instructores y las directivas del centro de formación.',
      'Cobrar dinero para los materiales del taller.',
      'Decidir quién aprueba o desaprueba el programa.',
    ],
    correctIndex: 1,
    explanation:
      'El Vocero es el líder estudiantil que representa las inquietudes académicas y de bienestar de sus compañeros ante instructores, coordinadores y en comités de seguimiento.',
    moduleSource: 'Módulo 5: Bienestar al Aprendiz',
  },
  {
    id: 'q-10',
    question: '¿Qué oportunidad ofrece el Fondo Emprender a los aprendices y egresados del SENA?',
    options: [
      'Préstamos bancarios con altas tasas de interés comercial.',
      'Capital semilla no reembolsable y asesoría técnica para la creación de empresas innovadoras.',
      'Becas para estudiar exclusivamente en universidades privadas en el exterior.',
      'Descuentos en pasajes aéreos turísticos.',
    ],
    correctIndex: 1,
    explanation:
      'El Fondo Emprender es el fondo de capital semilla más grande de Colombia, que financia iniciativas empresariales viables de aprendices con recursos no reembolsables.',
    moduleSource: 'Módulo 4 y 6: Innovación y Emprendimiento',
  },
];
