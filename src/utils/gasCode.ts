/**
 * Google Apps Script (GAS) Backend Code Generator
 * Compatible with Google Sheets as Database for MATH OMI 2026 MIN 1 KOTAWARINGIN TIMUR
 * Disusun By Witno
 */

export const GAS_CODE_GS = `/**
 * ====================================================================
 * MATH OMI 2026 - MIN 1 KOTAWARINGIN TIMUR
 * Disusun By: Witno
 * Platform Pembelajaran & Latihan Matematika Interaktif
 * Backend Google Apps Script (Code.gs) & Google Sheets Database
 * ====================================================================
 */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// Web App Entry Point
function doGet(e) {
  const page = (e && e.parameter && e.parameter.page) ? e.parameter.page : 'index';
  const template = HtmlService.createTemplateFromFile(page);
  template.appData = {
    appName: "MATH OMI 2026",
    school: "MIN 1 KOTAWARINGIN TIMUR",
    author: "Witno",
    year: "2026"
  };
  return template.evaluate()
    .setTitle("MATH OMI 2026 - MIN 1 Kotawaringin Timur")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* ====================================================================
   DATABASE HELPER FUNCTIONS (GOOGLE SHEETS)
   ==================================================================== */
function getSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    setupSheetHeader(sheet, sheetName);
  }
  return sheet;
}

function setupSheetHeader(sheet, sheetName) {
  const headers = {
    'USERS': ['ID', 'Username', 'Password', 'Nama', 'Role', 'Kelas', 'Status', 'XP', 'SkorTertinggi'],
    'SISWA': ['ID_Siswa', 'Nama', 'NIS', 'Kelas', 'Status'],
    'GURU': ['ID_Guru', 'Nama', 'Username', 'Status'],
    'MATERI': ['ID', 'Materi', 'Submateri', 'Deskripsi', 'Level'],
    'SOAL': ['ID', 'Materi', 'Submateri', 'Level', 'Pertanyaan', 'A', 'B', 'C', 'D', 'Kunci', 'Pembahasan', 'Tips', 'Bobot'],
    'LATIHAN': ['ID', 'Nama_Latihan', 'Materi', 'Jumlah_Soal', 'Durasi', 'Level'],
    'HASIL': ['ID', 'Timestamp', 'Siswa', 'Kelas', 'Latihan', 'Benar', 'Salah', 'Skor', 'Akurasi', 'Durasi'],
    'RANKING': ['Siswa', 'Kelas', 'XP', 'Skor', 'Ranking']
  };
  if (headers[sheetName]) {
    sheet.appendRow(headers[sheetName]);
    sheet.getRange(1, 1, 1, headers[sheetName].length).setFontWeight("bold").setBackground("#065f46").setFontColor("#ffffff");
  }
}

/* ====================================================================
   API ENDPOINTS MATCHING SPECIFICATIONS
   ==================================================================== */

// 1. loginUser(username, password)
function loginUser(username, password) {
  try {
    const sheet = getSheet('USERS');
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === username && data[i][2] === password) {
        return {
          success: true,
          user: {
            id: data[i][0],
            username: data[i][1],
            nama: data[i][3],
            role: data[i][4],
            kelas: data[i][5],
            xp: data[i][7] || 0,
            skorTertinggi: data[i][8] || 0
          }
        };
      }
    }
    return { success: false, message: "Username atau password salah!" };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

// 2. getUserData(userId)
function getUserData(userId) {
  const sheet = getSheet('USERS');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userId) {
      return {
        id: data[i][0],
        username: data[i][1],
        nama: data[i][3],
        role: data[i][4],
        kelas: data[i][5],
        xp: data[i][7] || 0
      };
    }
  }
  return null;
}

// 3. getMateri()
function getMateri() {
  const sheet = getSheet('MATERI');
  const data = sheet.getDataRange().getValues();
  const list = [];
  for (let i = 1; i < data.length; i++) {
    list.push({
      id: data[i][0],
      materi: data[i][1],
      submateri: data[i][2],
      deskripsi: data[i][3],
      level: data[i][4]
    });
  }
  return list;
}

// 4. getSoal(filterCategory)
function getSoal(filterCategory) {
  const sheet = getSheet('SOAL');
  const data = sheet.getDataRange().getValues();
  const questions = [];
  for (let i = 1; i < data.length; i++) {
    if (!filterCategory || filterCategory === 'Semua' || data[i][1] === filterCategory) {
      questions.push({
        id: data[i][0],
        materi: data[i][1],
        submateri: data[i][2],
        level: data[i][3],
        pertanyaan: data[i][4],
        pilihan: { A: data[i][5], B: data[i][6], C: data[i][7], D: data[i][8] },
        kunciJawaban: data[i][9],
        pembahasan: data[i][10],
        tips: data[i][11],
        bobot: data[i][12]
      });
    }
  }
  return questions;
}

// 5. getRandomQuestions(count, category)
function getRandomQuestions(count, category) {
  const all = getSoal(category);
  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, Math.min(count, all.length));
}

// 6. submitExercise(payload)
function submitExercise(payload) {
  const sheet = getSheet('HASIL');
  const id = "RES-" + new Date().getTime();
  const timestamp = new Date().toISOString();
  
  sheet.appendRow([
    id,
    timestamp,
    payload.siswa,
    payload.kelas,
    payload.latihan,
    payload.benar,
    payload.salah,
    payload.skor,
    payload.akurasi,
    payload.durasi
  ]);

  // Update XP in USERS sheet
  updateUserXP(payload.siswaId, payload.xpEarned || 50, payload.skor);

  return { success: true, id: id, skor: payload.skor };
}

function updateUserXP(siswaId, addXp, newScore) {
  const sheet = getSheet('USERS');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === siswaId) {
      const currentXP = Number(data[i][7] || 0);
      const currentHighest = Number(data[i][8] || 0);
      sheet.getRange(i + 1, 8).setValue(currentXP + addXp);
      sheet.getRange(i + 1, 9).setValue(Math.max(currentHighest, newScore));
      break;
    }
  }
}

// 7. getResult(resultId)
function getResult(resultId) {
  const sheet = getSheet('HASIL');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === resultId) {
      return {
        id: data[i][0],
        timestamp: data[i][1],
        siswa: data[i][2],
        kelas: data[i][3],
        latihan: data[i][4],
        benar: data[i][5],
        salah: data[i][6],
        skor: data[i][7],
        akurasi: data[i][8],
        durasi: data[i][9]
      };
    }
  }
  return null;
}

// 8. getRanking()
function getRanking() {
  const sheet = getSheet('USERS');
  const data = sheet.getDataRange().getValues();
  const list = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === 'siswa') {
      list.push({
        id: data[i][0],
        nama: data[i][3],
        kelas: data[i][5],
        xp: Number(data[i][7] || 0),
        skor: Number(data[i][8] || 0)
      });
    }
  }
  list.sort((a, b) => b.xp - a.xp);
  return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
}

// 9. getDashboard()
function getDashboard(userId) {
  return {
    userInfo: getUserData(userId),
    ranking: getRanking().slice(0, 5),
    totalSoal: getSheet('SOAL').getLastRow() - 1
  };
}

// 10. addQuestion(q)
function addQuestion(q) {
  const sheet = getSheet('SOAL');
  const newId = q.id || 'Q-' + Utilities.getUuid().slice(0, 8).toUpperCase();
  sheet.appendRow([
    newId,
    q.materi,
    q.submateri,
    q.level,
    q.pertanyaan,
    q.pilihan.A,
    q.pilihan.B,
    q.pilihan.C,
    q.pilihan.D,
    q.kunciJawaban,
    q.pembahasan,
    q.tips,
    q.bobot || 3
  ]);
  return { success: true, id: newId };
}

// 11. updateQuestion(q)
function updateQuestion(q) {
  const sheet = getSheet('SOAL');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === q.id) {
      sheet.getRange(i + 1, 1, 1, 13).setValues([[
        q.id, q.materi, q.submateri, q.level, q.pertanyaan,
        q.pilihan.A, q.pilihan.B, q.pilihan.C, q.pilihan.D,
        q.kunciJawaban, q.pembahasan, q.tips, q.bobot
      ]]);
      return { success: true };
    }
  }
  return { success: false, message: "ID soal tidak ditemukan" };
}

// 12. deleteQuestion(questionId)
function deleteQuestion(questionId) {
  const sheet = getSheet('SOAL');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === questionId) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, message: "ID tidak ditemukan" };
}

// 13. addUser(user)
function addUser(user) {
  const sheet = getSheet('USERS');
  const newId = user.id || 'U-' + Utilities.getUuid().slice(0, 6).toUpperCase();
  sheet.appendRow([
    newId,
    user.username,
    user.password || '123456',
    user.nama,
    user.role,
    user.kelas || 'VI',
    'Aktif',
    0,
    0
  ]);
  return { success: true, id: newId };
}

// 14. updateUser(user)
function updateUser(user) {
  const sheet = getSheet('USERS');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === user.id) {
      sheet.getRange(i + 1, 2).setValue(user.username);
      sheet.getRange(i + 1, 4).setValue(user.nama);
      sheet.getRange(i + 1, 5).setValue(user.role);
      sheet.getRange(i + 1, 6).setValue(user.kelas);
      return { success: true };
    }
  }
  return { success: false };
}

// 15. deleteUser(userId)
function deleteUser(userId) {
  const sheet = getSheet('USERS');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userId) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false };
}

// 16. getStudentAnalytics()
function getStudentAnalytics() {
  const hasilSheet = getSheet('HASIL');
  const data = hasilSheet.getDataRange().getValues();
  let totalScore = 0;
  let count = 0;
  let highest = 0;
  let lowest = 100;
  
  for (let i = 1; i < data.length; i++) {
    const s = Number(data[i][7]);
    if (!isNaN(s)) {
      totalScore += s;
      count++;
      if (s > highest) highest = s;
      if (s < lowest) lowest = s;
    }
  }
  
  return {
    totalPengerjaan: count,
    rataRataNilai: count > 0 ? Math.round(totalScore / count) : 0,
    nilaiTertinggi: count > 0 ? highest : 0,
    nilaiTerendah: count > 0 ? lowest : 0
  };
}

// 17. exportReport()
function exportReport() {
  const data = getSheet('HASIL').getDataRange().getValues();
  return JSON.stringify(data);
}
`;

export const GOOGLE_APPS_SCRIPT_CODE = GAS_CODE_GS;

export const APPSSCRIPT_JSON = `{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "webapp": {
    "access": "ANYONE_ANONYMOUS",
    "executeAs": "USER_DEPLOYING"
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}`;
