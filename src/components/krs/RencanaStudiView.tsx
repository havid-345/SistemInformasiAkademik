import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useAuth } from '../../context/AuthContext';
import { JadwalKuliah } from '../../types/jadwal';
import { KrsItem, PengajuanKrs } from '../../types/krs';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Send,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const RencanaStudiView: React.FC = () => {
  const { jadwalList, krsList, ajukanKrs, activeSemester, showToast } = useAcademic();
  const { user } = useAuth();

  // Find existing KRS for this user or demo student
  const studentNim = user?.nimOrNidn || '2210511045';
  const studentName = user?.nama || 'Bima Satria Yudha';
  const studentProdi = user?.prodi || 'Teknik Informatika';
  const jatahSks = user?.jatahSks || 24;

  const currentPengajuan = krsList.find((k) => k.nim === studentNim);

  // Selected schedule IDs in current active edit
  const [selectedJadwalIds, setSelectedJadwalIds] = useState<string[]>(() => {
    if (currentPengajuan && currentPengajuan.mataKuliah.length > 0) {
      return currentPengajuan.mataKuliah.map((m) => m.jadwalId);
    }
    // Default select 2-3 courses if fresh
    return ['jad-3', 'jad-4'];
  });

  const selectedCourses: JadwalKuliah[] = useMemo(() => {
    return jadwalList.filter((j) => selectedJadwalIds.includes(j.id));
  }, [jadwalList, selectedJadwalIds]);

  const totalSksTaken = useMemo(() => {
    return selectedCourses.reduce((acc, curr) => acc + curr.sks, 0);
  }, [selectedCourses]);

  const isExceeded = totalSksTaken > jatahSks;

  // Check schedule conflict
  const conflicts = useMemo(() => {
    const list: string[] = [];
    for (let i = 0; i < selectedCourses.length; i++) {
      for (let j = i + 1; j < selectedCourses.length; j++) {
        const c1 = selectedCourses[i];
        const c2 = selectedCourses[j];
        if (c1.hari === c2.hari) {
          if (c1.jamMulai < c2.jamSelesai && c2.jamMulai < c1.jamSelesai) {
            list.push(`Bentrok di hari ${c1.hari}: "${c1.namaMk}" dan "${c2.namaMk}"`);
          }
        }
      }
    }
    return list;
  }, [selectedCourses]);

  const handleToggleCourse = (jadwal: JadwalKuliah) => {
    if (selectedJadwalIds.includes(jadwal.id)) {
      setSelectedJadwalIds(selectedJadwalIds.filter((id) => id !== jadwal.id));
    } else {
      if (totalSksTaken + jadwal.sks > jatahSks) {
        showToast(
          `Tidak dapat menambahkan mata kuliah. Total SKS akan melebihi jatah ${jatahSks} SKS!`,
          'warning'
        );
        return;
      }
      setSelectedJadwalIds([...selectedJadwalIds, jadwal.id]);
    }
  };

  const handleSubmitKrs = () => {
    if (selectedCourses.length === 0) {
      showToast('Pilih minimal 1 mata kuliah untuk mengajukan KRS!', 'warning');
      return;
    }
    if (isExceeded) {
      showToast(`Total SKS melebihi jatah maksimal (${jatahSks} SKS)!`, 'error');
      return;
    }
    if (conflicts.length > 0) {
      if (!confirm('Terdapat jadwal perkuliahan yang bentrok. Tetap ajukan KRS?')) {
        return;
      }
    }

    const items: KrsItem[] = selectedCourses.map((j) => ({
      jadwalId: j.id,
      kodeMk: j.kodeMk,
      namaMk: j.namaMk,
      sks: j.sks,
      kelas: j.kelas,
      hari: j.hari,
      jam: `${j.jamMulai} - ${j.jamSelesai}`,
      ruangan: j.ruangan,
      dosen: j.namaDosen,
    }));

    const newSubmission: PengajuanKrs = {
      id: currentPengajuan?.id || `krs-${Date.now()}`,
      nim: studentNim,
      namaMahasiswa: studentName,
      prodi: studentProdi,
      semesterAkademik: `${activeSemester?.tahunAjaran || '2026/2027'} ${
        activeSemester?.tipe || 'Ganjil'
      }`,
      semesterMahasiswa: 5,
      dosenPaNidn: '0412088501',
      dosenPaNama: 'Dr. Hendra Gunawan, M.T.',
      ipkTerakhir: 3.82,
      ipsTerakhir: 3.9,
      jatahSks: jatahSks,
      totalSks: totalSksTaken,
      status: 'Menunggu Persetujuan',
      tglPengajuan: new Date().toISOString().replace('T', ' ').substring(0, 16),
      catatanDosen: '',
      mataKuliah: items,
    };

    ajukanKrs(newSubmission);
  };

  const status = currentPengajuan?.status || 'Draft';

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-yellow-600" />
            <span>Kartu Rencana Studi (KRS Mahasiswa)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Pilih mata kuliah yang ditawarkan pada semester aktif sesuai ketentuan batas jatah SKS.
          </p>
        </div>

        {/* Current status pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status KRS:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              status === 'Disetujui'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : status === 'Menunggu Persetujuan'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : status === 'Ditolak'
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Student Academic Quota Card */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Mahasiswa
          </span>
          <div className="text-sm font-bold text-slate-800 mt-0.5">{studentName}</div>
          <div className="text-xs text-slate-500 font-mono">
            {studentNim} &bull; {studentProdi}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Dosen Pembimbing Akademik (PA)
          </span>
          <div className="text-sm font-bold text-slate-800 mt-0.5">Dr. Hendra Gunawan, M.T.</div>
          <div className="text-xs text-slate-500 font-mono">NIDN: 0412088501</div>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Indeks Prestasi (IPS / IPK)
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm font-bold text-slate-800">IPS: 3.90</span>
            <span className="text-slate-300">|</span>
            <span className="text-sm font-bold text-cyan-700">IPK: 3.82</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium">Memenuhi syarat 24 SKS</div>
        </div>

        <div className="border-l border-slate-100 sm:pl-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-600">Beban SKS Diambil:</span>
            <span
              className={`font-black text-sm ${
                isExceeded ? 'text-rose-600' : 'text-slate-800'
              }`}
            >
              {totalSksTaken} / {jatahSks} SKS
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-300 ${
                isExceeded
                  ? 'bg-rose-500'
                  : totalSksTaken === jatahSks
                  ? 'bg-emerald-500'
                  : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min((totalSksTaken / jatahSks) * 100, 100)}%` }}
            />
          </div>

          <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
            <span>Sisa kuota: {Math.max(jatahSks - totalSksTaken, 0)} SKS</span>
            {isExceeded && <span className="text-rose-600 font-bold">Melebihi jatah!</span>}
          </div>
        </div>
      </div>

      {/* Lecturer Note if rejected or approved */}
      {currentPengajuan?.catatanDosen && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
            currentPengajuan.status === 'Ditolak'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Dosen PA:</strong> {currentPengajuan.catatanDosen}
          </div>
        </div>
      )}

      {/* Schedule Conflict Warnings */}
      {conflicts.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 p-3 rounded-lg text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Peringatan Bentrok Jadwal Perkuliahan!</span>
          </div>
          {conflicts.map((c, i) => (
            <div key={i} className="pl-5 text-[11px]">
              &bull; {c}
            </div>
          ))}
        </div>
      )}

      {/* Main Grid: Available Schedules vs Selected KRS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Jadwal Mata Kuliah yang Ditawarkan (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Mata Kuliah Ditawarkan Semester Ini
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              {jadwalList.length} kelas tersedia
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto">
            {jadwalList.map((item) => {
              const isSelected = selectedJadwalIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-3.5 flex items-start justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-cyan-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800">{item.namaMk}</span>
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 font-mono text-[10px] font-bold rounded">
                        {item.kelas}
                      </span>
                      <span className="px-1.5 py-0.2 bg-cyan-100 text-cyan-800 font-bold text-[10px] rounded">
                        {item.sks} SKS
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono">
                      Kode: {item.kodeMk} &bull; Dosen: {item.namaDosen}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.hari}, {item.jamMulai}-{item.jamSelesai}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {item.ruangan}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleCourse(item)}
                    className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-all shrink-0 ${
                      isSelected
                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-xs'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Trash2 className="w-3 h-3" />
                        <span>Batal</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Ambil</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Ringkasan Mata Kuliah Terpilih & Tombol Ajukan (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-sm border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
            <div className="p-3 bg-[#2c3840] text-white flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide">
                Mata Kuliah Terpilih ({selectedCourses.length})
              </h3>
              <span className="text-xs font-black text-cyan-300">Total: {totalSksTaken} SKS</span>
            </div>

            <div className="p-3 flex-1 overflow-y-auto max-h-[360px] divide-y divide-slate-100">
              {selectedCourses.map((c, i) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-800">
                      {i + 1}. {c.namaMk}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {c.hari} ({c.jamMulai}-{c.jamSelesai}) &bull; Kelas {c.kelas}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{c.sks} SKS</span>
                    <button
                      onClick={() => handleToggleCourse(c)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus dari pilihan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {selectedCourses.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Belum ada mata kuliah yang dipilih. Silakan klik tombol "Ambil" di daftar sebelah
                  kiri.
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              <button
                onClick={handleSubmitKrs}
                disabled={selectedCourses.length === 0 || isExceeded}
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white font-bold text-xs rounded shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Ajukan KRS ke Dosen PA</span>
              </button>

              <p className="text-[10px] text-slate-500 text-center">
                Setelah diajukan, KRS akan ditinjau oleh Dosen Pembimbing Akademik untuk disetujui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
