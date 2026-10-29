import { SemesterAkademik } from '../types/semester';

export const INITIAL_SEMESTER: SemesterAkademik[] = [
  {
    id: 'sem-1',
    kodeSemester: '20261',
    tahunAjaran: '2026/2027',
    tipe: 'Ganjil',
    status: 'Aktif',
    tglMulai: '2026-09-01',
    tglSelesai: '2027-01-31',
    batasKrs: '2026-09-15',
  },
  {
    id: 'sem-2',
    kodeSemester: '20252',
    tahunAjaran: '2025/2026',
    tipe: 'Genap',
    status: 'Non-Aktif',
    tglMulai: '2026-02-01',
    tglSelesai: '2026-07-15',
    batasKrs: '2026-02-14',
  },
  {
    id: 'sem-3',
    kodeSemester: '20251',
    tahunAjaran: '2025/2026',
    tipe: 'Ganjil',
    status: 'Non-Aktif',
    tglMulai: '2025-09-01',
    tglSelesai: '2026-01-30',
    batasKrs: '2025-09-15',
  },
  {
    id: 'sem-4',
    kodeSemester: '20242',
    tahunAjaran: '2024/2025',
    tipe: 'Genap',
    status: 'Non-Aktif',
    tglMulai: '2025-02-01',
    tglSelesai: '2025-07-20',
    batasKrs: '2025-02-15',
  }
];
