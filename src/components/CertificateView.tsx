import React, { useRef } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { Printer, Download, UserCheck, ShieldCheck, QrCode, CheckCircle, Edit3, FileSpreadsheet } from 'lucide-react';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  score: number;
  onEditProfile: () => void;
  onOpenDriveRecords?: () => void;
  isAdmin?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  score,
  onEditProfile,
  onOpenDriveRecords,
  isAdmin = false,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const verificationCode = `SENA-IND-2026-${profile.ficheNumber}-${profile.documentNumber.slice(-4)}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Celebration Banner */}
      <div className="no-print bg-gradient-to-r from-emerald-600 via-[#39A900] to-teal-700 rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-100">
            <CheckCircle className="w-4 h-4 text-white" />
            <span>Inducción Acreditada · Calificación: {score}%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display">
            ¡Felicitaciones, {profile.fullName.split(' ')[0]}!
          </h2>
          <p className="text-sm text-emerald-50 leading-relaxed">
            Has completado exitosamente la inducción del SENA. Tu constancia oficial está lista para descargar en PDF, imprimir o sincronizar con tu registro de Google Drive.
          </p>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/30 shadow-md shrink-0">
          <img
            src="/src/assets/images/sena_apprentice_success_1791392599494.jpg"
            alt="Éxito de inducción SENA"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Top action toolbar (Hidden when printing) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#39A900]">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Constancia Oficial de Inducción Institucional
            </h3>
            <p className="text-xs text-slate-500">
              Acreditación satisfactoria de la etapa inicial de inducción al SENA
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {isAdmin && onOpenDriveRecords && (
            <button
              onClick={onOpenDriveRecords}
              className="flex-1 sm:flex-none px-3.5 py-2 border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Registrar en hoja de cálculo en Google Drive"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
              <span>Registrar en Google Drive</span>
            </button>
          )}
          <button
            onClick={onEditProfile}
            className="flex-1 sm:flex-none px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-slate-500" />
            <span>Editar Datos</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-5 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Container */}
      <div className="bg-slate-100 p-2 sm:p-6 rounded-2xl flex justify-center overflow-x-auto">
        <div
          ref={certificateRef}
          className="certificate-print-container bg-white text-slate-900 w-[840px] min-h-[580px] p-10 sm:p-14 rounded-xl shadow-xl border-8 border-double border-[#39A900] relative flex flex-col justify-between select-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(57, 169, 0, 0.02) 0%, transparent 70%)',
          }}
        >
          {/* Colombian Flag Accent Top Line */}
          <div className="absolute top-0 left-0 right-0 h-2 flex">
            <div className="w-1/2 bg-[#FFD100]" />
            <div className="w-1/4 bg-[#00324D]" />
            <div className="w-1/4 bg-[#DA291C]" />
          </div>

          {/* Certificate Header */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-slate-100">
            <div className="flex items-center gap-4">
              <SenaLogo className="w-16 h-16" variant="full" />
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                REPÚBLICA DE COLOMBIA
              </span>
              <span className="text-xs font-bold text-[#00324D] block">
                SERVICIO NACIONAL DE APRENDIZAJE
              </span>
              <span className="text-[11px] text-slate-500 font-medium block">
                {profile.regional} · {profile.trainingCenter}
              </span>
            </div>
          </div>

          {/* Main Statement */}
          <div className="text-center my-6 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#39A900] block">
              CERTIFICACIÓN DE INDUCCIÓN INSTITUCIONAL
            </span>

            <p className="text-xs text-slate-500 uppercase tracking-wider">
              El Servicio Nacional de Aprendizaje (SENA) certifica que el(la) aprendiz:
            </p>

            {/* Apprentice Name */}
            <h1 className="text-3xl sm:text-4xl font-black text-[#00324D] tracking-tight py-1 font-serif underline decoration-[#39A900] decoration-2 underline-offset-8">
              {profile.fullName}
            </h1>

            <p className="text-xs text-slate-600">
              Identificado(a) con <strong>{profile.documentType} N° {profile.documentNumber}</strong>
            </p>

            {/* Induction Completion Text */}
            <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
              Culminó y aprobó satisfactoriamente el{' '}
              <strong>Proceso de Inducción a la Formación Profesional Integral</strong> para el programa
              de formación:
            </p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 max-w-lg mx-auto">
              <p className="font-bold text-sm text-[#00324D]">{profile.trainingProgram}</p>
              <p className="text-xs text-slate-500 font-medium">
                Ficha de Caracterización N° <strong>{profile.ficheNumber}</strong>
              </p>
            </div>

            <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
              Demostrando apropiación de la Identidad Institucional, Símbolos, 7 Valores Éticos,
              Reglamento del Aprendiz (Acuerdo 009 de 2024), y la Ruta de Etapa Lectiva y Productiva.
            </p>
          </div>

          {/* Signatures & Footer Verification */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-12 items-end gap-4">
            {/* Signature 1 */}
            <div className="col-span-4 text-center">
              <div className="w-36 h-0.5 bg-slate-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-800">Subdirección de Centro</p>
              <p className="text-[10px] text-slate-500">{profile.trainingCenter}</p>
            </div>

            {/* QR & Verification code */}
            <div className="col-span-4 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded p-1 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-1">
                {verificationCode}
              </span>
            </div>

            {/* Signature 2 */}
            <div className="col-span-4 text-center">
              <div className="w-36 h-0.5 bg-slate-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-800">Coordinación Académica y de Bienestar</p>
              <p className="text-[10px] text-slate-500">Expedido el {formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
