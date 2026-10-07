import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  FileSpreadsheet,
  Clock,
  User,
  GraduationCap,
  Building,
  MapPin,
  Trophy,
  Activity,
  Flame,
  Check,
  Zap,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { playSuccessChime, playIncorrectBeep } from '../utils/audioSynth';
import { REGIONAL_OPTIONS } from '../data/senaContent';
import { ApprenticeProfile } from '../types/induction';
import { saveApprenticeResult, fetchLeaderboard, ApprenticeExamResult } from '../services/firebaseService';

interface CertificationExamProps {
  onPassedExam: (score: number) => void;
  onNavigateToCertificate: () => void;
  onNavigateToDriveRecords?: () => void;
  isAlreadyPassed: boolean;
  bestScore?: number;
  currentProfile: ApprenticeProfile;
  onUpdateProfile: (updated: ApprenticeProfile) => void;
  isAdmin?: boolean;
}

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  section: 'Derechos' | 'Deberes' | 'Prohibiciones';
  regulationRef: string;
}

const REGULATION_QUESTIONS: ExamQuestion[] = [
  // --- DERECHOS (5 Preguntas) ---
  {
    id: 'der-q1',
    question: '¿Cuál es el derecho fundamental que te permite recibir una formación integral con enfoque humanista y tecnológico orientada por instructores competentes en ambientes dignos?',
    options: [
      'Derecho a recibir formación profesional integral de calidad.',
      'Derecho a ingresar tarde a las sesiones de formación.',
      'Derecho a exigir la aprobación de resultados de aprendizaje sin entregar evidencias.',
      'Derecho a usar los laboratorios fuera del horario académico sin acompañamiento.',
    ],
    correctIndex: 0,
    explanation: 'El Art. 5 del Acuerdo 009 de 2024 consagra el derecho del aprendiz a una formación integral de calidad y con pertinencia tecnológica.',
    section: 'Derechos',
    regulationRef: 'Acuerdo 009 de 2024, Art. 5, Numeral 1',
  },
  {
    id: 'der-q2',
    question: 'Si tienes alguna inconformidad con una calificación académica de una evidencia, ¿cuánto tiempo tienes para solicitar una revisión formal?',
    options: [
      'Al finalizar todo el trimestre lectivo.',
      'Dentro de los dos (2) días hábiles siguientes a la publicación o notificación de la nota.',
      'Cinco (5) días calendario posteriores.',
      'No existe derecho a reclamar juicios evaluativos.',
    ],
    correctIndex: 1,
    explanation: 'Tienes derecho a solicitar la revisión formal dentro de los dos (2) días hábiles siguientes ante el instructor o el coordinador académico.',
    section: 'Derechos',
    regulationRef: 'Acuerdo 009 de 2024, Art. 5, Numeral 17',
  },
  {
    id: 'der-q3',
    question: '¿Cuál de las siguientes es una opción válida de representación estudiantil democrática contemplada en el reglamento?',
    options: [
      'Delegados de disciplina elegidos por sorteo de identificación.',
      'Líderes elegidos de manera directa por la Dirección General.',
      'Representantes por jornada/modalidad, Voceros de grupo y Voceros con enfoque diferencial.',
      'Únicamente el representante de la jornada diurna presencial.',
    ],
    correctIndex: 2,
    explanation: 'El reglamento consagra tres rutas democráticas: Representantes de Centro, Voceros de ficha y Voceros con enfoque diferencial para asegurar la inclusión.',
    section: 'Derechos',
    regulationRef: 'Acuerdo 009 de 2024, Art. 7',
  },
  {
    id: 'der-q4',
    question: '¿Qué derecho protege especialmente a las aprendices gestantes, lactantes o con licencias de paternidad?',
    options: [
      'Derecho a no asistir nunca a las clases presenciales ni presentar exámenes.',
      'Protección especial, lactancia y acompañamiento pedagógico flexible para salvaguardar su permanencia formativa.',
      'Derecho a obtener un subsidio monetario automático por parte del Fondo Emprender.',
      'Derecho a aplazar la formación de manera indefinida por más de 5 años.',
    ],
    correctIndex: 1,
    explanation: 'La Ley 2394 de 2024 y el Acuerdo 009 garantizan la flexibilidad y protección académica para salvaguardar la permanencia escolar sin discriminación.',
    section: 'Derechos',
    regulationRef: 'Acuerdo 009 de 2024, Art. 5',
  },
  {
    id: 'der-q5',
    question: '¿Qué derecho tienes respecto al uso de laboratorios, talleres, biblioteca y conectividad del SENA?',
    options: [
      'Hacer uso libre y responsable de la infraestructura y recibir los elementos de protección personal (EPP) requeridos.',
      'Llevarse los equipos o computadores a casa sin autorización previa escrita.',
      'Hacer uso de ellos exclusivamente los fines de semana o días festivos.',
      'Alquilar los ambientes a personas ajenas a la institución.',
    ],
    correctIndex: 0,
    explanation: 'Tienes derecho al uso de ambientes, materiales de formación, biblioteca y conectividad, cumpliendo con las normas de seguridad y salud.',
    section: 'Derechos',
    regulationRef: 'Acuerdo 009 de 2024, Art. 5',
  },
  // --- DEBERES (5 Preguntas) ---
  {
    id: 'deb-q1',
    question: 'Si tienes una inasistencia justificada a actividades formativas por enfermedad o calamidad, ¿cuál es tu deber según el reglamento?',
    options: [
      'No reportar nada, la plataforma Zajuna registra la inasistencia automáticamente.',
      'Justificar documentalmente la inasistencia dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho.',
      'Enviar un mensaje por redes sociales al vocero al final del trimestre formativo.',
      'Solicitar una evaluación de suficiencia sin entregar los soportes.',
    ],
    correctIndex: 1,
    explanation: 'Las inasistencias deben justificarse documentalmente con incapacidad de EPS o soporte idóneo máximo a los 3 días hábiles siguientes.',
    section: 'Deberes',
    regulationRef: 'Acuerdo 009 de 2024, Art. 8 y Art. 28',
  },
  {
    id: 'deb-q2',
    question: '¿Cuál es tu deber respecto al carné de identificación institucional del SENA?',
    options: [
      'Es opcional y solo se debe portar en días de evaluación práctica.',
      'Portarlo de forma visible en el pecho en todas las instalaciones del SENA y actividades autorizadas fuera de él.',
      'Se puede prestar a amigos o familiares para que ingresen gratis a los talleres.',
      'Personalizar su diseño con calcomanías sin importar los logos de la institución.',
    ],
    correctIndex: 1,
    explanation: 'Portar el carné visiblemente es un deber obligatorio para resguardar la seguridad colectiva de los centros de formación.',
    section: 'Deberes',
    regulationRef: 'Acuerdo 009 de 2024, Art. 8',
  },
  {
    id: 'deb-q3',
    question: 'Respecto a las evidencias de aprendizaje, tareas y códigos entregados en las plataformas (como Zajuna), ¿qué deber tienes?',
    options: [
      'Entregar evidencias de autoría propia, garantizando la honestidad intelectual y originalidad y citando debidamente las fuentes.',
      'Descargar trabajos de internet cambiando la portada por tu nombre.',
      'Pedirle a un egresado de semestres anteriores sus evidencias resueltas para adaptarlas.',
      'Pagar servicios de inteligencia artificial externos para que rindan las pruebas en tu lugar.',
    ],
    correctIndex: 0,
    explanation: 'La honestidad intelectual es un deber sagrado en el SENA. El plagio o fraude constituye una falta disciplinaria sancionable.',
    section: 'Deberes',
    regulationRef: 'Acuerdo 009 de 2024, Art. 8 y Art. 33',
  },
  {
    id: 'deb-q4',
    question: 'En talleres técnicos de manufactura, laboratorios o ambientes agropecuarios, ¿cuál es tu deber frente a las normas de bioseguridad?',
    options: [
      'Su uso es opcional y depende del clima de la región.',
      'Portar obligatoriamente y de manera correcta los uniformes y elementos de protección personal (EPP) exigidos.',
      'Utilizarlos únicamente cuando ingrese el director o coordinador de centro.',
      'Comprar elementos recreativos no certificados por comodidad personal.',
    ],
    correctIndex: 1,
    explanation: 'Vestir el uniforme y utilizar los elementos de protección personal es obligatorio en talleres para salvaguardar la vida y salud.',
    section: 'Deberes',
    regulationRef: 'Acuerdo 009 de 2024, Art. 8',
  },
  {
    id: 'deb-q5',
    question: '¿Qué deber tienes sobre el mantenimiento técnico, el software y los equipos proporcionados por el SENA?',
    options: [
      'Cuidarlos, reportar fallas de inmediato y no alterar sistemas de software o hardware sin autorización previa.',
      'Desinstalar programas oficiales para instalar juegos o software personal.',
      'Cargar los equipos en tu bolso personal al terminar las actividades diarias sin avisar.',
      'No reportar fallas para evitar que piensen que fuiste tú quien los averió.',
    ],
    correctIndex: 0,
    explanation: 'Conservar los bienes públicos y reportar fallas oportunamente asegura la continuidad formativa de todo el grupo.',
    section: 'Deberes',
    regulationRef: 'Acuerdo 009 de 2024, Art. 3 y Art. 8',
  },
  // --- PROHIBICIONES (5 Preguntas) ---
  {
    id: 'pro-q1',
    question: '¿Cuál de las siguientes conductas se considera plagio y está explícitamente prohibida en el reglamento del SENA?',
    options: [
      'Consultar literatura académica en internet para fundamentar un foro.',
      'Copiar o presentar de forma parcial o total evidencias académicas ajenas como si fueran de propia autoría.',
      'Trabajar de manera coordinada con compañeros citando sus colaboraciones.',
      'Utilizar herramientas institucionales para revisar la originalidad del texto.',
    ],
    correctIndex: 1,
    explanation: 'El plagio e infracción a los derechos de autor es una prohibición expresa, catalogada como falta académica grave o gravísima.',
    section: 'Prohibiciones',
    regulationRef: 'Acuerdo 009 de 2024, Art. 9',
  },
  {
    id: 'pro-q2',
    question: '¿Qué establece el reglamento respecto al porte, consumo o comercialización de bebidas embriagantes o sustancias psicoactivas?',
    options: [
      'Se prohíbe únicamente para instructores de jornada presencial nocturna.',
      'Se permite el consumo moderado solo en áreas verdes durante los descansos académicos.',
      'Está estrictamente prohibido y presentarse bajo sus efectos o portarlas es catalogado como falta gravísima.',
      'Se penaliza solo si el aprendiz genera disturbios o daños físicos en el taller.',
    ],
    correctIndex: 2,
    explanation: 'El porte, distribución, consumo o estado de alteración psicoactiva es falta gravísima y causal inmediata de cancelación de matrícula.',
    section: 'Prohibiciones',
    regulationRef: 'Acuerdo 009 de 2024, Art. 9',
  },
  {
    id: 'pro-q3',
    question: '¿Qué directriz asume la institución frente al acoso sexual, ciberacoso escolar y violencia de género?',
    options: [
      'Cero tolerancia, aplicando canales inmediatos de protección de víctimas, remisión penal y expulsión académica disciplinaria rigurosa.',
      'Invitar a las partes a un acuerdo informal de conciliación privada obligatoria.',
      'Sancionar verbalmente al infractor con llamado de atención simple.',
      'Ignorar las denuncias que ocurran fuera del horario de clases.',
    ],
    correctIndex: 0,
    explanation: 'La Ley 2365 de 2024 y el Acuerdo 009 estipulan cero tolerancia al acoso sexual y de género, activando rutas de protección legal directa.',
    section: 'Prohibiciones',
    regulationRef: 'Acuerdo 009 de 2024, Art. 9',
  },
  {
    id: 'pro-q4',
    question: 'Respecto a tus claves de acceso personal de SOFIA Plus y LMS Zajuna, ¿qué prohibición estipula el reglamento?',
    options: [
      'Está prohibido cambiar tu contraseña personal de forma recurrente.',
      'Está prohibido compartir tus credenciales de acceso o suplantar la identidad de otro miembro en evaluaciones y registros.',
      'Está prohibido ingresar a la plataforma desde conexiones móviles.',
      'Está prohibido utilizar las plataformas de noche o fines de semana.',
    ],
    correctIndex: 1,
    explanation: 'La suplantación de identidad virtual o entrega de claves es una falta grave que quebranta los sistemas de confianza institucional.',
    section: 'Prohibiciones',
    regulationRef: 'Acuerdo 009 de 2024, Art. 9',
  },
  {
    id: 'pro-q5',
    question: '¿Está permitido comercializar mercancías, rifas o préstamos de dinero dentro de los ambientes del SENA?',
    options: [
      'Sí, con permiso verbal del vocero de la ficha.',
      'Está prohibido comerciar bienes o realizar rifas y préstamos informales dentro de los ambientes formativos sin previa autorización de la Dirección.',
      'Sí, porque incentiva el comercio y la cultura libre de negocios informales.',
      'Está permitido solo en las horas de almuerzo.',
    ],
    correctIndex: 1,
    explanation: 'La comercialización no aprobada o rifas distrae del fin académico e interrumpe la convivencia pacífica de los ambientes.',
    section: 'Prohibiciones',
    regulationRef: 'Acuerdo 009 de 2024, Art. 9',
  },
];

