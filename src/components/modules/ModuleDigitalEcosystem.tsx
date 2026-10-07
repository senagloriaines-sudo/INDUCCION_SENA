import React, { useState } from 'react';
import { DIGITAL_ECOSYSTEM } from '../../data/senaContent';
import {
  Globe,
  Monitor,
  Briefcase,
  BookMarked,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { playSuccessChime } from '../../utils/audioSynth';

interface ModuleDigitalEcosystemProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleDigitalEcosystem: React.FC<ModuleDigitalEcosystemProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('sofia-plus');

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'sofia-plus':
        return <Globe className="w-5 h-5 text-emerald-600" />;
      case 'zajuna':
        return <Monitor className="w-5 h-5 text-sky-600" />;
      case 'ape':
        return <Briefcase className="w-5 h-5 text-indigo-600" />;
      case 'biblioteca':
        return <BookMarked className="w-5 h-5 text-amber-600" />;
      case 'sennova':
        return <Cpu className="w-5 h-5 text-rose-600" />;
      default:
        return <Globe className="w-5 h-5 text-emerald-600" />;
    }
  };

  const activePlatform =
    DIGITAL_ECOSYSTEM.find((p) => p.id === selectedPlatformId) || DIGITAL_ECOSYSTEM[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Módulo 6</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Herramientas Tecnológicas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Ecosistema Digital y Plataformas SENA
          </h2>
          <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            El SENA pone a tu disposición un conjunto de plataformas digitales para tu gestión académica,
            aprendizaje virtual, intermediación laboral, acceso a bibliotecas científicas e innovación aplicada.
          </p>
        </div>
      </div>

      {/* Segmented Platform Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        {DIGITAL_ECOSYSTEM.map((p) => {
          const isSelected = selectedPlatformId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlatformId(p.id)}
              className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {getPlatformIcon(p.id)}
              <span className="truncate">{p.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Platform Detailed Card */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl">
              {getPlatformIcon(activePlatform.id)}
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Plataforma Institucional</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">{activePlatform.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{activePlatform.subtitle}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          {activePlatform.description}
        </p>

        {/* Feature List */}
        <div className="bg-slate-50 dark:bg-[#07131d] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            Funcionalidades Clave para el Aprendiz
          </h4>
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            {activePlatform.features.map((feat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f202d] p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] inline-block mr-2" />
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Completion */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            {isCompleted ? 'Módulo 6 Completado' : 'Finalizar Módulo de Ecosistema Digital'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conociste SOFIA Plus, Zajuna, APE, el Sistema de Bibliotecas y SENNOVA.
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
