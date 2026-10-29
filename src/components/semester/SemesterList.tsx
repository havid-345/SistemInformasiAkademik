import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { SemesterAkademik } from '../../types/semester';
import { SemesterModal } from './SemesterModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatTanggalIndonesia } from '../../utils/formatters';
import { Plus, Search, Edit2, Trash2, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const SemesterList: React.FC = () => {
  const { semesterList, addSemester, updateSemester, deleteSemester, setActiveSemesterId } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SemesterAkademik | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SemesterAkademik | null>(null);

  const filtered = semesterList.filter(
    (s) =>
      s.tahunAjaran.toLowerCase().includes(filterText.toLowerCase()) ||
      s.kodeSemester.toLowerCase().includes(filterText.toLowerCase()) ||
      s.tipe.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SemesterAkademik) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<SemesterAkademik, 'id'>) => {
    if (editingItem) {
      updateSemester(editingItem.id, data);
    } else {
      addSemester(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteSemester(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Master Semester Akademik</span>
          </h2>
          <p className="text-xs text-slate-500">
            Kelola tahun akademik, periode semester gasal/genap, dan jadwal aktifasi KRS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari semester..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 w-44 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Semester</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#2c3840] text-white uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3 w-12 text-center">No</th>
                <th className="p-3">Kode</th>
                <th className="p-3">Tahun Ajaran</th>
                <th className="p-3">Tipe Semester</th>
                <th className="p-3">Periode Kuliah</th>
                <th className="p-3">Batas Akhir KRS</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center w-36">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => {
                const isAktif = item.status === 'Aktif';
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isAktif ? 'bg-purple-50/40 font-medium' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-purple-700">{item.kodeSemester}</td>
                    <td className="p-3 font-semibold text-slate-800">{item.tahunAjaran}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700">
                        Semester {item.tipe}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">
                      {formatTanggalIndonesia(item.tglMulai)} s/d {formatTanggalIndonesia(item.tglSelesai)}
                    </td>
                    <td className="p-3 text-slate-700 flex items-center gap-1 pt-4">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{formatTanggalIndonesia(item.batasKrs)}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isAktif
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isAktif && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {!isAktif && (
                          <button
                            onClick={() => setActiveSemesterId(item.id)}
                            className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded text-[10px] font-bold transition-colors"
                            title="Aktifkan semester ini"
                          >
                            Jadikan Aktif
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit Semester"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          disabled={isAktif}
                          className={`p-1.5 rounded transition-colors ${
                            isAktif
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'text-rose-600 hover:bg-rose-50'
                          }`}
                          title={isAktif ? 'Semester aktif tidak boleh dihapus' : 'Hapus Semester'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                    Tidak ada semester yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <SemesterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Semester Akademik"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.tahunAjaran} (${deleteTarget?.tipe})"?`}
        confirmLabel="Hapus Sekarang"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
