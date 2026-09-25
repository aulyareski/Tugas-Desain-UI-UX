import React, { useState } from 'react';
import { CartItem, MemberProfile, ActiveTab } from '../types';

interface CartCheckoutViewProps {
  cartItems: CartItem[];
  user: MemberProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
  onUpdateDuration: (id: string, days: number) => void;
  onShowToast: (msg: string) => void;
}

export const CartCheckoutView: React.FC<CartCheckoutViewProps> = ({
  cartItems,
  user,
  setActiveTab,
  onRemoveCartItem,
  onClearCart,
  onUpdateDuration,
  onShowToast,
}) => {
  const [pickupMode, setPickupMode] = useState<'desk' | 'locker'>('desk');
  const [sendReminder, setSendReminder] = useState(true);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState<string | null>(null);

  const handleConfirmCheckout = () => {
    if (!agreedToPolicy) {
      onShowToast('Harap setujui aturan sirkulasi dan kode kehormatan perpustakaan terlebih dahulu.');
      return;
    }

    setIsFinalizing(true);
    setTimeout(() => {
      setIsFinalizing(false);
      const receiptId = `PK-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedReceipt(receiptId);
      onShowToast(`Peminjaman berhasil difinalisasi! Kode Pengambilan: #${receiptId}`);
    }, 1500);
  };

  const physicalCount = cartItems.filter((i) => !i.isDigital).length;
  const digitalCount = cartItems.filter((i) => i.isDigital).length;
  const totalSlotsUsed = user.quotaUsed + cartItems.length;

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Metadata Overline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-[#434655]">
          <span
            onClick={() => setActiveTab('dashboard')}
            className="hover:text-[#0037b0] cursor-pointer transition-colors"
          >
            Meja Sirkulasi
          </span>
          <span className="material-symbols-outlined text-[16px] text-[#747686]">
            chevron_right
          </span>
          <span className="text-[#131b2e] font-semibold">
            Keranjang Peminjaman &amp; Finalisasi Pinjaman
          </span>
        </div>
        <div className="flex items-center gap-2.5 bg-[#e2e7ff] px-3 py-1.5 rounded-full text-[#131b2e] self-start sm:self-auto">
          <span className="material-symbols-outlined text-[#0037b0] text-[18px]">badge</span>
          <span className="text-[11px]">
            ID Anggota: <strong className="text-[#131b2e]">{user.memberId}</strong> ({user.name})
          </span>
          <span className="w-1 h-1 rounded-full bg-[#747686]"></span>
          <span className="text-[11px] text-[#006c49] font-semibold">
            Kuota: {user.quotaUsed} dari {user.quotaTotal} digunakan
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-lg p-6 shadow-xs mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border border-[#c4c5d7]/30">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-wider text-[#0037b0] font-semibold block mb-1">
            SISTEM SIRKULASI INSTITUSIONAL
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#131b2e] tracking-tight mb-2">
            Tinjau &amp; Konfirmasi Pinjaman Buku
          </h1>
          <p className="text-sm text-[#434655]">
            Periksa judul yang Anda pilih, atur durasi peminjaman sirkulasi, dan setujui kebijakan peminjaman akademik sebelum pengambilan.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onShowToast('Daftar pinjaman telah disimpan untuk sesi Anda nanti')}
            className="h-10 px-4 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#434655] hover:text-[#131b2e] transition-colors flex items-center gap-2 border border-[#c4c5d7]/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
            <span>Simpan Nanti</span>
          </button>
          <button
            onClick={onClearCart}
            className="h-10 px-4 rounded-lg bg-[#f2f3ff] hover:bg-[#ffdad6] hover:text-[#93000a] text-xs font-semibold text-[#434655] transition-colors flex items-center gap-2 border border-[#c4c5d7]/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">clear_all</span>
            <span>Hapus Semua</span>
          </button>
        </div>
      </div>

      {confirmedReceipt ? (
        /* Confirmed Order State */
        <div className="bg-white rounded-xl p-8 border border-[#6cf8bb] shadow-sm flex flex-col items-center text-center max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#6cf8bb]/30 flex items-center justify-center text-[#006c49] mb-4">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#006c49] font-bold">
            PEMINJAMAN BERHASIL DIKONFIRMASI
          </span>
          <h2 className="font-serif text-3xl font-medium text-[#131b2e] mt-1 mb-2">
            Terima Kasih, {user.name}!
          </h2>
          <p className="text-sm text-[#434655] max-w-md mb-6">
            Catatan sirkulasi Anda telah terbit di sistem universitas. Silakan ambil buku fisik di{' '}
            <strong>
              {pickupMode === 'desk'
                ? 'Meja Sirkulasi Utama Lantai 2'
                : 'Loker Mandiri Pintu Atrium Utara (24/7)'}
            </strong>.
          </p>

          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#c4c5d7]/30 w-full max-w-md flex items-center justify-between mb-6">
            <div className="text-left">
              <span className="text-[10px] text-[#747686] uppercase tracking-wider">
                KODE TIKET PENGAMBILAN
              </span>
              <div className="font-mono text-xl font-bold text-[#0037b0]">
                #{confirmedReceipt}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#747686] uppercase tracking-wider">STATUS</span>
              <div className="text-xs font-semibold text-[#006c49] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                Siap Diproses
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('history')}
              className="px-5 py-2.5 bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold hover:bg-[#0037b0] transition-colors"
            >
              Lihat di Riwayat Pinjaman
            </button>
            <button
              onClick={() => {
                setConfirmedReceipt(null);
                setActiveTab('browse');
              }}
              className="px-5 py-2.5 bg-[#f2f3ff] text-[#131b2e] rounded-lg text-xs font-semibold hover:bg-[#eaedff] transition-colors"
            >
              Jelajahi Buku Lain
            </button>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-xl p-12 text-center border border-[#c4c5d7]/30">
          <span className="material-symbols-outlined text-[48px] text-[#747686] mb-3">
            remove_shopping_cart
          </span>
          <h3 className="font-serif text-xl font-medium text-[#131b2e]">
            Keranjang Peminjaman Kosong
          </h3>
          <p className="text-sm text-[#434655] mt-1 max-w-md mx-auto">
            Anda belum menambahkan buku ke daftar peminjaman sirkulasi. Jelajahi katalog buku perpustakaan kami.
          </p>
          <button
            onClick={() => setActiveTab('browse')}
            className="mt-5 px-5 py-2.5 bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold hover:bg-[#0037b0] transition-colors"
          >
            Buka Katalog Perpustakaan
          </button>
        </div>
      ) : (
        /* Main Grid: Catalog Table + Summary Panel */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Section (~65% / 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Cart Table Card */}
            <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-[#c4c5d7]/30">
              {/* Table Header Bar */}
              <div className="bg-[#f2f3ff] px-6 py-3 flex items-center justify-between border-b border-[#c4c5d7]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0037b0] text-[20px]">
                    auto_stories
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e]">
                    Item Terpilih untuk Dipinjam
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#0037b0] text-white ml-1 font-semibold">
                    {cartItems.length} Judul
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#747686] text-xs">
                  <span>{physicalCount} Salinan Fisik</span>
                  <span>•</span>
                  <span>{digitalCount} Lisensi Digital</span>
                </div>
              </div>

              {/* Book Rows Container */}
              <div className="divide-y divide-[#c4c5d7]/20">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="p-6 hover:bg-[#faf8ff] transition-colors flex flex-col sm:flex-row gap-4 relative group"
                  >
                    <div className="shrink-0 w-24 h-36 bg-[#eaedff] rounded overflow-hidden shadow-xs relative flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover rounded"
                        src={item.coverUrl}
                        alt={item.altText}
                      />
                      {item.isDigital ? (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#1d4ed8] text-white text-[10px] font-semibold rounded flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">bolt</span>
                          <span>E-Book</span>
                        </span>
                      ) : (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[#131b2e]/80 backdrop-blur-xs text-[10px] font-medium text-white rounded">
                          {item.format}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold text-[#131b2e] tracking-tight hover:text-[#0037b0] transition-colors">
                                {item.title}
                              </h3>
                              {item.isHighDemand && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#ffddb8] text-[#653e00] font-semibold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[13px]">
                                    priority_high
                                  </span>
                                  <span>Permintaan Tinggi</span>
                                </span>
                              )}
                              {item.isDigital && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#e2e7ff] text-[#0037b0] font-medium">
                                  Digital DRM
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#434655] mt-0.5">
                              Oleh <span className="text-[#131b2e] font-medium">{item.author}</span> • {item.publisher}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => onShowToast(`Disimpan ke daftar nanti: ${item.title}`)}
                              className="p-2 rounded-lg text-[#747686] hover:text-[#0037b0] hover:bg-[#f2f3ff] transition-colors"
                              title="Pindahkan ke Wishlist"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                favorite
                              </span>
                            </button>
                            <button
                              onClick={() => onRemoveCartItem(item.id)}
                              className="p-2 rounded-lg text-[#747686] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
                              title="Hapus Item"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-[#434655]">
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#747686]">
                              location_on
                            </span>
                            <span>
                              No. Panggil: <strong className="text-[#131b2e] font-medium">{item.callNumber}</strong>
                            </span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#747686]">
                              shelves
                            </span>
                            <span>
                              Rak: <strong className="text-[#131b2e] font-medium">{item.shelf}</strong>
                            </span>
                          </span>
                          <span className="font-mono text-[11px] bg-[#f2f3ff] px-2 py-0.5 rounded text-[#747686]">
                            {item.barcodeId}
                          </span>
                        </div>
                      </div>

                      {/* Controls Bar */}
                      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 bg-[#f2f3ff]/70 rounded-lg p-3 border border-[#c4c5d7]/20">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex flex-col">
                            <label className="text-[11px] text-[#747686] mb-1 font-medium">
                              {item.isHighDemand ? 'Batas Cadangan Kuliah' : item.isDigital ? 'Jendela Akses' : 'Durasi Pinjaman'}
                            </label>
                            <div className="relative inline-flex items-center">
                              {item.isHighDemand ? (
                                <div className="bg-white text-xs text-[#131b2e] pl-3 pr-7 py-1.5 rounded-lg shadow-2xs border border-[#c4c5d7]/40 flex items-center gap-1">
                                  <span>7 Hari (Batas Maksimal)</span>
                                  <span className="material-symbols-outlined text-[15px] text-[#747686]">
                                    lock
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <select
                                    value={item.durationDays}
                                    onChange={(e) =>
                                      onUpdateDuration(item.id, Number(e.target.value))
                                    }
                                    className="appearance-none bg-white text-xs text-[#131b2e] pl-3 pr-8 py-1.5 rounded-lg shadow-2xs border border-[#c4c5d7]/40 focus:outline-none focus:ring-2 focus:ring-[#0037b0]/20 cursor-pointer"
                                  >
                                    <option value={7}>7 Hari (Cadangan Pendek)</option>
                                    <option value={14}>14 Hari (Pinjaman Standar)</option>
                                    <option value={28}>28 Hari (Riset Lanjutan)</option>
                                  </select>
                                  <span className="material-symbols-outlined text-[18px] text-[#747686] absolute right-2 pointer-events-none">
                                    expand_more
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label className="text-[11px] text-[#747686] mb-1 font-medium">
                              {item.isDigital ? 'Tujuan Pengiriman' : 'Lokasi Pengambilan'}
                            </label>
                            <div className="flex items-center gap-1.5 text-xs text-[#131b2e] bg-white px-3 py-1.5 rounded-lg shadow-2xs border border-[#c4c5d7]/40">
                              <span className="material-symbols-outlined text-[#006c49] text-[16px]">
                                {item.isDigital ? 'devices' : 'account_balance'}
                              </span>
                              <span>{item.pickupLocation}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 font-medium ${
                              item.isHighDemand
                                ? 'bg-[#ffddb8] text-[#653e00] font-semibold'
                                : 'bg-[#6ffbbe] text-[#002113]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {item.isHighDemand ? 'warning' : 'event_available'}
                            </span>
                            <span>Jatuh Tempo: {item.dueDate}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Additional Fulfillment & Notification Preferences */}
            <div className="bg-white rounded-lg p-6 shadow-xs flex flex-col gap-4 border border-[#c4c5d7]/30">
              <h4 className="text-sm font-semibold text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0037b0] text-[20px]">
                  local_shipping
                </span>
                <span>Preferensi Pemenuhan &amp; Pemberitahuan</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Radio 1: Desk */}
                <label
                  onClick={() => setPickupMode('desk')}
                  className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-colors border ${
                    pickupMode === 'desk'
                      ? 'bg-[#f2f3ff] border-[#0037b0]/30 ring-1 ring-[#0037b0]/20'
                      : 'bg-[#faf8ff] border-[#c4c5d7]/30 hover:bg-[#f2f3ff]'
                  }`}
                >
                  <input
                    checked={pickupMode === 'desk'}
                    onChange={() => setPickupMode('desk')}
                    className="mt-1 w-4 h-4 text-[#0037b0] accent-[#0037b0] cursor-pointer"
                    name="pickup_mode"
                    type="radio"
                    value="desk"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#131b2e] font-semibold flex items-center gap-1.5">
                      <span>Pengambilan di Meja Sirkulasi</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#6cf8bb] text-[#00714d] font-bold">
                        Siap dlm 30 mnt
                      </span>
                    </span>
                    <span className="text-xs text-[#434655] mt-1 leading-relaxed">
                      Ambil langsung dengan kartu identitas perpustakaan Anda selama jam operasional normal di Loket A.
                    </span>
                  </div>
                </label>

                {/* Radio 2: Smart Locker */}
                <label
                  onClick={() => setPickupMode('locker')}
                  className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-colors border ${
                    pickupMode === 'locker'
                      ? 'bg-[#f2f3ff] border-[#0037b0]/30 ring-1 ring-[#0037b0]/20'
                      : 'bg-[#faf8ff] border-[#c4c5d7]/30 hover:bg-[#f2f3ff]'
                  }`}
                >
                  <input
                    checked={pickupMode === 'locker'}
                    onChange={() => setPickupMode('locker')}
                    className="mt-1 w-4 h-4 text-[#0037b0] accent-[#0037b0] cursor-pointer"
                    name="pickup_mode"
                    type="radio"
                    value="locker"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#131b2e] font-semibold flex items-center gap-1.5">
                      <span>Loker Pintar Mandiri</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#e2e7ff] text-[#0037b0] font-bold">
                        Akses 24/7
                      </span>
                    </span>
                    <span className="text-xs text-[#434655] mt-1 leading-relaxed">
                      Pengambilan nirsentuh yang aman di Pintu Masuk Atrium Utara. PIN loker dikirim via SMS &amp; Email.
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[#c4c5d7]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#747686] text-[20px]">
                    notifications_active
                  </span>
                  <span className="text-xs text-[#131b2e] font-medium">
                    Kirim pengingat pengembalian 48 jam sebelum jatuh tempo via SMS &amp; Email
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendReminder}
                    onChange={(e) => setSendReminder(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c4c5d7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#747686] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0037b0]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section: Sticky Checkout Panel (~35% / 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-20">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-xs p-6 flex flex-col gap-4 border border-[#c4c5d7]/30">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c4c5d7]/20">
                <div>
                  <h2 className="font-serif text-lg font-medium text-[#131b2e]">
                    Ringkasan Sirkulasi
                  </h2>
                  <span className="text-xs text-[#434655]">
                    Tinjau ketentuan pinjaman sebelum konfirmasi
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[#e2e7ff] px-2.5 py-1 rounded text-[#0037b0]">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span className="text-[11px] font-semibold">Terverifikasi</span>
                </div>
              </div>

              {/* Metrics & Stats Breakdown */}
              <div className="flex flex-col gap-2.5 text-xs text-[#131b2e]">
                <div className="flex items-center justify-between">
                  <span className="text-[#434655] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#747686]">
                      menu_book
                    </span>
                    <span>Total Judul Terpilih</span>
                  </span>
                  <span className="font-semibold text-[#131b2e]">
                    {cartItems.length} Buku{' '}
                    <span className="font-normal text-[#434655]">
                      ({physicalCount} Fisik, {digitalCount} Digital)
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#434655] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#623c00]">
                      alarm
                    </span>
                    <span>Jatuh Tempo Paling Awal</span>
                  </span>
                  <span className="font-semibold text-[#623c00]">05 Nov 2024 (7 Hari)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#434655] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#0037b0]">
                      event
                    </span>
                    <span>Jatuh Tempo Terakhir</span>
                  </span>
                  <span className="font-semibold text-[#131b2e]">12 Nov 2024 (14 Hari)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#434655] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#747686]">
                      pie_chart
                    </span>
                    <span>Sisa Kuota Setelah Pinjaman</span>
                  </span>
                  <span className="font-semibold text-[#ba1a1a]">
                    {Math.max(0, user.quotaTotal - totalSlotsUsed)} slot tersisa ({Math.min(user.quotaTotal, totalSlotsUsed)} dari {user.quotaTotal})
                  </span>
                </div>

                <div className="h-px bg-[#eaedff] my-1"></div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#434655]">Tarif Denda Keterlambatan</span>
                  <span className="text-[#131b2e] font-medium">$0.50 / hari per item</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#434655]">Biaya Pemrosesan Sirkulasi</span>
                  <span className="text-[#006c49] font-semibold">$0.00 (Bebas Biaya Afiliasi)</span>
                </div>
              </div>

              {/* Academic Honor Code & Policy Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#131b2e] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#747686]">
                    gavel
                  </span>
                  <span>Aturan Peminjaman Perpustakaan &amp; Kode Kehormatan</span>
                </label>
                <div className="bg-[#f2f3ff] rounded p-3 text-[11px] leading-relaxed text-[#434655] max-h-28 overflow-y-auto space-y-2 border border-[#c4c5d7]/30">
                  <p>
                    <strong>1. Properti Universitas:</strong> Semua item fisik tetap menjadi milik jaringan Perpustakaan Universitas dan harus dikembalikan sebelum pukul 23:59 WIB pada tanggal jatuh tempo yang ditentukan.
                  </p>
                  <p>
                    <strong>2. Penalti &amp; Penangguhan:</strong> Keterlambatan dikenakan denda harian sebesar $0.50 per hari setelah masa tenggang 24 jam. Denda melebihi batas akan menangguhkan hak peminjaman.
                  </p>
                  <p>
                    <strong>3. Penilaian Kerusakan:</strong> Kerusakan fisik atau hilangnya buku akan dikenakan biaya penggantian penuh ditambah biaya arsip.
                  </p>
                  <p>
                    <strong>4. Kedaluwarsa DRM Digital:</strong> Hak akses e-book secara otomatis dicabut pada tengah malam saat batas waktu pinjaman selesai.
                  </p>
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#0037b0] accent-[#0037b0] focus:ring-[#0037b0] cursor-pointer"
                />
                <span className="text-xs text-[#131b2e] leading-tight select-none font-medium">
                  Saya mengetahui dan menerima kebijakan sirkulasi universitas, tanggung jawab penggantian, dan ketentuan durasi pinjaman.
                </span>
              </label>

              {/* Final Confirmation Action */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleConfirmCheckout}
                  disabled={isFinalizing}
                  className="w-full h-12 rounded-lg bg-[#0037b0] hover:bg-[#1d4ed8] text-white text-sm font-semibold shadow flex items-center justify-center gap-2 transition-all hover:shadow-md active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  type="button"
                >
                  {isFinalizing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">
                        progress_activity
                      </span>
                      <span>Memfinalisasi Catatan Sirkulasi...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                      <span>Konfirmasi &amp; Finalisasi Pinjaman</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('browse')}
                  className="w-full h-10 rounded-lg bg-transparent hover:bg-[#f2f3ff] text-xs font-semibold text-[#434655] hover:text-[#131b2e] transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Lanjutkan Menjelajahi Katalog</span>
                </button>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 pt-1 text-center text-[#747686] text-[11px]">
                <span className="material-symbols-outlined text-[16px] text-[#006c49]">
                  encrypted
                </span>
                <span>Catatan Peminjaman Resmi • Terenkripsi TLS 256-bit</span>
              </div>
            </div>

            {/* Quick Assistance Callout */}
            <div className="bg-[#f2f3ff] rounded-lg p-4 flex items-center gap-3 border border-[#c4c5d7]/30">
              <span className="material-symbols-outlined text-[#0037b0] text-[24px]">
                support_agent
              </span>
              <div className="flex flex-col text-left text-xs">
                <span className="font-semibold text-[#131b2e]">Meja Bantuan Sirkulasi</span>
                <span className="text-[#434655]">
                  Pertanyaan mengenai kuota atau perpanjangan? Hubungi Ext. 4-2900
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
