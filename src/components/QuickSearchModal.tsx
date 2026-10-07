import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ModuleTab } from '../types/induction';
import { ACUERDO_009_2024 } from '../data/acuerdo009Data';
import { INSTITUTIONAL_VALUES, PRODUCTIVE_ALTERNATIVES } from '../data/senaContent';
import { SENA_GLOSSARY } from '../data/glossaryData';
import {
  Search,
  X,
  Compass,
  Shield,
  FileText,
  Briefcase,
  Heart,
  Cpu,
  HelpCircle,
  Award,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: ModuleTab) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  snippet: string;
  tab: ModuleTab;
  icon: any;
  badgeColor: string;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Build searchable index of modules, regulation articles, glossary items, values, etc.
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      {
        id: 'overview',
        title: 'Ruta General e Inducción SENA',
        category: 'Navegación',
        snippet: 'Panel principal de progreso, estaciones de aprendizaje y registro en Drive.',
        tab: 'overview',
        icon: Compass,
        badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      },
      {
        id: 'mod-1',
        title: 'Módulo 1: Identidad, Historia y Valores Éticos',
        category: 'Módulo',
        snippet: 'Rodolfo Martínez Tono, misión, visión, honestidad, respeto, solidaridad, compromiso.',
        tab: 'identity',
        icon: Compass,
        badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      },
      {
        id: 'mod-2',
        title: 'Módulo 2: Símbolos e Himno Institucional',
        category: 'Módulo',
        snippet: 'Escudo, bandera blanca con logotipo verde, piñón y caduceo, audio del himno oficial.',
        tab: 'symbols',
        icon: Shield,
        badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
      },
      {
        id: 'mod-3',
        title: 'Módulo 3: Reglamento del Aprendiz (Acuerdo 009 de 2024)',
        category: 'Módulo',
        snippet: 'Derechos (24), deberes (24), prohibiciones (14), faltas académicas y disciplinarias, Comité de Evaluación.',
        tab: 'regulations',
        icon: FileText,
        badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
      },
      {
        id: 'mod-4',
        title: 'Módulo 4: Ruta Formativa y Etapa Productiva',
        category: 'Módulo',
        snippet: 'FPI, Resultados de Aprendizaje (RAP), 6 alternativas: contrato de aprendizaje, proyecto productivo, pasantía, monitoría.',
        tab: 'route',
        icon: Briefcase,
        badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      },
      {
        id: 'mod-5',
        title: 'Módulo 5: Bienestar al Aprendiz y Convivencia',
        category: 'Módulo',
        snippet: 'Salud integral, torneos deportivos, arte, apoyos de sostenimiento, vocerías y enfoque diferencial.',
        tab: 'wellness',
        icon: Heart,
        badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
      },
      {
        id: 'mod-6',
        title: 'Módulo 6: Ecosistema Digital (Sofia Plus, Zajuna, APE)',
        category: 'Módulo',
        snippet: 'Zajuna aulas virtuales, SOFIA Plus / Betowa, Agencia Pública de Empleo, biblioteca digital y SENNOVA.',
        tab: 'ecosystem',
        icon: Cpu,
        badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
      },
      {
        id: 'mod-7',
        title: 'Módulo 7: Simulador de Dilemas Éticos y Casos Reales',
        category: 'Módulo',
        snippet: 'Casos prácticos de inasistencias justificadas, uso de carné, plagio académico y selección de práctica.',
        tab: 'simulator',
        icon: HelpCircle,
        badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
      },
      {
        id: 'mod-exam',
        title: 'Evaluación Final de Inducción',
        category: 'Certificación',
        snippet: 'Cuestionario institucional de 10 preguntas. Mínimo 80% de aprobación para certificar tu inducción.',
        tab: 'exam',
        icon: Award,
        badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      },
      {
        id: 'mod-drive',
        title: 'Registro en Google Drive y Sheets',
        category: 'Registro Nube',
        snippet: 'Sincronización en la nube con Google Drive para asentar el libro de aprendices y constancias.',
        tab: 'driveRecords',
        icon: FileSpreadsheet,
        badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      },
    ];

    // Add Institutional values
    INSTITUTIONAL_VALUES.forEach((val) => {
      items.push({
        id: `val-${val.id}`,
        title: `Valor: ${val.title}`,
        category: 'Valores SENA',
        snippet: `${val.definition} - Ejemplo: ${val.example}`,
        tab: 'identity',
        icon: Compass,
        badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
      });
    });

    // Add practice alternatives
    PRODUCTIVE_ALTERNATIVES.forEach((opt) => {
      items.push({
        id: `prac-${opt.id}`,
        title: `Etapa Práctica: ${opt.title}`,
        category: 'Etapa Productiva',
        snippet: `${opt.description} Requisitos: ${opt.requirements.join(', ')}`,
        tab: 'route',
        icon: Briefcase,
        badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
      });
    });

    // Add key chapters/articles from Acuerdo 009 de 2024
    ACUERDO_009_2024.reglamento_anexo.capitulos.forEach((cap) => {
      cap.articulos.forEach((art) => {
        let contentStr = '';
        if (typeof art.contenido === 'string') {
          contentStr = art.contenido;
        } else if (Array.isArray(art.contenido)) {
          contentStr = art.contenido.join(', ');
        } else if (typeof art.contenido === 'object' && art.contenido !== null) {
          contentStr = Object.entries(art.contenido)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ');
        }

        items.push({
          id: `art-${art.articulo}`,
          title: `Art. ${art.articulo}: ${art.nombre}`,
          category: `Reglamento 2024 (${cap.capitulo})`,
          snippet: contentStr.slice(0, 150) + (contentStr.length > 150 ? '...' : ''),
          tab: 'regulations',
          icon: FileText,
          badgeColor: 'bg-sky-50 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300',
        });
      });
    });

    // Add glossary entries
    SENA_GLOSSARY.forEach((g) => {
      items.push({
        id: `glo-${g.id}`,
        title: `Glosario: ${g.term}`,
        category: `Glosario (${g.category})`,
        snippet: g.definition,
        tab: 'overview',
        icon: BookOpen,
        badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300',
      });
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 10);
    }
    const q = query.toLowerCase().trim();
    return allItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 12);
  }, [query, allItems]);

  const handleSelect = (item: SearchItem) => {
    onSelectTab(item.tab);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#0c1a26] border-2 border-emerald-500/40 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-[#0a151f]">
          <Search className="w-5 h-5 text-[#39A900] dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar temas, artículos del Reglamento 2024, valores, alternativas de práctica..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-slate-200 dark:bg-slate-800 dark:text-slate-400 rounded-md border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No se encontraron resultados para "{query}"
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Intenta buscar términos como: "reglamento", "artículo", "derechos", "zajuna", "valores", o "drive".
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#39A900] text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 mt-2 shrink-0 transition-transform ${
                      isSelected
                        ? 'text-[#39A900] dark:text-emerald-400 translate-x-1'
                        : 'text-slate-400 opacity-40'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-[#0a151f] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Usa <kbd className="font-semibold bg-slate-200 dark:bg-slate-800 px-1 rounded">↑</kbd>{' '}
              <kbd className="font-semibold bg-slate-200 dark:bg-slate-800 px-1 rounded">↓</kbd> para navegar
            </span>
            <span>
              <kbd className="font-semibold bg-slate-200 dark:bg-slate-800 px-1 rounded">ENTER</kbd> para abrir
            </span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-slate-800 dark:hover:text-white font-medium cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
