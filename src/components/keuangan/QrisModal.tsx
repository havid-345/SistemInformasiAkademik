import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { TagihanItem } from '../../types/keuangan';
import { formatRupiah } from '../../utils/formatters';
import { QrCode, Clock, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

interface QrisModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagihan: TagihanItem | null;
  onConfirmSuccess: (tagihanId: string) => void;
}

export const QrisModal: React.FC<QrisModalProps> = ({
  isOpen,
  onClose,
  tagihan,
  onConfirmSuccess,
}) => {
  const [timeLeft, setTimeLeft] = useState(899); // 14 mins 59 secs
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(899);
      setIsProcessing(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!tagihan) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleCopyNominal = () => {
    navigator.clipboard.writeText(tagihan.totalBayar.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmSuccess(tagihan.id);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pembayaran QRIS Dinamis"
      subtitle="Standar Pembayaran Nasional QRIS (Quick Response Code Indonesian Standard)"
      maxWidth="md"
    >
      <div className="flex flex-col items-center text-center">
        {/* Merchant Banner */}
        <div className="w-full bg-slate-900 text-white p-3 rounded-lg flex items-center justify-between mb-4">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">
              NMID: ID1020088921200
            </span>
            <span className="text-xs font-bold text-slate-100">
              UNIVERSITAS AKADEMIKA - SIMAKU
            </span>
          </div>
          <div className="px-2.5 py-1 bg-red-600 rounded text-[11px] font-black tracking-widest text-white shadow-xs">
            QRIS
          </div>
        </div>

        {/* Nominal Box */}
        <div className="w-full bg-cyan-50 border border-cyan-200 rounded-lg p-3.5 mb-4">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Tagihan Pembayaran
          </span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="text-2xl font-black text-cyan-800 tracking-tight">
              {formatRupiah(tagihan.totalBayar)}
            </span>
            <button
              onClick={handleCopyNominal}
              className="p-1 text-cyan-600 hover:text-cyan-800 transition-colors"
              title="Salin Nominal"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1 font-medium">
            {tagihan.deskripsi} &bull; {tagihan.namaMahasiswa} ({tagihan.nim})
          </span>
        </div>

        {/* QR Box with QRIS Frame */}
        <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-md flex flex-col items-center relative max-w-[260px] w-full mb-3">
          {/* QRIS Top Banner */}
          <div className="flex items-center justify-between w-full mb-2 px-1">
            <span className="text-[10px] font-extrabold text-slate-800 tracking-wider">
              QRIS PEMBAYARAN
            </span>
            <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">
              GPN
            </span>
          </div>

          {/* Clean High-Contrast Dynamic QR SVG */}
          <div className="relative p-2 bg-white rounded-lg">
            <svg
              viewBox="0 0 160 160"
              className="w-48 h-48 select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary */}
              <rect width="160" height="160" fill="white" />

              {/* Corner 1: Top-Left Finder */}
              <rect x="10" y="10" width="40" height="40" fill="#1e293b" />
              <rect x="16" y="16" width="28" height="28" fill="white" />
              <rect x="22" y="22" width="16" height="16" fill="#1e293b" />

              {/* Corner 2: Top-Right Finder */}
              <rect x="110" y="10" width="40" height="40" fill="#1e293b" />
              <rect x="116" y="16" width="28" height="28" fill="white" />
              <rect x="122" y="22" width="16" height="16" fill="#1e293b" />

              {/* Corner 3: Bottom-Left Finder */}
              <rect x="10" y="110" width="40" height="40" fill="#1e293b" />
              <rect x="16" y="116" width="28" height="28" fill="white" />
              <rect x="22" y="122" width="16" height="16" fill="#1e293b" />

              {/* Timing patterns */}
              <rect x="56" y="25" width="48" height="4" fill="#1e293b" strokeDasharray="4 4" />
              <rect x="25" y="56" width="4" height="48" fill="#1e293b" strokeDasharray="4 4" />

              {/* Dynamic decorative QR Matrix points */}
              <rect x="58" y="12" width="6" height="6" fill="#1e293b" />
              <rect x="68" y="12" width="6" height="6" fill="#1e293b" />
              <rect x="78" y="18" width="6" height="6" fill="#1e293b" />
              <rect x="94" y="14" width="6" height="6" fill="#1e293b" />

              <rect x="60" y="36" width="8" height="8" fill="#1e293b" />
              <rect x="74" y="36" width="8" height="8" fill="#1e293b" />
              <rect x="88" y="36" width="8" height="8" fill="#1e293b" />

              <rect x="58" y="52" width="6" height="6" fill="#1e293b" />
              <rect x="72" y="52" width="16" height="6" fill="#1e293b" />
              <rect x="96" y="52" width="8" height="6" fill="#1e293b" />
              <rect x="112" y="58" width="8" height="8" fill="#1e293b" />
              <rect x="126" y="58" width="8" height="8" fill="#1e293b" />
              <rect x="140" y="58" width="8" height="8" fill="#1e293b" />

              {/* Middle Section */}
              <rect x="14" y="60" width="8" height="8" fill="#1e293b" />
              <rect x="26" y="74" width="8" height="8" fill="#1e293b" />
              <rect x="40" y="66" width="8" height="8" fill="#1e293b" />
              <rect x="14" y="86" width="8" height="8" fill="#1e293b" />
              <rect x="36" y="88" width="8" height="8" fill="#1e293b" />

              {/* Bottom Right Area */}
              <rect x="58" y="68" width="8" height="8" fill="#1e293b" />
              <rect x="72" y="68" width="8" height="8" fill="#1e293b" />
              <rect x="86" y="68" width="8" height="8" fill="#1e293b" />
              <rect x="100" y="68" width="8" height="8" fill="#1e293b" />
              <rect x="114" y="74" width="8" height="8" fill="#1e293b" />
              <rect x="128" y="74" width="8" height="8" fill="#1e293b" />
              <rect x="142" y="74" width="8" height="8" fill="#1e293b" />

              <rect x="58" y="86" width="8" height="8" fill="#1e293b" />
              <rect x="72" y="86" width="8" height="8" fill="#1e293b" />
              <rect x="88" y="86" width="8" height="8" fill="#1e293b" />
              <rect x="106" y="86" width="8" height="8" fill="#1e293b" />
              <rect x="120" y="86" width="8" height="8" fill="#1e293b" />
              <rect x="136" y="86" width="8" height="8" fill="#1e293b" />

              <rect x="58" y="104" width="8" height="8" fill="#1e293b" />
              <rect x="74" y="104" width="8" height="8" fill="#1e293b" />
              <rect x="90" y="104" width="8" height="8" fill="#1e293b" />
              <rect x="112" y="104" width="8" height="8" fill="#1e293b" />
              <rect x="132" y="104" width="8" height="8" fill="#1e293b" />

              <rect x="58" y="122" width="16" height="8" fill="#1e293b" />
              <rect x="82" y="122" width="8" height="8" fill="#1e293b" />
              <rect x="100" y="122" width="16" height="8" fill="#1e293b" />
              <rect x="126" y="122" width="8" height="8" fill="#1e293b" />
              <rect x="140" y="122" width="8" height="8" fill="#1e293b" />

              <rect x="58" y="138" width="8" height="8" fill="#1e293b" />
              <rect x="76" y="138" width="8" height="8" fill="#1e293b" />
              <rect x="94" y="138" width="8" height="8" fill="#1e293b" />
              <rect x="112" y="138" width="8" height="8" fill="#1e293b" />
              <rect x="130" y="138" width="8" height="8" fill="#1e293b" />

              {/* Center Logo Shield Badge */}
              <circle cx="80" cy="80" r="16" fill="white" />
              <circle cx="80" cy="80" r="13" fill="#e74c3c" />
              <text
                x="80"
                y="85"
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill="white"
                fontFamily="sans-serif"
              >
                Q
              </text>
            </svg>
          </div>

          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Ref: {tagihan.kodeTagihan}
          </div>
        </div>

        {/* Expiry countdown */}
        <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>
            Batas waktu pembayaran: <strong>{timeFormatted}</strong>
          </span>
        </div>

        {/* Accepted apps badges */}
        <div className="text-[11px] text-slate-500 mb-4">
          Bisa dibayar menggunakan GoPay, OVO, Dana, ShopeePay, BCA Mobile, Livin by Mandiri, BNI Mobile,
          dan seluruh aplikasi perbankan berstandar QRIS.
        </div>

        {/* Action Button: Simulation of Successful QR Payment */}
        <div className="w-full flex flex-col gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Memproses Verifikasi QRIS...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasi Bayar Sekarang (Berhasil)</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </Modal>
  );
};
