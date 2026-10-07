import React, { useState } from 'react';
import { PRODUCTIVE_ALTERNATIVES } from '../../data/senaContent';
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { playSuccessChime } from '../../utils/audioSynth';

interface ModuleTrainingRouteProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleTrainingRoute: React.FC<ModuleTrainingRouteProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string>(
    PRODUCTIVE_ALTERNATIVES[0].id
  );
  const [activeStep, setActiveStep] = useState<'lectiva' | 'productiva' | 'certificacion'>('lectiva');

  const activeAlt =
    PRODUCTIVE_ALTERNATIVES.find((a) => a.id === selectedAlternativeId) ||
    PRODUCTIVE_ALTERNATIVES[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Módulo 4</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Ciclo de Vida del Aprendiz</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Ruta Formativa: Etapa Lectiva y Etapa Productiva
          </h2>
          <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            La Formación Profesional Integral (FPI) se divide en dos grandes etapas: la adquisición
            teórico-técnica en ambientes pedagógicos (Etapa Lectiva) y la aplicación real en el
            sector productivo (Etapa Productiva).
          </p>
        </div>
      </div>

      {/* 3 Stages Horizontal Roadmap */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div
          onClick={() => setActiveStep('lectiva')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all ${
            activeStep === 'lectiva'
              ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-1 ring-[#39A900]'
              : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1a26] hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Fase 1</span>
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-display">Etapa Lectiva</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Aulas, talleres, laboratorios y plataformas virtuales. Desarrollo de guías y proyectos.
          </p>
        </div>

        {/* Step 2 */}
        <div
          onClick={() => setActiveStep('productiva')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all ${
            activeStep === 'productiva'
              ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-1 ring-[#39A900]'
              : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1a26] hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">Fase 2</span>
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-display">Etapa Productiva</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            6 alternativas para aplicar conocimientos en entornos laborales o de emprendimiento.
          </p>
        </div>

        {/* Step 3 */}
        <div
          onClick={() => setActiveStep('certificacion')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all ${
            activeStep === 'certificacion'
              ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-1 ring-[#39A900]'
              : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1a26] hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Fase 3</span>
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-display">Certificación Oficial</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            100% de Resultados Aprobados (RAP), paz y salvo, bitácoras y título técnico/tecnológico.
          </p>
        </div>
      </div>

      {/* Step Detail Content */}
      {activeStep === 'lectiva' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
            <Layers className="w-5 h-5 text-[#39A900]" />
            Características Clave de la Etapa Lectiva
          </h3>
          <div className="grid md:grid-cols-3 gap-4 pt-1">
            <div className="p-5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Resultados de Aprendizaje (RAP)</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Cada competencia laboral se divide en RAP específicos. La calificación oficial es
                únicamente <strong className="text-slate-900 dark:text-white">Aprobado (A)</strong> o <strong className="text-slate-900 dark:text-white">No Aprobado (D)</strong>.
              </p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Proyecto Formativo</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Aprender haciendo: articulación de saberes a través de un proyecto real que resuelve
                una necesidad productiva durante los trimestres.
              </p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Guías de Aprendizaje</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Documentos metodológicos que detallan las actividades autónomas, colaborativas y de
                evaluación que debes desarrollar en Zajuna o en el aula.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step Detail Content for Productive: The 6 Alternatives */}
      {activeStep === 'productiva' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Las 6 Alternativas Oficiales para Realizar tu Etapa Productiva
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              El SENA te permite elegir la opción que mejor se ajuste a tu perfil y proyecto de vida:
            </p>
          </div>

          {/* Alternatives Grid Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            {PRODUCTIVE_ALTERNATIVES.map((alt) => {
              const isSelected = selectedAlternativeId === alt.id;
              return (
                <button
                  key={alt.id}
                  onClick={() => setSelectedAlternativeId(alt.id)}
                  className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="block truncate">{alt.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Alternative Card */}
          <div className="p-6 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {activeAlt.badgeText}
                </span>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-display">{activeAlt.title}</h4>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{activeAlt.description}</p>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              {/* Requirements */}
              <div className="bg-white dark:bg-[#0f202d] p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Requisitos de la Modalidad
                </h5>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeAlt.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white dark:bg-[#0f202d] p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Beneficios para el Aprendiz
                </h5>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeAlt.benefits.map((ben, i) => (
                    <li key={i}>{ben}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Detail Content for Certification */}
      {activeStep === 'certificacion' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Requisitos de Paz y Salvo para Titulación
          </h3>
          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">100% de Resultados Aprobados (RAP)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ningún resultado de aprendizaje de etapa lectiva ni productiva puede figurar pendiente o por mejorar en SOFIA Plus.
                </p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">Bitácoras y Visitas de Seguimiento</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Entrega de las 12 bitácoras quincenales firmadas por el jefe inmediato y avaladas por el instructor de seguimiento SENA.
                </p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">Paz y Salvo Administrativo Integral</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Paz y salvo con biblioteca (sin libros pendientes), almacén de materiales, carné institucional y pruebas TyT o Saber Pro (para tecnólogos).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Completion */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            {isCompleted ? 'Módulo 4 Completado' : 'Finalizar Módulo de Ruta Formativa'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprendiste la etapa lectiva, las 6 alternativas de etapa productiva y el paz y salvo.
          </p>
        </div>
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
              : 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-sm'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}
        </button>
      </div>
    </div>
  );
};
