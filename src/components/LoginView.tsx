import React, { useState } from 'react';
import { MemberProfile, ActiveTab } from '../types';

interface LoginViewProps {
  user: MemberProfile;
  onLoginSuccess: (userName?: string) => void;
  onContinueAsGuest: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onShowToast: (msg: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  user,
  onLoginSuccess,
  onContinueAsGuest,
  setActiveTab,
  onShowToast,
}) => {
  const [loginMethod, setLoginMethod] = useState<'id' | 'email'>('id');
  const [identifier, setIdentifier] = useState(user.memberId);
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      onShowToast('Silakan masukkan Nomor Anggota atau Email Institusi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onShowToast(`Selamat datang kembali, ${user.name}! Sesi sirkulasi aktif.`);
      onLoginSuccess(user.name);
    }, 1000);
  };

  const handleQuickLoginAulya = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onShowToast(`Autentikasi berhasil: ${user.name} (#LIB-9842)`);
      onLoginSuccess(user.name);
    }, 600);
  };

  const handleSsoGoogle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onShowToast(`Berhasil masuk via SSO Kampus (${user.email})`);
      onLoginSuccess(user.name);
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8ff] text-[#131b2e] flex flex-col justify-between">
      {/* Top Floating Mini Header */}
      <header className="h-16 px-6 sm:px-12 flex items-center justify-between border-b border-[#c4c5d7]/30 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={onContinueAsGuest}
        >
          <img
            alt="Bibliotech Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UtlkFv6x22jM1r3U2AR3CnChTPdKsuX2lYmILV0mukyaPdHTDtIIVpxt-rGN5nrefkCkNBOgh-c27AuYqKO5q3Trt6a4jMf279zOsSAY519VX0mVqhWobrHxIqwW7gLo9CRnvcX_2BmyGPiBdUbOCzYUqhOTswgGwQ7yQngLgOAOkz1Nq27Keae1jPkk3aeiCkhlTaZUA84gjDx2WMf0gySYOxjKaoCZdLO4b9_7kfpW6t88dUTnzhYCcb"
          />
          <span className="font-serif text-[19px] font-semibold tracking-tight text-[#131b2e]">
            Bibliotech
          </span>
          <span className="hidden sm:inline text-xs text-[#747686] border-l border-[#c4c5d7]/60 pl-2 ml-1">
            Digital Lending Library
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('figma-tokens')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#0037b0] border border-[#c4c5d7]/40 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">token</span>
            <span>Figma UI Kit</span>
          </button>

          <button
            onClick={onContinueAsGuest}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#434655] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1"
          >
            <span>Jelajahi sebagai Tamu</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </header>

      {/* Main Login Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative overflow-hidden">
        {/* Ambient background blur elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0037b0]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#6cf8bb]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-[#c4c5d7]/40 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
          {/* Left Hero Pane (Academic Brand & Value Proposition, 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0037b0] via-[#1d4ed8] to-[#001551] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background geometric lines */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none"></div>
            <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none"></div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold uppercase tracking-wider text-[#cad3ff] border border-white/20 mb-6">
                <span className="material-symbols-outlined text-[15px]">school</span>
                <span>KONSORSIUM PERPUSTAKAAN AKADEMIK</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight text-white mb-4">
                Akses Koleksi Pengetahuan Dunia
              </h2>

              <p className="text-sm text-[#cad3ff] leading-relaxed mb-6 font-normal">
                Satu akun terintegrasi untuk peminjaman buku fisik di seluruh rak sirkulasi universitas, akses ribuan e-book berlisensi DRM, dan reservasi otomatis loker 24/7.
              </p>

              {/* Institutional Stats Box */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <div className="font-serif text-2xl font-bold text-white">24.500+</div>
                  <div className="text-[11px] text-[#cad3ff]">Judul Terkatalog</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <div className="font-serif text-2xl font-bold text-white">24 / 7</div>
                  <div className="text-[11px] text-[#cad3ff]">Loker Pintar Mandiri</div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="pt-8 border-t border-white/15 mt-8">
              <p className="font-serif italic text-xs text-white/90 leading-relaxed">
                "Perpustakaan adalah ruang di mana imajinasi dan pengetahuan masa lampau bertemu dengan penemuan masa depan."
              </p>
              <div className="flex items-center justify-between mt-3 text-[11px] text-[#cad3ff]">
                <span>Sirkulasi Pusat &amp; Sayap Komputasi</span>
                <span className="font-mono text-[10px] text-white/70">#TLS-256</span>
              </div>
            </div>
          </div>

          {/* Right Form Pane (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Header inside form */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#0037b0] font-semibold">
                  PORTAL SIRKULASI MAHASISWA
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6cf8bb]/30 text-[#006c49]">
                  Sistem Aktif
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#131b2e] tracking-tight">
                Masuk ke Akun Perpustakaan
              </h1>
              <p className="text-xs text-[#434655] mt-1 mb-6">
                Masukkan ID Anggota perpustakaan atau akun email institusi Anda.
              </p>

              {/* Login Method Tabs */}
              <div className="flex items-center bg-[#f2f3ff] p-1 rounded-xl mb-6 border border-[#c4c5d7]/30">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('id');
                    setIdentifier(user.memberId);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'id'
                      ? 'bg-white text-[#0037b0] shadow-2xs font-bold'
                      : 'text-[#434655] hover:text-[#131b2e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>ID Anggota (#LIB)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('email');
                    setIdentifier(user.email);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'email'
                      ? 'bg-white text-[#0037b0] shadow-2xs font-bold'
                      : 'text-[#434655] hover:text-[#131b2e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">alternate_email</span>
                  <span>Email Kampus</span>
                </button>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Identifier Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#131b2e]">
                    {loginMethod === 'id' ? 'Nomor Anggota Sirkulasi' : 'Email Resmi Institusi'}
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#747686] text-[18px] pointer-events-none">
                      {loginMethod === 'id' ? 'badge' : 'mail'}
                    </span>
                    <input
                      type={loginMethod === 'id' ? 'text' : 'email'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder={loginMethod === 'id' ? '#LIB-9842' : 'nama@student.nurulfikri.ac.id'}
                      className="w-full h-11 pl-10 pr-4 bg-[#faf8ff] border border-[#c4c5d7]/70 rounded-xl text-xs sm:text-sm text-[#131b2e] font-medium focus:outline-none focus:border-[#0037b0] focus:ring-2 focus:ring-[#0037b0]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password / PIN Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#131b2e]">
                      {loginMethod === 'id' ? 'PIN Sirkulasi' : 'Kata Sandi Akun'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] text-[#0037b0] hover:underline font-medium"
                    >
                      Lupa PIN?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#747686] text-[18px] pointer-events-none">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Masukkan kata sandi atau PIN"
                      className="w-full h-11 pl-10 pr-10 bg-[#faf8ff] border border-[#c4c5d7]/70 rounded-xl text-xs sm:text-sm text-[#131b2e] font-medium focus:outline-none focus:border-[#0037b0] focus:ring-2 focus:ring-[#0037b0]/20 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-[#747686] hover:text-[#131b2e]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0037b0] accent-[#0037b0] cursor-pointer"
                    />
                    <span className="text-xs text-[#434655]">
                      Ingat sesi login di perangkat ini
                    </span>
                  </label>
                  <span className="text-[11px] text-[#747686]">Sesi 30 hari</span>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 mt-1 rounded-xl bg-[#0037b0] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">
                        progress_activity
                      </span>
                      <span>Memverifikasi Kredensial...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      <span>Masuk ke Meja Sirkulasi</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#c4c5d7]/30"></div>
                </div>
                <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-[#747686] font-medium">
                  atau masuk cepat
                </span>
              </div>

              {/* 1-Click Fast Login Card (Aulya Reski) */}
              <div
                onClick={handleQuickLoginAulya}
                className="group p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#c4c5d7]/40 transition-all cursor-pointer flex items-center justify-between gap-3 mb-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0037b0]/40 group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006c49] ring-2 ring-white"></span>
                  </div>
                  <div className="truncate text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-[#131b2e] group-hover:text-[#0037b0] transition-colors truncate">
                        {user.name}
                      </span>
                      <span className="text-[10px] bg-[#dce1ff] text-[#001551] px-1.5 py-0.2 rounded font-bold">
                        Akun Tersimpan
                      </span>
                    </div>
                    <div className="text-[11px] text-[#434655] font-mono">
                      {user.memberId} • {user.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#0037b0] shrink-0 group-hover:translate-x-1 transition-transform">
                  <span>Masuk Cepat</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>

              {/* Google Campus SSO Button */}
              <button
                type="button"
                onClick={handleSsoGoogle}
                className="w-full h-10 rounded-xl bg-white border border-[#c4c5d7]/50 hover:bg-[#faf8ff] text-xs font-semibold text-[#131b2e] flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Masuk dengan Google Workspace Kampus</span>
              </button>
            </div>

            {/* Footer inside right pane */}
            <div className="pt-6 border-t border-[#c4c5d7]/20 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#747686]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#006c49]">
                  lock
                </span>
                <span>Protokol Enkripsi Terverifikasi TLS 256-bit</span>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Hubungi Pustakawan di Meja Sirkulasi Lantai 2 / Ext. 4-2900')}
                className="hover:text-[#0037b0] transition-colors"
              >
                Butuh Bantuan Akses?
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="py-4 text-center text-xs text-[#747686] border-t border-[#c4c5d7]/20 bg-white/60">
        Bibliotech Institutional Digital Lending Library • Hak Cipta &copy; 2026 Konsorsium Akademik
      </footer>

      {/* Forgot PIN / Password Help Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c4c5d7]/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#c4c5d7]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0037b0] text-[20px]">
                  help_center
                </span>
                <h3 className="text-base font-semibold text-[#131b2e]">
                  Bantuan PIN &amp; Akun Sirkulasi
                </h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-md text-[#747686] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 text-xs text-[#434655] leading-relaxed space-y-3">
              <p>
                PIN sirkulasi default Anda dikirimkan ke email resmi kampus saat registrasi kartu mahasiswa pertama kali.
              </p>
              <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#c4c5d7]/20">
                <span className="font-semibold text-[#131b2e] block mb-1">
                  Format Standar Akun Anggota:
                </span>
                <div>• ID Anggota: <strong className="font-mono text-[#0037b0]">{user.memberId}</strong></div>
                <div>• Email: <strong className="text-[#131b2e]">{user.email}</strong></div>
              </div>
              <p>
                Jika Anda lupa PIN, Anda dapat melakukan reset di Meja Sirkulasi Utama Lantai 2 dengan menunjukkan Kartu Tanda Mahasiswa (KTM).
              </p>
            </div>

            <div className="pt-3 border-t border-[#c4c5d7]/20 flex justify-end gap-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0037b0] hover:bg-[#1d4ed8] rounded-lg"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
