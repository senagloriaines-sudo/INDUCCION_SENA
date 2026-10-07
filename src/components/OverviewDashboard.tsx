import React, { useState, useMemo } from 'react';
import { ApprenticeProfile, ModuleTab } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import {
  PawDoodle,
  HandDrawnStar,
  SquiggleUnderline,
  HandDrawnSparkle,
  FriendlyMascotAvatar,
} from './DoodleIcons';
import {
  Compass,
  Shield,
  FileText,
  Briefcase,
  Heart,
  Cpu,
  HelpCircle,
  Award,
  CheckCircle2,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
  MapPin,
  Building,
  Smile,
  ShieldAlert,
  FileSpreadsheet,
  Search,
  Clock,
  PlayCircle,
  RotateCcw,
  Sparkle,
} from 'lucide-react';

interface CircularProgressProps {
  isCompleted: boolean;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const CircularModuleProgress: React.FC<CircularProgressProps> = ({
  isCompleted,
  size = 32,
  strokeWidth = 3,
  showLabel = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = isCompleted ? 100 : 0;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
      title={isCompleted ? 'Módulo Completado (100%)' : 'Módulo Pendiente (0%)'}
    >
      <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-700/80 fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-[#39A900] dark:stroke-emerald-400 fill-none transition-all duration-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          {isCompleted ? (
            <Check className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400 stroke-[3]" />
          ) : (
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">0%</span>
          )}
        </div>
      )}
    </div>
  );
};

interface OverviewDashboardProps {
  profile: ApprenticeProfile;
  completedModules: Record<string, boolean>;
  isExamPassed: boolean;
  isGoogleConnected?: boolean;
  isAdmin?: boolean;
  onSelectTab: (tab: ModuleTab) => void;
  onOpenProfile: () => void;
  onOpenGlossary: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  profile,
  completedModules,
  isExamPassed,
  isGoogleConnected = false,
  isAdmin = false,
  onSelectTab,
  onOpenProfile,
  onOpenGlossary,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const modulesList = [
    {
      id: 'identity' as ModuleTab,
      key: 'identity',
      number: 'Módulo 1',
      title: 'Identidad, Historia y Valores',
      duration: '10 min',
      description:
        'Conoce al fundador Rodolfo Martínez Tono, la misión, visión y los 7 valores éticos que distinguen al aprendiz SENA.',
      icon: Compass,
      color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50',
      badge: 'Bases Éticas',
    },
    {
      id: 'symbols' as ModuleTab,
      key: 'symbols',
      number: 'Módulo 2',
      title: 'Símbolos e Himno Institucional',
      duration: '8 min',
      description:
        'Explora los 3 sectores del Escudo, la Bandera blanca, el Logo-símbolo del hombre en marcha y el reproductor del himno.',
      icon: Shield,
      color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50',
      badge: 'Orgullo SENA',
    },
    {
      id: 'regulations' as ModuleTab,
      key: 'regulations',
      number: 'Módulo 3',
      title: 'Reglamento del Aprendiz',
      duration: '15 min',
      description:
        'Acuerdo 009 de 2024: Tus derechos irrenunciables, deberes de convivencia, faltas disciplinarias y garantías del debido proceso.',
      icon: FileText,
      color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50',
      badge: 'Convivencia',
    },
    {
      id: 'route' as ModuleTab,
      key: 'route',
      number: 'Módulo 4',
      title: 'Ruta Formativa y Etapa Productiva',
      duration: '12 min',
      description:
        'FPI, Resultados de Aprendizaje (RAP) y las 6 alternativas de práctica: Contrato de aprendizaje, proyecto, pasantía y más.',
      icon: Briefcase,
      color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50',
      badge: 'Tu Futuro',
    },
    {
      id: 'wellness' as ModuleTab,
      key: 'wellness',
      number: 'Módulo 5',
      title: 'Bienestar al Aprendiz',
      duration: '10 min',
      description:
        'Salud integral, atención psicosocial, torneos deportivos, arte, apoyos económicos de sostenimiento y vocerías estudiantiles.',
      icon: Heart,
      color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50',
      badge: 'Cuidado y Vida',
    },
    {
      id: 'ecosystem' as ModuleTab,
      key: 'ecosystem',
      number: 'Módulo 6',
      title: 'Ecosistema Digital y Servicios',
      duration: '12 min',
      description:
        'Aprende a navegar en SOFIA Plus / Betowa, aulas virtuales Zajuna, Agencia Pública de Empleo (APE), Bibliotecas y SENNOVA.',
      icon: Cpu,
      color: 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50',
      badge: 'Herramientas',
    },
    {
      id: 'simulator' as ModuleTab,
      key: 'simulator',
      number: 'Módulo 7',
      title: 'Simulador de Dilemas y Casos',
      duration: '15 min',
      description:
        'Resuelve casos reales de ausentismo justificado, plagio, carné y selección de etapa práctica con fundamentación normativa.',
      icon: HelpCircle,
      color: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50',
      badge: 'Casos Reales',
    },
  ];

