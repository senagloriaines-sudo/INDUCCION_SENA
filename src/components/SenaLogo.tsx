import React, { useState } from 'react';

interface SenaLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
  light?: boolean;
  src?: string;
}

export const SenaLogo: React.FC<SenaLogoProps> = ({
  className = 'w-10 h-10',
  variant = 'icon',
  light = false,
  src,
}) => {
  const [imgError, setImgError] = useState(false);
  const primaryColor = light ? '#FFFFFF' : '#39A900';
  const textColor = light ? '#FFFFFF' : '#00324D';

  // Exact CSS filter for official SENA Green (#39A900)
  const greenFilter =
    'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(836%) hue-rotate(67deg) brightness(98%) contrast(103%)';

  // If a direct URL/address is provided and loads successfully
  if (src && !imgError) {
    if (variant === 'full') {
      return (
        <div className="flex items-center gap-3">
          <img
            src={src}
            alt="Logo SENA"
            className={`${className} object-contain`}
            style={{ filter: greenFilter }}
            onError={() => setImgError(true)}
          />
          <div className="flex flex-col">
            <span
              className="text-2xl font-black tracking-tight leading-none"
              style={{ color: textColor }}
            >
              SENA
            </span>
            <span
              className="text-[10px] font-semibold tracking-wider uppercase opacity-85 leading-tight mt-0.5"
              style={{ color: textColor }}
            >
              Servicio Nacional de Aprendizaje
            </span>
          </div>
        </div>
      );
    }

    return (
      <img
        src={src}
        alt="Logo SENA"
        className={`${className} object-contain`}
        style={{ filter: greenFilter }}
        onError={() => setImgError(true)}
      />
    );
  }

  if (variant === 'full') {
    return (
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="SENA Logo"
        >
          {/* Head / Sun of knowledge */}
          <circle cx="50" cy="18" r="10" fill={primaryColor} />
          {/* Torso / Dynamic figure walking forward */}
          <path
            d="M50 34C43 34 35 38 29 44C27 46 29 49 32 48C37 44 43 41 50 41C57 41 63 44 68 48C71 49 73 46 71 44C65 38 57 34 50 34Z"
            fill={primaryColor}
          />
          {/* Right arm forward */}
          <path
            d="M50 46L68 58C70 59.5 72 58 71.5 56L62 48C58 45 54 44 50 44V46Z"
            fill={primaryColor}
          />
          {/* Body and legs representing progress and industry */}
          <path
            d="M48 45V72L34 92C32.5 94 35.5 96 37.5 93.5L51.5 73.5L64.5 93.5C66.5 96 69.5 94 68 92L54 72V45H48Z"
            fill={primaryColor}
          />
          {/* Horizontal foundation bar */}
          <rect x="20" y="93" width="60" height="4" rx="2" fill={primaryColor} />
        </svg>
        <div className="flex flex-col">
          <span
            className="text-2xl font-black tracking-tight leading-none"
            style={{ color: textColor }}
          >
            SENA
          </span>
          <span
            className="text-[10px] font-semibold tracking-wider uppercase opacity-85 leading-tight mt-0.5"
            style={{ color: textColor }}
          >
            Servicio Nacional de Aprendizaje
          </span>
        </div>
      </div>
    );
  }

  // Pure iconic symbol
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SENA Símbolo"
    >
      {/* Head */}
      <circle cx="50" cy="16" r="11" fill={primaryColor} />
      {/* Arch / Chest */}
      <path
        d="M50 32C41.5 32 33 37 26 44C24 46.2 26.5 49 29.5 47.5C35.5 43 42.5 40 50 40C57.5 40 64.5 43 70.5 47.5C73.5 49 76 46.2 74 44C67 37 58.5 32 50 32Z"
        fill={primaryColor}
      />
      {/* Dynamic stride legs and body */}
      <path
        d="M47 43V68L32 90C30 93 34 95.5 36.5 92.5L50 72L63.5 92.5C66 95.5 70 93 68 90L53 68V43H47Z"
        fill={primaryColor}
      />
      {/* Ground support line */}
      <rect x="18" y="93" width="64" height="4.5" rx="2" fill={primaryColor} />
    </svg>
  );
};
