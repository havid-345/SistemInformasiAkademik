import { User } from '../types/auth';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    username: 'admin',
    nama: 'Administrator Akademik',
    role: 'admin',
    email: 'admin@simaku.ac.id',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    semesterAktif: '2026/2027 Ganjil',
  },
  {
    id: 'u-2',
    username: '0412088501',
    nama: 'Dr. Hendra Gunawan, M.T.',
    role: 'dosen',
    nimOrNidn: '0412088501',
    prodi: 'Teknik Informatika',
    email: 'hendra.gunawan@simaku.ac.id',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    semesterAktif: '2026/2027 Ganjil',
  },
  {
    id: 'u-3',
    username: '2210511045',
    nama: 'Bima Satria Yudha',
    role: 'mahasiswa',
    nimOrNidn: '2210511045',
    prodi: 'Teknik Informatika',
    email: 'bima.satria@mhs.simaku.ac.id',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    semesterAktif: '2026/2027 Ganjil',
    jatahSks: 24,
  },
  {
    id: 'u-4',
    username: '2210511078',
    nama: 'Annisa Rahmawati',
    role: 'mahasiswa',
    nimOrNidn: '2210511078',
    prodi: 'Sistem Informasi',
    email: 'annisa.rahma@mhs.simaku.ac.id',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    semesterAktif: '2026/2027 Ganjil',
    jatahSks: 22,
  }
];
