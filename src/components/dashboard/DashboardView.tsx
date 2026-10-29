import React from 'react';
import { SolidStatCard, InfoStatCard } from './StatCard';
import { TrendChart } from './TrendChart';
import { DASHBOARD_STATS } from '../../data/mockDashboard';
import { useAcademic } from '../../context/AcademicContext';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  User,
  Users,
  Files,
  FileText,
  Star,
  Award,
  ArrowRight,
  CreditCard,
  Calendar,
  CheckSquare,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setActiveMenu, krsList, keuanganList, prodiList } = useAcademic();
  const { user } = useAuth();

  const pendingKrsCount = krsList.filter((k) => k.status === 'Menunggu Persetujuan').length;
  const unpaidBillsCount = keuanganList.filter((k) => k.status === 'Belum Lunas').length;

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="bg-white border-l-4 border-cyan-500 rounded-sm p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Selamat Datang di SIMAKU, <span className="text-cyan-700">{user?.nama}</span>!
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Portal Sistem Informasi Akademik Terpadu Universitas Akademika. Anda masuk sebagai{' '}
            <strong className="uppercase text-slate-700">{user?.role}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveMenu('rencanaStudi')}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Buka KRS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveMenu('keuangan')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Bayar QRIS</span>
          </button>
        </div>
      </div>

      {/* Row 1: Vivid Solid Stat Cards matching image.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cyan Card: JML MHS AKTIF */}
        <SolidStatCard
          title="JML MHS AKTIF"
          value={new Intl.NumberFormat('id-ID').format(DASHBOARD_STATS.jmlMhsAktif)}
          bgClass="bg-[#00c0ef]"
          icon={<GraduationCap className="w-16 h-16" />}
        />

        {/* Soft Mint Green: JML MHS LAKI-LAKI */}
        <SolidStatCard
          title="JML MHS LAKI-LAKI"
          value={DASHBOARD_STATS.jmlMhsLakiLaki}
          bgClass="bg-[#74c29c]"
          icon={<User className="w-16 h-16" />}
        />

        {/* Amber Orange: JML MHS PEREMPUAN */}
        <SolidStatCard
          title="JML MHS PEREMPUAN"
          value={DASHBOARD_STATS.jmlMhsPerempuan}
          bgClass="bg-[#e09f3e]"
          icon={<User className="w-16 h-16" />}
        />

        {/* Coral Red: JML DOSEN AKTIF */}
        <SolidStatCard
          title="JML DOSEN AKTIF"
          value={DASHBOARD_STATS.jmlDosenAktif}
          bgClass="bg-[#dd4b39]"
          icon={<Users className="w-16 h-16" />}
        />
      </div>

      {/* Row 2: Secondary Info Cards matching image.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cyan Badge: JML MHS YANG SUDAH KRS */}
        <InfoStatCard
          title="JML MHS YANG SUDAH KRS DI SEMESTER AKTIF"
          value={DASHBOARD_STATS.jmlMhsSudahKrs}
          iconBgClass="bg-[#00c0ef]"
          icon={<Files className="w-8 h-8" />}
        />

        {/* Mint Badge: JML MHS YANG BELUM KRS */}
        <InfoStatCard
          title="JML MHS YANG BELUM KRS DI SEMESTER AKTIF"
          value={new Intl.NumberFormat('id-ID').format(DASHBOARD_STATS.jmlMhsBelumKrs)}
          iconBgClass="bg-[#74c29c]"
          icon={<FileText className="w-8 h-8" />}
        />

        {/* Amber Badge: IPS TERTINGGI */}
        <InfoStatCard
          title="IPS TERTINGGI"
          value={DASHBOARD_STATS.ipsTertinggi.toFixed(2)}
          iconBgClass="bg-[#e09f3e]"
          icon={<Star className="w-8 h-8 fill-slate-900 text-slate-900" />}
        />

        {/* Coral Red Badge: IPK TERTINGGI */}
        <InfoStatCard
          title="IPK TERTINGGI"
          value={DASHBOARD_STATS.ipkTertinggi.toFixed(2)}
          iconBgClass="bg-[#dd4b39]"
          icon={<Award className="w-8 h-8 fill-slate-900 text-slate-900" />}
        />
      </div>

      {/* Row 3: Interactive Trend Chart */}
      <TrendChart />

      {/* Row 4: Shortcuts and Summary Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Box 1: Quick Action Hub */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-5">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2 mb-3">
            Akses Cepat Modul Utama
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveMenu('persetujuanKrs')}
              className="w-full flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-rose-100 text-rose-600">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Persetujuan KRS</div>
                  <div className="text-[11px] text-slate-500">
                    {pendingKrsCount} pengajuan butuh review dosen
                  </div>
                </div>
              </div>
              <span className="text-xs bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
                {pendingKrsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('keuangan')}
              className="w-full flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-teal-100 text-teal-600">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Tagihan & QRIS</div>
                  <div className="text-[11px] text-slate-500">
                    {unpaidBillsCount} tagihan belum lunas
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveMenu('jadwal')}
              className="w-full flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-blue-100 text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Jadwal Kuliah</div>
                  <div className="text-[11px] text-slate-500">Lihat jadwal kelas aktif</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Box 2: Program Studi Summary */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-5 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Program Studi Unggulan
            </h3>
            <button
              onClick={() => setActiveMenu('prodi')}
              className="text-xs text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-1"
            >
              Lihat Semua ({prodiList.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="p-2">Kode</th>
                  <th className="p-2">Nama Program Studi</th>
                  <th className="p-2">Jenjang</th>
                  <th className="p-2">Akreditasi</th>
                  <th className="p-2">Ketua Prodi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prodiList.slice(0, 4).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70">
                    <td className="p-2 font-mono font-medium text-slate-600">{p.kodeProdi}</td>
                    <td className="p-2 font-bold text-slate-800">{p.namaProdi}</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                        {p.jenjang}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {p.akreditasi}
                      </span>
                    </td>
                    <td className="p-2 text-slate-600">{p.kaprodi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
