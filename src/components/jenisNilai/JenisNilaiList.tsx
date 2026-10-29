import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { JenisNilai } from '../../types/jenisNilai';
import { JenisNilaiModal } from './JenisNilaiModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Plus, Search, Edit2, Trash2, CheckCircle2, AlertCircle, Percent } from 'lucide-react';

export const JenisNilaiList: React.FC = () => {
  const { jenisNilaiList, addJenisNilai, updateJenisNilai, deleteJenisNilai } = useAcademic();
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JenisNilai | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<JenisNilai | null>(null);

  const filtered = jenisNilaiList.filter(
    (jn) =>
      jn.nama.toLowerCase().includes(filterText.toLowerCase()) ||
      jn.kode.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalBobot = jenisNilaiList.reduce((acc, curr) => (curr.isAktif ? acc + curr.bobotPersen : acc), 0);
  const isBobot100 = totalBobot === 100;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: JenisNilai) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<JenisNilai, 'id'>) => {
    if (editingItem) {
      updateJenisNilai(editingItem.id, data);
    } else {
      addJenisNilai(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteJenisNilai(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
            <span>Master Kategori & Jenis Nilai</span>
          </h2>
          <p className="text-xs text-slate-500">
            Kelola formula komponen evaluasi akademik (Tugas, UTS, UAS, Praktikum, dll.)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari jenis nilai..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-500 w-44 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Jenis Nilai</span>
          </button>
        </div>
      </div>

      {/* Total Bobot validation card */}
      <div
        className={`p-3 rounded border text-xs flex items-center justify-between font-medium ${
          isBobot100
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}
      >
        <div className="flex items-center gap-2">
          {isBobot100 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600" />
          )}
          <span>
            {isBobot100
              ? 'Total akumulasi bobot komponen aktif valid sempurna 100%.'
              : `Perhatian: Total akumulasi bobot saat ini ${totalBobot}%. Disarankan pas 100% untuk kalkulasi nilai akhir.`}
          </span>
        </div>
        <div className="flex items-center gap-1 font-bold text-sm bg-white/70 px-2.5 py-1 rounded">
          <Percent className="w-3.5 h-3.5" />
          <span>{totalBobot}%</span>
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
                <th className="p-3">Nama Komponen Penilaian</th>
                <th className="p-3 text-center">Bobot (%)</th>
                <th className="p-3">Keterangan / Aturan</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="p-3 font-mono font-bold text-cyan-700">{item.kode}</td>
                  <td className="p-3 font-semibold text-slate-800">{item.nama}</td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded font-black text-sm bg-cyan-50 text-cyan-800 border border-cyan-200">
                      {item.bobotPersen}%
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 max-w-sm">{item.keterangan || '-'}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.isAktif
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.isAktif ? 'Aktif' : 'Non-Aktif'}
                    </span>
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
                        title="Hapus Jenis Nilai"
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
                    Tidak ada jenis nilai yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <JenisNilaiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Jenis Penilaian"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.nama} (${deleteTarget?.kode})"?`}
        confirmLabel="Hapus Sekarang"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
