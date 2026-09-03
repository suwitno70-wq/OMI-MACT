import { Question, User, ExamResult, MathCategory, ActiveExamSession, LeaderboardEntry } from '../types';
import { INITIAL_QUESTIONS, INITIAL_USERS, BADGES_LIST } from '../data/initialData';

const STORAGE_KEYS = {
  USERS: 'math_omi_users_v1',
  CURRENT_USER_ID: 'math_omi_current_user_id',
  QUESTIONS: 'math_omi_questions_v1',
  RESULTS: 'math_omi_results_v1',
  ACTIVE_EXAM: 'math_omi_active_exam_v1',
  DAILY_CHALLENGE_DATE: 'math_omi_daily_date_v1',
  SETTINGS: 'math_omi_settings_v1'
};

// Initialize default data if empty
export function initLocalStorage(): void {
  try {
    const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!rawUsers || rawUsers === 'null' || rawUsers === 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, INITIAL_USERS[0].id);
    }
    const rawQuestions = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!rawQuestions || rawQuestions === 'null' || rawQuestions === 'undefined') {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
      // Seed an initial result for realistic leaderboard
      const sampleResult: ExamResult = {
        id: 'res-sample-1',
        userId: 'u-siswa-1',
        studentName: 'Muhammad Alif Rahmatullah',
        kelas: '6A',
        judulLatihan: 'Simulasi OMI 2026 - Paket Mandiri 1',
        mode: 'simulasi',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        totalSoal: 10,
        benar: 9,
        salah: 1,
        kosong: 0,
        skor: 90,
        akurasi: 90,
        durasiDetik: 1250,
        kategoriPredikat: 'Sangat Baik',
        xpEarned: 180,
        kategoriBreakdown: {
          'Bilangan': { total: 3, benar: 3, persentase: 100 },
          'Aljabar Dasar': { total: 2, benar: 2, persentase: 100 },
          'Geometri': { total: 2, benar: 2, persentase: 100 },
          'Pengukuran': { total: 1, benar: 1, persentase: 100 },
          'Data & Statistika': { total: 1, benar: 1, persentase: 100 },
          'Penalaran & HOTS': { total: 1, benar: 0, persentase: 0 }
        },
        rekomendasiMateri: [
          'Perkuat kembali pemahaman konsep Pigeonhole Principle (Prinsip Sarang Burung) pada kategori Penalaran & HOTS.'
        ],
        userAnswers: {},
        questionsSnapshot: []
      };
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([sampleResult]));
    }
  } catch (e) {
    console.warn('Storage initialization error:', e);
  }
}

// Auto-run initialization if in browser context
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  try {
    initLocalStorage();
  } catch {
    // ignore in non-browser
  }
}

// User Management
export function getAllUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(u => ({
        ...u,
        unlockedBadges: Array.isArray(u.unlockedBadges) ? u.unlockedBadges : []
      }));
    }
    return INITIAL_USERS;
  } catch {
    return INITIAL_USERS;
  }
}

export function saveAllUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getCurrentUser(): User {
  const users = getAllUsers();
  const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  const found = users.find(u => u.id === currentId);
  return found || users[0] || INITIAL_USERS[0];
}

export function setCurrentUserId(userId: string): void {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
}

export function setCurrentUser(user: User): void {
  setCurrentUserId(user.id);
  updateUser(user);
}

export function saveUser(user: User): void {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
  } else {
    users.push(user);
  }
  saveAllUsers(users);
}

export function updateUser(updatedUser: User): void {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveAllUsers(users);
  }
}

// Questions Management
export function getAllQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_QUESTIONS;
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveAllQuestions(questions: Question[]): void {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
}

export function saveQuestion(question: Question): void {
  const list = getAllQuestions();
  const index = list.findIndex(q => q.id === question.id);
  if (index !== -1) {
    list[index] = question;
  } else {
    list.unshift(question);
  }
  saveAllQuestions(list);
}

