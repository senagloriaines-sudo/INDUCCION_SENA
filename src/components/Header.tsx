import React from 'react';
import { ApprenticeProfile, ModuleTab } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import {
  User,
  BookOpen,
  Award,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Sun,
  Moon,
  FileSpreadsheet,
  Search,
} from 'lucide-react';

interface HeaderProps {
  profile: ApprenticeProfile;
  completedModulesCount: number;
  totalModulesCount: number;
  isExamPassed: boolean;
  activeTab: ModuleTab;
  darkMode: boolean;
  logoUrl?: string;
  isGoogleConnected?: boolean;
  isAdmin?: boolean;
  onOpenSearch?: () => void;
  onToggleDarkMode: () => void;
  onSelectTab: (tab: ModuleTab) => void;
  onOpenProfile: () => void;
  onOpenGlossary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  completedModulesCount,
  totalModulesCount,
  isExamPassed,
  activeTab,
  darkMode,
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sena_Colombia_logo.svg',
  isGoogleConnected = false,
  isAdmin = false,
  onOpenSearch,
  onToggleDarkMode,
  onSelectTab,
  onOpenProfile,
  onOpenGlossary,
}) => {
  const progressPercent = Math.round((completedModulesCount / totalModulesCount) * 100);

  return (
    <header className="bg-[#00324D] dark:bg-[#07131c] text-white border-b border-slate-700/60 dark:border-slate-800 transition-colors duration-300">
      {/* Colombian Flag Mini Line Top */}
      <div className="h-1 w-full flex">
        <div className="w-1/2 bg-[#FFD100]" />
        <div className="w-1/4 bg-[#00324D]" />
        <div className="w-1/4 bg-[#DA291C]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Platform Name */}
          <div
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-1 rounded-xl bg-white/10 group-hover:bg-white/15 transition-colors">
              <SenaLogo className="w-12 h-12" src={logoUrl} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none font-display">
                  Portal de Inducción SENA
                </span>
                <span className="text-[11px] font-semibold text-emerald-300">
                  · 2026
                </span>
              </div>
              <p className="text-xs text-slate-300 dark:text-slate-400 leading-tight mt-0.5">
                Servicio Nacional de Aprendizaje · Formación Profesional Integral
              </p>
            </div>
          </div>

          {/* Apprentice Quick Card & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Quick Search Button (Ctrl+K) */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-100 flex items-center gap-2 transition-all border border-white/10 cursor-pointer hover:border-emerald-400/50"
                title="Búsqueda rápida en inducción y reglamento (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Buscar</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[10px] font-bold text-emerald-300 bg-black/30 rounded border border-white/10">
                  Ctrl+K
                </kbd>
              </button>
            )}

            {/* Global Progress Bar */}
            <div className="hidden lg:flex flex-col items-end mr-2">
              <div className="text-[11px] text-slate-300 dark:text-slate-400 font-medium">
                Progreso:{' '}
                <strong className="text-emerald-400">
                  {completedModulesCount} de {totalModulesCount} módulos ({progressPercent}%)
                </strong>
              </div>
              <div className="w-32 h-1.5 bg-slate-700 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[#39A900] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-100 flex items-center gap-1.5 transition-colors border border-white/10"
              title="Abrir Glosario SENA"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Glosario SENA</span>
            </button>

            {/* Certificate Button */}
            <button
              onClick={() => onSelectTab(isExamPassed ? 'certificate' : 'exam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isExamPassed
                  ? 'bg-[#39A900] hover:bg-[#2e8800] text-white border-[#39A900] shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <Award
                className={`w-3.5 h-3.5 ${isExamPassed ? 'text-white' : 'text-amber-400'}`}
              />
              <span>{isExamPassed ? 'Mi Certificado' : 'Evaluación Final'}</span>
            </button>

            {/* Google Drive / Sheets Records Button */}
            {isAdmin && (
              <button
                onClick={() => onSelectTab('driveRecords')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  activeTab === 'driveRecords'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-slate-100 border-white/10'
                }`}
                title="Libro de Registro de Aprendices en Google Drive"
              >
                <FileSpreadsheet
                  className={`w-3.5 h-3.5 ${
                    isGoogleConnected ? 'text-emerald-400' : 'text-emerald-300'
                  }`}
                />
                <span>Registro Drive</span>
                {isGoogleConnected && (
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"
                    title="Conectado a Google Drive"
                  />
                )}
              </button>
            )}

            {/* Apprentice Profile Trigger */}
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-left transition-colors flex items-center gap-2 border border-white/10 group"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs">
                {profile.fullName.charAt(0)}
              </div>
              <div className="max-w-[130px] truncate hidden sm:block">
                <span className="block text-xs font-bold text-white truncate">
                  {profile.fullName.split(' ')[0]} {profile.fullName.split(' ')[1] || ''}
                </span>
                <span className="block text-[10px] text-slate-300 truncate">
                  Ficha: {profile.ficheNumber}
                </span>
              </div>
            </button>

            {/* Dark Mode Toggle Button (Upper Right Corner) */}
            <button
              onClick={onToggleDarkMode}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-xs font-semibold text-white flex items-center gap-1.5 transition-all border border-white/20 shadow-xs cursor-pointer"
              title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              aria-label={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300 fill-amber-300/30 transition-transform duration-300 rotate-0" />
                  <span className="font-medium">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-200 fill-sky-200/20 transition-transform duration-300 -rotate-12" />
                  <span className="font-medium">Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
