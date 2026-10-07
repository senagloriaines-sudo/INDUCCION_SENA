// Web Audio API Synthesizer for SENA Institutional Anthem and Sound Effects

let audioCtx: AudioContext | null = null;
let anthemPlaying = false;
let anthemTimeouts: number[] = [];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play success chime for quizzes and badges
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Arpeggio C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    });

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

// Play feedback beep for incorrect selection
export function playIncorrectBeep() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Ignore
  }
}

// Melody notes for SENA Anthem march chorus ("Estudiantes del SENA adelante, por Colombia luchad con amor...")
// Notes in Hz, with duration in ms
interface Note {
  f: number;
  d: number;
  lyricIdx?: number;
}

// Frequencies
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.0;
const A4 = 440.0;
const Bb4 = 466.16;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const F5 = 698.46;

// Brass-style martial fanfare of SENA anthem opening:
const anthemScore: Note[] = [
  // "Es-tu-dian-tes del SE-NA a-de-lan-te"
  { f: C4, d: 240, lyricIdx: 0 },
  { f: E4, d: 240, lyricIdx: 0 },
  { f: G4, d: 360, lyricIdx: 0 },
  { f: G4, d: 240, lyricIdx: 0 },
  { f: A4, d: 240, lyricIdx: 0 },
  { f: G4, d: 240, lyricIdx: 0 },
  { f: E4, d: 360, lyricIdx: 0 },
  { f: C4, d: 480, lyricIdx: 0 },

  // "por Co-lom-bia lu-chad con a-mor"
  { f: D4, d: 240, lyricIdx: 1 },
  { f: F4, d: 240, lyricIdx: 1 },
  { f: A4, d: 360, lyricIdx: 1 },
  { f: G4, d: 240, lyricIdx: 1 },
  { f: F4, d: 240, lyricIdx: 1 },
  { f: E4, d: 480, lyricIdx: 1 },

  // "con a-mor a la pa-tria y al tra-ba-jo"
  { f: C5, d: 300, lyricIdx: 2 },
  { f: B4, d: 240, lyricIdx: 2 },
  { f: A4, d: 240, lyricIdx: 2 },
  { f: G4, d: 360, lyricIdx: 2 },
  { f: F4, d: 240, lyricIdx: 2 },
  { f: E4, d: 240, lyricIdx: 2 },
  { f: D4, d: 400, lyricIdx: 2 },

  // "sus hi-jos triun-fa-rán con ho-nor"
  { f: G4, d: 280, lyricIdx: 3 },
  { f: A4, d: 240, lyricIdx: 3 },
  { f: B4, d: 240, lyricIdx: 3 },
  { f: C5, d: 600, lyricIdx: 3 },
];

export function playAnthemMelody(
  onLyricHighlight?: (index: number) => void,
  onComplete?: () => void
): boolean {
  if (anthemPlaying) {
    stopAnthemMelody();
    return false;
  }

  try {
    const ctx = getAudioContext();
    anthemPlaying = true;
    anthemTimeouts = [];

    let currentOffset = 0.1;

    anthemScore.forEach((note, index) => {
      const startTime = ctx.currentTime + currentOffset;
      const durationSec = (note.d / 1000) * 0.95;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Brass-like fanfare tone using triangle + slight sub harmonic
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + durationSec);

      if (note.lyricIdx !== undefined && onLyricHighlight) {
        const timeoutId = window.setTimeout(() => {
          if (anthemPlaying) {
            onLyricHighlight(note.lyricIdx ?? 0);
          }
        }, currentOffset * 1000);
        anthemTimeouts.push(timeoutId);
      }

      currentOffset += note.d / 1000;
    });

    const finishTimeout = window.setTimeout(() => {
      anthemPlaying = false;
      if (onComplete) onComplete();
    }, currentOffset * 1000);
    anthemTimeouts.push(finishTimeout);

    return true;
  } catch {
    anthemPlaying = false;
    return false;
  }
}

export function stopAnthemMelody() {
  anthemPlaying = false;
  anthemTimeouts.forEach((id) => clearTimeout(id));
  anthemTimeouts = [];
}

export function isAnthemPlaying(): boolean {
  return anthemPlaying;
}
