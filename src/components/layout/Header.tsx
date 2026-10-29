import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  User as UserIcon,
  Settings,
  LogOut,
  RotateCcw,
  Shield,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { activeSemester, resetDataToFactory, semesterList, setActiveSemesterId } = useAcademic();
  const { user, logout, switchAccount } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-xs">
      {/* Left title & mobile toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-slate-800 tracking-tight uppercase">
            UNIVERSITAS AKADEMIKA
          </span>
          <span className="hidden lg:inline-block text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium border border-slate-200">
            Sistem Informasi Akademik
          </span>
        </div>
      </div>

      {/* Right controls: Semester pill + User + Settings */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Active Semester pill matching image.png */}
        <div className="flex items-center">
          <div className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm font-medium text-slate-700 shadow-2xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              Semester {activeSemester?.tipe || 'Gasal'} {activeSemester?.tahunAjaran || '2026/2027'}
            </span>
          </div>
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowSettingsMenu(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            title="Profil Pengguna & Switch Akun"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 overflow-hidden border border-slate-300">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.nama} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-4 h-4" />
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-700 max-w-[120px] truncate">
              {user?.nama?.split(' ')[0]}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{user?.nama}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || user?.username}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded uppercase">
                    Role: {user?.role}
                  </span>
                  {user?.nimOrNidn && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      {user.nimOrNidn}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Role Switcher for seamless testing */}
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Ganti Akun Demo:
                </p>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => {
                      switchAccount('admin');
                      setShowUserMenu(false);
                    }}
                    className={`px-2 py-1.5 text-xs rounded font-medium flex flex-col items-center gap-1 ${
                      user?.role === 'admin'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                  <button
                    onClick={() => {
                      switchAccount('dosen');
                      setShowUserMenu(false);
                    }}
                    className={`px-2 py-1.5 text-xs rounded font-medium flex flex-col items-center gap-1 ${
                      user?.role === 'dosen'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Dosen</span>
                  </button>
                  <button
                    onClick={() => {
                      switchAccount('mahasiswa');
                      setShowUserMenu(false);
                    }}
                    className={`px-2 py-1.5 text-xs rounded font-medium flex flex-col items-center gap-1 ${
                      user?.role === 'mahasiswa'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Mhs</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout Keluar</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings button & menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSettingsMenu(!showSettingsMenu);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            title="Pengaturan & Reset Data"
          >
            <Settings className="w-4 h-4" />
          </button>

          {showSettingsMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">Pengaturan Akademik</p>
                <p className="text-[11px] text-slate-500">Konfigurasi semester aktif & reset data</p>
              </div>

              {/* Semester picker */}
              <div className="px-3 py-2 border-b border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Pilih Semester Aktif:
                </label>
                <select
                  value={activeSemester?.id}
                  onChange={(e) => setActiveSemesterId(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-red-400"
                >
                  {semesterList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.tahunAjaran} ({s.tipe}) {s.status === 'Aktif' ? '★ Aktif' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset to factory */}
              <button
                onClick={() => {
                  if (confirm('Kembalikan semua data ke data simulasi default?')) {
                    resetDataToFactory();
                    setShowSettingsMenu(false);
                  }
                }}
                className="w-full px-4 py-2.5 text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Reset Database Mockup</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
