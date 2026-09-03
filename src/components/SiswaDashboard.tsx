import React from 'react';
import { User, Badge } from '../types';
import { BADGES_LIST } from '../data/initialData';
import { getLeaderboard } from '../utils/storage';
import { 
  BookOpen, 
  PenTool, 
  Trophy, 
  Zap, 
  BarChart3, 
  Medal, 
  Lightbulb, 
  Target, 
  Flame, 
  CheckCircle2, 
  Percent, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SiswaDashboardProps {
  currentUser: User;
  onNavigate: (tab: string, extra?: any) => void;
  onOpenDailyChallenge: () => void;
  studentRank: number;
}

export const SiswaDashboard: React.FC<SiswaDashboardProps> = ({
  currentUser,
  onNavigate,
  onOpenDailyChallenge,
  studentRank,
}) => {
  // Accuracy calculation
  const accuracy = currentUser.soalDijawab > 0 
    ? Math.round((currentUser.jawabanBenar / currentUser.soalDijawab) * 100) 
    : 0;

  // Preparation Progress calculation based on XP and practices
  const targetXP = 6000;
  const progressPercent = Math.min(100, Math.round((currentUser.xp / targetXP) * 100));

  // Motivation message based on score
  const getMotivationalQuote = () => {
    if (currentUser.skorTertinggi >= 90) {
      return {
        text: 'Hebat! Kemampuan matematikamu sangat baik. Pertahankan terus untuk menjadi Juara OMI 2026!',
        tone: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        badge: '🏆 Math Champion'
      };
    } else if (currentUser.skorTertinggi >= 70) {
      return {
        text: 'Bagus! Kamu sudah berkembang pesat. Mari perkuat latihan penalaran dan geometri lagi!',
        tone: 'bg-amber-50 border-amber-200 text-amber-900',
        badge: '💪 Pantang Menyerah'
      };
    } else {
      return {
        text: 'Jangan menyerah! Kesalahan adalah bagian dari proses belajar. Yuk kerjakan latihan hari ini!',
        tone: 'bg-blue-50 border-blue-200 text-blue-900',
        badge: '🔥 Terus Berjuang'
      };
    }
  };

  const motivation = getMotivationalQuote();
  const leaderboardList = getLeaderboard() || [];
  const top3 = (leaderboardList || []).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 animate-in fade-in duration-200">
      {/* 1. Bento Hero Welcome Card (col-span-12 lg:col-span-8) */}
      <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col justify-center relative overflow-hidden">
        {/* Faint mathematical watermark π / Σ */}
        <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 grayscale pointer-events-none select-none">
          <div className="text-8xl sm:text-9xl font-serif italic text-emerald-950">π</div>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 border border-emerald-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Persiapan OMI 2026 • Kelas 6 MI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            Halo, {currentUser.nama}! 👋
          </h2>
          <p className="text-emerald-700 mt-2 text-base sm:text-lg leading-relaxed">
            Siap menaklukkan tantangan Matematika hari ini?
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('materi')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-all active:scale-95 text-sm flex items-center gap-2"
            >
              <span>Lanjut Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('materi')}
              className="text-emerald-800 hover:text-emerald-950 font-semibold border-b-2 border-emerald-200 hover:border-emerald-600 py-1 transition-all text-sm cursor-pointer"
            >
              Lihat Materi Terakhir
            </button>
          </div>
        </div>
      </div>

      {/* 2. Bento Leaderboard Card (col-span-12 lg:col-span-4) */}
      <div className="col-span-12 lg:col-span-4 bg-emerald-900 rounded-3xl p-6 shadow-xl text-white flex flex-col justify-between border border-emerald-800">
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
              <span>🏆 Leaderboard</span>
            </h3>
            <button
              onClick={() => onNavigate('ranking')}
              className="text-xs bg-emerald-800 hover:bg-emerald-700 px-2.5 py-1 rounded-lg text-emerald-200 transition-colors font-medium cursor-pointer"
            >
              Minggu Ini
            </button>
          </div>

          <div className="space-y-3">
            {(top3 || []).map((student, idx) => (
              <div 
                key={student.userId || idx}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  idx === 0 
                    ? 'bg-emerald-800/60 border border-emerald-700 shadow-xs' 
                    : 'bg-emerald-900/40 hover:bg-emerald-800/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                  idx === 0 
                    ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                    : 'text-emerald-300 opacity-70'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-semibold text-sm truncate text-white">
                    {student.nama}
                  </div>
                  <div className="text-[11px] text-emerald-300/70 truncate">
                    {student.kelas}
                  </div>
                </div>
                <div className="text-emerald-300 font-mono text-xs font-bold shrink-0">
                  {student.xp.toLocaleString('id-ID')} XP
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-800 text-center">
          <span className="text-xs text-emerald-200/80">
            Kamu berada di peringkat <strong className="text-white font-bold">#{studentRank}</strong>
          </span>
        </div>
      </div>

      {/* 3. Bento Metric Stat Pills Row (col-span-12 with 4 responsive pills) */}
      <div className="col-span-6 sm:col-span-3 lg:col-span-3 bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 flex items-center gap-4 hover:border-emerald-300 transition-all">
        <div className="bg-orange-100 p-3 rounded-2xl text-orange-600 font-bold text-base sm:text-lg flex items-center justify-center shrink-0">
          🔥 {currentUser.streakDays}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
            Streak
          </div>
          <div className="text-sm font-black text-slate-800 truncate">
            Hari Aktif
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-3 lg:col-span-3 bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 flex items-center gap-4 hover:border-emerald-300 transition-all">
        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 font-bold text-base sm:text-lg flex items-center justify-center shrink-0">
          ✅ {accuracy}%
        </div>
        <div className="min-w-0">
          <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
            Akurasi
          </div>
          <div className="text-sm font-black text-slate-800 truncate">
            Latihan Terakhir
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-3 lg:col-span-3 bg-amber-400 rounded-3xl p-4 shadow-sm border border-amber-500/20 flex flex-col justify-center items-center hover:bg-amber-300 transition-all cursor-default">
        <div className="text-2xl sm:text-3xl font-black text-amber-900 leading-none">
          {currentUser.soalDijawab}
        </div>
        <div className="text-[10px] sm:text-xs text-amber-800 font-bold uppercase tracking-wide mt-1">
          Soal Terjawab
        </div>
      </div>

      <div className="col-span-6 sm:col-span-3 lg:col-span-3 bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 flex items-center gap-4 hover:border-emerald-300 transition-all">
        <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 font-bold text-base sm:text-lg flex items-center justify-center shrink-0">
          ⭐ {currentUser.skorTertinggi}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
            Skor Tertinggi
          </div>
          <div className="text-sm font-black text-slate-800 truncate">
            Rekor Pribadi
          </div>
        </div>
      </div>

      {/* 4. Bento 6-Grid Menu Tiles (col-span-12 lg:col-span-8) */}
      <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Materi Pelajaran */}
        <div 
          onClick={() => onNavigate('materi')}
          className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 hover:border-emerald-400 hover:shadow-md flex flex-col gap-3 cursor-pointer group transition-all active:scale-[0.99]"
        >
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-xs">
            📚
          </div>
          <div>
            <div className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Materi Pelajaran
            </div>
            <div className="text-xs text-emerald-600 mt-1 line-clamp-2">
              Eksplorasi konsep matematika MI & rumus cepat
            </div>
          </div>
        </div>

        {/* Latihan Mandiri */}
        <div 
          onClick={() => onNavigate('latihan')}
          className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 hover:border-emerald-400 hover:shadow-md flex flex-col gap-3 cursor-pointer group transition-all active:scale-[0.99]"
        >
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-xs">
            📝
          </div>
          <div>
            <div className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Latihan Mandiri
            </div>
            <div className="text-xs text-emerald-600 mt-1 line-clamp-2">
              Asah kemampuan per kategori dengan timer
            </div>
          </div>
        </div>

        {/* Simulasi OMI (Featured Hot Card) */}
        <div 
          onClick={() => onNavigate('simulasi')}
          className="bg-emerald-50 rounded-3xl p-5 shadow-sm border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md flex flex-col gap-3 cursor-pointer group transition-all active:scale-[0.99] relative"
        >
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-xs">
            Hot
          </div>
          <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🏆
          </div>
          <div>
            <div className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Simulasi OMI
            </div>
            <div className="text-xs text-emerald-600 mt-1 line-clamp-2">
              Latihan intensif 30 butir standar olimpiade 60 menit
            </div>
          </div>
        </div>

        {/* Tantangan Harian */}
        <div 
          onClick={onOpenDailyChallenge}
          className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 hover:border-emerald-400 hover:shadow-md flex flex-col gap-3 cursor-pointer group transition-all active:scale-[0.99]"
        >
          <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-xs">
            ⚡
          </div>
          <div>
            <div className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Tantangan Harian
            </div>
            <div className="text-xs text-emerald-600 mt-1 line-clamp-2">
              5 Soal harian HOTS untuk menaikkan streak & XP
            </div>
          </div>
        </div>

        {/* Statistik / Hasil Saya */}
        <div 
          onClick={() => onNavigate('hasil')}
          className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 hover:border-emerald-400 hover:shadow-md flex flex-col gap-3 cursor-pointer group transition-all active:scale-[0.99]"
        >
          <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-xs">
            📊
          </div>
          <div>
            <div className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Statistik Saya
            </div>
            <div className="text-xs text-emerald-600 mt-1 line-clamp-2">
              Analisis kompetensi & kelemahan materi
            </div>
          </div>
        </div>

        {/* Strategi Cepat */}
        <div 
          onClick={() => onNavigate('tips')}
          className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 hover:border-emerald-400 hover:shadow-md flex flex-col gap-3 cursor-pointer group transition-all active:scale-[0.99]"
        >
          <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-xs">
            💡
          </div>
          <div>
            <div className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Strategi Cepat
            </div>
            <div className="text-xs text-emerald-600 mt-1 line-clamp-2">
              Tips & trik penyelesaian eliminasi dan nalar
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bento Progress & Motivation Column (col-span-12 lg:col-span-4) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        {/* Progress OMI 2026 Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-emerald-900 tracking-wider">
                PROGRESS OMI 2026
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-emerald-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-[10px] mt-2 text-emerald-500 font-medium italic text-right">
              Target: Maret 2026
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Target XP: {targetXP.toLocaleString('id-ID')}</span>
            <span className="font-bold text-emerald-700">{currentUser.xp} XP Terkumpul</span>
          </div>
        </div>

        {/* Motivation Card */}
        <div className={`p-5 rounded-3xl border ${motivation.tone} shadow-sm flex items-start gap-3.5`}>
          <div className="text-2xl select-none shrink-0">💬</div>
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold mr-1.5">{motivation.badge}:</span>
            {motivation.text}
          </div>
        </div>
      </div>

      {/* 6. Bento Badges Shelf (col-span-12) */}
      <div className="col-span-12 bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
              Koleksi Lencana & Prestasi ({currentUser.unlockedBadges.length}/{BADGES_LIST.length})
            </h3>
          </div>
          <button
            onClick={() => onNavigate('ranking')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Lihat Ranking</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {(BADGES_LIST || []).map(badge => {
            const isUnlocked = (currentUser.unlockedBadges || []).includes(badge.id);
            return (
              <div
                key={badge.id}
                title={`${badge.nama} - ${badge.deskripsi} (${badge.syarat})`}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isUnlocked 
                    ? 'bg-amber-50/60 border-amber-200 shadow-xs' 
                    : 'bg-slate-50 border-slate-200/60 opacity-50 grayscale'
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-1">{badge.icon}</div>
                <div className="font-bold text-xs text-slate-800 truncate">{badge.nama}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{badge.syarat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
