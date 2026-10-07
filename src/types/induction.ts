export interface ApprenticeProfile {
  fullName: string;
  documentType: string;
  documentNumber: string;
  trainingProgram: string;
  ficheNumber: string;
  regional: string;
  trainingCenter: string;
  joinedDate: string;
}

export interface InstitutionalValue {
  id: string;
  title: string;
  definition: string;
  example: string;
  iconName: string;
}

export interface SymbolElement {
  id: string;
  name: string;
  meaning: string;
  description: string;
}

export interface RegulationRule {
  id: string;
  category: 'derechos' | 'deberes' | 'prohibiciones';
  title: string;
  article: string;
  description: string;
  practicalTip: string;
}

export interface ProductiveAlternative {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  badgeText: string;
}

export interface WellnessDimension {
  id: string;
  title: string;
  description: string;
  programs: string[];
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  situation: string;
  context: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    regulationRef: string;
  }[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moduleSource: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Institucional' | 'Pedagógico' | 'Tecnológico' | 'Administrativo';
  definition: string;
  relatedModule?: string;
}

export interface InductionRecord {
  id: string;
  registeredAt: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  trainingProgram: string;
  ficheNumber: string;
  regional: string;
  trainingCenter: string;
  completedModulesCount: number;
  totalModulesCount: number;
  progressPercent: number;
  isExamPassed: boolean;
  examScore: number;
  status: 'Completada' | 'En Curso' | 'Certificada';
  verificationCode: string;
}

export type ModuleTab =
  | 'overview'
  | 'identity'
  | 'symbols'
  | 'regulations'
  | 'route'
  | 'wellness'
  | 'ecosystem'
  | 'simulator'
  | 'exam'
  | 'certificate'
  | 'glossary'
  | 'driveRecords';
