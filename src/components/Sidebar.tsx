import React from 'react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  isOpenMobile,
  setIsOpenMobile,
  onLogout,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: string; count?: number }[] = [
    { id: 'dashboard', label: 'Dasbor', icon: 'dashboard' },
    { id: 'browse', label: 'Jelajahi Buku', icon: 'menu_book' },
    { id: 'cart', label: 'Keranjang', icon: 'shopping_bag', count: cartCount },
    { id: 'history', label: 'Riwayat', icon: 'history' },
    { id: 'profile', label: 'Profil', icon: 'person' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#c4c5d7]/30 z-50 flex flex-col justify-between select-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#c4c5d7]/20">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleNavClick('dashboard')}
            >
              <img
                alt="Bibliotech Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UtlkFv6x22jM1r3U2AR3CnChTPdKsuX2lYmILV0mukyaPdHTDtIIVpxt-rGN5nrefkCkNBOgh-c27AuYqKO5q3Trt6a4jMf279zOsSAY519VX0mVqhWobrHxIqwW7gLo9CRnvcX_2BmyGPiBdUbOCzYUqhOTswgGwQ7yQngLgOAOkz1Nq27Keae1jPkk3aeiCkhlTaZUA84gjDx2WMf0gySYOxjKaoCZdLO4b9_7kfpW6t88dUTnzhYCcb"
              />
              <span className="font-serif text-[19px] font-semibold tracking-tight text-[#131b2e]">
                Bibliotech
              </span>
            </div>
            {/* Close button on mobile */}
            <button
              className="p-1 rounded-md text-[#747686] hover:bg-[#eaedff] lg:hidden"
              onClick={() => setIsOpenMobile(false)}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-150 text-left ${
                      isActive
                        ? 'bg-[#eaedff] text-[#0037b0] font-semibold relative before:content-[""] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#1d4ed8] before:rounded-r'
                        : 'text-[#434655] font-medium hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isActive ? 'text-[#0037b0]' : 'text-[#747686]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#1d4ed8] text-white">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Special Highlight: Kirim ke Figma & UI Kit */}
            <div className="mt-5 pt-4 border-t border-[#c4c5d7]/20">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#747686] px-3 mb-2">
                DESAIN & FIGMA
              </div>
              <button
                onClick={() => handleNavClick('figma-tokens')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all border ${
                  activeTab === 'figma-tokens'
                    ? 'bg-[#dce1ff] text-[#001551] font-semibold border-[#1d4ed8]/30 shadow-xs'
                    : 'bg-gradient-to-r from-[#f2f3ff] to-[#eaedff] text-[#0037b0] font-medium border-[#c4c5d7]/30 hover:border-[#1d4ed8]/40 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#0037b0] text-[18px]">
                    token
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-[#131b2e] leading-tight">
                      Kirim ke Figma
                    </span>
                    <span className="text-[10px] text-[#434655]">UI Kit & Design Tokens</span>
                  </div>
                </div>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-bold text-[#0037b0] border border-[#c4c5d7]/40 shadow-2xs">
                  Kit
                </span>
              </button>

              <button
                onClick={() => handleNavClick('login')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all border mt-2 ${
                  activeTab === 'login'
                    ? 'bg-[#dce1ff] text-[#001551] font-semibold border-[#1d4ed8]/30 shadow-xs'
                    : 'bg-white text-[#434655] font-medium border-[#c4c5d7]/30 hover:border-[#1d4ed8]/40 hover:bg-[#f2f3ff]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#0037b0] text-[18px]">
                    login
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-[#131b2e] leading-tight">
                      Tampilan Login
                    </span>
                    <span className="text-[10px] text-[#434655]">Halaman Masuk Anggota</span>
                  </div>
                </div>
                <span className="text-[10px] bg-[#f2f3ff] px-1.5 py-0.5 rounded font-semibold text-[#0037b0]">
                  Screen
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Area: Library Hours & Exit */}
        <div className="p-4 border-t border-[#c4c5d7]/20 flex flex-col gap-3">
          <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-start gap-2.5 border border-[#c4c5d7]/20">
            <span className="material-symbols-outlined text-[#0037b0] text-[18px] mt-0.5">
              schedule
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-[#131b2e] font-semibold">
                Jam Buka Perpustakaan
              </span>
              <span className="text-[11px] text-[#434655]">Sen - Jum: 08.00 - 21.00</span>
              <span className="text-[10px] text-[#006c49] font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                Meja Sirkulasi Buka
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else {
                handleNavClick('login');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#434655] text-sm hover:bg-[#f2f3ff] hover:text-[#ba1a1a] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Keluar Sesi (Ke Login)</span>
          </button>
        </div>
      </aside>
    </>
  );
};
