export type StatusKrs = 'Draft' | 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';

export interface KrsItem {
  jadwalId: string;
  kodeMk: string;
  namaMk: string;
  sks: number;
  kelas: string;
  hari: string;
  jam: string;
  ruangan: string;
  dosen: string;
}

export interface PengajuanKrs {
  id: string;
  nim: string;
  namaMahasiswa: string;
  prodi: string;
  semesterAkademik: string;
  semesterMahasiswa: number;
  dosenPaNidn: string;
  dosenPaNama: string;
  ipkTerakhir: number;
  ipsTerakhir: number;
  jatahSks: number;
  totalSks: number;
  status: StatusKrs;
  tglPengajuan: string;
  tglPersetujuan?: string;
  catatanDosen?: string;
  mataKuliah: KrsItem[];
}
