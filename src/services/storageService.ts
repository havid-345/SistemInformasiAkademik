import { ProgramStudi } from '../types/prodi';
import { Kurikulum } from '../types/kurikulum';
import { JenisNilai } from '../types/jenisNilai';
import { SemesterAkademik } from '../types/semester';
import { JadwalKuliah } from '../types/jadwal';
import { Dosen } from '../types/dosen';
import { TagihanItem } from '../types/keuangan';
import { PengajuanKrs } from '../types/krs';

import { INITIAL_PRODI } from '../data/mockProdi';
import { INITIAL_KURIKULUM } from '../data/mockKurikulum';
import { INITIAL_JENIS_NILAI } from '../data/mockJenisNilai';
import { INITIAL_SEMESTER } from '../data/mockSemester';
import { INITIAL_JADWAL } from '../data/mockJadwal';
import { INITIAL_DOSEN } from '../data/mockDosen';
import { INITIAL_TAGIHAN } from '../data/mockKeuangan';
import { INITIAL_PENGAJUAN_KRS } from '../data/mockKrs';

const STORAGE_KEYS = {
  PRODI: 'simaku_prodi',
  KURIKULUM: 'simaku_kurikulum',
  JENIS_NILAI: 'simaku_jenis_nilai',
  SEMESTER: 'simaku_semester',
  JADWAL: 'simaku_jadwal',
  DOSEN: 'simaku_dosen',
  KEUANGAN: 'simaku_keuangan',
  KRS: 'simaku_krs',
  ACTIVE_SEMESTER: 'simaku_active_semester',
};

function getOrInit<T>(key: string, initialData: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(stored) as T;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return initialData;
  }
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export const StorageService = {
  // Prodi
  getProdi(): ProgramStudi[] {
    return getOrInit<ProgramStudi[]>(STORAGE_KEYS.PRODI, INITIAL_PRODI);
  },
  saveProdi(list: ProgramStudi[]): void {
    save(STORAGE_KEYS.PRODI, list);
  },

  // Kurikulum
  getKurikulum(): Kurikulum[] {
    return getOrInit<Kurikulum[]>(STORAGE_KEYS.KURIKULUM, INITIAL_KURIKULUM);
  },
  saveKurikulum(list: Kurikulum[]): void {
    save(STORAGE_KEYS.KURIKULUM, list);
  },

  // Jenis Nilai
  getJenisNilai(): JenisNilai[] {
    return getOrInit<JenisNilai[]>(STORAGE_KEYS.JENIS_NILAI, INITIAL_JENIS_NILAI);
  },
  saveJenisNilai(list: JenisNilai[]): void {
    save(STORAGE_KEYS.JENIS_NILAI, list);
  },

  // Semester
  getSemester(): SemesterAkademik[] {
    return getOrInit<SemesterAkademik[]>(STORAGE_KEYS.SEMESTER, INITIAL_SEMESTER);
  },
  saveSemester(list: SemesterAkademik[]): void {
    save(STORAGE_KEYS.SEMESTER, list);
  },

  // Jadwal
  getJadwal(): JadwalKuliah[] {
    return getOrInit<JadwalKuliah[]>(STORAGE_KEYS.JADWAL, INITIAL_JADWAL);
  },
  saveJadwal(list: JadwalKuliah[]): void {
    save(STORAGE_KEYS.JADWAL, list);
  },

  // Dosen
  getDosen(): Dosen[] {
    return getOrInit<Dosen[]>(STORAGE_KEYS.DOSEN, INITIAL_DOSEN);
  },
  saveDosen(list: Dosen[]): void {
    save(STORAGE_KEYS.DOSEN, list);
  },

  // Keuangan
  getKeuangan(): TagihanItem[] {
    return getOrInit<TagihanItem[]>(STORAGE_KEYS.KEUANGAN, INITIAL_TAGIHAN);
  },
  saveKeuangan(list: TagihanItem[]): void {
    save(STORAGE_KEYS.KEUANGAN, list);
  },

  // KRS
  getKrs(): PengajuanKrs[] {
    return getOrInit<PengajuanKrs[]>(STORAGE_KEYS.KRS, INITIAL_PENGAJUAN_KRS);
  },
  saveKrs(list: PengajuanKrs[]): void {
    save(STORAGE_KEYS.KRS, list);
  },

  // Reset to factory defaults
  resetAll(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
