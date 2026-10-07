import React from 'react';

// Seedling / leaf icon representant of growth, sustainability, and apprentice development
export const PawDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Clean double leaf design representing Colombian green sustainability */}
    <path
      d="M12 22C12 22 12 13 19 12C12 12 12 22 12 22Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C12 14 5 13 5 13C12 13 12 22 12 22Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const HandDrawnStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.5L14.8 8.8L21.5 9.4L16.4 13.9L18 20.5L12 17L6 20.5L7.6 13.9L2.5 9.4L9.2 8.8L12 2.5Z" />
  </svg>
);

export const SquiggleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-24 h-3',
  color = '#39A900',
}) => (
  <svg
    viewBox="0 0 120 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M2 7C14 2 22 10 34 6C46 2 54 10 66 6C78 2 86 10 98 6C108 2 114 8 118 6"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandDrawnSparkle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#FFD100',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2V22M2 12H22M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const FriendlyMascotAvatar: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <div
    className={`${className} relative rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/90 dark:to-[#00324D] border-2 border-[#39A900] flex items-center justify-center overflow-hidden shadow-sm shrink-0 select-none`}
  >
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
      {/* Friendly SENA apprentice guide face: "Seni" */}
      {/* Background soft glow */}
      <circle cx="32" cy="32" r="28" fill="#E8F5E9" className="dark:fill-emerald-900/40" />
      {/* Face */}
      <circle cx="32" cy="36" r="18" fill="#FDE2C6" stroke="#00324D" strokeWidth="2" />
      {/* Friendly hair */}
      <path
        d="M17 32C17 23 23 18 32 18C41 18 47 23 47 32C47 28 44 24 41 24C36 24 34 26 32 26C30 26 28 24 23 24C20 24 17 28 17 32Z"
        fill="#2C1810"
      />
      {/* Cute eyes with sparkling reflection */}
      <circle cx="26" cy="35" r="2.5" fill="#00324D" />
      <circle cx="27" cy="34" r="0.9" fill="#FFFFFF" />
      <circle cx="38" cy="35" r="2.5" fill="#00324D" />
      <circle cx="39" cy="34" r="0.9" fill="#FFFFFF" />
      {/* Cheerful blush */}
      <circle cx="22" cy="38" r="2" fill="#F87171" opacity="0.4" />
      <circle cx="42" cy="38" r="2" fill="#F87171" opacity="0.4" />
      {/* Happy smile */}
      <path
        d="M28 41C29.5 44 34.5 44 36 41"
        stroke="#00324D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Official SENA Green Apprentice Visor/Cap */}
      <path
        d="M19 22C22 14 42 14 45 22L48 25H16L19 22Z"
        fill="#39A900"
        stroke="#00324D"
        strokeWidth="2"
      />
      {/* Cap Visor Rim */}
      <path d="M14 25H50" stroke="#00324D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Yellow SENA institutional crest star on cap */}
      <circle cx="32" cy="18" r="2.5" fill="#FFD100" stroke="#00324D" strokeWidth="1" />
    </svg>
  </div>
);
