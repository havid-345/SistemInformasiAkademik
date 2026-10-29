import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { ProgramStudi } from '../../types/prodi';
import { ProdiModal } from './ProdiModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Search, Edit2, Trash2, GraduationCap, Building2 } from 'lucide-react';

export const ProdiList: React.FC = () => {
  const { prodiList, addProdi, updateProdi, deleteProdi } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProdi, setEditingProdi] = useState<ProgramStudi | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProgramStudi | null>(null);

  const filtered = prodiList.filter(
    (p) =>
      p.namaProdi.toLowerCase().includes(filterText.toLowerCase()) ||
      p.kodeProdi.toLowerCase().includes(filterText.toLowerCase()) ||
      p.kaprodi.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProdi(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prodi: ProgramStudi) => {
    setEditingProdi(prodi);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<ProgramStudi, 'id' | 'jumlahMahasiswa'>) => {
    if (editingProdi) {
      updateProdi(editingProdi.id, data);
    } else {
      addProdi(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteProdi(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Master Program Studi</span>
          </h2>
          <p className="text-xs text-slate-500">
            Kelola data fakultas, kode prodi, jenjang akreditasi, dan ketua program studi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari prodi / kaprodi..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-500 w-48 sm:w-60"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Prodi</span>
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
                <th className="p-3">Kode Prodi</th>
                <th className="p-3">Nama Program Studi</th>
                <th className="p-3">Jenjang</th>
                <th className="p-3">Akreditasi</th>
                <th className="p-3">Ketua Program Studi (Kaprodi)</th>
                <th className="p-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="p-3 font-mono font-bold text-cyan-700">{item.kodeProdi}</td>
                  <td className="p-3 font-semibold text-slate-800">{item.namaProdi}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      {item.jenjang}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.akreditasi === 'Unggul' || item.akreditasi === 'A'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {item.akreditasi}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{item.kaprodi}</td>
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
                        title="Hapus Prodi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 text-xs">
                    Tidak ada program studi yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ProdiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProdi}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Program Studi"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.namaProdi}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus Sekarang"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
