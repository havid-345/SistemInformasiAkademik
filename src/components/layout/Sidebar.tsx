import React from 'react';
import { useAcademic, AcademicMenu } from '../../context/AcademicContext';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  CreditCard,
  FileSpreadsheet,
  CheckSquare,
  Search,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { activeMenu, setActiveMenu, searchQuery, setSearchQuery } = useAcademic();
  const { user, logout } = useAuth();

  // Menu items strictly filtered to what user requested:
  // 1. Home
  // 2. Program Studi
  // 3. Kurikulum
  // 4. Jenis Nilai
  // 5. Semester
  // 6. Jadwal
  // 7. Dosen
  // 8. Status Keuangan
  // 9. Rencana Studi (KRS)
  // 10. Persetujuan KRS
  const navItems: {
    id: AcademicMenu;
    label: string;
    icon: React.ReactNode;
    roles?: ('admin' | 'dosen' | 'mahasiswa')[];
    badge?: string;
  }[] = [
    {
      id: 'home',
      label: 'HOME',
      icon: <Home className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 'prodi',
      label: 'PROGRAM STUDI',
      icon: <GraduationCap className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'kurikulum',
      label: 'KURIKULUM',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'jenisNilai',
      label: 'JENIS NILAI',
      icon: <CheckCircle className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: 'semester',
      label: 'SEMESTER',
      icon: <Calendar className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'jadwal',
      label: 'JADWAL',
      icon: <Clock className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'dosen',
      label: 'DOSEN',
      icon: <Users className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: 'keuangan',
      label: 'STATUS KEUANGAN',
      icon: <CreditCard className="w-4 h-4 text-teal-400" />,
      badge: 'QRIS',
    },
    {
      id: 'rencanaStudi',
      label: 'RENCANA STUDI',
      icon: <FileSpreadsheet className="w-4 h-4 text-yellow-400" />,
      badge: 'KRS',
    },
    {
      id: 'persetujuanKrs',
      label: 'PERSETUJUAN KRS',
      icon: <CheckSquare className="w-4 h-4 text-rose-400" />,
      badge: 'Approval',
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#222d32] text-slate-200 flex flex-col transition-transform duration-300 ease-in-out select-none shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Top Logo - Red Header matching image.png */}
      <div className="h-14 bg-[#e74c3c] flex items-center px-4 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-white text-[#e74c3c] flex items-center justify-center font-black text-xl shadow-inner">
            e
          </div>
          <div>
            <div className="font-extrabold text-white text-lg tracking-wider flex items-center gap-1 leading-tight">
              Akademik
            </div>
            <div className="text-[10px] text-red-100 font-medium tracking-widest uppercase">
              SIMAKU System
            </div>
          </div>
        </div>
      </div>

      {/* Menu Search Box matching image.png */}
      <div className="p-3 bg-[#1a2226] border-b border-[#2c3b41]">
        <div className="relative">
          <input
            type="text"
            placeholder="Pencarian Menu.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#374850] text-slate-100 text-xs rounded px-3 py-2 pr-8 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* User Quick Info */}
      <div className="px-4 py-3 bg-[#1e282c] border-b border-[#2c3b41] flex items-center gap-3">
        <div className="relative">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={user?.nama}
            className="w-9 h-9 rounded-full object-cover border border-slate-600"
          />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border border-[#1e282c]"></span>
        </div>
        <div className="overflow-hidden flex-1">
          <p className="text-xs font-semibold text-slate-200 truncate">{user?.nama}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded uppercase font-bold tracking-wider ${
                user?.role === 'admin'
                  ? 'bg-rose-900/60 text-rose-300'
                  : user?.role === 'dosen'
                  ? 'bg-blue-900/60 text-blue-300'
                  : 'bg-emerald-900/60 text-emerald-300'
              }`}
            >
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu List */}
      <nav className="flex-1 overflow-y-auto py-2 px-1 text-sm scrollbar-thin scrollbar-thumb-slate-700">
        <ul className="space-y-0.5">
          {filteredItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-r transition-all duration-150 text-left font-medium ${
                    isActive
                      ? 'bg-[#1e282c] text-white border-l-4 border-red-500 shadow-inner'
                      : 'text-[#b8c7ce] hover:text-white hover:bg-[#1e282c]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-[13px] tracking-wide uppercase truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                        isActive ? 'rotate-90 text-red-400' : ''
                      }`}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {filteredItems.length === 0 && (
          <div className="text-center py-6 px-4 text-xs text-slate-500">
            Menu "{searchQuery}" tidak ditemukan.
          </div>
        )}
      </nav>

      {/* Bottom Footer Action */}
      <div className="p-3 bg-[#1a2226] border-t border-[#2c3b41] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SIMAKU v2.6 Pro</span>
        </div>
        <button
          onClick={logout}
          title="Keluar dari sistem"
          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
