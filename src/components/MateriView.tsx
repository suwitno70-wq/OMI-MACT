import React, { useState } from 'react';
import { MaterialTopic, MathCategory } from '../types';
import { MATERIAL_TOPICS } from '../data/initialData';
import { 
  BookOpen, 
  Search, 
  Lightbulb, 
  Zap, 
  PenTool, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MateriViewProps {
  onStartPracticeCategory: (category: MathCategory) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({ onStartPracticeCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState<string>(MATERIAL_TOPICS[0].id);

  const categories = [
    'Semua',
    'Bilangan',
    'Aljabar Dasar',
    'Geometri',
    'Pengukuran',
    'Data & Statistika',
    'Penalaran & HOTS'
  ];

  const filteredTopics = MATERIAL_TOPICS.filter(t => {
    const matchCategory = selectedCategory === 'Semua' || t.kategori === selectedCategory;
    const matchQuery = 
      t.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.rumusPenting.some(r => r.nama.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Modul Pembelajaran Interaktif OMI 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              Materi & Rumus Cepat Matematika
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Panduan lengkap 6 domain olimpiade matematika madrasah ibtidaiyah dengan konsep inti, rumus penting, dan strategi penyelesaian instan.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔎 Cari materi atau rumus..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Filters Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 no-scrollbar border-t border-slate-100 mt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <Calculator className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <div className="text-slate-700 font-bold text-sm">Materi tidak ditemukan</div>
            <div className="text-slate-400 text-xs mt-1">Coba gunakan kata kunci pencarian yang lain.</div>
          </div>
        ) : (
          filteredTopics.map(topic => {
            const isExpanded = expandedTopicId === topic.id;
            return (
              <div 
                key={topic.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
              >
                {/* Topic Header Card */}
                <div 
                  onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                  className="p-5 sm:p-6 cursor-pointer hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {topic.kategori}
                      </span>
                      <span className="text-xs text-slate-400">• Persiapan OMI</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                      {topic.judul}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
                      {topic.ringkasan}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in duration-150">
                    {/* Concept Points */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Poin Konsep Kunci</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {topic.kontenLengkap.map((item, idx) => (
                          <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rumus Penting */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5 text-blue-600" />
                        <span>Rumus Penting & Identitas Matematika</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {topic.rumusPenting.map((rumus, idx) => (
                          <div key={idx} className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200/80 space-y-1">
                            <div className="font-bold text-xs text-blue-950">{rumus.nama}</div>
                            <div className="text-xs font-mono font-bold bg-white px-2 py-1 rounded-md text-blue-700 border border-blue-100">
                              {rumus.rumus}
                            </div>
                            <div className="text-[11px] text-blue-800/80">{rumus.keterangan}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trik Cepat Olimpiade */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Strategi Cepat (Trik Cepat Olimpiade)</span>
                      </h4>
                      <div className="space-y-2">
                        {topic.trikCepat.map((trik, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-amber-950">
                            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{trik}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contoh Soal: Cara Biasa vs Trik Olimpiade */}
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Contoh Soal Komparasi
                      </div>
                      <div className="font-bold text-sm text-slate-800 mb-3">
                        "{topic.contohSoal.tanya}"
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <div className="font-bold text-slate-500 mb-1">🐢 Cara Biasa:</div>
                          <p className="text-slate-600 leading-relaxed">{topic.contohSoal.caraBiasa}</p>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                          <div className="font-bold text-emerald-800 mb-1">⚡ Trik Cepat OMI:</div>
                          <p className="text-emerald-900 leading-relaxed">{topic.contohSoal.trikOlimpiade}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button: Practice this Category */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => onStartPracticeCategory(topic.kategori)}
                        className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
                      >
                        <PenTool className="w-4 h-4" />
                        <span>Latihan Soal Kategori {topic.kategori}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
