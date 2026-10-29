export interface ProgramStudi {
  id: string;
  kodeProdi: string;
  namaProdi: string;
  jenjang: 'S1' | 'D3' | 'S2';
  akreditasi: 'Unggul' | 'A' | 'Baik Sekali' | 'B' | 'Baik';
  kaprodi: string;
  jumlahMahasiswa: number;
}
