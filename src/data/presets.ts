export interface PresetMateri {
  id: string;
  judul: string;
  jenjang: 'SMK' | 'SMA';
  fase: string;
  kelas: string;
  mapel: string;
  alokasi: string;
  pedagogi: string;
  materi: string;
  deskripsi: string;
}

export const PRESET_MATERI: PresetMateri[] = [
  {
    id: 'smk-akl-rekonsiliasi-bank',
    judul: 'SMK AKL: Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Akuntansi Keuangan (Akuntansi & Keuangan Lembaga / AKL)',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning (PBL) & Studi Kasus Finansial',
    deskripsi: 'Menganalisis penyebab perbedaan saldo kas perusahaan vs rekening koran bank, menyusun kertas kerja rekonsiliasi, dan membuat jurnal penyesuaian.',
    materi: `Materi Pokok: Prosedur Rekonsiliasi Bank dan Pencatatan Jurnal Penyesuaian Saldo Kas

1. Konsep Dasar Rekonsiliasi Bank:
Rekonsiliasi bank adalah proses pencocokan dan analisis sistematis terhadap saldo kas menurut catatan pembukuan perusahaan (Buku Kas Bank) dengan saldo kas menurut laporan rekening koran yang diterbitkan oleh pihak bank pada akhir periode akuntansi tertentu. Tujuannya adalah memastikan akurasi saldo kas riil, memverifikasi keabsahan transaksi kas keluar/masuk, serta mendeteksi kemungkinan kecurangan (fraud) atau kesalahan pencatatan.

2. Penyebab Perbedaan Saldo Kas Perusahaan dan Bank:
a. Transaksi yang dicatat perusahaan tetapi belum dicatat bank:
   - Setoran dalam perjalanan (Deposit in Transit / DIT): Setoran kas di akhir bulan yang belum dibukukan bank.
   - Cek yang masih beredar (Outstanding Check / OC): Cek yang telah diterbitkan perusahaan kepada pemasok/pihak ketiga namun belum dicairkan ke bank.
b. Transaksi yang dicatat bank tetapi belum dicatat perusahaan:
   - Pendapatan jasa giro / bunga bank (Interest Revenue): Menambah saldo kas perusahaan.
   - Beban administrasi bank (Bank Service Charge): Mengurangi saldo kas perusahaan.
   - Cek kosong (Not Sufficient Fund / NSF Check): Cek pelanggan yang ditolak bank karena saldo tidak mencukupi, memulihkan piutang dagang.
   - Penagihan piutang melalui inkaso bank (Notes Receivable collected by bank).
c. Kesalahan pencatatan (Errors): Baik oleh kasir perusahaan maupun pihak operator bank.

3. Format Kertas Kerja Rekonsiliasi:
Menggunakan metode Saldo yang Benar (True Cash Balance) 2 kolom atau 4 kolom untuk menemukan saldo akhir kas yang siap disajikan pada Laporan Posisi Keuangan (Neraca).

4. Penyusunan Jurnal Penyesuaian (Adjusting Journal Entries):
Hanya pos-pos yang mempengaruhi saldo kas menurut catatan perusahaan yang perlu dibuatkan ayat jurnal penyesuaian (contoh: Debit Beban Administrasi Bank, Kredit Kas; Debit Kas, Kredit Pendapatan Bunga).

5. Praktik Kasus Kerja Industri (Jobsheet):
Siswa diberikan data riil rekening koran Bank BCA bulan Oktober milik PT Mandiri Sejahtera beserta rekap Buku Besar Kas Bank. Siswa menyusun lembar rekonsiliasi di spreadsheet dan memposting ayat jurnal penyesuaian ke buku besar pembantu.`,
  },
  {
    id: 'smk-akl-komputer-akuntansi',
    judul: 'SMK AKL: Komputer Akuntansi Perusahaan Dagang (Siklus Transaksi & Laporan)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Komputer Akuntansi (Akuntansi & Keuangan Lembaga / AKL)',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Project Based Learning (PjBL) & Praktik Lab Komputerisasi',
    deskripsi: 'Setup data awal perusahaan dagang, bagan akun, kartu piutang/utang, pencatatan transaksi pembelian-penjualan, dan generate laporan keuangan.',
    materi: `Materi Pokok: Komputerisasi Akuntansi Siklus Perusahaan Dagang Menggunakan Aplikasi Spreadsheet / Software Akuntansi

1. Setup Informasi Entitas Bisnis & Periode Akuntansi:
Membuat file data akuntansi baru meliputi nama entitas dagang, NPWP, alamat usaha, tahun buku (Current Financial Year), bulan konversi saldo awal, dan pemilihan jumlah periode (12 atau 13 bulan untuk adjustment).

2. Pembuatan dan Penyesuaian Bagan Akun (Chart of Accounts):
- Pengelompokan akun standar: 1-Aset (Lancar, Tetap), 2-Kewajiban (Lancar, Jangka Panjang), 3-Ekuitas/Modal, 4-Pendapatan, 5-Harga Pokok Penjualan (HPP), 6-Beban Operasional, 8-Pendapatan Lain-lain, 9-Beban Lain-lain.
- Pengaturan Link Accounts: Linked account untuk piutang (Account Receivable & Bank), utang (Account Payable & Bank), dan ekuitas (Retained Earnings & Historical Balancing).
- Penetapan Tarif Pajak: Pajak Pertambahan Nilai (PPN Masukan & PPN Keluaran 11%).

3. Penginputan Kartu Pembantu dan Saldo Awal (Card File & Balances):
- Card File Pelanggan (Customer) beserta saldo awal faktur piutang dagang.
- Card File Pemasok (Vendor) beserta saldo awal faktur utang dagang.
- Item List Persediaan Barang Dagang: Kode barang, satuan, metode penilaian persediaan (Average / FIFO), kuantitas, harga pokok, dan nilai total saldo awal.

4. Pencatatan Bukti Transaksi Keuangan Harian:
- Modul Purchases: Bukti faktur pembelian barang dagang secara kredit dan tunai, retur pembelian.
- Modul Sales: Faktur penjualan barang dagang kredit, termin pembayaran (2/10, n/30), retur penjualan.
- Modul Banking: Penerimaan pelunasan piutang (Receive Payments), pengeluaran kas untuk beban operasional & utang (Spend Money / Pay Bills).

5. Pelaporan Keuangan Otomatis (Financial Reports):
Menghasilkan Neraca Saldo (Trial Balance), Laporan Laba Rugi (Income Statement), Laporan Perubahan Ekuitas, dan Laporan Arus Kas, serta melakukan backup data arsip digital sesuai prosedur SOP akuntan lembaga.`,
  },
  {
    id: 'smk-akl-kas-kecil',
    judul: 'SMK AKL: Pengelolaan Dana Kas Kecil (Metode Imprest & Fluktuasi)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Akuntansi Keuangan (Akuntansi & Keuangan Lembaga / AKL)',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi Dokumen Kas',
    deskripsi: 'Pembentukan dana kas kecil, pencatatan bukti pengeluaran petty cash, pengisian kembali kas kecil (imprest system vs fluctuation system).',
    materi: `Materi Pokok: Pengelolaan Dana Kas Kecil (Petty Cash Fund) Perusahaan

1. Karakteristik dan Tujuan Kas Kecil:
Kas kecil adalah dana khusus yang dibentuk untuk membiayai pengeluaran rutin operasional perusahaan yang jumlahnya relatif kecil dan tidak efektif jika dibayar menggunakan cek (misal: konsumsi rapat pimpinan, materai, biaya fotokopi, ongkos kirim dokumen mendesak).

2. Sistem Pengelolaan Kas Kecil:
- Metode Dana Tetap (Imprest Fund System): Jumlah saldo fisik kas dan bukti pengeluaran selalu konstan. Saat terjadi pengeluaran belum dijurnal ke buku besar, jurnal baru dibuat saat pengisian kembali (replenishment) kas kecil.
- Metode Dana Tidak Tetap (Fluctuation Fund System): Setiap transaksi pengeluaran langsung dijurnal pada akun Kas Kecil sehingga saldonya selalu berfluktuasi/berubah.

3. Dokumen Transaksi Kas Kecil:
- Bukti Kas Keluar (BKK) dari kasir umum.
- Surat Permintaan Pembentukan / Pengisian Kembali Kas Kecil (SP2K).
- Bukti Pengeluaran Kas Kecil (BPKK) beserta nota/kuitansi pendukung.
- Lembar Perhitungan Fisik Kas (Cash Count / Berita Acara Pemeriksaan Kas).

4. Praktik Kasus Kerja:
Siswa menganalisis 10 bukti transaksi pengeluaran kantor selama 2 minggu, mencatat ke dalam Buku Kas Kecil metode Imprest, dan membuat jurnal pembentukan serta pengisian kembali sesuai standar SOP perbankan/lembaga.`,
  },
  {
    id: 'smk-tkj-vlan',
    judul: 'SMK TKJ: Konfigurasi Virtual LAN (VLAN) & Inter-VLAN Routing',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Konsentrasi Keahlian TKJ (Teknik Jaringan Komputer & Telekomunikasi)',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Project Based Learning (PjBL) & Standar Industri',
    deskripsi: 'Segmentasi jaringan lokal menggunakan VLAN ID, mode Trunking 802.1Q, konfigurasi Router-on-a-Stick, dan troubleshooting jaringan LAN.',
    materi: `Materi Pokok: Konfigurasi dan Troubleshooting Jaringan Virtual LAN (VLAN) serta Inter-VLAN Routing

1. Konsep Dasar Virtual LAN (VLAN):
VLAN adalah teknologi yang memungkinkan pengelompokan perangkat jaringan secara logis dalam satu segmen jaringan broadcast domain yang sama meskipun secara fisik terhubung pada port switch yang berbeda. Manfaat VLAN dalam industri: peningkatan efisiensi keamanan data, reduksi traffic broadcast storm, dan kemudahan manajemen divisi perusahaan (misal: VLAN 10 Keuangan, VLAN 20 Teknisi, VLAN 30 Tamu/Guest).

2. Standar dan Mode Port Switch:
- Mode Access: Port switch yang hanya menghubungkan end-device (PC/Laptop) ke satu VLAN tunggal (untagged frame).
- Mode Trunking (IEEE 802.1Q): Port penghubung antar-switch atau switch ke router yang membawa multiple frame VLAN dengan menyisipkan tag VLAN ID 4-byte.
- Native VLAN: VLAN default untuk menangani frame tanpa label (untagged).

3. Konfigurasi Inter-VLAN Routing (Router-on-a-Stick):
Menggunakan satu interface fisik router yang dipecah menjadi sub-interface logis (contoh: gig0/0.10 dan gig0/0.20) dengan enkapsulasi dot1Q dan penetapan IP Gateway tiap VLAN.

4. Keselamatan dan Budaya Kerja Industri (K3LH & 5R):
Penerapan prosedur K3 kelistrikan lab jaringan, penggunaan gelang statis (anti-static wrist strap), penataan kabel patch cord rapi (cable management), dan pengujian konektivitas menggunakan command 'ping' dan 'traceroute'.

5. Lembar Kerja Praktik Industri (Jobsheet):
Siswa mengonfigurasi topologi 2 switch manageable dan 1 router Cisco/Mikrotik di lab jaringan atau simulator Cisco Packet Tracer untuk menghubungkan divisi Marketing dan IT Support dengan isolasi hak akses.`,
  },
  {
    id: 'smk-otomotif-rem',
    judul: 'SMK Otomotif: Pemeliharaan Sistem Rem Cakram Hidrolik (K3LH & SOP)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Teknik Kendaraan Ringan / Otomotif (Konsentrasi Keahlian)',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Teaching Factory (TeFa) & Praktik Bengkel Standar APM',
    deskripsi: 'Prinsip Hukum Pascal, pemeriksaan ketebalan disc rotor & pad rem, bleeding minyak rem, dan penerapan budaya kerja bengkel 5R.',
    materi: `Materi Pokok: Perawatan Berkala dan Pemeriksaan Sistem Rem Cakram (Disc Brake) Hidrolik Kendaraan Ringan

1. Prinsip Kerja Rem Cakram Hidrolik:
Bekerja berdasarkan Hukum Pascal, yaitu tekanan fluida hidrolik (minyak rem DOT 3/DOT 4) yang dihasilkan oleh Master Cylinder saat pedal rem diinjak akan diteruskan secara merata ke Caliper Piston untuk menjepit Brake Pad ke Rotor Disc (piringan cakram), mengubah energi kinetik menjadi energi panas melalui gesekan.

2. Komponen Utama & Titik Kritis Keausan:
- Brake Disc (Rotor): Pemeriksaan run-out (keolengan) menggunakan Dial Indicator (maksimal 0,05 mm) dan ketebalan minimum menggunakan Micrometer Outside.
- Brake Pad: Pemeriksaan batas ketebalan kampas rem (minimum 1,0 mm) dan keausan tidak merata.
- Caliper & Piston Seal: Pemeriksaan kebocoran minyak rem dan kondisi boot karet pelindung debu.
- Minyak Rem: Pengecekan titik didih (boiling point) menggunakan Brake Fluid Tester dan penggantian berkala setiap 40.000 km atau 2 tahun.

3. Prosedur Kerja Standar (SOP Bengkel Resmi APM):
- Pemasangan Fender Cover, Grill Cover, dan Seat Cover sebelum memulai pekerjaan.
- Penggunaan APD lengkap (Safety Shoes, Kacamata Pelindung, Sarung Tangan Karet saat kontak cairan minyak rem).
- Prosedur Bleeding udara palsu pada saluran hidrolik rem dengan metode urutan terjauh dari master cylinder (Belakang Kiri -> Belakang Kanan -> Depan Kiri -> Depan Kanan).

4. Budaya Kerja 5R (Ringkas, Rapi, Resik, Rawat, Rajin):
Pengembalian SST (Special Service Tools) dan Kunci Momen ke Tool Cabinet, pembersihan tumpahan fluida dengan majun bersih, dan pemeriksaan akhir torsi baut roda menggunakan kunci momen (torque wrench 103 Nm).`,
  },
  {
    id: 'smk-kuliner-haccp',
    judul: 'SMK Kuliner: Pengolahan Main Course Kontinental & Standar Higiene HACCP',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Kuliner / Tata Boga (Pengolahan Makanan Kontinental)',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Project Based Learning (PjBL) & Standar DUDIKA Hotel',
    deskripsi: 'Teknik dasar memasak (pan searing, roasting), pembuatan saus turunan (brown sauce/demi-glace), plating artistik, dan standar keamanan pangan.',
    materi: `Materi Pokok: Pengolahan dan Penyajian Main Course Kontinental Daging Unggas/Sapi dengan Saus Kontinental

1. Struktur dan Porsi Main Course Kontinental:
Main course (hidangan utama) standar perjamuan kontinental memiliki berat total 250 - 350 gram dengan komposisi:
- Bahan Utama (Main Item): Daging sapi tenderloin/sirloin atau dada ayam (150 - 200 gram).
- Karbohidrat Pengiring (Starch): Mashed potato, roasted baby potato, atau buttered rice (75 - 100 gram).
- Sayuran Pendamping (Vegetables): Glazed carrot, sautéed green beans, atau grilled asparagus (75 gram).
- Saus Pengiring (Sauce): Demi-glace, blackpepper sauce, atau mushroom cream sauce (30 - 50 ml).

2. Teknik Pengolahan Panas Basah dan Kering:
- Marinating: Pembumbuan daging dengan rempah aromatik, minyak zaitun, garam laut, dan merica hitam.
- Pan Searing: Membentuk kerak karamelisasi (Maillard reaction) pada permukaan daging menggunakan wajan besi cor (cast iron).
- Roasting: Pematangan daging di dalam oven kombinasi dengan kontrol suhu internal (meat thermometer: 65°C untuk medium well).

3. Higiene Sanitasi dan Standar Keamanan Pangan (HACCP):
- Menghindari bahaya kontaminasi silang (cross-contamination) dengan kode warna talenan: Merah (daging mentah), Kuning (unggas mentah), Hijau (sayuran/buah segar), Putih (makanan matang).
- Pengendalian zona suhu bahaya (Danger Zone: 5°C - 60°C).
- Standar kebersihan diri juru masak (Personal Hygiene): Chef jacket bersih, apron, topi koki, dan kuku pendek tanpa perhiasan.

4. Unjuk Kerja Praktik & Penilaian Sensoris:
Siswa bekerja berpasangan menyiapkan 2 porsi Chicken Steak with Blackpepper Sauce & Lyonnaise Potato sesuai waktu pemesanan (cook time max 30 menit) dan dinilai berdasarkan rasa, tekstur, aroma, kesesuaian suhu saji, dan estetika penataan piring (food plating).`,
  },
  {
    id: 'smk-dkv-branding',
    judul: 'SMK DKV: Perancangan Identitas Visual Brand & Logo UMKM Lokal',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Desain Komunikasi Visual (DKV)',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Project Based Learning (PjBL) & Kemitraan Klien Nyata',
    deskripsi: 'Prinsip desain logo, psikologi warna, tipografi, pembuatan sketsa manual hingga vektorisasi digital (Adobe Illustrator/CorelDRAW), dan manual book pedoman logo.',
    materi: `Materi Pokok: Perancangan Identitas Visual (Corporate Identity) dan Logo untuk Klien Nyata / UMKM

1. Hakikat Identitas Visual dan Branding:
Identitas visual adalah representasi grafis menyeluruh dari esensi, nilai, kepribadian, dan positioning suatu merek di mata publik dan konsumen. Komponen utama identitas visual meliputi: logo, palet warna korporat (corporate colors), tipografi, elemen grafis pendukung (supergraphic), dan gaya fotografi.

2. Kriteria Desain Logo Profesional:
- Simple (Sederhana, mudah diingat dalam sekejap).
- Memorable (Berkarakter kuat dan memiliki ciri khas pembeda dari kompetitor).
- Timeless (Bertahan melintasi tren zaman).
- Versatile (Fleksibel diaplikasikan pada berbagai media cetak dan digital: favicon 16px hingga billboard 10 meter, monokrom maupun full color).
- Appropriate (Sesuai dengan target audiens dan jenis industri produk).

3. Alur Kerja Desain Standar Agensi Kreatif (Design Workflow):
- Creative Brief & Wawancara Klien: Menggali USP (Unique Selling Proposition), target demografis, dan persona merk.
- Mind Mapping & Moodboard: Eksplorasi kata kunci visual, inspirasi tekstur, dan palet warna CMYK/RGB/HEX.
- Sketsa Kasar (Thumbnail Sketches): Menghasilkan minimal 15 alternatif sketsa manual dengan pensil di kertas grid.
- Vektorisasi Digital: Digitalisasi sketsa terpilih menggunakan software desain grafis berbasis kurva vektor (Bezier tool, Pathfinder).
- Penyusunan Brand Guidelines (Graphic Standard Manual / GSM): Panduan ukuran minimum, clear space area, variasi warna resmi, serta aturan larangan penggunaan logo (dos and don'ts).

4. Simulasi Pitching & Presentasi Klien:
Siswa mempresentasikan proposal identitas visual di depan panel guru dan perwakilan pemilik UMKM lokal dengan argumentasi rasional desain yang kuat.`,
  },
  {
    id: 'smk-akl-akuntansi-desa',
    judul: 'SMK AKL: Praktikum Akuntansi Lembaga / Instansi Pemerintah & Desa',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XII',
    mapel: 'Praktikum Akuntansi Lembaga/Instansi Pemerintah (AKL)',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi Aplikasi Siskeudes',
    deskripsi: 'Pengelolaan Keuangan Desa, Anggaran Pendapatan & Belanja Desa (APBDes), SP2D, pencatatan transaksi Kas Desa, dan Laporan Pertanggungjawaban.',
    materi: `Materi Pokok: Pengelolaan dan Pembukuan Keuangan Desa Berbasis Standar Akuntansi Pemerintahan (SAP)

1. Regulasi dan Asas Pengelolaan Keuangan Desa:
Berdasarkan Permendagri No. 20 Tahun 2018 tentang Pengelolaan Keuangan Desa, keuangan desa dikelola berdasarkan asas transparan, akuntabel, partisipatif, serta tertib dan disiplin anggaran. Siklus keuangan desa meliputi: Perencanaan, Pelaksanaan, Penatausahaan, Pelaporan, dan Pertanggungjawaban.

2. Struktur Anggaran Pendapatan dan Belanja Desa (APBDes):
- Pendapatan Desa: Pendapatan Asli Desa (PADes), Transfer (Dana Desa, Alokasi Dana Desa/ADD, Bagi Hasil Pajak), dan Pendapatan Lain-lain.
- Belanja Desa: Bidang Penyelenggaraan Pemerintahan Desa, Bidang Pelaksanaan Pembangunan Desa, Bidang Pembinaan Kemasyarakatan, Bidang Pemberdayaan Masyarakat, dan Bidang Penanggulangan Bencana/Darurat.
- Pembiayaan Desa: Penerimaan Pembiayaan (SILPA tahun sebelumnya) dan Pengeluaran Pembiayaan (Penyertaan Modal BUMDes).

3. Dokumen Transaksi dan Penatausahaan:
- Surat Permintaan Pembayaran (SPP) oleh Kepala Urusan / Kepala Seksi Pelaksana Kegiatan.
- Surat Perintah Pencairan Dana (SP2D) yang diverifikasi oleh Sekretaris Desa dan disetujui Kepala Desa.
- Buku Kas Umum (BKU), Buku Pembantu Kas, Buku Pembantu Bank, dan Buku Pembantu Pajak yang dikelola oleh Bendahara Desa.
- Bukti pemotongan/pemungutan PPh Pasal 21, PPh Pasal 22, dan PPN atas pengadaan barang/jasa desa.

4. Praktik Kerja (Jobsheet Simulasi Kasus):
Siswa memproses 8 berkas transaksi pengeluaran proyek pavingisasi jalan desa dari pencairan SPP, pencatatan ke BKU, hingga pemotongan pajak belanja material dan pembuatan Laporan Realisasi Pelaksanaan APBDes.`,
  },
  {
    id: 'smk-akl-perpajakan-pph21',
    judul: 'SMK AKL: Administrasi Perpajakan (Perhitungan PPh Pasal 21 Karyawan & UU HPP)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Administrasi Perpajakan (Akuntansi & Keuangan Lembaga / AKL)',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi e-Bupot DJP Online',
    deskripsi: 'Ketentuan PTKP, Tarif Efektif Rata-Rata (TER) PP 58/2023, tarif progresif Pasal 17 UU HPP, pembuatan bukti potong dan pengisian SPT Masa PPh 21.',
    materi: `Materi Pokok: Perhitungan dan Pemotongan Pajak Penghasilan (PPh) Pasal 21 atas Penghasilan Pegawai Tetap

1. Dasar Hukum dan Konsep PPh Pasal 21:
PPh Pasal 21 adalah pajak atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain dengan nama dan dalam bentuk apapun sehubungan dengan pekerjaan atau jabatan, jasa, dan kegiatan yang dilakukan oleh orang pribadi subjek pajak dalam negeri sesuai Undang-Undang Harmonisasi Peraturan Perpajakan (UU HPP No. 7 Tahun 2021).

2. Komponen Perhitungan Pajak Karyawan:
- Penghasilan Bruto: Gaji pokok, tunjangan keluarga, tunjangan jabatan, uang lembur, premi asuransi (JKK/JKM) yang dibayar pemberi kerja.
- Pengurang Penghasilan Bruto: Biaya Jabatan (5% dari bruto, maksimal Rp500.000/bulan atau Rp6.000.000/tahun), iuran pensiun/JHT yang dibayar sendiri oleh pegawai.
- Penghasilan Tidak Kena Pajak (PTKP):
  * Wajib Pajak Sendiri (TK/0): Rp54.000.000 / tahun.
  * Tambahan Wajib Pajak Kawin (K/0): Rp4.500.000.
  * Tambahan per tanggungan keluarga sedarah/semenda garis lurus (maks. 3 orang): @ Rp4.500.000.
- Tarif Efektif Rata-Rata (TER) Bulanan (Kategori A, B, C berdasarkan PP 58/2023 dan PMK 168/2023) untuk pemotongan masa Januari - November.
- Tarif Progresif Pasal 17 UU HPP untuk masa pajak Desember (Lapisan: s.d. 60 juta = 5%, >60-250 juta = 15%, >250-500 juta = 25%, >500 juta - 5 miliar = 30%, >5 miliar = 35%).

3. Praktik Kasus Kerja Industri:
Siswa menganalisis daftar gaji 5 staf pada PT Cipta Finansial Utama dengan status PTKP berbeda (TK/0, K/1, K/2), menghitung PPh 21 menggunakan skema TER bulanan, menyusun kertas kerja rekonsiliasi masa Desember, dan menerbitkan Formulir 1721-A1 bukti potong karyawan.`,
  },
  {
    id: 'smk-akl-manufaktur-hpp',
    judul: 'SMK AKL: Akuntansi Manufaktur & Penentuan Harga Pokok Pesanan (Job Order Costing)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XII',
    mapel: 'Praktikum Akuntansi Perusahaan Manufaktur (AKL)',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Project Based Learning & Simulasi Kartu Harga Pokok',
    deskripsi: 'Aliran biaya produksi (BBB, BTKL, BOP), pencatatan kartu harga pokok pesanan, jurnal pemakaian bahan dan alokasi BOP, serta penentuan laba kotor.',
    materi: `Materi Pokok: Akuntansi Biaya dan Penentuan Harga Pokok Produksi Berdasarkan Metode Harga Pokok Pesanan (Job Order Costing)

1. Karakteristik Perusahaan Manufaktur dan Aliran Biaya:
Perusahaan manufaktur mengolah bahan baku menjadi produk jadi siap jual melalui proses produksi. Tiga elemen utama biaya manufaktur:
- Biaya Bahan Baku Langsung (Direct Materials)
- Biaya Tenaga Kerja Langsung (Direct Labor)
- Biaya Overhead Pabrik (Manufacturing Overhead): Bahan penolong, tenaga kerja tidak langsung, penyusutan mesin pabrik, listrik dan air pabrik.

2. Metode Harga Pokok Pesanan (Job Order Costing):
Diterapkan pada perusahaan yang berproduksi berdasarkan spesifikasi pesanan pelanggan (customized product), contoh: percetakan, mebel furniture custom, bengkel karoseri.
- Karakteristik: Biaya dikumpulkan untuk setiap pesanan secara individual.
- Dokumen Kunci: Kartu Harga Pokok Pesanan (Job Order Cost Sheet) yang merinci tanggal pemakaian bahan, jam kerja teknisi, dan tarif pembebanan BOP.

3. Pembebanan Biaya Overhead Pabrik (BOP):
BOP dibebankan kepada pesanan berdasarkan tarif yang ditentukan di muka (Predetermined Overhead Rate) berdasarkan jam kerja langsung (JKL) atau jam mesin (JM).

4. Praktik Kerja (Jobsheet Manufaktur):
Siswa menerima pesanan No. 101 pembuatan 500 unit kemeja seragam dari CV Busana Mandiri. Siswa membukukan bukti permintaan bahan baku ke gudang, rekapitulasi kartu jam kerja buruh jahit, menghitung tarif BOP 120% dari BTKL, menyusun Kartu Biaya Pesanan, dan menjurnal pemindahan Barang Dalam Proses (BDP) ke Gudang Produk Jadi.`,
  },
  {
    id: 'smk-mplb-kearsipan-digital',
    judul: 'SMK MPLB: Pengelolaan Kearsipan Digital & Otomasi Perkantoran Modern',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    mapel: 'Manajemen Perkantoran & Layanan Bisnis (MPLB)',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Project Based Learning & Praktik Cloud Archiving',
    deskripsi: 'Sistem klasifikasi arsip (subjek, abjad, nomor, kronologis), digitalisasi dokumen (scanning & OCR), metadata tagging, dan pengarsipan berbasis Google Drive/Cloud.',
    materi: `Materi Pokok: Tata Kelola Dokumen dan Sistem Penyimpanan Arsip Digital Perkantoran Modern

1. Konsep Manajemen Arsip Elektronik (E-Records Management):
Transformasi perkantoran digital 4.0 menuntut kecepatan temu balik arsip (retrieval time < 1 menit), integritas data, dan keamanan informasi. Arsip elektronik mencakup dokumen digital asli (born-digital) maupun hasil pemindaian berkas fisik (scanned documents).

2. Standar Klasifikasi dan Penamaan Berkas (File Naming Conventions):
- Sistem Subjek (Masalah pokok transaksi: Keuangan, Kepegawaian, Pemasaran).
- Kode Indeks Berkas Baku: [KODE_UNIT]_[TANGGAL]_[JENIS_DOKUMEN]_[URAIAN_SINGKAT] (contoh: KEU_20261106_FAK_PTMajuBersama).

3. Prosedur Digitalisasi Dokumen:
- Pemilahan dokumen fisik (memisahkan klip/stapler).
- Pemindaian (Scanning) dengan resolusi minimal 300 DPI warna/grayscale.
- Optical Character Recognition (OCR) untuk memungkinkan pencarian kata kunci teks penuh (full-text search).
- Pemberian Hak Akses (Access Control Level): Read-Only, Editor, Admin untuk menjaga kerahasiaan data perusahaan.

4. Praktik Kerja:
Siswa mengorganisasi 15 korespondensi surat masuk/keluar ke dalam hierarki folder cloud arsip digital, membuat buku agenda elektronik di spreadsheet, dan melakukan simulasi temu kembali arsip dalam waktu 30 detik.`,
  },
  {
    id: 'bio-sma-keanekaragaman',
    judul: 'SMA Biologi: Keanekaragaman Hayati Indonesia & Solusi Pelestariannya',
    jenjang: 'SMA',
    fase: 'Fase E',
    kelas: 'Kelas X',
    mapel: 'Biologi / IPA',
    alokasi: '2 Pertemuan x 2 JP (90 Menit)',
    pedagogi: 'Problem Based Learning (PBL) & Inkuiri',
    deskripsi: 'Tingkat keanekaragaman gen, jenis, ekosistem; flora-fauna tipe Oriental, Australian, dan Peralihan; ancaman deforestasi dan konservasi.',
    materi: `Materi Pokok: Keanekaragaman Hayati (Biodiversitas) Indonesia dan Upaya Pelestarian Lingkungan

1. Tingkatan Keanekaragaman Hayati:
- Tingkat Gen: Variasi susunan gen dalam satu spesies (contoh: ragam varietas padi Rojolele, IR-64, Pandan Wangi; ragam warna bunga mawar merah, putih, kuning).
- Tingkat Jenis/Spesies: Perbedaan yang ditemukan pada komunitas atau famili hewan/tumbuhan yang berbeda spesies (contoh: harimau, singa, macan tutul, dan kucing dalam famili Felidae).
- Tingkat Ekosistem: Variasi interaksi antara komponen biotik dan abiotik di berbagai wilayah (ekosistem hutan hujan tropis, ekosistem mangrove, ekosistem terumbu karang, sabana).

2. Keunikan Biodiversitas Indonesia:
Indonesia merupakan negara megabiodiversitas dunia. Wilayah fauna dibagi oleh Garis Wallace dan Garis Weber menjadi 3 zona:
- Zona Asiatis/Oriental (wilayah barat): Mamalia berukuran besar (Gajah Sumatra, Badak Jawa, Orangutan).
- Zona Peralihan/Wallacea (Sulawesi, Nusa Tenggara): Hewan endemik khas (Anoa, Babirusa, Komodo, Burung Maleo).
- Zona Australis (wilayah timur/Papua): Hewan berkantong dan burung berbulu indah (Kanguru pohon, Kuskus, Burung Cendrawasih).

3. Ancaman terhadap Biodiversitas:
Alih fungsi hutan menjadi perkebunan kelapa sawit monokultur, perburuan liar, pencemaran limbah industri dan mikroplastik, serta perubahan iklim global.

4. Upaya Konservasi:
- In situ: Pelestarian di habitat aslinya (Taman Nasional Ujung Kulon, Cagar Alam, Suaka Margasatwa).
- Ex situ: Pelestarian di luar habitat aslinya (Kebun Raya Bogor, Taman Safari, Kebun Binatang).

5. Masalah Kontekstual:
Siswa menganalisis kasus kebakaran hutan atau penurunan populasi terumbu karang lokal serta merancang kampanye aksi konservasi kreatif berbasis media digital.`,
  },
];

