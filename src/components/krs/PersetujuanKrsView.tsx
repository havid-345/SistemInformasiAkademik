import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { PengajuanKrs } from '../../types/krs';
import { Modal } from '../common/Modal';
import {
  CheckSquare,
  Check,
  X,
  Search,
  Eye,
  FileSpreadsheet,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';

export const PersetujuanKrsView: React.FC = () => {
  const { krsList, setujuiKrs, tolakKrs } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedKrs, setSelectedKrs] = useState<PengajuanKrs | null>(null);
  const [rejectingKrs, setRejectingKrs] = useState<PengajuanKrs | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = krsList.filter((item) => {
    const matchText =
      item.namaMahasiswa.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nim.includes(filterText) ||
      item.prodi.toLowerCase().includes(filterText.toLowerCase());

    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchText && matchStatus;
  });

  const handleApprove = (krs: PengajuanKrs) => {
    setujuiKrs(krs.id, 'Rencana studi telah disetujui oleh Dosen PA.');
    if (selectedKrs?.id === krs.id) {
      setSelectedKrs(null);
    }
  };

  const handleOpenReject = (krs: PengajuanKrs) => {
    setRejectingKrs(krs);
    setRejectReason('');
  };

  const handleConfirmReject = () => {
    if (!rejectingKrs) return;
    tolakKrs(rejectingKrs.id, rejectReason.trim() || 'Perbaiki kombinasi jadwal mata kuliah.');
    setRejectingKrs(null);
    if (selectedKrs?.id === rejectingKrs.id) {
      setSelectedKrs(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-rose-600" />
            <span>Persetujuan Kartu Rencana Studi (KRS Approval)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Dosen Pembimbing Akademik / Administrator memverifikasi dan menyetujui pengajuan KRS mahasiswa bimbingan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="all">Semua Status</option>
            <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari mahasiswa / NIM..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 w-48 sm:w-60"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#2c3840] text-white uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3 w-10 text-center">No</th>
                <th className="p-3">Mahasiswa</th>
                <th className="p-3">Program Studi</th>
                <th className="p-3 text-center">IPK / IPS</th>
                <th className="p-3 text-center">Total SKS</th>
                <th className="p-3">Waktu Diajukan</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center w-48">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => {
                const isPending = item.status === 'Menunggu Persetujuan';
                const isApproved = item.status === 'Disetujui';
                const isRejected = item.status === 'Ditolak';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-800">{item.namaMahasiswa}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{item.nim}</div>
                    </td>
                    <td className="p-3 text-slate-700">
                      <div>{item.prodi}</div>
                      <div className="text-[10px] text-slate-400">Sem {item.semesterMahasiswa}</div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="font-bold text-slate-800 font-mono">
                        {item.ipkTerakhir.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">IPS: {item.ipsTerakhir.toFixed(2)}</div>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-0.5 rounded font-black bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs">
                        {item.totalSks} / {item.jatahSks} SKS
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 font-mono text-[11px]">
                      {item.tglPengajuan}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isPending
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedKrs(item)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors"
                          title="Lihat Detail Mata Kuliah"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>Detail</span>
                        </button>

                        {isPending && (
                          <>
                            <button
                              onClick={() => handleApprove(item)}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                              title="Setujui KRS"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Setujui</span>
                            </button>
                            <button
                              onClick={() => handleOpenReject(item)}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                              title="Tolak KRS"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Tolak</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                    Tidak ada pengajuan KRS yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail KRS */}
      {selectedKrs && (
        <Modal
          isOpen={!!selectedKrs}
          onClose={() => setSelectedKrs(null)}
          title={`Detail Pengajuan KRS: ${selectedKrs.namaMahasiswa}`}
          subtitle={`NIM: ${selectedKrs.nim} • Program Studi: ${selectedKrs.prodi} • ${selectedKrs.totalSks} SKS`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded text-xs border border-slate-200">
              <div>
                <span className="text-slate-500 block">Dosen PA Pengampu:</span>
                <span className="font-bold text-slate-800">{selectedKrs.dosenPaNama}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status Saat Ini:</span>
                <span className="font-bold text-slate-800">{selectedKrs.status}</span>
              </div>
            </div>

            {selectedKrs.catatanDosen && (
              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900">
                <strong>Catatan Dosen Sebelumnya:</strong> {selectedKrs.catatanDosen}
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Daftar Mata Kuliah yang Diambil ({selectedKrs.mataKuliah.length})
              </h4>
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#2c3840] text-white">
                    <tr>
                      <th className="p-2">Kode</th>
                      <th className="p-2">Mata Kuliah</th>
                      <th className="p-2 text-center">SKS</th>
                      <th className="p-2 text-center">Kelas</th>
                      <th className="p-2">Jadwal & Ruang</th>
                      <th className="p-2">Dosen Pengajar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedKrs.mataKuliah.map((mk) => (
                      <tr key={mk.jadwalId} className="hover:bg-slate-50">
                        <td className="p-2 font-mono font-bold text-cyan-700">{mk.kodeMk}</td>
                        <td className="p-2 font-medium text-slate-800">{mk.namaMk}</td>
                        <td className="p-2 text-center font-bold">{mk.sks}</td>
                        <td className="p-2 text-center font-mono">{mk.kelas}</td>
                        <td className="p-2 text-slate-600">
                          {mk.hari}, {mk.jam} ({mk.ruangan})
                        </td>
                        <td className="p-2 text-slate-600">{mk.dosen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verification actions in modal */}
            {selectedKrs.status === 'Menunggu Persetujuan' && (
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleOpenReject(selectedKrs)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Tolak KRS</span>
                </button>
                <button
                  onClick={() => handleApprove(selectedKrs)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Setujui KRS Sekarang</span>
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Reject Reason Modal */}
      {rejectingKrs && (
        <Modal
          isOpen={!!rejectingKrs}
          onClose={() => setRejectingKrs(null)}
          title="Tolak Pengajuan KRS"
          subtitle={`Mahasiswa: ${rejectingKrs.namaMahasiswa} (${rejectingKrs.nim})`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Berikan catatan alasan penolakan agar mahasiswa dapat merevisi rencana studinya:
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Catatan Revisi / Alasan Penolakan *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Contoh: Jadwal bentrok di hari Rabu atau mata kuliah prasyarat belum diambil."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setRejectingKrs(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors shadow-sm"
              >
                Kirim Penolakan
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
