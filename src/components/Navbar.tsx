import React, { useState } from 'react';
import { Volume2, VolumeX, Tv, Menu, X } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { playSqueak } from '../utils/audio';

export const Navbar: React.FC = () => {
  const {
    soundEnabled,
    setSoundEnabled,
    scanlinesEnabled,
    setScanlinesEnabled
  } = useBuster();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) playSqueak(0.2);
      return next;
    });
  };

  const toggleScanlines = () => {
    setScanlinesEnabled(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#121212]/95 backdrop-blur-md border-b-4 border-[#FF3366] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark (Top Bar Contract) */}
        <a 
          href="#" 
          className="group flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00FFFF]"
        >
          <span className="font-marker text-2xl sm:text-3xl tracking-wide text-[#FFCC00] group-hover:text-[#FF3366] transition-colors drop-shadow-[2px_2px_0px_#FF3366]">
            BUSTER BARK-WAGGEN
          </span>
          <span className="hidden sm:inline-block bg-[#00FFFF] text-[#121212] font-marker text-xs px-2 py-0.5 rounded shadow-[2px_2px_0px_#000] rotate-[-3deg]">
            OFFICIAL
          </span>
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wider uppercase text-neutral-300">
          <a 
            href="#vibe-metrics" 
            className="hover:text-[#00FFFF] transition-colors hover:underline underline-offset-8 decoration-2 decoration-[#00FFFF] whitespace-nowrap shrink-0"
          >
            Vibe Metrics
          </a>
          <a 
            href="#vlog-vault" 
            className="hover:text-[#FFCC00] transition-colors hover:underline underline-offset-8 decoration-2 decoration-[#FFCC00] whitespace-nowrap shrink-0"
          >
            Vlog Vault
          </a>
          <a 
            href="#merch-store" 
            className="hover:text-[#00FFFF] transition-colors hover:underline underline-offset-8 decoration-2 decoration-[#00FFFF] whitespace-nowrap shrink-0"
          >
            Official Merch
          </a>
          <a 
            href="#zoomie-radar" 
            className="hover:text-[#FF3366] transition-colors hover:underline underline-offset-8 decoration-2 decoration-[#FF3366] whitespace-nowrap shrink-0"
          >
            Zoomie Radar
          </a>
          <a 
            href="#promo-request" 
            className="text-[#FFCC00] hover:text-white transition-colors hover:underline underline-offset-8 decoration-2 decoration-[#FFCC00] whitespace-nowrap shrink-0 font-bold"
          >
            Promotions
          </a>
        </nav>

        {/* Zone 3: Primary Action & Essential Interactive Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`p-2 rounded-lg border-2 transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-[#1e1e1e] border-[#00FFFF] text-[#00FFFF] shadow-[2px_2px_0px_#00FFFF]' 
                : 'bg-neutral-900 border-neutral-700 text-neutral-500'
            }`}
            title={soundEnabled ? 'Sound Effects Active' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* CRT Retro Scanline Toggle */}
          <button
            onClick={toggleScanlines}
            aria-label={scanlinesEnabled ? 'Disable CRT scanlines' : 'Enable CRT scanlines'}
            className={`hidden sm:flex p-2 rounded-lg border-2 transition-all cursor-pointer ${
              scanlinesEnabled 
                ? 'bg-[#1e1e1e] border-[#FFCC00] text-[#FFCC00] shadow-[2px_2px_0px_#FFCC00]' 
                : 'bg-neutral-900 border-neutral-700 text-neutral-500'
            }`}
            title={scanlinesEnabled ? 'CRT Retro Scanlines ON' : 'CRT Retro Scanlines OFF'}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Direct Promotions / Merch CTA button */}
          <a
            href="#promo-request"
            className="px-3.5 py-2 bg-[#FF3366] hover:bg-[#ff1a4d] text-white font-marker text-xs sm:text-sm rounded-lg border-2 border-white shadow-[3px_3px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
          >
            <span>WORK WITH BUSTER</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-lg bg-neutral-800 border-2 border-neutral-600 text-neutral-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-b-4 border-[#00FFFF] px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2 font-heading font-semibold text-sm uppercase">
            <a 
              href="#vibe-metrics" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-neutral-900 text-neutral-200 hover:text-[#00FFFF]"
            >
              ⚡ Vibe Metrics
            </a>
            <a 
              href="#vlog-vault" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-neutral-900 text-neutral-200 hover:text-[#FFCC00]"
            >
              🎬 Vlog Vault & Socials
            </a>
            <a 
              href="#merch-store" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-neutral-900 text-neutral-200 hover:text-[#00FFFF]"
            >
              🛍️ Official Merch Store
            </a>
            <a 
              href="#zoomie-radar" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-neutral-900 text-neutral-200 hover:text-[#FF3366]"
            >
              📍 NYC Zoomie Radar
            </a>
            <a 
              href="#promo-request" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-neutral-900 text-[#FFCC00] hover:text-white"
            >
              📣 Request Vlog / Promo
            </a>
          </nav>
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Scanlines & Effects</span>
            <button 
              onClick={toggleScanlines}
              className="text-xs font-bold text-[#FFCC00] underline"
            >
              {scanlinesEnabled ? 'Disable Scanlines' : 'Enable Scanlines'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
