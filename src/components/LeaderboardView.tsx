import React, { useState } from 'react';
import { getLeaderboard } from '../utils/storage';
import { Trophy, Medal, Crown, Sparkles, Search, Star } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'all' | 'weekly'>('all');
  const [search, setSearch] = useState('');

  const leaderboardData = getLeaderboard();

  const filtered = leaderboardData.filter(entry => 
    entry.nama.toLowerCase().includes(search.toLowerCase()) ||
    entry.kelas.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = leaderboardData.slice(0, 3);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>Peringkat Peserta Didik MIN 1 Kotim</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
            🏆 Ranking Prestasi MATH OMI 2026
          </h1>
          <p className="text-xs sm:text-sm text-emerald-700/80 mt-1">
            Klasemen perolehan XP dan skor evaluasi peserta didik kelas 6 menuju Olimpiade Madrasah Indonesia.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="inline-flex p-1 bg-emerald-50 rounded-2xl border border-emerald-100">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              Keseluruhan
            </button>
            <button
              onClick={() => setTimeFilter('weekly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeFilter === 'weekly'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              Minggu Ini
            </button>
          </div>

          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari siswa..."
              className="w-full pl-8 pr-3 py-1.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium Visual Display */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-6 pb-2">
          {/* Rank 2 (Silver) */}
          <div className="bg-slate-100/90 rounded-3xl p-4 sm:p-5 border border-slate-200 text-center flex flex-col items-center justify-end relative shadow-xs">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-xl sm:text-2xl shadow-inner mb-2">
              {top3[1].avatar}
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center shadow-xs -mt-5 mb-1.5">
              2
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-800 truncate w-full">
              {top3[1].nama}
            </div>
            <div className="text-[11px] text-slate-500">Kelas {top3[1].kelas}</div>
            <div className="mt-2 bg-white px-2.5 py-1 rounded-xl border border-slate-200 font-mono font-bold text-xs text-slate-700">
              {top3[1].xp.toLocaleString('id-ID')} XP
            </div>
          </div>

          {/* Rank 1 (Gold Champion) */}
          <div className="bg-gradient-to-b from-amber-50 to-amber-100/80 rounded-3xl p-4 sm:p-6 border-2 border-amber-300 text-center flex flex-col items-center justify-end relative shadow-md -translate-y-3">
            <div className="absolute -top-3 text-2xl animate-bounce">
              👑
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-2xl sm:text-3xl shadow-md mb-2">
              {top3[0].avatar}
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs -mt-5 mb-1.5">
              1
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-amber-950 truncate w-full">
              {top3[0].nama}
            </div>
            <div className="text-[11px] text-amber-800 font-medium">Kelas {top3[0].kelas}</div>
            <div className="mt-2 bg-white px-3 py-1 rounded-xl border border-amber-300 font-mono font-black text-xs sm:text-sm text-amber-600 shadow-2xs">
              {top3[0].xp.toLocaleString('id-ID')} XP
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="bg-amber-50/50 rounded-3xl p-4 sm:p-5 border border-amber-200/80 text-center flex flex-col items-center justify-end relative shadow-xs">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-xl sm:text-2xl shadow-inner mb-2">
              {top3[2].avatar}
            </div>
            <div className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs -mt-5 mb-1.5">
              3
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-800 truncate w-full">
              {top3[2].nama}
            </div>
            <div className="text-[11px] text-slate-500">Kelas {top3[2].kelas}</div>
            <div className="mt-2 bg-white px-2.5 py-1 rounded-xl border border-amber-200 font-mono font-bold text-xs text-amber-800">
              {top3[2].xp.toLocaleString('id-ID')} XP
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table (Prompt #13 format) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4 text-center">Latihan</th>
                <th className="py-3.5 px-4 text-right">Skor Terbaik</th>
                <th className="py-3.5 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(entry => (
                <tr 
                  key={entry.userId}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* Rank Column */}
                  <td className="py-3.5 px-4 text-center font-black">
                    {entry.rank === 1 ? (
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 inline-flex items-center justify-center text-xs shadow-xs font-black">
                        1
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-800 inline-flex items-center justify-center text-xs shadow-xs font-black">
                        2
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="w-6 h-6 rounded-full bg-amber-700 text-white inline-flex items-center justify-center text-xs shadow-xs font-black">
                        3
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">#{entry.rank}</span>
                    )}
                  </td>

                  {/* Student Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg select-none">{entry.avatar}</span>
                      <div>
                        <div className="font-extrabold text-slate-800 leading-snug">
                          {entry.nama}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {entry.badgeCount} Lencana Prestasi
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="py-3.5 px-4 font-semibold text-slate-600">
                    {entry.kelas}
                  </td>

                  {/* Latihan Count */}
                  <td className="py-3.5 px-4 text-center text-slate-500">
                    {entry.latihanSelesai} kali
                  </td>

                  {/* Skor */}
                  <td className="py-3.5 px-4 text-right font-black text-slate-800">
                    {entry.skor}
                  </td>

                  {/* XP */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {entry.xp.toLocaleString('id-ID')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
