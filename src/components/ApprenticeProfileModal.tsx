import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { REGIONAL_OPTIONS } from '../data/senaContent';
import { User, BookOpen, Hash, MapPin, Building, X, Check } from 'lucide-react';

interface ApprenticeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSave: (updated: ApprenticeProfile) => void;
}

export const ApprenticeProfileModal: React.FC<ApprenticeProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 w-full max-w-lg overflow-hidden transition-colors">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#00324D] to-[#004766] dark:from-[#06121a] dark:to-[#0c1f2b] px-6 sm:px-8 py-5 text-white flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl font-display leading-tight">Perfil del Aprendiz SENA</h2>
              <p className="text-xs text-slate-300 dark:text-slate-400">
                Personaliza tus datos para la constancia y seguimiento
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4 text-sm text-slate-700 dark:text-slate-200">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Nombre Completo del Aprendiz
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white dark:bg-[#0f202d] text-slate-900 dark:text-white font-medium"
                placeholder="Ej. Gloria Inés Martínez Pérez"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Tipo Doc.
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium"
              >
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="P.P.T.">P.P.T.</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Número de Identificación
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-mono tabular-nums"
                placeholder="1023456789"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Programa de Formación
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.trainingProgram}
                  onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium"
                  placeholder="Ej. Análisis y Desarrollo de Software"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                N° Ficha
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.ficheNumber}
                  onChange={(e) => setFormData({ ...formData, ficheNumber: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-mono tabular-nums"
                  placeholder="2874910"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Regional SENA
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium"
              >
                {REGIONAL_OPTIONS.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Centro de Formación
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={formData.trainingCenter}
                onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white bg-white dark:bg-[#0f202d] font-medium"
                placeholder="Ej. Centro de Servicios Financieros"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200/80 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer text-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Guardado
                </>
              ) : (
                'Guardar Perfil'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
