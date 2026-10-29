import React from 'react';

interface SolidStatCardProps {
  title: string;
  value: string | number;
  bgClass: string;
  icon: React.ReactNode;
}

export const SolidStatCard: React.FC<SolidStatCardProps> = ({
  title,
  value,
  bgClass,
  icon,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-sm p-4 text-white shadow-sm flex items-center justify-between min-h-[92px] ${bgClass}`}
    >
      <div className="z-10">
        <p className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase opacity-95">
          {title}
        </p>
        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
          {value}
        </p>
      </div>
      <div className="text-white/35 z-0 transition-transform hover:scale-105 select-none">
        {icon}
      </div>
    </div>
  );
};

interface InfoStatCardProps {
  title: string;
  value: string | number;
  iconBgClass: string;
  icon: React.ReactNode;
}

export const InfoStatCard: React.FC<InfoStatCardProps> = ({
  title,
  value,
  iconBgClass,
  icon,
}) => {
  return (
    <div className="bg-white rounded-sm shadow-xs border border-slate-200/80 flex items-stretch overflow-hidden min-h-[82px]">
      <div
        className={`w-20 shrink-0 flex items-center justify-center text-white ${iconBgClass}`}
      >
        {icon}
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <span className="text-[11px] font-bold text-slate-700 leading-tight uppercase line-clamp-2">
          {title}
        </span>
        <span className="text-2xl font-black text-slate-800 tracking-tight text-right">
          {value}
        </span>
      </div>
    </div>
  );
};