export const CertificationExam: React.FC<CertificationExamProps> = ({
  onPassedExam,
  onNavigateToCertificate,
  onNavigateToDriveRecords,
  isAlreadyPassed,
  bestScore = 0,
  currentProfile,
  onUpdateProfile,
  isAdmin = false,
}) => {
  // Phase management: 'register' | 'exam' | 'reinforcement' | 'leaderboard'
  const [phase, setPhase] = useState<'register' | 'exam' | 'reinforcement' | 'leaderboard'>(
    isAlreadyPassed ? 'leaderboard' : 'register'
  );

  // Registration Form State
  const [regForm, setRegForm] = useState<ApprenticeProfile>({ ...currentProfile });

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);

  // Streak tracker
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Time metrics
  const [timeSeconds, setTimeSeconds] = useState(0);
  const timerRef = useRef<any>(null);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<ApprenticeExamResult[]>([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  // Score Calculations
  const [calculatedGamifiedScore, setCalculatedGamifiedScore] = useState(0);
  const [finalScorePercent, setFinalScorePercent] = useState(0);
  const [isPassed, setIsPassed] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Start the timer when the exam phase starts
  useEffect(() => {
    if (phase === 'exam') {
      setTimeSeconds(0);
      timerRef.current = setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [phase]);

  // Load Leaderboard when needed
  const loadLeaderboardData = async () => {
    setIsLeaderboardLoading(true);
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    if (phase === 'leaderboard') {
      loadLeaderboardData();
    }
  }, [phase]);

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(regForm);
    setCurrentQIndex(0);
    setCorrectCount(0);
    setMistakesCount(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setSelectedOpt(null);
    setHasCheckedAnswer(false);
    setPhase('exam');
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null) return;
    const currentQuestion = REGULATION_QUESTIONS[currentQIndex];
    const isCorrect = selectedOpt === currentQuestion.correctIndex;

    setHasCheckedAnswer(true);

    if (isCorrect) {
      if (!isSoundMuted) playSuccessChime();
      setCorrectCount((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      if (!isSoundMuted) playIncorrectBeep();
      setMistakesCount((prev) => prev + 1);
      setCurrentStreak(0);
    }
    setPhase('reinforcement');
  };

  const handleNextQuestion = () => {
    if (currentQIndex < REGULATION_QUESTIONS.length - 1) {
      setSelectedOpt(null);
      setHasCheckedAnswer(false);
      setCurrentQIndex((prev) => prev + 1);
      setPhase('exam');
    } else {
      finishExam();
    }
  };

  const finishExam = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const calculatedPercent = Math.round((correctCount / REGULATION_QUESTIONS.length) * 100);
    const approved = calculatedPercent >= 80;

    // Gamified score algorithm
    // Base: +100 per correct answer (max 1500)
    const basePoints = correctCount * 100;
    // Speed bonus: max +300 points, reduces with time (e.g. max 5 minutes = 300s limit)
    const speedBonus = Math.max(0, 450 - timeSeconds) * 2;
    // Mistakes bonus: 0 mistakes = +500, 1 = +300, 2 = +150
    let streakBonus = 0;
    if (mistakesCount === 0) streakBonus = 500;
    else if (mistakesCount === 1) streakBonus = 300;
    else if (mistakesCount === 2) streakBonus = 150;

    const totalScore = basePoints + Math.round(speedBonus) + streakBonus;

    setCalculatedGamifiedScore(totalScore);
    setFinalScorePercent(calculatedPercent);
    setIsPassed(approved);

    const verificationCode = `SENA-IND-2026-${regForm.ficheNumber}-${regForm.documentNumber.slice(-4)}`;

    const examResult: ApprenticeExamResult = {
      fullName: regForm.fullName,
      documentType: regForm.documentType,
      documentNumber: regForm.documentNumber,
      trainingProgram: regForm.trainingProgram,
      ficheNumber: regForm.ficheNumber,
      regional: regForm.regional,
      trainingCenter: regForm.trainingCenter,
      correctAnswers: correctCount,
      totalQuestions: REGULATION_QUESTIONS.length,
      scorePercent: calculatedPercent,
      timeElapsed: timeSeconds,
      mistakes: mistakesCount,
      gamifiedScore: totalScore,
      isPassed: approved,
      registeredAt: new Date().toLocaleString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      verificationCode,
    };

    // Save automatically to Firestore (leaderboard and database)
    await saveApprenticeResult(examResult);

    if (approved) {
      onPassedExam(calculatedPercent);
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#39A900', '#00324D', '#FFD100', '#FFFFFF'],
        });
      } catch {
        // Safe fallback
      }
    }

    setPhase('leaderboard');
  };

  const handleRestart = () => {
    setPhase('register');
  };

  // Helper to format ticking clock
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Onboarding Phase
  if (phase === 'register') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Evaluación Regulada y Gamificada</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Acuerdo 009 de 2024</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              Desafío Académico: Reglamento del Aprendiz
            </h2>
            <p className="text-slate-200 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Resuelve exactamente 5 preguntas de cada sección clave del reglamento: <strong className="text-emerald-400">Derechos, Deberes y Prohibiciones</strong> (15 en total). Responde correctamente, evita errores y hazlo rápido para ganar el máximo de puntos y conquistar el podio.
            </p>
          </div>
        </div>

        {/* Onboarding Form Container */}
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/85 dark:border-slate-800/80 shadow-md space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              <span>Inscripción del Aprendiz para la Evaluación</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ingresa tus datos exactos para certificar tus calificaciones y almacenar tus resultados en la base de datos nacional.
            </p>
          </div>

          <form onSubmit={handleStartExam} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Nombre Completo del Aprendiz
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={regForm.fullName}
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white dark:bg-[#0f202d] text-slate-900 dark:text-white font-medium text-sm"
                  placeholder="Ej. Andrés Felipe Cardona"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Tipo Doc.
                </label>
                <select
                  value={regForm.documentType}
                  onChange={(e) => setRegForm({ ...regForm, documentType: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium text-sm cursor-pointer"
                >
                  <option value="C.C.">Cédula de Ciudadanía (C.C.)</option>
                  <option value="T.I.">Tarjeta de Identidad (T.I.)</option>
                  <option value="C.E.">Cédula de Extranjería (C.E.)</option>
                  <option value="P.P.T.">Permiso por Protección Temporal (P.P.T.)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  required
                  value={regForm.documentNumber}
                  onChange={(e) => setRegForm({ ...regForm, documentNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-mono tabular-nums text-sm"
                  placeholder="1004567890"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Programa de Formación
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regForm.trainingProgram}
                    onChange={(e) => setRegForm({ ...regForm, trainingProgram: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium text-sm"
                    placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Número de Ficha
                </label>
                <input
                  type="text"
                  required
                  value={regForm.ficheNumber}
                  onChange={(e) => setRegForm({ ...regForm, ficheNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-mono tabular-nums text-sm"
                  placeholder="2874910"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Regional SENA
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={regForm.regional}
                    onChange={(e) => setRegForm({ ...regForm, regional: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium text-sm cursor-pointer"
                  >
                    {REGIONAL_OPTIONS.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Centro de Formación
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regForm.trainingCenter}
                    onChange={(e) => setRegForm({ ...regForm, trainingCenter: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium text-sm"
                    placeholder="Ej. Centro de Servicios Financieros"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-[#39A900] hover:bg-[#2e8800] text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm font-display tracking-wide uppercase"
              >
                <span>¡Comenzar Desafío Gamificado!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const currentQuestion = REGULATION_QUESTIONS[currentQIndex];
  const sectionQuestions = REGULATION_QUESTIONS.filter(q => q.section === currentQuestion.section);
  const currentSectionIndexInGroup = sectionQuestions.findIndex(q => q.id === currentQuestion.id);

  // Active Quiz View
  if (phase === 'exam' || phase === 'reinforcement') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Game Stats Bar */}
        <div className="bg-slate-900 text-slate-100 px-5 py-3.5 rounded-2xl flex items-center justify-between border border-slate-800 shadow-lg text-xs font-bold tracking-wide">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Sección:</span>
            <span className={`text-emerald-400 flex items-center gap-1.5 font-display`}>
              <Activity className="w-4 h-4" />
              {currentQuestion.section}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Pregunta:</span>
            <span className="font-mono text-emerald-400">{currentQIndex + 1} / {REGULATION_QUESTIONS.length}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
            {currentStreak > 0 && (
              <div className="hidden sm:flex items-center gap-1 text-amber-400 animate-pulse">
                <Flame className="w-4 h-4 text-amber-500 fill-current" />
                <span>Racha: {currentStreak}</span>
              </div>
            )}
            <button
              onClick={() => setIsSoundMuted((prev) => !prev)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center bg-slate-800 border border-slate-700 hover:bg-slate-700"
              title={isSoundMuted ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-[#0c1a26] border border-emerald-500/20 px-3 py-1 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>{formatTime(timeSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Question Panel */}
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/85 dark:border-slate-800/80 shadow-md space-y-6">
          {/* Sub-progress in current section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <span className="uppercase tracking-wider font-display">Progreso de la sección ({currentQuestion.section})</span>
              <span>{currentSectionIndexInGroup + 1} de 5</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#39A900] transition-all duration-300"
                style={{ width: `${((currentSectionIndexInGroup + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="pt-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug font-display">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isChecked = phase === 'reinforcement';
              const isCorrect = idx === currentQuestion.correctIndex;
              const isWrongSelection = isSelected && !isCorrect;

              let optionStyle = 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f202d] hover:border-slate-300 dark:hover:border-slate-700';
              if (isChecked) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500 text-slate-900 dark:text-white';
                } else if (isWrongSelection) {
                  optionStyle = 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-500 text-slate-900 dark:text-white';
                } else {
                  optionStyle = 'border-slate-100 dark:border-slate-800 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-[#39A900]';
              }

              return (
                <div
                  key={idx}
                  onClick={() => !isChecked && setSelectedOpt(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        isSelected
                          ? isChecked
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-rose-500 bg-rose-500 text-white'
                            : 'border-[#39A900] bg-[#39A900] text-white'
                          : isChecked && isCorrect
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isChecked ? (
                        isCorrect ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : isWrongSelection ? (
                          <span className="text-[10px] font-bold">X</span>
                        ) : null
                      ) : (
                        isSelected && <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {opt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Reinforcement card shown on submission */}
          {phase === 'reinforcement' && (
            <div
              className={`p-5 rounded-2xl border animate-in slide-in-from-bottom-2 duration-300 ${
                selectedOpt === currentQuestion.correctIndex
                  ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-950/30 dark:bg-[#0c2419]/30'
                  : 'border-rose-200 bg-rose-50/40 dark:border-rose-950/30 dark:bg-[#2c1318]/30'
              }`}
            >
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  {selectedOpt === currentQuestion.correctIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {selectedOpt === currentQuestion.correctIndex ? '¡Excelente Refuerzo Positivo!' : 'Refuerzo Pedagógico - Identifica en qué fallaste:'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  <div className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider pt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Referencia: {currentQuestion.regulationRef}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-end pt-5 border-t border-slate-100 dark:border-slate-800">
            {phase === 'exam' ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === null}
                className="px-6 py-2.5 bg-[#39A900] hover:bg-[#2e8800] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>Validar Respuesta</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-[#00324D] dark:bg-emerald-600 hover:bg-[#002438] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>
                  {currentQIndex === REGULATION_QUESTIONS.length - 1
                    ? 'Finalizar y Calificar'
                    : 'Continuar a la Siguiente'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Final Results & Unified Leaderboard / Ranking Gamificado View
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Quiz Results Scoreboard */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 text-center">
        <div
          className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-md ${
            isPassed
              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
          }`}
        >
          {isPassed ? <Award className="w-10 h-10 animate-bounce" /> : <XCircle className="w-10 h-10" />}
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Resultado de la Evaluación de Reglamento
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 font-display">
            {isPassed ? '¡Desafío Superado con Éxito!' : 'Evaluación No Aprobada'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
            {isPassed
              ? `Has respondido correctamente ${correctCount} de ${REGULATION_QUESTIONS.length} preguntas de derechos, deberes y prohibiciones.`
              : `Has respondido correctamente ${correctCount} de ${REGULATION_QUESTIONS.length} preguntas. Requieres mínimo un 80% (12 correctas) para aprobar.`}
          </p>
        </div>

        {/* Metrics Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-xl mx-auto pt-2">
          <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-100 dark:border-slate-800 rounded-2xl">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Aciertos (Calificación)</span>
            <span className="block text-xl font-black text-slate-800 dark:text-white font-mono tabular-nums">{finalScorePercent}%</span>
            <span className={`block text-[10px] font-bold mt-1 ${isPassed ? 'text-[#39A900]' : 'text-rose-500'}`}>
              {isPassed ? 'APROBADO' : 'POR MEJORAR'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-100 dark:border-slate-800 rounded-2xl">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tiempo Empleado</span>
            <span className="block text-xl font-black text-slate-800 dark:text-white font-mono tabular-nums">{formatTime(timeSeconds)}</span>
            <span className="block text-[10px] text-slate-400 font-medium mt-1">Minutos y Segundos</span>
          </div>

          <div className="p-4 bg-[#39A900]/10 border border-[#39A900]/20 rounded-2xl">
            <span className="block text-[10px] font-extrabold text-[#39A900] dark:text-emerald-400 uppercase tracking-wider">Puntaje Gamificado</span>
            <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-amber-500 fill-current shrink-0 animate-pulse" />
              {calculatedGamifiedScore}
            </span>
            <span className="block text-[10px] text-emerald-700 dark:text-emerald-300 font-bold mt-1">Para el Ranking</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          {isPassed ? (
            <>
              <button
                onClick={onNavigateToCertificate}
                className="w-full sm:w-auto px-6 py-3 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase font-display tracking-wider"
              >
                <FileCheck2 className="w-4.5 h-4.5" />
                <span>Ver y Descargar Certificado</span>
              </button>
              {onNavigateToDriveRecords && isAdmin && (
                <button
                  onClick={onNavigateToDriveRecords}
                  className="w-full sm:w-auto px-6 py-3 bg-[#00324D] dark:bg-[#152e42] hover:bg-[#002438] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase font-display tracking-wider"
                >
                  <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-400" />
                  <span>Registrar en Google Drive</span>
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 bg-[#00324D] hover:bg-[#002438] text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase font-display tracking-wider"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Intentar de Nuevo el Desafío</span>
            </button>
          )}
        </div>
      </div>

      {/* Unified Leaderboard / Ranking Gamificado Section */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/85 dark:border-slate-800/80 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Trophy className="w-5.5 h-5.5 text-amber-500 fill-current shrink-0 animate-bounce" />
              <span>Podio de Honor Gamificado SENA</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranking de aprendices con mayores puntajes calculados por responder rápido, bien y sin equivocaciones.
            </p>
          </div>
          
          <button
            onClick={loadLeaderboardData}
            disabled={isLeaderboardLoading}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#39A900] dark:hover:text-emerald-400 flex items-center gap-1 font-bold cursor-pointer disabled:opacity-45"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isLeaderboardLoading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>

        {isLeaderboardLoading ? (
          <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wide animate-pulse">
            Obteniendo posiciones de la base de datos central...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-sm mx-auto">
            Aún no hay registros en la base de datos. ¡Sé el primero en liderar la tabla de honor!
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#07131d] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60 font-black tracking-wide uppercase">
                    <th className="py-3 px-4 text-center w-12">Puesto</th>
                    <th className="py-3 px-4">Aprendiz</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Programa y Ficha</th>
                    <th className="py-3 px-4 text-center">Aciertos</th>
                    <th className="py-3 px-4 text-center">Tiempo</th>
                    <th className="py-3 px-4 text-right">Puntaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                  {leaderboard.map((item, idx) => {
                    const isTopThree = idx < 3;
                    const isCurrentApprentice =
                      item.documentNumber.trim() === regForm.documentNumber.trim() &&
                      item.ficheNumber.trim() === regForm.ficheNumber.trim();

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-50/50 dark:hover:bg-[#0f2130]/30 transition-colors ${
                          isCurrentApprentice ? 'bg-emerald-500/10 hover:bg-emerald-500/15 font-bold' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-black">
                          {idx === 0 ? (
                            <span className="text-base">🥇</span>
                          ) : idx === 1 ? (
                            <span className="text-base">🥈</span>
                          ) : idx === 2 ? (
                            <span className="text-base">🥉</span>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400 font-mono tabular-nums">{idx + 1}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="block text-slate-900 dark:text-white font-extrabold tracking-tight truncate max-w-[150px] sm:max-w-[200px]">
                            {item.fullName}
                          </span>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                            {item.documentType} {item.documentNumber.slice(0, -4) + '****'}
                          </span>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className="block text-slate-900 dark:text-white truncate max-w-[180px]">
                            {item.trainingProgram}
                          </span>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            Ficha: {item.ficheNumber}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold tabular-nums">
                          {item.correctAnswers} / {item.totalQuestions}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-600 dark:text-slate-400 tabular-nums">
                          {formatTime(item.timeElapsed)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 font-mono font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            {item.gamifiedScore}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
