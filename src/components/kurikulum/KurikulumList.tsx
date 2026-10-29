import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { Kurikulum } from '../../types/kurikulum';
import { KurikulumModal } from './KurikulumModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Search, Edit2, Trash2, BookOpen, Filter } from 'lucide-react';

export const KurikulumList: React.FC = () => {
  const { kurikulumList, prodiList, addKurikulum, updateKurikulum, deleteKurikulum } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedProdi, setSelectedProdi] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKurikulum, setEditingKurikulum] = useState<Kurikulum | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Kurikulum | null>(null);

  const filtered = kurikulumList.filter((k) => {
    const matchText =
      k.namaMk.toLowerCase().includes(filterText.toLowerCase()) ||
      k.kodeMk.toLowerCase().includes(filterText.toLowerCase());
    const matchSem = selectedSemester === 'all' || k.semester.toString() === selectedSemester;
    const matchProdi = selectedProdi === 'all' || k.prodiId === selectedProdi;
    return matchText && matchSem && matchProdi;
  });

  const totalSks = filtered.reduce((acc, curr) => acc + curr.sks, 0);

  const handleOpenAdd = () => {
    setEditingKurikulum(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Kurikulum) => {
    setEditingKurikulum(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<Kurikulum, 'id'>) => {
    if (editingKurikulum) {
      updateKurikulum(editingKurikulum.id, data);
    } else {
      addKurikulum(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteKurikulum(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>Master Kurikulum & Mata Kuliah</span>
          </h2>
          <p className="text-xs text-slate-500">
            Daftar kurikulum resmi, sebaran mata kuliah per semester, dan beban SKS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Semester Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="text-xs px-2.5 py-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">Semua Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>

          {/* Prodi Filter */}
          <select
            value={selectedProdi}
            onChange={(e) => setSelectedProdi(e.target.value)}
            className="text-xs px-2.5 py-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">Semua Prodi</option>
            {prodiList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.namaProdi}
              </option>
            ))}
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama / kode MK..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 w-44 sm:w-52"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Mata Kuliah</span>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-xs bg-amber-50 border border-amber-200 p-2.5 rounded text-amber-900 font-medium">
        <span>
          Total Mata Kuliah: <strong>{filtered.length}</strong>
        </span>
        <span>&bull;</span>
        <span>
          Akumulasi SKS: <strong>{totalSks} SKS</strong>
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#2c3840] text-white uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3 w-12 text-center">No</th>
                <th className="p-3">Tahun</th>
                <th className="p-3">Kode MK</th>
                <th className="p-3">Nama Mata Kuliah</th>
                <th className="p-3 text-center">SKS</th>
                <th className="p-3 text-center">Semester</th>
                <th className="p-3">Jenis</th>
                <th className="p-3">Program Studi</th>
                <th className="p-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="p-3 text-slate-600">{item.tahunKurikulum}</td>
                  <td className="p-3 font-mono font-bold text-amber-700">{item.kodeMk}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    <div>{item.namaMk}</div>
                    {item.deskripsi && (
                      <div className="text-[11px] text-slate-400 font-normal truncate max-w-xs">
                        {item.deskripsi}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded font-black bg-slate-100 text-slate-700">
                      {item.sks}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-slate-700">Sem {item.semester}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.jenis === 'Wajib'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.jenis}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">
                    {item.namaProdi || prodiList.find((p) => p.id === item.prodiId)?.namaProdi || '-'}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Data"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Hapus MK"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400 text-xs">
                    Tidak ada mata kuliah kurikulum yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <KurikulumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingKurikulum}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Mata Kuliah Kurikulum"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.namaMk} (${deleteTarget?.kodeMk})"?`}
        confirmLabel="Hapus Sekarang"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
