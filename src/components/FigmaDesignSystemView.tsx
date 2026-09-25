import React, { useState } from 'react';
import { figmaTokensJson } from '../data/libraryData';

interface FigmaDesignSystemViewProps {
  onShowToast: (msg: string) => void;
}

export const FigmaDesignSystemView: React.FC<FigmaDesignSystemViewProps> = ({
  onShowToast,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'colors' | 'typography' | 'buttons' | 'cards' | 'export'>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToken(label);
      onShowToast(`${label} disalin ke clipboard! Siap dipaste ke Figma.`);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  const downloadTokensJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(figmaTokensJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "bibliotech-figma-tokens.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('File bibliotech-figma-tokens.json berhasil diunduh!');
  };

  const cssTokensCode = `:root {
  /* Colors */
  --color-primary: #0037b0;
  --color-primary-container: #1d4ed8;
  --color-primary-fixed: #dce1ff;
  --color-surface-canvas: #faf8ff;
  --color-surface-card: #ffffff;
  --color-surface-low: #f2f3ff;
  --color-surface-container: #eaedff;
  --color-text-main: #131b2e;
  --color-text-muted: #434655;
  --color-semantic-success: #006c49;
  --color-semantic-warning: #623c00;
  --color-semantic-danger: #ba1a1a;
  --color-outline: #747686;
  --color-outline-variant: #c4c5d7;

  /* Typography */
  --font-editorial: "Newsreader", Georgia, serif;
  --font-system: "Inter", -apple-system, sans-serif;

  /* Spacing & Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}`;

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#c4c5d7]/40 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dce1ff] text-[#001551] text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-[16px]">token</span>
              <span>FIGMA DESIGN SYSTEM &amp; COMPONENT SUITE</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#131b2e] tracking-tight font-medium">
              Kirim ke Figma — UI Kit &amp; Tokens
            </h1>
            <p className="text-sm text-[#434655] mt-2 leading-relaxed">
              Seluruh komponen antarmuka dirancang dengan standar <em>Auto-Layout</em>, hierarki tipografi Newsreader &amp; Inter, palet warna Modern Archival, serta token variabel yang siap diimport langsung ke Figma via <strong>Tokens Studio</strong> atau plugin <strong>HTML to Figma</strong>.
            </p>
          </div>

          {/* Quick Export Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => copyToClipboard(JSON.stringify(figmaTokensJson, null, 2), 'JSON Tokens Studio')}
              className="h-11 px-4 rounded-xl bg-[#1d4ed8] text-white text-xs font-semibold hover:bg-[#0037b0] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
              <span>Salin JSON Tokens Studio</span>
            </button>

            <button
              onClick={downloadTokensJson}
              className="h-11 px-4 rounded-xl bg-[#f2f3ff] text-[#0037b0] border border-[#c4c5d7]/40 text-xs font-semibold hover:bg-[#eaedff] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh .tokens.json</span>
            </button>

            <button
              onClick={() => copyToClipboard(cssTokensCode, 'CSS Variables')}
              className="h-11 px-4 rounded-xl bg-white text-[#131b2e] border border-[#c4c5d7]/40 text-xs font-semibold hover:bg-[#f2f3ff] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">css</span>
              <span>Salin CSS Variables</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Subtabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-[#c4c5d7]/20">
          {[
            { id: 'all', label: 'Semua Artboard' },
            { id: 'colors', label: '01. Palet Warna' },
            { id: 'typography', label: '02. Tipografi' },
            { id: 'buttons', label: '03. Tombol & Variasi' },
            { id: 'cards', label: '04. Komponen & Kartu' },
            { id: 'export', label: '05. Panduan Import Figma' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeSubTab === tab.id
                  ? 'bg-[#0037b0] text-white shadow-2xs'
                  : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ARTBOARD 01: COLOR PALETTE */}
      {(activeSubTab === 'all' || activeSubTab === 'colors') && (
        <section className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#c4c5d7]/40 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c4c5d7]/20">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0037b0]">
                FRAME 01
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#131b2e]">
                Sistem Warna &amp; Palet Semantik
              </h2>
              <p className="text-xs text-[#434655] mt-0.5">
                Klik pada swatch warna untuk menyalin kode HEX langsung ke clipboard Figma Anda.
              </p>
            </div>
            <span className="text-xs font-mono bg-[#f2f3ff] px-3 py-1 rounded text-[#747686]">
              12 Token Utama
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Primary Royal', hex: '#0037b0', role: 'Brand Core', text: 'text-white' },
              { name: 'Primary Container', hex: '#1d4ed8', role: 'CTA Button', text: 'text-white' },
              { name: 'Primary Fixed', hex: '#dce1ff', role: 'Badge Pill', text: 'text-[#001551]' },
              { name: 'Surface Canvas', hex: '#faf8ff', role: 'Base Canvas', text: 'text-[#131b2e]', border: true },
              { name: 'Card Surface', hex: '#ffffff', role: 'Container', text: 'text-[#131b2e]', border: true },
              { name: 'Surface Low', hex: '#f2f3ff', role: 'Subtle Frame', text: 'text-[#131b2e]', border: true },
              { name: 'Surface High', hex: '#e2e7ff', role: 'Hover Rails', text: 'text-[#131b2e]' },
              { name: 'Text Primary', hex: '#131b2e', role: 'Headers / Body', text: 'text-white' },
              { name: 'Text Secondary', hex: '#434655', role: 'Labels / Captions', text: 'text-white' },
              { name: 'Semantic Success', hex: '#006c49', role: 'Tersedia / Good', text: 'text-white' },
              { name: 'Semantic Attention', hex: '#623c00', role: 'Jatuh Tempo', text: 'text-white' },
              { name: 'Semantic Danger', hex: '#ba1a1a', role: 'Denda / Overdue', text: 'text-white' },
            ].map((swatch) => (
              <div
                key={swatch.name}
                onClick={() => copyToClipboard(swatch.hex, swatch.name)}
                className={`group rounded-xl p-3 flex flex-col justify-between aspect-[1/1] cursor-pointer shadow-xs hover:scale-102 hover:shadow-md transition-all ${
                  swatch.border ? 'border border-[#c4c5d7]/40' : ''
                }`}
                style={{ backgroundColor: swatch.hex }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] uppercase font-bold tracking-wider opacity-80 ${swatch.text}`}>
                    {swatch.role}
                  </span>
                  <span className={`material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity ${swatch.text}`}>
                    content_copy
                  </span>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${swatch.text}`}>{swatch.name}</div>
                  <div className={`text-[11px] font-mono mt-0.5 opacity-90 ${swatch.text}`}>
                    {swatch.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ARTBOARD 02: TYPOGRAPHY HIERARCHY */}
      {(activeSubTab === 'all' || activeSubTab === 'typography') && (
        <section className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#c4c5d7]/40 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c4c5d7]/20">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0037b0]">
                FRAME 02
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#131b2e]">
                Skala Tipografi (Newsreader &amp; Inter)
              </h2>
              <p className="text-xs text-[#434655] mt-0.5">
                Kombinasi elegan antara serif editorial (Newsreader) untuk judul buku dan sans-serif (Inter) untuk sistem operasional.
              </p>
            </div>
            <div className="text-xs font-mono bg-[#f2f3ff] px-3 py-1 rounded text-[#747686]">
              Google Fonts Ready
            </div>
          </div>

          <div className="divide-y divide-[#c4c5d7]/20">
            {[
              {
                token: 'display-lg',
                font: 'Newsreader (Serif)',
                specs: '36px / Line Height: 44px / -0.02em',
                sample: 'Katalog Perpustakaan &amp; Sirkulasi',
                className: 'font-serif text-3xl sm:text-4xl text-[#131b2e]',
              },
              {
                token: 'headline-lg',
                font: 'Newsreader (Serif)',
                specs: '28px / Line Height: 36px / -0.015em',
                sample: 'Designing Data-Intensive Systems',
                className: 'font-serif text-2xl sm:text-3xl text-[#131b2e]',
              },
              {
                token: 'headline-md',
                font: 'Newsreader (Serif)',
                specs: '22px / Line Height: 30px / -0.01em',
                sample: 'Membangun Arsitektur Skalabel untuk Lanskap Data',
                className: 'font-serif text-xl sm:text-2xl text-[#131b2e]',
              },
              {
                token: 'headline-sm',
                font: 'Inter (Sans-Serif)',
                specs: '16px / Line Height: 24px / Semibold',
                sample: 'The Pragmatic Programmer: 20th Anniversary Edition',
                className: 'text-base font-semibold text-[#131b2e]',
              },
              {
                token: 'body-lg',
                font: 'Inter (Sans-Serif)',
                specs: '16px / Line Height: 24px / Regular',
                sample: 'Data adalah pusat dari hampir setiap tantangan rekayasa besar dalam perancangan sistem modern.',
                className: 'text-base text-[#434655]',
              },
              {
                token: 'body-md',
                font: 'Inter (Sans-Serif)',
                specs: '14px / Line Height: 20px / Regular',
                sample: 'Kelola peminjaman aktif Anda, jelajahi buku yang baru dikatalogkan, dan pantau tenggat waktu.',
                className: 'text-sm text-[#434655]',
              },
              {
                token: 'label-md',
                font: 'Inter (Sans-Serif)',
                specs: '12px / Line Height: 16px / Medium',
                sample: 'Disiplin Ilmu: 3 Dipilih • Rak B4 • Nomor Panggil: QA76.9.D3',
                className: 'text-xs font-medium text-[#0037b0]',
              },
              {
                token: 'label-sm',
                font: 'Inter (Sans-Serif)',
                specs: '11px / Line Height: 14px / Semibold Uppercase',
                sample: 'MEJA SIRKULASI • STANDAR INTI KURIKULUM • PILIHAN STAF',
                className: 'text-[11px] font-semibold tracking-wider uppercase text-[#0037b0]',
              },
            ].map((type) => (
              <div key={type.token} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-64 shrink-0">
                  <div className="font-mono text-xs font-bold text-[#0037b0]">{type.token}</div>
                  <div className="text-xs text-[#131b2e] font-medium mt-0.5">{type.font}</div>
                  <div className="text-[11px] text-[#747686]">{type.specs}</div>
                </div>
                <div className="flex-1">
                  <div className={type.className} dangerouslySetInnerHTML={{ __html: type.sample }} />
                </div>
                <button
                  onClick={() => copyToClipboard(type.specs, type.token)}
                  className="p-2 rounded-lg text-[#747686] hover:text-[#0037b0] hover:bg-[#f2f3ff] transition-colors self-start md:self-auto shrink-0"
                  title="Salin Spesifikasi"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ARTBOARD 03: BUTTON & CHIP MATRIX */}
      {(activeSubTab === 'all' || activeSubTab === 'buttons') && (
        <section className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#c4c5d7]/40 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c4c5d7]/20">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0037b0]">
                FRAME 03
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#131b2e]">
                Matriks Tombol, Status Badges &amp; Form Controls
              </h2>
              <p className="text-xs text-[#434655] mt-0.5">
                Varian interaktif dengan hover states, active states, dan padding auto-layout.
              </p>
            </div>
            <span className="text-xs font-mono bg-[#f2f3ff] px-3 py-1 rounded text-[#747686]">
              Interactive Tokens
            </span>
          </div>

          <div className="flex flex-col gap-8">
            {/* Buttons Row */}
            <div>
              <h3 className="text-xs font-semibold text-[#131b2e] uppercase tracking-wider mb-4">
                Varian Tombol (Button Components)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="h-10 px-5 rounded-lg bg-[#1d4ed8] text-white text-xs font-semibold hover:bg-[#0037b0] transition-colors shadow-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                  <span>Primary Pinjam</span>
                </button>

                <button className="h-10 px-5 rounded-lg bg-white text-[#131b2e] border border-[#c4c5d7]/50 text-xs font-semibold hover:bg-[#f2f3ff] transition-colors shadow-2xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Secondary Outline</span>
                </button>

                <button className="h-10 px-4 rounded-lg bg-[#f2f3ff] text-[#0037b0] text-xs font-semibold hover:bg-[#eaedff] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>Surface Action</span>
                </button>

                <button className="h-10 px-4 rounded-lg bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold hover:bg-[#dae2fd] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>Antre / Reservasi</span>
                </button>

                <button className="h-10 px-4 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold hover:bg-[#ffdad6]/80 transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  <span>Destructive Hapus</span>
                </button>

                <button className="h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#434655] hover:text-[#0037b0] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>

                <button disabled className="h-10 px-4 rounded-lg bg-[#eaedff] text-[#747686] text-xs font-semibold opacity-60 cursor-not-allowed">
                  Disabled State
                </button>
              </div>
            </div>

            {/* Chips & Badges Row */}
            <div>
              <h3 className="text-xs font-semibold text-[#131b2e] uppercase tracking-wider mb-4">
                Pills, Badges &amp; Label Status
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#6ffbbe] text-[#002113]">
                  Rak B4 (Tersedia)
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ffddb8] text-[#653e00] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#623c00]"></span>
                  Jatuh Tempo dlm 2 hari
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#dce1ff] text-[#001551]">
                  Disiplin: 3 Dipilih
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#4edea3]/30 text-[#006c49] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Status Baik
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#0037b0] text-white">
                  POPULER
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#006c49] text-white">
                  PILIHAN STAF
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#623c00] text-white">
                  REFERENSI
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e2e7ff] text-[#0037b0]">
                  Digital DRM
                </span>
              </div>
            </div>

            {/* Form Controls Row */}
            <div>
              <h3 className="text-xs font-semibold text-[#131b2e] uppercase tracking-wider mb-4">
                Form Inputs &amp; Selection Controls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#747686] text-[18px]">
                    search
                  </span>
                  <input
                    readOnly
                    value="Martin Kleppmann..."
                    className="w-full h-10 pl-10 pr-4 bg-[#faf8ff] border border-[#c4c5d7]/60 rounded-lg text-xs text-[#131b2e]"
                  />
                </div>

                <div className="relative">
                  <select
                    disabled
                    value="14"
                    className="w-full h-10 px-3 pr-8 bg-white border border-[#c4c5d7]/60 rounded-lg text-xs text-[#131b2e] appearance-none cursor-not-allowed"
                  >
                    <option value="14">14 Hari (Pinjaman Standar)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#747686] text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>

                <div className="flex items-center gap-4 px-3 py-2 bg-[#f2f3ff] rounded-lg border border-[#c4c5d7]/30">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#131b2e] cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-[#1d4ed8]" />
                    <span>Checkbox</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#131b2e] cursor-pointer">
                    <input type="radio" defaultChecked className="w-4 h-4 accent-[#1d4ed8]" />
                    <span>Radio Active</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTBOARD 04: COMPONENT SHOWCASE CARDS */}
      {(activeSubTab === 'all' || activeSubTab === 'cards') && (
        <section className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#c4c5d7]/40 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c4c5d7]/20">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0037b0]">
                FRAME 04
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#131b2e]">
                Komponen Kartu &amp; Modul Sirkulasi
              </h2>
              <p className="text-xs text-[#434655] mt-0.5">
                Struktur kartu buku standar rasio 2:3 dan KPI card untuk kemudahan duplikasi di Figma.
              </p>
            </div>
            <span className="text-xs font-mono bg-[#f2f3ff] px-3 py-1 rounded text-[#747686]">
              Component Frames
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Book Card Component Spec */}
            <div className="p-4 rounded-xl bg-white border border-[#c4c5d7]/40 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#747686] mb-2 font-mono">
                  <span>FRAME: BookCard_2x3</span>
                  <span>260 x 380 px</span>
                </div>
                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#e2e7ff] mb-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UbK6PaxBt0lECJVOWQnXLYLZz3_A6coP6L52nIrNV-xbmmbGW7X0WxaU0X635JSud-TU0fJkZp0NKyjz_yxY_x-G9FDYvcl-AHvbyERWF-aKrL6_N-IHA_IQ4983UsR2kZiQZl6No-H4EPd9nh2kaduHQXYnCvfl8aDLFigLFg7_aVEg-yT3wJtMJroKtdDf_i4MudotfU6QWZI7CxxjumFjeU9jQWAy7w8_foxvtUmEPNx-eD1OEkD2hz"
                    alt="Book Cover Spec"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] bg-[#6ffbbe] text-[#002113] font-semibold">
                    Rak B4
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[11px] font-semibold text-[#0037b0] uppercase">TECH &amp; SYSTEMS</span>
                  <span className="text-xs font-bold text-[#623c00]">★ 4.9</span>
                </div>
                <h4 className="text-xs font-semibold text-[#131b2e]">Designing Data-Intensive Applications</h4>
                <p className="text-[11px] text-[#747686]">Martin Kleppmann</p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#c4c5d7]/20 flex gap-2">
                <button className="flex-1 h-8 rounded bg-[#1d4ed8] text-white text-[11px] font-semibold">
                  Pinjam Buku
                </button>
              </div>
            </div>

            {/* KPI Card Component Spec */}
            <div className="p-5 rounded-xl bg-white border border-[#c4c5d7]/40 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#747686] mb-2 font-mono">
                  <span>FRAME: KPICard_Metric</span>
                  <span>Auto-Layout</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0037b0]">
                      <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                    </div>
                    <span className="text-xs font-semibold text-[#434655]">Buku Dipinjam</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#eaedff] text-[#434655] font-semibold">
                    Aktif
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl font-medium text-[#131b2e]">3</span>
                  <span className="text-xs text-[#747686]">/ 5 kuota item</span>
                </div>
                <p className="text-xs text-[#747686]">Pinjaman fisik &amp; digital aktif</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#c4c5d7]/20">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#747686]">Pemanfaatan Kuota</span>
                  <span className="font-semibold text-[#0037b0]">60%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                  <div className="h-full bg-[#0037b0] rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Location Banner Component Spec */}
            <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#c4c5d7]/40 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#747686] mb-2 font-mono">
                  <span>FRAME: ShelfBanner_Component</span>
                  <span>Shelf Spec</span>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <span className="material-symbols-outlined text-[#0037b0] text-[24px]">
                    location_on
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#131b2e]">Rak B4 • Bagian 2</span>
                    <p className="text-[11px] text-[#434655] mt-0.5">
                      Tumpukan Utama, Lantai 2 • Ruang Baca Sayap Timur
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#c4c5d7]/20 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#0037b0]">QA76.9.D3 K54</span>
                <span className="font-semibold text-[#006c49]">3 Salinan di Lokasi</span>
              </div>
            </div>

            {/* Login Screen Frame Spec */}
            <div className="p-5 rounded-xl bg-white border border-[#c4c5d7]/40 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#747686] mb-2 font-mono">
                  <span>FRAME: LoginScreen_Auth</span>
                  <span>1080 x 680 px</span>
                </div>
                <div className="p-3 bg-[#f2f3ff] rounded-lg border border-[#c4c5d7]/30 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-[#0037b0]">
                      PORTAL KEANGGOTAAN
                    </span>
                    <span className="text-[9px] bg-[#6cf8bb]/40 text-[#00714d] px-1.5 py-0.5 rounded font-bold">
                      Aktif
                    </span>
                  </div>
                  <h5 className="font-serif text-sm font-semibold text-[#131b2e]">
                    Masuk Akun Mahasiswa
                  </h5>
                  <p className="text-[10px] text-[#434655] mt-0.5">
                    Akses terintegrasi Meja Sirkulasi &amp; Loker 24/7
                  </p>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="h-6 bg-white rounded border border-[#c4c5d7]/40 flex items-center px-2 text-[10px] text-[#747686]">
                      #LIB-9842 / Email Kampus
                    </div>
                    <div className="h-6 bg-white rounded border border-[#c4c5d7]/40 flex items-center px-2 text-[10px] text-[#747686]">
                      ••••••••
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#c4c5d7]/20 flex items-center justify-between text-[11px]">
                <span className="text-[#0037b0] font-semibold">SSO + Form Kredensial</span>
                <span className="font-mono text-[#747686]">Auto-Layout Ready</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTBOARD 05: IMPORT GUIDE FOR FIGMA */}
      {(activeSubTab === 'all' || activeSubTab === 'export') && (
        <section className="bg-gradient-to-br from-[#f2f3ff] to-[#eaedff] rounded-2xl p-6 sm:p-8 border border-[#c4c5d7]/40 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0037b0]">
              PANDUAN LENGKAP
            </span>
            <h2 className="font-serif text-2xl font-medium text-[#131b2e] mt-1 mb-3">
              Cara Mengirim &amp; Mengimpor Aplikasi ke Figma
            </h2>
            <p className="text-xs text-[#434655] leading-relaxed mb-6">
              Berikut 3 cara termudah dan tercepat untuk membawa seluruh halaman atau komponen Bibliotech ke dalam file kerja Figma Anda:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Method 1: HTML to Figma Plugin */}
              <div className="p-4 bg-white rounded-xl shadow-xs border border-[#c4c5d7]/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#dce1ff] text-[#001551] flex items-center justify-center font-bold text-xs mb-3">
                    1
                  </div>
                  <h3 className="font-semibold text-[#131b2e] text-sm mb-1">
                    Plugin "html.to.design"
                  </h3>
                  <p className="text-[#434655] text-xs leading-relaxed">
                    Buka Figma &gt; Plugins &gt; cari <strong>html.to.design</strong> atau <strong>Builder.io</strong>. Masukkan URL aplikasi ini untuk mengonversi seluruh layar menjadi vektor Figma ber-Auto Layout dalam hitungan detik!
                  </p>
                </div>
                <div className="mt-4 pt-2 text-[11px] text-[#0037b0] font-semibold">
                  Metode Paling Direkomendasikan ★
                </div>
              </div>

              {/* Method 2: Tokens Studio Plugin */}
              <div className="p-4 bg-white rounded-xl shadow-xs border border-[#c4c5d7]/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#dce1ff] text-[#001551] flex items-center justify-center font-bold text-xs mb-3">
                    2
                  </div>
                  <h3 className="font-semibold text-[#131b2e] text-sm mb-1">
                    Figma Tokens Studio
                  </h3>
                  <p className="text-[#434655] text-xs leading-relaxed">
                    Klik tombol <strong>"Salin JSON Tokens Studio"</strong> di atas. Buka plugin <em>Tokens Studio for Figma</em>, pilih <strong>Load from JSON</strong>, dan seluruh styles (warna, font Newsreader &amp; Inter, radius) langsung tergenerate otomatis.
                  </p>
                </div>
                <button
                  onClick={downloadTokensJson}
                  className="mt-4 pt-2 text-[11px] text-[#0037b0] font-semibold text-left hover:underline cursor-pointer"
                >
                  Unduh .tokens.json &rarr;
                </button>
              </div>

              {/* Method 3: Copy SVG / Direct Frame Copy */}
              <div className="p-4 bg-white rounded-xl shadow-xs border border-[#c4c5d7]/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#dce1ff] text-[#001551] flex items-center justify-center font-bold text-xs mb-3">
                    3
                  </div>
                  <h3 className="font-semibold text-[#131b2e] text-sm mb-1">
                    Direct Code / SVG Copy
                  </h3>
                  <p className="text-[#434655] text-xs leading-relaxed">
                    Gunakan tombol salin di setiap token warna &amp; komponen. Setiap nilai diatur rapi dengan skala 8pt grid, memudahkan desainer menyusun ulang komponen secara modular.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-[11px] text-[#006c49] font-semibold">
                  100% Presisi Token
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
