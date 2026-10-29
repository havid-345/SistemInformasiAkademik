import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Dosen } from '../../types/dosen';
import { useAcademic } from '../../context/AcademicContext';

interface DosenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Dosen, 'id'>) => void;
  initialData?: Dosen | null;
}

export const DosenModal: React.FC<DosenModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const { prodiList } = useAcademic();

  const [nidn, setNidn] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [gelar, setGelar] = useState('M.Kom.');
  const [email, setEmail] = useState('');
  const [noHp, setNoHp] = useState('');
  const [homebaseProdi, setHomebaseProdi] = useState('');
  const [status, setStatus] = useState<'Aktif' | 'Cuti' | 'Tugas Belajar'>('Aktif');
  const [jabatanAkademik, setJabatanAkademik] = useState<Dosen['jabatanAkademik']>('Lektor');

  useEffect(() => {
    if (initialData) {
      setNidn(initialData.nidn);
      setNamaLengkap(initialData.namaLengkap);
      setGelar(initialData.gelar);
      setEmail(initialData.email);
      setNoHp(initialData.noHp);
      setHomebaseProdi(initialData.homebaseProdi);
      setStatus(initialData.status);
      setJabatanAkademik(initialData.jabatanAkademik);
    } else {
      setNidn('');
      setNamaLengkap('');
      setGelar('M.Kom.');
      setEmail('');
      setNoHp('');
      setHomebaseProdi(prodiList[0]?.namaProdi || 'Teknik Informatika');
      setStatus('Aktif');
      setJabatanAkademik('Lektor');
    }
  }, [initialData, isOpen, prodiList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nidn.trim() || !namaLengkap.trim()) {
      alert('NIDN dan Nama Lengkap wajib diisi!');
      return;
    }
    onSave({
      nidn: nidn.trim(),
      namaLengkap: namaLengkap.trim(),
      gelar: gelar.trim(),
      email: email.trim() || `${nidn}@simaku.ac.id`,
      noHp: noHp.trim() || '081234567890',
      homebaseProdi: homebaseProdi || 'Teknik Informatika',
      status,
      jabatanAkademik,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Data Dosen' : 'Tambah Tenaga Pengajar / Dosen'}
      subtitle="Kelola NIDN, identitas kepangkatan, dan homebase program studi"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              NIDN *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 0412088501"
              value={nidn}
              onChange={(e) => setNidn(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Lengkap (Tanpa Gelar) *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Dr. Hendra Gunawan"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Gelar Akademik
            </label>
            <input
              type="text"
              placeholder="Contoh: M.T., Ph.D."
              value={gelar}
              onChange={(e) => setGelar(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Homebase Program Studi
            </label>
            <select
              value={homebaseProdi}
              onChange={(e) => setHomebaseProdi(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              {prodiList.map((p) => (
                <option key={p.id} value={p.namaProdi}>
                  {p.namaProdi}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Resmi
            </label>
            <input
              type="email"
              placeholder="dosen@simaku.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nomor WhatsApp / HP
            </label>
            <input
              type="tel"
              placeholder="081234567890"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jabatan Fungsional
            </label>
            <select
              value={jabatanAkademik}
              onChange={(e) => setJabatanAkademik(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              <option value="Asisten Ahli">Asisten Ahli</option>
              <option value="Lektor">Lektor</option>
              <option value="Lektor Kepala">Lektor Kepala</option>
              <option value="Guru Besar">Guru Besar (Profesor)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Status Kepegawaian
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Tugas Belajar">Tugas Belajar</option>
            </select>
          </div>
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
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? 'Simpan Perubahan' : 'Tambah Dosen'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
