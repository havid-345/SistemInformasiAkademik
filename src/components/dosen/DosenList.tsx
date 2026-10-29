import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { Dosen } from '../../types/dosen';
import { DosenModal } from './DosenModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Search, Edit2, Trash2, Users, Mail, Phone, Award } from 'lucide-react';

export const DosenList: React.FC = () => {
  const { dosenList, prodiList, addDosen, updateDosen, deleteDosen } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [filterProdi, setFilterProdi] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Dosen | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Dosen | null>(null);

  const filtered = dosenList.filter((d) => {
    const matchText =
      d.namaLengkap.toLowerCase().includes(filterText.toLowerCase()) ||
      d.nidn.includes(filterText) ||
      d.email.toLowerCase().includes(filterText.toLowerCase());

    const matchProdi = filterProdi === 'all' || d.homebaseProdi === filterProdi;
    return matchText && matchProdi;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Dosen) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<Dosen, 'id'>) => {
    if (editingItem) {
      updateDosen(editingItem.id, data);
    } else {
      addDosen(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteDosen(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Master Data Dosen & Tenaga Pengajar</span>
          </h2>
          <p className="text-xs text-slate-500">
            Data NIDN, gelar kehormatan, homebase prodi, dan jabatan fungsional akademik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Prodi filter */}
          <select
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
            className="text-xs px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Semua Homebase</option>
            {prodiList.map((p) => (
              <option key={p.id} value={p.namaProdi}>
                {p.namaProdi}
              </option>
            ))}
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari dosen / NIDN..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Dosen</span>
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
                <th className="p-3">NIDN</th>
                <th className="p-3">Nama Lengkap & Gelar</th>
                <th className="p-3">Homebase Prodi</th>
                <th className="p-3">Jabatan Fungsional</th>
                <th className="p-3">Kontak</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                  <td className="p-3 font-mono font-bold text-indigo-700">{item.nidn}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">
                      {item.namaLengkap}, {item.gelar}
                    </div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{item.homebaseProdi}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold flex items-center gap-1 w-max">
                      <Award className="w-3 h-3 text-amber-500" />
                      {item.jabatanAkademik}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{item.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{item.noHp}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Aktif'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Dosen"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Hapus Dosen"
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
                    Tidak ada data dosen yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <DosenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Data Dosen"
        message={`Apakah Anda yakin ingin menghapus data "${deleteTarget?.namaLengkap}, ${deleteTarget?.gelar}"?`}
        confirmLabel="Hapus Sekarang"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
