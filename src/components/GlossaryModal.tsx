import React, { useState, useMemo } from 'react';
import { SENA_GLOSSARY } from '../data/glossaryData';
import { Search, BookOpen, X, Sparkles } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Institucional', 'Pedagógico', 'Tecnológico', 'Administrativo'];

  const filteredItems = useMemo(() => {
    return SENA_GLOSSARY.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00324D] to-[#004766] dark:from-[#06121a] dark:to-[#0c1f2b] px-6 sm:px-8 py-5 text-white flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl font-display leading-tight">Glosario Institucional SENA</h2>
              <p className="text-xs text-slate-300 dark:text-slate-400">
                Siglas, terminología técnica y conceptos clave de la Formación Profesional Integral
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

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-[#07131d] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar término (ej. RAP, FPI, Sofía Plus, Deserción, Subdirector)..."
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#0f202d] border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Interactive filter control */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-xl text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of Terms */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="font-medium text-slate-700 dark:text-slate-200">
                No se encontraron términos para esta búsqueda
              </p>
              <p className="text-xs">Prueba con otra palabra clave o restablece los filtros.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f202d] hover:border-[#39A900]/50 dark:hover:border-emerald-500/50 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                      {item.term}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>{item.category}</span>
                      {item.relatedModule && (
                        <>
                          <span aria-hidden="true" className="mx-1">
                            ·
                          </span>
                          <span>{item.relatedModule}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-[#0c1822] border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between px-6">
          <span>Mostrando {filteredItems.length} de {SENA_GLOSSARY.length} conceptos clave</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md font-medium text-xs transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
