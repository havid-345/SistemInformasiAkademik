import React from 'react';
import { useAcademic, AcademicMenu } from '../../context/AcademicContext';
import { Globe, ChevronRight } from 'lucide-react';

const MENU_TITLES: Record<AcademicMenu, string> = {
  home: 'Dashboard',
  prodi: 'Program Studi',
  kurikulum: 'Kurikulum & Mata Kuliah',
  jenisNilai: 'Jenis Penilaian',
  semester: 'Semester Akademik',
  jadwal: 'Jadwal Kuliah',
  dosen: 'Data Dosen',
  keuangan: 'Status Keuangan & QRIS',
  rencanaStudi: 'Rencana Studi (KRS)',
  persetujuanKrs: 'Persetujuan KRS',
};

export const Breadcrumb: React.FC = () => {
  const { activeMenu, setActiveMenu } = useAcademic();

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs text-slate-500 shadow-2xs">
      <div className="flex items-center gap-1.5 font-medium">
        <button
          onClick={() => setActiveMenu('home')}
          className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-red-500" />
          <span>Home</span>
        </button>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

        <span className="text-slate-700 font-semibold">{MENU_TITLES[activeMenu] || 'Halaman'}</span>
      </div>

      <div className="text-[11px] text-slate-400 hidden sm:block">
        SIMAKU &bull; Universitas Akademika
      </div>
    </div>
  );
};
