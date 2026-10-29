export interface TrendDataPoint {
  year: string;
  count: number;
}

export const DASHBOARD_STATS = {
  jmlMhsAktif: 6228,
  jmlMhsLakiLaki: 856,
  jmlMhsPerempuan: 810,
  jmlDosenAktif: 51,
  jmlMhsSudahKrs: 13,
  jmlMhsBelumKrs: 6230,
  ipsTertinggi: 3.54,
  ipkTertinggi: 4.00,
};

export const TREND_MAHASISWA_AKTIF: TrendDataPoint[] = [
  { year: '2001', count: 3 },
  { year: '2002', count: 4 },
  { year: '2003', count: 1 },
  { year: '2004', count: 51 },
  { year: '2005', count: 163 },
  { year: '2006', count: 667 },
  { year: '2007', count: 1483 },
  { year: '2008', count: 1266 },
  { year: '2009', count: 1001 },
  { year: '2010', count: 1549 },
  { year: '2011', count: 9 },
  { year: '2014', count: 1 },
  { year: '2015', count: 28 },
  { year: '2016', count: 1 },
  { year: '2018', count: 1 },
  { year: '2024', count: 6228 },
];
