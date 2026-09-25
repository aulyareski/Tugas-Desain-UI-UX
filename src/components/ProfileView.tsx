import React from 'react';
import { MemberProfile, ActiveTab } from '../types';

interface ProfileViewProps {
  user: MemberProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onShowToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  setActiveTab,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#0037b0]">
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              PROFIL KEANGGOTAAN
            </span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-[#131b2e] tracking-tight">
            Kartu Anggota &amp; Preferensi Akun
          </h1>
          <p className="text-sm text-[#434655]">
            Identitas resmi pembaca, kuota peminjaman aktif, dan pengaturan notifikasi sirkulasi.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Mencetak Kartu Anggota Digital')}
          className="h-10 px-4 rounded-lg bg-white border border-[#c4c5d7]/40 text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5 shadow-2xs"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Cetak Kartu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Digital Library Card */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Card Physical Replica */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#0037b0] via-[#1d4ed8] to-[#001551] text-white shadow-xl overflow-hidden border border-white/20 aspect-[1.6/1] flex flex-col justify-between">
            {/* Ambient pattern */}
            <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
            <div className="absolute right-6 top-6 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center opacity-60">
              <span className="material-symbols-outlined text-[24px]">local_library</span>
            </div>

            {/* Top of Card */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-serif text-lg font-bold border border-white/40">
                B
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#cad3ff] font-semibold">
                  BIBLIOTECH DIGITAL LIBRARY
                </div>
                <div className="text-[10px] text-white/80">Koleksi Jaringan Konsorsium Akademik</div>
              </div>
            </div>

            {/* Middle of Card */}
            <div className="flex items-center gap-4 my-2">
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white/80 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-white">
                    {user.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#002113] text-[10px] font-bold">
                    Terverifikasi
                  </span>
                </div>
                <p className="text-xs text-[#cad3ff]">{user.role}</p>
                <div className="text-[11px] font-mono mt-0.5 tracking-wider text-white/90">
                  ID: {user.memberId}
                </div>
              </div>
            </div>

            {/* Bottom Bar: Barcode & Validity */}
            <div className="pt-2 border-t border-white/20 flex items-end justify-between">
              <div>
                {/* SVG-based Barcode rendering */}
                <div className="flex items-center gap-1 h-6 bg-white/90 px-2 py-0.5 rounded">
                  {[4, 2, 6, 2, 4, 3, 5, 2, 4, 2, 5, 3, 2, 4, 3, 5, 2, 4].map((w, idx) => (
                    <div
                      key={idx}
                      className="h-full bg-black"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#cad3ff] mt-0.5">
                  LIB-9842-0110124254
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-[#cad3ff]">BERLAKU HINGGA</span>
                <div className="text-xs font-semibold text-white">31 DES 2027</div>
              </div>
            </div>
          </div>

          {/* Membership Stats Card */}
          <div className="bg-white rounded-xl p-6 border border-[#c4c5d7]/30 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-[#131b2e]">Statistik Peminjaman</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#c4c5d7]/20">
                <span className="text-[11px] text-[#747686]">Pemanfaatan Kuota</span>
                <div className="text-xl font-bold text-[#0037b0] mt-0.5">
                  {user.quotaUsed} / {user.quotaTotal} item
                </div>
                <span className="text-[10px] text-[#006c49] font-medium">Tersedia 2 slot lagi</span>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#c4c5d7]/20">
                <span className="text-[11px] text-[#747686]">Status Denda Akun</span>
                <div className="text-xl font-bold text-[#006c49] mt-0.5">$0.00</div>
                <span className="text-[10px] text-[#006c49] font-medium">Rekam Jejak Bersih</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Details & Settings */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#c4c5d7]/30 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#131b2e]">Informasi Pengguna</h3>
              <span className="text-[11px] text-[#006c49] font-medium bg-[#6cf8bb]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                Foto Profil Aktif
              </span>
            </div>

            {/* Profile Avatar Showcase Banner */}
            <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center gap-4 border border-[#c4c5d7]/20">
              <img
                src={user.avatarUrl}
                alt="Foto Profil Aulya Reski"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#0037b0]/30 shadow-xs"
              />
              <div>
                <div className="text-xs font-semibold text-[#131b2e]">
                  Foto Resmi Mahasiswa
                </div>
                <p className="text-[11px] text-[#434655] mt-0.5">
                  Digunakan untuk verifikasi peminjaman di Meja Sirkulasi &amp; Loker Pintar.
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#c4c5d7]/40 text-[#0037b0] font-semibold">
                    #LIB-9842
                  </span>
                  <span className="text-[10px] text-[#006c49] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                    Tersinkronisasi
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[#747686] font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  readOnly
                  value="Aulya Reski"
                  className="bg-[#f2f3ff] border border-[#c4c5d7]/40 rounded-lg px-3 py-2 text-[#131b2e] font-medium"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[#747686] font-medium">Email Institusi</label>
                <input
                  type="text"
                  readOnly
                  value={user.email}
                  className="bg-[#f2f3ff] border border-[#c4c5d7]/40 rounded-lg px-3 py-2 text-[#131b2e]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[#747686] font-medium">Cabang Pengambilan Utama</label>
                <select
                  defaultValue="Perpustakaan Pusat"
                  className="bg-[#f2f3ff] border border-[#c4c5d7]/40 rounded-lg px-3 py-2 text-[#131b2e] cursor-pointer"
                >
                  <option>Perpustakaan Pusat Bibliotech (Main Stacks)</option>
                  <option>Turing Computing Wing (Lantai 2)</option>
                  <option>Science &amp; Engineering Archives</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#c4c5d7]/20">
                <span className="text-xs text-[#131b2e] font-medium">
                  Notifikasi SMS Tenggat Waktu
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-[#0037b0] accent-[#0037b0]"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#131b2e] font-medium">
                  Sinkronisasi Otomatis E-Book ke Perangkat
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-[#0037b0] accent-[#0037b0]"
                />
              </div>
            </div>

            <button
              onClick={() => onShowToast('Preferensi profil berhasil diperbarui')}
              className="mt-2 w-full py-2.5 rounded-lg bg-[#1d4ed8] text-white font-semibold text-xs hover:bg-[#0037b0] transition-colors"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
