import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Ensure singleton Firebase App instance matching auth
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface ApprenticeExamResult {
  fullName: string;
  documentType: string;
  documentNumber: string;
  trainingProgram: string;
  ficheNumber: string;
  regional: string;
  trainingCenter: string;
  correctAnswers: number;
  totalQuestions: number;
  scorePercent: number; // 0 to 100
  timeElapsed: number; // in seconds
  mistakes: number;
  gamifiedScore: number;
  isPassed: boolean;
  registeredAt: string;
  verificationCode: string;
}

/**
 * Saves a new exam result to Firebase Firestore.
 * Fallback to local storage if Firestore fails.
 */
export async function saveApprenticeResult(result: ApprenticeExamResult): Promise<void> {
  const timestamp = new Date().toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  
  const record = {
    ...result,
    registeredAt: result.registeredAt || timestamp,
  };

  try {
    const collRef = collection(db, 'apprentice_scores');
    await addDoc(collRef, record);
    console.log('Record saved to Firestore successfully.');
  } catch (error) {
    console.error('Error saving to Firestore, writing to localStorage instead:', error);
  }

  // Always append to local storage ranking cache for safety
  try {
    const stored = localStorage.getItem('sena_gamified_leaderboard_v1');
    const list: ApprenticeExamResult[] = stored ? JSON.parse(stored) : [];
    list.push(record);
    // Sort and keep top 100
    list.sort((a, b) => b.gamifiedScore - a.gamifiedScore);
    localStorage.setItem('sena_gamified_leaderboard_v1', JSON.stringify(list.slice(0, 100)));
  } catch (e) {
    console.error('Local Storage save failed:', e);
  }
}

/**
 * Fetches the top 50 apprentice scores from Firestore to show on the leaderboard.
 * Merges with local storage cache if offline or query fails.
 */
export async function fetchLeaderboard(): Promise<ApprenticeExamResult[]> {
  try {
    const collRef = collection(db, 'apprentice_scores');
    const q = query(collRef, orderBy('gamifiedScore', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    const results: ApprenticeExamResult[] = [];
    snapshot.forEach((doc) => {
      results.push(doc.data() as ApprenticeExamResult);
    });
    
    if (results.length > 0) {
      // Refresh local cache with latest Firestore records
      localStorage.setItem('sena_gamified_leaderboard_v1', JSON.stringify(results));
      return results;
    }
  } catch (error) {
    console.warn('Could not load leaderboard from Firestore, loading local cache:', error);
  }

  // Fallback to local storage
  try {
    const stored = localStorage.getItem('sena_gamified_leaderboard_v1');
    if (stored) {
      const list: ApprenticeExamResult[] = JSON.parse(stored);
      return list.sort((a, b) => b.gamifiedScore - a.gamifiedScore);
    }
  } catch (e) {
    console.error(e);
  }
  
  return [];
}
