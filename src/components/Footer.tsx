import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-emerald-950 text-emerald-100 border-t border-emerald-900/80 pb-24 sm:pb-10 pt-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Official Disclaimer Card */}
        <div className="bg-emerald-900/60 rounded-3xl p-5 border border-emerald-800/80 mb-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-400/15 text-amber-300 shrink-0 mt-0.5 border border-amber-400/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              <div className="font-bold text-amber-300 tracking-wide mb-1 flex items-center gap-1.5 uppercase text-xs">
                <span>LABEL RESMI APLIKASI</span>
                <span>•</span>
                <span>SOAL PREDIKSI & LATIHAN OMI 2026</span>
              </div>
              <p className="text-emerald-300/80">
                Soal disusun sebagai media latihan dan pengayaan berdasarkan kompetensi dan karakteristik soal matematika kompetitif madrasah. 
                <strong className="text-emerald-100 ml-1">Bukan soal resmi, bukan bocoran, dan bukan prediksi resmi OMI.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Brand & Slogan */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-900/80 px-5 py-2 rounded-full border border-emerald-700/60 shadow-xs">
            <span>🎯 Belajar</span>
            <span className="text-emerald-600">•</span>
            <span>🧠 Bernalar</span>
            <span className="text-emerald-600">•</span>
            <span>🔥 Berlatih</span>
            <span className="text-emerald-600">•</span>
            <span>🏆 Berprestasi</span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
            MATH OMI 2026 • MIN 1 KOTAWARINGIN TIMUR
          </h2>
          
          <p className="text-xs text-emerald-300/70 max-w-lg mx-auto">
            Media Pembelajaran & Persiapan Olimpiade Matematika Madrasah Ibtidaiyah Kelas 6
          </p>

          <div className="pt-4 border-t border-emerald-900/60 text-xs text-emerald-400/70 font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Disusun By Witno</span>
            </div>
            <span className="hidden sm:inline text-emerald-700">•</span>
            <span>Kementerian Agama Kabupaten Kotawaringin Timur</span>
            <span className="hidden sm:inline text-emerald-700">•</span>
            <span>Versi 2.6 Pro (Edutech Bento Edition)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
