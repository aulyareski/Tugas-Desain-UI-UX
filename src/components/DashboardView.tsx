import React, { useState } from 'react';
import { Book, LoanItem, MemberProfile, ActiveTab } from '../types';

interface DashboardViewProps {
  user: MemberProfile;
  books: Book[];
  activeLoans: LoanItem[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onRenewLoan: (loanId: string) => void;
  onReturnLoan: (loanId: string) => void;
  onShowToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  books,
  activeLoans,
  setActiveTab,
  onSelectBook,
  onAddToCart,
  onRenewLoan,
  onReturnLoan,
  onShowToast,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua Koleksi');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const filterCategories = [
    'Semua Koleksi',
    'Desain UI/UX',
    'Tipografi',
    'Arsitektur Sistem',
    'Teori Desain',
  ];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      onShowToast(next[id] ? 'Ditambahkan ke rak bacaan pribadi' : 'Dihapus dari rak bacaan');
      return next;
    });
  };

  // Find 4 curated books
  const curatedBooks = books.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Page Header & Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#0037b0] font-semibold">
              MEJA SIRKULASI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4c5d7]"></span>
            <span className="text-xs text-[#434655]">ID Anggota: {user.memberId}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#131b2e] tracking-tight font-medium">
            Selamat datang kembali, {user.name}
          </h1>
          <p className="text-sm text-[#434655]">
            Kelola peminjaman aktif Anda, jelajahi buku yang baru dikatalogkan, dan pantau tenggat waktu pengembalian dengan tepat.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('history')}
            className="h-10 px-4 rounded-lg bg-white text-[#131b2e] text-sm font-semibold shadow-xs hover:bg-[#f2f3ff] transition-all flex items-center gap-2 border border-[#c4c5d7]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#747686]">history</span>
            <span>Buku Besar Pinjaman</span>
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className="h-10 px-4 rounded-lg bg-[#1d4ed8] text-white text-sm font-semibold shadow-xs hover:bg-[#0037b0] transition-all flex items-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">explore</span>
            <span>Jelajahi Katalog</span>
          </button>
        </div>
      </div>

      {/* Summary Widgets: 3 Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Books Borrowed */}
        <div className="p-6 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group border border-[#c4c5d7]/30">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#0037b0]/5 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0037b0]">
                  <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                </div>
                <span className="text-sm text-[#434655] font-medium">Buku Dipinjam</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#eaedff] text-[#434655] font-semibold">
                Aktif
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-3xl font-medium text-[#131b2e]">{user.quotaUsed}</span>
              <span className="text-xs text-[#434655]">/ {user.quotaTotal} kuota item</span>
            </div>
            <p className="text-xs text-[#434655]">Pinjaman fisik &amp; digital aktif di berbagai cabang</p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#c4c5d7]/20">
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="text-[#434655]">Pemanfaatan Kuota</span>
              <span className="font-semibold text-[#0037b0]">60%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
              <div
                className="h-full bg-[#0037b0] rounded-full transition-all duration-500"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 2: Due Soon */}
        <div className="p-6 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group border border-[#c4c5d7]/30">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#ffb95f]/20 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#ffddb8]/50 flex items-center justify-center text-[#623c00]">
                  <span className="material-symbols-outlined text-[22px]">event_upcoming</span>
                </div>
                <span className="text-sm text-[#434655] font-medium">Segera Jatuh Tempo</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#ffddb8] text-[#653e00] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#623c00]"></span>
                Dalam 2 hari
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-3xl font-medium text-[#623c00]">1</span>
              <span className="text-xs text-[#434655]">memerlukan perhatian</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] mt-2 flex items-center justify-between gap-2 border border-[#c4c5d7]/30">
              <div className="truncate">
                <p className="text-xs text-[#131b2e] font-semibold truncate">Refactoring UI: Complete Edition</p>
                <p className="text-[11px] text-[#747686]">Jatuh Tempo: 28 Okt 2024 (Rak Utama)</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#c4c5d7]/20">
            <button
              onClick={() => onRenewLoan('loan-1')}
              className="text-xs text-[#0037b0] hover:text-[#1d4ed8] font-semibold flex items-center gap-1 group/link"
              type="button"
            >
              <span>Perpanjang Pinjaman Sekarang</span>
              <span className="material-symbols-outlined text-[14px] transition-transform group-hover/link:translate-x-0.5">
                arrow_forward
              </span>
            </button>
            <span className="text-xs text-[#747686]">0 Denda Keterlambatan</span>
          </div>
        </div>

        {/* Card 3: Account Balance & Penalties */}
        <div className="p-6 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group border border-[#c4c5d7]/30">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#6ffbbe]/30 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#6ffbbe]/50 flex items-center justify-center text-[#006c49]">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <span className="text-sm text-[#434655] font-medium">Total Denda</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#4edea3]/30 text-[#006c49] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Status Baik
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-3xl font-medium text-[#131b2e]">$0.00</span>
              <span className="text-xs text-[#006c49] font-medium">Catatan Bersih</span>
            </div>
            <p className="text-xs text-[#434655]">Tidak ada denda keterlambatan atau penggantian barang rusak.</p>
          </div>
          <div className="mt-6 pt-3 flex items-center justify-between border-t border-[#c4c5d7]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c49] text-[18px]">verified</span>
              <span className="text-xs text-[#131b2e] font-medium">Akses peminjaman penuh</span>
            </div>
            <button
              onClick={() => onShowToast('Ketentuan: Batas kuota 5 buku, denda $0.50/hari setelah tenggat')}
              className="text-xs text-[#747686] hover:text-[#131b2e]"
              type="button"
            >
              Lihat Kebijakan
            </button>
          </div>
        </div>
      </section>

      {/* Active Loans Overview */}
      <section className="mb-10 flex flex-col gap-4" id="active-loans">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 rounded-full bg-[#0037b0]"></div>
            <div>
              <h2 className="text-base text-[#131b2e] font-semibold">Peminjaman Aktif</h2>
              <p className="text-xs text-[#434655]">Item yang saat ini dipinjam pada kartu Anda</p>
            </div>
          </div>
          <span className="text-xs text-[#434655] bg-[#eaedff] px-3 py-1 rounded-full font-medium">
            {activeLoans.length} dari {user.quotaTotal} aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeLoans.map((loan) => (
            <div
              key={loan.id}
              className="p-4 rounded-xl bg-white shadow-xs hover:shadow-md transition-all flex gap-3.5 items-center border border-[#c4c5d7]/30"
            >
              <div className="w-16 h-22 shrink-0 rounded bg-[#eaedff] overflow-hidden shadow-xs relative">
                <img
                  className="w-full h-full object-cover"
                  src={loan.coverUrl}
                  alt={loan.altText}
                />
                <span className="absolute top-1 left-1 px-1 rounded bg-[#283044]/80 text-[#eef0ff] text-[9px] uppercase tracking-wide">
                  {loan.format}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0 justify-between h-full py-0.5">
                <div className="min-w-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      loan.dueDaysLeft <= 2
                        ? 'bg-[#ffddb8] text-[#653e00]'
                        : 'bg-[#eaedff] text-[#131b2e]'
                    }`}
                  >
                    Jatuh tempo dlm {loan.dueDaysLeft} hari
                  </span>
                  <h3 className="text-sm font-semibold text-[#131b2e] truncate mt-1">
                    {loan.title}
                  </h3>
                  <p className="text-xs text-[#747686] truncate">
                    {loan.author} {loan.shelf && `• ${loan.shelf}`}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#c4c5d7]/20">
                  <span className="text-xs text-[#434655] font-medium">
                    {loan.currentPages ? `Hlm. ${loan.currentPages}/${loan.totalPages}` : `Tempo ${loan.dueDate}`}
                  </span>
                  {loan.canRenew ? (
                    <button
                      onClick={() => onRenewLoan(loan.id)}
                      className="text-xs text-[#0037b0] hover:text-[#1d4ed8] font-semibold"
                      type="button"
                    >
                      Perpanjang
                    </button>
                  ) : (
                    <button
                      onClick={() => onReturnLoan(loan.id)}
                      className="text-xs text-[#0037b0] hover:text-[#1d4ed8] font-semibold"
                      type="button"
                    >
                      Kembalikan
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Recommendations Grid Section */}
      <section className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#0037b0] text-[20px]">
                recommend
              </span>
              <span className="text-[11px] text-[#0037b0] uppercase font-semibold tracking-wider">
                PENEMUAN TERKURASI
              </span>
            </div>
            <h2 className="font-serif text-2xl text-[#131b2e] tracking-tight font-medium">
              Rekomendasi untuk Anda
            </h2>
            <p className="text-sm text-[#434655]">
              Dipilih berdasarkan riwayat peminjaman Anda dalam Desain Sistem, Tipografi, dan Arsitektur Komputasi.
            </p>
          </div>

          {/* Filter Pills Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat
                    ? 'bg-[#1d4ed8] text-white shadow-xs font-semibold'
                    : 'bg-white text-[#434655] hover:text-[#131b2e] hover:bg-[#eaedff] border border-[#c4c5d7]/30'
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {curatedBooks.map((book, idx) => {
            const isBookmarked = !!bookmarkedIds[book.id];
            // Match pill tags as in prompt mock
            const tagBadge =
              idx === 0
                ? { text: 'POPULER', bg: 'bg-[#0037b0] text-white' }
                : idx === 1
                ? { text: 'PILIHAN STAF', bg: 'bg-[#006c49] text-white' }
                : idx === 2
                ? { text: 'REFERENSI', bg: 'bg-[#623c00] text-white' }
                : { text: 'DIGITAL', bg: 'bg-[#1d4ed8] text-white' };

            return (
              <article
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="group rounded-xl bg-white shadow-xs hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between border border-[#c4c5d7]/30 cursor-pointer"
              >
                <div>
                  {/* Thumbnail Aspect 2:3 */}
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#f2f3ff] mb-4 shadow-inner ring-1 ring-black/5">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={book.coverUrl}
                      alt={book.altText}
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold shadow-xs ${tagBadge.bg}`}
                      >
                        {tagBadge.text}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/90 backdrop-blur-xs text-[#131b2e] font-semibold shadow-xs">
                        {book.format}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(book.id, e)}
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-colors shadow-xs ${
                        isBookmarked ? 'text-[#0037b0]' : 'text-[#131b2e] hover:text-[#0037b0]'
                      }`}
                      title="Simpan ke daftar bacaan"
                      type="button"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isBookmarked ? 'fill-1' : ''
                        }`}
                      >
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>

                    {/* Quick preview overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#283044]/90 via-[#283044]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-full py-2 text-center rounded-lg bg-white text-[#131b2e] text-xs font-semibold hover:bg-[#eaedff] shadow-sm">
                        Pratinjau Cepat
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] text-[#0037b0] font-semibold uppercase tracking-wide">
                      {book.category}
                    </span>
                    <div className="flex items-center text-[#623c00]">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs font-semibold ml-1 text-[#131b2e]">
                        {book.rating}
                      </span>
                      <span className="text-[11px] text-[#747686] ml-0.5">
                        ({book.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-[#131b2e] line-clamp-1 group-hover:text-[#0037b0] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#747686] mt-0.5">{book.author}</p>
                </div>

                <div className="mt-4 pt-3 flex flex-col gap-2 border-t border-[#c4c5d7]/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#006c49] font-medium flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[#006c49] shrink-0"></span>
                      {book.shelfLocation} • {book.isAvailable ? `${book.availableCopies} Tersedia` : 'Antre'}
                    </span>
                    <span className="text-[#747686] shrink-0 text-[11px]">Aula Utama</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(book);
                    }}
                    className="w-full h-9 rounded-lg bg-[#1d4ed8] text-white text-xs font-semibold hover:bg-[#0037b0] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {book.format === 'E-Book' ? 'devices' : 'book'}
                    </span>
                    <span>{book.format === 'E-Book' ? 'Baca Instan' : 'Pinjam Buku'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Utility: Branch Activity & Lending Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Location Card */}
        <div className="p-6 rounded-xl bg-white shadow-xs flex flex-col justify-between border border-[#c4c5d7]/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wide text-[#0037b0] font-semibold">
                Cabang Pilihan Anda
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#6ffbbe]/50 text-[#006c49] font-semibold">
                Buka Sekarang
              </span>
            </div>
            <h4 className="text-base font-semibold text-[#131b2e]">Perpustakaan Pusat Bibliotech</h4>
            <p className="text-xs text-[#434655] mt-1">450 University Ave, Cambridge • Meja Lantai 2</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#c4c5d7]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#747686] text-[18px]">
                cloud_download
              </span>
              <span className="text-xs text-[#434655]">Kotak pengembalian buka 24/7</span>
            </div>
            <button
              onClick={() => onShowToast('Lokasi: Gedung Barat Lantai 2, Dekat Lift Utama')}
              className="text-xs text-[#0037b0] hover:underline font-semibold"
              type="button"
            >
              Lihat Peta
            </button>
          </div>
        </div>

        {/* Reading Progress Streak */}
        <div className="p-6 rounded-xl bg-white shadow-xs flex flex-col justify-between border border-[#c4c5d7]/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wide text-[#623c00] font-semibold">
                TARGET MEMBACA BULANAN
              </span>
              <span className="text-xs text-[#434655] font-medium">Oktober 2024</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-medium text-[#131b2e]">
                {user.monthlyGoalCompleted} dari {user.monthlyGoalTarget}
              </span>
              <span className="text-xs text-[#434655]">buku selesai</span>
            </div>
            <p className="text-xs text-[#434655] mt-1">Anda lebih cepat 2 buku dari target pribadi!</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#c4c5d7]/20">
            <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
              <div
                className="h-full bg-[#006c49] rounded-full transition-all duration-500"
                style={{ width: `${(user.monthlyGoalCompleted / user.monthlyGoalTarget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quick Help & Lending Support */}
        <div className="p-6 rounded-xl bg-[#f2f3ff] shadow-xs flex flex-col justify-between border border-[#c4c5d7]/30">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#0037b0] text-[20px]">
                support_agent
              </span>
              <h4 className="text-sm font-semibold text-[#131b2e]">Layanan Pustakawan Tersedia</h4>
            </div>
            <p className="text-xs text-[#434655]">
              Butuh bantuan menemukan manuskrip arsip, peminjaman antar-perpustakaan, atau perpanjangan buku pesanan?
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onShowToast('Pustakawan siap membantu di Meja Sirkulasi Lantai 2 / Ext. 4-2900')}
              className="h-9 px-4 rounded-lg bg-white text-[#131b2e] border border-[#c4c5d7]/40 hover:bg-[#eaedff] text-xs font-semibold transition-all"
              type="button"
            >
              Tanya Pustakawan
            </button>
            <button
              onClick={() => setActiveTab('cart')}
              className="text-xs text-[#0037b0] hover:underline font-semibold"
              type="button"
            >
              Aturan Peminjaman
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
