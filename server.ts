import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY tidak ditemukan di environment server. Pastikan API key telah diatur.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Check Gemini API Key status
  app.get('/api/gemini/status', (_req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
    res.json({ hasKey });
  });

  // API Route: Generate Math Olympiad Questions
  app.post('/api/gemini/generate-soal', async (req, res) => {
    try {
      const {
        materi = 'Bilangan',
        submateri = '',
        tingkatKesulitan = 'Olimpiade',
        jumlah = 1,
        instruksiKhusus = '',
      } = req.body;

      const numQuestions = Math.min(Math.max(Number(jumlah) || 1, 1), 5);

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY belum dikonfigurasi.',
          message: 'Kunci Gemini API belum terdeteksi pada server. Silakan tambahkan GEMINI_API_KEY pada panel Settings > Secrets.',
        });
      }

      const ai = getGenAI();

      const userPrompt = `Buatlah ${numQuestions} butir soal matematika olimpiade baru untuk persiapan Olimpiade Madrasah Indonesia (OMI) 2026 tingkat Madrasah Ibtidaiyah (MI) / SD Kelas 5-6.
Spesifikasi Soal:
- Domain Utama: ${materi}
- Submateri/Fokus: ${submateri || 'Sesuai silabus standar OMI'}
- Tingkat Kesulitan: ${tingkatKesulitan}
- Format: Pilihan Ganda (4 opsi: A, B, C, D)
${instruksiKhusus ? `- Instruksi Tambahan: ${instruksiKhusus}` : ''}

Ketentuan Khusus Soal OMI:
1. Pertanyaan harus bertipe HOTS (Higher Order Thinking Skills), memicu penalaran logis, bukan sekadar hitungan mekanis.
2. Pilihan jawaban A, B, C, D harus masuk akal dengan angka yang rapi.
3. Kunci jawaban HARUS tepat dan salah satu dari 'A', 'B', 'C', atau 'D'.
4. Tuliskan pembahasan matematis langkah demi langkah yang runtut, terstruktur, dan mendalam.
5. Tuliskan 'tipsPenyelesaian' berupa trik cepat olimpiade, strategi jalan pintas, atau teknik penalaran yang efisien.
6. Sertakan array konsep yang diuji.
7. Pastikan bahasa Indonesia yang digunakan baku, santun, dan jelas.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction:
            'Anda adalah Tim Ahli Pembuat Soal Olimpiade Madrasah Indonesia (OMI / KSM / OSN Matematika MI/SD Kelas 5-6). Anda memiliki keahlian tinggi dalam merancang soal-soal matematika HOTS, trik pemecahan masalah cepat, dan pembahasan komprehensif berstandar nasional.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'Daftar butir soal matematika olimpiade yang dihasilkan',
            items: {
              type: Type.OBJECT,
              properties: {
                materi: {
                  type: Type.STRING,
                  description: 'Kategori materi: Bilangan, Aljabar Dasar, Geometri, Pengukuran, Data & Statistika, atau Penalaran & HOTS',
                },
                submateri: {
                  type: Type.STRING,
                  description: 'Submateri spesifik dari butir soal',
                },
                tingkatKesulitan: {
                  type: Type.STRING,
                  description: 'Mudah, Sedang, Sulit, atau Olimpiade',
                },
                levelPenalaran: {
                  type: Type.STRING,
                  description: 'Level 1 – Fundamental, Level 2 – Intermediate, Level 3 – Advanced, atau Level 4 – Olympic Challenge',
                },
                pertanyaan: {
                  type: Type.STRING,
                  description: 'Teks lengkap pertanyaan soal matematika',
                },
                pilihan: {
                  type: Type.OBJECT,
                  properties: {
                    A: { type: Type.STRING, description: 'Teks opsi A' },
                    B: { type: Type.STRING, description: 'Teks opsi B' },
                    C: { type: Type.STRING, description: 'Teks opsi C' },
                    D: { type: Type.STRING, description: 'Teks opsi D' },
                  },
                  required: ['A', 'B', 'C', 'D'],
                },
                kunciJawaban: {
                  type: Type.STRING,
                  description: 'Kunci jawaban benar (hanya A, B, C, atau D)',
                },
                pembahasan: {
                  type: Type.STRING,
                  description: 'Uraian langkah-langkah solusi matematis yang lengkap dan terstruktur',
                },
                tipsPenyelesaian: {
                  type: Type.STRING,
                  description: 'Trik cepat atau strategi jalan pintas khas kompetisi olimpiade',
                },
                konsep: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Daftar kata kunci konsep matematika yang diuji',
                },
                waktuRekomendasiMenit: {
                  type: Type.NUMBER,
                  description: 'Waktu pengerjaan yang disarankan dalam menit (antara 2 sampai 4)',
                },
                bobotNilai: {
                  type: Type.NUMBER,
                  description: 'Bobot nilai skor butir soal (misal 3 atau 4 atau 5)',
                },
                referensi: {
                  type: Type.STRING,
                  description: 'Label referensi soal',
                },
              },
              required: [
                'materi',
                'submateri',
                'tingkatKesulitan',
                'levelPenalaran',
                'pertanyaan',
                'pilihan',
                'kunciJawaban',
                'pembahasan',
                'tipsPenyelesaian',
                'konsep',
                'waktuRekomendasiMenit',
                'bobotNilai',
              ],
            },
          },
        },
      });

      const responseText = response.text ? response.text.trim() : '[]';
      let parsedQuestions = [];
      try {
        parsedQuestions = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse Gemini JSON output:', parseError, responseText);
        return res.status(500).json({
          error: 'Format JSON dari model AI tidak valid.',
          raw: responseText,
        });
      }

      // Add unique IDs and normalized values
      const timestamp = Date.now();
      const formatted = parsedQuestions.map((q: any, index: number) => ({
        id: `OMI-AI-${timestamp.toString().slice(-4)}${index + 1}`,
        materi: q.materi || materi,
        submateri: q.submateri || submateri || 'Olimpiade Mandiri',
        tingkatKesulitan: q.tingkatKesulitan || tingkatKesulitan,
        levelPenalaran:
          q.levelPenalaran ||
          (tingkatKesulitan === 'Olimpiade'
            ? 'Level 4 – Olympic Challenge'
            : tingkatKesulitan === 'Sulit'
            ? 'Level 3 – Advanced'
            : tingkatKesulitan === 'Sedang'
            ? 'Level 2 – Intermediate'
            : 'Level 1 – Fundamental'),
        jenisSoal: 'pilihan_ganda',
        pertanyaan: q.pertanyaan,
        pilihan: {
          A: String(q.pilihan?.A || ''),
          B: String(q.pilihan?.B || ''),
          C: String(q.pilihan?.C || ''),
          D: String(q.pilihan?.D || ''),
        },
        kunciJawaban: String(q.kunciJawaban || 'A').toUpperCase().trim().slice(0, 1),
        pembahasan: q.pembahasan || 'Pembahasan solusi matematis lengkap.',
        tipsPenyelesaian: q.tipsPenyelesaian || 'Gunakan penalaran eliminasi dan manipulasi aljabar cepat.',
        konsep: Array.isArray(q.konsep) && q.konsep.length > 0 ? q.konsep : [materi],
        waktuRekomendasiMenit: Number(q.waktuRekomendasiMenit) || 2,
        bobotNilai: Number(q.bobotNilai) || 4,
        referensi: q.referensi || `AI Generator OMI 2026 MIN 1 Kotim`,
        status: 'aktif',
      }));

      return res.json({
        success: true,
        count: formatted.length,
        questions: formatted,
      });
    } catch (error: any) {
      console.error('Gemini Generate Soal Error:', error);
      return res.status(500).json({
        error: error.message || 'Terjadi kesalahan saat menghubungi Gemini AI.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server berjalan pada port ${PORT}`);
  });
}

startServer();
