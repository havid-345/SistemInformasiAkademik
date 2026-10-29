import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { SemesterAkademik } from '../../types/semester';

interface SemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<SemesterAkademik, 'id'>) => void;
  initialData?: SemesterAkademik | null;
}

export const SemesterModal: React.FC<SemesterModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [kodeSemester, setKodeSemester] = useState('20261');
  const [tahunAjaran, setTahunAjaran] = useState('2026/2027');
  const [tipe, setTipe] = useState<'Ganjil' | 'Genap' | 'Pendek'>('Ganjil');
  const [status, setStatus] = useState<'Aktif' | 'Non-Aktif'>('Aktif');
  const [tglMulai, setTglMulai] = useState('2026-09-01');
  const [tglSelesai, setTglSelesai] = useState('2027-01-31');
  const [batasKrs, setBatasKrs] = useState('2026-09-15');

  useEffect(() => {
    if (initialData) {
      setKodeSemester(initialData.kodeSemester);
      setTahunAjaran(initialData.tahunAjaran);
      setTipe(initialData.tipe);
      setStatus(initialData.status);
      setTglMulai(initialData.tglMulai);
      setTglSelesai(initialData.tglSelesai);
      setBatasKrs(initialData.batasKrs);
    } else {
      setKodeSemester('20271');
      setTahunAjaran('2027/2028');
      setTipe('Ganjil');
      setStatus('Non-Aktif');
      setTglMulai('2027-09-01');
      setTglSelesai('2028-01-31');
      setBatasKrs('2027-09-15');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeSemester.trim() || !tahunAjaran.trim()) {
      alert('Kode semester dan tahun ajaran wajib diisi!');
      return;
    }
    onSave({
      kodeSemester: kodeSemester.trim(),
      tahunAjaran: tahunAjaran.trim(),
      tipe,
      status,
      tglMulai,
      tglSelesai,
      batasKrs,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Semester Akademik' : 'Tambah Periode Semester Baru'}
      subtitle="Atur periode kalender akademik dan masa pengisian KRS"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kode Semester *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 20261"
              value={kodeSemester}
              onChange={(e) => setKodeSemester(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tahun Ajaran *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 2026/2027"
              value={tahunAjaran}
              onChange={(e) => setTahunAjaran(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tipe Semester
            </label>
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
            >
              <option value="Ganjil">Ganjil (Gasal)</option>
              <option value="Genap">Genap</option>
              <option value="Pendek">Antara / Pendek</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Status Perkuliahan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white font-medium"
            >
              <option value="Aktif">Aktif (Sedang Berjalan)</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={tglMulai}
              onChange={(e) => setTglMulai(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tanggal Selesai
            </label>
            <input
              type="date"
              value={tglSelesai}
              onChange={(e) => setTglSelesai(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Batas Akhir Pengisian KRS Mahasiswa
          </label>
          <input
            type="date"
            value={batasKrs}
            onChange={(e) => setBatasKrs(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? 'Simpan Perubahan' : 'Tambah Semester'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
