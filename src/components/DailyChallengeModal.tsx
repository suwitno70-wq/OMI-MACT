import React from 'react';
import { User } from '../types';
import { Flame, Zap, Trophy, X, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface DailyChallengeModalProps {
  currentUser: User;
  onClose: () => void;
  onStartChallenge: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  currentUser,
  onClose,
  onStartChallenge,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Banner */}
        <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-black/20 text-yellow-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-current text-yellow-300" />
            <span>Daily Math Challenge OMI</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            ⚡ 5 Soal Tantangan Hari Ini
          </h3>
          <p className="text-xs sm:text-sm text-yellow-50 mt-1">
            Latih ketajaman berpikir dan penalaran logismu setiap hari!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Current Streak Info */}
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                <Flame className="w-6 h-6 fill-current text-yellow-300" />
              </div>
              <div>
                <div className="font-black text-slate-800 text-base sm:text-lg">
                  {currentUser.streakDays} Hari Berturut-turut!
                </div>
                <div className="text-xs text-orange-800">
                  Konsistensi belajar matematika olimpiade
                </div>
              </div>
            </div>

            <span className="text-xs font-bold bg-white text-orange-700 px-3 py-1.5 rounded-xl border border-orange-200 shadow-2xs">
              🔥 On Fire
            </span>
          </div>

          {/* Challenge Specs */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-600 font-medium">Jumlah Soal:</span>
              <span className="font-bold text-slate-800">5 Soal HOTS / Penalaran</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-600 font-medium">Batas Waktu:</span>
              <span className="font-bold text-slate-800">⏱️ 10 Menit</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-600 font-medium">Tingkat Kesulitan:</span>
              <span className="font-bold text-rose-600">🔴 Sulit & Olimpiade</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-amber-900 font-medium flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Reward Penyelesaian:
              </span>
              <span className="font-black text-amber-700">+120 XP & Pertahankan Streak</span>
            </div>
          </div>

          {/* Streak Milestone Badges */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Target Pencapaian Lencana Streak:
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${currentUser.streakDays >= 3 ? 'bg-orange-100/60 border-orange-300 font-bold text-orange-950' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <div className="text-lg mb-0.5">🔥</div>
                <div className="text-[11px]">3 Hari</div>
                <div className="text-[9px] mt-0.5">{currentUser.streakDays >= 3 ? 'Tercapai ✓' : 'Terkunci'}</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${currentUser.streakDays >= 7 ? 'bg-orange-100/60 border-orange-300 font-bold text-orange-950' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <div className="text-lg mb-0.5">⚡</div>
                <div className="text-[11px]">7 Hari</div>
                <div className="text-[9px] mt-0.5">{currentUser.streakDays >= 7 ? 'Tercapai ✓' : 'Terkunci'}</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${currentUser.streakDays >= 30 ? 'bg-orange-100/60 border-orange-300 font-bold text-orange-950' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <div className="text-lg mb-0.5">🌟</div>
                <div className="text-[11px]">30 Hari</div>
                <div className="text-[9px] mt-0.5">{currentUser.streakDays >= 30 ? 'Tercapai ✓' : 'Terkunci'}</div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onStartChallenge();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-500/25 text-sm transition-all active:scale-95"
            >
              <span>Mulai Tantangan Hari Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
