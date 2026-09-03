import React, { useState } from 'react';
import { Question, User, MathCategory, QuestionDifficulty } from '../types';
import { 
  getAllQuestions, 
  saveQuestion, 
  deleteQuestion, 
  getAllUsers, 
  saveUser, 
  resetAllData,
  exportResultsToCSV
} from '../utils/storage';
import { GOOGLE_APPS_SCRIPT_CODE } from '../utils/gasCode';
import { AiQuestionGeneratorModal } from './AiQuestionGeneratorModal';
import { 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Layers,
  Sparkles,
  FileCode
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'soal' | 'users' | 'config' | 'gas'>('soal');
  const [questions, setQuestions] = useState<Question[]>(getAllQuestions());
  const [users, setUsers] = useState<User[]>(getAllUsers());
  
  // AI Question Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  
  // Question Form Modal State
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  
  // GAS Web App URL state
  const [gasUrl, setGasUrl] = useState(localStorage.getItem('math_omi_gas_url') || '');
  const [copiedCode, setCopiedCode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Exam Configuration state
  const [simDuration, setSimDuration] = useState(60);
  const [simQuestionsCount, setSimQuestionsCount] = useState(30);
  const [allowShuffle, setAllowShuffle] = useState(true);

  // New question template
  const defaultNewQ: Question = {
    id: `OMI-${Date.now().toString().slice(-4)}`,
    materi: 'Bilangan',
    submateri: 'Operasi Bilangan & Pola',
    tingkatKesulitan: 'Olimpiade',
    levelPenalaran: 'Level 4 – Olympic Challenge',
    jenisSoal: 'pilihan_ganda',
    pertanyaan: '',
    pilihan: {
      A: '',
      B: '',
      C: '',
      D: ''
    },
    kunciJawaban: 'A',
    pembahasan: '',
    tipsPenyelesaian: '',
    konsep: ['Bilangan Bulat'],
    waktuRekomendasiMenit: 2,
    bobotNilai: 4,
    referensi: 'Prediksi OMI 2026 MIN 1 Kotim',
    status: 'aktif'
  };

  const handleOpenNewQuestion = () => {
    setEditingQuestion({
      ...defaultNewQ,
      id: `OMI-${Date.now().toString().slice(-4)}`
    });
    setIsNewQuestion(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    saveQuestion(editingQuestion);
    setQuestions(getAllQuestions());
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Yakin ingin menghapus butir soal ini?')) {
      deleteQuestion(id);
      setQuestions(getAllQuestions());
    }
  };

  const handleSaveGasUrl = () => {
    localStorage.setItem('math_omi_gas_url', gasUrl);
    setSyncStatus('success');
    setTimeout(() => setSyncStatus('idle'), 3000);
  };

  const handleCopyGasCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi default awal? Semua progres latihan siswa akan kembali ke setelan pabrik.')) {
      resetAllData();
      setQuestions(getAllQuestions());
      setUsers(getAllUsers());
      alert('Data berhasil direset ke setelan awal.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Admin Cockpit Header */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-600/60 mb-2">
              <Settings className="w-3.5 h-3.5 text-amber-300" />
              <span>Panel Kontrol Administrator OMI 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Pusat Manajemen Bank Soal & Sistem
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Kelola butir soal, integrasi basis data Google Sheets, konfigurasi simulasi, dan hak akses pengguna MIN 1 Kotim.
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-2 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors border border-rose-500/50 self-start sm:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Default</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('soal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'soal'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bank Soal ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Kelola Pengguna ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'config'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Konfigurasi Ujian</span>
        </button>

        <button
          onClick={() => setActiveTab('gas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'gas'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Google Sheets & GAS</span>
        </button>
      </div>

      {/* TAB 1: BANK SOAL CRUD (Prompt #17) */}
      {activeTab === 'soal' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
                Koleksi Bank Soal Prediksi OMI 2026
              </h3>
              <p className="text-xs text-slate-500">
                Total {questions.length} butir soal terverifikasi mencakup 6 domain materi olimpiade madrasah.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-100 animate-pulse" />
                <span>AI Generator Soal</span>
              </button>

              <button
                onClick={handleOpenNewQuestion}
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Manual</span>
              </button>
            </div>
          </div>

          {/* Question Cards List */}
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border">
                        #{idx + 1} • {q.id}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                        {q.materi}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                        {q.tingkatKesulitan}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${q.status === 'aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {q.status === 'aktif' ? 'Aktif' : 'Draft'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800 pt-1 leading-relaxed">
                      {q.pertanyaan}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setEditingQuestion(q);
                        setIsNewQuestion(false);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors"
                      title="Edit Soal"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 transition-colors"
                      title="Hapus Soal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  {(['A', 'B', 'C', 'D'] as const).map(k => (
                    <div
                      key={k}
                      className={`p-2 rounded-lg border ${
                        q.kunciJawaban === k 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' 
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="mr-1">{k}.</span> {q.pilihan[k]}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Strategi Cepat:</span> {q.tipsPenyelesaian}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA PENGGUNA (Prompt #16) */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Manajemen Pengguna (Role-Based Access)
              </h3>
              <p className="text-xs text-slate-500">
                Kelola kredensial akun Admin, Guru Pembina, dan Peserta Didik MIN 1 Kotim.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Kelas / Jabatan</th>
                  <th className="p-3">NIS</th>
                  <th className="p-3 text-center">XP</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                      <span>{u.avatar || '👤'}</span>
                      <span>{u.nama}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-800' : u.role === 'guru' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{u.kelas || '-'}</td>
                    <td className="p-3 font-mono text-slate-500">{u.nis || '-'}</td>
                    <td className="p-3 text-center font-mono font-bold text-amber-700">{u.xp} XP</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px]">
                        Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KONFIGURASI SIMULASI (Prompt #16) */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Pengaturan Parameter Simulasi & Latihan
            </h3>
            <p className="text-xs text-slate-500">
              Konfigurasikan durasi, ambang batas waktu, dan perilaku sistem pengacakan soal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="font-bold text-slate-800 block">
                Durasi Standar Simulasi (Menit):
              </label>
              <input
                type="number"
                value={simDuration}
                onChange={(e) => setSimDuration(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold"
              />
              <span className="text-[11px] text-slate-400 block">Default resmi OMI: 60 menit</span>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="font-bold text-slate-800 block">
                Jumlah Soal per Paket Simulasi:
              </label>
              <input
                type="number"
                value={simQuestionsCount}
                onChange={(e) => setSimQuestionsCount(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold"
              />
              <span className="text-[11px] text-slate-400 block">Default resmi OMI: 30 soal pilihan ganda</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800 text-xs sm:text-sm">Pengacakan Otomatis (Shuffle Engine)</div>
              <div className="text-xs text-slate-500">Acak urutan butir soal dan opsi pilihan ganda di setiap sesi</div>
            </div>
            <input
              type="checkbox"
              checked={allowShuffle}
              onChange={(e) => setAllowShuffle(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* TAB 4: GOOGLE SHEETS & GAS INTEGRATION (Prompt #18) */}
      {activeTab === 'gas' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Integrasi Google Sheets & Google Apps Script (Prompt #18)</span>
            </div>
            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg">
              Koneksi Backend Google Apps Script
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gunakan Google Sheets gratis sebagai basis data cloud real-time tanpa biaya server. Data siswa, bank soal, dan riwayat nilai tersinkronisasi otomatis.
            </p>
          </div>

          {/* Web App URL Config */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              URL Web App Google Apps Script:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={gasUrl}
                onChange={(e) => setGasUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSaveGasUrl}
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Simpan URL</span>
              </button>
            </div>
            {syncStatus === 'success' && (
              <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> URL Web App berhasil disimpan ke konfigurasi sistem!
              </div>
            )}
          </div>

          {/* 7 Required Sheets Specs (Prompt #18) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              7 Tabel Spreadsheet yang Dibuat Otomatis:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {['Users', 'Bank_Soal', 'Materi', 'Hasil_Latihan', 'Ranking', 'Konfigurasi', 'Log_Aktivitas'].map(s => (
                <div key={s} className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 font-mono font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy-paste Ready GAS Code Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-emerald-700" />
                <span>Kode Google Apps Script Lengkap (Code.gs):</span>
              </h4>
              <button
                onClick={handleCopyGasCode}
                className="inline-flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Tersalin!' : 'Salin Semua Kode'}</span>
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 text-emerald-400 font-mono text-[11px] leading-relaxed max-h-64 overflow-y-auto border border-slate-800">
              <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION EDITOR MODAL */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="font-black text-slate-800 text-base">
                  {isNewQuestion ? 'Tambah Butir Soal Baru' : 'Edit Butir Soal'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setEditingQuestion(null);
                    setIsAiModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gunakan AI Generator</span>
                </button>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori Domain:</label>
                  <select
                    value={editingQuestion.materi}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, materi: e.target.value as MathCategory })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Bilangan">Bilangan</option>
                    <option value="Aljabar Dasar">Aljabar Dasar</option>
                    <option value="Geometri">Geometri</option>
                    <option value="Pengukuran">Pengukuran</option>
                    <option value="Data & Statistika">Data & Statistika</option>
                    <option value="Penalaran & HOTS">Penalaran & HOTS</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tingkat Kesulitan:</label>
                  <select
                    value={editingQuestion.tingkatKesulitan}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, tingkatKesulitan: e.target.value as QuestionDifficulty })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                    <option value="HOTS">HOTS</option>
                    <option value="Olimpiade">Olimpiade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Teks Pertanyaan:</label>
                <textarea
                  rows={3}
                  required
                  value={editingQuestion.pertanyaan}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, pertanyaan: e.target.value })}
                  placeholder="Tuliskan soal cerita atau masalah matematika..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Choices A, B, C, D */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Pilihan Jawaban (A, B, C, D):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(['A', 'B', 'C', 'D'] as const).map(k => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 shrink-0">
                        {k}
                      </span>
                      <input
                        type="text"
                        required
                        value={editingQuestion.pilihan[k]}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          pilihan: { ...editingQuestion.pilihan, [k]: e.target.value }
                        })}
                        placeholder={`Pilihan ${k}`}
                        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kunci Jawaban Benar:</label>
                  <select
                    value={editingQuestion.kunciJawaban}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, kunciJawaban: e.target.value as any })}
                    className="w-full p-2.5 bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 rounded-xl"
                  >
                    <option value="A">Opsi A</option>
                    <option value="B">Opsi B</option>
                    <option value="C">Opsi C</option>
                    <option value="D">Opsi D</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Butir Soal:</label>
                  <select
                    value={editingQuestion.status}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="aktif">Aktif Digunakan</option>
                    <option value="nonaktif">Nonaktif (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pembahasan Bertahap:</label>
                <textarea
                  rows={3}
                  required
                  value={editingQuestion.pembahasan}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, pembahasan: e.target.value })}
                  placeholder="Langkah 1... Langkah 2... Mudah dipahami siswa kelas 6..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Trik Cepat Olimpiade:</label>
                <input
                  type="text"
                  value={editingQuestion.tipsPenyelesaian}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, tipsPenyelesaian: e.target.value })}
                  placeholder="Strategi cepat atau trik penyelesaian..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-700 shadow-sm"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* AI Question Generator Modal */}
      <AiQuestionGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onQuestionsAdded={() => {
          setQuestions(getAllQuestions());
        }}
      />
    </div>
  );
};
