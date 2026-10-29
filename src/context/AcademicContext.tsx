import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ProgramStudi } from '../types/prodi';
import { Kurikulum } from '../types/kurikulum';
import { JenisNilai } from '../types/jenisNilai';
import { SemesterAkademik } from '../types/semester';
import { JadwalKuliah } from '../types/jadwal';
import { Dosen } from '../types/dosen';
import { TagihanItem } from '../types/keuangan';
import { PengajuanKrs } from '../types/krs';
import { StorageService } from '../services/storageService';

export type AcademicMenu =
  | 'home'
  | 'prodi'
  | 'kurikulum'
  | 'jenisNilai'
  | 'semester'
  | 'jadwal'
  | 'dosen'
  | 'keuangan'
  | 'rencanaStudi'
  | 'persetujuanKrs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface AcademicContextType {
  activeMenu: AcademicMenu;
  setActiveMenu: (menu: AcademicMenu) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Data Collections
  prodiList: ProgramStudi[];
  kurikulumList: Kurikulum[];
  jenisNilaiList: JenisNilai[];
  semesterList: SemesterAkademik[];
  jadwalList: JadwalKuliah[];
  dosenList: Dosen[];
  keuanganList: TagihanItem[];
  krsList: PengajuanKrs[];
  activeSemester: SemesterAkademik | undefined;

  // Prodi CRUD
  addProdi: (data: Omit<ProgramStudi, 'id' | 'jumlahMahasiswa'>) => void;
  updateProdi: (id: string, data: Partial<ProgramStudi>) => void;
  deleteProdi: (id: string) => void;

  // Kurikulum CRUD
  addKurikulum: (data: Omit<Kurikulum, 'id'>) => void;
  updateKurikulum: (id: string, data: Partial<Kurikulum>) => void;
  deleteKurikulum: (id: string) => void;

  // Jenis Nilai CRUD
  addJenisNilai: (data: Omit<JenisNilai, 'id'>) => void;
  updateJenisNilai: (id: string, data: Partial<JenisNilai>) => void;
  deleteJenisNilai: (id: string) => void;

  // Semester CRUD
  addSemester: (data: Omit<SemesterAkademik, 'id'>) => void;
  updateSemester: (id: string, data: Partial<SemesterAkademik>) => void;
  deleteSemester: (id: string) => void;
  setActiveSemesterId: (id: string) => void;

  // Jadwal CRUD
  addJadwal: (data: Omit<JadwalKuliah, 'id' | 'terisi'>) => void;
  updateJadwal: (id: string, data: Partial<JadwalKuliah>) => void;
  deleteJadwal: (id: string) => void;

  // Dosen CRUD
  addDosen: (data: Omit<Dosen, 'id'>) => void;
  updateDosen: (id: string, data: Partial<Dosen>) => void;
  deleteDosen: (id: string) => void;

  // Keuangan
  bayarTagihanQris: (tagihanId: string) => void;

  // KRS
  ajukanKrs: (pengajuan: PengajuanKrs) => void;
  setujuiKrs: (krsId: string, catatan?: string) => void;
  tolakKrs: (krsId: string, catatan?: string) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Reset
  resetDataToFactory: () => void;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export const AcademicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<AcademicMenu>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // State from storage
  const [prodiList, setProdiList] = useState<ProgramStudi[]>(() => StorageService.getProdi());
  const [kurikulumList, setKurikulumList] = useState<Kurikulum[]>(() => StorageService.getKurikulum());
  const [jenisNilaiList, setJenisNilaiList] = useState<JenisNilai[]>(() => StorageService.getJenisNilai());
  const [semesterList, setSemesterList] = useState<SemesterAkademik[]>(() => StorageService.getSemester());
  const [jadwalList, setJadwalList] = useState<JadwalKuliah[]>(() => StorageService.getJadwal());
  const [dosenList, setDosenList] = useState<Dosen[]>(() => StorageService.getDosen());
  const [keuanganList, setKeuanganList] = useState<TagihanItem[]>(() => StorageService.getKeuangan());
  const [krsList, setKrsList] = useState<PengajuanKrs[]>(() => StorageService.getKrs());

  const activeSemester = semesterList.find((s) => s.status === 'Aktif') || semesterList[0];

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync helpers
  const updateAndSaveProdi = (list: ProgramStudi[]) => {
    setProdiList(list);
    StorageService.saveProdi(list);
  };
  const updateAndSaveKurikulum = (list: Kurikulum[]) => {
    setKurikulumList(list);
    StorageService.saveKurikulum(list);
  };
  const updateAndSaveJenisNilai = (list: JenisNilai[]) => {
    setJenisNilaiList(list);
    StorageService.saveJenisNilai(list);
  };
  const updateAndSaveSemester = (list: SemesterAkademik[]) => {
    setSemesterList(list);
    StorageService.saveSemester(list);
  };
  const updateAndSaveJadwal = (list: JadwalKuliah[]) => {
    setJadwalList(list);
    StorageService.saveJadwal(list);
  };
  const updateAndSaveDosen = (list: Dosen[]) => {
    setDosenList(list);
    StorageService.saveDosen(list);
  };
  const updateAndSaveKeuangan = (list: TagihanItem[]) => {
    setKeuanganList(list);
    StorageService.saveKeuangan(list);
  };
  const updateAndSaveKrs = (list: PengajuanKrs[]) => {
    setKrsList(list);
    StorageService.saveKrs(list);
  };

  // PRODI CRUD
  const addProdi = (data: Omit<ProgramStudi, 'id' | 'jumlahMahasiswa'>) => {
    const newProdi: ProgramStudi = {
      ...data,
      id: `prodi-${Date.now()}`,
      jumlahMahasiswa: 0,
    };
    updateAndSaveProdi([newProdi, ...prodiList]);
    showToast(`Program Studi "${newProdi.namaProdi}" berhasil ditambahkan.`);
  };

  const updateProdi = (id: string, data: Partial<ProgramStudi>) => {
    const updated = prodiList.map((p) => (p.id === id ? { ...p, ...data } : p));
    updateAndSaveProdi(updated);
    showToast('Data Program Studi berhasil diperbarui.');
  };

  const deleteProdi = (id: string) => {
    const target = prodiList.find((p) => p.id === id);
    updateAndSaveProdi(prodiList.filter((p) => p.id !== id));
    showToast(`Program Studi "${target?.namaProdi || ''}" telah dihapus.`, 'info');
  };

  // KURIKULUM CRUD
  const addKurikulum = (data: Omit<Kurikulum, 'id'>) => {
    const newKur: Kurikulum = {
      ...data,
      id: `kur-${Date.now()}`,
    };
    updateAndSaveKurikulum([newKur, ...kurikulumList]);
    showToast(`Mata Kuliah "${newKur.namaMk}" berhasil ditambahkan ke kurikulum.`);
  };

  const updateKurikulum = (id: string, data: Partial<Kurikulum>) => {
    const updated = kurikulumList.map((k) => (k.id === id ? { ...k, ...data } : k));
    updateAndSaveKurikulum(updated);
    showToast('Kurikulum Mata Kuliah berhasil diperbarui.');
  };

  const deleteKurikulum = (id: string) => {
    const target = kurikulumList.find((k) => k.id === id);
    updateAndSaveKurikulum(kurikulumList.filter((k) => k.id !== id));
    showToast(`Mata Kuliah "${target?.namaMk || ''}" telah dihapus dari kurikulum.`, 'info');
  };

  // JENIS NILAI CRUD
  const addJenisNilai = (data: Omit<JenisNilai, 'id'>) => {
    const newJN: JenisNilai = {
      ...data,
      id: `jn-${Date.now()}`,
    };
    updateAndSaveJenisNilai([...jenisNilaiList, newJN]);
    showToast(`Jenis Penilaian "${newJN.nama}" berhasil ditambahkan.`);
  };

  const updateJenisNilai = (id: string, data: Partial<JenisNilai>) => {
    const updated = jenisNilaiList.map((jn) => (jn.id === id ? { ...jn, ...data } : jn));
    updateAndSaveJenisNilai(updated);
    showToast('Skema Jenis Penilaian berhasil diperbarui.');
  };

  const deleteJenisNilai = (id: string) => {
    updateAndSaveJenisNilai(jenisNilaiList.filter((jn) => jn.id !== id));
    showToast('Jenis Penilaian berhasil dihapus.', 'info');
  };

  // SEMESTER CRUD
  const addSemester = (data: Omit<SemesterAkademik, 'id'>) => {
    let list = [...semesterList];
    if (data.status === 'Aktif') {
      list = list.map((s) => ({ ...s, status: 'Non-Aktif' as const }));
    }
    const newSem: SemesterAkademik = {
      ...data,
      id: `sem-${Date.now()}`,
    };
    updateAndSaveSemester([newSem, ...list]);
    showToast(`Semester "${newSem.tahunAjaran} ${newSem.tipe}" berhasil ditambahkan.`);
  };

  const updateSemester = (id: string, data: Partial<SemesterAkademik>) => {
    let list = [...semesterList];
    if (data.status === 'Aktif') {
      list = list.map((s) => (s.id === id ? { ...s, ...data } : { ...s, status: 'Non-Aktif' as const }));
    } else {
      list = list.map((s) => (s.id === id ? { ...s, ...data } : s));
    }
    updateAndSaveSemester(list);
    showToast('Data Semester Akademik berhasil diperbarui.');
  };

  const deleteSemester = (id: string) => {
    updateAndSaveSemester(semesterList.filter((s) => s.id !== id));
    showToast('Semester Akademik telah dihapus.', 'info');
  };

  const setActiveSemesterId = (id: string) => {
    const list = semesterList.map((s) => ({
      ...s,
      status: (s.id === id ? 'Aktif' : 'Non-Aktif') as 'Aktif' | 'Non-Aktif',
    }));
    updateAndSaveSemester(list);
    const active = list.find((s) => s.id === id);
    showToast(`Semester aktif diubah menjadi ${active?.tahunAjaran} (${active?.tipe}).`, 'info');
  };

  // JADWAL CRUD
  const addJadwal = (data: Omit<JadwalKuliah, 'id' | 'terisi'>) => {
    const newJadwal: JadwalKuliah = {
      ...data,
      id: `jad-${Date.now()}`,
      terisi: 0,
    };
    updateAndSaveJadwal([newJadwal, ...jadwalList]);
    showToast(`Jadwal kelas "${newJadwal.kelas} - ${newJadwal.namaMk}" berhasil dibuat.`);
  };

  const updateJadwal = (id: string, data: Partial<JadwalKuliah>) => {
    const updated = jadwalList.map((j) => (j.id === id ? { ...j, ...data } : j));
    updateAndSaveJadwal(updated);
    showToast('Jadwal perkuliahan berhasil diperbarui.');
  };

  const deleteJadwal = (id: string) => {
    updateAndSaveJadwal(jadwalList.filter((j) => j.id !== id));
    showToast('Jadwal perkuliahan telah dihapus.', 'info');
  };

  // DOSEN CRUD
  const addDosen = (data: Omit<Dosen, 'id'>) => {
    const newDosen: Dosen = {
      ...data,
      id: `dos-${Date.now()}`,
    };
    updateAndSaveDosen([newDosen, ...dosenList]);
    showToast(`Dosen "${newDosen.namaLengkap}, ${newDosen.gelar}" berhasil ditambahkan.`);
  };

  const updateDosen = (id: string, data: Partial<Dosen>) => {
    const updated = dosenList.map((d) => (d.id === id ? { ...d, ...data } : d));
    updateAndSaveDosen(updated);
    showToast('Data Dosen berhasil diperbarui.');
  };

  const deleteDosen = (id: string) => {
    updateAndSaveDosen(dosenList.filter((d) => d.id !== id));
    showToast('Data Dosen telah dihapus.', 'info');
  };

  // KEUANGAN
  const bayarTagihanQris = (tagihanId: string) => {
    const now = new Date();
    const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
    const randomTrx = `TRX-QRIS-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const updated = keuanganList.map((t) => {
      if (t.id === tagihanId) {
        return {
          ...t,
          status: 'Lunas' as const,
          tglBayar: formatted,
          metodeBayar: 'QRIS' as const,
          nomorTransaksi: randomTrx,
        };
      }
      return t;
    });

    updateAndSaveKeuangan(updated);
    showToast('Pembayaran QRIS berhasil dikonfirmasi! Tagihan telah Lunas.', 'success');
  };

  // KRS
  const ajukanKrs = (pengajuan: PengajuanKrs) => {
    const existingIndex = krsList.findIndex((k) => k.nim === pengajuan.nim);
    let updated: PengajuanKrs[];
    if (existingIndex >= 0) {
      updated = [...krsList];
      updated[existingIndex] = pengajuan;
    } else {
      updated = [pengajuan, ...krsList];
    }
    updateAndSaveKrs(updated);
    showToast('KRS berhasil diajukan ke Dosen Pembimbing Akademik.');
  };

  const setujuiKrs = (krsId: string, catatan = 'Rencana studi telah disetujui.') => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated = krsList.map((k) => {
      if (k.id === krsId) {
        return {
          ...k,
          status: 'Disetujui' as const,
          tglPersetujuan: now,
          catatanDosen: catatan,
        };
      }
      return k;
    });
    updateAndSaveKrs(updated);
    showToast('KRS Mahasiswa berhasil DISETUJUI.');
  };

  const tolakKrs = (krsId: string, catatan = 'KRS ditolak. Silakan revisi mata kuliah.') => {
    const updated = krsList.map((k) => {
      if (k.id === krsId) {
        return {
          ...k,
          status: 'Ditolak' as const,
          catatanDosen: catatan,
        };
      }
      return k;
    });
    updateAndSaveKrs(updated);
    showToast('KRS Mahasiswa DITOLAK dengan catatan revisi.', 'warning');
  };

  const resetDataToFactory = () => {
    StorageService.resetAll();
    setProdiList(StorageService.getProdi());
    setKurikulumList(StorageService.getKurikulum());
    setJenisNilaiList(StorageService.getJenisNilai());
    setSemesterList(StorageService.getSemester());
    setJadwalList(StorageService.getJadwal());
    setDosenList(StorageService.getDosen());
    setKeuanganList(StorageService.getKeuangan());
    setKrsList(StorageService.getKrs());
    showToast('Seluruh data berhasil di-reset ke data bawaan simulasi.', 'info');
  };

  return (
    <AcademicContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        searchQuery,
        setSearchQuery,
        prodiList,
        kurikulumList,
        jenisNilaiList,
        semesterList,
        jadwalList,
        dosenList,
        keuanganList,
        krsList,
        activeSemester,
        addProdi,
        updateProdi,
        deleteProdi,
        addKurikulum,
        updateKurikulum,
        deleteKurikulum,
        addJenisNilai,
        updateJenisNilai,
        deleteJenisNilai,
        addSemester,
        updateSemester,
        deleteSemester,
        setActiveSemesterId,
        addJadwal,
        updateJadwal,
        deleteJadwal,
        addDosen,
        updateDosen,
        deleteDosen,
        bayarTagihanQris,
        ajukanKrs,
        setujuiKrs,
        tolakKrs,
        toasts,
        showToast,
        removeToast,
        resetDataToFactory,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
