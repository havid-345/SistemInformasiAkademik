export interface JadwalKuliah {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  jamMulai: string; // "08:00"
  jamSelesai: string; // "09:40"
  kurikulumId: string;
  kodeMk: string;
  namaMk: string;
  sks: number;
  dosenId: string;
  namaDosen: string;
  ruangan: string; // e.g. "Lab Komputer 3", "Gedung A 204"
  kelas: string; // "TI-3A", "SI-1B"
  kuota: number;
  terisi: number;
  prodiId: string;
  namaProdi?: string;
  semesterPaket: number;
}
