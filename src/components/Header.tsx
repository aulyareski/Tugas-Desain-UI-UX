import React, { useState } from 'react';
import { ActiveTab, MemberProfile } from '../types';

interface HeaderProps {
  user: MemberProfile;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenMobileNav: () => void;
  onOpenFigmaDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenMobileNav,
  onOpenFigmaDrawer,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveTab('browse');
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#c4c5d7]/30 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Mobile Hamburger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileNav}
          className="p-2 -ml-2 rounded-lg text-[#434655] hover:bg-[#f2f3ff] lg:hidden"
          aria-label="Buka Menu Navigasi"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#747686] text-[20px] pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full h-10 pl-10 pr-10 bg-[#faf8ff] border border-[#c4c5d7]/60 rounded-lg text-sm text-[#131b2e] placeholder:text-[#747686] focus:outline-none focus:border-[#0037b0] focus:ring-2 focus:ring-[#0037b0]/20 transition-all"
            placeholder="Cari judul, penulis, atau ISBN (Tekan Enter)..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#747686] hover:text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Figma Quick Action Button */}
        <button
          onClick={() => setActiveTab('figma-tokens')}
          className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-[#faf8ff] hover:bg-[#eaedff] border border-[#c4c5d7]/60 text-xs font-semibold text-[#0037b0] transition-colors"
          title="Lihat UI Kit & Export ke Figma"
        >
          <span className="material-symbols-outlined text-[17px] text-[#0037b0]">palette</span>
          <span>Figma UI Kit</span>
          <span className="text-[10px] bg-[#dce1ff] text-[#001551] px-1.5 py-0.2 rounded font-bold">
            Export
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
            type="button"
            aria-label="Pemberitahuan Sirkulasi"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c4c5d7]/40 p-4 z-50 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-[#c4c5d7]/20">
                <span className="font-semibold text-xs text-[#131b2e] uppercase tracking-wider">
                  Pemberitahuan Sirkulasi
                </span>
                <span className="text-[10px] text-[#0037b0] font-medium cursor-pointer hover:underline">
                  Tandai Dibaca
                </span>
              </div>
              <div className="divide-y divide-[#c4c5d7]/15 mt-2 max-h-64 overflow-y-auto">
                <div className="py-2.5 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#623c00] text-[18px] mt-0.5">
                    warning
                  </span>
                  <div>
                    <p className="text-xs text-[#131b2e] font-medium">
                      Pengingat: <em>Refactoring UI</em> jatuh tempo dalam 2 hari!
                    </p>
                    <span className="text-[10px] text-[#747686]">Hari ini, 10:15 WIB</span>
                  </div>
                </div>
                <div className="py-2.5 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#006c49] text-[18px] mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <p className="text-xs text-[#131b2e] font-medium">
                      Salinan <em>Designing Data-Intensive Applications</em> telah disiapkan di Rak B4.
                    </p>
                    <span className="text-[10px] text-[#747686]">Kemarin, 14:00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#c4c5d7]/40"></div>

        {/* Member Profile Trigger */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-[#f2f3ff] transition-colors text-left"
        >
          <div className="relative shrink-0">
            <img
              alt={`Foto Profil ${user.name}`}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c4c5d7]/40"
              src={user.avatarUrl}
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006c49] ring-2 ring-white"></span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-[#131b2e] leading-tight">
              {user.name}
            </span>
            <span className="text-[11px] text-[#434655]">{user.status}</span>
          </div>
        </button>
      </div>
    </header>
  );
};
