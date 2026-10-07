import React from 'react';
import { ModuleTab } from '../types/induction';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Check,
  LayoutDashboard,
  Award,
  FileSpreadsheet,
  Search,
} from 'lucide-react';
import { playSuccessChime } from '../utils/audioSynth';

interface ModuleNavigationDockProps {
  activeTab: ModuleTab;
  completedModules: Record<string, boolean>;
  onSelectTab: (tab: ModuleTab) => void;
  onToggleCompleteModule: (moduleKey: string) => void;
  onOpenSearch: () => void;
  isExamPassed: boolean;
  isAdmin?: boolean;
}

const MODULE_SEQUENCE: { id: ModuleTab; key: string; num: number; title: string }[] = [
  { id: 'identity', key: 'identity', num: 1, title: 'Identidad y Valores' },
  { id: 'symbols', key: 'symbols', num: 2, title: 'Símbolos e Himno' },
  { id: 'regulations', key: 'regulations', num: 3, title: 'Reglamento 2024' },
  { id: 'route', key: 'route', num: 4, title: 'Ruta Formativa' },
  { id: 'wellness', key: 'wellness', num: 5, title: 'Bienestar al Aprendiz' },
  { id: 'ecosystem', key: 'ecosystem', num: 6, title: 'Ecosistema Digital' },
  { id: 'simulator', key: 'simulator', num: 7, title: 'Simulador de Casos' },
];

export const ModuleNavigationDock: React.FC<ModuleNavigationDockProps> = ({
  activeTab,
  completedModules,
  onSelectTab,
  onToggleCompleteModule,
  onOpenSearch,
  isExamPassed,
  isAdmin = false,
}) => {
  // Only show dock on module pages or exam/certificate
  const currentModuleIndex = MODULE_SEQUENCE.findIndex((m) => m.id === activeTab);
  const isModuleView = currentModuleIndex !== -1;

  if (!isModuleView && activeTab !== 'exam' && activeTab !== 'certificate') {
    return null;
  }

  const currentMod = isModuleView ? MODULE_SEQUENCE[currentModuleIndex] : null;
  const isCurrentCompleted = currentMod ? !!completedModules[currentMod.key] : false;

  const handlePrev = () => {
    if (activeTab === 'exam') {
      onSelectTab('simulator');
      return;
    }
    if (activeTab === 'certificate') {
      onSelectTab('exam');
      return;
    }
    if (currentModuleIndex > 0) {
      onSelectTab(MODULE_SEQUENCE[currentModuleIndex - 1].id);
    } else {
      onSelectTab('overview');
    }
  };

  const handleNext = () => {
    if (activeTab === 'exam') {
      onSelectTab('certificate');
      return;
    }
    if (activeTab === 'certificate') {
      onSelectTab(isAdmin ? 'driveRecords' : 'overview');
      return;
    }
    if (currentModuleIndex < MODULE_SEQUENCE.length - 1) {
      onSelectTab(MODULE_SEQUENCE[currentModuleIndex + 1].id);
    } else {
      onSelectTab('exam');
    }
  };

  const handleToggleCurrent = () => {
    if (currentMod) {
      onToggleCompleteModule(currentMod.key);
      if (!isCurrentCompleted) {
        playSuccessChime();
      }
    }
  };

  return (
    <div className="no-print fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none flex justify-center animate-in slide-in-from-bottom-3 duration-300">
      <div className="pointer-events-auto bg-white/95 dark:bg-[#0c1a26]/95 backdrop-blur-md border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl rounded-2xl sm:rounded-full px-3 py-2 sm:px-4 sm:py-2.5 max-w-4xl w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
        
        {/* Left: Previous & Overview Jump */}
        <div className="flex items-center gap-1.5 order-1">
          <button
            onClick={() => onSelectTab('overview')}
            title="Volver a Ruta General"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrev}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </div>

        {/* Center: Stepper & Module Status */}
        {isModuleView && currentMod && (
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-3 sm:order-2 w-full sm:w-auto justify-center py-1 sm:py-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {MODULE_SEQUENCE.map((m, idx) => {
                const isDone = !!completedModules[m.key];
                const isCurrent = idx === currentModuleIndex;
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectTab(m.id)}
                    title={`Módulo ${m.num}: ${m.title} (${isDone ? 'Completado' : 'Pendiente'})`}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? 'w-6 bg-[#39A900] shadow-xs'
                        : isDone
                        ? 'bg-emerald-400 dark:bg-emerald-500'
                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {currentMod.num}/7: {currentMod.title}
              </span>

              {/* Completion Toggle */}
              <button
                onClick={handleToggleCurrent}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isCurrentCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {isCurrentCompleted ? (
                  <>
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Completado</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Marcar Hecho</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Right: Quick Search + Next Action */}
        <div className="flex items-center gap-1.5 order-2 sm:order-3">
          <button
            onClick={onOpenSearch}
            title="Búsqueda rápida (Ctrl+K)"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              currentModuleIndex === MODULE_SEQUENCE.length - 1
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-[#39A900] hover:bg-[#2e8800] text-white'
            }`}
          >
            <span>
              {currentModuleIndex === MODULE_SEQUENCE.length - 1
                ? 'Evaluación Final'
                : activeTab === 'exam'
                ? 'Certificado'
                : 'Siguiente'}
            </span>
            {currentModuleIndex === MODULE_SEQUENCE.length - 1 ? (
              <Award className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
