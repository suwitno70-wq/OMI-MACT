export type UserRole = 'siswa' | 'guru' | 'admin';

export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sulit' | 'Olimpiade';
export type QuestionDifficulty = DifficultyLevel;

export type QuestionType = 'pilihan_ganda' | 'pilihan_ganda_kompleks' | 'benar_salah' | 'isian_singkat';

export type MathCategory = 
  | 'Bilangan'
  | 'Aljabar Dasar'
  | 'Geometri'
  | 'Pengukuran'
  | 'Data & Statistika'
  | 'Penalaran & HOTS';

export interface User {
  id: string;
  username: string;
  nama: string;
  role: UserRole;
  kelas?: string;
  nis?: string;
  avatar?: string;
  xp: number;
  skorTertinggi: number;
  totalLatihan: number;
  soalDijawab: number;
  jawabanBenar: number;
  streakDays: number;
  lastActiveDate: string;
  unlockedBadges: string[];
}

export interface Question {
  id: string;
  materi: MathCategory;
  submateri: string;
  tingkatKesulitan: DifficultyLevel;
  levelPenalaran: 'Level 1 – Fundamental' | 'Level 2 – Intermediate' | 'Level 3 – Advanced' | 'Level 4 – Olympic Challenge';
  jenisSoal: QuestionType;
  pertanyaan: string;
  pilihan: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  kunciJawaban: string | string[]; // 'A' or ['A', 'C'] or 'Benar'
  pembahasan: string;
  tipsPenyelesaian: string;
  konsep: string[];
  waktuRekomendasiMenit: number;
  bobotNilai: number;
  status?: 'aktif' | 'nonaktif';
  referensi?: string;
}

export interface MaterialTopic {
  id: string;
  kategori: MathCategory;
  judul: string;
  ringkasan: string;
  kontenLengkap: string[];
  rumusPenting: { nama: string; rumus: string; keterangan: string }[];
  trikCepat: string[];
  contohSoal: {
    tanya: string;
    caraBiasa: string;
    trikOlimpiade: string;
  };
}

export interface ActiveExamSession {
  id: string;
  judul: string;
  mode: 'latihan' | 'simulasi' | 'tantangan';
  materi?: MathCategory | 'Semua Materi';
  questions: Question[];
  userAnswers: Record<string, string>; // questionId -> answer
  raguStatus: Record<string, boolean>; // questionId -> boolean
  currentIndex: number;
  totalTimeSeconds: number;
  remainingSeconds: number;
  startTime: number;
  isFinished: boolean;
}

export interface ExamResult {
  id: string;
  userId: string;
  studentName: string;
  kelas: string;
  judulLatihan: string;
  mode: 'latihan' | 'simulasi' | 'tantangan';
  timestamp: string;
  totalSoal: number;
  benar: number;
  salah: number;
  kosong: number;
  skor: number; // 0 - 100
  akurasi: number; // percentage
  durasiDetik: number;
  kategoriPredikat: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Latihan';
  xpEarned: number;
  kategoriBreakdown: Record<MathCategory, { total: number; benar: number; persentase: number }>;
  rekomendasiMateri: string[];
  userAnswers: Record<string, string>;
  questionsSnapshot: Question[];
}

export interface Badge {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  syarat: string;
  kategori: 'skor' | 'streak' | 'kuantitas' | 'spesial';
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  nama: string;
  kelas: string;
  skor: number;
  xp: number;
  latihanSelesai: number;
  badgeCount: number;
  avatar: string;
}
