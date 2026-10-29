import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import {
  GraduationCap,
  Lock,
  User,
  Shield,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Masukkan Username, NIM, atau NIDN!');
      return;
    }
    const success = login(username, selectedRole);
    if (!success) {
      setError('Login gagal. Periksa kembali data akun Anda.');
    }
  };

  const handleQuickDemo = (role: UserRole, userCode: string) => {
    setUsername(userCode);
    setPassword('password123');
    setSelectedRole(role);
    login(userCode, role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2226] via-[#222d32] to-[#2c3840] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative background grid elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* University Header Brand matching image.png */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#e74c3c] text-white px-4 py-2 rounded-lg shadow-lg mb-3">
            <span className="w-7 h-7 rounded bg-white text-[#e74c3c] flex items-center justify-center font-black text-lg shadow-inner">
              e
            </span>
            <span className="text-xl font-black tracking-wider uppercase">SIMAKU</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            UNIVERSITAS AKADEMIKA
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sistem Informasi Akademik Terpadu & Layanan Mahasiswa
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-slate-200">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Masuk ke Portal Akademik</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Gunakan NIM bagi mahasiswa atau NIDN/Username bagi staf pengajar.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Username / NIM / NIDN
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin / 2210511045 / 0412088501"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  className="w-full px-3.5 py-2.5 pl-10 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#e74c3c] hover:bg-red-600 text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span>Masuk Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher Section */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Atau Pilih Akses Cepat Demo:
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin', 'admin')}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-rose-400 hover:bg-rose-50/50 transition-colors flex flex-col items-center text-center group"
              >
                <div className="p-1.5 rounded-full bg-rose-100 text-rose-600 mb-1 group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Admin</span>
                <span className="text-[10px] text-slate-400">Full Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('dosen', '0412088501')}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex flex-col items-center text-center group"
              >
                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mb-1 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Dosen PA</span>
                <span className="text-[10px] text-slate-400">Approve KRS</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('mahasiswa', '2210511045')}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors flex flex-col items-center text-center group"
              >
                <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 mb-1 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Mahasiswa</span>
                <span className="text-[10px] text-slate-400">KRS & QRIS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer copyright */}
        <div className="text-center mt-6 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} SIMAKU &bull; Universitas Akademika Indonesia.
        </div>
      </div>
    </div>
  );
};
