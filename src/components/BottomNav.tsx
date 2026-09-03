import React from 'react';
import { UserRole } from '../types';
import { Home, BookOpen, PenTool, Trophy, BarChart3, Users, Settings } from 'lucide-react';

interface BottomNavProps {
  role?: UserRole;
  userRole?: UserRole;
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  role, 
  userRole, 
  activeTab, 
  setActiveTab,
  onSelectTab 
}) => {
  const effectiveRole = role || userRole || 'siswa';

  // Mobile items for Siswa
  const siswaTabs = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'latihan', label: 'Latihan', icon: PenTool },
    { id: 'simulasi', label: 'Simulasi', icon: Trophy },
    { id: 'hasil', label: 'Hasil', icon: BarChart3 },
  ];

  // Mobile items for Guru
  const guruTabs = [
    { id: 'guru', label: 'Dashboard', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'soal_guru', label: 'Bank Soal', icon: PenTool },
    { id: 'analisis_guru', label: 'Analisis', icon: BarChart3 },
  ];

  // Mobile items for Admin
  const adminTabs = [
    { id: 'admin', label: 'Dashboard', icon: Home },
    { id: 'soal_admin', label: 'Kelola Soal', icon: PenTool },
    { id: 'users_admin', label: 'Pengguna', icon: Users },
    { id: 'gas_sync', label: 'GAS/Sheets', icon: Settings },
  ];

  const currentTabs = effectiveRole === 'admin' ? adminTabs : effectiveRole === 'guru' ? guruTabs : siswaTabs;

  const handleTabClick = (tabId: string) => {
    if (setActiveTab) setActiveTab(tabId);
    if (onSelectTab) onSelectTab(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_16px_rgba(16,185,129,0.08)] md:hidden no-print">
      <div className="grid grid-flow-col auto-cols-fr max-w-md mx-auto px-2 py-1.5">
        {(currentTabs || []).map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[50px] transition-colors rounded-2xl relative ${
                isActive ? 'text-emerald-800 font-bold bg-emerald-50/80' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight truncate max-w-[64px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
