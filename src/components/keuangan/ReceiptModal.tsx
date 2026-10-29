import React from 'react';
import { Modal } from '../common/Modal';
import { TagihanItem } from '../../types/keuangan';
import { formatRupiah, formatTanggalIndonesia } from '../../utils/formatters';
import { ExportDocumentService } from '../../services/exportDocumentService';
import { FileText, FileDown, Printer, CheckCircle2 } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagihan: TagihanItem | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  tagihan,
}) => {
  if (!tagihan) return null;

  const handleExportPdf = () => {
    ExportDocumentService.exportReceiptPdf(tagihan);
  };

  const handleExportDocx = () => {
    ExportDocumentService.exportReceiptDocx(tagihan);
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bukti Pembayaran Akademik (Struk)"
      subtitle="Dokumen resmi bukti pelunasan biaya kuliah mahasiswa"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Printable Receipt Card */}
        <div className="bg-white p-6 border border-slate-300 rounded-lg shadow-inner text-slate-800 printable-area font-sans">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
            <div>
              <div className="text-lg font-black tracking-wider text-slate-900">
                UNIVERSITAS AKADEMIKA
              </div>
              <div className="text-xs font-semibold text-slate-600">
                SIMAKU &bull; Sistem Informasi Akademik & Keuangan
              </div>
              <div className="text-[10px] text-slate-500">
                Jl. Kampus Merdeka No. 101, Telp: (021) 7891234, email: baak@simaku.ac.id
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded font-black text-xs uppercase tracking-wider">
                LUNAS / BERHASIL
              </span>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                {tagihan.nomorTransaksi || 'TRX-QRIS-99120'}
              </div>
            </div>
          </div>

          <div className="text-center font-bold text-sm tracking-wide text-slate-800 uppercase mb-4 underline decoration-slate-300 underline-offset-4">
            BUKTI PEMBAYARAN TAGIHAN KULIAH
          </div>

          {/* Student Info Table */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-4 bg-slate-50 p-3 rounded border border-slate-200">
            <div className="space-y-1">
              <div className="flex">
                <span className="w-28 text-slate-500">Nama Mahasiswa</span>
                <span className="font-bold text-slate-800">: {tagihan.namaMahasiswa}</span>
              </div>
              <div className="flex">
                <span className="w-28 text-slate-500">NIM</span>
                <span className="font-mono font-bold text-slate-800">: {tagihan.nim}</span>
              </div>
              <div className="flex">
                <span className="w-28 text-slate-500">Program Studi</span>
                <span className="font-semibold text-slate-800">: {tagihan.prodi}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex">
                <span className="w-28 text-slate-500">Kode Tagihan</span>
                <span className="font-mono font-bold text-slate-800">: {tagihan.kodeTagihan}</span>
              </div>
              <div className="flex">
                <span className="w-28 text-slate-500">Semester</span>
                <span className="font-semibold text-slate-800">: {tagihan.semester}</span>
              </div>
              <div className="flex">
                <span className="w-28 text-slate-500">Metode Bayar</span>
                <span className="font-semibold text-emerald-700">
                  : {tagihan.metodeBayar || 'QRIS Dinamis'}
                </span>
              </div>
              <div className="flex">
                <span className="w-28 text-slate-500">Waktu Lunas</span>
                <span className="text-slate-700">
                  : {tagihan.tglBayar ? formatTanggalIndonesia(tagihan.tglBayar) : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Detail Line Items */}
          <table className="w-full text-xs mb-4 border border-slate-200">
            <thead className="bg-[#2c3840] text-white">
              <tr>
                <th className="p-2 text-center w-10">No</th>
                <th className="p-2 text-left">Komponen Biaya</th>
                <th className="p-2 text-center w-28">Kode Akun</th>
                <th className="p-2 text-right w-36">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2 text-center text-slate-500">1</td>
                <td className="p-2 font-medium text-slate-800">{tagihan.deskripsi}</td>
                <td className="p-2 text-center font-mono text-slate-500">{tagihan.kodeTagihan}</td>
                <td className="p-2 text-right font-semibold">{formatRupiah(tagihan.nominal)}</td>
              </tr>
              {tagihan.denda > 0 && (
                <tr>
                  <td className="p-2 text-center text-slate-500">2</td>
                  <td className="p-2 text-rose-600">Denda Keterlambatan</td>
                  <td className="p-2 text-center font-mono text-slate-500">DENDA</td>
                  <td className="p-2 text-right text-rose-600 font-semibold">
                    {formatRupiah(tagihan.denda)}
                  </td>
                </tr>
              )}
              <tr className="bg-slate-100 font-bold">
                <td colSpan={3} className="p-2.5 text-right text-slate-700">
                  TOTAL TELAH DIBAYAR:
                </td>
                <td className="p-2.5 text-right text-cyan-800 text-sm">
                  {formatRupiah(tagihan.totalBayar)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer & Signature Stamp */}
          <div className="flex items-end justify-between pt-2 text-[11px] text-slate-500">
            <div className="max-w-xs">
              <p className="italic leading-relaxed">
                * Struk ini adalah bukti pembayaran yang sah diterbitkan secara elektronik oleh sistem SIMAKU.
              </p>
            </div>
            <div className="text-center">
              <div>Bagian Keuangan & Kasir Kampus</div>
              <div className="my-2 border border-dashed border-cyan-500 p-1.5 rounded text-[10px] text-cyan-700 font-mono">
                TERVERIFIKASI SISTEM
              </div>
              <div className="font-bold text-slate-800 underline">Biro Administrasi Keuangan</div>
            </div>
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Silakan pilih format unduhan bukti pembayaran:
          </div>

          <div className="flex items-center gap-2">
            {/* Export PDF Button */}
            <button
              onClick={handleExportPdf}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>Export PDF</span>
            </button>

            {/* Export DOCX Button */}
            <button
              onClick={handleExportDocx}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Export Word (.docx)</span>
            </button>

            {/* Print directly */}
            <button
              onClick={handleNativePrint}
              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              title="Cetak langsung ke printer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
