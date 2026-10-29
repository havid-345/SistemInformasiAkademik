import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { JadwalKuliah } from '../../types/jadwal';
import { useAcademic } from '../../context/AcademicContext';

interface JadwalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<JadwalKuliah, 'id' | 'terisi'>) => void;
  initialData?: JadwalKuliah | null;
}

export const JadwalModal: React.FC<JadwalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const { kurikulumList, dosenList, prodiList } = useAcademic();

  const [hari, setHari] = useState<JadwalKuliah['hari']>('Senin');
  const [jamMulai, setJamMulai] = useState('08:00');
  const [jamSelesai, setJamSelesai] = useState('10:30');
  const [kurikulumId, setKurikulumId] = useState('');
  const [dosenId, setDosenId] = useState('');
  const [ruangan, setRuangan] = useState('Lab Komputer 01');
  const [kelas, setKelas] = useState('TI-3A');
  const [kuota, setKuota] = useState(40);
  const [semesterPaket, setSemesterPaket] = useState(3);

  useEffect(() => {
    if (initialData) {
      setHari(initialData.hari);
      setJamMulai(initialData.jamMulai);
      setJamSelesai(initialData.jamSelesai);
      setKurikulumId(initialData.kurikulumId);
      setDosenId(initialData.dosenId);
      setRuangan(initialData.ruangan);
      setKelas(initialData.kelas);
      setKuota(initialData.kuota);
      setSemesterPaket(initialData.semesterPaket);
    } else {
      setHari('Senin');
      setJamMulai('08:00');
      setJamSelesai('10:30');
      setKurikulumId(kurikulumList[0]?.id || '');
      setDosenId(dosenList[0]?.id || '');
      setRuangan('Lab Komputer 01');
      setKelas('TI-3A');
      setKuota(40);
      setSemesterPaket(3);
    }
  }, [initialData, isOpen, kurikulumList, dosenList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selKur = kurikulumList.find((k) => k.id === kurikulumId);
    const selDos = dosenList.find((d) => d.id === dosenId);

    if (!selKur || !selDos) {
      alert('Pilih Mata Kuliah dan Dosen Pengampu yang valid!');
      return;
    }

    onSave({
      hari,
      jamMulai,
      jamSelesai,
      kurikulumId,
      kodeMk: selKur.kodeMk,
      namaMk: selKur.namaMk,
      sks: selKur.sks,
      dosenId,
      namaDosen: `${selDos.namaLengkap}, ${selDos.gelar}`,
      ruangan: ruangan.trim(),
      kelas: kelas.trim().toUpperCase(),
      kuota: Number(kuota),
      prodiId: selKur.prodiId,
      namaProdi: selKur.namaProdi,
      semesterPaket: Number(semesterPaket),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Jadwal Kuliah' : 'Tambah Jadwal Perkuliahan Baru'}
      subtitle="Atur alokasi hari, jam, ruang kuliah, dan dosen pengampu mata kuliah"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Pilih Mata Kuliah Kurikulum *
          </label>
          <select
            required
            value={kurikulumId}
            onChange={(e) => setKurikulumId(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
          >
            {kurikulumList.map((k) => (
              <option key={k.id} value={k.id}>
                [{k.kodeMk}] {k.namaMk} ({k.sks} SKS - Sem {k.semester})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Dosen Pengampu Utama *
          </label>
          <select
            required
            value={dosenId}
            onChange={(e) => setDosenId(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
          >
            {dosenList.map((d) => (
              <option key={d.id} value={d.id}>
                {d.namaLengkap}, {d.gelar} (NIDN: {d.nidn}) - {d.homebaseProdi}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hari Perkuliahan *
            </label>
            <select
              value={hari}
              onChange={(e) => setHari(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
            >
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jam Mulai
            </label>
            <input
              type="time"
              required
              value={jamMulai}
              onChange={(e) => setJamMulai(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jam Selesai
            </label>
            <input
              type="time"
              required
              value={jamSelesai}
              onChange={(e) => setJamSelesai(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ruangan Kelas *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Lab Komputer 02"
              value={ruangan}
              onChange={(e) => setRuangan(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Kelas *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: TI-3A"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kapasitas Kuota
            </label>
            <input
              type="number"
              min="10"
              max="150"
              required
              value={kuota}
              onChange={(e) => setKuota(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
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
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? 'Simpan Perubahan' : 'Buat Jadwal'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
