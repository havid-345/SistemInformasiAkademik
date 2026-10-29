export interface Dosen {
  id: string;
  nidn: string;
  namaLengkap: string;
  gelar: string;
  email: string;
  noHp: string;
  homebaseProdi: string;
  status: 'Aktif' | 'Cuti' | 'Tugas Belajar';
  jabatanAkademik: 'Asisten Ahli' | 'Lektor' | 'Lektor Kepala' | 'Guru Besar';
}
