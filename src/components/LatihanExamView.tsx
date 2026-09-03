import React, { useState, useEffect } from 'react';
import { ActiveExamSession, Question, ExamResult } from '../types';
import { saveActiveExam, evaluateExam, saveResult } from '../utils/storage';
import { 
  Clock, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle,
  Send,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LatihanExamViewProps {
  session: ActiveExamSession;
  onFinishExam: (result: ExamResult) => void;
  onExitExam: () => void;
}

export const LatihanExamView: React.FC<LatihanExamViewProps> = ({
  session,
  onFinishExam,
  onExitExam,
}) => {
  const [currentSession, setCurrentSession] = useState<ActiveExamSession>(session);
  const [remainingTime, setRemainingTime] = useState<number>(session.remainingSeconds);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Sync session prop to state if it changes
  useEffect(() => {
    setCurrentSession(session);
    setRemainingTime(session.remainingSeconds);
  }, [session.id]);

  // Timer interval countdown
  useEffect(() => {
    if (remainingTime <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime(prev => {
        const next = Math.max(0, prev - 1);
        // Persist to local storage every 5 seconds or when low
        if (next % 5 === 0 || next < 30) {
          saveActiveExam({
            ...currentSession,
            remainingSeconds: next
          });
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, currentSession]);

  const currentQ: Question | undefined = currentSession.questions[currentSession.currentIndex];

  const handleSelectAnswer = (choiceKey: string) => {
    if (!currentQ) return;
    const newAnswers = {
      ...currentSession.userAnswers,
      [currentQ.id]: choiceKey
    };

    const updatedSession: ActiveExamSession = {
      ...currentSession,
      userAnswers: newAnswers,
      remainingSeconds: remainingTime
    };

    setCurrentSession(updatedSession);
    saveActiveExam(updatedSession);
  };

  const handleToggleRagu = () => {
    if (!currentQ) return;
    const currentRagu = !!currentSession.raguStatus[currentQ.id];
    const newRagu = {
      ...currentSession.raguStatus,
      [currentQ.id]: !currentRagu
    };

    const updatedSession: ActiveExamSession = {
      ...currentSession,
      raguStatus: newRagu,
      remainingSeconds: remainingTime
    };

    setCurrentSession(updatedSession);
    saveActiveExam(updatedSession);
  };

  const handleNavigateIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= currentSession.questions.length) return;
    const updatedSession: ActiveExamSession = {
      ...currentSession,
      currentIndex: newIndex,
      remainingSeconds: remainingTime
    };
    setCurrentSession(updatedSession);
    saveActiveExam(updatedSession);
  };

  const handleFinalSubmit = () => {
    const elapsedSeconds = currentSession.totalTimeSeconds - remainingTime;
    const result = evaluateExam(
      currentSession.questions,
      currentSession.userAnswers,
      elapsedSeconds,
      currentSession.mode,
      currentSession.judul
    );

    saveResult(result);
    saveActiveExam(null); // Clear active exam cache

    if (result.skor >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onFinishExam(result);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Answer stats for quick overview
  const totalQuestions = currentSession.questions.length;
  const answeredCount = Object.keys(currentSession.userAnswers).length;
  const raguCount = Object.values(currentSession.raguStatus).filter(Boolean).length;
  const unattemptedCount = totalQuestions - answeredCount;

  if (!currentQ) return null;

  const currentAnswer = currentSession.userAnswers[currentQ.id];
  const isRagu = !!currentSession.raguStatus[currentQ.id];
  const isUrgent = remainingTime < 300; // less than 5 minutes

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Top Exam Header Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              {currentSession.mode === 'simulasi' ? 'Simulasi OMI 2026' : 'Latihan Matematika'}
            </span>
            <span className="text-xs text-slate-400">• {currentSession.materi || 'Semua Materi'}</span>
          </div>
          <h2 className="font-extrabold text-slate-800 text-sm sm:text-base">
            {currentSession.judul}
          </h2>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold font-mono transition-all ${
            isUrgent 
              ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse' 
              : 'bg-slate-100 text-slate-800 border-slate-200'
          }`}>
            <Clock className="w-4 h-4 text-slate-500" />
            <span>⏱️ {formatTime(remainingTime)}</span>
          </div>

          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-xs text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* Question Number Palette (Prompt #8) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
          <span className="font-semibold text-slate-700">Nomor Soal:</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Dijawab ({answeredCount})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Ragu ({raguCount})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Kosong ({unattemptedCount})
            </span>
          </div>
        </div>

        {/* 1..N Number Buttons */}
        <div className="flex flex-wrap gap-2">
          {currentSession.questions.map((q, idx) => {
            const isAns = !!currentSession.userAnswers[q.id];
            const isR = !!currentSession.raguStatus[q.id];
            const isCurr = currentSession.currentIndex === idx;

            let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
            if (isR) {
              btnStyle = 'bg-amber-500 text-white border-amber-600 shadow-xs';
            } else if (isAns) {
              btnStyle = 'bg-emerald-600 text-white border-emerald-700 shadow-xs';
            }

            if (isCurr) {
              btnStyle += ' ring-2 ring-slate-900 ring-offset-2 scale-105 font-black';
            }

            return (
              <button
                key={q.id}
                onClick={() => handleNavigateIndex(idx)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${btnStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        {/* Question Metadata */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black text-slate-800">
              Soal Nomor {currentSession.currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">/ {totalQuestions}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
              {currentQ.tingkatKesulitan}
            </span>
            <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-medium hidden sm:inline">
              {currentQ.materi}
            </span>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium whitespace-pre-line select-text">
          {currentQ.pertanyaan}
        </div>

        {/* Choices Options (Large, easy-to-touch targets >= 44px) */}
        <div className="space-y-3 pt-2">
          {(['A', 'B', 'C', 'D'] as const).map(key => {
            const isSelected = currentAnswer === key;
            const choiceText = currentQ.pilihan[key];

            return (
              <div
                key={key}
                onClick={() => handleSelectAnswer(key)}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all active:scale-[0.99] min-h-[50px] ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-600'
                    : 'bg-white border-slate-200/90 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {key}
                </div>
                <div className="text-xs sm:text-sm leading-relaxed pt-1 flex-1">
                  {choiceText}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls: Sebelumnya, Ragu, Selanjutnya, Selesai (Prompt #8) */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            disabled={currentSession.currentIndex === 0}
            onClick={() => handleNavigateIndex(currentSession.currentIndex - 1)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Ragu-Ragu Toggle Button */}
          <button
            onClick={handleToggleRagu}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              isRagu
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
          >
            <Flag className="w-4 h-4 fill-current" />
            <span>{isRagu ? 'Ditandai Ragu' : 'Ragu-Ragu'}</span>
          </button>

          {currentSession.currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => handleNavigateIndex(currentSession.currentIndex + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 shadow-sm transition-all"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-500 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Selesai & Kumpulkan</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Submit Action on Mobile */}
      <div className="flex justify-end pt-1">
        <button
          onClick={() => setShowConfirmSubmit(true)}
          className="text-xs text-emerald-800 font-bold bg-emerald-100/90 hover:bg-emerald-200 px-4 py-2 rounded-xl border border-emerald-300 transition-colors flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Selesai Sekarang ({answeredCount}/{totalQuestions} Terjawab)</span>
        </button>
      </div>

      {/* Confirm Submit Dialog Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  Kumpulkan Hasil Latihan?
                </h3>
                <p className="text-xs text-slate-500">
                  Periksa ringkasan jawabanmu sebelum dinilai.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 mb-5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Soal:</span>
                <span className="font-bold text-slate-800">{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Sudah Dijawab:</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>Ditandai Ragu:</span>
                <span className="font-bold">{raguCount}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Belum Dijawab:</span>
                <span className="font-bold">{unattemptedCount}</span>
              </div>
            </div>

            {unattemptedCount > 0 && (
              <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl mb-4">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Masih ada {unattemptedCount} soal yang belum dijawab. Yakin ingin mengumpulkan sekarang?</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Kembali Periksa
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  handleFinalSubmit();
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="font-extrabold text-slate-800 text-base mb-2">
              Keluar dari Sesi Latihan?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              Progres jawaban dan sisa waktumu tersimpan di memori perangkat (LocalStorage). Kamu dapat melanjutkannya kapan saja.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Lanjutkan Latihan
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onExitExam();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm"
              >
                Keluar ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
