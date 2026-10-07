import React, { useState } from 'react';
import { INSTITUTIONAL_VALUES, HISTORY_TIMELINE } from '../../data/senaContent';
import {
  HeartHandshake,
  Brain,
  Compass,
  Users,
  Scale,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Sparkles,
  Quote,
} from 'lucide-react';
import { playSuccessChime } from '../../utils/audioSynth';

interface ModuleIdentityProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleIdentity: React.FC<ModuleIdentityProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>(HISTORY_TIMELINE[0].year);
  const [understoodValues, setUnderstoodValues] = useState<string[]>([]);
  const [activeValueId, setActiveValueId] = useState<string>('respeto');

  const getIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const toggleUnderstood = (id: string) => {
    if (!understoodValues.includes(id)) {
      const updated = [...understoodValues, id];
      setUnderstoodValues(updated);
      playSuccessChime();
      if (updated.length === INSTITUTIONAL_VALUES.length && !isCompleted) {
        onComplete();
      }
    }
  };

  const currentTimelineItem =
    HISTORY_TIMELINE.find((h) => h.year === selectedYear) || HISTORY_TIMELINE[0];

  const activeValue =
    INSTITUTIONAL_VALUES.find((v) => v.id === activeValueId) || INSTITUTIONAL_VALUES[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner with Institutional Statement and Team Asset */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-slate-800 transition-colors duration-300">
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Módulo 1 · Fundamentos Institucionales
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              Identidad, Historia y Valores del SENA
            </h2>
            <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              El Servicio Nacional de Aprendizaje (SENA) es el corazón de la formación técnica y
              tecnológica gratuita de Colombia. Conoce nuestra razón de ser, nuestra trayectoria histórica
              y los 7 valores éticos que orientan tu formación profesional integral.
            </p>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl">
              <img
                src="/src/assets/images/sena_learning_team_1791392588349.jpg"
                alt="Aprendices SENA colaborando en ambiente de formación"
                referrerPolicy="no-referrer"
                className="w-full h-44 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Misión y Visión Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Misión */}
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#39A900]/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#39A900] dark:text-emerald-400 font-bold">
              <Quote className="w-5 h-5 text-[#39A900] dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">Misión Institucional</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Decreto Ley 118 de 1957 y Ley 119 de 1994</p>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            El SENA está encargado de cumplir la función que le corresponde al Estado de{' '}
            <strong className="text-slate-900 dark:text-white">invertir en el desarrollo social y técnico de los trabajadores colombianos</strong>
            , ofreciendo y ejecutando la <strong className="text-slate-900 dark:text-white">Formación Profesional Integral gratuita</strong>
            , para la incorporación y el desarrollo de las personas en actividades productivas que
            contribuyan al desarrollo social, económico y tecnológico del país.
          </p>
        </div>

        {/* Visión */}
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#39A900]/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center text-[#00324D] dark:text-sky-400 font-bold">
              <Compass className="w-5 h-5 text-sky-700 dark:text-sky-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">Visión de Futuro</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Proyección y Transformación Social</p>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            En el 2026, el SENA se consolidará como una entidad referente de formación profesional integral,
            pertinente, de calidad e incluyente, reconocida por su contribución decisiva a la{' '}
            <strong className="text-slate-900 dark:text-white">justicia social, ambiental y económica</strong> de Colombia,
            adaptándose con agilidad a las nuevas tecnologías y fortaleciendo las capacidades de las regiones y
            el campesinado colombiano.
          </p>
        </div>
      </div>

      {/* Historia Interactiva del SENA */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Calendar className="w-5 h-5 text-[#39A900] dark:text-emerald-400" />
              Trayectoria Histórica: Desde 1957 hasta Hoy
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Línea de Tiempo Interactiva</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Nacimos de una idea visionaria de <strong>Rodolfo Martínez Tono</strong> en una conversación con
            líderes sindicales y empresarios. Haz clic en las épocas para explorar su evolución:
          </p>
        </div>

        {/* Timeline Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
          {HISTORY_TIMELINE.map((item) => {
            const isSelected = selectedYear === item.year;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#1a384e] text-[#00324D] dark:text-white shadow-xs border border-slate-200/80 dark:border-[#2a506d] font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Active Timeline Card */}
        <div className="p-6 bg-slate-50/80 dark:bg-[#09121a] border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{currentTimelineItem.title}</h4>
            <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
              Hito Histórico
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{currentTimelineItem.description}</p>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Impacto para Colombia:</span>
            <span>{currentTimelineItem.impact}</span>
          </div>
        </div>
      </div>

      {/* Los 7 Valores Institucionales SENA */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Los 7 Valores Éticos del Aprendiz SENA
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Pilares de comportamiento que debes vivir día a día en tu ambiente de aprendizaje y en tu vida profesional.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Valores comprendidos: {understoodValues.length} de {INSTITUTIONAL_VALUES.length}
          </div>
        </div>

        {/* Horizontal Value Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
          {INSTITUTIONAL_VALUES.map((val) => {
            const isUnderstood = understoodValues.includes(val.id);
            const isSelected = activeValueId === val.id;
            return (
              <button
                key={val.id}
                onClick={() => setActiveValueId(val.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#00324D] dark:bg-[#1a384e] text-white border-[#00324D] dark:border-[#2a506d] shadow-xs'
                    : 'bg-white dark:bg-[#0f1d27] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {getIcon(val.iconName)}
                <span>{val.title}</span>
                {isUnderstood && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Value Interactive Card */}
        <div className="p-6 bg-slate-50 dark:bg-[#09121a] border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Valor Institucional
                </span>
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">{activeValue.title}</h4>
            </div>
            <button
              onClick={() => toggleUnderstood(activeValue.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                understoodValues.includes(activeValue.id)
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-[#39A900] hover:bg-[#2d8500] text-white shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {understoodValues.includes(activeValue.id)
                ? 'Comprendido y Aplicado'
                : 'Marcar como Comprendido'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white dark:bg-[#0c1a26] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                ¿Qué significa en el SENA?
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{activeValue.definition}</p>
            </div>
            <div className="bg-white dark:bg-[#0c1a26] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                Ejemplo real de aplicación en tu formación
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{activeValue.example}</p>
            </div>
          </div>
        </div>

        {/* Complete Module Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isCompleted
              ? 'Módulo completado satisfactoriamente.'
              : 'Revisa los valores institucionales para completar este módulo.'}
          </p>
          <button
            onClick={() => {
              if (!isCompleted) {
                onComplete();
                playSuccessChime();
              }
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 cursor-default'
                : 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Módulo Completado' : 'Finalizar y Avanzar'}
          </button>
        </div>
      </div>
    </div>
  );
};
