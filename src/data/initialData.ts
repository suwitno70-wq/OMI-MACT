import { Question, MaterialTopic, User, Badge } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-siswa-1',
    username: 'alif_kotim',
    nama: 'Muhammad Alif Rahmatullah',
    role: 'siswa',
    kelas: '6A',
    nis: '20260601',
    avatar: '👦',
    xp: 4250,
    skorTertinggi: 92,
    totalLatihan: 18,
    soalDijawab: 280,
    jawabanBenar: 238,
    streakDays: 5,
    lastActiveDate: '2026-09-03',
    unlockedBadges: ['badge-pemula', 'badge-bilangan', 'badge-streak-3', 'badge-pejuang']
  },
  {
    id: 'u-siswa-2',
    username: 'fatimah_kotim',
    nama: 'Fatimah Azzahra Humaira',
    role: 'siswa',
    kelas: '6B',
    nis: '20260602',
    avatar: '🧕',
    xp: 5120,
    skorTertinggi: 96,
    totalLatihan: 24,
    soalDijawab: 360,
    jawabanBenar: 324,
    streakDays: 7,
    lastActiveDate: '2026-09-03',
    unlockedBadges: ['badge-pemula', 'badge-bilangan', 'badge-geometri', 'badge-streak-3', 'badge-streak-7', 'badge-champion']
  },
  {
    id: 'u-siswa-3',
    username: 'fauzan_kotim',
    nama: 'Ahmad Fauzan Pratama',
    role: 'siswa',
    kelas: '6A',
    nis: '20260603',
    avatar: '🧒',
    xp: 3480,
    skorTertinggi: 84,
    totalLatihan: 14,
    soalDijawab: 210,
    jawabanBenar: 172,
    streakDays: 2,
    lastActiveDate: '2026-09-02',
    unlockedBadges: ['badge-pemula', 'badge-bilangan']
  },
  {
    id: 'u-guru-witno',
    username: 'witno_guru',
    nama: 'Witno, S.Pd.I (Pembina OMI)',
    role: 'guru',
    kelas: 'Pembina Matematika',
    avatar: '👨‍🏫',
    xp: 9999,
    skorTertinggi: 100,
    totalLatihan: 50,
    soalDijawab: 1000,
    jawabanBenar: 1000,
    streakDays: 30,
    lastActiveDate: '2026-09-03',
    unlockedBadges: ['badge-master', 'badge-champion', 'badge-streak-30']
  },
  {
    id: 'u-admin-1',
    username: 'admin_min1kotim',
    nama: 'Admin MIN 1 Kotawaringin Timur',
    role: 'admin',
    kelas: 'Administrator',
    avatar: '⚙️',
    xp: 9999,
    skorTertinggi: 100,
    totalLatihan: 0,
    soalDijawab: 0,
    jawabanBenar: 0,
    streakDays: 1,
    lastActiveDate: '2026-09-03',
    unlockedBadges: []
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge-pemula',
    nama: '🥉 Pemula Berani',
    deskripsi: 'Menyelesaikan latihan matematika pertama di MATH OMI.',
    icon: '🥉',
    syarat: 'Selesaikan 1 latihan',
    kategori: 'kuantitas'
  },
  {
    id: 'badge-bilangan',
    nama: '🥈 Ahli Bilangan',
    deskripsi: 'Mencapai akurasi di atas 85% pada materi Bilangan & Operasi Hitung.',
    icon: '🥈',
    syarat: 'Akurasi Bilangan ≥ 85%',
    kategori: 'skor'
  },
  {
    id: 'badge-geometri',
    nama: '🥇 Master Geometri',
    deskripsi: 'Menyelesaikan 20 soal geometri olimpiade dengan skor cemerlang.',
    icon: '🥇',
    syarat: '20 Soal Geometri Benar',
    kategori: 'skor'
  },
  {
    id: 'badge-streak-3',
    nama: '🔥 Pejuang 3 Hari',
    deskripsi: 'Konsisten berlatih soal olimpiade selama 3 hari berturut-turut.',
    icon: '🔥',
    syarat: 'Streak 3 Hari',
    kategori: 'streak'
  },
  {
    id: 'badge-streak-7',
    nama: '⚡ Pejuang 7 Hari',
    deskripsi: 'Semangat belajar luar biasa selama 1 minggu tanpa putus.',
    icon: '⚡',
    syarat: 'Streak 7 Hari',
    kategori: 'streak'
  },
  {
    id: 'badge-streak-30',
    nama: '🌟 Dedikasi Sebulan',
    deskripsi: 'Latihan konsisten selama 30 hari persiapan OMI 2026.',
    icon: '🌟',
    syarat: 'Streak 30 Hari',
    kategori: 'streak'
  },
  {
    id: 'badge-pejuang',
    nama: '🎖️ Pejuang OMI',
    deskripsi: 'Menyelesaikan minimal satu sesi Simulasi Penuh 30 soal OMI.',
    icon: '🎖️',
    syarat: 'Selesaikan 1 Simulasi OMI',
    kategori: 'spesial'
  },
  {
    id: 'badge-champion',
    nama: '🏆 Math Champion',
    deskripsi: 'Meraih skor 90 atau lebih pada Simulasi Kompetisi OMI 2026.',
    icon: '🏆',
    syarat: 'Skor Simulasi ≥ 90',
    kategori: 'skor'
  },
  {
    id: 'badge-master',
    nama: '👑 Math Master',
    deskripsi: 'Mengumpulkan lebih dari 5.000 XP dan menempati Top 3 Ranking.',
    icon: '👑',
    syarat: 'XP ≥ 5000 & Top 3',
    kategori: 'spesial'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- BILANGAN ---
  {
    id: 'Q-BIL-001',
    materi: 'Bilangan',
    submateri: 'Operasi Pecahan & Pola Beruntun',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Hitunglah nilai dari bentuk penjumlahan pecahan berikut:\n(1 - 1/2) × (1 - 1/3) × (1 - 1/4) × ... × (1 - 1/2026)',
    pilihan: {
      A: '1 / 2026',
      B: '2 / 2026',
      C: '2025 / 2026',
      D: '1 / 1013'
    },
    kunciJawaban: 'A',
    pembahasan: 'Perhatikan setiap kurung pecahan:\n• (1 - 1/2) = 1/2\n• (1 - 1/3) = 2/3\n• (1 - 1/4) = 3/4\n...\n• (1 - 1/2026) = 2025/2026\n\nJika dikalikan: (1/2) × (2/3) × (3/4) × ... × (2025/2026)\nPenyebut pecahan pertama saling mencoret pembilang pecahan berikutnya (teleskopik):\nAngka 2, 3, 4, ..., 2025 semua saling membagi. Yang tersisa hanyalah pembilang suku pertama (1) dan penyebut suku terakhir (2026).\nMaka hasilnya adalah 1/2026.',
    tipsPenyelesaian: 'Trik Teleskopik: Cukup hitung 3 suku awal untuk melihat pola pencoretan silang (diagonal cancellation), lalu perhatikan suku paling awal dan suku paling akhir.',
    konsep: ['Pecahan', 'Pola Perkalian Teleskopik', 'Penyederhanaan Aljabar'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 3
  },
  {
    id: 'Q-BIL-002',
    materi: 'Bilangan',
    submateri: 'FPB & KPK Soal Cerita Olimpiade',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Madrasah Ibtidaiyah MIN 1 Kotawaringin Timur menerima sumbangan 84 buku matematika, 56 pensil 2B, dan 140 buku gambar untuk peserta didik berprestasi. Barang-barang tersebut akan dibagikan ke dalam paket bingkisan dengan jumlah dan jenis yang sama rata tanpa ada sisa. Berapa jumlah paket terbanyak yang dapat dibuat, dan berapa isi buku matematika di setiap paket?',
    pilihan: {
      A: '14 paket, masing-masing 6 buku matematika',
      B: '28 paket, masing-masing 3 buku matematika',
      C: '28 paket, masing-masing 4 buku matematika',
      D: '56 paket, masing-masing 2 buku matematika'
    },
    kunciJawaban: 'B',
    pembahasan: 'Jumlah paket terbanyak diperoleh dengan mencari FPB (Faktor Persekutuan Terbesar) dari 84, 56, dan 140:\n• Faktorisasi prima 84 = 2² × 3 × 7\n• Faktorisasi prima 56 = 2³ × 7\n• Faktorisasi prima 140 = 2² × 5 × 7\n\nFPB = 2² × 7 = 4 × 7 = 28 paket.\n\nIsi buku matematika setiap paket:\n84 ÷ 28 = 3 buku matematika.\n(Pensil = 56 ÷ 28 = 2; Buku gambar = 140 ÷ 28 = 5).',
    tipsPenyelesaian: 'Bila ada kata kunci "terbanyak", "sama rata tanpa sisa", selalu gunakan konsep FPB. Untuk mencari isi per paket, bagi total awal dengan nilai FPB.',
    konsep: ['FPB (Faktor Persekutuan Terbesar)', 'Faktorisasi Prima', 'Pembagian Merata'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 3
  },
  {
    id: 'Q-BIL-003',
    materi: 'Bilangan',
    submateri: 'Angka Satuan dari Bilangan Berpangkat',
    tingkatKesulitan: 'Sulit',
    levelPenalaran: 'Level 3 – Advanced',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Berapakah angka satuan (digit terakhir) dari hasil perhitungan 2026²⁰²⁶ + 2027²⁰²⁶?',
    pilihan: {
      A: '3',
      B: '5',
      C: '7',
      D: '9'
    },
    kunciJawaban: 'B',
    pembahasan: 'Untuk mencari angka satuan, kita hanya perlu memperhatikan digit satuan dari masing-masing bilangan:\n1. Bagian pertama: 2026²⁰²⁶ → Angka satuan dari 6 pangkat berapapun selalu berakhir dengan angka 6.\n   Jadi angka satuan dari 2026²⁰²⁶ adalah 6.\n\n2. Bagian kedua: 2027²⁰²⁶ → Angka satuan ditentukan oleh 7²⁰²⁶.\nPola perulangan angka satuan bilangan basis 7:\n• 7¹ = 7\n• 7² = 9 (49)\n• 7³ = 3 (343)\n• 7⁴ = 1 (2401)\nPola berulang setiap 4 siklus: [7, 9, 3, 1].\nBagi eksponen 2026 dengan 4: 2026 ÷ 4 = 506 bersisa 2.\nSisa 2 menunjukkan posisi ke-2 pada pola, yaitu angka 9.\n\n3. Jumlahkan kedua angka satuan:\n6 + 9 = 15 → digit satuannya adalah 5.',
    tipsPenyelesaian: 'Pola siklus angka satuan basis 7 berulang setiap periode 4. Angka satuan basis 6 selalu tetap 6. Jumlahkan kedua satuan untuk mendapat digit akhir.',
    konsep: ['Aritmetika Modular', 'Siklus Digit Satuan', 'Eksponen'],
    waktuRekomendasiMenit: 3,
    bobotNilai: 4
  },
  {
    id: 'Q-BIL-004',
    materi: 'Bilangan',
    submateri: 'Perbandingan dan Selisih Umur',
    tingkatKesulitan: 'Mudah',
    levelPenalaran: 'Level 1 – Fundamental',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Perbandingan tabungan Alif dan Fauzan adalah 5 : 8. Jika selisih tabungan keduanya adalah Rp 45.000,00, berapakah jumlah total uang tabungan mereka berdua?',
    pilihan: {
      A: 'Rp 195.000,00',
      B: 'Rp 180.000,00',
      C: 'Rp 150.000,00',
      D: 'Rp 225.000,00'
    },
    kunciJawaban: 'A',
    pembahasan: 'Perbandingan Alif : Fauzan = 5 : 8\nSelisih perbandingan = 8 - 5 = 3 bagian.\nNilai 1 bagian = Rp 45.000 ÷ 3 = Rp 15.000.\n\nJumlah perbandingan = 5 + 8 = 13 bagian.\nJumlah total uang tabungan keduanya:\n= 13 × Rp 15.000 = Rp 195.000,00.',
    tipsPenyelesaian: 'Rumus Cepat: Total = (Jumlah Rasio / Selisih Rasio) × Nilai Selisih = (13 / 3) × 45.000 = 13 × 15.000 = 195.000.',
    konsep: ['Rasio dan Perbandingan', 'Metode Bagian (Unitary Method)'],
    waktuRekomendasiMenit: 1.5,
    bobotNilai: 2
  },

  // --- ALJABAR DASAR ---
  {
    id: 'Q-ALJ-001',
    materi: 'Aljabar Dasar',
    submateri: 'Pola Bilangan Bertingkat & Suku ke-n',
    tingkatKesulitan: 'Sulit',
    levelPenalaran: 'Level 3 – Advanced',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Diberikan barisan bilangan bertingkat: 3, 7, 13, 21, 31, 43, ...\nBerapakah nilai suku ke-20 pada barisan tersebut?',
    pilihan: {
      A: '381',
      B: '401',
      C: '421',
      D: '443'
    },
    kunciJawaban: 'C',
    pembahasan: 'Perhatikan selisih antar suku:\n• 7 - 3 = 4\n• 13 - 7 = 6\n• 21 - 13 = 8\n• 31 - 21 = 10\n• 43 - 31 = 12\n\nSelisih tingkat pertama bertambah 2: (4, 6, 8, 10, 12, ...)\nBentuk umum suku ke-n:\nU₁ = 1² + 1 + 1 = 3\nU₂ = 2² + 2 + 1 = 7\nU₃ = 3² + 3 + 1 = 13\nU₄ = 4² + 4 + 1 = 21\nRumus suku ke-n: U_n = n² + n + 1\n\nUntuk n = 20:\nU₂₀ = 20² + 20 + 1 = 400 + 20 + 1 = 421.',
    tipsPenyelesaian: 'Cek apakah polanya berkaitan dengan bilangan kuadrat: n² = 1, 4, 9, 16, 25. Tambahkan n + 1 didapat persis 3, 7, 13, 21, 31!',
    konsep: ['Barisan Aritmetika Tingkat 2', 'Persamaan Kuadrat Sederhana'],
    waktuRekomendasiMenit: 3,
    bobotNilai: 4
  },
  {
    id: 'Q-ALJ-002',
    materi: 'Aljabar Dasar',
    submateri: 'Persamaan Linear dan Substitusi Variabel',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Di koperasi MIN 1 Kotim, harga 2 buku tulis dan 3 pulpen adalah Rp 21.000,00. Sedangkan harga 3 buku tulis dan 2 pulpen adalah Rp 24.000,00. Berapakah harga 1 buku tulis dan 1 pulpen jika dijumlahkan?',
    pilihan: {
      A: 'Rp 8.000,00',
      B: 'Rp 9.000,00',
      C: 'Rp 10.000,00',
      D: 'Rp 11.000,00'
    },
    kunciJawaban: 'B',
    pembahasan: 'Misal buku = B dan pulpen = P.\nPersamaan 1: 2B + 3P = 21.000\nPersamaan 2: 3B + 2P = 24.000\n\nJumlahkan kedua persamaan langsung:\n(2B + 3P) + (3B + 2P) = 21.000 + 24.000\n5B + 5P = 45.000\nBagi kedua ruas dengan 5:\nB + P = 9.000\n\nJadi harga 1 buku dan 1 pulpen adalah Rp 9.000,00.',
    tipsPenyelesaian: 'Trik Olimpiade: Jangan repot-repot mencari harga masing-masing buku atau pulpen secara terpisah! Cukup jumlahkan kedua persamaan lalu bagi dengan koefisien bersama (5).',
    konsep: ['Sistem Persamaan Linear Sederhana', 'Trik Penjumlahan Koefisien Simetris'],
    waktuRekomendasiMenit: 1.5,
    bobotNilai: 3
  },

  // --- GEOMETRI ---
  {
    id: 'Q-GEO-001',
    materi: 'Geometri',
    submateri: 'Luas Daerah Diarsir dan Lingkaran',
    tingkatKesulitan: 'Olimpiade',
    levelPenalaran: 'Level 4 – Olympic Challenge',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Sebuah persegi ABCD memiliki panjang sisi 14 cm. Di dalam persegi tersebut dibuat 4 buah seperempat lingkaran yang masing-masing berpusat di keempat titik sudut (A, B, C, D) dengan jari-jari 7 cm. Berapakah luas daerah di tengah yang TIDAK tertutup oleh seperempat lingkaran tersebut? (Gunakan π = 22/7)',
    pilihan: {
      A: '42 cm²',
      B: '56 cm²',
      C: '84 cm²',
      D: '154 cm²'
    },
    kunciJawaban: 'A',
    pembahasan: '1. Luas Persegi ABCD:\nLuas = sisi × sisi = 14 cm × 14 cm = 196 cm².\n\n2. Luas 4 buah seperempat lingkaran:\n4 × (1/4 × π × r²) = 1 lingkaran penuh dengan r = 7 cm.\nLuas Lingkaran = π × r² = (22/7) × 7 × 7 = 154 cm².\n\n3. Luas daerah yang tidak tertutup (diarsir di tengah):\nLuas = Luas Persegi - Luas Lingkaran\nLuas = 196 cm² - 154 cm² = 42 cm².',
    tipsPenyelesaian: 'Ingat rumus instan daun/pusat persegi: Jika 4 seperempat lingkaran digabung, mereka membentuk tepat 1 lingkaran utuh!',
    konsep: ['Luas Persegi', 'Luas Lingkaran', 'Geometri Komposisi Bidang'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 4
  },
  {
    id: 'Q-GEO-002',
    materi: 'Geometri',
    submateri: 'Sudut Jarum Jam (Clock Angle)',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Pada pukul 03.40 WIB, berapakah besar sudut terkecil yang dibentuk oleh kedua jarum jam dinding di kelas MIN 1 Kotawaringin Timur?',
    pilihan: {
      A: '120°',
      B: '130°',
      C: '140°',
      D: '150°'
    },
    kunciJawaban: 'B',
    pembahasan: 'Gunakan pergerakan jarum:\n• Jarum menit menunjuk angka 8 (40 menit = 40 × 6° = 240° dari angka 12).\n• Jarum pendek (jam) pada pukul 3 lewat 40 menit:\n  Posisi jam 3 = 3 × 30° = 90°\n  Pergeseran menit = 40 × 0,5° = 20°\n  Total sudut jarum jam = 90° + 20° = 110°.\n\nBesar sudut antara kedua jarum:\n|240° - 110°| = 130°.\n(Karena 130° ≤ 180°, maka ini adalah sudut terkecilnya).',
    tipsPenyelesaian: 'Rumus Cepat Sudut Jam: Sudut = |30 × Jam - 5,5 × Menit| = |30(3) - 5,5(40)| = |90 - 220| = |-130| = 130°!',
    konsep: ['Sudut Jarum Jam', 'Kecepatan Sudut Menit & Jam'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 3
  },
  {
    id: 'Q-GEO-003',
    materi: 'Geometri',
    submateri: 'Volume Balok dan Kubus Satuan',
    tingkatKesulitan: 'Mudah',
    levelPenalaran: 'Level 1 – Fundamental',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Sebuah balok berukuran panjang 12 cm, lebar 8 cm, dan tinggi 6 cm akan diisi penuh dengan kubus-kubus kecil berukuran rusuk 2 cm. Berapa banyak kubus kecil yang dibutuhkan untuk mengisi balok tersebut sampai penuh?',
    pilihan: {
      A: '48 kubus',
      B: '72 kubus',
      C: '96 kubus',
      D: '144 kubus'
    },
    kunciJawaban: 'B',
    pembahasan: 'Cara Cepat membagi masing-masing dimensi:\n• Sepanjang panjang balok: 12 ÷ 2 = 6 kubus\n• Sepanjang lebar balok: 8 ÷ 2 = 4 kubus\n• Sepanjang tinggi balok: 6 ÷ 2 = 3 kubus\n\nTotal kubus kecil = 6 × 4 × 3 = 72 kubus.\n\n(Verifikasi Volume: Volume Balok = 12 × 8 × 6 = 576 cm³. Volume kubus = 2³ = 8 cm³. Jumlah = 576 ÷ 8 = 72).',
    tipsPenyelesaian: 'Bagi langsung panjang, lebar, dan tinggi balok dengan rusuk kubus, kemudian kalikan hasilnya (6 × 4 × 3 = 72).',
    konsep: ['Volume Bangun Ruang', 'Pengepakan Kubus Satuan'],
    waktuRekomendasiMenit: 1.5,
    bobotNilai: 2
  },

  // --- PENGUKURAN ---
  {
    id: 'Q-UKU-001',
    materi: 'Pengukuran',
    submateri: 'Kecepatan, Jarak, Waktu Berpapasan',
    tingkatKesulitan: 'Sulit',
    levelPenalaran: 'Level 3 – Advanced',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Jarak kota Sampit (Kotawaringin Timur) ke Palangka Raya adalah 220 km. Pak Witno berangkat dari Sampit menuju Palangka Raya mengendarai mobil dengan kecepatan rata-rata 60 km/jam pada pukul 07.00 WIB. Pada waktu yang sama, rekannya berangkat dari Palangka Raya menuju Sampit dengan kecepatan rata-rata 50 km/jam melalui jalur yang sama. Pukul berapakah mereka akan berpapasan di jalan?',
    pilihan: {
      A: '08.30 WIB',
      B: '09.00 WIB',
      C: '09.30 WIB',
      D: '10.00 WIB'
    },
    kunciJawaban: 'B',
    pembahasan: 'Waktu berpapasan (t) dengan waktu berangkat sama:\nt = Jarak Total ÷ (Kecepatan 1 + Kecepatan 2)\nt = 220 km ÷ (60 km/jam + 50 km/jam)\nt = 220 ÷ 110 = 2 jam.\n\nWaktu mereka berpapasan:\n07.00 + 2 jam = 09.00 WIB.',
    tipsPenyelesaian: 'Rumus Cepat Berpapasan (Berangkat Bersama): Waktu = Jarak Total ÷ Jumlah Kecepatan (V₁ + V₂). 220 / 110 = 2 jam. 07.00 + 2 jam = 09.00.',
    konsep: ['Kecepatan Rata-rata', 'Gerak Relatif Berpapasan'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 3
  },
  {
    id: 'Q-UKU-002',
    materi: 'Pengukuran',
    submateri: 'Debit Air dan Volume Bak Mandi',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Sebuah bak penampungan air berbentuk balok di tempat wudhu madrasah berukuran panjang 1,5 m, lebar 1 m, dan kedalaman 0,8 m. Bak tersebut dialiri air melalui pipa kran dengan debit 20 liter/menit. Jika bak awalnya kosong, berapa lama waktu yang diperlukan hingga bak terisi penuh?',
    pilihan: {
      A: '45 menit',
      B: '60 menit (1 jam)',
      C: '90 menit',
      D: '120 menit (2 jam)'
    },
    kunciJawaban: 'B',
    pembahasan: '1. Hitung Volume Bak Mandi:\nVolume = panjang × lebar × tinggi\nVolume = 1,5 m × 1 m × 0,8 m = 1,2 m³.\nIngat bahwa 1 m³ = 1.000 liter (dm³).\nVolume = 1,2 × 1.000 liter = 1.200 liter.\n\n2. Hitung Waktu Pengisian:\nWaktu = Volume ÷ Debit\nWaktu = 1.200 liter ÷ 20 liter/menit = 60 menit (1 jam).',
    tipsPenyelesaian: 'Pastikan konversi satuan tepat: 1 m³ = 1.000 dm³ = 1.000 liter. Lalu bagi volume dengan debit.',
    konsep: ['Debit Aliran Fluida', 'Konversi Satuan Volume m³ ke Liter'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 3
  },

  // --- DATA & STATISTIKA ---
  {
    id: 'Q-DAT-001',
    materi: 'Data & Statistika',
    submateri: 'Rata-rata Gabungan (Mean Arithmetic)',
    tingkatKesulitan: 'Sulit',
    levelPenalaran: 'Level 3 – Advanced',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Nilai rata-rata ulangan matematika 24 siswa kelas 6 MIN 1 Kotim adalah 80. Ketika nilai 6 siswa cadangan tim olimpiade digabungkan, nilai rata-ratanya naik menjadi 83. Berapakah nilai rata-rata dari ke-6 siswa cadangan olimpiade tersebut?',
    pilihan: {
      A: '89',
      B: '92',
      C: '95',
      D: '96'
    },
    kunciJawaban: 'C',
    pembahasan: '1. Total nilai awal 24 siswa:\nTotal Awal = 24 × 80 = 1.920.\n\n2. Total siswa setelah digabung: 24 + 6 = 30 siswa.\nTotal Nilai Baru = 30 × 83 = 2.490.\n\n3. Total nilai 6 siswa cadangan:\nSelisih = 2.490 - 1.920 = 570.\n\n4. Rata-rata 6 siswa cadangan:\nRata-rata = 570 ÷ 6 = 95.',
    tipsPenyelesaian: 'Trik Cepat Deviasi: Rata-rata baru = 83 (naik 3 poin untuk seluruh 30 siswa). Total poin kenaikan = 30 × 3 = 90 poin. Tambahkan 90 poin ini dibagi 6 siswa: 80 + (90 ÷ 6) = 80 + 15 = 95!',
    konsep: ['Mean / Rata-rata Gabungan', 'Statistika Numerik'],
    waktuRekomendasiMenit: 2.5,
    bobotNilai: 4
  },
  {
    id: 'Q-DAT-002',
    materi: 'Data & Statistika',
    submateri: 'Diagram Lingkaran dan Ekstrakurikuler',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Sebanyak 120 siswa kelas 6 mengikuti kegiatan ekstrakurikuler madrasah yang disajikan dalam diagram lingkaran: Futsal 30%, Pramuka 35%, Seni Hadrah 15%, dan sisanya mengikuti Klub Matematika Sains (KMS). Berapakah banyak siswa yang mengikuti Klub Matematika Sains?',
    pilihan: {
      A: '20 siswa',
      B: '24 siswa',
      C: '28 siswa',
      D: '30 siswa'
    },
    kunciJawaban: 'B',
    pembahasan: '1. Hitung persentase Klub Matematika Sains (KMS):\nPersentase KMS = 100% - (30% + 35% + 15%)\n= 100% - 80% = 20%.\n\n2. Hitung jumlah siswa KMS:\nJumlah = 20% × 120 siswa\n= 0,2 × 120 = 24 siswa.',
    tipsPenyelesaian: '20% itu setara dengan 1/5. Hitung 120 ÷ 5 = 24 siswa dengan cepat di kepala!',
    konsep: ['Diagram Lingkaran Persentase', 'Pecahan Bagian'],
    waktuRekomendasiMenit: 1.5,
    bobotNilai: 3
  },

  // --- PENALARAN & HOTS ---
  {
    id: 'Q-HOT-001',
    materi: 'Penalaran & HOTS',
    submateri: 'Prinsip Sarang Burung / Pigeonhole Principle',
    tingkatKesulitan: 'Olimpiade',
    levelPenalaran: 'Level 4 – Olympic Challenge',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Dalam sebuah kantong tertutup terdapat 12 kelereng merah, 15 kelereng biru, dan 18 kelereng hijau. Berapa paling sedikit kelereng yang harus diambil secara acak dalam keadaan mata tertutup agar kita PASTI mendapatkan minimal sepasang (2 buah) kelereng berwarna sama?',
    pilihan: {
      A: '2 kelereng',
      B: '4 kelereng',
      C: '16 kelereng',
      D: '31 kelereng'
    },
    kunciJawaban: 'B',
    pembahasan: 'Gunakan Prinsip Sarang Burung (Pigeonhole Principle) untuk kondisi terburuk (worst-case scenario):\nAda 3 jenis warna berbeda: Merah, Biru, dan Hijau (3 sarang burung).\n\nJika kita mengambil 3 kelereng, skenario terburuknya adalah masing-masing berwarna berbeda:\n• 1 kelereng merah\n• 1 kelereng biru\n• 1 kelereng hijau\n(Belum ada pasangan warna sama).\n\nMaka pada pengambilan ke-4, kelereng apapun yang terambil pasti berwarna Merah, Biru, atau Hijau, sehingga terbentuklah sekurang-kurangnya 1 pasang kelereng berwarna sama.\nJadi paling sedikit harus mengambil 3 + 1 = 4 kelereng.',
    tipsPenyelesaian: 'Kunci Soal "Pasti sepasang warna sama": Jumlah warna yang ada + 1. Di sini ada 3 warna, jadi 3 + 1 = 4 kelereng.',
    konsep: ['Pigeonhole Principle (PHP)', 'Kombinatorika Dasar', 'Worst-Case Reasoning'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 4
  },
  {
    id: 'Q-HOT-002',
    materi: 'Penalaran & HOTS',
    submateri: 'Logika Pembalikan (Working Backwards)',
    tingkatKesulitan: 'Sulit',
    levelPenalaran: 'Level 3 – Advanced',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Seorang pedagang kurma di pasar menjual setengah dari persediaan kurmanya ditambah 2 kg kepada pembeli pertama. Kepada pembeli kedua, ia menjual setengah dari sisa kurmanya ditambah 2 kg. Terakhir, ia menjual setengah dari sisa kurmanya ditambah 2 kg kepada pembeli ketiga, dan sekarang persediaan kurmanya habis tanpa sisa. Berapa kg persediaan kurma mula-mula?',
    pilihan: {
      A: '24 kg',
      B: '28 kg',
      C: '30 kg',
      D: '36 kg'
    },
    kunciJawaban: 'B',
    pembahasan: 'Gunakan metode bekerja mundur (Working Backwards):\n1. Kondisi akhir: 0 kg.\n• Sebelum pembeli ketiga: Pedagang menjual setengah sisa ditambah 2 kg sehingga sisa 0. Berarti 2 kg adalah setengah sisa terakhir.\n  Sisa sebelum pembeli 3 = (0 + 2) × 2 = 4 kg.\n\n2. Sebelum pembeli kedua:\n• Pedagang menjual setengah sisa ditambah 2 kg menyisakan 4 kg.\n  Sisa sebelum pembeli 2 = (4 + 2) × 2 = 6 × 2 = 12 kg.\n\n3. Persediaan mula-mula (sebelum pembeli pertama):\n• Pedagang menjual setengah awal ditambah 2 kg menyisakan 12 kg.\n  Persediaan awal = (12 + 2) × 2 = 14 × 2 = 28 kg.',
    tipsPenyelesaian: 'Metode Bekerja Mundur: Balik operasinya dari belakang! Tiap langkah: (Sisa + 2) × 2. Dari 0 → (0+2)×2 = 4 → (4+2)×2 = 12 → (12+2)×2 = 28 kg.',
    konsep: ['Strategi Bekerja Mundur', 'Aljabar Cerita HOTS'],
    waktuRekomendasiMenit: 3,
    bobotNilai: 4
  },
  {
    id: 'Q-HOT-003',
    materi: 'Penalaran & HOTS',
    submateri: 'Pola Jabat Tangan & Kombinatorika',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Dalam pembinaan tim olimpiade OMI di MIN 1 Kotawaringin Timur yang dihadiri oleh 10 siswa berprestasi, setiap siswa saling berjabat tangan satu sama lain tepat satu kali sebelum latihan dimulai. Berapa total jabat tangan yang terjadi seluruhnya?',
    pilihan: {
      A: '45 kali',
      B: '50 kali',
      C: '90 kali',
      D: '100 kali'
    },
    kunciJawaban: 'A',
    pembahasan: 'Setiap jabat tangan melibatkan 2 orang dari 10 orang siswa.\nRumus jabat tangan untuk n orang:\nJumlah = [n × (n - 1)] ÷ 2\n\nUntuk n = 10:\nJumlah = (10 × 9) ÷ 2 = 90 ÷ 2 = 45 kali jabat tangan.',
    tipsPenyelesaian: 'Rumus Cepat Jabat Tangan: n × (n - 1) ÷ 2. Jangan lupa dibagi 2 karena jabat tangan antara Siswa A dan Siswa B dihitung 1 kali saja.',
    konsep: ['Kombinasi nC2', 'Pola Bilangan Segitiga'],
    waktuRekomendasiMenit: 1.5,
    bobotNilai: 3
  },
  {
    id: 'Q-BIL-005',
    materi: 'Bilangan',
    submateri: 'Operasi Campuran Bilangan Bulat',
    tingkatKesulitan: 'Mudah',
    levelPenalaran: 'Level 1 – Fundamental',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Hasil dari perhitungan: (-18) + 45 ÷ (-9) - (-12) × 4 adalah ...',
    pilihan: {
      A: '25',
      B: '27',
      C: '32',
      D: '-71'
    },
    kunciJawaban: 'A',
    pembahasan: 'Aturan urutan operasi matematika (KABATAKU):\n1. Pembagian: 45 ÷ (-9) = -5\n2. Perkalian: (-12) × 4 = -48\n\nSubstitusikan kembali ke persamaan:\n= (-18) + (-5) - (-48)\n= -23 + 48\n= 25.',
    tipsPenyelesaian: 'Ingat prioritas operasi KABATAKU (Kali, Bagi, Tambah, Kurang). Dan perhatikan tanda minus kembar: - (-48) berubah menjadi + 48.',
    konsep: ['Bilangan Bulat Negatif', 'Hierarki Operasi Hitung (BODMAS)'],
    waktuRekomendasiMenit: 1.5,
    bobotNilai: 2
  },
  {
    id: 'Q-GEO-004',
    materi: 'Geometri',
    submateri: 'Keliling Bangun Gabungan',
    tingkatKesulitan: 'Sedang',
    levelPenalaran: 'Level 2 – Intermediate',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: 'Sebuah taman madrasah berbentuk gabungan persegi panjang berukuran 20 m × 14 m dengan setengah lingkaran yang menempel pada salah satu sisi lebarnya (lebar = diameter = 14 m). Berapakah keliling taman tersebut seluruhnya? (Gunakan π = 22/7)',
    pilihan: {
      A: '76 meter',
      B: '84 meter',
      C: '96 meter',
      D: '118 meter'
    },
    kunciJawaban: 'A',
    pembahasan: 'Keliling adalah panjang garis pembatas tepi luar taman:\n• 2 sisi panjang = 20 m + 20 m = 40 m\n• 1 sisi lebar (tanpa setengah lingkaran) = 14 m\n• Busur setengah lingkaran = 1/2 × π × d = 1/2 × (22/7) × 14 = 22 m\n\nPerhatikan bahwa sisi lebar yang menempel pada setengah lingkaran berada DI DALAM sehingga TIDAK dihitung keliling.\nTotal Keliling = 20 + 20 + 14 + 22 = 76 meter.',
    tipsPenyelesaian: 'Hati-hati: Keliling hanya menghitung garis luar terluar! Garis sambungan di dalam jangan pernah ikut dijumlahkan.',
    konsep: ['Keliling Bangun Datar Gabungan', 'Busur Lingkaran'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 3
  }
];

export const MATERIAL_TOPICS: MaterialTopic[] = [
  {
    id: 'mat-bilangan',
    kategori: 'Bilangan',
    judul: 'Operasi Bilangan, Pecahan & Pola Beruntun',
    ringkasan: 'Kuasai trik teleskopik, faktorisasi prima, KPK/FPB kilat, serta angka satuan berpangkat.',
    kontenLengkap: [
      '1. Trik Teleskopik: Pecahan yang saling meniadakan jika dijumlahkan atau dikalikan secara berurutan. Contoh: 1/(n×(n+1)) = 1/n - 1/(n+1).',
      '2. FPB & KPK Cepat: Gunakan metode tabel bagi bersama atau faktorisasi prima. Untuk soal pembagian paket bingkisan, selalu gunakan FPB.',
      '3. Siklus Satuan Berpangkat: Pangkat dari angka 2, 3, 7, 8 memiliki pola perulangan satuan setiap kelipatan 4. Bagi pangkat dengan 4 dan lihat sisanya.',
      '4. Operasi Pecahan Bertumpuk (Continued Fractions): Kerjakan selalu dari tingkat paling bawah menuju ke atas.'
    ],
    rumusPenting: [
      { nama: 'Teleskopik Pecahan', rumus: '1/(k(k+1)) = 1/k - 1/(k+1)', keterangan: 'Mengubah pecahan tunggal jadi selisih pecahan satuan' },
      { nama: 'Siklus Satuan Basis 7', rumus: '[7, 9, 3, 1]', keterangan: 'Berulang setiap 4 siklus eksponen' },
      { nama: 'Hubungan FPB & KPK', rumus: 'FPB(a,b) × KPK(a,b) = a × b', keterangan: 'Perkalian dua bilangan sama dengan hasil kali FPB & KPK-nya' }
    ],
    trikCepat: [
      'Jika mencari jumlah n bilangan asli pertama (1 + 2 + ... + n): Gunakan rumus n × (n + 1) ÷ 2.',
      'Perkalian bilangan kembar berakhiran 5: Misal 35 × 35 = (3 × 4) lalu tempel 25 = 1225.',
      'Membagi dengan 5: Cukup kalikan 2 lalu geser koma 1 angka ke kiri.'
    ],
    contohSoal: {
      tanya: 'Hitunglah 1 + 2 + 3 + ... + 99 + 100.',
      caraBiasa: 'Menjumlahkan satu per satu secara berurutan membutuhkan waktu sangat lama dan rentan salah.',
      trikOlimpiade: 'Pasangkan suku pertama dan suku terakhir: (1 + 100) = 101. Ada 50 pasang. Maka 50 × 101 = 5.050!'
    }
  },
  {
    id: 'mat-aljabar',
    kategori: 'Aljabar Dasar',
    judul: 'Pola Bilangan, Persamaan Linear & Variabel',
    ringkasan: 'Teknik substitusi cepat, eliminasi simetris, dan mencari rumus suku ke-n barisan.',
    kontenLengkap: [
      '1. Hubungan Antarbilangan: Menyatakan kondisi soal cerita ke dalam model persamaan aljabar sederhana seperti 2B + 3P = 21.000.',
      '2. Trik Koefisien Simetris: Jika koefisien dua persamaan bertukar posisi, jumlahkan atau kurangkan kedua persamaan sekaligus untuk memperoleh nilai x + y atau x - y.',
      '3. Pola Bilangan Bertingkat: Jika selisih pertama belum tetap, cari selisih tingkat dua. Bila selisih kedua konstan, suku ke-n memuat bentuk an² + bn + c.'
    ],
    rumusPenting: [
      { nama: 'Suku ke-n Aritmetika', rumus: 'Un = a + (n - 1)b', keterangan: 'a = suku pertama, b = beda tetap' },
      { nama: 'Barisan Kuadrat Sederhana', rumus: 'Un = n² + n + 1', keterangan: 'Sering muncul pada pola olimpiade MI' }
    ],
    trikCepat: [
      'Gunakan pemisalan huruf yang mewakili objek agar tidak bingung (contoh: B untuk buku, P untuk pulpen).',
      'Jika ditanya (x + y), carilah cara langsung menjumlahkan persamaan tanpa mencari nilai x dan y satu persatu.'
    ],
    contohSoal: {
      tanya: 'Jika a + b = 10 dan a - b = 4, berapakah nilai a × b?',
      caraBiasa: 'Cari a = 7, b = 3 dengan eliminasi lalu kalikan 7 × 3 = 21.',
      trikOlimpiade: 'Gunakan identitas aljabar: 4ab = (a+b)² - (a-b)² = 10² - 4² = 100 - 16 = 84 → ab = 84 / 4 = 21.'
    }
  },
  {
    id: 'mat-geometri',
    kategori: 'Geometri',
    judul: 'Bangun Datar, Bangun Ruang & Sudut Jarum Jam',
    ringkasan: 'Menghitung luas arsiran rumit, keliling bangun terpotong, dan rumus kilat sudut jam dinding.',
    kontenLengkap: [
      '1. Luas Daerah Arsiran: Prinsip Pengurangan Luas: Luas Arsiran = Luas Bidang Luar - Luas Bagian yang Tidak Diarsir.',
      '2. Sudut Jam: Setiap 1 jam, jarum pendek berputar 30°. Setiap 1 menit, jarum pendek bergeser 0,5° sedangkan jarum panjang berputar 6°.',
      '3. Bangun Ruang Kubus & Balok: Memahami jaring-jaring, luas permukaan, dan volume kubus satuan yang dapat ditampung.'
    ],
    rumusPenting: [
      { nama: 'Rumus Cepat Sudut Jam', rumus: 'θ = |30 × Jam - 5,5 × Menit|', keterangan: 'Menghasilkan besar sudut terkecil antara jarum jam dan jarum menit' },
      { nama: 'Luas Lingkaran', rumus: 'L = π × r²', keterangan: 'Gunakan π = 22/7 jika r kelipatan 7' },
      { nama: 'Luas Trapesium', rumus: 'L = 1/2 × (a + b) × t', keterangan: 'Jumlah sisi sejajar dikali tinggi dibagi dua' }
    ],
    trikCepat: [
      'Dua segitiga dengan alas yang sama dan berada di antara dua garis sejajar memiliki luas yang PERSIS sama.',
      'Jika sebuah persegi sisinya s memuat daun 2 tembereng, luas daunnya adalah 4/7 × s².'
    ],
    contohSoal: {
      tanya: 'Berapa besar sudut terkecil pada pukul 04.30?',
      caraBiasa: 'Menggambar jam manual lalu mengira-ngira posisi jarum jam di tengah angka 4 dan 5.',
      trikOlimpiade: 'Masukkan rumus instan: |30(4) - 5,5(30)| = |120 - 165| = |-45| = 45°.'
    }
  },
  {
    id: 'mat-pengukuran',
    kategori: 'Pengukuran',
    judul: 'Kecepatan, Jarak, Waktu & Debit Aliran',
    ringkasan: 'Kuasai permasalahan berpapasan, menyusul, konversi satuan tangga, dan debit kran.',
    kontenLengkap: [
      '1. Gerak Berpapasan (Berangkat Bersama): Waktu = Jarak Total ÷ (V₁ + V₂).',
      '2. Gerak Berpapasan (Waktu Beda): Cari dulu selisih jarak yang ditempuh orang pertama, lalu sisa jarak dibagi (V₁ + V₂).',
      '3. Gerak Menyusul: Waktu Menyusul = Selisih Jarak ÷ (V_pengejar - V_dikejar).',
      '4. Debit: Volume = Debit × Waktu. Pastikan satuan volume (dm³ = liter, m³ = 1000 liter) selaras dengan satuan waktu.'
    ],
    rumusPenting: [
      { nama: 'Berpapasan Bersama', rumus: 't = s ÷ (v₁ + v₂)', keterangan: 's = jarak total, v = kecepatan masing-masing' },
      { nama: 'Menyusul', rumus: 't = Δs ÷ (v₂ - v₁)', keterangan: 'Δs = selisih jarak awal' },
      { nama: 'Debit Air', rumus: 'Q = V ÷ t', keterangan: '1 m³ = 1.000 liter = 1.000 dm³' }
    ],
    trikCepat: [
      'Konversi km/jam ke m/detik: Kalikan dengan 5/18. Misal 72 km/jam = 72 × (5/18) = 20 m/detik.',
      'Konversi m/detik ke km/jam: Kalikan dengan 18/5. Misal 15 m/detik = 15 × (18/5) = 54 km/jam.'
    ],
    contohSoal: {
      tanya: 'Mobil A berkecepatan 70 km/jam dan Mobil B 50 km/jam berjarak 240 km dan saling mendekat. Kapan mereka bertemu?',
      caraBiasa: 'Membuat persamaan jarak s₁ + s₂ = 240 lalu mensubstitusi variabel waktu t.',
      trikOlimpiade: 't = 240 ÷ (70 + 50) = 240 ÷ 120 = 2 jam!'
    }
  },
  {
    id: 'mat-statistika',
    kategori: 'Data & Statistika',
    judul: 'Rata-rata Gabungan, Median, Modus & Diagram',
    ringkasan: 'Statistika numerasi tingkat lanjut, deviasi rata-rata cepat, dan interpretasi sudut diagram.',
    kontenLengkap: [
      '1. Rata-rata Gabungan (Weighted Mean): x̄_gab = (n₁·x̄₁ + n₂·x̄₂) ÷ (n₁ + n₂).',
      '2. Metode Deviasi: Menggunakan selisih nilai terhadap rata-rata sementara agar tidak perlu menghitung angka perkalian ribuan yang rumit.',
      '3. Median: Nilai tengah setelah data diurutkan dari yang terkecil.',
      '4. Diagram Lingkaran: 100% = 360°. Hubungan: 1% = 3,6°.'
    ],
    rumusPenting: [
      { nama: 'Rata-rata Gabungan', rumus: 'x̄_gab = (n₁·x̄₁ + n₂·x̄₂) ÷ (n₁ + n₂)', keterangan: 'n = jumlah data, x̄ = rata-rata kelompok' },
      { nama: 'Konversi Derajat ke Persen', rumus: '% = (Sudut ÷ 360°) × 100%', keterangan: 'Menghitung persentase dari juring lingkaran' }
    ],
    trikCepat: [
      'Jika seluruh data ditambah dengan angka yang sama (misal +5), maka nilai rata-ratanya juga ikut bertambah +5.',
      'Jika ada siswa baru yang membuat rata-rata naik, nilai siswa baru tersebut pasti lebih tinggi dari rata-rata lama.'
    ],
    contohSoal: {
      tanya: 'Rata-rata 9 anak adalah 75. Masuk 1 anak baru sehingga rata-rata menjadi 77. Berapa nilai anak baru?',
      caraBiasa: 'Hitung (10 × 77) - (9 × 75) = 770 - 675 = 95.',
      trikOlimpiade: 'Rata-rata baru 77. Kenaikan 2 poin disubsidi untuk 9 anak lama (9 × 2 = 18). Nilai anak baru = 77 + 18 = 95.'
    }
  },
  {
    id: 'mat-penalaran',
    kategori: 'Penalaran & HOTS',
    judul: 'Prinsip Sarang Merpati, Logika & Bekerja Mundur',
    ringkasan: 'Logika deduktif olimpiade, worst-case scenario, dan pemecahan masalah non-rutin.',
    kontenLengkap: [
      '1. Pigeonhole Principle (PHP): Jika ada n sarang dan ada n+1 burung, maka pasti ada minimal satu sarang yang ditempati 2 burung atau lebih.',
      '2. Strategi Bekerja Mundur (Working Backwards): Sangat efektif untuk soal bertahap di mana kondisi akhir diketahui dan kondisi awal ditanyakan.',
      '3. Prinsip Saling Membenci / Worst Case: Untuk memastikan sesuatu terjadi dalam pengambilan acak, asumsikan keberuntungan paling buruk terjadi terlebih dahulu.'
    ],
    rumusPenting: [
      { nama: 'Kombinasi Jabat Tangan', rumus: 'Jabat Tangan = n × (n - 1) ÷ 2', keterangan: 'n = jumlah peserta' },
      { nama: 'PHP Dasar', rumus: 'Minimal = Jumlah Objek + 1', keterangan: 'Untuk memastikan minimal 2 objek berada dalam kelompok yang sama' }
    ],
    trikCepat: [
      'Untuk soal eliminasi kebohongan: Carilah dua pernyataan yang saling kontradiksi (berlawanan), karena salah satunya pasti berbohong!',
      'Gunakan diagram pohon atau tabel kebenaran sederhana untuk memetakan opsi.'
    ],
    contohSoal: {
      tanya: 'Berapa orang minimal dalam satu ruangan agar pasti ada 2 orang yang berulang tahun di bulan yang sama?',
      caraBiasa: 'Menebak-nebak angka acak tanpa dasar kepastian.',
      trikOlimpiade: 'Jumlah bulan ada 12 (sarang). Untuk pasti ada 2 orang di bulan sama, butuh 12 + 1 = 13 orang!'
    }
  }
];
