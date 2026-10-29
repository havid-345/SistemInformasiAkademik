import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useAuth } from '../../context/AuthContext';
import { TagihanItem } from '../../types/keuangan';
import { QrisModal } from './QrisModal';
import { ReceiptModal } from './ReceiptModal';
import { formatRupiah, formatTanggalIndonesia } from '../../utils/formatters';
import { CreditCard, QrCode, FileText, CheckCircle2, Clock, Search, AlertCircle, Filter } from 'lucide-react';

export const KeuanganView: React.FC = () => {
  const { keuanganList, bayarTagihanQris } = useAcademic();
  const { user } = useAuth();

  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedTagihanQris, setSelectedTagihanQris] = useState<TagihanItem | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<TagihanItem | null>(null);

  // If student, auto filter to their NIM if available
  const isStudent = user?.role === 'mahasiswa';
  const effectiveFilterNim = isStudent && user?.nimOrNidn ? user.nimOrNidn : null;

  const filtered = keuanganList.filter((item) => {
    if (effectiveFilterNim && item.nim !== effectiveFilterNim) {
      return false;
    }
    const matchText =
      item.deskripsi.toLowerCase().includes(filterText.toLowerCase()) ||
      item.kodeTagihan.toLowerCase().includes(filterText.toLowerCase()) ||
      item.namaMahasiswa.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nim.includes(filterText);

    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchText && matchStatus;
  });

  const totalBelumLunas = filtered
    .filter((t) => t.status === 'Belum Lunas')
    .reduce((acc, curr) => acc + curr.totalBayar, 0);

  const totalLunas = filtered
    .filter((t) => t.status === 'Lunas')
    .reduce((acc, curr) => acc + curr.totalBayar, 0);

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            <span>Status Keuangan Mahasiswa & Pembayaran QRIS</span>
          </h2>
          <p className="text-xs text-slate-500">
            Daftar kewajiban biaya perkuliahan (UKT, SKS, Praktikum) dengan verifikasi pembayaran QRIS dan cetak struk PDF/DOCX.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">Semua Status</option>
            <option value="Belum Lunas">Belum Lunas</option>
            <option value="Lunas">Lunas</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari tagihan / mahasiswa / NIM..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 w-52 sm:w-64"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Summary Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-sm border-l-4 border-amber-500 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Tagihan Belum Lunas
          </div>
          <div className="text-xl font-black text-amber-700 mt-1">
            {formatRupiah(totalBelumLunas)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {filtered.filter((t) => t.status === 'Belum Lunas').length} invoice menunggu pembayaran
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border-l-4 border-emerald-500 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Terbayar (Lunas)
          </div>
          <div className="text-xl font-black text-emerald-700 mt-1">
            {formatRupiah(totalLunas)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {filtered.filter((t) => t.status === 'Lunas').length} transaksi berhasil
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border-l-4 border-teal-500 border border-slate-200 shadow-xs sm:col-span-2 lg:col-span-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Metode Pembayaran Resmi
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[10px] rounded tracking-widest">
              QRIS
            </span>
            <span className="text-xs font-semibold text-slate-700">Scan Instan Realtime</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Mendukung semua mobile banking & e-wallet nasional.
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
                <th className="p-3">Kode & Semester</th>
                <th className="p-3">Mahasiswa</th>
                <th className="p-3">Uraian Tagihan</th>
                <th className="p-3">Jatuh Tempo</th>
                <th className="p-3 text-right">Nominal</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center w-36">Aksi Pembayaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => {
                const isLunas = item.status === 'Lunas';
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                    <td className="p-3">
                      <div className="font-mono font-bold text-teal-700">{item.kodeTagihan}</div>
                      <div className="text-[11px] text-slate-500">{item.semester}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-800">{item.namaMahasiswa}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {item.nim} &bull; {item.prodi}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{item.deskripsi}</div>
                      {item.nomorTransaksi && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Trx: {item.nomorTransaksi}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatTanggalIndonesia(item.jatuhTempo)}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-black text-slate-800 text-sm">
                      {formatRupiah(item.totalBayar)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isLunas
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {isLunas ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Lunas</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>Belum Bayar</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {!isLunas ? (
                        <button
                          onClick={() => setSelectedTagihanQris(item)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors w-full"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Bayar QRIS</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedReceipt(item)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 transition-colors w-full"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>Cetak Struk</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                    Tidak ada data tagihan yang sesuai dengan kriteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QRIS Modal */}
      <QrisModal
        isOpen={!!selectedTagihanQris}
        onClose={() => setSelectedTagihanQris(null)}
        tagihan={selectedTagihanQris}
        onConfirmSuccess={(id) => {
          bayarTagihanQris(id);
          // Auto open receipt after successful payment
          const paidItem = keuanganList.find((t) => t.id === id);
          if (paidItem) {
            setSelectedReceipt({ ...paidItem, status: 'Lunas' });
          }
        }}
      />

      {/* Receipt Modal with PDF & DOCX export */}
      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        tagihan={selectedReceipt}
      />
    </div>
  );
};
