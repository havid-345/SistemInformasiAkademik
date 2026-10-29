export interface JenisNilai {
  id: string;
  kode: string;
  nama: string; // e.g. "Tugas Mandiri", "UTS", "UAS", "Praktikum", "Kehadiran"
  bobotPersen: number; // e.g. 20
  keterangan: string;
  isAktif: boolean;
}
