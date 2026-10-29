export type UserRole = 'admin' | 'dosen' | 'mahasiswa';

export interface User {
  id: string;
  username: string;
  nama: string;
  role: UserRole;
  nimOrNidn?: string;
  prodi?: string;
  avatar?: string;
  email?: string;
  semesterAktif?: string;
  jatahSks?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
