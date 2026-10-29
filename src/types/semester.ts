export interface SemesterAkademik {
  id: string;
  kodeSemester: string; // e.g. "20261"
  tahunAjaran: string; // e.g. "2026/2027"
  tipe: 'Ganjil' | 'Genap' | 'Pendek';
  status: 'Aktif' | 'Non-Aktif';
  tglMulai: string;
  tglSelesai: string;
  batasKrs: string;
}
