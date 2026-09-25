import React, { useState } from 'react';
import { Book, ActiveTab } from '../types';

interface BookDetailViewProps {
  book: Book;
  setActiveTab: (tab: ActiveTab) => void;
  onAddToCart: (book: Book) => void;
  onSelectBook: (book: Book) => void;
  onShowToast: (msg: string) => void;
}

export const BookDetailView: React.FC<BookDetailViewProps> = ({
  book,
  setActiveTab,
  onAddToCart,
  onSelectBook,
  onShowToast,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCitationModal, setShowCitationModal] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2400);
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    onShowToast(!isSaved ? 'Disimpan ke rak bacaan pribadi' : 'Dihapus dari rak bacaan');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Tautan buku disalin ke clipboard!');
    } else {
      onShowToast('Tautan siap dibagikan');
    }
  };

  const bibtexCitation = `@book{${book.author.split(' ')[0].toLowerCase()}${book.year},
  title={${book.title}},
  author={${book.author}},
  isbn={${book.isbn}},
  year={${book.year}},
  publisher={${book.publisher}}
}`;

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#c4c5d7]/30">
        <nav className="flex items-center gap-2 text-xs text-[#434655] flex-wrap">
          <button
            onClick={() => setActiveTab('browse')}
            className="hover:text-[#0037b0] transition-colors flex items-center gap-1 font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">west</span>
            <span>Kembali ke Katalog</span>
          </button>
          <span className="text-[#c4c5d7]">/</span>
          <button
            onClick={() => setActiveTab('browse')}
            className="hover:text-[#131b2e] transition-colors"
          >
            Jelajahi Buku
          </button>
          <span className="text-[#c4c5d7]">/</span>
          <span className="text-[#434655] truncate">{book.discipline}</span>
          <span className="text-[#c4c5d7]">/</span>
          <span className="text-[#131b2e] font-medium truncate max-w-xs">{book.title}</span>
        </nav>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleSaveToggle}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c4c5d7]/40 text-xs transition-colors ${
              isSaved
                ? 'bg-[#dce1ff] text-[#001551] font-semibold'
                : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#434655]'
            }`}
            title="Simpan"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isSaved ? 'fill-1 text-[#0037b0]' : ''
              }`}
            >
              {isSaved ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-xs text-[#434655] transition-colors border border-[#c4c5d7]/40"
            title="Bagikan Buku"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Bagikan</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid (12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* Left Column: Visual Stage & Physical Inventory (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Book Visual Stage Card */}
          <div className="bg-white rounded-xl p-8 border border-[#c4c5d7]/30 shadow-xs flex flex-col items-center relative overflow-hidden">
            {/* Ambient Radial Tint Behind Cover */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0037b0]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Institutional Pill Tag */}
            <div className="self-start mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#0037b0] text-[11px] font-semibold border border-[#0037b0]/20">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Salinan Arsip Terverifikasi • Koleksi Stanford Press</span>
            </div>

            {/* Book Cover Container with Spine Depth Effect */}
            <div className="relative group perspective-1000 transition-transform duration-300 hover:-translate-y-1">
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-[#dae2fd] max-w-[280px] sm:max-w-[320px] aspect-[2/3] ring-1 ring-black/10">
                <img
                  alt={book.altText}
                  className="w-full h-full object-cover select-none"
                  src={book.coverUrl}
                />
                {/* Book Sheen / Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15 pointer-events-none"></div>
                {/* Left Edge Spine Highlight */}
                <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-white/30 to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-3 left-6 right-6 h-4 bg-black/20 blur-md -z-10 rounded-full"></div>
            </div>

            {/* Visual Quick-Action Under Cover */}
            <div className="mt-6 flex items-center gap-4 text-[#747686] text-xs font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Sampul Tebal (Standar)</span>
              </span>
              <span className="text-[#c4c5d7]">•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                <span>Tag RFID</span>
              </span>
            </div>
          </div>

          {/* Physical Stacks & Lending Inventory Card */}
          <div className="bg-white rounded-xl p-6 border border-[#c4c5d7]/30 shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-base text-[#131b2e] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0037b0] text-[20px]">shelves</span>
                <span>Koleksi Fisik</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-xs font-semibold border border-[#006c49]/20">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                <span>Tersedia Sekarang</span>
              </span>
            </div>

            {/* Shelf Location Banner */}
            <div className="p-3.5 rounded-lg bg-[#f2f3ff] flex items-start gap-3 border border-[#c4c5d7]/20">
              <span className="material-symbols-outlined text-[#0037b0] text-[22px] mt-0.5">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#131b2e]">
                  {book.shelfLocation} • Bagian 2
                </span>
                <span className="text-xs text-[#434655]">
                  {book.shelfDetails}
                </span>
              </div>
            </div>

            {/* Specs Key-Value Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#c4c5d7]/20 text-xs">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#747686] uppercase tracking-wider font-semibold">
                  NOMOR PANGGILAN
                </span>
                <span className="font-mono text-[#131b2e] font-medium pt-0.5">
                  {book.callNumber}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#747686] uppercase tracking-wider font-semibold">
                  ID BARCODE
                </span>
                <span className="font-mono text-[#131b2e] font-medium pt-0.5">
                  {book.barcodeId}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#747686] uppercase tracking-wider font-semibold">
                  DESIMAL DEWEY
                </span>
                <span className="font-mono text-[#131b2e] font-medium pt-0.5">
                  {book.deweyDecimal}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#747686] uppercase tracking-wider font-semibold">
                  SIRKULASI SALINAN
                </span>
                <span className="text-[#131b2e] font-medium pt-0.5">
                  <strong className="text-[#006c49] font-semibold">
                    {book.availableCopies}
                  </strong>{' '}
                  tersedia dari {book.totalCopies} total
                </span>
              </div>
            </div>

            {/* Circulation Visual Indicator Mini Bar */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between text-xs text-[#747686]">
                <span>Rasio ketersediaan</span>
                <span>
                  {Math.round((book.availableCopies / (book.totalCopies || 1)) * 100)}% di lokasi
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#e2e7ff] rounded-full overflow-hidden flex">
                <div
                  className="bg-[#006c49] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round((book.availableCopies / (book.totalCopies || 1)) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata, Actions, Synopsis (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Primary Header Module */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#dce1ff] text-[#001551]">
                {book.discipline}
              </span>
              <span className="text-[#c4c5d7]">•</span>
              <span className="text-xs text-[#747686] font-medium">{book.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#131b2e] tracking-tight leading-tight pt-1">
              {book.title}
            </h1>

            {book.subtitle && (
              <p className="font-serif text-lg text-[#434655] font-normal leading-snug">
                {book.subtitle}
              </p>
            )}

            {/* Byline & Contributor */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-[#131b2e]">
              <span>
                Oleh{' '}
                <strong className="font-semibold text-[#0037b0] underline underline-offset-4 decoration-[#0037b0]/30 hover:decoration-[#0037b0] cursor-pointer">
                  {book.author}
                </strong>
              </span>
              {book.editorialContributors && (
                <>
                  <span className="text-[#c4c5d7]">•</span>
                  <span className="text-[#434655]">
                    Kontribusi editorial oleh {book.editorialContributors}
                  </span>
                </>
              )}
            </div>

            {/* Rating Row */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center text-[#623c00]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-[#131b2e]">{book.rating}</span>
              <span className="text-xs text-[#747686]">
                ({book.reviewsCount} ulasan akademik terverifikasi)
              </span>
              <span className="text-[#c4c5d7]">•</span>
              <span className="text-xs text-[#006c49] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Standar Inti Kurikulum</span>
              </span>
            </div>
          </div>

          {/* Publication Metadata Ribbon */}
          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#c4c5d7]/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#747686]">Penerbit</span>
              <span className="font-medium text-[#131b2e] pt-0.5">{book.publisher}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#747686]">Edisi</span>
              <span className="font-medium text-[#131b2e] pt-0.5">{book.edition}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#747686]">ISBN Standar</span>
              <span className="font-medium text-[#131b2e] pt-0.5">{book.isbn}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#747686]">Panjang</span>
              <span className="font-medium text-[#131b2e] pt-0.5">
                {book.pages} Halaman (Bergambar)
              </span>
            </div>
          </div>

          {/* Action Panel */}
          <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#c4c5d7]/30 shadow-xs">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-11 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all duration-200 active:scale-[0.99] ${
                  isAdded
                    ? 'bg-[#006c49] text-white'
                    : 'bg-[#1d4ed8] hover:bg-[#0037b0] text-white'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isAdded ? 'check_circle' : 'shopping_bag'}
                </span>
                <span>
                  {isAdded ? 'Ditambahkan ke Keranjang!' : '+ Tambah ke Keranjang Pinjaman'}
                </span>
              </button>

              {/* Secondary Back Button */}
              <button
                onClick={() => setActiveTab('browse')}
                className="h-11 px-5 bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#c4c5d7]/60 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Kembali ke Katalog</span>
              </button>
            </div>

            {/* Tertiary Utility Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#c4c5d7]/20 text-xs text-[#434655]">
              <button
                onClick={() => setShowCitationModal(true)}
                className="inline-flex items-center gap-1.5 hover:text-[#0037b0] transition-colors py-1 cursor-pointer font-medium"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">format_quote</span>
                <span>Unduh Sitasi (BibTeX / APA)</span>
              </button>

              <button
                onClick={handleSaveToggle}
                className="inline-flex items-center gap-1.5 hover:text-[#0037b0] transition-colors py-1 cursor-pointer font-medium"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                <span>Tambah ke Rak Bacaan</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 hover:text-[#0037b0] transition-colors py-1 cursor-pointer font-medium"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Bagikan Tautan Judul</span>
              </button>
            </div>
          </div>

          {/* Book Synopsis */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl text-[#131b2e] border-b border-[#c4c5d7]/20 pb-2">
              Sinopsis Buku
            </h2>
            <div className="text-sm text-[#434655] leading-relaxed space-y-4">
              <p>{book.synopsis}</p>
              <p>
                Dalam panduan definitif ini, {book.author} membantu para pemimpin teknis, arsitek sistem terdistribusi, dan insinyur perangkat lunak menjelajahi beragam lanskap mesin pemrosesan dan penyimpanan data. Dengan membedah prinsip-prinsip inti yang mendasari infrastruktur modern, buku ini menelaah lebih dalam di balik istilah populer NoSQL, pemrosesan aliran data, pipeline batch, dan algoritma konsensus terdistribusi.
              </p>
              <p>
                Eksplorasi utama mencakup perbandingan model penyimpanan dari LSM-tree dan B-tree hingga analitik berorientasi kolom, pengelolaan konsistensi dan status di seluruh replika terpartisi, rekonsiliasi transaksi dalam ekosistem microservices, serta pemanfaatan paradigma basis data tak terikat untuk sistem perusahaan yang adaptif.
              </p>
            </div>
          </div>

          {/* Key Subjects & Topics Tags */}
          <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-xs uppercase tracking-wider text-[#747686] font-semibold">
              SUBJEK &amp; TAKSONOMI UTAMA
            </h3>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs border border-[#c4c5d7]/30 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Titles & Circulation Companion Card */}
          {book.relatedBook && (
            <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#c4c5d7]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 bg-[#e2e7ff] rounded flex items-center justify-center text-[#0037b0] shrink-0 shadow-xs border border-[#c4c5d7]/40">
                  <span className="material-symbols-outlined text-[24px]">auto_stories</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#131b2e]">
                    Sering Dipinjam Bersama
                  </span>
                  <span className="text-xs text-[#434655]">
                    "{book.relatedBook.title}" oleh {book.relatedBook.author}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onShowToast(`Menampilkan pasangan buku: ${book.relatedBook?.title}`)}
                className="shrink-0 px-3.5 py-1.5 rounded-lg bg-white border border-[#c4c5d7]/50 text-xs text-[#0037b0] hover:bg-[#eaedff] font-semibold transition-colors"
                type="button"
              >
                Lihat Pasangan
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Citation Modal */}
      {showCitationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-[#c4c5d7]/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#c4c5d7]/20">
              <h3 className="text-base font-semibold text-[#131b2e]">
                Format Sitasi Akademik
              </h3>
              <button
                onClick={() => setShowCitationModal(false)}
                className="p-1 rounded-md text-[#747686] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#131b2e] mb-1">APA 7th Edition:</span>
                <p className="text-xs text-[#434655] bg-[#f2f3ff] p-2.5 rounded-lg font-mono">
                  {book.author} ({book.year}). <em>{book.title}</em>. {book.publisher}.
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#131b2e] mb-1">BibTeX:</span>
                <pre className="text-[11px] text-[#131b2e] bg-[#f2f3ff] p-3 rounded-lg font-mono overflow-x-auto whitespace-pre">
                  {bibtexCitation}
                </pre>
              </div>
            </div>

            <div className="mt-5 pt-3 flex justify-end gap-2 border-t border-[#c4c5d7]/20">
              <button
                onClick={() => setShowCitationModal(false)}
                className="px-4 py-2 text-xs font-medium text-[#434655] hover:bg-[#f2f3ff] rounded-lg"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(bibtexCitation);
                  onShowToast('Sitasi BibTeX disalin ke clipboard!');
                  setShowCitationModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-[#0037b0] rounded-lg"
              >
                Salin BibTeX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
