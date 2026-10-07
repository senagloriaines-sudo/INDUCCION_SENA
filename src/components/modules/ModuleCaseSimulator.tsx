import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/senaContent';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { playSuccessChime, playIncorrectBeep } from '../../utils/audioSynth';

interface ModuleCaseSimulatorProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleCaseSimulator: React.FC<ModuleCaseSimulatorProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [solvedCases, setSolvedCases] = useState<Record<string, boolean>>({});

  const currentCase = CASE_STUDIES[currentCaseIndex];

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    const selectedOpt = currentCase.options.find((o) => o.id === optionId);
    if (selectedOpt?.isCorrect) {
      playSuccessChime();
      const updated = { ...solvedCases, [currentCase.id]: true };
      setSolvedCases(updated);

      if (Object.keys(updated).length === CASE_STUDIES.length && !isCompleted) {
        onComplete();
      }
    } else {
      playIncorrectBeep();
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < CASE_STUDIES.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex((prev) => prev - 1);
      setSelectedOptionId(null);
    }
  };

  const selectedOption = currentCase.options.find((o) => o.id === selectedOptionId);
  const allSolved = Object.keys(solvedCases).length === CASE_STUDIES.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Módulo 7</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Dilemas Éticos y Casos Prácticos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Simulador de Situaciones Reales del Aprendiz
          </h2>
          <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Afronta situaciones cotidianas que ocurren durante la formación: inasistencias, honestidad
            intelectual, convivencia institucional y selección de etapa productiva. Analiza cada escenario
            y toma la decisión correcta según el Reglamento.
          </p>
        </div>
      </div>

      {/* Case Navigator Bar */}
      <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#0c1a26] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          {CASE_STUDIES.map((c, idx) => {
            const isSolved = solvedCases[c.id];
            const isCurrent = currentCaseIndex === idx;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentCaseIndex(idx);
                  setSelectedOptionId(null);
                }}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-[#00324D] dark:bg-emerald-600 text-white shadow-xs scale-105'
                    : isSolved
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Casos resueltos: <strong className="text-slate-900 dark:text-white font-mono">{Object.keys(solvedCases).length}</strong> de <strong className="text-slate-900 dark:text-white font-mono">{CASE_STUDIES.length}</strong>
        </div>
      </div>

      {/* Case Card */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Caso #{currentCaseIndex + 1}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-display">{currentCase.title}</h3>
        </div>

        {/* Situation Description Box */}
        <div className="p-5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2">
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {currentCase.situation}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800">
            <strong className="text-slate-800 dark:text-slate-300">Dilema:</strong> {currentCase.context}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            ¿Cuál es la conducta reglamentaria que debe adoptarse?
          </h4>

          <div className="space-y-2.5">
            {currentCase.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let itemBorder = 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f202d] hover:border-slate-300 dark:hover:border-slate-700';

              if (isSelected) {
                itemBorder = opt.isCorrect
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                  : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-1 ring-rose-500';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${itemBorder}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isSelected ? (
                        opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        )
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                      )}
                    </div>
                    <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                      {opt.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Section if Option Selected */}
        {selectedOption && (
          <div
            className={`p-5 rounded-2xl border animate-in fade-in duration-200 ${
              selectedOption.isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 font-bold text-sm">
              {selectedOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Respuesta Correcta</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span>Respuesta No Ajustada al Reglamento</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed mb-2 opacity-90">{selectedOption.feedback}</p>
            <div className="text-[11px] font-semibold flex items-center gap-1.5 pt-2 border-t border-current/20 opacity-80">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Fundamento legal: {selectedOption.regulationRef}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrevCase}
            disabled={currentCaseIndex === 0}
            className="px-4 py-2 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Anterior
          </button>

          {currentCaseIndex < CASE_STUDIES.length - 1 ? (
            <button
              onClick={handleNextCase}
              className="px-5 py-2.5 bg-[#00324D] dark:bg-emerald-600 hover:bg-[#002438] dark:hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span>Siguiente Caso</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isCompleted) {
                  onComplete();
                  playSuccessChime();
                }
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Módulo Completado' : 'Finalizar Simulador'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
