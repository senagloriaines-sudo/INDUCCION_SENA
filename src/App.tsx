/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, ModuleTab } from './types/induction';
import { SENA_PROFILE_DEFAULT } from './data/senaContent';
import { Header } from './components/Header';
import { ModuleNav } from './components/ModuleNav';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { GlossaryModal } from './components/GlossaryModal';
import { OverviewDashboard } from './components/OverviewDashboard';
import { ModuleIdentity } from './components/modules/ModuleIdentity';
import { ModuleSymbols } from './components/modules/ModuleSymbols';
import { ModuleRegulations } from './components/modules/ModuleRegulations';
import { ModuleTrainingRoute } from './components/modules/ModuleTrainingRoute';
import { ModuleWellness } from './components/modules/ModuleWellness';
import { ModuleDigitalEcosystem } from './components/modules/ModuleDigitalEcosystem';
import { ModuleCaseSimulator } from './components/modules/ModuleCaseSimulator';
import { CertificationExam } from './components/CertificationExam';
import { CertificateView } from './components/CertificateView';
import { DriveRecordsView } from './components/DriveRecordsView';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ModuleNavigationDock } from './components/ModuleNavigationDock';
import { SenaLogo } from './components/SenaLogo';
import { Heart, FileSpreadsheet } from 'lucide-react';
import { initAuth, googleSignIn, logoutGoogle } from './services/googleAuth';
import { User } from 'firebase/auth';

const STORAGE_KEY_PROFILE = 'sena_induction_profile_v1';
const STORAGE_KEY_MODULES = 'sena_induction_modules_v1';
const STORAGE_KEY_EXAM = 'sena_induction_exam_v1';
const STORAGE_KEY_THEME = 'sena_induction_darkmode_v1';

