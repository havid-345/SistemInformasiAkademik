export type StatusPembayaran = 'Lunas' | 'Belum Lunas' | 'Menunggu Verifikasi';

export interface TagihanItem {
  id: string;
  nim: string;
  namaMahasiswa: string;
  prodi: string;
  semester: string;
  kodeTagihan: string;
  deskripsi: string; // e.g. "UKT Semester Gasal 2026/2027", "Biaya Praktikum Lab"
  nominal: number;
  denda: number;
  totalBayar: number;
  status: StatusPembayaran;
  jatuhTempo: string;
  tglBayar?: string;
  metodeBayar?: 'QRIS' | 'Virtual Account' | 'Bank Transfer' | 'Teller Bank';
  nomorTransaksi?: string;
}

export interface QrisPaymentData {
  tagihanId: string;
  kodeTagihan: string;
  namaMahasiswa: string;
  nominal: number;
  qrPayload: string;
  expiredAt: string;
  merchantName: string;
}
