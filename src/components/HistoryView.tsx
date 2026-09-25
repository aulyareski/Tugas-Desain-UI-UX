import React, { useState } from 'react';
import { MemberProfile, ActiveTab } from '../types';

interface HistoryViewProps {
  user: MemberProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onShowToast: (msg: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  user,
  setActiveTab,
  onShowToast,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'active' | 'returned'>('all');

  const historyRecords = [
    {
      id: 'REC-9011',
      title: 'Refactoring UI: Complete Edition',
      author: 'Adam Wathan & Steve Schoger',
      format: 'E-Book Digital',
      borrowedDate: '14 Okt 2024',
      dueDate: '28 Okt 2024',
      returnedDate: null,
      status: 'Aktif (Jatuh Tempo 2 Hari)',
      statusColor: 'bg-[#ffddb8] text-[#653e00]',
      fine: '$0.00',
    },
    {
      id: 'REC-8842',
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      format: 'Hardcover (Rak A12)',
      borrowedDate: '07 Okt 2024',
      dueDate: '04 Nov 2024',
      returnedDate: null,
      status: 'Aktif (Tenggat 9 Hari)',
      statusColor: 'bg-[#dce1ff] text-[#001551]',
      fine: '$0.00',
    },
    {
      id: 'REC-8520',
      title: 'Grid Systems in Graphic Design',
      author: 'Josef Müller-Brockmann',
      format: 'Arsip Khusus (B1)',
      borrowedDate: '26 Sep 2024',
      dueDate: '09 Nov 2024',
      returnedDate: null,
      status: 'Aktif (Arsip Khusus)',
      statusColor: 'bg-[#eaedff] text-[#131b2e]',
      fine: '$0.00',
    },
    {
      id: 'REC-7411',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      format: 'Paperback (Rak C1)',
      borrowedDate: '10 Sep 2024',
      dueDate: '24 Sep 2024',
      returnedDate: '22 Sep 2024',
      status: 'Telah Dikembalikan',
      statusColor: 'bg-[#6cf8bb]/40 text-[#00714d]',
      fine: '$0.00',
    },
    {
      id: 'REC-6992',
      title: 'Zero to One: Notes on Startups',
      author: 'Peter Thiel & Blake Masters',
      format: 'Paperback (Rak A1)',
      borrowedDate: '15 Agu 2024',
      dueDate: '29 Agu 2024',
      returnedDate: '28 Agu 2024',
      status: 'Telah Dikembalikan',
      statusColor: 'bg-[#6cf8bb]/40 text-[#00714d]',
      fine: '$0.00',
    },
    {
      id: 'REC-6410',
      title: 'The Pragmatic Programmer (20th Anniversary Edition)',
      author: 'David Thomas & Andrew Hunt',
      format: 'Hardcover (Rak B2)',
      borrowedDate: '01 Jul 2024',
      dueDate: '15 Jul 2024',
      returnedDate: '14 Jul 2024',
      status: 'Telah Dikembalikan',
      statusColor: 'bg-[#6cf8bb]/40 text-[#00714d]',
      fine: '$0.00',
    },
  ];

  const filtered = historyRecords.filter((rec) => {
    if (filterType === 'active') return rec.returnedDate === null;
    if (filterType === 'returned') return rec.returnedDate !== null;
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#0037b0]">
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              ARSIP SIRKULASI
            </span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-[#131b2e] tracking-tight">
            Riwayat Peminjaman Buku
          </h1>
          <p className="text-sm text-[#434655]">
            Catatan sirkulasi resmi untuk ID Anggota {user.memberId} ({user.name}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Mengunduh Bukti Sirkulasi Resmi (Format PDF)...')}
            className="h-10 px-4 rounded-lg bg-white border border-[#c4c5d7]/40 text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5 shadow-2xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh Laporan PDF</span>
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className="h-10 px-4 rounded-lg bg-[#1d4ed8] text-white text-xs font-semibold hover:bg-[#0037b0] transition-colors flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Pinjam Baru</span>
          </button>
        </div>
      </div>

      {/* Tabs / Filter Pills */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            filterType === 'all'
              ? 'bg-[#1d4ed8] text-white'
              : 'bg-white text-[#434655] hover:bg-[#f2f3ff] border border-[#c4c5d7]/30'
          }`}
        >
          Semua Catatan ({historyRecords.length})
        </button>
        <button
          onClick={() => setFilterType('active')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            filterType === 'active'
              ? 'bg-[#1d4ed8] text-white'
              : 'bg-white text-[#434655] hover:bg-[#f2f3ff] border border-[#c4c5d7]/30'
          }`}
        >
          Pinjaman Aktif (3)
        </button>
        <button
          onClick={() => setFilterType('returned')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            filterType === 'returned'
              ? 'bg-[#1d4ed8] text-white'
              : 'bg-white text-[#434655] hover:bg-[#f2f3ff] border border-[#c4c5d7]/30'
          }`}
        >
          Selesai / Dikembalikan (3)
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-xs border border-[#c4c5d7]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f3ff] border-b border-[#c4c5d7]/30 text-[#747686] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">ID Tiket</th>
                <th className="py-3 px-4">Judul Buku &amp; Pengarang</th>
                <th className="py-3 px-4">Format / Rak</th>
                <th className="py-3 px-4">Tgl Pinjam</th>
                <th className="py-3 px-4">Jatuh Tempo</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Denda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c5d7]/20 text-[#131b2e]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#faf8ff] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#0037b0] font-medium">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#131b2e]">{item.title}</div>
                    <div className="text-[11px] text-[#747686]">{item.author}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#434655]">{item.format}</td>
                  <td className="py-3.5 px-4 text-[#434655]">{item.borrowedDate}</td>
                  <td className="py-3.5 px-4 font-medium text-[#131b2e]">{item.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-[#006c49]">
                    {item.fine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
