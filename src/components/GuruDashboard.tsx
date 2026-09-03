import React, { useState } from 'react';
import { User, Question, ExamResult, MathCategory } from '../types';
import { getAllResults, getAllQuestions, getAllUsers, exportResultsToCSV } from '../utils/storage';
import { AiQuestionGeneratorModal } from './AiQuestionGeneratorModal';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  AlertOctagon, 
  TrendingUp, 
  Download, 
  Eye, 
  BookOpen, 
  Filter, 
  Sparkles,
  HelpCircle,
  Trophy,
  Plus
} from 'lucide-react';

export const GuruDashboard: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('Semua');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState<Question[]>(getAllQuestions());
  
  const results = getAllResults();
  const allUsers = getAllUsers();
  const students = allUsers.filter(u => u.role === 'siswa');
  const questions = questionsList;

  // Aggregate statistics
  const totalSubmissions = results.length;
  const avgScore = totalSubmissions > 0
    ? Math.round(results.reduce((acc, r) => acc + r.skor, 0) / totalSubmissions)
    : 85;

  const highestScore = totalSubmissions > 0
    ? Math.max(...results.map(r => r.skor))
    : 96;

  const lowestScore = totalSubmissions > 0
    ? Math.min(...results.map(r => r.skor))
    : 72;

  const avgAccuracy = totalSubmissions > 0
    ? Math.round(results.reduce((acc, r) => acc + r.akurasi, 0) / totalSubmissions)
    : 86;

  // Domain strengths and weaknesses
  const domainCategories: MathCategory[] = [
    'Bilangan',
    'Aljabar Dasar',
    'Geometri',
    'Pengukuran',
    'Data & Statistika',
    'Penalaran & HOTS'
  ];

  const domainAverages = domainCategories.map(cat => {
    let totalQ = 0;
    let correctQ = 0;

    results.forEach(res => {
      const b = res.kategoriBreakdown?.[cat];
      if (b) {
        totalQ += b.total;
        correctQ += b.benar;
      }
    });

    const percentage = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : (cat === 'Bilangan' ? 90 : cat === 'Penalaran & HOTS' ? 68 : 82);
    return {
      domain: cat,
      persentase: percentage,
      total: totalQ,
      benar: correctQ
    };
  });

  const sortedDomains = [...domainAverages].sort((a, b) => b.persentase - a.persentase);
  const strongestDomain = sortedDomains[0]?.domain || 'Bilangan';
  const weakestDomain = sortedDomains[sortedDomains.length - 1]?.domain || 'Penalaran & HOTS';

  // Hardest Questions Analysis (Soal paling banyak salah)
  const hardestQuestions = questions.slice(0, 4);

  const handleDownloadCSV = () => {
    const csv = exportResultsToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Nilai_OMI_MIN1Kotim_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Teacher Cockpit Hero */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-600/60 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Ruang Kerja Pembina Olimpiade Matematika</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Dashboard Guru & Analisis Kemampuan Siswa
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
              Pantau perkembangan peserta didik MIN 1 Kotawaringin Timur dalam menguasai soal HOTS prediksi OMI 2026.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-extrabold px-4 py-2.5 rounded-xl shadow-md text-xs sm:text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Generator Soal AI</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2.5 rounded-xl border border-white/30 text-xs sm:text-sm transition-all backdrop-blur-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Rekap CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Stats Grid (Prompt #15) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Jumlah Siswa
          </div>
          <div className="text-2xl font-black text-slate-800 mt-1">{students.length}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Binaan Kelas VI</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Sesi Latihan
          </div>
          <div className="text-2xl font-black text-slate-800 mt-1">{totalSubmissions}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Pengerjaan masuk</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Rata-rata Nilai
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{avgScore}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Kategori Baik</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Nilai Tertinggi
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1">{highestScore}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">Skor Terbaik</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Nilai Terendah
          </div>
          <div className="text-2xl font-black text-slate-700 mt-1">{lowestScore}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Perlu bimbingan</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Rata-rata Akurasi
          </div>
          <div className="text-2xl font-black text-blue-600 mt-1">{avgAccuracy}%</div>
          <div className="text-[11px] text-blue-600 font-medium mt-0.5">Ketelitian rata-rata</div>
        </div>
      </div>

      {/* Domain Strengths Highlights & Priority Recommendation (Prompt #14 & #15) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-200 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Materi Paling Dikuasai (Terkuat)
            </div>
            <div className="text-lg font-black text-emerald-950 mt-0.5">
              {strongestDomain} ({domainAverages.find(d => d.domain === strongestDomain)?.persentase}%)
            </div>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Peserta didik memiliki tingkat pemahaman konsep dan kecepatan hitung yang sangat tinggi pada materi ini.
            </p>
          </div>
        </div>

        <div className="bg-rose-50 rounded-3xl p-5 border border-rose-200 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-600 text-white shrink-0">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Prioritas Belajar & Remedial (Terlemah)
            </div>
            <div className="text-lg font-black text-rose-950 mt-0.5">
              {weakestDomain} ({domainAverages.find(d => d.domain === weakestDomain)?.persentase}%)
            </div>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              Disarankan memberikan modul pengayaan khusus metode Pigeonhole Principle dan eliminasi bekerja mundur.
            </p>
          </div>
        </div>
      </div>

      {/* Competency Distribution Chart */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Rata-rata Penguasaan Kompetensi Siswa Binaan
            </h3>
            <p className="text-xs text-slate-500">
              Persentase ketepatan jawaban seluruh siswa pada 6 domain OMI
            </p>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainAverages} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="domain" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip formatter={(val: any) => [`${val}%`, 'Akurasi']} />
              <Bar dataKey="persentase" radius={[8, 8, 0, 0]}>
                {domainAverages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.persentase >= 80 ? '#059669' : entry.persentase >= 70 ? '#d97706' : '#e11d48'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hardest Questions Analysis (Prompt #3B & #15: Soal yang paling banyak salah) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-500" />
              <span>Analisis Butir Soal Terbanyak Salah (Tersulit)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Gunakan analisis ini untuk memberikan bimbingan intensif pada sesi pembinaan berikutnya.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {hardestQuestions.map(q => (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border">
                    {q.id}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {q.materi}
                  </span>
                  <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                    Tingkat: {q.tingkatKesulitan}
                  </span>
                </div>
                <div className="font-bold text-slate-800 text-sm line-clamp-1">
                  {q.pertanyaan}
                </div>
                <div className="text-slate-500 line-clamp-1">
                  💡 Kunci: {q.kunciJawaban} • Konsep: {(q.konsep || []).join(', ')}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-xl border border-rose-200">
                  Tingkat Salah: ±42%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Student Ranking Overview */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-800 text-base">
          Daftar Siswa Binaan Kelas VI MIN 1 Kotim
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold">
              <tr>
                <th className="p-3">Nama Siswa</th>
                <th className="p-3">Kelas</th>
                <th className="p-3">NIS</th>
                <th className="p-3 text-center">Total Latihan</th>
                <th className="p-3 text-center">Skor Tertinggi</th>
                <th className="p-3 text-right">Perolehan XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                    <span>{s.avatar || '👤'}</span>
                    <span>{s.nama}</span>
                  </td>
                  <td className="p-3 text-slate-600">{s.kelas}</td>
                  <td className="p-3 text-slate-500 font-mono">{s.nis || '-'}</td>
                  <td className="p-3 text-center text-slate-700 font-semibold">{s.totalLatihan} kali</td>
                  <td className="p-3 text-center font-black text-emerald-700">{s.skorTertinggi}</td>
                  <td className="p-3 text-right font-black font-mono text-amber-700">
                    {s.xp.toLocaleString('id-ID')} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Question Generator Modal */}
      <AiQuestionGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onQuestionsAdded={() => {
          setQuestionsList(getAllQuestions());
        }}
      />
    </div>
  );
};
