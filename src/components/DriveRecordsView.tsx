import React, { useState, useEffect, useMemo } from 'react';
import { ApprenticeProfile, InductionRecord } from '../types/induction';
import { GoogleSignInButton } from './GoogleSignInButton';
import { ConfirmSyncModal } from './ConfirmSyncModal';
import {
  findOrCreateInductionSpreadsheet,
  fetchSpreadsheetRecords,
  appendApprenticeRecord,
  SpreadsheetInfo,
  INDUCTION_SHEET_TITLE,
} from '../services/driveSheetsService';
import { fetchLeaderboard, ApprenticeExamResult } from '../services/firebaseService';
import {
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  Award,
  AlertTriangle,
  UserCheck,
  Check,
  Building,
  GraduationCap,
  Sparkles,
  LogOut,
  Database,
  CloudUpload,
} from 'lucide-react';
import { User } from 'firebase/auth';

interface DriveRecordsViewProps {
  user: User | null;
  accessToken: string | null;
  isLoggingIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  currentProfile: ApprenticeProfile;
  completedModulesCount: number;
  totalModulesCount: number;
  isExamPassed: boolean;
  examScore: number;
  onSelectTab: (tab: any) => void;
}

export const DriveRecordsView: React.FC<DriveRecordsViewProps> = ({
  user,
  accessToken,
  isLoggingIn,
  onLogin,
  onLogout,
  currentProfile,
  completedModulesCount,
  totalModulesCount,
  isExamPassed,
  examScore,
  onSelectTab,
}) => {
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetInfo | null>(null);
  const [records, setRecords] = useState<InductionRecord[]>([]);
  const [firestoreRecords, setFirestoreRecords] = useState<ApprenticeExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [syncProgressMsg, setSyncProgressMsg] = useState<string | null>(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Completada' | 'En Curso' | 'Certificada'>('all');

  // Confirmation Modal state for mutating Google Drive
  const [pendingRecord, setPendingRecord] = useState<InductionRecord | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Manual Add Form Modal state
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    fullName: '',
    documentType: 'Cédula de Ciudadanía (C.C.)',
    documentNumber: '',
    trainingProgram: currentProfile.trainingProgram,
    ficheNumber: currentProfile.ficheNumber,
    regional: currentProfile.regional,
    trainingCenter: currentProfile.trainingCenter,
    completedModulesCount: 7,
    progressPercent: 100,
    isExamPassed: true,
    examScore: 90,
  });

  // Load spreadsheet info and rows when accessToken is present
  const loadDriveData = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const sheetInfo = await findOrCreateInductionSpreadsheet(token);
      setSpreadsheet(sheetInfo);

      const [rows, fsRecords] = await Promise.all([
        fetchSpreadsheetRecords(token, sheetInfo.id),
        fetchLeaderboard(),
      ]);
      setRecords(rows);
      setFirestoreRecords(fsRecords);
    } catch (err: any) {
      console.error('Error loading Google Drive data:', err);
      if (err.message === 'AUTH_EXPIRED') {
        setError('Tu sesión de Google expiró. Por favor vuelve a conectar tu cuenta.');
      } else {
        setError(err.message || 'Error al comunicarse con Google Drive');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadDriveData(accessToken);
    } else {
      setSpreadsheet(null);
      setRecords([]);
      setFirestoreRecords([]);
    }
  }, [accessToken]);

  // Compute status for the active apprentice
  const currentProgressPercent = Math.round((completedModulesCount / totalModulesCount) * 100);
  const currentApprenticeStatus: 'Completada' | 'En Curso' | 'Certificada' = isExamPassed
    ? 'Certificada'
    : completedModulesCount === totalModulesCount
    ? 'Completada'
    : 'En Curso';

  const currentApprenticeRecord: InductionRecord = {
    id: `curr-${Date.now()}`,
    registeredAt: new Date().toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    fullName: currentProfile.fullName,
    documentType: currentProfile.documentType,
    documentNumber: currentProfile.documentNumber,
    trainingProgram: currentProfile.trainingProgram,
    ficheNumber: currentProfile.ficheNumber,
    regional: currentProfile.regional,
    trainingCenter: currentProfile.trainingCenter,
    completedModulesCount,
    totalModulesCount,
    progressPercent: currentProgressPercent,
    isExamPassed,
    examScore,
    status: currentApprenticeStatus,
    verificationCode: `SENA-IND-2026-${currentProfile.ficheNumber}-${currentProfile.documentNumber.slice(-4)}`,
  };

  // Check if active profile is already registered in the sheet
  const isAlreadyRegistered = useMemo(() => {
    return records.some(
      (r) =>
        r.documentNumber.trim() === currentProfile.documentNumber.trim() &&
        r.ficheNumber.trim() === currentProfile.ficheNumber.trim()
    );
  }, [records, currentProfile]);

  // Open confirmation dialog before writing to Drive
  const handleInitiateSync = (recordToSync: InductionRecord) => {
    setPendingRecord(recordToSync);
    setIsConfirmModalOpen(true);
  };

  // Perform confirmed Google Sheets append
  const handleConfirmSync = async () => {
    if (!accessToken || !spreadsheet || !pendingRecord) return;
    setIsSaving(true);
    try {
      await appendApprenticeRecord(accessToken, spreadsheet.id, pendingRecord);
      setIsConfirmModalOpen(false);
      setPendingRecord(null);
      setSuccessToast(
        `¡Aprendiz ${pendingRecord.fullName} registrado con éxito en Google Drive!`
      );
      setTimeout(() => setSuccessToast(null), 5000);

      // Reload rows from the spreadsheet
      await loadDriveData(accessToken);
    } catch (err: any) {
      console.error('Error saving record to Google Sheets:', err);
      alert('Error al guardar en Google Drive: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Compare firestore records against sheet records to find pending syncs
  const unsyncedFirestoreRecords = useMemo(() => {
    return firestoreRecords.filter(
      (fs) =>
        !records.some(
          (r) =>
            r.documentNumber.trim() === fs.documentNumber.trim() &&
            r.ficheNumber.trim() === fs.ficheNumber.trim()
        )
    );
  }, [firestoreRecords, records]);

  // Perform batch synchronization of all unsynced Firestore records to Google Sheets
  const handleSyncAllFirestoreRecords = async () => {
    if (!accessToken || !spreadsheet || unsyncedFirestoreRecords.length === 0) return;
    setIsSyncingAll(true);
    setError(null);
    let successCount = 0;

    try {
      for (let i = 0; i < unsyncedFirestoreRecords.length; i++) {
        const fsItem = unsyncedFirestoreRecords[i];
        setSyncProgressMsg(`Sincronizando ${i + 1} de ${unsyncedFirestoreRecords.length}: ${fsItem.fullName}...`);

        const verificationCode = fsItem.verificationCode || `SENA-IND-2026-${fsItem.ficheNumber}-${fsItem.documentNumber.slice(-4)}`;

        const newRecord: InductionRecord = {
          id: `fs-sync-${Date.now()}-${i}`,
          registeredAt: fsItem.registeredAt,
          fullName: fsItem.fullName,
          documentType: fsItem.documentType,
          documentNumber: fsItem.documentNumber,
          trainingProgram: fsItem.trainingProgram,
          ficheNumber: fsItem.ficheNumber,
          regional: fsItem.regional,
          trainingCenter: fsItem.trainingCenter,
          completedModulesCount: 7,
          totalModulesCount: 7,
          progressPercent: 100,
          isExamPassed: fsItem.isPassed,
          examScore: fsItem.scorePercent,
          status: fsItem.isPassed ? 'Certificada' : 'Completada',
          verificationCode,
        };

        await appendApprenticeRecord(accessToken, spreadsheet.id, newRecord);
        successCount++;
      }

      setSuccessToast(`¡Se han sincronizado con éxito ${successCount} registros de la base de datos en Google Sheets!`);
      setTimeout(() => setSuccessToast(null), 5000);
      await loadDriveData(accessToken);
    } catch (err: any) {
      console.error('Error in batch sync:', err);
      setError(`Error en la sincronización por lotes: ${err.message}. Se lograron sincronizar ${successCount} registros.`);
    } finally {
      setIsSyncingAll(false);
      setSyncProgressMsg(null);
    }
  };

  // Handle manual apprentice addition
  const handleSaveManual = () => {
    const status: 'Completada' | 'En Curso' | 'Certificada' = manualForm.isExamPassed
      ? 'Certificada'
      : manualForm.completedModulesCount === 7
      ? 'Completada'
      : 'En Curso';

    const newRecord: InductionRecord = {
      id: `manual-${Date.now()}`,
      registeredAt: new Date().toLocaleString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      fullName: manualForm.fullName.trim() || 'Aprendiz Registrado',
      documentType: manualForm.documentType,
      documentNumber: manualForm.documentNumber.trim() || 'Sin número',
      trainingProgram: manualForm.trainingProgram,
      ficheNumber: manualForm.ficheNumber,
      regional: manualForm.regional,
      trainingCenter: manualForm.trainingCenter,
      completedModulesCount: manualForm.completedModulesCount,
      totalModulesCount: 7,
      progressPercent: manualForm.progressPercent,
      isExamPassed: manualForm.isExamPassed,
      examScore: manualForm.examScore,
      status,
      verificationCode: `SENA-IND-2026-${manualForm.ficheNumber}-${manualForm.documentNumber.slice(-4)}`,
    };

    setIsManualModalOpen(false);
    handleInitiateSync(newRecord);
  };

  // Filtered rows
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        searchQuery === '' ||
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.documentNumber.includes(searchQuery) ||
        r.ficheNumber.includes(searchQuery) ||
        r.trainingProgram.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || r.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  // Statistics
  const totalCount = records.length;
  const certifiedCount = records.filter((r) => r.isExamPassed).length;
  const completedCount = records.filter(
    (r) => r.completedModulesCount === 7 && !r.isExamPassed
  ).length;
  const uniqueFiches = new Set(records.map((r) => r.ficheNumber)).size;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Alert */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-white/80 hover:text-white text-xs font-bold px-2 py-1 rounded"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#00324D] via-[#004766] to-[#002438] dark:from-[#06121a] dark:via-[#0c1f2b] dark:to-[#07141d] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-emerald-400/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Google Drive & Sheets Oficial</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Vigencia 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Libro de Registro de Aprendices en Google Drive
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Lleva el control de todos los aprendices que han presentado o completado su inducción
              institucional en una hoja de cálculo almacenada en tu cuenta de Google Drive.
            </p>
          </div>

          {/* Account connection status */}
          <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 min-w-[260px]">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-emerald-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-sm">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'G'}
                    </div>
                  )}
                  <div className="truncate">
                    <span className="block text-xs font-bold text-white truncate">
                      {user.displayName || 'Google Account'}
                    </span>
                    <span className="block text-[11px] text-emerald-300 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Conectado a Drive
                  </span>
                  <button
                    onClick={onLogout}
                    className="text-xs font-semibold text-rose-300 hover:text-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Desconectar cuenta"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center sm:text-left">
                <span className="block text-xs font-bold text-white">
                  Conectar cuenta de Google
                </span>
                <p className="text-[11px] text-slate-300">
                  Para guardar y sincronizar la hoja en tu Google Drive.
                </p>
                <GoogleSignInButton
                  onClick={onLogin}
                  isLoading={isLoggingIn}
                  label="Conectar con Google"
                  className="w-full justify-center shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {!user ? (
        /* Not logged in promotional / prompt state */
        <div className="bg-white dark:bg-[#0f202d] rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-800 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Conecta tu Google Drive para iniciar el registro
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Al conectar tu cuenta de Google, crearemos o vincularemos una hoja de cálculo
              llamada <strong>"{INDUCTION_SHEET_TITLE}"</strong> en tu unidad de Drive. Podrás
              consultar y registrar los aprendices en tiempo real.
            </p>
          </div>
          <div className="flex justify-center">
            <GoogleSignInButton
              onClick={onLogin}
              isLoading={isLoggingIn}
              label="Iniciar sesión con Google"
            />
          </div>
        </div>
      ) : (
        /* Authenticated View */
        <div className="space-y-6">
          {/* Linked Spreadsheet Card & Actions */}
          <div className="bg-white dark:bg-[#0f202d] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#39A900]/15 text-[#39A900] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {spreadsheet?.name || INDUCTION_SHEET_TITLE}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Sincronizado
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Archivo activo en tu unidad de Google Drive (hoja: Registro_Aprendices)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {spreadsheet?.webViewLink && (
                <a
                  href={spreadsheet.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-[#39A900] dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir Hoja de Cálculo en Google Drive</span>
                </a>
              )}

              <button
                onClick={() => accessToken && loadDriveData(accessToken)}
                disabled={isLoading}
                className="px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                title="Actualizar datos desde Google Sheets"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>

              <button
                onClick={() => setIsManualModalOpen(true)}
                className="px-4 py-2.5 bg-[#00324D] dark:bg-[#1a384e] hover:bg-[#002438] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Registrar Otro Aprendiz</span>
              </button>
            </div>
          </div>

          {/* Quick Register Active Apprentice Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/50 dark:from-[#0c1f2d] dark:via-[#10293b] dark:to-[#0c1f2d] rounded-3xl p-6 border-2 border-emerald-300/80 dark:border-emerald-700/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Aprendiz en Curso en este Dispositivo
                </span>
                {isAlreadyRegistered && (
                  <>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 font-bold">·</span>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" /> Ya figura en la hoja
                    </span>
                  </>
                )}
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {currentProfile.fullName}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Doc: <strong>{currentProfile.documentType} {currentProfile.documentNumber}</strong> · Ficha: <strong>{currentProfile.ficheNumber}</strong> · Progreso:{' '}
                <strong>{completedModulesCount}/7 ({currentProgressPercent}%)</strong> · Examen:{' '}
                <strong>{isExamPassed ? `Aprobado (${examScore}%)` : 'Pendiente'}</strong>
              </p>
            </div>

            <button
              onClick={() => handleInitiateSync(currentApprenticeRecord)}
              disabled={isLoading || isSaving}
              className="w-full md:w-auto px-6 py-3 bg-[#39A900] hover:bg-[#2e8800] active:scale-95 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>
                {isAlreadyRegistered
                  ? 'Registrar Nuevo Envío / Actualización en Drive'
                  : 'Registrar este Aprendiz en Google Drive'}
              </span>
            </button>
          </div>

          {/* Stats Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#0f202d] rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                Total Registrados
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                {totalCount}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">en Google Sheets</span>
            </div>

            <div className="bg-white dark:bg-[#0f202d] rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                Certificados Aprobados
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                {certifiedCount}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {totalCount > 0 ? `${Math.round((certifiedCount / totalCount) * 100)}% del total` : '0%'}
              </span>
            </div>

            <div className="bg-white dark:bg-[#0f202d] rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                Inducción en Curso
              </span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
                {totalCount - certifiedCount}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">avanzando módulos</span>
            </div>

            <div className="bg-white dark:bg-[#0f202d] rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                Fichas de Formación
              </span>
              <span className="text-2xl font-black text-sky-600 dark:text-sky-400 mt-1 block">
                {uniqueFiches}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">fichas diferentes</span>
            </div>
          </div>

          {/* Smart DB Synchronizer Panel */}
          <div className="bg-white dark:bg-[#0c1a26] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-display">
                  <Database className="w-5 h-5 text-emerald-500" />
                  <span>Sincronizador Inteligente de Base de Datos (Firestore)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compara los exámenes rendidos por los aprendices en la base de datos central con los registrados en la hoja de Google Sheets.
                </p>
              </div>

              {unsyncedFirestoreRecords.length > 0 && (
                <button
                  onClick={handleSyncAllFirestoreRecords}
                  disabled={isSyncingAll || isLoading || !accessToken}
                  className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shrink-0 uppercase tracking-wider"
                >
                  <CloudUpload className={`w-4.5 h-4.5 ${isSyncingAll ? 'animate-bounce' : ''}`} />
                  <span>Sincronizar Lote ({unsyncedFirestoreRecords.length})</span>
                </button>
              )}
            </div>

            {/* Sync Status Info */}
            {isSyncingAll && syncProgressMsg && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-2xl flex items-center gap-3 animate-pulse text-xs font-bold">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                <span>{syncProgressMsg}</span>
              </div>
            )}

            {unsyncedFirestoreRecords.length === 0 ? (
              <div className="flex items-center gap-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 p-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Todos los exámenes de la base de datos central de aprendices están perfectamente sincronizados con Google Sheets.</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-2xl">
                  <AlertTriangle className="w-4.5 h-4.5 shrink-0" />
                  <span>Tienes {unsyncedFirestoreRecords.length} evaluaciones pendientes de registrar en tu sábana de notas de Google Drive.</span>
                </div>

                <div className="max-h-40 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl divide-y divide-slate-50 dark:divide-slate-800/50">
                  {unsyncedFirestoreRecords.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <div className="truncate max-w-[200px] sm:max-w-xs">
                        <span className="font-extrabold text-slate-900 dark:text-white block">{item.fullName}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">Ficha: {item.ficheNumber} · {item.trainingProgram}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <span className="font-mono font-bold text-slate-500 dark:text-slate-400">Nota: {item.scorePercent}%</span>
                        <span className="text-[10px] font-extrabold tracking-wider bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-md">PENDIENTE</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table Container & Search/Filter Controls */}
          <div className="bg-white dark:bg-[#0f202d] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            {/* Table Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por aprendiz, documento o ficha..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#091520] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto text-xs font-medium">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Todos ({totalCount})
                </button>
                <button
                  onClick={() => setStatusFilter('Certificada')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'Certificada'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Certificados ({certifiedCount})
                </button>
                <button
                  onClick={() => setStatusFilter('En Curso')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'En Curso'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  En Curso ({records.filter((r) => r.status === 'En Curso').length})
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#0c1822] border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                    <th className="py-3 px-4">Fecha Registro</th>
                    <th className="py-3 px-4">Aprendiz</th>
                    <th className="py-3 px-4">Documento</th>
                    <th className="py-3 px-4">Ficha & Programa</th>
                    <th className="py-3 px-4">Progreso</th>
                    <th className="py-3 px-4">Examen</th>
                    <th className="py-3 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <RefreshCw className="w-6 h-6 animate-spin text-[#39A900]" />
                          <span>Cargando registros desde tu hoja de Google Drive...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <FileSpreadsheet className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                          <span className="font-semibold text-slate-600 dark:text-slate-300">
                            No se encontraron registros de aprendices
                          </span>
                          <span className="text-xs text-slate-400">
                            Usa el botón "Registrar este Aprendiz" para agregar el primer registro a la hoja.
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r, i) => (
                      <tr
                        key={r.id || i}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {r.registeredAt}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          {r.fullName}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          <span className="text-[10px] text-slate-400 block">{r.documentType}</span>
                          {r.documentNumber}
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300 max-w-[220px]">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                            Ficha {r.ficheNumber}
                          </span>
                          <span className="truncate block text-[11px] text-slate-500 dark:text-slate-400" title={r.trainingProgram}>
                            {r.trainingProgram}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#39A900]"
                                style={{ width: `${r.progressPercent}%` }}
                              />
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {r.completedModulesCount}/7
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {r.isExamPassed ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {r.examScore}%
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">
                              Pendiente
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`flex items-center gap-1.5 font-bold text-xs ${
                              r.status === 'Certificada'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : r.status === 'Completada'
                                ? 'text-sky-600 dark:text-sky-400'
                                : 'text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                r.status === 'Certificada'
                                  ? 'bg-emerald-500'
                                  : r.status === 'Completada'
                                  ? 'bg-sky-500'
                                  : 'bg-amber-500 animate-pulse'
                              }`}
                            />
                            <span>{r.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Google Drive Writes (Mandatory per Skill) */}
      <ConfirmSyncModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setPendingRecord(null);
        }}
        onConfirm={handleConfirmSync}
        record={pendingRecord}
        spreadsheetName={spreadsheet?.name || INDUCTION_SHEET_TITLE}
        isSaving={isSaving}
      />

      {/* Manual Registration Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0e1e2b] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Registrar Aprendiz en Google Drive
            </h3>
            <p className="text-xs text-slate-500">
              Ingresa los datos para agregarlo directamente al registro de inducción en Google Sheets.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  placeholder="Ej: Laura Sofía Gómez Pérez"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#091520]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Tipo Documento
                  </label>
                  <select
                    value={manualForm.documentType}
                    onChange={(e) => setManualForm({ ...manualForm, documentType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#091520]"
                  >
                    <option value="Cédula de Ciudadanía (C.C.)">Cédula de Ciudadanía (C.C.)</option>
                    <option value="Tarjeta de Identidad (T.I.)">Tarjeta de Identidad (T.I.)</option>
                    <option value="Cédula de Extranjería (C.E.)">Cédula de Extranjería (C.E.)</option>
                    <option value="Permiso por Protección Temporal (PPT)">PPT</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    value={manualForm.documentNumber}
                    onChange={(e) => setManualForm({ ...manualForm, documentNumber: e.target.value })}
                    placeholder="1098765432"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#091520]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Número de Ficha
                  </label>
                  <input
                    type="text"
                    value={manualForm.ficheNumber}
                    onChange={(e) => setManualForm({ ...manualForm, ficheNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#091520]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Módulos Completados
                  </label>
                  <select
                    value={manualForm.completedModulesCount}
                    onChange={(e) => {
                      const count = parseInt(e.target.value, 10);
                      setManualForm({
                        ...manualForm,
                        completedModulesCount: count,
                        progressPercent: Math.round((count / 7) * 100),
                      });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#091520]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num} de 7 módulos ({Math.round((num / 7) * 100)}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Programa de Formación
                </label>
                <input
                  type="text"
                  value={manualForm.trainingProgram}
                  onChange={(e) => setManualForm({ ...manualForm, trainingProgram: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#091520]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="examCheck"
                  checked={manualForm.isExamPassed}
                  onChange={(e) => setManualForm({ ...manualForm, isExamPassed: e.target.checked })}
                  className="w-4 h-4 rounded text-[#39A900] focus:ring-[#39A900]"
                />
                <label htmlFor="examCheck" className="text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
                  Aprobó la Evaluación Final de Inducción (Calificación: {manualForm.examScore}%)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveManual}
                className="px-5 py-2 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-bold"
              >
                Continuar a Confirmación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
