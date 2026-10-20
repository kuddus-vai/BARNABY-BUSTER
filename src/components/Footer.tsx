import React from 'react';
import { Volume2, Tv, Dog } from 'lucide-react';
import { useBuster } from '../context/BusterContext';

export const Footer: React.FC = () => {
  const {
    scanlinesEnabled,
    setScanlinesEnabled,
    soundEnabled,
    setSoundEnabled
  } = useBuster();

  return (
    <footer className="bg-[#0d0d0d] border-t-4 border-[#FF3366] text-neutral-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copy */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-marker text-lg">
            <Dog className="w-5 h-5 text-[#FFCC00]" />
            <span>BARNABY "BUSTER" BARK-WAGGEN</span>
          </div>
          <p className="text-xs text-neutral-500 font-mono">
            &copy; 2026 Barnaby "Buster" Bark-Waggen. All rights reserved. Let's goooo!
          </p>
          <p className="text-[11px] text-neutral-600">
            Certified Pet-Human Ambassador · NYC Streetwalker Guild · Static Hosting & GitHub Pages Ready
          </p>
        </div>

        {/* Quick Utility Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-[#00FFFF] text-neutral-300 hover:text-[#00FFFF] flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Sound: {soundEnabled ? 'ON' : 'MUTED'}</span>
          </button>

          <button
            onClick={() => setScanlinesEnabled(prev => !prev)}
            className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-[#FFCC00] text-neutral-300 hover:text-[#FFCC00] flex items-center gap-1.5 transition-colors"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Scanlines: {scanlinesEnabled ? 'ACTIVE' : 'OFF'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
