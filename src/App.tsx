/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, ActiveExamSession, ExamResult, MathCategory } from './types';
import { 
  getCurrentUser, 
  setCurrentUser as persistCurrentUser, 
  getActiveExam, 
  saveActiveExam, 
  getAllQuestions, 
  getAllUsers,
  getLeaderboard,
  initLocalStorage
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { SiswaDashboard } from './components/SiswaDashboard';
import { MateriView } from './components/MateriView';
import { LatihanSelectView } from './components/LatihanSelectView';
import { LatihanExamView } from './components/LatihanExamView';
import { HasilView } from './components/HasilView';
import { SimulasiView } from './components/SimulasiView';
import { LeaderboardView } from './components/LeaderboardView';
import { HasilSayaView } from './components/HasilSayaView';
import { TipsStrategiView } from './components/TipsStrategiView';
import { GuruDashboard } from './components/GuruDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function App() {
  useEffect(() => {
    initLocalStorage();
  }, []);

  const [currentUser, setCurrentUser] = useState<User>(getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeExamSession, setActiveExamSession] = useState<ActiveExamSession | null>(getActiveExam());
  const [currentExamResult, setCurrentExamResult] = useState<ExamResult | null>(null);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState<boolean>(false);

  // Sync user state on role switch
  const handleRoleChange = (role: 'admin' | 'guru' | 'siswa') => {
    const all = getAllUsers();
    const targetUser = all.find(u => u.role === role) || currentUser;
    persistCurrentUser(targetUser);
    setCurrentUser(targetUser);

    // Switch view to appropriate default
    if (role === 'admin') setActiveTab('admin');
    else if (role === 'guru') setActiveTab('guru');
    else setActiveTab('dashboard');
  };

  // Direct switch by user ID (e.g. from navbar account dropdown)
  const handleSwitchUser = (userId: string) => {
    const all = getAllUsers();
    const targetUser = all.find(u => u.id === userId);
    if (targetUser) {
      persistCurrentUser(targetUser);
      setCurrentUser(targetUser);
      if (targetUser.role === 'admin') setActiveTab('admin');
      else if (targetUser.role === 'guru') setActiveTab('guru');
      else setActiveTab('dashboard');
    }
  };

  // Re-check student rank
  const leaderboard = getLeaderboard();
  const studentRankIndex = leaderboard.findIndex(l => l.userId === currentUser.id);
  const studentRank = studentRankIndex !== -1 ? studentRankIndex + 1 : 1;

  // Start a Practice Session
  const handleStartPractice = (options: {
    judul: string;
    materi?: MathCategory;
    questionCount: number;
    durationMinutes: number;
  }) => {
    const allQuestions = getAllQuestions().filter(q => q.status === 'aktif');
    
    // Filter by category if requested, else mixed
    let candidateQuestions = options.materi
      ? allQuestions.filter(q => q.materi === options.materi)
      : [...allQuestions];

    // Shuffle questions
    candidateQuestions.sort(() => Math.random() - 0.5);

    // Take required count
    const selectedQuestions = candidateQuestions.slice(0, Math.min(options.questionCount, candidateQuestions.length));

    const totalSeconds = options.durationMinutes * 60;
    const newSession: ActiveExamSession = {
      id: `session-${Date.now()}`,
      mode: 'latihan',
      judul: options.judul,
      materi: options.materi,
      totalTimeSeconds: totalSeconds,
      remainingSeconds: totalSeconds,
      questions: selectedQuestions,
      userAnswers: {},
      raguStatus: {},
      currentIndex: 0,
      startTime: Date.now(),
      isFinished: false
    };

    saveActiveExam(newSession);
    setActiveExamSession(newSession);
    setCurrentExamResult(null);
  };

  // Start official simulation (30 questions, 60 minutes)
  const handleStartSimulation = (
    packageTitle: string, 
    questionCount: number = 30, 
    durationMinutes: number = 60
  ) => {
    const allQuestions = getAllQuestions().filter(q => q.status === 'aktif');
    
    // Ensure balanced representation across 6 categories
    const categories: MathCategory[] = [
      'Bilangan',
      'Aljabar Dasar',
      'Geometri',
      'Pengukuran',
      'Data & Statistika',
      'Penalaran & HOTS'
    ];

    let simulationSet: typeof allQuestions = [];
    const perCategory = Math.max(1, Math.floor(questionCount / categories.length));

    categories.forEach(cat => {
      const inCat = allQuestions.filter(q => q.materi === cat);
      inCat.sort(() => Math.random() - 0.5);
      simulationSet.push(...inCat.slice(0, perCategory));
    });

    // Fill remaining if needed
    if (simulationSet.length < questionCount) {
      const remaining = allQuestions.filter(q => !simulationSet.some(s => s.id === q.id));
      remaining.sort(() => Math.random() - 0.5);
      simulationSet.push(...remaining.slice(0, questionCount - simulationSet.length));
    }

    // Final shuffle
    simulationSet.sort(() => Math.random() - 0.5);

    const totalSeconds = durationMinutes * 60;
    const newSession: ActiveExamSession = {
      id: `sim-${Date.now()}`,
      mode: 'simulasi',
      judul: packageTitle,
      totalTimeSeconds: totalSeconds,
      remainingSeconds: totalSeconds,
      questions: simulationSet,
      userAnswers: {},
      raguStatus: {},
      currentIndex: 0,
      startTime: Date.now(),
      isFinished: false
    };

    saveActiveExam(newSession);
    setActiveExamSession(newSession);
    setCurrentExamResult(null);
  };

  // Start Daily Challenge (5 HOTS/Olympiad Questions, 10 Minutes)
  const handleStartDailyChallenge = () => {
    const allQuestions = getAllQuestions().filter(q => q.status === 'aktif');
    // Prefer Sulit & Olimpiade
    const hardQuestions = allQuestions.filter(q => 
      q.tingkatKesulitan === 'Olimpiade' || q.tingkatKesulitan === 'Sulit'
    );
    hardQuestions.sort(() => Math.random() - 0.5);
    const selected = hardQuestions.slice(0, 5);

    const totalSeconds = 10 * 60; // 10 minutes
    const newSession: ActiveExamSession = {
      id: `daily-${Date.now()}`,
      mode: 'tantangan',
      judul: '⚡ Daily Math Challenge OMI 2026',
      totalTimeSeconds: totalSeconds,
      remainingSeconds: totalSeconds,
      questions: selected,
      userAnswers: {},
      raguStatus: {},
      currentIndex: 0,
      startTime: Date.now(),
      isFinished: false
    };

    saveActiveExam(newSession);
    setActiveExamSession(newSession);
    setCurrentExamResult(null);
  };

  // Handle Exam Finished
  const handleFinishExam = (result: ExamResult) => {
    setActiveExamSession(null);
    setCurrentExamResult(result);
    // Refresh user stats in view
    setCurrentUser(getCurrentUser());
  };

  // Handle Exit Exam
  const handleExitExam = () => {
    setActiveExamSession(null);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-emerald-50/70 flex flex-col font-sans text-slate-800 selection:bg-emerald-500 selection:text-white pb-16 md:pb-0">
      {/* Primary Header */}
      <Navbar
        currentUser={currentUser}
        allUsers={getAllUsers()}
        onSwitchUser={handleSwitchUser}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCurrentExamResult(null);
        }}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setCurrentExamResult(null);
        }}
        onRoleChange={handleRoleChange}
      />

      {/* Unfinished Exam Sticky Reminder Banner */}
      {activeExamSession && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-sm sticky top-16 z-30 flex items-center justify-between border-b border-amber-600">
          <div className="flex items-center gap-2 max-w-2xl truncate">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              Sesi ujian aktif berjalan: <strong>{activeExamSession.judul}</strong> ({activeExamSession.questions.length} Butir Soal)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentExamResult(null);
                // Active session view is prioritized
              }}
              className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Lanjutkan Pengerjaan
            </button>
            <button
              onClick={() => {
                if (window.confirm('Hapus sesi latihan yang belum selesai ini?')) {
                  saveActiveExam(null);
                  setActiveExamSession(null);
                }
              }}
              className="p-1 hover:text-white"
              title="Batalkan sesi"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If an active exam is ongoing, show the exam view directly */}
        {activeExamSession ? (
          <LatihanExamView
            session={activeExamSession}
            onFinishExam={handleFinishExam}
            onExitExam={handleExitExam}
          />
        ) : currentExamResult ? (
          /* If an exam was just completed, show the evaluation report */
          <HasilView
            result={currentExamResult}
            onRetake={() => {
              if (currentExamResult.mode === 'simulasi') {
                handleStartSimulation(currentExamResult.judulLatihan);
              } else {
                handleStartPractice({
                  judul: currentExamResult.judulLatihan,
                  questionCount: currentExamResult.totalSoal,
                  durationMinutes: Math.round(currentExamResult.durasiDetik / 60) || 20
                });
              }
            }}
            onGoHome={() => {
              setCurrentExamResult(null);
              setActiveTab('dashboard');
            }}
            onExploreMateri={(cat) => {
              setCurrentExamResult(null);
              setActiveTab('materi');
            }}
          />
        ) : (
          /* Role-based & Navigation View Router */
          <>
            {currentUser.role === 'siswa' && (
              <>
                {activeTab === 'dashboard' && (
                  <SiswaDashboard
                    currentUser={currentUser}
                    onNavigate={(tab) => {
                      if (tab === 'simulasi') setActiveTab('simulasi');
                      else if (tab === 'materi') setActiveTab('materi');
                      else if (tab === 'latihan') setActiveTab('latihan');
                      else if (tab === 'hasil') setActiveTab('hasil');
                      else if (tab === 'ranking') setActiveTab('ranking');
                      else if (tab === 'tips') setActiveTab('tips');
                      else setActiveTab(tab);
                    }}
                    onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
                    studentRank={studentRank}
                  />
                )}

                {activeTab === 'materi' && (
                  <MateriView
                    onStartPracticeCategory={(category) => {
                      handleStartPractice({
                        judul: `Latihan Intensif Materi ${category}`,
                        materi: category,
                        questionCount: 10,
                        durationMinutes: 20
                      });
                    }}
                  />
                )}

                {activeTab === 'latihan' && (
                  <LatihanSelectView
                    onStartPractice={handleStartPractice}
                  />
                )}

                {activeTab === 'simulasi' && (
                  <SimulasiView
                    onStartSimulation={handleStartSimulation}
                  />
                )}

                {activeTab === 'hasil' && (
                  <HasilSayaView
                    currentUser={currentUser}
                    onRetake={() => setActiveTab('latihan')}
                  />
                )}

                {activeTab === 'ranking' && (
                  <LeaderboardView />
                )}

                {activeTab === 'tips' && (
                  <TipsStrategiView />
                )}
              </>
            )}

            {currentUser.role === 'guru' && (
              <GuruDashboard />
            )}

            {currentUser.role === 'admin' && (
              <AdminDashboard />
            )}
          </>
        )}
      </main>

      {/* Daily Challenge Modal */}
      {isDailyChallengeOpen && (
        <DailyChallengeModal
          currentUser={currentUser}
          onClose={() => setIsDailyChallengeOpen(false)}
          onStartChallenge={handleStartDailyChallenge}
        />
      )}

      {/* Official Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar (Hidden when actively in exam) */}
      {!activeExamSession && (
        <BottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setCurrentExamResult(null);
          }}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setCurrentExamResult(null);
          }}
          role={currentUser.role}
          userRole={currentUser.role}
        />
      )}
    </div>
  );
}

