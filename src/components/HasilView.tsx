import React, { useState } from 'react';
import { ExamResult, MathCategory } from '../types';
import { PembahasanModal } from './PembahasanModal';
import { 
  Trophy, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Percent, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Home, 
  Lightbulb, 
  Award,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface HasilViewProps {
  result: ExamResult;
  onRetake: () => void;
  onGoHome: () => void;
  onExploreMateri: (category?: MathCategory) => void;
}

export const HasilView: React.FC<HasilViewProps> = ({
  result,
  onRetake,
  onGoHome,
  onExploreMateri,
}) => {
  const [showPembahasan, setShowPembahasan] = useState(false);

  // Motivational message based on prompt #24
  const getMotivationalMessage = (score: number) => {
    if (score >= 90) {
      return {
        quote: "Hebat! Kemampuan matematikamu sangat baik. Tingkatkan lagi untuk menjadi Math Champion! 🏆",
        bg: "bg-emerald-50 border-emerald-300 text-emerald-950",
        badge: "🏆 Sangat Baik"
      };
    } else if (score >= 70) {
      return {
        quote: "Bagus! Kamu sudah berkembang. Mari perkuat beberapa materi lagi untuk mencapai podium juara! 💪",
        bg: "bg-amber-50 border-amber-300 text-amber-950",
        badge: score >= 80 ? "⭐ Baik" : "👍 Cukup"
      };
    } else {
      return {
        quote: "Jangan menyerah! Kesalahan adalah bagian dari proses belajar. Yuk pelajari kembali pembahasannya dan coba lagi! 🔥",
        bg: "bg-blue-50 border-blue-300 text-blue-950",
        badge: "📚 Perlu Latihan"
      };
    }
  };

  const motivation = getMotivationalMessage(result.skor);

  // Star rating helper for domain
  const getStarRating = (percent: number) => {
    if (percent >= 90) return '⭐⭐⭐⭐⭐';
    if (percent >= 75) return '⭐⭐⭐⭐';
    if (percent >= 50) return '⭐⭐⭐';
    if (percent >= 30) return '⭐⭐';
    return '⭐';
  };

  const minutesTaken = Math.max(1, Math.round(result.durasiDetik / 60));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Hero Score Celebration Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-xl border border-emerald-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-lg mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Hasil Evaluasi • {result.judulLatihan}</span>
          </div>

          <div className="pt-2">
            <div className="text-6xl sm:text-7xl font-black tracking-tight text-amber-300 drop-shadow-md font-mono">
              {result.skor}
            </div>
            <div className="text-xs sm:text-sm text-emerald-200 font-semibold mt-1">
              Skor Akhir (Skala 0 - 100)
            </div>
          </div>

          {/* Predikat Badge */}
          <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/20 text-sm font-extrabold text-white">
            Kategori Predikat: {result.kategoriPredikat}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-amber-200 font-medium">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kamu mendapatkan +{result.xpEarned} XP Prestasi!</span>
          </div>
        </div>
      </div>

      {/* Motivational Speech Card (Prompt #24) */}
      <div className={`p-5 rounded-2xl border ${motivation.bg} shadow-sm flex items-start gap-3.5`}>
        <div className="text-3xl select-none">💬</div>
        <div>
          <div className="font-extrabold text-xs uppercase tracking-wider opacity-75 mb-1">
            Pesan Motivasi Pembina OMI:
          </div>
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            "{motivation.quote}"
          </p>
        </div>
      </div>

      {/* 4 Metric Stats Grid (Prompt #10) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1.5">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-800">{result.benar}</div>
          <div className="text-xs text-slate-500 font-medium">Jawaban Benar</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-1.5">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-800">{result.salah}</div>
          <div className="text-xs text-slate-500 font-medium">Jawaban Salah</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1.5">
            <Percent className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-amber-600">{result.akurasi}%</div>
          <div className="text-xs text-slate-500 font-medium">Akurasi Jawaban</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1.5">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-800">{minutesTaken} <span className="text-xs font-normal text-slate-400">mnt</span></div>
          <div className="text-xs text-slate-500 font-medium">Waktu Pengerjaan</div>
        </div>
      </div>

      {/* Domain Competency Star Ratings & Breakdown (Prompt #21) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Hasil Analisis Kompetensi Anda
            </h3>
            <p className="text-xs text-slate-500">
              Penguasaan per domain materi matematika berdasarkan latihan ini:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {(Object.entries(result.kategoriBreakdown || {}) as [string, { total: number; benar: number; persentase: number }][]).map(([cat, stat]) => {
            if (stat.total === 0) return null;
            return (
              <div 
                key={cat}
                className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-800">
                    {cat}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stat.benar} dari {stat.total} soal benar ({stat.persentase}%)
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs tracking-wider select-none">
                    {getStarRating(stat.persentase)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    stat.persentase >= 80 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : stat.persentase >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {stat.persentase >= 80 ? 'Kuasai' : stat.persentase >= 60 ? 'Perlu Pengayaan' : 'Fokus Belajar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automated Learning Recommendations (Prompt #21) */}
      <div className="bg-amber-50/60 rounded-3xl p-5 sm:p-6 border border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span>Rekomendasi Belajar Otomatis Sistem</span>
        </div>
        <div className="space-y-2 text-xs sm:text-sm text-amber-950">
          {(result.rekomendasiMateri || []).map((rekom, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-amber-200">
              <span className="text-emerald-700 font-bold">✓</span>
              <span className="leading-relaxed">{rekom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={() => setShowPembahasan(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md text-sm transition-all active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>Lihat Pembahasan Lengkap Step-by-Step</span>
        </button>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <button
            onClick={onRetake}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>

          <button
            onClick={onGoHome}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Discussion Modal */}
      {showPembahasan && (
        <PembahasanModal
          result={result}
          onClose={() => setShowPembahasan(false)}
        />
      )}
    </div>
  );
};
