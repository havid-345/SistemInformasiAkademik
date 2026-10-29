import { PengajuanKrs } from '../types/krs';

export const INITIAL_PENGAJUAN_KRS: PengajuanKrs[] = [
  {
    id: 'krs-1',
    nim: '2210511045',
    namaMahasiswa: 'Bima Satria Yudha',
    prodi: 'Teknik Informatika',
    semesterAkademik: '2026/2027 Ganjil',
    semesterMahasiswa: 5,
    dosenPaNidn: '0412088501',
    dosenPaNama: 'Dr. Hendra Gunawan, M.T.',
    ipkTerakhir: 3.82,
    ipsTerakhir: 3.90,
    jatahSks: 24,
    totalSks: 10,
    status: 'Menunggu Persetujuan',
    tglPengajuan: '2026-09-03 10:45',
    catatanDosen: '',
    mataKuliah: [
      {
        jadwalId: 'jad-3',
        kodeMk: 'TIF3101',
        namaMk: 'Pengembangan Aplikasi Web Modern',
        sks: 4,
        kelas: 'TI-5A',
        hari: 'Selasa',
        jam: '08:00 - 11:20',
        ruangan: 'Lab Rekayasa Perangkat Lunak',
        dosen: 'Fitria Maharani, M.Cs.'
      },
      {
        jadwalId: 'jad-4',
        kodeMk: 'TIF3102',
        namaMk: 'Kecerdasan Buatan & Machine Learning',
        sks: 3,
        kelas: 'TI-5A',
        hari: 'Rabu',
        jam: '09:40 - 12:10',
        ruangan: 'Gedung B 405',
        dosen: 'Dr. Hendra Gunawan, M.T.'
      },
      {
        jadwalId: 'jad-5',
        kodeMk: 'TIF3205',
        namaMk: 'Keamanan Siber & Kriptografi',
        sks: 3,
        kelas: 'TI-5P',
        hari: 'Kamis',
        jam: '10:00 - 12:30',
        ruangan: 'Lab Jaringan Komputer',
        dosen: 'Bambang Priyono, Ph.D.'
      }
    ]
  },
  {
    id: 'krs-2',
    nim: '2210511078',
    namaMahasiswa: 'Annisa Rahmawati',
    prodi: 'Sistem Informasi',
    semesterAkademik: '2026/2027 Ganjil',
    semesterMahasiswa: 5,
    dosenPaNidn: '0419058702',
    dosenPaNama: 'Ir. Sri Wahyuni, M.Kom.',
    ipkTerakhir: 3.75,
    ipsTerakhir: 3.70,
    jatahSks: 24,
    totalSks: 3,
    status: 'Disetujui',
    tglPengajuan: '2026-09-02 08:30',
    tglPersetujuan: '2026-09-02 11:15',
    catatanDosen: 'Rencana studi disetujui. Pertahankan prestasinya.',
    mataKuliah: [
      {
        jadwalId: 'jad-6',
        kodeMk: 'SIF2104',
        namaMk: 'Analisis & Perancangan Sistem',
        sks: 3,
        kelas: 'SI-3A',
        hari: 'Kamis',
        jam: '13:00 - 15:30',
        ruangan: 'Gedung C 201',
        dosen: 'Ir. Sri Wahyuni, M.Kom.'
      }
    ]
  },
  {
    id: 'krs-3',
    nim: '2210511099',
    namaMahasiswa: 'Dimas Aditya Nugraha',
    prodi: 'Teknik Informatika',
    semesterAkademik: '2026/2027 Ganjil',
    semesterMahasiswa: 5,
    dosenPaNidn: '0412088501',
    dosenPaNama: 'Dr. Hendra Gunawan, M.T.',
    ipkTerakhir: 3.10,
    ipsTerakhir: 2.85,
    jatahSks: 20,
    totalSks: 6,
    status: 'Menunggu Persetujuan',
    tglPengajuan: '2026-09-04 14:10',
    catatanDosen: '',
    mataKuliah: [
      {
        jadwalId: 'jad-4',
        kodeMk: 'TIF3102',
        namaMk: 'Kecerdasan Buatan & Machine Learning',
        sks: 3,
        kelas: 'TI-5A',
        hari: 'Rabu',
        jam: '09:40 - 12:10',
        ruangan: 'Gedung B 405',
        dosen: 'Dr. Hendra Gunawan, M.T.'
      },
      {
        jadwalId: 'jad-5',
        kodeMk: 'TIF3205',
        namaMk: 'Keamanan Siber & Kriptografi',
        sks: 3,
        kelas: 'TI-5P',
        hari: 'Kamis',
        jam: '10:00 - 12:30',
        ruangan: 'Lab Jaringan Komputer',
        dosen: 'Bambang Priyono, Ph.D.'
      }
    ]
  }
];
