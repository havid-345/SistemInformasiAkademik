import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Kurikulum } from '../../types/kurikulum';
import { useAcademic } from '../../context/AcademicContext';

interface KurikulumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Kurikulum, 'id'>) => void;
  initialData?: Kurikulum | null;
}

export const KurikulumModal: React.FC<KurikulumModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const { prodiList } = useAcademic();

  const [tahunKurikulum, setTahunKurikulum] = useState('2024');
  const [kodeMk, setKodeMk] = useState('');
  const [namaMk, setNamaMk] = useState('');
  const [sks, setSks] = useState(3);
  const [semester, setSemester] = useState(1);
  const [jenis, setJenis] = useState<'Wajib' | 'Pilihan'>('Wajib');
  const [prodiId, setProdiId] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  useEffect(() => {
    if (initialData) {
      setTahunKurikulum(initialData.tahunKurikulum);
      setKodeMk(initialData.kodeMk);
      setNamaMk(initialData.namaMk);
      setSks(initialData.sks);
      setSemester(initialData.semester);
      setJenis(initialData.jenis);
      setProdiId(initialData.prodiId);
      setDeskripsi(initialData.deskripsi || '');
    } else {
      setTahunKurikulum('2024');
      setKodeMk('');
      setNamaMk('');
      setSks(3);
      setSemester(1);
      setJenis('Wajib');
      setProdiId(prodiList[0]?.id || '');
      setDeskripsi('');
    }
  }, [initialData, isOpen, prodiList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeMk.trim() || !namaMk.trim() || !prodiId) {
      alert('Harap isi kolom kode MK, nama MK, dan program studi!');
      return;
    }
    const selectedProdi = prodiList.find((p) => p.id === prodiId);
    onSave({
      tahunKurikulum,
      kodeMk: kodeMk.trim().toUpperCase(),
      namaMk: namaMk.trim(),
      sks: Number(sks),
      semester: Number(semester),
      jenis,
      prodiId,
      namaProdi: selectedProdi?.namaProdi,
      deskripsi: deskripsi.trim(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Mata Kuliah Kurikulum' : 'Tambah Mata Kuliah ke Kurikulum'}
      subtitle="Kelola distribusi mata kuliah, bobot SKS, dan semester paket"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tahun Kurikulum *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 2024"
              value={tahunKurikulum}
              onChange={(e) => setTahunKurikulum(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Program Studi *
            </label>
            <select
              required
              value={prodiId}
              onChange={(e) => setProdiId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              {prodiList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.namaProdi} ({p.jenjang})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kode MK *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: TIF3101"
              value={kodeMk}
              onChange={(e) => setKodeMk(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Mata Kuliah *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pemrograman Web Lanjut"
              value={namaMk}
              onChange={(e) => setNamaMk(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Bobot SKS *
            </label>
            <input
              type="number"
              min="1"
              max="6"
              required
              value={sks}
              onChange={(e) => setSks(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Semester Paket *
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jenis Mata Kuliah
            </label>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              <option value="Wajib">Wajib</option>
              <option value="Pilihan">Pilihan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Deskripsi / Silabus Ringkas
          </label>
          <textarea
            rows={2}
            placeholder="Keterangan singkat capaian pembelajaran mata kuliah"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? 'Simpan Perubahan' : 'Tambah Mata Kuliah'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