  const completedCount = Object.values(completedModules).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / modulesList.length) * 100);

  // Time-aware greeting
  const greetingText = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  }, []);

  // Smart next recommended step
  const nextRecommended = useMemo(() => {
    const firstPending = modulesList.find((m) => !completedModules[m.key]);
    if (firstPending) {
      return {
        type: 'module' as const,
        module: firstPending,
        title: `Continuar con: ${firstPending.title}`,
        subtitle: `${firstPending.number} · Duración aproximada: ${firstPending.duration}`,
        buttonText: `Continuar ${firstPending.number}`,
        tab: firstPending.id,
      };
    }
    if (!isExamPassed) {
      return {
        type: 'exam' as const,
        module: null,
        title: '¡Todas las estaciones completadas! Presenta tu Evaluación Final',
        subtitle: '10 preguntas pedagógicas · Mínimo 80% para certificar',
        buttonText: 'Hacer Evaluación Final',
        tab: 'exam' as ModuleTab,
      };
    }
    return {
      type: 'certificate' as const,
      module: null,
      title: '¡Inducción Aprobada con Éxito!',
      subtitle: 'Tu constancia está lista para descargar y guardar en Google Drive',
      buttonText: 'Ver Certificado y Registro en Drive',
      tab: 'certificate' as ModuleTab,
    };
  }, [completedModules, isExamPassed, modulesList]);

  // Filtered modules
  const filteredModules = useMemo(() => {
    return modulesList.filter((m) => {
      const isDone = !!completedModules[m.key];
      if (filterStatus === 'pending' && isDone) return false;
      if (filterStatus === 'completed' && !isDone) return false;

      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase().trim();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchNumber = m.number.toLowerCase().includes(q);
        const matchBadge = m.badge.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchNumber || matchBadge;
      }

      return true;
    });
  }, [modulesList, completedModules, filterStatus, searchKeyword]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner with Campus Visual Asset */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-emerald-400/20 dark:border-emerald-600/20 transition-all duration-300">
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <span className="uppercase tracking-wider">Formación Profesional Integral</span>
              <span aria-hidden="true">·</span>
              <span>Vigencia 2026</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display">
                {greetingText}, {profile.fullName.split(' ')[0]}!
              </h1>
              <SquiggleUnderline className="w-36 h-3 mt-1.5 opacity-90" color="#39A900" />
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Inicias una etapa transformadora de tu proyecto de vida en la institución más querida
              por todos los colombianos. Conoce nuestros valores, la convivencia pacífica y el
              compromiso con el cuidado de la vida y el entorno productivo.
            </p>

            {/* Apprentice Program Unboxed Metadata Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300">
              <span>
                <strong className="text-white font-medium">Programa:</strong>{' '}
                <span className="text-emerald-300">{profile.trainingProgram}</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>
                <strong className="text-white font-medium">Ficha:</strong>{' '}
                <span className="font-mono text-emerald-300">{profile.ficheNumber}</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">{profile.trainingCenter}</span>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl group">
              <img
                src="/src/assets/images/sena_campus_hero_1791392575168.jpg"
                alt="Ambiente de Formación SENA Colombia"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                <span className="text-[11px] font-medium text-slate-200">
                  Ambiente Tecnológico e Innovación · SENA Colombia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friendly Apprentice Guide Card ("Seni" - Tu Guía de Formación) */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-slate-50/70 to-teal-50/90 dark:from-[#0c1a26] dark:via-[#0e2130] dark:to-[#07131d] rounded-3xl p-6 border-2 border-[#39A900]/30 dark:border-emerald-600/30 shadow-sm flex flex-col sm:flex-row items-center gap-5 transition-all">
        <FriendlyMascotAvatar className="w-16 h-16 sm:w-20 sm:h-20 shadow-md rotate-[-2deg]" />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-1.5">
              <span>¡Hola, soy Seni! Tu guía de inducción académica</span>
              <PawDoodle className="w-4 h-4 text-emerald-500" color="#39A900" />
            </h3>
            <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">·</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Consejero de Inducción SENA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Te acompañaré a través de las 7 estaciones formativas. En el SENA promovemos la excelencia técnica,
            los valores humanos integrales y el <strong className="text-slate-900 dark:text-white">liderazgo comprometido con el desarrollo sostenible y tecnológico de Colombia</strong>. ¡Mucho éxito en tu camino!
          </p>
        </div>
      </div>

      {/* Smart Next Step / Continuar donde lo dejaste Dynamic Card */}
      <div className="bg-gradient-to-r from-emerald-500 via-[#39A900] to-teal-600 rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100 flex items-center gap-1">
              <PlayCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Paso Recomendado</span>
            </span>
            <span className="text-emerald-100/50 text-[10px]">|</span>
            <span className="text-xs text-emerald-100 font-semibold">{nextRecommended.subtitle}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black leading-snug">
            {nextRecommended.title}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-50 opacity-90 leading-relaxed">
            {nextRecommended.type === 'module'
              ? 'Avanza en tu inducción completando las lecturas, audios y actividades interactivas diseñadas para ti.'
              : nextRecommended.type === 'exam'
              ? 'Pon a prueba tus conocimientos en valores, símbolos, deberes y derechos para obtener tu constancia institucional.'
              : 'Descarga tu certificado con código QR y sincroniza tu registro en la hoja de cálculo de Google Drive.'}
          </p>
        </div>

        <button
          onClick={() => onSelectTab(nextRecommended.tab)}
          className="w-full md:w-auto px-6 py-3.5 bg-white text-slate-900 hover:bg-emerald-50 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
        >
          <span>{nextRecommended.buttonText}</span>
          <ArrowRight className="w-4 h-4 text-[#39A900]" />
        </button>
      </div>

      {/* Google Drive & Sheets Official Induction Ledger Card */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-[#00324D]/5 via-emerald-500/10 to-[#39A900]/10 dark:from-[#0c1c28] dark:via-[#0e2433] dark:to-[#0a1e2b] rounded-3xl p-6 border-2 border-emerald-500/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#39A900] text-white flex items-center justify-center shrink-0 shadow-md">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Libro de Registro en Google Drive
                </h3>
                {isGoogleConnected ? (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Conectado a tu Drive
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    · Hoja en la nube
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                Almacena automáticamente en una hoja de Google Sheets en tu Drive a los aprendices
                que realizan y aprueban la inducción, con documento, ficha, puntaje y fecha.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('driveRecords')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#00324D] dark:bg-[#1a384e] hover:bg-[#002438] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Abrir Libro de Registro</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {/* Progress & Next Step Action Card with Elegant Design */}
      <div className="bg-white dark:bg-[#11212d] rounded-3xl p-6 sm:p-7 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300">
        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
              <PawDoodle className="w-5 h-5 text-[#39A900]" color="#39A900" />
              <span>Tu Ruta del Conocimiento SENA</span>
              <HandDrawnSparkle className="w-4 h-4" color="#FFD100" />
            </h3>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {completedCount} de {modulesList.length} completados · <strong className="text-[#39A900] dark:text-emerald-400 font-extrabold">{progressPercent}%</strong>
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/80 dark:border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-[#39A900] to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Mini circular progress indicators strip for each module */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
              <span>Estaciones:</span>
            </span>
            {modulesList.map((mod, i) => {
              const isModCompleted = !!completedModules[mod.key];
              return (
                <div
                  key={mod.key}
                  onClick={() => onSelectTab(mod.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all border hover:scale-105 active:scale-95 ${
                    isModCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                  title={`${mod.number}: ${mod.title} (${isModCompleted ? '100% Completado' : '0% Pendiente'})`}
                >
                  <CircularModuleProgress
                    isCompleted={isModCompleted}
                    size={18}
                    strokeWidth={2.5}
                    showLabel={false}
                  />
                  <span>M{i + 1}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span>✨</span>
            <span>
              Completa cada estación interactiva para desbloquear tu examen y obtener tu Constancia Oficial.
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab(isExamPassed ? 'certificate' : 'exam')}
            className={`px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
              isExamPassed
                ? 'bg-[#39A900] hover:bg-[#2e8800] text-white'
                : 'bg-[#00324D] dark:bg-[#1a384e] hover:bg-[#002438] dark:hover:bg-[#20445e] text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isExamPassed ? 'Ver Mi Certificado Oficial' : 'Hacer Evaluación Final'}</span>
          </button>
        </div>
      </div>

      {/* Modules Grid with Hand-Drawn Doodle & Dynamic Filtering */}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Estaciones de Inducción SENA</span>
              <HandDrawnStar className="w-5 h-5 text-amber-500" />
            </h2>
            <SquiggleUnderline className="w-32 h-2.5 opacity-80" color="#39A900" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Explora las 7 estaciones interactivas o filtra por estado de avance.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Inline Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Filtrar estaciones..."
                className="pl-9 pr-3 py-1.5 bg-white dark:bg-[#11212d] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-[#39A900] w-full sm:w-44 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0e1d28] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'all'
                    ? 'bg-white dark:bg-[#193245] text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todas (7)
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'pending'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Por hacer ({modulesList.length - completedCount})
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'completed'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Hechas ({completedCount})
              </button>
            </div>
          </div>
        </div>

        {filteredModules.length === 0 ? (
          <div className="bg-white dark:bg-[#11212d] rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No se encontraron estaciones para "{searchKeyword}"
            </p>
            <button
              onClick={() => {
                setSearchKeyword('');
                setFilterStatus('all');
              }}
              className="text-xs text-[#39A900] font-bold hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredModules.map((m) => {
              const Icon = m.icon;
              const isCompleted = !!completedModules[m.key];

              return (
                <div
                  key={m.id}
                  onClick={() => onSelectTab(m.id)}
                  className="bg-white dark:bg-[#11212d] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Decorative corner hand-drawn leaf seedling mark */}
                  <div className="absolute top-3 right-3 opacity-15 pointer-events-none group-hover:opacity-40 transition-opacity">
                    <PawDoodle className="w-6 h-6" color="#39A900" />
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl shadow-2xs ${m.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Unboxed Metadata & Circular progress */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{m.duration}</span>
                          </span>
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">{m.badge}</span>
                        </div>
                        <CircularModuleProgress
                          isCompleted={isCompleted}
                          size={28}
                          strokeWidth={2.8}
                          showLabel={true}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                          {m.number}
                        </span>
                        {isCompleted && (
                          <span className="text-[11px] font-bold text-[#39A900] dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completado
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#00324D] dark:group-hover:text-emerald-400 transition-colors leading-snug font-display">
                        {m.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#39A900] dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Repasar Estación</span>
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Iniciar Estación</span>
                        </>
                      )}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Institutional Toolkit */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Accesos Rápidos Institucionales
        </h3>
        <div className={`grid gap-3 ${isAdmin ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
          <button
            onClick={() => onSelectTab('regulations')}
            className="p-3.5 bg-white dark:bg-[#11212d] hover:bg-slate-50 dark:hover:bg-[#162938] border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all group cursor-pointer shadow-2xs hover:border-sky-400"
          >
            <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-900 dark:text-white">Reglamento 2024</div>
            <div className="text-[10px] text-slate-500 line-clamp-1">Acuerdo 009 de 2024</div>
          </button>

          <button
            onClick={() => onSelectTab('route')}
            className="p-3.5 bg-white dark:bg-[#11212d] hover:bg-slate-50 dark:hover:bg-[#162938] border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all group cursor-pointer shadow-2xs hover:border-amber-400"
          >
            <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-900 dark:text-white">Etapa Práctica</div>
            <div className="text-[10px] text-slate-500 line-clamp-1">6 alternativas de grado</div>
          </button>

          <button
            onClick={() => onSelectTab('simulator')}
            className="p-3.5 bg-white dark:bg-[#11212d] hover:bg-slate-50 dark:hover:bg-[#162938] border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all group cursor-pointer shadow-2xs hover:border-purple-400"
          >
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-900 dark:text-white">Simulador de Casos</div>
            <div className="text-[10px] text-slate-500 line-clamp-1">Dilemas con retroalimentación</div>
          </button>

          {isAdmin && (
            <button
              onClick={() => onSelectTab('driveRecords')}
              className="p-3.5 bg-white dark:bg-[#11212d] hover:bg-slate-50 dark:hover:bg-[#162938] border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all group cursor-pointer shadow-2xs hover:border-emerald-400"
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">Registro Drive</div>
              <div className="text-[10px] text-slate-500 line-clamp-1">Hoja de cálculo en la nube</div>
            </button>
          )}
        </div>
      </div>

      {/* Institutional Sostenibilidad, Innovación y Cuidado Ambiental Highlight */}
      <div className="bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-slate-50 dark:from-[#091822] dark:via-[#0c1f2c] dark:to-[#07151e] border-2 border-dashed border-emerald-300/80 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-7 text-slate-700 dark:text-slate-300 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 rounded-2xl text-emerald-800 dark:text-emerald-300 shrink-0">
              <PawDoodle className="w-7 h-7" color="#39A900" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                <span>Cultura de Sostenibilidad, Innovación y Cuidado Ambiental SENA</span>
                <HandDrawnStar className="w-4 h-4 text-amber-500" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                En nuestros centros de formación a nivel nacional, impulsamos la economía verde, la transición energética
                justa y el desarrollo agroecológico responsable, capacitando al talento colombiano para liderar con respeto por la biodiversidad y la conservación ecológica de nuestro país.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenGlossary}
            className="px-5 py-2.5 bg-white dark:bg-[#11212d] hover:bg-slate-50 dark:hover:bg-[#172b3a] border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
            <span>Consultar Glosario</span>
          </button>
        </div>
      </div>
    </div>
  );
};