export function addQuestion(question: Question): void {
  const list = getAllQuestions();
  list.unshift(question);
  saveAllQuestions(list);
}

export function updateQuestion(question: Question): void {
  const list = getAllQuestions();
  const index = list.findIndex(q => q.id === question.id);
  if (index !== -1) {
    list[index] = question;
    saveAllQuestions(list);
  }
}

export function deleteQuestion(questionId: string): void {
  const list = getAllQuestions().filter(q => q.id !== questionId);
  saveAllQuestions(list);
}

export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
  localStorage.removeItem(STORAGE_KEYS.RESULTS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
  initLocalStorage();
}

// Results Management
export function getAllResults(): ExamResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESULTS);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResult(result: ExamResult): void {
  const results = getAllResults();
  results.unshift(result);
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));

  // Update user stats and badges
  const user = getCurrentUser();
  if (user && user.id === result.userId) {
    const newXP = (user.xp || 0) + (result.xpEarned || 0);
    const newTotalLatihan = (user.totalLatihan || 0) + 1;
    const newSoalDijawab = (user.soalDijawab || 0) + (result.totalSoal || 0);
    const newJawabanBenar = (user.jawabanBenar || 0) + (result.benar || 0);
    const newSkorTertinggi = Math.max(user.skorTertinggi || 0, result.skor || 0);

    // Check newly unlocked badges
    const currentBadges = new Set(user.unlockedBadges || []);
    currentBadges.add('badge-pemula');

    if (result.skor >= 90) {
      currentBadges.add('badge-champion');
    }
    if (result.mode === 'simulasi') {
      currentBadges.add('badge-pejuang');
    }
    const breakdown = result.kategoriBreakdown || {};
    if (breakdown['Bilangan']?.persentase >= 85) {
      currentBadges.add('badge-bilangan');
    }
    if (breakdown['Geometri']?.persentase >= 85) {
      currentBadges.add('badge-geometri');
    }
    if (newXP >= 5000) {
      currentBadges.add('badge-master');
    }

    const updatedUser: User = {
      ...user,
      xp: newXP,
      totalLatihan: newTotalLatihan,
      soalDijawab: newSoalDijawab,
      jawabanBenar: newJawabanBenar,
      skorTertinggi: newSkorTertinggi,
      unlockedBadges: Array.from(currentBadges),
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    updateUser(updatedUser);
  }
}

// Active Exam Persistence (Safe Against Refresh)
export function getActiveExam(): ActiveExamSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveActiveExam(session: ActiveExamSession | null): void {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
  } else {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(session));
  }
}

// Leaderboard calculation
export function getLeaderboard(): LeaderboardEntry[] {
  const users = (getAllUsers() || []).filter(u => u && u.role === 'siswa');
  const sorted = [...users].sort((a, b) => {
    if ((b.xp || 0) !== (a.xp || 0)) return (b.xp || 0) - (a.xp || 0);
    return (b.skorTertinggi || 0) - (a.skorTertinggi || 0);
  });

  return sorted.map((u, idx) => ({
    rank: idx + 1,
    userId: u.id,
    nama: u.nama,
    kelas: u.kelas || 'VI',
    skor: u.skorTertinggi || 0,
    xp: u.xp || 0,
    latihanSelesai: u.totalLatihan || 0,
    badgeCount: (u.unlockedBadges || []).length,
    avatar: u.avatar || '🎓'
  }));
}

