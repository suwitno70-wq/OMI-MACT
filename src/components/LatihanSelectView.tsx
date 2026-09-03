import React, { useState } from 'react';
import { MathCategory } from '../types';
import { getAllQuestions } from '../utils/storage';
import { 
  PenTool, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Zap, 
  ArrowRight, 
  Sliders, 
  Target 
} from 'lucide-react';

interface LatihanSelectViewProps {
  onStartPractice: (options: {
    judul: string;
    materi?: MathCategory;
    questionCount: number;
    durationMinutes: number;
  }) => void;
}

export const LatihanSelectView: React.FC<LatihanSelectViewProps> = ({ onStartPractice }) => {
  const [selectedCount, setSelectedCount] = useState<number>(10);
  const [selectedDuration, setSelectedDuration] = useState<number>(20);

  const categories: {
    name: MathCategory;
    desc: string;
    color: string;
    iconText: string;
  }[] = [
    {
      name: 'Bilangan',
      desc: 'Pecahan, FPB/KPK, rasio, pola bilangan & operasi hitung',
      color: 'from-emerald-500 to-teal-600',
      iconText: '🔢'
    },
    {
      name: 'Aljabar Dasar',
      desc: 'Persamaan linear sederhana, pola bertingkat & logika variabel',
      color: 'from-blue-500 to-indigo-600',
      iconText: '📐'
    },
    {
      name: 'Geometri',
      desc: 'Keliling, luas bangun gabungan, sudut & volume bangun ruang',
      color: 'from-amber-500 to-orange-600',
      iconText: '🔺'
    },
    {
      name: 'Pengukuran',
      desc: 'Kecepatan, jarak, waktu, debit air & konversi satuan',
      color: 'from-purple-500 to-violet-600',
      iconText: '⏱️'
    },
    {
      name: 'Data & Statistika',
      desc: 'Mean, median, modus & interpretasi diagram lingkaran',
      color: 'from-cyan-500 to-sky-600',
      iconText: '📊'
    },
    {
      name: 'Penalaran & HOTS',
      desc: 'Prinsip sarang merpati, eliminasi mundur & logika olimpiade',
      color: 'from-rose-500 to-pink-600',
      iconText: '🧠'
    }
  ];

  const allQuestions = getAllQuestions();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
            📝 Latihan Soal Mandiri
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Pilih Modul Latihan Matematika OMI 2026
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Asah ketajaman berpikir secara fleksibel per topik atau uji seluruh kompetensi dengan paket campuran. Dilengkapi timer dan pembahasan bertahap.
        </p>

        {/* Global Preset Config Strip */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              Jumlah Soal:
            </span>
            <div className="flex items-center gap-1">
              {[10, 15, 20].map(count => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedCount === count
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {count} Soal
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Batas Waktu:
            </span>
            <div className="flex items-center gap-1">
              {[15, 20, 30].map(min => (
                <button
                  key={min}
                  onClick={() => setSelectedDuration(min)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedDuration === min
                      ? 'bg-blue-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {min} Menit
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured: Paket Campuran Komprehensif */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-950 rounded-3xl p-6 text-white shadow-md border border-emerald-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-emerald-200 border border-emerald-600">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Paket Campuran 6 Materi</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black tracking-tight">
            Latihan Mandiri Komprehensif OMI
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100">
            Kombinasi acak dari seluruh kategori soal (Bilangan, Aljabar, Geometri, Pengukuran, Statistika, dan Penalaran).
          </p>
        </div>

        <button
          onClick={() => onStartPractice({
            judul: 'Latihan Campuran Komprehensif OMI 2026',
            questionCount: selectedCount,
            durationMinutes: selectedDuration
          })}
          className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold px-6 py-3 rounded-2xl shadow-md text-xs sm:text-sm transition-all active:scale-95 shrink-0"
        >
          <span>Mulai Latihan Campuran</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Grid */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-800 text-base">
          Latihan Berdasarkan Kategori Domain Materi
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {categories.map(cat => {
            const countInBank = allQuestions.filter(q => q.materi === cat.name).length;

            return (
              <div
                key={cat.name}
                onClick={() => onStartPractice({
                  judul: `Latihan Khusus Materi ${cat.name}`,
                  materi: cat.name,
                  questionCount: Math.min(selectedCount, countInBank || 10),
                  durationMinutes: selectedDuration
                })}
                className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4 active:scale-[0.99]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.iconText}</span>
                    <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      Tersedia {countInBank} Soal
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
                    {cat.name}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Mulai {selectedCount} Soal ({selectedDuration} mnt)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
