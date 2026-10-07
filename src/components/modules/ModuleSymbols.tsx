import React, { useState, useEffect } from 'react';
import { SYMBOLS_ELEMENTS, ANTHEM_LYRICS } from '../../data/senaContent';
import { SenaLogo } from '../SenaLogo';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  CheckCircle2,
  Shield,
  Flag,
  Sparkles,
  Music,
  Info,
} from 'lucide-react';
import {
  playAnthemMelody,
  stopAnthemMelody,
  isAnthemPlaying,
  playSuccessChime,
} from '../../utils/audioSynth';

interface ModuleSymbolsProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleSymbols: React.FC<ModuleSymbolsProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedShieldElement, setSelectedShieldElement] = useState<string>('rueda');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<'escudo' | 'bandera' | 'logosimbolo' | 'himno'>('escudo');

  useEffect(() => {
    return () => {
      stopAnthemMelody();
    };
  }, []);

  const handleToggleAnthem = () => {
    if (isAnthemPlaying()) {
      stopAnthemMelody();
      setIsPlayingAnthem(false);
      setCurrentLyricIndex(-1);
    } else {
      setIsPlayingAnthem(true);
      playAnthemMelody(
        (lyricIdx) => {
          setCurrentLyricIndex(lyricIdx);
        },
        () => {
          setIsPlayingAnthem(false);
          setCurrentLyricIndex(-1);
        }
      );
    }
  };

  const activeElement =
    SYMBOLS_ELEMENTS.find((el) => el.id === selectedShieldElement) || SYMBOLS_ELEMENTS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Module Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] p-7 sm:p-9 text-white overflow-hidden shadow-xl border border-slate-700/50 dark:border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Módulo 2</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Identidad Gráfica y Sonora</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Símbolos Institucionales del SENA
          </h2>
          <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Nuestros símbolos representan el trabajo, la ciencia, el comercio, el campo y la dignidad
            humana en toda la geografía colombiana. Conócelos a fondo y canta con orgullo nuestro himno institucional.
          </p>
        </div>
      </div>

      {/* Segmented Symbol Selector */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto border border-slate-200/60 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('escudo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'escudo'
              ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>El Escudo y sus 3 Sectores</span>
        </button>

        <button
          onClick={() => setActiveTab('bandera')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bandera'
              ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Flag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>La Bandera Institucional</span>
        </button>

        <button
          onClick={() => setActiveTab('logosimbolo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'logosimbolo'
              ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>El Logo-símbolo (Hombre en Marcha)</span>
        </button>

        <button
          onClick={() => setActiveTab('himno')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'himno'
              ? 'bg-white dark:bg-[#152e42] text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Music className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>El Himno del SENA (Audio y Letra)</span>
        </button>
      </div>

      {/* Tab 1: Escudo SENA */}
      {activeTab === 'escudo' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                El Escudo del SENA y los 3 Sectores Económicos
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                El escudo oficial refleja los tres sectores productivos de la economía colombiana
                donde el SENA capacita a sus aprendices. Haz clic en cada elemento para explorar su significado:
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
              Explorador interactivo de sectores
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Visual Interactive Graphic of the Shield */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl relative">
              <div className="w-64 h-64 relative flex items-center justify-center">
                {/* SVG Shield Representation */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                  {/* Outer shield frame */}
                  <path
                    d="M100 15 C150 15 175 45 175 90 C175 145 100 185 100 185 C100 185 25 145 25 90 C25 45 50 15 100 15 Z"
                    fill="#FFFFFF"
                    stroke="#00324D"
                    strokeWidth="4"
                  />
                  {/* Division line */}
                  <path d="M100 25 V175" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M35 100 H165" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Sector 1: Gear (Industria) - Top Left */}
                  <g
                    onClick={() => setSelectedShieldElement('rueda')}
                    className="cursor-pointer transition-transform hover:scale-110"
                    style={{ transformOrigin: '70px 65px' }}
                  >
                    <circle
                      cx="70"
                      cy="65"
                      r="24"
                      fill={selectedShieldElement === 'rueda' ? '#39A900' : '#E2E8F0'}
                      stroke="#00324D"
                      strokeWidth="2"
                    />
                    <circle cx="70" cy="65" r="9" fill="#FFFFFF" stroke="#00324D" strokeWidth="2" />
                    {/* Gear teeth */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <rect
                        key={i}
                        x="67.5"
                        y="36"
                        width="5"
                        height="8"
                        rx="1"
                        fill="#00324D"
                        transform={`rotate(${angle} 70 65)`}
                      />
                    ))}
                  </g>

                  {/* Sector 2: Caduceus (Comercio y Servicios) - Top Right */}
                  <g
                    onClick={() => setSelectedShieldElement('caduceo')}
                    className="cursor-pointer transition-transform hover:scale-110"
                    style={{ transformOrigin: '130px 65px' }}
                  >
                    <circle
                      cx="130"
                      cy="65"
                      r="24"
                      fill={selectedShieldElement === 'caduceo' ? '#00324D' : '#E2E8F0'}
                      stroke="#00324D"
                      strokeWidth="2"
                    />
                    {/* Staff */}
                    <line x1="130" y1="46" x2="130" y2="84" stroke="#FFFFFF" strokeWidth="3" />
                    <circle cx="130" cy="46" r="3" fill="#FFFFFF" />
                    {/* Wings & serpents */}
                    <path
                      d="M120 56 Q130 52 140 56 M122 66 Q130 62 138 66"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                  </g>

                  {/* Sector 3: Coffee bean / Spike (Agropecuario) - Bottom Center */}
                  <g
                    onClick={() => setSelectedShieldElement('cafe-espiga')}
                    className="cursor-pointer transition-transform hover:scale-110"
                    style={{ transformOrigin: '100px 135px' }}
                  >
                    <circle
                      cx="100"
                      cy="135"
                      r="25"
                      fill={selectedShieldElement === 'cafe-espiga' ? '#007A33' : '#E2E8F0'}
                      stroke="#00324D"
                      strokeWidth="2"
                    />
                    {/* Coffee bean shape */}
                    <ellipse
                      cx="100"
                      cy="135"
                      rx="14"
                      ry="9"
                      fill="#FFFFFF"
                      transform="rotate(-25 100 135)"
                    />
                    <path
                      d="M90 140 Q100 135 110 130"
                      stroke="#007A33"
                      strokeWidth="2"
                      fill="none"
                    />
                  </g>
                </svg>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Haz clic en los símbolos del escudo para ver sus detalles
              </p>
            </div>

            {/* Elements Description & Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid gap-2.5">
                {SYMBOLS_ELEMENTS.map((el) => {
                  const isSelected = selectedShieldElement === el.id;
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedShieldElement(el.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f202d] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full shrink-0 ${
                              el.id === 'rueda'
                                ? 'bg-[#39A900]'
                                : el.id === 'caduceo'
                                ? 'bg-[#00324D] dark:bg-sky-400'
                                : 'bg-[#007A33]'
                            }`}
                          />
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{el.name}</h4>
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {el.meaning}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                        {el.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Element In-depth explanation */}
              <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center gap-2 mb-1 text-slate-900 dark:text-white font-bold text-sm">
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Enfoque formativo: {activeElement.meaning}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  En este sector, el SENA diseña programas técnicos, tecnológicos y especializaciones
                  acorde a las demandas reales de las empresas colombianas, garantizando alta empleabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bandera Institucional */}
      {activeTab === 'bandera' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-2xl">
              {/* Flag representation */}
              <div className="w-72 h-48 bg-white border-2 border-slate-300 dark:border-slate-600 shadow-md rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white" />
                <div className="relative z-10 flex flex-col items-center">
                  <SenaLogo className="w-20 h-20 text-[#39A900]" />
                  <span className="text-xs font-black text-[#00324D] tracking-widest mt-1">
                    SENA
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                Bandera Oficial: Proporción 2:3, fondo blanco puro con el logotipo en el centro
              </p>
            </div>

            <div className="md:col-span-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Significado de la Bandera</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                La bandera del SENA se destaca por su sobriedad y pureza. Consiste en un lienzo de color{' '}
                <strong className="text-slate-900 dark:text-white">blanco puro</strong> que lleva en su centro el escudo o logotipo de la institución.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                    El Color Blanco: Paz, Pureza y Libertad
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Representa la tranquilidad, la transparencia en el servicio público, la concordia y
                    el compromiso del SENA con la construcción de paz duradera en todos los rincones de Colombia.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                    El Emblema Central
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Identifica la unión de la formación integral con los sectores productivos que
                    impulsan el crecimiento del país.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Logo-símbolo */}
      {activeTab === 'logosimbolo' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-[#00324D] dark:bg-[#061420] rounded-2xl text-white border border-slate-700/50">
              <SenaLogo className="w-32 h-32" light />
              <div className="mt-4 text-center">
                <span className="text-2xl font-black tracking-tight text-white block">SENA</span>
                <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  El Hombre en Marcha
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                El Logo-símbolo: El Ser Humano que se Proyecta
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Creado en la administración del fundador Rodolfo Martínez Tono, el logo-símbolo representa
                la síntesis visual de la misión transformadora del SENA:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3.5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                    La Cabeza / El Sol del Conocimiento
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    El círculo superior representa la mente, la inteligencia, la conciencia crítica y
                    la iluminación a través del conocimiento técnico y científico.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                    El Cuerpo Dinámico y el Paso Firme
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    La figura humana camina hacia adelante con energía y seguridad, superando las
                    dificultades y conquistando metas a través del trabajo productivo y digno.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#07131d] border border-slate-200/80 dark:border-slate-800 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                    La Base Horizontal
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Simboliza la tierra colombiana, la estabilidad institucional y el soporte firme de
                    valores éticos sobre el cual se edifica la formación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Himno del SENA (Interactive Audio & Lyrics) */}
      {activeTab === 'himno' && (
        <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <Music className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Himno del Servicio Nacional de Aprendizaje
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Letra: <strong className="text-slate-700 dark:text-slate-200">{ANTHEM_LYRICS.authorLyrics}</strong> · Música:{' '}
                <strong className="text-slate-700 dark:text-slate-200">{ANTHEM_LYRICS.authorMusic}</strong>
              </p>
            </div>

            {/* Audio Melodic Player Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleAnthem}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
                  isPlayingAnthem
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#39A900] hover:bg-[#2e8800] text-white'
                }`}
              >
                {isPlayingAnthem ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>Detener Melodía</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Reproducir Melodía Institucional</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {isPlayingAnthem && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-pulse">
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Reproduciendo melodía marcial en Web Audio API. Sigue el coro destacado a continuación:</span>
                <span className="flex items-center gap-1 font-mono text-[11px] tracking-wider font-bold">
                  <span className="inline-block w-1.5 h-3 bg-emerald-600 animate-bounce"></span>
                  <span className="inline-block w-1.5 h-4 bg-emerald-500 animate-bounce delay-75"></span>
                  <span className="inline-block w-1.5 h-2 bg-emerald-700 animate-bounce delay-150"></span>
                </span>
              </div>
            </div>
          )}

          {/* Lyrics Container */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Coro (Highlighted) */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-[#07131d] border-2 border-emerald-500/40 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Coro Principal (Se repite tras cada estrofa)
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">MARCIAL</span>
              </div>
              <div className="space-y-2 text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {ANTHEM_LYRICS.chorus.map((line, idx) => (
                  <p
                    key={idx}
                    className={`transition-colors py-0.5 px-2 rounded-lg ${
                      currentLyricIndex === idx
                        ? 'bg-emerald-200 dark:bg-emerald-800/60 text-emerald-950 dark:text-emerald-100 font-bold'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                Se entona con respeto y entusiasmo de pie en actos solemnes, ceremonias de inducción y graduación.
              </div>
            </div>

            {/* Stanzas */}
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
              {ANTHEM_LYRICS.stanzas.map((stanza) => (
                <div
                  key={stanza.number}
                  className="p-4 bg-white dark:bg-[#0f202d] border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2 shadow-2xs"
                >
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Estrofa {stanza.number}
                  </span>
                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                    {stanza.lines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Module Completion Action */}
      <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            {isCompleted ? 'Módulo 2 Completado' : 'Finalizar Módulo de Símbolos'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Has explorado el escudo, la bandera, el logo-símbolo y el himno del SENA.
          </p>
        </div>
        <button
          onClick={() => {
            if (!isCompleted) {
              onComplete();
              playSuccessChime();
            }
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
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
