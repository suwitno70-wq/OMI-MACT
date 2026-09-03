import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { getAllUsers } from '../utils/storage';
import { Award, Flame, UserCheck, Sparkles, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  allUsers?: User[];
  onSwitchUser?: (userId: string) => void;
  onRoleChange?: (role: 'admin' | 'guru' | 'siswa') => void;
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  allUsers,
  onSwitchUser,
  onRoleChange,
  activeTab,
  setActiveTab,
  onSelectTab,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const userList = (allUsers && Array.isArray(allUsers) && allUsers.length > 0)
    ? allUsers
    : getAllUsers();

  const handleNavigateTab = (tab: string) => {
    if (setActiveTab) setActiveTab(tab);
    if (onSelectTab) onSelectTab(tab);
  };

  const handleSelectUser = (user: User) => {
    if (onSwitchUser) {
      onSwitchUser(user.id);
    } else if (onRoleChange) {
      onRoleChange(user.role);
    }
    setShowUserDropdown(false);
    if (user.role === 'admin') handleNavigateTab('admin');
    else if (user.role === 'guru') handleNavigateTab('guru');
    else handleNavigateTab('dashboard');
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <span className="bg-rose-100 text-rose-800 border border-rose-200 text-xs px-2 py-0.5 rounded-full font-semibold">Admin</span>;
      case 'guru':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs px-2 py-0.5 rounded-full font-semibold">Guru</span>;
      default:
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs px-2 py-0.5 rounded-full font-semibold">Siswa</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-850 bg-emerald-800 text-white shadow-lg border-b border-emerald-700/80 no-print">
      {/* Top Banner with Madrasah Branding */}
      <div className="bg-emerald-950/70 px-4 sm:px-6 py-1 text-xs border-b border-emerald-700/50 flex items-center justify-between text-emerald-200">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide truncate">MIN 1 KOTAWARINGIN TIMUR</span>
          <span className="hidden sm:inline text-emerald-400/60">•</span>
          <span className="hidden sm:inline truncate">Olimpiade Madrasah Indonesia (OMI) 2026</span>
        </div>
        <div className="text-[11px] text-emerald-300 font-mono tracking-tight shrink-0 pl-2">
          Disusun By Witno
        </div>
      </div>

      {/* Main Nav Header (Bento Grid Theme) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo and App Title */}
        <div 
          onClick={() => handleNavigateTab(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'guru' ? 'guru' : 'dashboard')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="bg-emerald-100 p-2 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-inner">
              Σ
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                MATH OMI 2026
              </h1>
              <span className="hidden md:inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Prediksi MI
              </span>
            </div>
            <p className="text-emerald-200 text-xs font-medium uppercase tracking-wide mt-1">
              MIN 1 Kotawaringin Timur
            </p>
          </div>
        </div>

        {/* Center Context Label on Desktop */}
        <div className="hidden lg:block text-right pr-2">
          <div className="text-xs sm:text-sm font-semibold text-emerald-100/90">Persiapan Olimpiade Madrasah</div>
          <div className="text-[11px] text-emerald-300/70">Madrasah Ibtidaiyah Kelas 6</div>
        </div>

        {/* User Status Badges & Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser.role === 'siswa' && (
            <>
              {/* Daily Streak */}
              <div 
                title="Latihan Berturut-turut (Daily Streak)"
                className="flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-900 px-3 py-1.5 rounded-2xl border border-emerald-700/80 text-xs cursor-default transition-colors"
              >
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span className="font-bold text-orange-300">{currentUser.streakDays}</span>
                <span className="hidden sm:inline text-emerald-200 text-[11px]">Hari</span>
              </div>

              {/* XP Pill */}
              <div 
                title="Total Skor Pengalaman (XP)"
                className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 px-3 py-1.5 rounded-2xl border border-amber-400/40 text-xs font-bold text-amber-300 cursor-default transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentUser.xp.toLocaleString('id-ID')}</span>
                <span className="text-[10px] text-amber-200/80 font-normal">XP</span>
              </div>
            </>
          )}

          {/* User Profile & Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 bg-emerald-900/70 hover:bg-emerald-900 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border border-emerald-700/80 text-left transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-400/60 flex items-center justify-center text-sm">
                {currentUser.avatar || '👤'}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-white leading-tight max-w-[120px] truncate">
                  {currentUser.nama.split(' ')[0]}
                </div>
                <div className="text-[10px] text-emerald-300 capitalize flex items-center gap-1">
                  <span>{currentUser.role}</span>
                  {currentUser.kelas && <span>• {currentUser.kelas}</span>}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Profil Aktif
                  </div>
                  <div className="font-bold text-slate-800 text-sm truncate">{currentUser.nama}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500">{currentUser.username}</span>
                    {getRoleBadge(currentUser.role)}
                  </div>
                </div>

                <div className="py-2">
                  <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Ganti Peran / Akun Simulasi
                  </div>
                  <div className="space-y-1">
                    {userList.map(user => (
                      <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          user.id === currentUser.id 
                            ? 'bg-emerald-50 text-emerald-900 font-bold' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{user.avatar || '👤'}</span>
                          <div className="text-left truncate">
                            <div className="truncate">{user.nama}</div>
                            <div className="text-[10px] text-slate-400 capitalize">{user.role} {user.kelas ? `(${user.kelas})` : ''}</div>
                          </div>
                        </div>
                        {user.id === currentUser.id ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          getRoleBadge(user.role)
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-2 px-2 text-center">
                  <span className="text-[10px] text-slate-400 font-mono">
                    MATH OMI 2026 • MIN 1 Kotim
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
