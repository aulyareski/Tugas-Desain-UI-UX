import React, { useState } from 'react';
import { Book, ActiveTab } from '../types';

interface CatalogViewProps {
  books: Book[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onShowToast: (msg: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  books,
  searchQuery,
  setSearchQuery,
  onSelectBook,
  onAddToCart,
  onShowToast,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('Paling Relevan');
  const [selectedEra, setSelectedEra] = useState('2020–2024');
  const [availabilityFilter, setAvailabilityFilter] = useState('tersedia');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    'Teknologi & Komputasi',
    'Bisnis & Kepemimpinan',
    'Seni, Arsitektur & Desain',
  ]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    'Sampul Tebal (Hardcover)',
    'Sampul Tipis (Paperback)',
  ]);
  const [selectedBranch, setSelectedBranch] = useState('Perpustakaan Pusat (Main Stacks)');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      onShowToast(next[id] ? 'Ditambahkan ke daftar favorit' : 'Dihapus dari favorit');
      return next;
    });
  };

  const toggleDiscipline = (disc: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(disc) ? prev.filter((d) => d !== disc) : [...prev, disc]
    );
  };

  const toggleFormat = (fmt: string) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const resetAllFilters = () => {
    setSelectedDisciplines([
      'Teknologi & Komputasi',
      'Bisnis & Kepemimpinan',
      'Seni, Arsitektur & Desain',
    ]);
    setAvailabilityFilter('tersedia');
    setSelectedEra('2020–2024');
    setSelectedFormats(['Sampul Tebal (Hardcover)', 'Sampul Tipis (Paperback)']);
    setSearchQuery('');
    onShowToast('Filter dikembalikan ke pengaturan default');
  };

  // Filter books based on search and disciplines
  const filteredBooks = books.filter((b) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (selectedDisciplines.length > 0) {
      if (!selectedDisciplines.includes(b.discipline)) {
        return false;
      }
    }
    if (availabilityFilter === 'tersedia' && !b.isAvailable) {
      return false;
    }
    if (availabilityFilter === 'ebook' && b.format !== 'E-Book') {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner & Title Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#0037b0]">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              KOLEKSI UNIVERSITAS
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#131b2e] tracking-tight">
            Katalog Perpustakaan
          </h1>
          <p className="text-sm text-[#434655] mt-1">
            Jelajahi lebih dari 24.500 judul fisik dan digital di seluruh koleksi perpustakaan universitas.
          </p>
        </div>

        {/* Filter Badges & Sort Controls Bar */}
        <div className="flex items-center flex-wrap gap-2 bg-white p-1.5 rounded-lg shadow-xs border border-[#c4c5d7]/30">
          {selectedDisciplines.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f2f3ff] rounded-md text-[#434655] text-xs">
              <span>
                Disiplin Ilmu: <strong className="text-[#131b2e]">{selectedDisciplines.length} Dipilih</strong>
              </span>
              <button
                onClick={() => setSelectedDisciplines([])}
                aria-label="Hapus filter disiplin"
                className="hover:text-[#ba1a1a] transition-colors flex items-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f2f3ff] rounded-md text-[#434655] text-xs">
            <span>
              Ketersediaan: <strong className="text-[#131b2e]">{availabilityFilter === 'tersedia' ? 'Tersedia' : 'Semua'}</strong>
            </span>
            <button
              onClick={() => setAvailabilityFilter('all')}
              aria-label="Hapus filter ketersediaan"
              className="hover:text-[#ba1a1a] transition-colors flex items-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>

          <div className="h-5 w-px bg-[#c4c5d7]/30 mx-1"></div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-transparent pl-3 pr-8 py-1.5 text-xs text-[#131b2e] font-medium focus:outline-none cursor-pointer"
            >
              <option value="Paling Relevan">Urutkan: Paling Relevan</option>
              <option value="Terbaru">Tanggal Publikasi (Terbaru)</option>
              <option value="Populer">Paling Banyak Dipinjam</option>
              <option value="Rating">Rating Tertinggi</option>
              <option value="Panggil">Nomor Panggil (A-Z)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-[#747686] text-[16px]">
              expand_more
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#f2f3ff] p-0.5 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`p-1 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-[#0037b0] shadow-xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={`p-1 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-[#0037b0] shadow-xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between pb-4 text-[#434655] text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#006c49]"></span>
          <span>
            Menampilkan <strong className="text-[#131b2e] font-medium">1–{filteredBooks.length}</strong> dari 842 judul yang cocok
          </span>
          {searchQuery && (
            <span className="text-[#0037b0] font-medium">
              (kata kunci: "{searchQuery}")
            </span>
          )}
        </div>
        <span className="hidden sm:inline text-[11px] tracking-wide uppercase text-[#747686]">
          DIPERBARUI 14 MENIT LALU
        </span>
      </div>

      {/* Main Grid: Filter Sidebar + Book Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Filter Sidebar (3 cols) */}
        <aside className="lg:col-span-3 bg-white rounded-xl shadow-xs p-6 flex flex-col gap-5 border border-[#c4c5d7]/30">
          <div className="flex items-center justify-between pb-2 border-b border-[#c4c5d7]/20">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[#131b2e]">Filter</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#dce1ff] text-[#001551] font-semibold">
                {selectedDisciplines.length} aktif
              </span>
            </div>
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#0037b0] hover:text-[#1d4ed8] font-medium transition-colors"
              type="button"
            >
              Atur Ulang Semua
            </button>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between w-full text-left text-xs font-semibold text-[#131b2e]">
              <span>Disiplin &amp; Kategori</span>
              <span className="material-symbols-outlined text-[#747686] text-[18px]">
                expand_less
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              {[
                { name: 'Fiksi & Sastra', count: 142 },
                { name: 'Teknologi & Komputasi', count: 428 },
                { name: 'Bisnis & Kepemimpinan', count: 215 },
                { name: 'Sains & Matematika', count: 189 },
                { name: 'Seni, Arsitektur & Desain', count: 94 },
                { name: 'Humaniora & Filsafat', count: 160 },
              ].map((item) => {
                const isChecked = selectedDisciplines.includes(item.name);
                return (
                  <label
                    key={item.name}
                    className="flex items-center justify-between cursor-pointer group py-0.5"
                  >
                    <span className="flex items-center gap-2 text-[#434655] group-hover:text-[#131b2e]">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleDiscipline(item.name)}
                        className="w-4 h-4 rounded text-[#1d4ed8] accent-[#1d4ed8] focus:ring-0 cursor-pointer"
                      />
                      <span className={isChecked ? 'font-medium text-[#131b2e]' : ''}>
                        {item.name}
                      </span>
                    </span>
                    <span
                      className={`text-[11px] ${
                        isChecked ? 'text-[#0037b0] font-semibold' : 'text-[#747686]'
                      }`}
                    >
                      {item.count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-[#eaedff]"></div>

          {/* Availability Filter */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#131b2e]">Ketersediaan</span>
            <div className="flex flex-col gap-1.5 pt-1 text-xs">
              <label
                onClick={() => setAvailabilityFilter('tersedia')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  availabilityFilter === 'tersedia' ? 'bg-[#f2f3ff]' : 'hover:bg-[#faf8ff]'
                }`}
              >
                <span className="flex items-center gap-2.5 text-[#131b2e] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                  <span>Tersedia Sekarang</span>
                </span>
                <input
                  type="radio"
                  name="avail"
                  checked={availabilityFilter === 'tersedia'}
                  onChange={() => setAvailabilityFilter('tersedia')}
                  className="accent-[#1d4ed8] cursor-pointer"
                />
              </label>

              <label
                onClick={() => setAvailabilityFilter('borrowed')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  availabilityFilter === 'borrowed' ? 'bg-[#f2f3ff]' : 'hover:bg-[#faf8ff]'
                }`}
              >
                <span className="flex items-center gap-2.5 text-[#434655]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]"></span>
                  <span>Sedang Dipinjam / Daftar Tunggu</span>
                </span>
                <input
                  type="radio"
                  name="avail"
                  checked={availabilityFilter === 'borrowed'}
                  onChange={() => setAvailabilityFilter('borrowed')}
                  className="accent-[#1d4ed8] cursor-pointer"
                />
              </label>

              <label
                onClick={() => setAvailabilityFilter('ebook')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  availabilityFilter === 'ebook' ? 'bg-[#f2f3ff]' : 'hover:bg-[#faf8ff]'
                }`}
              >
                <span className="flex items-center gap-2.5 text-[#434655]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]"></span>
                  <span>E-Book Digital Instan</span>
                </span>
                <input
                  type="radio"
                  name="avail"
                  checked={availabilityFilter === 'ebook'}
                  onChange={() => setAvailabilityFilter('ebook')}
                  className="accent-[#1d4ed8] cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="h-px bg-[#eaedff]"></div>

          {/* Publishing Year Filter */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#131b2e]">Era Publikasi</span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              {['Semua Tahun', '2020–2024', '2015–2019', 'Arsip'].map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-3 py-2 rounded-lg transition-colors text-center font-medium ${
                    selectedEra === era
                      ? 'bg-[#0037b0] text-white shadow-2xs font-semibold'
                      : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
                  }`}
                  type="button"
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#eaedff]"></div>

          {/* Material Format */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#131b2e]">Format Bahan</span>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              {[
                'Sampul Tebal (Hardcover)',
                'Sampul Tipis (Paperback)',
                'EPUB / PDF E-Book',
                'Buku Audio',
              ].map((fmt) => (
                <label key={fmt} className="flex items-center gap-2.5 cursor-pointer text-[#131b2e]">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(fmt)}
                    onChange={() => toggleFormat(fmt)}
                    className="w-4 h-4 rounded text-[#1d4ed8] accent-[#1d4ed8] focus:ring-0 cursor-pointer"
                  />
                  <span>{fmt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#eaedff]"></div>

          {/* Branch Location Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#131b2e]">Cabang Penyimpan</label>
            <div className="relative mt-1">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-[#f2f3ff] rounded-lg px-3 py-2 text-[#131b2e] text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-[#0037b0]/20 cursor-pointer border border-[#c4c5d7]/30"
              >
                <option>Perpustakaan Pusat (Main Stacks)</option>
                <option>Science &amp; Engineering Wing</option>
                <option>Turing Computing Hub</option>
                <option>Fine Arts Archives</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-[#747686] text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </aside>

        {/* Books Content Area (9 cols) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-[#c4c5d7]/30">
              <span className="material-symbols-outlined text-[48px] text-[#747686] mb-3">
                search_off
              </span>
              <h3 className="font-serif text-xl font-medium text-[#131b2e]">
                Tidak ada buku yang sesuai dengan filter
              </h3>
              <p className="text-sm text-[#434655] mt-1 max-w-md mx-auto">
                Coba sesuaikan kata kunci pencarian atau ubah kriteria filter pada kolom sebelah kiri.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-4 py-2 bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold hover:bg-[#0037b0] transition-colors"
              >
                Atur Ulang Filter
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View (4 columns on desktop) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBooks.map((book) => {
                const isFav = !!favorites[book.id];
                return (
                  <article
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="bg-white rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group border border-[#c4c5d7]/30 cursor-pointer"
                  >
                    <div>
                      {/* Cover container */}
                      <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-[#e2e7ff] mb-4 shadow-inner">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={book.coverUrl}
                          alt={book.altText}
                          loading="lazy"
                        />
                        {book.dueNotice ? (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] bg-[#ffddb8] text-[#653e00] font-semibold shadow-xs">
                            {book.dueNotice}
                          </span>
                        ) : (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] bg-[#6ffbbe] text-[#002113] font-semibold shadow-xs">
                            {book.shelfLocation}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold tracking-wider text-[#0037b0] uppercase">
                          {book.category}
                        </span>
                        <div className="flex items-center gap-1 text-[#623c00]">
                          <span
                            className="material-symbols-outlined text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="text-xs font-medium text-[#131b2e]">
                            {book.rating}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-sm font-semibold text-[#131b2e] line-clamp-1 group-hover:text-[#0037b0] transition-colors">
                        {book.title}
                      </h2>
                      <p className="text-xs text-[#434655] mt-0.5 truncate">{book.author}</p>
                    </div>

                    <div className="mt-4 pt-3 flex items-center gap-2 border-t border-[#c4c5d7]/20">
                      {book.isAvailable ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(book);
                          }}
                          className="flex-1 h-9 rounded-lg bg-[#1d4ed8] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#0037b0] transition-colors shadow-xs"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                          <span>Pinjam</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowToast(`Reservasi ditambahkan untuk ${book.title}. Anda berada di antrean #1`);
                          }}
                          className="flex-1 h-9 rounded-lg bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span>Antre / Reservasi</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => toggleFavorite(book.id, e)}
                        aria-label="Add to favorites"
                        className={`h-9 w-9 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-center ${
                          isFav ? 'text-[#0037b0]' : 'text-[#434655] hover:text-[#0037b0]'
                        }`}
                        type="button"
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isFav ? 'fill-1' : ''
                          }`}
                        >
                          {isFav ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="flex flex-col gap-3">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onSelectBook(book)}
                  className="p-4 bg-white rounded-xl border border-[#c4c5d7]/30 hover:border-[#0037b0]/50 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={book.coverUrl}
                      alt={book.altText}
                      className="w-12 h-18 object-cover rounded shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#0037b0] bg-[#dce1ff] px-2 py-0.5 rounded">
                          {book.category}
                        </span>
                        <span className="text-xs text-[#747686]">{book.shelfLocation}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#131b2e] truncate">{book.title}</h3>
                      <p className="text-xs text-[#434655]">{book.author} • {book.publisher}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <div className="text-right hidden md:block">
                      <div className="text-xs font-semibold text-[#131b2e]">{book.rating} ★</div>
                      <div className="text-[11px] text-[#747686]">{book.format}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(book);
                      }}
                      className="h-9 px-4 rounded-lg bg-[#1d4ed8] text-white text-xs font-semibold hover:bg-[#0037b0] transition-colors"
                    >
                      {book.isAvailable ? 'Pinjam Buku' : 'Reservasi'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-[#c4c5d7]/20">
            <div className="flex items-center gap-2 text-[#434655] text-xs">
              <span>Item per halaman:</span>
              <select className="bg-white rounded px-2 py-1 text-[#131b2e] text-xs shadow-2xs border border-[#c4c5d7]/40 focus:outline-none cursor-pointer">
                <option>12 per halaman</option>
                <option>24 per halaman</option>
                <option>48 per halaman</option>
              </select>
            </div>

            <nav
              aria-label="Pagination"
              className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-xs border border-[#c4c5d7]/30"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3 rounded-md text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors flex items-center gap-1 text-xs disabled:opacity-40"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              {[1, 2, 3].map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`h-9 w-9 rounded-md text-xs font-semibold ${
                    currentPage === pg
                      ? 'bg-[#1d4ed8] text-white'
                      : 'text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                  }`}
                  type="button"
                >
                  {pg}
                </button>
              ))}

              <span className="h-9 w-8 flex items-center justify-center text-[#747686] text-xs">
                …
              </span>

              <button
                onClick={() => setCurrentPage(71)}
                className={`h-9 w-9 rounded-md text-xs font-semibold ${
                  currentPage === 71
                    ? 'bg-[#1d4ed8] text-white'
                    : 'text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
                type="button"
              >
                71
              </button>

              <button
                onClick={() => setCurrentPage(Math.min(71, currentPage + 1))}
                className="h-9 px-3 rounded-md text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors flex items-center gap-1 text-xs"
                type="button"
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </nav>

            <div className="text-[#434655] text-xs">
              <span>
                Halaman <strong>{currentPage}</strong> dari <strong>71</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
