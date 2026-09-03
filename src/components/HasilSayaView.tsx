import React, { useState } from 'react';
import { User, ExamResult } from '../types';
import { getAllResults } from '../utils/storage';
import { PembahasanModal } from './PembahasanModal';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Percent, 
  Clock, 
  BookOpen, 
  Lightbulb, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface HasilSayaViewProps {
  currentUser: User;
  onRetake: (mode: any) => void;
}

export const HasilSayaView: React.FC<HasilSayaViewProps> = ({ currentUser, onRetake }) => {
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);

  const allResults = getAllResults();
  const userResults = allResults.filter(r => r.userId === currentUser.id);

  // Competency mastery across all tests
  const categories = [
    'Bilangan',
    'Aljabar Dasar',
    'Geometri',
    'Pengukuran',
    'Data & Statistika',
    'Penalaran & HOTS'
  ];

  const competencyStats = categories.map(cat => {
    let totalQ = 0;
    let correctQ = 0;

    userResults.forEach(res => {
      const breakdown = res.kategoriBreakdown?.[cat as keyof typeof res.kategoriBreakdown];
      if (breakdown) {
        totalQ += breakdown.total;
        correctQ += breakdown.benar;
      }
    });

    const percentage = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 80;
    return {
      name: cat,
      persentase: percentage,
      total: totalQ,
      benar: correctQ
    };
  });

  const getBarColor = (val: number) => {
    if (val >= 85) return '#059669'; // Emerald
    if (val >= 70) return '#d97706'; // Amber
    return '#e11d48'; // Rose
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full">
            📊 Rapor & Rekam Jejak Belajar
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Evaluasi & Riwayat Hasil Latihan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pantau perkembangan kompetensi matematika secara berkala dan ketahui materi yang perlu diperdalam.
        </p>
      </div>

      {/* Competency Mastery Bar Chart */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
              Grafik Penguasaan 6 Domain OMI
            </h3>
            <p className="text-xs text-slate-500">
              Persentase akurasi jawaban per materi matematika
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Kuat (≥85%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Cukup (70-84%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Perlu Penguatan (&lt;70%)
            </span>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={competencyStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 11, fill: '#64748b' }}
                unit="%" 
              />
              <Tooltip 
                formatter={(value: any) => [`${value}% Akurasi`, 'Tingkat Penguasaan']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="persentase" radius={[8, 8, 0, 0]}>
                {competencyStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.persentase)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-800 text-base">
          Riwayat Pengerjaan ({userResults.length})
        </h3>

        {userResults.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <BarChart3 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <div className="font-bold text-slate-700 text-sm">Belum ada riwayat pengerjaan</div>
            <div className="text-slate-400 text-xs mt-1">Mulai kerjakan latihan atau simulasi untuk melihat hasilnya di sini!</div>
          </div>
        ) : (
          userResults.map(res => (
            <div
              key={res.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {res.mode}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(res.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                  {res.judulLatihan}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="text-emerald-700 font-semibold">{res.benar} Benar</span>
                  <span>•</span>
                  <span className="text-rose-700 font-semibold">{res.salah} Salah</span>
                  <span>•</span>
                  <span>Akurasi {res.akurasi}%</span>
                  <span>•</span>
                  <span>+{res.xpEarned} XP</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-800 font-mono">
                    {res.skor}
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">
                    {res.kategoriPredikat}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedResult(res)}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pembahasan</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pembahasan Modal */}
      {selectedResult && (
        <PembahasanModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};
