export interface Kurikulum {
  id: string;
  tahunKurikulum: string; // e.g. "2024" or "2020"
  kodeMk: string;
  namaMk: string;
  sks: number;
  semester: number; // 1 to 8
  jenis: 'Wajib' | 'Pilihan';
  prodiId: string;
  namaProdi?: string;
  deskripsi?: string;
}