export default function App() {
  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Blur transition trigger state
  const [isBlurring, setIsBlurring] = useState<boolean>(false);

  // Apprentice Profile state
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SENA_PROFILE_DEFAULT;
  });

  // Completed modules tracking
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MODULES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      identity: false,
      symbols: false,
      regulations: false,
      route: false,
      wellness: false,
      ecosystem: false,
      simulator: false,
    };
  });

  // Exam passed status & score
  const [examStatus, setExamStatus] = useState<{ isPassed: boolean; score: number }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXAM);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { isPassed: false, score: 0 };
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ModuleTab>('overview');

  // Admin Mode state (to secure Google Sheets link & records from ordinary apprentices)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_induction_admin_v1') === 'true';
    } catch {
      return false;
    }
  });

  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut listener for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Google Workspace / Drive Authentication state
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Automatically activate Admin Mode if signed-in as senagloriaines@gmail.com
  useEffect(() => {
    if (googleUser && googleUser.email === 'senagloriaines@gmail.com') {
      setIsAdmin(true);
      try {
        localStorage.setItem('sena_induction_admin_v1', 'true');
      } catch {
        // ignore
      }
    }
  }, [googleUser]);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
      }
    } catch (err) {
      console.error('Google Sign In error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logoutGoogle();
      setGoogleUser(null);
      setGoogleToken(null);
    } catch (err) {
      console.error('Google logout error:', err);
    }
  };

  // Apply dark mode class to html document and body
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(darkMode));
    } catch {
      // ignore
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(completedModules));
    } catch {
      // ignore
    }
  }, [completedModules]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXAM, JSON.stringify(examStatus));
    } catch {
      // ignore
    }
  }, [examStatus]);

  // Trigger dark mode toggle with smooth blur transition
  const handleToggleDarkMode = () => {
    setIsBlurring(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsBlurring(false);
    }, 550);
  };

  const handleCompleteModule = (moduleKey: string) => {
    setCompletedModules((prev) => ({
      ...prev,
      [moduleKey]: true,
    }));
  };

  const handleToggleCompleteModule = (moduleKey: string) => {
    setCompletedModules((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey],
    }));
  };

  const handlePassedExam = (score: number) => {
    setExamStatus({ isPassed: true, score });
  };

  const completedCount = Object.values(completedModules).filter(Boolean).length;
  const totalModulesCount = 7;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${
        darkMode ? 'dark bg-[#07131d] text-slate-100' : 'bg-slate-50 text-slate-800'
      } ${isBlurring ? 'theme-blur-active' : ''}`}
    >
      {/* Full-screen Glassmorphism Blur Effect Overlay when switching themes */}
      {isBlurring && (
        <div
          className="fixed inset-0 z-50 pointer-events-none blur-overlay-transition bg-slate-900/10 dark:bg-black/20"
          aria-hidden="true"
        />
      )}

      {/* Unified Sticky Header & Navigation Wrapper to prevent overlapping or clashing positions */}
      <div className="sticky top-0 z-40 no-print shadow-md bg-[#00324D] dark:bg-[#07131c]">
        {/* Top Header with Dark Mode Toggle Button */}
        <Header
          profile={profile}
          completedModulesCount={completedCount}
          totalModulesCount={totalModulesCount}
          isExamPassed={examStatus.isPassed}
          activeTab={activeTab}
          darkMode={darkMode}
          isGoogleConnected={!!googleUser}
          isAdmin={isAdmin}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleDarkMode={handleToggleDarkMode}
          onSelectTab={setActiveTab}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenGlossary={() => setIsGlossaryModalOpen(true)}
        />

        {/* Navigation Sub-header */}
        <ModuleNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          completedModules={completedModules}
          isExamPassed={examStatus.isPassed}
          isAdmin={isAdmin}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
        {activeTab === 'overview' && (
          <OverviewDashboard
            profile={profile}
            completedModules={completedModules}
            isExamPassed={examStatus.isPassed}
            isGoogleConnected={!!googleUser}
            isAdmin={isAdmin}
            onSelectTab={setActiveTab}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenGlossary={() => setIsGlossaryModalOpen(true)}
          />
        )}

        {activeTab === 'identity' && (
          <ModuleIdentity
            onComplete={() => handleCompleteModule('identity')}
            isCompleted={!!completedModules.identity}
          />
        )}

        {activeTab === 'symbols' && (
          <ModuleSymbols
            onComplete={() => handleCompleteModule('symbols')}
            isCompleted={!!completedModules.symbols}
          />
        )}

        {activeTab === 'regulations' && (
          <ModuleRegulations
            onComplete={() => handleCompleteModule('regulations')}
            isCompleted={!!completedModules.regulations}
          />
        )}

        {activeTab === 'route' && (
          <ModuleTrainingRoute
            onComplete={() => handleCompleteModule('route')}
            isCompleted={!!completedModules.route}
          />
        )}

        {activeTab === 'wellness' && (
          <ModuleWellness
            onComplete={() => handleCompleteModule('wellness')}
            isCompleted={!!completedModules.wellness}
          />
        )}

        {activeTab === 'ecosystem' && (
          <ModuleDigitalEcosystem
            onComplete={() => handleCompleteModule('ecosystem')}
            isCompleted={!!completedModules.ecosystem}
          />
        )}

        {activeTab === 'simulator' && (
          <ModuleCaseSimulator
            onComplete={() => handleCompleteModule('simulator')}
            isCompleted={!!completedModules.simulator}
          />
        )}

        {activeTab === 'exam' && (
          <CertificationExam
            onPassedExam={handlePassedExam}
            onNavigateToCertificate={() => setActiveTab('certificate')}
            onNavigateToDriveRecords={() => setActiveTab('driveRecords')}
            isAlreadyPassed={examStatus.isPassed}
            bestScore={examStatus.score}
            currentProfile={profile}
            onUpdateProfile={setProfile}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'certificate' && (
          <CertificateView
            profile={profile}
            score={examStatus.score}
            onEditProfile={() => setIsProfileModalOpen(true)}
            onOpenDriveRecords={() => setActiveTab('driveRecords')}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'driveRecords' && (
          isAdmin ? (
            <DriveRecordsView
              user={googleUser}
              accessToken={googleToken}
              isLoggingIn={isLoggingIn}
              onLogin={handleGoogleLogin}
              onLogout={handleGoogleLogout}
              currentProfile={profile}
              completedModulesCount={completedCount}
              totalModulesCount={totalModulesCount}
              isExamPassed={examStatus.isPassed}
              examScore={examStatus.score}
              onSelectTab={setActiveTab}
            />
          ) : (
            <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center max-w-lg mx-auto space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                Área de Acceso Restringido (Administrador)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Por seguridad de la información de los aprendices, esta sección y la hoja de cálculo de Google Drive son de uso exclusivo del administrador del portal.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const pin = prompt('Ingrese el código de acceso de administrador:');
                    if (pin === 'SENA2026' || pin === 'senagloriaines') {
                      setIsAdmin(true);
                      try {
                        localStorage.setItem('sena_induction_admin_v1', 'true');
                      } catch {
                        // ignore
                      }
                    } else if (pin !== null) {
                      alert('Código incorrecto');
                    }
                  }}
                  className="px-5 py-2.5 bg-[#00324D] dark:bg-emerald-600 hover:bg-[#002438] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  🔑 Ingresar como Administrador
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Dynamic Module Navigation Floating Dock */}
      <ModuleNavigationDock
        activeTab={activeTab}
        completedModules={completedModules}
        onSelectTab={setActiveTab}
        onToggleCompleteModule={handleToggleCompleteModule}
        onOpenSearch={() => setIsSearchOpen(true)}
        isExamPassed={examStatus.isPassed}
        isAdmin={isAdmin}
      />

      {/* Modals & Command Palette */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={setActiveTab}
      />

      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={(updated) => setProfile(updated)}
      />

      <GlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="no-print bg-[#00324D] dark:bg-[#07131c] text-slate-300 dark:text-slate-400 border-t border-slate-700/60 dark:border-slate-800 mt-12 py-8 text-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-700/50 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <SenaLogo className="w-8 h-8" light />
              <div>
                <span className="font-bold text-sm text-white block">
                  Servicio Nacional de Aprendizaje SENA
                </span>
                <span className="text-[11px] text-slate-400">
                  Dirección General · Calle 57 No. 8 - 69, Bogotá D.C., Colombia
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                onClick={() => setIsGlossaryModalOpen(true)}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Glosario Institucional
              </button>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <button
                onClick={() => setActiveTab('regulations')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Reglamento del Aprendiz
              </button>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <button
                onClick={() => setActiveTab('overview')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Ruta Formativa
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              © 2026 Servicio Nacional de Aprendizaje SENA. Formación Profesional Integral gratuita
              para todos los colombianos.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <button
                onClick={() => {
                  if (isAdmin) {
                    setIsAdmin(false);
                    try {
                      localStorage.setItem('sena_induction_admin_v1', 'false');
                    } catch {
                      // ignore
                    }
                    setActiveTab('overview');
                  } else {
                    const pin = prompt('Ingrese el código de acceso de administrador:');
                    if (pin === 'SENA2026' || pin === 'senagloriaines') {
                      setIsAdmin(true);
                      try {
                        localStorage.setItem('sena_induction_admin_v1', 'true');
                      } catch {
                        // ignore
                      }
                      setActiveTab('driveRecords');
                    } else if (pin !== null) {
                      alert('Código de acceso incorrecto.');
                    }
                  }
                }}
                className="text-[10px] text-slate-500 dark:text-slate-500 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer"
              >
                {isAdmin ? '🔒 Desactivar Vista Admin' : '🔑 Acceso Admin'}
              </button>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Construido para apoyar la inducción institucional</span>
              <Heart className="w-3.5 h-3.5 text-emerald-400 fill-current inline" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
