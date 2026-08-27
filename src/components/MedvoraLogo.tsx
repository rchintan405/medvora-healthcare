import React from 'react';

interface MedvoraLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const MedvoraLogo: React.FC<MedvoraLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer">
      {/* Abstract Medical Knowledge Pulse Mark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-teal-600 via-cyan-500 to-indigo-600 opacity-90 group-hover:scale-105 transition-transform duration-300 shadow-sm" />
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-5/6 h-5/6 text-white"
        >
          {/* Subtle abstract intersecting nodal helix & pulse ring */}
          <path
            d="M5 14C5 9.02944 9.02944 5 14 5C18.9706 5 23 9.02944 23 14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M23 14C23 18.9706 18.9706 23 14 23C9.02944 23 5 18.9706 5 14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="2 4"
            className="opacity-90"
          />
          {/* Clinical Vitality Node Path */}
          <path
            d="M8.5 14H11L12.8 9.5L15.2 18.5L17 14H19.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="5" r="1.5" fill="white" />
          <circle cx="23" cy="14" r="1.5" fill="#5EEAD4" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-bold tracking-tight ${textSizes[size]} ${
              isDark ? 'text-slate-900' : 'text-white'
            }`}
          >
            Med<span className="text-teal-600">vora</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mb-1" />
        </div>
        {showTagline && (
          <span
            className={`text-[10px] font-medium tracking-wide uppercase ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Smarter Learning for Better Care
          </span>
        )}
      </div>
    </div>
  );
};
