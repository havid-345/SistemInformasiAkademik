import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { JenisNilai } from '../../types/jenisNilai';

interface JenisNilaiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<JenisNilai, 'id'>) => void;
  initialData?: JenisNilai | null;
}

export const JenisNilaiModal: React.FC<JenisNilaiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [bobotPersen, setBobotPersen] = useState(20);
  const [keterangan, setKeterangan] = useState('');
  const [isAktif, setIsAktif] = useState(true);

  useEffect(() => {
    if (initialData) {
      setKode(initialData.kode);
      setNama(initialData.nama);
      setBobotPersen(initialData.bobotPersen);
      setKeterangan(initialData.keterangan);
      setIsAktif(initialData.isAktif);
    } else {
      setKode('');
      setNama('');
      setBobotPersen(20);
      setKeterangan('');
      setIsAktif(true);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kode.trim() || !nama.trim()) {
      alert('Kode dan nama komponen penilaian wajib diisi!');
      return;
    }
    onSave({
      kode: kode.trim().toUpperCase(),
      nama: nama.trim(),
      bobotPersen: Number(bobotPersen),
      keterangan: keterangan.trim(),
      isAktif,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Komponen Penilaian' : 'Tambah Jenis Penilaian Baru'}
      subtitle="Kelola kategori penilaian dan bobot persentase kalkulasi IP/Nilai Akhir"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kode *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: UTS"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none uppercase font-mono"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Komponen Penilaian *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Ujian Tengah Semester"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Bobot Persentase (%) *
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="100"
              required
              value={bobotPersen}
              onChange={(e) => setBobotPersen(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none pr-8"
            />
            <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Keterangan / Kriteria Penilaian
          </label>
          <textarea
            rows={2}
            placeholder="Keterangan komponen penilaian..."
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAktif"
            checked={isAktif}
            onChange={(e) => setIsAktif(e.target.checked)}
            className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
          />
          <label htmlFor="isAktif" className="text-xs font-semibold text-slate-700">
            Status Aktif (Gunakan pada form input nilai dosen)
          </label>
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
            className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? 'Simpan Perubahan' : 'Tambah Jenis Nilai'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
