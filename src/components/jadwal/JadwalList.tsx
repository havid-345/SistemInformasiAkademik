import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { JadwalKuliah } from '../../types/jadwal';
import { JadwalModal } from './JadwalModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Search, Edit2, Trash2, Clock, Calendar, MapPin, User, Users } from 'lucide-react';

export const JadwalList: React.FC = () => {
  const { jadwalList, addJadwal, updateJadwal, deleteJadwal } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [filterHari, setFilterHari] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JadwalKuliah | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<JadwalKuliah | null>(null);

  const filtered = jadwalList.filter((j) => {
    const matchText =
      j.namaMk.toLowerCase().includes(filterText.toLowerCase()) ||
      j.kodeMk.toLowerCase().includes(filterText.toLowerCase()) ||
      j.namaDosen.toLowerCase().includes(filterText.toLowerCase()) ||
      j.kelas.toLowerCase().includes(filterText.toLowerCase()) ||
      j.ruangan.toLowerCase().includes(filterText.toLowerCase());

    const matchHari = filterHari === 'all' || j.hari === filterHari;
    return matchText && matchHari;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: JadwalKuliah) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<JadwalKuliah, 'id' | 'terisi'>) => {
    if (editingItem) {
      updateJadwal(editingItem.id, data);
    } else {
      addJadwal(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteJadwal(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-600" />
            <span>Master Jadwal Kuliah & Ruangan</span>
          </h2>
          <p className="text-xs text-slate-500">
            Penjadwalan perkuliahan semester aktif, ruangan kuliah, dan kuota mahasiswa per kelas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Hari */}
          <select
            value={filterHari}
            onChange={(e) => setFilterHari(e.target.value)}
            className="text-xs px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="all">Semua Hari</option>
            {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari MK, dosen, ruang, kelas..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 w-48 sm:w-60"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Jadwal</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#2c3840] text-white uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3 w-10 text-center">No</th>
                <th className="p-3">Hari & Jam</th>
                <th className="p-3">Mata Kuliah & SKS</th>
                <th className="p-3">Kelas</th>
                <th className="p-3">Dosen Pengampu</th>
                <th className="p-3">Ruangan</th>
                <th className="p-3 text-center">Kapasitas</th>
                <th className="p-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{item.hari}</div>
                    <div className="text-[11px] text-sky-700 font-mono">
                      {item.jamMulai} - {item.jamSelesai}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{item.namaMk}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                      <span>[{item.kodeMk}]</span>
                      <span>&bull;</span>
                      <span className="font-semibold text-slate-700">{item.sks} SKS</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700 font-mono">
                      {item.kelas}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-slate-800 font-medium">{item.namaDosen}</div>
                    <div className="text-[11px] text-slate-400">{item.namaProdi || 'Prodi'}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{item.ruangan}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[11px]">
                      <Users className="w-3 h-3 text-slate-500" />
                      <span>
                        {item.terisi} / {item.kuota}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Jadwal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                    Tidak ada jadwal kuliah yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <JadwalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Jadwal Kuliah"
        message={`Apakah Anda yakin ingin menghapus jadwal "${deleteTarget?.namaMk} (${deleteTarget?.kelas})"?`}
        confirmLabel="Hapus Sekarang"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