// Random Question Generator (Anti-duplicate, respects category & count)
export function getRandomQuestions(options: {
  count: number;
  category?: MathCategory | 'Semua Materi';
  shuffleOptions?: boolean;
}): Question[] {
  const all = getAllQuestions();
  let pool = options.category && options.category !== 'Semua Materi'
    ? all.filter(q => q.materi === options.category)
    : [...all];

  if (pool.length === 0) pool = [...all];

  // Fisher-Yates shuffle questions
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected = shuffled.slice(0, Math.min(options.count, shuffled.length));

  // If shuffleOptions is requested, clone and shuffle choices while mapping the correct answer
  if (options.shuffleOptions) {
    return selected.map(q => {
      const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      const originalCorrectKey = q.kunciJawaban as 'A' | 'B' | 'C' | 'D';
      const originalCorrectText = q.pilihan[originalCorrectKey];

      // Shuffle keys
      const shuffledKeys = [...optionKeys].sort(() => Math.random() - 0.5);
      const newPilihan: Record<'A' | 'B' | 'C' | 'D', string> = {
        A: q.pilihan[shuffledKeys[0]],
        B: q.pilihan[shuffledKeys[1]],
        C: q.pilihan[shuffledKeys[2]],
        D: q.pilihan[shuffledKeys[3]]
      };

      // Find where original correct text landed
      let newCorrectKey = 'A';
      for (const k of optionKeys) {
        if (newPilihan[k] === originalCorrectText) {
          newCorrectKey = k;
          break;
        }
      }

      return {
        ...q,
        pilihan: newPilihan,
        kunciJawaban: newCorrectKey
      };
    });
  }

  return selected;
}

// Evaluation Engine
export function evaluateExam(
  questions: Question[],
  userAnswers: Record<string, string>,
  durasiDetik: number,
  mode: 'latihan' | 'simulasi' | 'tantangan',
  judulLatihan: string
): ExamResult {
  const user = getCurrentUser();
  let benarCount = 0;
  let salahCount = 0;
  let kosongCount = 0;

  const categories: MathCategory[] = [
    'Bilangan',
    'Aljabar Dasar',
    'Geometri',
    'Pengukuran',
    'Data & Statistika',
    'Penalaran & HOTS'
  ];

  const breakdown: Record<MathCategory, { total: number; benar: number; persentase: number }> = {
    'Bilangan': { total: 0, benar: 0, persentase: 100 },
    'Aljabar Dasar': { total: 0, benar: 0, persentase: 100 },
    'Geometri': { total: 0, benar: 0, persentase: 100 },
    'Pengukuran': { total: 0, benar: 0, persentase: 100 },
    'Data & Statistika': { total: 0, benar: 0, persentase: 100 },
    'Penalaran & HOTS': { total: 0, benar: 0, persentase: 100 }
  };

  questions.forEach(q => {
    if (!breakdown[q.materi]) {
      breakdown[q.materi] = { total: 0, benar: 0, persentase: 0 };
    }
    breakdown[q.materi].total += 1;

    const ans = userAnswers[q.id];
    if (!ans) {
      kosongCount++;
    } else if (ans === q.kunciJawaban) {
      benarCount++;
      breakdown[q.materi].benar += 1;
    } else {
      salahCount++;
    }
  });

  // Calculate percentages
  categories.forEach(cat => {
    if (breakdown[cat] && breakdown[cat].total > 0) {
      breakdown[cat].persentase = Math.round((breakdown[cat].benar / breakdown[cat].total) * 100);
    }
  });

  const total = questions.length || 1;
  const skor = Math.round((benarCount / total) * 100);
  const akurasi = Math.round((benarCount / (benarCount + salahCount || 1)) * 100);

  let predikat: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Latihan' = 'Perlu Latihan';
  if (skor >= 90) predikat = 'Sangat Baik';
  else if (skor >= 80) predikat = 'Baik';
  else if (skor >= 70) predikat = 'Cukup';

  // XP calculation
  const baseXP = benarCount * 15;
  const bonusCompletion = mode === 'simulasi' ? 50 : 20;
  const bonusPerfect = skor === 100 ? 50 : 0;
  const totalXP = baseXP + bonusCompletion + bonusPerfect;

  // Automated smart recommendations
  const weakCategories = categories
    .filter(cat => breakdown[cat].total > 0 && breakdown[cat].persentase < 75)
    .sort((a, b) => breakdown[a].persentase - breakdown[b].persentase);

  const rekomendasiMateri: string[] = [];
  if (weakCategories.length > 0) {
    rekomendasiMateri.push(
      `Prioritas belajar: Fokuskan latihan intensif pada domain ${weakCategories.slice(0, 2).join(' & ')}.`
    );
    weakCategories.forEach(cat => {
      if (cat === 'Penalaran & HOTS') {
        rekomendasiMateri.push('Tingkatkan ketelitian pada soal Pigeonhole Principle dan metode eliminasi bekerja mundur.');
      } else if (cat === 'Geometri') {
        rekomendasiMateri.push('Pelajari kembali luas gabungan daerah berarsir dan rumus cepat sudut jarum jam.');
      } else if (cat === 'Pengukuran') {
        rekomendasiMateri.push('Perhatikan konversi satuan volume m³ ke liter dan gerak berpapasan dua kendaraan.');
      } else if (cat === 'Bilangan') {
        rekomendasiMateri.push('Latih kembali perkalian pecahan beruntun (teleskopik) dan siklus digit satuan.');
      } else if (cat === 'Aljabar Dasar') {
        rekomendasiMateri.push('Perbanyak latihan menentukan suku ke-n barisan bilangan bertingkat kuadrat.');
      } else if (cat === 'Data & Statistika') {
        rekomendasiMateri.push('Gunakan metode deviasi untuk menghitung rata-rata gabungan dengan cepat.');
      }
    });
  } else {
    rekomendasiMateri.push('Luar biasa! Pemahaman semua konsep sudah sangat merata dan siap menghadapi OMI 2026!');
  }

  return {
    id: 'res-' + Date.now(),
    userId: user.id,
    studentName: user.nama,
    kelas: user.kelas || '6A',
    judulLatihan,
    mode,
    timestamp: new Date().toISOString(),
    totalSoal: total,
    benar: benarCount,
    salah: salahCount,
    kosong: kosongCount,
    skor,
    akurasi,
    durasiDetik,
    kategoriPredikat: predikat,
    xpEarned: totalXP,
    kategoriBreakdown: breakdown,
    rekomendasiMateri,
    userAnswers,
    questionsSnapshot: questions
  };
}

