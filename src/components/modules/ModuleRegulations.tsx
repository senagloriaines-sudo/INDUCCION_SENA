import React, { useState, useMemo } from 'react';
import { REGULATION_RULES } from '../../data/senaContent';
import { ACUERDO_009_2024 } from '../../data/acuerdo009Data';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ShieldAlert,
  Info,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  Users,
  Shield,
  HeartHandshake,
  ChevronRight,
  ChevronDown,
  Building,
  Calendar,
  FileCheck2,
} from 'lucide-react';
import { playSuccessChime } from '../../utils/audioSynth';

interface ModuleRegulationsProps {
  onComplete: () => void;
  isCompleted: boolean;
}

type MainTab = 'normas_clave' | 'articulado_oficial' | 'novedades_2024' | 'marco_juridico';

export const ModuleRegulations: React.FC<ModuleRegulationsProps> = ({
  onComplete,
  isCompleted,
}) => {
  // Main view tab
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('normas_clave');

  // State for Normas Clave explorer
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'derechos' | 'deberes' | 'prohibiciones'>('todos');
  const [searchQueryKey, setSearchQueryKey] = useState('');
  const [selectedRuleId, setSelectedRuleId] = useState<string>(REGULATION_RULES[0].id);

  // State for Official Articulado explorer
  const [selectedCapituloIndex, setSelectedCapituloIndex] = useState<number>(0);
  const [searchQueryArticles, setSearchQueryArticles] = useState('');
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  // Filter for key rules
  const filteredRules = useMemo(() => {
    return REGULATION_RULES.filter((r) => {
      const matchCat = selectedCategory === 'todos' || r.category === selectedCategory;
      const matchSearch =
        r.title.toLowerCase().includes(searchQueryKey.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQueryKey.toLowerCase()) ||
        r.practicalTip.toLowerCase().includes(searchQueryKey.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQueryKey]);

  const activeRule =
    REGULATION_RULES.find((r) => r.id === selectedRuleId) || filteredRules[0] || REGULATION_RULES[0];

  // Current capitulo in Articulado Oficial
  const currentCapitulo = ACUERDO_009_2024.reglamento_anexo.capitulos[selectedCapituloIndex];

  // Search across all articles of the regulation
  const searchedArticles = useMemo(() => {
    if (!searchQueryArticles.trim()) return null;
    const query = searchQueryArticles.toLowerCase().trim();
    const results: { capituloNombre: string; capituloNum: string; articulo: (typeof currentCapitulo.articulos)[0] }[] = [];

    ACUERDO_009_2024.reglamento_anexo.capitulos.forEach((cap) => {
      cap.articulos.forEach((art) => {
        let contentText = '';
        if (typeof art.contenido === 'string') {
          contentText = art.contenido;
        } else if (Array.isArray(art.contenido)) {
          contentText = art.contenido.join(' ');
        } else if (typeof art.contenido === 'object' && art.contenido !== null) {
          contentText = Object.entries(art.contenido)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' ');
        }

        if (
          art.nombre.toLowerCase().includes(query) ||
          contentText.toLowerCase().includes(query) ||
          `articulo ${art.articulo}`.includes(query)
        ) {
          results.push({
            capituloNombre: cap.nombre,
            capituloNum: cap.capitulo,
            articulo: art,
          });
        }
      });
    });

    return results;
  }, [searchQueryArticles]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Official Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400 uppercase tracking-wider">
              Módulo 3 · Marco Normativo y Convivencia
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-amber-300 font-medium font-mono text-[11px]">
              Vigente: {ACUERDO_009_2024.titulo_oficial}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Reglamento del Aprendiz SENA
          </h2>

          <p className="text-slate-200 text-sm leading-relaxed">
            Adoptado mediante el <strong>Acuerdo 009 de 2024</strong> (publicado en el {ACUERDO_009_2024.diario_oficial}),
            el cual <strong>deroga en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024</strong>.
            Garantiza tus derechos fundamentales, deberes, prohibiciones, enfoque diferencial y el debido proceso.
          </p>

          {/* Quick Notice Tag */}
          <div className="bg-slate-900/60 backdrop-blur-xs border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-300">Vigencia y Modificaciones: </span>
              {ACUERDO_009_2024.notas_de_vigencia[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveMainTab('normas_clave')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeMainTab === 'normas_clave'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Normas Clave (Derechos y Deberes)
        </button>

        <button
          onClick={() => setActiveMainTab('articulado_oficial')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeMainTab === 'articulado_oficial'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          Articulado Oficial (Acuerdo 009)
        </button>

        <button
          onClick={() => setActiveMainTab('novedades_2024')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeMainTab === 'novedades_2024'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Novedades y Enfoques 2024
        </button>

        <button
          onClick={() => setActiveMainTab('marco_juridico')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeMainTab === 'marco_juridico'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <Scale className="w-4 h-4" />
          Marco Legal y Considerandos
        </button>
      </div>

      {/* TAB 1: NORMAS CLAVE EXPLORER */}
      {activeMainTab === 'normas_clave' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Due Process & Formative Measures Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-white dark:bg-[#0c1a26] border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-extrabold text-sm font-display">
                <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Debido Proceso Garantizado</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ningún aprendiz puede ser sancionado sin haber sido notificado formalmente, tener acceso al
                expediente y contar con al menos <strong>cinco (5) días hábiles</strong> para presentar descargos y pruebas
                ante el Comité de Evaluación y Seguimiento (Acuerdo 009, Art. 51).
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-[#0c1a26] border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-extrabold text-sm font-display">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Medidas Formativas Pedagógicas</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Antes de sanciones disciplinarias, el SENA privilegia la formación pedagógica mediante
                <strong> llamados de atención escritos</strong> y <strong>planes de mejoramiento concertados</strong> con
                instructores para encauzar el aprendizaje (Acuerdo 009, Arts. 45 y 46).
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-[#0c1a26] border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-sm font-display">
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>Régimen Sancionatorio</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Comprende el llamado de atención escrito con copia a hoja de vida, <strong>condicionamiento de matrícula</strong> y
                la <strong>cancelación de matrícula con inhabilidad</strong> de 6 meses hasta 2 años, modificado por el Acuerdo 2 de 2026.
              </p>
            </div>
          </div>

          {/* Interactive Rules Explorer */}
          <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                  Explorador de Normas Esenciales para el Aprendiz
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Filtra y consulta los derechos, deberes y prohibiciones vigentes bajo el Acuerdo 009 de 2024.
                </p>
              </div>

              {/* Interactive filter control */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold self-start sm:self-auto">
                <button
                  onClick={() => setSelectedCategory('todos')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'todos'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedCategory('derechos')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'derechos'
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Derechos
                </button>
                <button
                  onClick={() => setSelectedCategory('deberes')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'deberes'
                      ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-400 shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Deberes
                </button>
                <button
                  onClick={() => setSelectedCategory('prohibiciones')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'prohibiciones'
                      ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-400 shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Prohibiciones
                </button>
              </div>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQueryKey}
                onChange={(e) => setSearchQueryKey(e.target.value)}
                placeholder="Buscar por palabra clave (asistencia, uniforme, plagio, carné, descargos, incapacidad)..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>

            {/* 2-Column Split: List on Left, Active Detail on Right */}
            <div className="grid md:grid-cols-12 gap-6 pt-2">
              {/* Rules List */}
              <div className="md:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredRules.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No se encontraron normas con los criterios de búsqueda.
                  </p>
                ) : (
                  filteredRules.map((rule) => {
                    const isSelected = activeRule?.id === rule.id;
                    const badgeColor =
                      rule.category === 'derechos'
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : rule.category === 'deberes'
                        ? 'text-indigo-700 dark:text-indigo-400'
                        : 'text-rose-700 dark:text-rose-400';

                    return (
                      <div
                        key={rule.id}
                        onClick={() => setSelectedRuleId(rule.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#39A900] bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${badgeColor}`}>
                            {rule.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{rule.article}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{rule.title}</h4>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Active Rule In-depth View */}
              {activeRule && (
                <div className="md:col-span-7 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        {activeRule.article} · Categoría: {activeRule.category.toUpperCase()}
                      </div>
                      <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">{activeRule.title}</h4>
                    </div>
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        activeRule.category === 'derechos'
                          ? 'bg-emerald-500'
                          : activeRule.category === 'deberes'
                          ? 'bg-indigo-500'
                          : 'bg-rose-500'
                      }`}
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                        Texto Normativo Oficial (Acuerdo 009 de 2024)
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{activeRule.description}</p>
                    </div>

                    <div className="bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1 flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Aplicación Práctica y Recomendación SENA
                      </span>
                      <p className="text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                        {activeRule.practicalTip}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARTICULADO OFICIAL COMPLETO (ACUERDO 009 DE 2024) */}
      {activeMainTab === 'articulado_oficial' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Info */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Estructura y Articulado Oficial del Reglamento (Acuerdo 009 de 2024)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Consulta los 8 capítulos y 60 artículos que rigen la vida institucional y formativa de todo aprendiz SENA.
              </p>
            </div>

            {/* Quick Search in all articles */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQueryArticles}
                onChange={(e) => setSearchQueryArticles(e.target.value)}
                placeholder="Buscar artículo, término o causa..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
              {searchQueryArticles && (
                <button
                  onClick={() => setSearchQueryArticles('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* If search query is active, show matching results */}
          {searchedArticles ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Resultados de búsqueda ({searchedArticles.length} artículos encontrados)
                </span>
                <button
                  onClick={() => setSearchQueryArticles('')}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  Volver a vista por capítulos
                </button>
              </div>

              {searchedArticles.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">
                  No se encontraron artículos que coincidan con &ldquo;{searchQueryArticles}&rdquo;.
                </p>
              ) : (
                <div className="space-y-4">
                  {searchedArticles.map(({ capituloNum, capituloNombre, articulo }) => (
                    <div
                      key={`search-${articulo.articulo}`}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#00324D] text-white">
                            Art. {articulo.articulo}
                          </span>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {articulo.nombre}
                          </h4>
                        </div>
                        <span className="text-[11px] text-slate-500 font-semibold">
                          {capituloNum} · {capituloNombre}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                        {typeof articulo.contenido === 'string' && <p>{articulo.contenido}</p>}
                        {Array.isArray(articulo.contenido) && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {articulo.contenido.map((principio, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-[11px] text-slate-800 dark:text-slate-200"
                              >
                                {principio}
                              </span>
                            ))}
                          </div>
                        )}
                        {typeof articulo.contenido === 'object' && !Array.isArray(articulo.contenido) && (
                          <div className="space-y-2 mt-2">
                            {Object.entries(articulo.contenido).map(([key, val]) => (
                              <div key={key} className="bg-white dark:bg-slate-700 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600">
                                <strong className="text-emerald-700 dark:text-emerald-400">{key}:</strong>{' '}
                                <span>{val}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Chapters Navigation & Content View */
            <div className="grid md:grid-cols-12 gap-6">
              {/* Chapters list sidebar */}
              <div className="md:col-span-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-2 mb-2">
                  Capítulos del Reglamento (8)
                </span>
                {ACUERDO_009_2024.reglamento_anexo.capitulos.map((cap, idx) => {
                  const isSelected = selectedCapituloIndex === idx;
                  return (
                    <button
                      key={cap.capitulo}
                      onClick={() => {
                        setSelectedCapituloIndex(idx);
                        setExpandedArticle(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-[#00324D] dark:text-emerald-400 font-mono">
                          {cap.capitulo}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                          {cap.articulos.length} arts.
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                        {cap.nombre}
                      </h4>
                    </button>
                  );
                })}
              </div>

              {/* Chapter articles viewer */}
              <div className="md:col-span-8 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                    {currentCapitulo.capitulo}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {currentCapitulo.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Contiene {currentCapitulo.articulos.length} artículos oficiales vigentes. Haz clic en cada uno para ver o contraer su desarrollo.
                  </p>
                </div>

                <div className="space-y-3">
                  {currentCapitulo.articulos.map((art) => {
                    const isExpanded = expandedArticle === art.articulo;
                    return (
                      <div
                        key={art.articulo}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all bg-slate-50/50 dark:bg-slate-800/30"
                      >
                        <div
                          onClick={() => setExpandedArticle(isExpanded ? null : art.articulo)}
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                        >
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#00324D] text-white shrink-0">
                              Art. {art.articulo}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {art.nombre}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </div>

                        {/* Article body */}
                        <div className={`px-5 pb-5 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 ${isExpanded ? 'block' : 'block'}`}>
                          {typeof art.contenido === 'string' && (
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {art.contenido}
                            </p>
                          )}

                          {Array.isArray(art.contenido) && (
                            <div>
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                                Principios fundamentales aplicables:
                              </span>
                              <div className="grid sm:grid-cols-2 gap-2">
                                {art.contenido.map((principio, idx) => (
                                  <div
                                    key={idx}
                                    className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    <span>{principio}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {typeof art.contenido === 'object' && !Array.isArray(art.contenido) && (
                            <div className="space-y-2.5">
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                                Glosario de términos normativos del artículo:
                              </span>
                              {Object.entries(art.contenido).map(([k, v]) => (
                                <div
                                  key={k}
                                  className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700"
                                >
                                  <span className="font-bold text-xs text-emerald-700 dark:text-emerald-400 block mb-0.5">
                                    {k}
                                  </span>
                                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {v}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: NOVEDADES Y ENFOQUES 2024 */}
      {activeMainTab === 'novedades_2024' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-gradient-to-r from-emerald-900 to-[#00324D] text-white p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              ¿Por qué cambió el reglamento tras 12 años?
            </div>
            <h3 className="text-2xl font-extrabold">
              Las 6 Grandes Novedades del Acuerdo 009 de 2024
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed max-w-3xl">
              El Consejo Directivo Nacional del SENA actualizó el régimen institucional para alinearse con
              los estándares de derechos humanos, no discriminación, enfoque territorial y políticas anti-trámites.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                1. Enfoque Diferencial y Representatividad
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Se crean formalmente vocerías con enfoque diferencial en cada centro de formación:
                comunidades indígenas, pueblos afrocolombianos (NARP), población LGBTIQ+, comunidades campesinas,
                personas con discapacidad y mujeres (Art. 7).
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                2. Prevención Integral del Acoso Sexual (Ley 2365 de 2024)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Cero tolerancia contra violencias de género, acoso sexual presencial o digital (ciberacoso).
                Se tipifican como faltas gravísimas y se establecen medidas cautelares inmediatas para proteger a la víctima.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                3. Protección a Gestantes y Lactantes (Ley 2394 de 2024)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Garantías especiales de permanencia para aprendices gestantes, en periodo de lactancia materna
                y goce de licencias de paternidad, con flexibilidad pedagógica para evitar deserciones.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                4. Criterios Claros de Deserción y Asistencia
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Se definen con precisión las causales de deserción: tres (3) días consecutivos o cinco (5) días discontinuos
                de inasistencia presencial sin justificar; o veinte (20) días continuos de inactividad en plataformas LMS (Art. 30).
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                5. Agilización de Novedades y Reingreso
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Procedimientos anti-trámites digitales para traslado, aplazamiento (hasta 3 meses prorrogables por 3 más)
                y trámite de reingreso por una sola vez para aprendices que no alcanzaron a titularse (Arts. 18 al 25).
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                6. Fortalecimiento del Debido Proceso y Apelación
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Términos garantistas perentorios: 5 días hábiles para presentar descargos ante el Comité de Evaluación,
                derecho a solicitar segundo evaluador y recurso de reposición ante el Subdirector de Centro (Arts. 51 al 54).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MARCO LEGAL Y CONSIDERANDOS */}
      {activeMainTab === 'marco_juridico' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Official Agreement Meta Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Documento Jurídico Matriz
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {ACUERDO_009_2024.titulo_oficial}
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {ACUERDO_009_2024.diario_oficial}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong className="text-slate-700 dark:text-slate-300 block mb-1">Entidad Emisora:</strong>
                <span className="text-slate-600 dark:text-slate-400">{ACUERDO_009_2024.entidad_emisora}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong className="text-slate-700 dark:text-slate-300 block mb-1">Objeto del Acuerdo:</strong>
                <span className="text-slate-600 dark:text-slate-400">{ACUERDO_009_2024.objeto}</span>
              </div>
            </div>
          </div>

          {/* Artículos Resolutivos del Acuerdo */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              Artículos del Acuerdo 009 de 2024
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {ACUERDO_009_2024.articulos_acuerdo.map((art) => (
                <div
                  key={art.articulo}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00324D] dark:text-emerald-400">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                      Artículo {art.articulo}
                    </span>
                    <span>{art.nombre}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {art.contenido}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Considerandos Constitucionales y Legales */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#00324D] dark:text-emerald-400" />
              Fundamentos Constitucionales y Legales (Considerando)
            </h4>
            <div className="space-y-2.5">
              {ACUERDO_009_2024.considerando.map((cons, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">
                    §{idx + 1}
                  </span>
                  <span>{cons}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Firmantes Oficiales */}
          <div className="p-5 bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-center sm:text-left">
              <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase block text-[10px]">
                Presidente Consejo Directivo Nacional
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {ACUERDO_009_2024.firmantes.presidente}
              </span>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase block text-[10px]">
                Secretaria
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {ACUERDO_009_2024.firmantes.secretaria}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Module Completion */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            {isCompleted ? 'Módulo 3 Completado' : 'Finalizar Módulo de Reglamento'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Has revisado el nuevo Acuerdo 009 de 2024, tus derechos, deberes, prohibiciones y las garantías del debido proceso.
          </p>
        </div>
        <button
          onClick={() => {
            if (!isCompleted) {
              onComplete();
              playSuccessChime();
            }
          }}
          className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
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
