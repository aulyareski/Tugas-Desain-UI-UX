import React, { useState } from 'react';
import { Book, CartItem, LoanItem, ActiveTab } from './types';
import { currentUser, sampleBooks, initialActiveLoans, initialCartItems } from './data/libraryData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CatalogView } from './components/CatalogView';
import { BookDetailView } from './components/BookDetailView';
import { CartCheckoutView } from './components/CartCheckoutView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { FigmaDesignSystemView } from './components/FigmaDesignSystemView';
import { LoginView } from './components/LoginView';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedBook, setSelectedBook] = useState<Book>(sampleBooks[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [activeLoans, setActiveLoans] = useState<LoanItem[]>(initialActiveLoans);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (book: Book) => {
    const existing = cartItems.find((item) => item.bookId === book.id);
    if (existing) {
      showToast(`"${book.title}" sudah ada di keranjang pinjaman Anda.`);
      setActiveTab('cart');
      return;
    }

    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      bookId: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      coverUrl: book.coverUrl,
      altText: book.altText,
      format: book.format,
      callNumber: book.callNumber,
      shelf: book.shelfLocation,
      barcodeId: book.barcodeId,
      durationDays: 14,
      pickupLocation: 'Perpustakaan Pusat • Meja Sirkulasi Utama',
      dueDate: '12 Nov 2024',
      isDigital: book.format === 'E-Book',
      isHighDemand: !book.isAvailable || book.rating >= 4.9,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`"${book.title}" ditambahkan ke keranjang pinjaman!`);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item dihapus dari keranjang.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Keranjang pinjaman dikosongkan.');
  };

  const handleUpdateDuration = (id: string, days: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const due = days === 7 ? '05 Nov 2024' : days === 14 ? '12 Nov 2024' : '26 Nov 2024';
          return { ...item, durationDays: days, dueDate: due };
        }
        return item;
      })
    );
  };

  const handleRenewLoan = (loanId: string) => {
    setActiveLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === loanId) {
          showToast(`Pinjaman "${loan.title}" berhasil diperpanjang 14 hari.`);
          return {
            ...loan,
            dueDaysLeft: loan.dueDaysLeft + 14,
            dueDate: '12 Nov 2024',
          };
        }
        return loan;
      })
    );
  };

  const handleReturnLoan = (loanId: string) => {
    const loan = activeLoans.find((l) => l.id === loanId);
    setActiveLoans((prev) => prev.filter((l) => l.id !== loanId));
    showToast(`Buku "${loan?.title || 'buku'}" telah dicatat pengembaliannya. Terima kasih!`);
  };

  const handleLogout = () => {
    setActiveTab('login');
    showToast('Sesi sirkulasi Anda telah keluar.');
  };

  if (activeTab === 'login') {
    return (
      <div className="min-h-screen bg-[#faf8ff] text-[#131b2e]">
        <LoginView
          user={currentUser}
          onLoginSuccess={() => {
            setActiveTab('dashboard');
          }}
          onContinueAsGuest={() => {
            setActiveTab('browse');
            showToast('Menjelajah dalam mode tamu. Silakan masuk saat ingin meminjam buku.');
          }}
          setActiveTab={setActiveTab}
          onShowToast={showToast}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex">
      {/* Fixed Navigation Rail / Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        isOpenMobile={isOpenMobileNav}
        setIsOpenMobile={setIsOpenMobileNav}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          user={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileNav={() => setIsOpenMobileNav(true)}
        />

        {/* Content Container */}
        <main className="w-full pt-20 px-4 sm:px-8 py-8 min-h-screen">
          {activeTab === 'dashboard' && (
            <DashboardView
              user={currentUser}
              books={sampleBooks}
              activeLoans={activeLoans}
              setActiveTab={setActiveTab}
              onSelectBook={handleSelectBook}
              onAddToCart={handleAddToCart}
              onRenewLoan={handleRenewLoan}
              onReturnLoan={handleReturnLoan}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'browse' && (
            <CatalogView
              books={sampleBooks}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectBook={handleSelectBook}
              onAddToCart={handleAddToCart}
              onShowToast={showToast}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'detail' && (
            <BookDetailView
              book={selectedBook}
              setActiveTab={setActiveTab}
              onAddToCart={handleAddToCart}
              onSelectBook={handleSelectBook}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'cart' && (
            <CartCheckoutView
              cartItems={cartItems}
              user={currentUser}
              setActiveTab={setActiveTab}
              onRemoveCartItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onUpdateDuration={handleUpdateDuration}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              user={currentUser}
              setActiveTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={currentUser}
              setActiveTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'figma-tokens' && (
            <FigmaDesignSystemView onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Floating Figma UI Kit Quick Switcher for Easy Review */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:block">
        <button
          onClick={() => setActiveTab(activeTab === 'figma-tokens' ? 'dashboard' : 'figma-tokens')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#131b2e] text-white shadow-xl hover:bg-[#0037b0] transition-all border border-white/20 text-xs font-semibold cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[#6cf8bb] text-[18px]">
            {activeTab === 'figma-tokens' ? 'arrow_back' : 'token'}
          </span>
          <span>
            {activeTab === 'figma-tokens' ? 'Kembali ke Aplikasi' : 'Buka Artboard Figma'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6cf8bb] animate-pulse"></span>
        </button>
      </div>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
