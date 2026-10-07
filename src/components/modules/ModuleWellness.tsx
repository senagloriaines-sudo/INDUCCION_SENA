import React, { useState } from 'react';
import { WELLNESS_DIMENSIONS } from '../../data/senaContent';
import {
  PawDoodle,
  HandDrawnStar,
  SquiggleUnderline,
  FriendlyMascotAvatar,
} from '../DoodleIcons';
import {
  Heart,
  Activity,
  Smile,
  Trophy,
  Palette,
  Users,
  Coins,
  CheckCircle2,
  Sparkles,
  Megaphone,
  ShieldAlert,
} from 'lucide-react';
import { playSuccessChime } from '../../utils/audioSynth';

interface ModuleWellnessProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleWellness: React.FC<ModuleWellnessProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedDimensionId, setSelectedDimensionId] = useState<string>('salud');

  const getDimensionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      default:
        return <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const activeDimension =
    WELLNESS_DIMENSIONS.find((d) => d.id === selectedDimensionId) || WELLNESS_DIMENSIONS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Módulo 5</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Desarrollo Humano, Empatía y Calidad de Vida</span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Bienestar al Aprendiz SENA
            </h2>
            <SquiggleUnderline className="w-36 h-3 mt-1 opacity-90" color="#39A900" />
          </div>
          <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Tu formación no es solo técnica, es profundamente humana. Bienestar al Aprendiz te
            acompaña en salud, salud mental, deporte, arte, cultura, apoyos económicos y la
            convivencia armónica con la comunidad y el medio ambiente.
          </p>
        </div>
      </div>

      {/* Animal Welfare & Care Spotlight (Inspiración Animalista) */}
      <div className="bg-gradient-to-r from-amber-50/80 via-emerald-50/80 to-teal-50/80 dark:from-[#0a1b24] dark:via-[#0e222e] dark:to-[#091a23] border-2 border-[#39A900]/30 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FriendlyMascotAvatar className="w-14 h-14 shadow-sm" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Compromiso Institucional con la Vida
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Protección Animal y Cuidado de la Naturaleza</span>
                <PawDoodle className="w-4 h-4" color="#39A900" />
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          En los centros agropecuarios, biotecnológicos y sedes urbanas del SENA promovemos la
          <strong> tenencia responsable de mascotas</strong>, el respeto irrestricto por los seres sintientes y
          la preservación de la rica biodiversidad de Colombia. La empatía con los animales refleja el
          compromiso ético de cada aprendiz.
        </p>
      </div>

      {/* Representation Spotlight Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-[#0b1b24] dark:to-[#0f232f] border-2 border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-xs">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Liderazgo y Representación Estudiantil en el SENA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Democracia participativa: haz escuchar la voz de tu grupo
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-1">
          <div className="bg-white dark:bg-[#11212d] p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
              Vocero de Ficha
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Elegido democráticamente por sus compañeros durante el primer mes de formación. Es el
              puente directo con instructores y coordinadores, y participa con voz y voto en comités
              evaluativos para defender a sus pares.
            </p>
          </div>

          <div className="bg-white dark:bg-[#11212d] p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00324D] dark:bg-sky-400" />
              Representante de Centro
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Elegido por votación popular de todos los aprendices del Centro de Formación. Representa a
              los estudiantes ante el Consejo Directivo de Centro y en encuentros nacionales de líderes.
            </p>
          </div>
        </div>
      </div>

      {/* Wellness Dimensions Grid */}
      <div className="bg-white dark:bg-[#11212d] rounded-3xl p-6 sm:p-7 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Dimensiones Estratégicas del Plan de Bienestar</span>
            <HandDrawnStar className="w-5 h-5 text-amber-500" />
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Explora las líneas de acción diseñadas para tu permanencia y bienestar integral:
          </p>
        </div>

        {/* Dimension Selectors with Organic Hand-Drawn Pill Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
          {WELLNESS_DIMENSIONS.map((dim) => {
            const isSelected = selectedDimensionId === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimensionId(dim.id)}
                className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#1a384e] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-[#2a506d] font-bold scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {getDimensionIcon(dim.icon)}
                <span className="leading-tight">{dim.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Dimension Card */}
        <div className="p-6 bg-slate-50 dark:bg-[#0c1822] border-2 border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white dark:bg-[#11212d] rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              {getDimensionIcon(activeDimension.icon)}
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Dimensión de Bienestar
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeDimension.title}
              </h4>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeDimension.description}
          </p>

          <div className="bg-white dark:bg-[#11212d] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Programas y Beneficios Destacados
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
              {activeDimension.programs.map((prog, i) => (
                <li key={i}>{prog}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Module Completion */}
      <div className="bg-white dark:bg-[#11212d] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
            {isCompleted ? 'Módulo 5 Completado' : 'Finalizar Módulo de Bienestar'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conociste las dimensiones de salud, psicología, deporte, cultura y apoyos del SENA.
          </p>
        </div>
        <button
          onClick={() => {
            if (!isCompleted) {
              onComplete();
              playSuccessChime();
            }
          }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
            isCompleted
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 cursor-default'
              : 'bg-[#39A900] hover:bg-[#2e8800] text-white hover:scale-105 active:scale-95'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}
        </button>
      </div>
    </div>
  );
};
