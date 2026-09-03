import React from 'react';
import { Trophy, Clock, Shuffle, CheckCircle, ShieldAlert, Award, ArrowRight, Sparkles } from 'lucide-react';

interface SimulasiViewProps {
  onStartSimulation: (packageTitle: string, questionCount: number, durationMinutes: number) => void;
}

export const SimulasiView: React.FC<SimulasiViewProps> = ({ onStartSimulation }) => {
  const simulationPackages = [
    {
      id: 'sim-01',
      title: 'SIMULASI OMI 2026 - PAKET UTAMA 01',
      subtitle: 'Standar Kompetisi Nasional Matematika Madrasah',
      questionCount: 30,
      durationMinutes: 60,
      level: 'Olimpiade',
      badge: 'Resmi Simulasi 01',
      recommendedFor: 'Persiapan Kompetisi Penuh'
    },
    {
      id: 'sim-02',
      title: 'SIMULASI OMI 2026 - PAKET UTAMA 02',
      subtitle: 'Fokus Penalaran & Geometri Terapan',
      questionCount: 30,
      durationMinutes: 60,
      level: 'Olimpiade',
      badge: 'Resmi Simulasi 02',
      recommendedFor: 'Tantangan HOTS Tingkat Tinggi'
    },
    {
      id: 'sim-03',
      title: 'SIMULASI OMI KILAT (SPRINT OLYMPIC)',
      subtitle: 'Simulasi Kecepatan & Ketelitian 15 Soal',
      questionCount: 15,
      durationMinutes: 25,
      level: 'Sedang - Sulit',
      badge: 'Sprint 25 Menit',
      recommendedFor: 'Latihan Cepat Mandiri'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-black/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-200" />
            <span>Simulasi Ujian Kompetisi Riil</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            🏆 SIMULASI OMI 2026
          </h1>

          <p className="text-amber-50 text-xs sm:text-sm leading-relaxed">
            Dirancang dengan format, batas waktu, dan standar tingkat kesulitan olimpiade madrasah sesungguhnya. Sistem secara otomatis mengacak urutan soal dan pilihan jawaban untuk menguji kesiapan mental kompetisi.
          </p>
        </div>
      </div>

      {/* Official Simulation Rules Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-700" />
          <span>Aturan & Mekanisme Simulasi OMI</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Batas Waktu Ketat:</span>
              <p className="text-slate-500 text-xs mt-0.5">Timer berjalan mundur otomatis. Jika waktu habis, jawaban akan langsung terkumpul.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <Shuffle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Pengacakan Ganda:</span>
              <p className="text-slate-500 text-xs mt-0.5">Urutan soal dan posisi pilihan A, B, C, D diacak secara otomatis (Random Question Engine).</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Skor & Evaluasi Langsung:</span>
              <p className="text-slate-500 text-xs mt-0.5">Skor akhir (0 - 100), akurasi, dan rekomendasi domain lemah langsung tersedia saat selesai.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Reward Prestasi:</span>
              <p className="text-slate-500 text-xs mt-0.5">Dapatkan hingga +200 XP dan lencana Pejuang OMI atau Math Champion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Packages List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-base">
          Pilih Paket Simulasi OMI
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {simulationPackages.map(pkg => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {pkg.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {pkg.recommendedFor}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-extrabold text-slate-800">
                  {pkg.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-500">
                  {pkg.subtitle}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>{pkg.questionCount} Butir Soal</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <strong>{pkg.durationMinutes} Menit</strong>
                  </span>
                  <span className="flex items-center gap-1 text-rose-600">
                    <strong>Level: {pkg.level}</strong>
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => onStartSimulation(pkg.title, pkg.questionCount, pkg.durationMinutes)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md text-sm transition-all active:scale-95"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Mulai Simulasi Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
