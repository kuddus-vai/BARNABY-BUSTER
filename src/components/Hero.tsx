import React, { useState } from 'react';
import { Clock, Sparkles, Volume2, ArrowRight, Dog, Flame } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { playSqueak, playBark } from '../utils/audio';
import { BusterAvatar } from './BusterAvatar';

export const Hero: React.FC = () => {
  const { soundEnabled } = useBuster();
  const [squeakCount, setSqueakCount] = useState(0);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const handleSqueak = () => {
    if (soundEnabled) {
      if (Math.random() > 0.4) {
        playSqueak(0.35);
      } else {
        playBark(0.3);
      }
    }
    setSqueakCount(prev => prev + 1);
    setActiveReaction('🦴 SQUEAK!');
    setTimeout(() => setActiveReaction(null), 1200);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1c1c1c] via-[#161616] to-[#121212] border-b-4 border-[#FF3366] py-6 sm:py-9 px-4">
      
      {/* Floating Animated Stickers */}
      <div 
        className="hidden md:block absolute top-3 left-6 bg-[#FFCC00] text-neutral-950 font-marker px-3 py-1 text-xs sm:text-sm rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-10deg] animate-sticker select-none pointer-events-none z-10"
        style={{ '--rot': '-10deg', '--rot-end': '-6deg' } as React.CSSProperties}
      >
        ⚡ OMG SO HYPE!
      </div>

      <div 
        className="hidden md:block absolute top-3 right-6 bg-[#00FFFF] text-neutral-950 font-marker px-3 py-1 text-xs sm:text-sm rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] rotate-[8deg] animate-sticker select-none pointer-events-none z-10"
        style={{ '--rot': '8deg', '--rot-end': '12deg' } as React.CSSProperties}
      >
        🥨 SNACK ATTACK!
      </div>

      <div 
        className="hidden lg:block absolute bottom-3 left-8 bg-[#FF3366] text-white font-marker px-2.5 py-1 text-[11px] rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-[4deg] select-none pointer-events-none z-10"
      >
        🐕 CERTIFIED AMBASSADOR
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Profile Avatar with Glowing Cyan Rim & Interactive Squeak Action */}
        <div className="relative mb-2 sm:mb-3">
          <BusterAvatar onSqueak={handleSqueak} />

          {/* Squeak Bubble Pop Reaction */}
          {activeReaction && (
            <div className="absolute -top-2.5 -right-2.5 bg-[#FF3366] text-white font-marker px-2.5 py-0.5 rounded-full border-2 border-white shadow-[2px_2px_0px_#000] text-xs animate-bounce z-30">
              {activeReaction}
            </div>
          )}

          {squeakCount > 0 && (
            <div className="absolute -bottom-2 bg-neutral-900/90 text-neutral-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-neutral-700 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
              {squeakCount} barks triggered today
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="font-marker text-2xl sm:text-4xl text-[#FFCC00] drop-shadow-[3px_3px_0px_#FF3366] tracking-wide mb-1 sm:mb-1.5 leading-tight">
          Barnaby "Buster" Bark-Waggen
        </h1>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-snug mb-2.5 sm:mb-3 font-normal">
          Over-caffeinated NYC street walker, professional zoomie athlete, and officially certified Pet-Human Ambassador. I haven't slept since 2024 and I regret nothing!
        </p>

        {/* Live Dog Park Timestamp Pill */}
        <div className="inline-flex items-center gap-1.5 bg-[#00FFFF] text-neutral-950 font-marker text-[11px] sm:text-xs px-3 py-1 rounded-md shadow-[2px_2px_0px_#FFFFFF] mb-3.5 sm:mb-4 select-none">
          <Clock className="w-3.5 h-3.5 text-neutral-900" />
          <span>11:45 AM — DOG PARK MAYHEM!</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="#merch-store"
            className="px-4 py-2 bg-[#FF3366] hover:bg-[#ff1a4d] text-white font-marker text-xs sm:text-sm rounded-lg border-2 border-white shadow-[3px_3px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
          >
            <span>SNAG OFFICIAL MERCH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#vlog-vault"
            className="px-4 py-2 bg-[#FFCC00] hover:bg-[#e6b800] text-neutral-950 font-marker text-xs sm:text-sm rounded-lg border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
          >
            <span>WATCH VLOG REELS</span>
          </a>

          <button
            onClick={handleSqueak}
            className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-[#00FFFF] font-marker text-xs sm:text-sm rounded-lg border-2 border-[#00FFFF] shadow-[3px_3px_0px_#00FFFF] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>HIT SQUEAKER</span>
          </button>
        </div>

      </div>
    </div>
  );
};
