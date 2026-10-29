import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { ProgramStudi } from '../../types/prodi';

interface ProdiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<ProgramStudi, 'id' | 'jumlahMahasiswa'>) => void;
  initialData?: ProgramStudi | null;
}

export const ProdiModal: React.FC<ProdiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [kodeProdi, setKodeProdi] = useState('');
  const [namaProdi, setNamaProdi] = useState('');
  const [jenjang, setJenjang] = useState<'S1' | 'D3' | 'S2'>('S1');
  const [akreditasi, setAkreditasi] = useState<'Unggul' | 'A' | 'Baik Sekali' | 'B' | 'Baik'>('Unggul');
  const [kaprodi, setKaprodi] = useState('');

  useEffect(() => {
    if (initialData) {
      setKodeProdi(initialData.kodeProdi);
      setNamaProdi(initialData.namaProdi);
      setJenjang(initialData.jenjang);
      setAkreditasi(initialData.akreditasi);
      setKaprodi(initialData.kaprodi);
    } else {
      setKodeProdi('');
      setNamaProdi('');
      setJenjang('S1');
      setAkreditasi('Unggul');
      setKaprodi('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeProdi.trim() || !namaProdi.trim() || !kaprodi.trim()) {
      alert('Harap isi semua kolom wajib!');
      return;
    }
    onSave({
      kodeProdi: kodeProdi.trim(),
      namaProdi: namaProdi.trim(),
      jenjang,
      akreditasi,
      kaprodi: kaprodi.trim(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}
      subtitle="Kelola informasi departemen dan program studi universitas"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Kode Prodi *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: 55201"
            value={kodeProdi}
            onChange={(e) => setKodeProdi(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nama Program Studi *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Teknik Informatika"
            value={namaProdi}
            onChange={(e) => setNamaProdi(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jenjang
            </label>
            <select
              value={jenjang}
              onChange={(e) => setJenjang(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
            >
              <option value="S1">S1 - Sarjana</option>
              <option value="D3">D3 - Diploma</option>
              <option value="S2">S2 - Magister</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Akreditasi
            </label>
            <select
              value={akreditasi}
              onChange={(e) => setAkreditasi(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
            >
              <option value="Unggul">Unggul</option>
              <option value="A">A</option>
              <option value="Baik Sekali">Baik Sekali</option>
              <option value="B">B</option>
              <option value="Baik">Baik</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Ketua Program Studi (Kaprodi) *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Dr. Hendra Gunawan, M.T."
            value={kaprodi}
            onChange={(e) => setKaprodi(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
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
            className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? 'Simpan Perubahan' : 'Tambah Prodi'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
