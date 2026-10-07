export interface ArticuloAcuerdo {
  articulo: number;
  nombre: string;
  contenido: string;
}

export interface ArticuloReglamento {
  articulo: number;
  nombre: string;
  contenido: string | Record<string, string> | string[];
}

export interface CapituloReglamento {
  capitulo: string;
  nombre: string;
  articulos: ArticuloReglamento[];
}

export interface Acuerdo009Data {
  titulo_oficial: string;
  diario_oficial: string;
  entidad_emisora: string;
  objeto: string;
  notas_de_vigencia: string[];
  considerando: string[];
  articulos_acuerdo: ArticuloAcuerdo[];
  firmantes: {
    presidente: string;
    secretaria: string;
  };
  reglamento_anexo: {
    titulo: string;
    capitulos: CapituloReglamento[];
  };
}

export const ACUERDO_009_2024: Acuerdo009Data = {
  titulo_oficial: 'ACUERDO 9 DE 2024 (noviembre 5)',
  diario_oficial: 'Diario Oficial No. 52.947 de 21 de noviembre de 2024',
  entidad_emisora: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
  objeto:
    'Por medio del cual se adopta el Reglamento del Aprendiz SENA y se derogan los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024',
  notas_de_vigencia: [
    "Modificado por el Acuerdo 2 de 10 de marzo de 2026, 'por medio del cual se modifica el artículo 48 del Acuerdo número 009 de 2024', publicado en el Diario Oficial No. 53.490 de 14 de mayo de 2026. Rige a partir de su publicación en el Diario Oficial.",
  ],
  considerando: [
    "Que la Constitución Política señala en el artículo 54 que es 'obligación del Estado y de los empleadores ofrecer formación y habilitación profesional y técnica a quienes lo requieran...'",
    "Que la Constitución Política establece en el artículo 67 que la 'educación es un derecho de la persona y un servicio público que tiene una función social...'",
    'Que la Ley 30 de 1992, en sus artículos 7 y 137, organiza la Educación Superior y regula la adscripción del SENA.',
    'Que la Ley 115 de 1994 (Ley General de Educación) dispone la concepción integral de la educación y el respeto a los derechos humanos.',
    'Que la Ley 119 de 1994 reestructura el SENA, define su misión de invertir en el desarrollo social y técnico, sus objetivos y funciones.',
    'Que la Ley 361 de 1997 promueve la integración social de personas en situación de discapacidad en los cursos del SENA.',
    'Que la Ley 2394 de 2024 garantiza la protección de derechos de estudiantes gestantes, en lactancia y licencias de paternidad.',
    'Que el Decreto 249 de 2004 faculta al Consejo Directivo Nacional para regular los sistemas de selección, orientación, promoción y expedir el reglamento.',
    'Que el Estatuto de la Formación Profesional (Acuerdo 8 de 1997) define la formación profesional integral y el ambiente educativo.',
    'Que el Reglamento requería actualización tras 12 años para alinearse con políticas de inclusión, enfoque territorial, anti-trámites y prevención de acoso sexual (Ley 2365 de 2024).',
  ],
  articulos_acuerdo: [
    {
      articulo: 1,
      nombre: 'ADOPCIÓN DEL REGLAMENTO',
      contenido:
        'Adoptar el Reglamento del Aprendiz SENA, mediante el documento anexo que forma parte integral de este Acuerdo, aplicable a todas las personas matriculadas en los programas de formación profesional del SENA.',
    },
    {
      articulo: 2,
      nombre: 'ÁMBITO DE APLICACIÓN Y TRANSICIÓN',
      contenido:
        'Aplicable a todos los aprendices matriculados a partir de su publicación. Los procesos en curso se regirán por el reglamento vigente al momento de su matrícula. En materia disciplinaria aplicará la norma más favorable.',
    },
    {
      articulo: 3,
      nombre: 'VIGENCIA Y DEROGATORIAS',
      contenido:
        'Rige a partir de su publicación en el Diario Oficial y deroga en su totalidad los Acuerdos 7 de 2012, 2 de 2014, 6 de 2023 y 2 de 2024.',
    },
    {
      articulo: 4,
      nombre: 'DIVULGACIÓN',
      contenido: 'Se ordena la publicación de este Acuerdo y del Reglamento en la página web del SENA.',
    },
  ],
  firmantes: {
    presidente: 'IVAN DANIEL JARAMILLO JASSIR - Viceministro de Empleo y Pensiones',
    secretaria: 'KATERINE GRIMALDOS ROBAYO',
  },
  reglamento_anexo: {
    titulo: 'REGLAMENTO DEL APRENDIZ DEL SERVICIO NACIONAL DE APRENDIZAJE - SENA',
    capitulos: [
      {
        capitulo: 'CAPÍTULO I',
        nombre: 'DEFINICIONES Y PRINCIPIOS',
        articulos: [
          {
            articulo: 1,
            nombre: 'Definiciones',
            contenido: {
              'Formación profesional integral':
                'Proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, tecnológicos, humanistas y habilidades socioemocionales.',
              'Comunidad educativa SENA':
                'Integrada por aprendices, instructores, personal administrativo, directivos, familias, egresados, empresarios y diversos sectores sociales.',
              Aspirante: 'Persona participante del proceso de ingreso para matricularse.',
              Aprendiz: 'Persona matriculada en los programas de formación profesional del SENA.',
              Grupo: 'Conjunto de aprendices matriculados en un centro, programa, jornada y fechas definidas.',
            },
          },
          {
            articulo: 2,
            nombre: 'Alcance del reglamento',
            contenido:
              'Aplica para el aspirante en el ingreso y para el aprendiz durante todo su proceso formativo y certificación, en todas las sedes, modalidades y entornos de formación.',
          },
          {
            articulo: 3,
            nombre: 'Principios orientadores',
            contenido: [
              'Autonomía',
              'Dignidad',
              'Inclusión',
              'Enfoque diferencial',
              'Enfoque territorial',
              'Participación',
              'Desarrollo sostenible',
              'Solidaridad',
            ],
          },
          {
            articulo: 4,
            nombre: 'Centro de Convivencia',
            contenido:
              'Atención complementaria que brinda alojamiento y alimentación para aprendices seleccionados bajo un manual de convivencia.',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO II',
        nombre: 'DERECHOS DEL APRENDIZ SENA',
        articulos: [
          {
            articulo: 5,
            nombre: 'Derechos del aprendiz SENA',
            contenido:
              'Contiene 24 derechos que incluyen: recibir inducción, formación de calidad, acreditación como aprendiz, acceso a infraestructura y protección personal, debido proceso, trato digno, participación democrática y certificación.',
          },
          {
            articulo: 6,
            nombre: 'Reconocimientos formativos',
            contenido:
              'Mención de honor, representación en eventos, prácticas formativas y desarrollo de monitorías.',
          },
          {
            articulo: 7,
            nombre: 'Representatividad de los aprendices',
            contenido:
              'Estrategia democrática materializada por 3 rutas: Elección de representantes por jornada/modalidad, voceros de grupos y voceros con enfoque diferencial (Indígena, NARP, LGTBIQ+, Campesino, Discapacidad, Mujer).',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO III',
        nombre: 'DEBERES Y PROHIBICIONES DEL APRENDIZ SENA',
        articulos: [
          {
            articulo: 8,
            nombre: 'Deberes del aprendiz SENA',
            contenido:
              'Incluye 24 deberes académicos, disciplinarios y administrativos como cumplir el reglamento, asistir con puntualidad, cuidar los bienes, usar elementos de protección y reportar situaciones de salud o discapacidad.',
          },
          {
            articulo: 9,
            nombre: 'Prohibiciones',
            contenido:
              'Contempla 14 prohibiciones, entre ellas: falsificar documentos, suplantación, plagio, uso indebido de plataformas, consumo o comercialización de alcohol y sustancias psicoactivas, ingreso de armas y actos de discriminación o acoso.',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO IV',
        nombre: 'INGRESO, PERMANENCIA Y CERTIFICACIÓN',
        articulos: [
          {
            articulo: 10,
            nombre: 'Reglas generales de ingreso',
            contenido:
              'Proceso por etapas: Registro, Inscripción, Selección y Matrícula. Edad mínima 14 años. Consentimiento informado para menores de edad.',
          },
          {
            articulo: 11,
            nombre: 'Etapa de registro',
            contenido:
              'Registro único y personal en el sistema de gestión académica con datos veraces.',
          },
          {
            articulo: 12,
            nombre: 'Etapa de inscripción',
            contenido: 'Selección del programa de formación preferido por el usuario registrado.',
          },
          {
            articulo: 13,
            nombre: 'Restricciones para la inscripción',
            contenido:
              'Incompatibilidad de dobles inscripciones simultáneas o citaciones/selecciones activas.',
          },
          {
            articulo: 14,
            nombre: 'Etapa de selección',
            contenido:
              'Verificación de aptitudes mediante pruebas Fase I (Online) y Fase II (Taller/Controlada).',
          },
          {
            articulo: 15,
            nombre: 'Etapa de matrícula',
            contenido: 'Formalización e inicio del compromiso como aprendiz SENA.',
          },
          {
            articulo: 16,
            nombre: 'Trámites académicos y administrativos',
            contenido: 'Gestión de novedades durante la formación.',
          },
          {
            articulo: 17,
            nombre: 'Trámite de novedades académicas y administrativas',
            contenido:
              'Procedimiento paso a paso ante el Comité de Evaluación y Seguimiento y Subdirección de Centro.',
          },
          {
            articulo: 18,
            nombre: 'Novedades durante la formación',
            contenido:
              'Regulación de Traslado, Aplazamiento (hasta 3 meses prorrogables por otros 3), Reintegro y Retiro Voluntario.',
          },
          {
            articulo: 19,
            nombre: 'Certificación',
            contenido:
              'Cumplimiento de requisitos académicos, Pruebas Saber y registro en Agencia Pública de Empleo.',
          },
          {
            articulo: 20,
            nombre: 'Expedición de documentos académicos',
            contenido: 'Expedición digital gratuita a través del portal institucional.',
          },
          {
            articulo: 21,
            nombre: 'Validación de documentos académicos SENA',
            contenido: 'Proceso para apostilla y legalización ante Cancillería.',
          },
          {
            articulo: 22,
            nombre: 'Trámite reingreso',
            contenido:
              'Solicitud por una única vez para aprendices desvinculados por retiro voluntario o cancelación de matrícula.',
          },
          {
            articulo: 23,
            nombre: 'Condiciones para el reingreso',
            contenido: 'Haber cursado sin titularse y cumplir con requisitos del programa vigente.',
          },
          {
            articulo: 24,
            nombre: 'Procedimiento para el reingreso',
            contenido:
              'Solicitud escrita, estudio técnico, respuesta en 15 días y expedición de acto administrativo.',
          },
          {
            articulo: 25,
            nombre: 'Seguimiento al trámite de reingreso',
            contenido: 'Reporte semestral de resultados por parte de los centros.',
          },
          {
            articulo: 26,
            nombre: 'El proceso de formación',
            contenido:
              'Comprende Etapa Lectiva y Etapa Productiva (Contrato de aprendizaje, vínculo laboral, proyecto productivo, etc.).',
          },
          {
            articulo: 27,
            nombre: 'Cumplimiento satisfactorio del proceso formativo',
            contenido: 'Presentación idónea y oportuna de evidencias de aprendizaje.',
          },
          {
            articulo: 28,
            nombre: 'Incumplimiento justificado',
            contenido:
              'Soportado por inasistencias programadas o no programadas (incapacidad, calamidad, citación judicial, etc.).',
          },
          {
            articulo: 29,
            nombre: 'Incumplimiento injustificado',
            contenido: 'Inasistencia no reportada o sin soportes válidos.',
          },
          {
            articulo: 30,
            nombre: 'Deserción',
            contenido:
              'Causales: 3 días continuos o 5 discontinuos de inasistencia presencial; 20 días de inactividad virtual; falta de entrega de etapa productiva o no tramitar reintegro a tiempo.',
          },
          {
            articulo: 31,
            nombre: 'Procedimiento en caso de deserción',
            contenido:
              'Reporte del instructor al Comité de Evaluación para recomendación de cancelación de matrícula.',
          },
          {
            articulo: 32,
            nombre: 'Evaluación del proceso de aprendizaje',
            contenido: 'Evaluación cualitativa y continua del desarrollo de competencias.',
          },
          {
            articulo: 33,
            nombre: 'Las evidencias de aprendizaje',
            contenido: 'De conocimiento, desempeño y producto.',
          },
          {
            articulo: 34,
            nombre: 'Principios del proceso de evaluación',
            contenido: 'Participación, Validez, Transparencia y Confiabilidad.',
          },
          {
            articulo: 35,
            nombre: 'Acompañamiento en el proceso evaluativo',
            contenido: 'Retroalimentación constante por parte de instructores y tutores.',
          },
          {
            articulo: 36,
            nombre: 'Juicios de la Evaluación',
            contenido: 'APROBADO o NO APROBADO.',
          },
          {
            articulo: 37,
            nombre: 'Seguimiento de los resultados',
            contenido: 'Aplicación de medidas formativas ante incumplimientos.',
          },
          {
            articulo: 38,
            nombre: 'Inconformidad con la evaluación y revisión',
            contenido:
              'Solicitud de revisión ante el instructor en 2 días y posibilidad de asignación de segundo evaluador.',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO V',
        nombre: 'RÉGIMEN DE FALTAS, MEDIDAS FORMATIVAS, DISCIPLINARIAS Y SANCIONATORIAS',
        articulos: [
          {
            articulo: 39,
            nombre: 'Principios orientadores del régimen',
            contenido:
              'Confidencialidad, Debido proceso, Culpabilidad e Inexistencia de doble sanción.',
          },
          {
            articulo: 40,
            nombre: 'Las medidas disciplinarias, formativas, académicas y/o sancionatorias',
            contenido: 'Aplicables según la calificación y tipificación de la falta.',
          },
          {
            articulo: 41,
            nombre: 'Faltas',
            contenido: 'Clasificadas en Faltas Académicas y Faltas Disciplinarias.',
          },
          {
            articulo: 42,
            nombre: 'Definición de la calificación de las faltas',
            contenido:
              'Calificadas como Leves, Graves o Gravísimas. Incluye causales de atenuación y agravación.',
          },
          {
            articulo: 43,
            nombre: 'Calificación de la falta',
            contenido: 'Criterios basados en intencionalidad, reiteración y daño.',
          },
          {
            articulo: 44,
            nombre: 'Criterios para calificar la falta',
            contenido: 'Daños causados, antecedentes, resarcimiento del perjuicio y participación.',
          },
          {
            articulo: 45,
            nombre: 'Medidas formativas',
            contenido: 'Acciones pedagógicas preventivas aplicables por faltas menores para encauzar el proceso de aprendizaje.',
          },
          {
            articulo: 46,
            nombre: 'Tipos de medidas formativas',
            contenido:
              'Medidas formativas académicas (llamados de atención escritos) y medidas formativas disciplinarias.',
          },
          {
            articulo: 47,
            nombre: 'Medidas sancionatorias',
            contenido:
              'Sanciones impuestas por faltas graves o gravísimas: 1. Llamado de atención formal por escrito con copia a la hoja de vida; 2. Condicionamiento de matrícula; 3. Cancelación de matrícula con inhabilidad.',
          },
          {
            articulo: 48,
            nombre: 'Cancelación de la matrícula e inhabilidad',
            contenido:
              'Acto administrativo motivado expedido por la Subdirección de Centro ante faltas gravísimas o reincidencia grave. Implica la pérdida definitiva de la condición de aprendiz y acarrea inhabilidad de seis (6) meses hasta dos (2) años para participar en procesos de ingreso a la entidad. (Modificado por el Acuerdo 2 de 10 de marzo de 2026).',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO VI',
        nombre: 'PROCEDIMIENTO PARA LA APLICACIÓN DE MEDIDAS SANCIONATORIAS',
        articulos: [
          {
            articulo: 49,
            nombre: 'Comité de Evaluación y Seguimiento',
            contenido:
              'Órgano consultor y asesor de la Subdirección de Centro encargado de analizar el desempeño académico y disciplinario de los aprendices, garantizando el debido proceso y recomendando las medidas procedentes.',
          },
          {
            articulo: 50,
            nombre: 'Queja o informe de falta',
            contenido:
              'Cualquier miembro de la comunidad educativa puede presentar queja formal por escrito o informe de presunta falta dentro de los diez (10) días hábiles siguientes al conocimiento del hecho.',
          },
          {
            articulo: 51,
            nombre: 'Comunicación y traslado al aprendiz',
            contenido:
              'Se notifica formalmente al aprendiz de los hechos y cargos imputados, otorgándole un término perentorio de cinco (5) días hábiles para presentar descargos, aportar pruebas o solicitar testimonios.',
          },
          {
            articulo: 52,
            nombre: 'Sesión del Comité y práctica de pruebas',
            contenido:
              'El Comité evalúa las pruebas allegadas, escucha los descargos del aprendiz y elabora acta motivada con recomendaciones técnicas y pedagógicas dirigidas al Subdirector de Centro.',
          },
          {
            articulo: 53,
            nombre: 'Acto sancionatorio y notificación',
            contenido:
              'La Subdirección de Centro adopta la decisión mediante resolución motivada, la cual debe ser notificada personalmente o por medios electrónicos autorizados al aprendiz.',
          },
          {
            articulo: 54,
            nombre: 'Recurso de Reposición',
            contenido:
              'Contra el acto administrativo que impone sanción procede únicamente el recurso de reposición ante el Subdirector de Centro, interpuesto dentro de los cinco (5) días hábiles siguientes a la notificación.',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO VII',
        nombre: 'DE LA REPRESENTACIÓN DE LOS APRENDICES',
        articulos: [
          {
            articulo: 55,
            nombre: 'Elección democrática de representantes',
            contenido:
              'Proceso de elección popular por voto secreto para elegir al Representante de Aprendices por jornada y modalidad para un período institucional de un (1) año.',
          },
          {
            articulo: 56,
            nombre: 'Requisitos para ser representante',
            contenido:
              'Estar matriculado en formación titulada, cursar etapa lectiva con excelente rendimiento, no haber sido sancionado y presentar propuesta de trabajo coherente.',
          },
          {
            articulo: 57,
            nombre: 'Funciones del representante',
            contenido:
              'Actuar como portavoz ante directivas, participar con voz y voto en comités de bienestar y seguimiento, y liderar iniciativas en pro de la comunidad estudiantil.',
          },
          {
            articulo: 58,
            nombre: 'Revocatoria del mandato',
            contenido:
              'Mecanismo de control democrático que procede por incumplimiento comprobado del plan de trabajo o faltas al reglamento, solicitado por al menos el 50% de la población votante.',
          },
        ],
      },
      {
        capitulo: 'CAPÍTULO VIII',
        nombre: 'DISPOSICIONES FINALES',
        articulos: [
          {
            articulo: 59,
            nombre: 'Tránsito de legislación y favorabilidad',
            contenido:
              'Los procedimientos en trámite antes de la vigencia de este acuerdo continuarán rigiéndose por las normas anteriores, salvo que las disposiciones del Acuerdo 009 de 2024 resulten más favorables al aprendiz.',
          },
          {
            articulo: 60,
            nombre: 'Vigencia y derogatorias expresas',
            contenido:
              'El presente Acuerdo rige a partir de su publicación en el Diario Oficial No. 52.947 y deroga expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.',
          },
        ],
      },
    ],
  },
};
