import { jsPDF } from 'jspdf';
import { TagihanItem } from '../types/keuangan';
import { formatRupiah, formatTanggalIndonesia } from '../utils/formatters';

export const ExportDocumentService = {
  /**
   * Export Bukti Pembayaran ke PDF menggunakan jsPDF
   */
  exportReceiptPdf(tagihan: TagihanItem): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // Primary Header Background
    doc.setFillColor(34, 45, 50); // Dark Academic Blue/Slate
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('UNIVERSITAS AKADEMIKA', 15, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('SIMAKU - SISTEM INFORMASI AKADEMIK & KEUANGAN RESMI', 15, 18);
    doc.text('Jl. Kampus Merdeka No. 101, Telp: (021) 7891234, info@simaku.ac.id', 15, 23);

    // Document Title
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('BUKTI PEMBAYARAN TAGIHAN KULIAH', 15, 40);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`No. Referensi: ${tagihan.kodeTagihan}`, 15, 46);
    doc.text(`Tanggal Cetak: ${formatTanggalIndonesia(new Date().toISOString())}`, 15, 51);

    // Status Banner
    const isLunas = tagihan.status === 'Lunas';
    if (isLunas) {
      doc.setFillColor(220, 252, 231); // green-100
      doc.setDrawColor(22, 163, 74); // green-600
      doc.roundedRect(pageWidth - 65, 35, 50, 16, 2, 2, 'FD');
      doc.setTextColor(22, 101, 52); // green-800
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('LUNAS / BERHASIL', pageWidth - 60, 43);
      doc.setFontSize(8);
      doc.text(tagihan.metodeBayar || 'QRIS Dinamis', pageWidth - 60, 48);
    } else {
      doc.setFillColor(254, 226, 226); // red-100
      doc.setDrawColor(220, 38, 38);
      doc.roundedRect(pageWidth - 65, 35, 50, 16, 2, 2, 'FD');
      doc.setTextColor(153, 27, 27);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('BELUM LUNAS', pageWidth - 60, 45);
    }

    // Divider Line
    doc.setDrawColor(210, 215, 220);
    doc.setLineWidth(0.5);
    doc.line(15, 56, pageWidth - 15, 56);

    // Student Info Grid
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const leftColX = 15;
    const rightColX = 110;
    let y = 66;

    doc.setFont('helvetica', 'bold');
    doc.text('INFORMASI MAHASISWA', leftColX, y);
    doc.text('DETAIL TRANSAKSI', rightColX, y);

    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);

    // Info Mahasiswa
    doc.text('Nama Lengkap', leftColX, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`: ${tagihan.namaMahasiswa}`, leftColX + 32, y);

    // Transaksi
    doc.setFont('helvetica', 'normal');
    doc.text('No. Transaksi', rightColX, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`: ${tagihan.nomorTransaksi || '-'}`, rightColX + 32, y);

    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text('NIM', leftColX, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`: ${tagihan.nim}`, leftColX + 32, y);

    doc.setFont('helvetica', 'normal');
    doc.text('Semester', rightColX, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`: ${tagihan.semester}`, rightColX + 32, y);

    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text('Program Studi', leftColX, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`: ${tagihan.prodi}`, leftColX + 32, y);

    doc.setFont('helvetica', 'normal');
    doc.text('Waktu Bayar', rightColX, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`: ${tagihan.tglBayar ? formatTanggalIndonesia(tagihan.tglBayar) : '-'}`, rightColX + 32, y);

    y += 14;

    // Table Header
    doc.setFillColor(243, 244, 246);
    doc.rect(15, y, pageWidth - 30, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text('NO', 18, y + 6);
    doc.text('URAIAN / KOMPONEN PEMBAYARAN', 32, y + 6);
    doc.text('KODE', 125, y + 6);
    doc.text('JUMLAH (IDR)', pageWidth - 45, y + 6);

    y += 10;

    // Table Content
    doc.setFont('helvetica', 'normal');
    doc.text('1.', 18, y + 5);
    doc.text(tagihan.deskripsi, 32, y + 5);
    doc.text(tagihan.kodeTagihan, 125, y + 5);
    doc.text(formatRupiah(tagihan.nominal), pageWidth - 45, y + 5);

    // Denda if any
    if (tagihan.denda > 0) {
      y += 8;
      doc.text('2.', 18, y + 5);
      doc.text('Denda Keterlambatan', 32, y + 5);
      doc.text('-', 125, y + 5);
      doc.text(formatRupiah(tagihan.denda), pageWidth - 45, y + 5);
    }

    y += 12;
    doc.setDrawColor(210, 215, 220);
    doc.line(15, y, pageWidth - 15, y);

    // Total Box
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL PEMBAYARAN', 110, y + 5);
    doc.setTextColor(3, 105, 161);
    doc.setFontSize(12);
    doc.text(formatRupiah(tagihan.totalBayar), pageWidth - 45, y + 5);

    // Footer & Stamp
    y += 25;
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('* Struk ini adalah bukti pembayaran yang sah yang diterbitkan oleh sistem SIMAKU.', 15, y);
    doc.text('* Simpan struk ini sebagai bukti verifikasi administrasi akademik.', 15, y + 4);

    // Signature Box
    const signX = pageWidth - 65;
    doc.text('Bagian Keuangan & Kasir,', signX, y);
    doc.setFont('helvetica', 'bold');
    doc.text('Universitas Akademika', signX, y + 4);

    // Mock Stamp
    doc.setDrawColor(3, 105, 161);
    doc.roundedRect(signX - 2, y + 8, 45, 14, 1, 1, 'D');
    doc.setTextColor(3, 105, 161);
    doc.setFontSize(7);
    doc.text('TERVERIFIKASI SISTEM', signX + 4, y + 14);
    doc.text(tagihan.metodeBayar ? `METODE: ${tagihan.metodeBayar}` : 'SIMAKU ONLINE', signX + 4, y + 18);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.text('( Biro Administrasi Keuangan )', signX, y + 30);

    // Save PDF
    doc.save(`Bukti_Bayar_${tagihan.kodeTagihan}_${tagihan.nim}.pdf`);
  },

  /**
   * Export Bukti Pembayaran ke format Word (.docx)
   */
  exportReceiptDocx(tagihan: TagihanItem): void {
    const isLunas = tagihan.status === 'Lunas';
    const statusText = isLunas ? 'LUNAS (TERVERIFIKASI)' : 'BELUM LUNAS';
    const statusColor = isLunas ? '#16a34a' : '#dc2626';

    const wordHtmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Bukti Pembayaran ${tagihan.kodeTagihan}</title>
        <style>
          body {
            font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
            font-size: 11pt;
            color: #2c3e50;
            margin: 20mm;
          }
          .header-table {
            width: 100%;
            border-bottom: 2px solid #222d32;
            padding-bottom: 8px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 16pt;
            font-weight: bold;
            color: #222d32;
          }
          .subtitle {
            font-size: 9pt;
            color: #666666;
          }
          .doc-title {
            font-size: 14pt;
            font-weight: bold;
            text-align: center;
            margin-top: 15px;
            margin-bottom: 5px;
            text-decoration: underline;
          }
          .badge-status {
            display: inline-block;
            padding: 4px 12px;
            font-weight: bold;
            color: ${statusColor};
            border: 1px solid ${statusColor};
            background-color: #f8fafc;
            border-radius: 4px;
          }
          table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            margin-bottom: 20px;
          }
          table.data-table th {
            background-color: #2c3840;
            color: #ffffff;
            font-weight: bold;
            padding: 8px 10px;
            border: 1px solid #2c3840;
            text-align: left;
          }
          table.data-table td {
            padding: 8px 10px;
            border: 1px solid #d1d5db;
          }
          .info-table {
            width: 100%;
            margin-bottom: 15px;
          }
          .info-table td {
            padding: 4px 2px;
            vertical-align: top;
          }
          .total-row {
            font-weight: bold;
            background-color: #f1f5f9;
            font-size: 12pt;
          }
          .footer-table {
            width: 100%;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td>
              <div class="title">UNIVERSITAS AKADEMIKA</div>
              <div class="subtitle">SIMAKU - SISTEM INFORMASI AKADEMIK & KEUANGAN</div>
              <div class="subtitle">Jl. Kampus Merdeka No. 101, Telp: (021) 7891234 | email: info@simaku.ac.id</div>
            </td>
          </tr>
        </table>

        <div class="doc-title">BUKTI PEMBAYARAN TAGIHAN MAHASISWA</div>
        <div style="text-align: center; font-size: 10pt; color: #64748b; margin-bottom: 15px;">
          Nomor Dokumen: ${tagihan.kodeTagihan}
        </div>

        <div style="text-align: right; margin-bottom: 10px;">
          Status: <span class="badge-status">${statusText}</span>
        </div>

        <table class="info-table">
          <tr>
            <td width="20%"><strong>Nama Mahasiswa</strong></td>
            <td width="30%">: ${tagihan.namaMahasiswa}</td>
            <td width="20%"><strong>No. Transaksi</strong></td>
            <td width="30%">: ${tagihan.nomorTransaksi || '-'}</td>
          </tr>
          <tr>
            <td><strong>NIM</strong></td>
            <td>: ${tagihan.nim}</td>
            <td><strong>Semester</strong></td>
            <td>: ${tagihan.semester}</td>
          </tr>
          <tr>
            <td><strong>Program Studi</strong></td>
            <td>: ${tagihan.prodi}</td>
            <td><strong>Metode Bayar</strong></td>
            <td>: ${tagihan.metodeBayar || 'QRIS Dinamis'}</td>
          </tr>
          <tr>
            <td><strong>Jatuh Tempo</strong></td>
            <td>: ${formatTanggalIndonesia(tagihan.jatuhTempo)}</td>
            <td><strong>Waktu Lunas</strong></td>
            <td>: ${tagihan.tglBayar ? formatTanggalIndonesia(tagihan.tglBayar) : '-'}</td>
          </tr>
        </table>

        <table class="data-table">
          <thead>
            <tr>
              <th width="8%">No</th>
              <th width="50%">Deskripsi Tagihan</th>
              <th width="20%">Kode Akun</th>
              <th width="22%" style="text-align: right;">Jumlah (IDR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>${tagihan.deskripsi}</td>
              <td>${tagihan.kodeTagihan}</td>
              <td style="text-align: right;">${formatRupiah(tagihan.nominal)}</td>
            </tr>
            ${
              tagihan.denda > 0
                ? `<tr>
                    <td>2</td>
                    <td>Denda Keterlambatan</td>
                    <td>DENDA-LATE</td>
                    <td style="text-align: right;">${formatRupiah(tagihan.denda)}</td>
                  </tr>`
                : ''
            }
            <tr class="total-row">
              <td colspan="3" style="text-align: right; padding-right: 15px;">TOTAL DIBAYAR:</td>
              <td style="text-align: right; color: #0369a1;">${formatRupiah(tagihan.totalBayar)}</td>
            </tr>
          </tbody>
        </table>

        <table class="footer-table">
          <tr>
            <td width="60%" style="font-size: 9pt; color: #64748b; vertical-align: top;">
              <em>Catatan:</em><br>
              1. Struk ini merupakan bukti pembayaran resmi yang sah yang diproses secara otomatis oleh sistem SIMAKU.<br>
              2. Simpan file ini jika sewaktu-waktu diperlukan untuk proses KRS atau yudisium.<br>
              3. Tanggal Cetak: ${formatTanggalIndonesia(new Date().toISOString())}
            </td>
            <td width="40%" style="text-align: center; vertical-align: top;">
              <div>Kota Akademika, ${formatTanggalIndonesia(new Date().toISOString())}</div>
              <div style="font-weight: bold; margin-bottom: 45px;">Biro Administrasi Keuangan (BAK)</div>
              <div><strong>( Bagian Kasir & Verifikasi )</strong></div>
              <div style="font-size: 8pt; color: #94a3b8;">Universitas Akademika</div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Create a Blob with Word mime type
    const blob = new Blob(['\ufeff', wordHtmlContent], {
      type: 'application/msword',
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `Bukti_Bayar_${tagihan.kodeTagihan}_${tagihan.nim}.doc`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  },
};
