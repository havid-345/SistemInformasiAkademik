import { JenisNilai } from '../types/jenisNilai';

export const INITIAL_JENIS_NILAI: JenisNilai[] = [
  {
    id: 'jn-1',
    kode: 'PRESENSI',
    nama: 'Presensi & Keaktifan',
    bobotPersen: 10,
    keterangan: 'Kehadiran minimal 75% sebagai syarat mengikuti UAS',
    isAktif: true,
  },
  {
    id: 'jn-2',
    kode: 'TUGAS',
    nama: 'Tugas Mandiri & Kuis',
    bobotPersen: 20,
    keterangan: 'Rata-rata akumulasi tugas mingguan dan responsi kuis',
    isAktif: true,
  },
  {
    id: 'jn-3',
    kode: 'PRAKTIKUM',
    nama: 'Praktikum & Laboratorium',
    bobotPersen: 20,
    keterangan: 'Laporan praktikum modul dan demonstrasi program',
    isAktif: true,
  },
  {
    id: 'jn-4',
    kode: 'UTS',
    nama: 'Ujian Tengah Semester (UTS)',
    bobotPersen: 25,
    keterangan: 'Evaluasi tengah semester terjadwal resmi',
    isAktif: true,
  },
  {
    id: 'jn-5',
    kode: 'UAS',
    nama: 'Ujian Akhir Semester (UAS)',
    bobotPersen: 25,
    keterangan: 'Evaluasi akhir materi semester penuh atau project capstone',
    isAktif: true,
  }
];
