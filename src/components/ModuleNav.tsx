import React from 'react';
import { ModuleTab } from '../types/induction';
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
  LayoutDashboard,
  FileSpreadsheet,
} from 'lucide-react';

interface ModuleNavProps {
  activeTab: ModuleTab;
  onSelectTab: (tab: ModuleTab) => void;
  completedModules: Record<string, boolean>;
  isExamPassed: boolean;
  isAdmin?: boolean;
}

export const ModuleNav: React.FC<ModuleNavProps> = ({
  activeTab,
  onSelectTab,
  completedModules,
  isExamPassed,
  isAdmin = false,
}) => {
  const tabs = [
    {
      id: 'overview' as ModuleTab,
      label: 'Ruta General',
      icon: LayoutDashboard,
      moduleKey: null,
    },
    {
      id: 'identity' as ModuleTab,
      label: '1. Identidad y Valores',
      icon: Compass,
      moduleKey: 'identity',
    },
    {
      id: 'symbols' as ModuleTab,
      label: '2. Símbolos e Himno',
      icon: Shield,
      moduleKey: 'symbols',
    },
    {
      id: 'regulations' as ModuleTab,
      label: '3. Reglamento del Aprendiz',
      icon: FileText,
      moduleKey: 'regulations',
    },
    {
      id: 'route' as ModuleTab,
      label: '4. Ruta Formativa y Práctica',
      icon: Briefcase,
      moduleKey: 'route',
    },
    {
      id: 'wellness' as ModuleTab,
      label: '5. Bienestar al Aprendiz',
      icon: Heart,
      moduleKey: 'wellness',
    },
    {
      id: 'ecosystem' as ModuleTab,
      label: '6. Ecosistema Digital',
      icon: Cpu,
      moduleKey: 'ecosystem',
    },
    {
      id: 'simulator' as ModuleTab,
      label: '7. Simulador de Casos',
      icon: HelpCircle,
      moduleKey: 'simulator',
    },
    {
      id: 'exam' as ModuleTab,
      label: 'Evaluación Final',
      icon: Award,
      moduleKey: null,
      highlight: true,
    },
    {
      id: 'driveRecords' as ModuleTab,
      label: 'Registro en Drive',
      icon: FileSpreadsheet,
      moduleKey: null,
      isSpecial: true,
    },
  ];

  const visibleTabs = tabs.filter((t) => t.id !== 'driveRecords' || isAdmin);

  return (
    <nav className="bg-white dark:bg-[#0c1822] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            const isCompleted = tab.moduleKey ? completedModules[tab.moduleKey] : false;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#00324D] dark:bg-[#1a384e] text-white border-[#00324D] dark:border-[#2a506d] shadow-xs'
                    : tab.highlight
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/60'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isSelected
                      ? 'text-white'
                      : tab.highlight
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {isCompleted && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-emerald-400' : 'text-[#39A900] dark:text-emerald-400'
                    }`}
                  />
                )}
                {tab.id === 'exam' && isExamPassed && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                    · Aprobado
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
