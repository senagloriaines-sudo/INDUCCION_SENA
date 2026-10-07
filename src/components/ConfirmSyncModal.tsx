import React from 'react';
import { InductionRecord } from '../types/induction';
import { FileSpreadsheet, AlertCircle, Check, X } from 'lucide-react';

interface ConfirmSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  record: InductionRecord | null;
  spreadsheetName: string;
  isSaving: boolean;
}

export const ConfirmSyncModal: React.FC<ConfirmSyncModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  record,
  spreadsheetName,
  isSaving,
}) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
              Confirmar Registro en Google Drive
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Se escribirá una nueva fila en tu hoja de cálculo oficial
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#07131d] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Archivo destino:</span>
            <span className="font-bold text-slate-900 dark:text-white text-right truncate max-w-[240px]">
              {spreadsheetName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Aprendiz:</span>
            <span className="font-bold text-slate-900 dark:text-white">{record.fullName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Documento:</span>
            <span className="text-slate-700 dark:text-slate-300 font-mono tabular-nums">
              {record.documentType} {record.documentNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Ficha y Programa:</span>
            <span className="text-slate-700 dark:text-slate-300 text-right truncate max-w-[240px]">
              <span className="font-mono">{record.ficheNumber}</span> · {record.trainingProgram}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Progreso / Evaluación:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {record.completedModulesCount}/7 módulos ({record.progressPercent}%) ·{' '}
              {record.isExamPassed ? `Aprobó (${record.examScore}%)` : 'Pendiente examen'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Estado resultante:</span>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
              {record.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl text-amber-800 dark:text-amber-300 text-xs border border-amber-200 dark:border-amber-800/50">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>
            Esta acción modificará tu hoja de cálculo en Google Drive agregando esta fila de forma permanente.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSaving}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Guardando en Drive...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Confirmar y Guardar en Drive</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