// CSV / Spreadsheet Exporter & Importer
export function exportQuestionsToCSV(): string {
  const questions = getAllQuestions();
  const headers = ['ID', 'Materi', 'Submateri', 'TingkatKesulitan', 'LevelPenalaran', 'Pertanyaan', 'PilihanA', 'PilihanB', 'PilihanC', 'PilihanD', 'KunciJawaban', 'Pembahasan', 'Tips'];
  const rows = questions.map(q => [
    q.id,
    q.materi,
    q.submateri,
    q.tingkatKesulitan,
    q.levelPenalaran,
    `"${q.pertanyaan.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${q.pilihan.A.replace(/"/g, '""')}"`,
    `"${q.pilihan.B.replace(/"/g, '""')}"`,
    `"${q.pilihan.C.replace(/"/g, '""')}"`,
    `"${q.pilihan.D.replace(/"/g, '""')}"`,
    q.kunciJawaban,
    `"${q.pembahasan.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${q.tipsPenyelesaian.replace(/"/g, '""').replace(/\n/g, ' ')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function exportResultsToCSV(): string {
  const results = getAllResults();
  const headers = ['ID', 'NamaSiswa', 'Kelas', 'Latihan', 'Tanggal', 'Skor', 'Benar', 'Salah', 'Akurasi', 'DurasiMenit'];
  const rows = results.map(r => [
    r.id,
    `"${r.studentName}"`,
    r.kelas,
    `"${r.judulLatihan}"`,
    new Date(r.timestamp).toLocaleDateString('id-ID'),
    r.skor,
    r.benar,
    r.salah,
    `${r.akurasi}%`,
    Math.round(r.durasiDetik / 60)
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
