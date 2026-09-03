import React, { useState } from 'react';
import { Question, ExamResult } from '../types';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  Zap, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface PembahasanModalProps {
  result: ExamResult;
  onClose: () => void;
}

export const PembahasanModal: React.FC<PembahasanModalProps> = ({ result, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const questions = (result?.questionsSnapshot && Array.isArray(result.questionsSnapshot) && result.questionsSnapshot.length > 0)
    ? result.questionsSnapshot 
    : [];

  const currentQ: Question | undefined = questions[activeIdx];
  if (!currentQ) {
    return null;
  }

  const userAnswers = result?.userAnswers || {};
  const userAns = userAnswers[currentQ.id];
  const isCorrect = userAns === currentQ.kunciJawaban;
  const isUnanswered = !userAns;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Pembahasan Lengkap OMI 2026
              </span>
              <span className="text-xs text-slate-400">
                • {result.judulLatihan}
              </span>
            </div>
            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg mt-0.5">
              Soal {activeIdx + 1} dari {questions.length}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Number Selector Strip */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {(questions || []).map((q, idx) => {
            const ans = userAnswers[q.id];
            const isQCorrect = ans === q.kunciJawaban;
            const isQUnanswered = !ans;
            const isCurrent = activeIdx === idx;

            let badgeClass = 'bg-slate-200 text-slate-600';
            if (isQCorrect) badgeClass = 'bg-emerald-600 text-white';
            else if (!isQUnanswered) badgeClass = 'bg-rose-500 text-white';

            if (isCurrent) badgeClass += ' ring-2 ring-slate-900 font-black scale-105';

            return (
              <button
                key={q.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center ${badgeClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Question Status Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            isCorrect 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : isUnanswered
              ? 'bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : isUnanswered ? (
                <HelpCircle className="w-6 h-6 text-slate-400 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              )}
              <div>
                <div className="font-extrabold text-sm sm:text-base">
                  {isCorrect ? 'Jawaban Kamu Benar! 🎉' : isUnanswered ? 'Soal Tidak Dijawab' : 'Jawaban Kamu Kurang Tepat'}
                </div>
                <div className="text-xs opacity-90 mt-0.5">
                  Jawaban Kamu: <span className="font-bold">{userAns || 'Kosong'}</span> • Kunci Jawaban: <strong className="font-black text-emerald-700">{currentQ.kunciJawaban}</strong>
                </div>
              </div>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/80 border border-current shadow-2xs shrink-0">
              {currentQ.tingkatKesulitan}
            </span>
          </div>

          {/* Question Text */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Pertanyaan:
            </div>
            <div className="text-sm sm:text-base font-semibold text-slate-800 whitespace-pre-line leading-relaxed">
              {currentQ.pertanyaan}
            </div>

            {/* Choices Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(['A', 'B', 'C', 'D'] as const).map(key => {
                const isKeyCorrect = currentQ.kunciJawaban === key;
                const isKeyChosen = userAns === key;

                let choiceStyle = 'bg-white border-slate-200 text-slate-700';
                if (isKeyCorrect) {
                  choiceStyle = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold';
                } else if (isKeyChosen && !isKeyCorrect) {
                  choiceStyle = 'bg-rose-100/80 border-rose-300 text-rose-950 line-through';
                }

                return (
                  <div key={key} className={`p-2.5 rounded-xl border flex items-center gap-2 ${choiceStyle}`}>
                    <span className="w-5 h-5 rounded-md bg-white/80 border text-[11px] font-bold flex items-center justify-center shrink-0">
                      {key}
                    </span>
                    <span className="truncate">{currentQ.pilihan[key]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Explanation (Prompt #9 Pembahasan) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Pembahasan Bertahap (Proses Penyelesaian)</span>
            </h4>
            <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
              {currentQ.pembahasan}
            </div>
          </div>

          {/* Strategi Cepat / Trik Cepat (Prompt #9) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Strategi Cepat (Trik Olimpiade)</span>
            </h4>
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/90 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                {currentQ.tipsPenyelesaian}
              </div>
            </div>
          </div>

          {/* Konsep yang Digunakan (Prompt #9) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Konsep yang Digunakan:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(currentQ.konsep || []).map((c, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-200">
                  🏷️ {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-slate-50 rounded-b-3xl">
          <button
            disabled={activeIdx === 0}
            onClick={() => setActiveIdx(activeIdx - 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Soal Sebelumnya</span>
          </button>

          <button
            disabled={activeIdx === questions.length - 1}
            onClick={() => setActiveIdx(activeIdx + 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-40"
          >
            <span>Soal Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
