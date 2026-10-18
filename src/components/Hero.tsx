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
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1c1c1c] via-[#161616] to-[#121212] border-b-4 border-[#FF3366] py-14 sm:py-20 px-4">
      
      {/* Floating Animated Stickers */}
      <div 
        className="hidden md:block absolute top-6 left-8 bg-[#FFCC00] text-neutral-950 font-marker px-4 py-2 text-base rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] rotate-[-10deg] animate-sticker select-none pointer-events-none z-10"
        style={{ '--rot': '-10deg', '--rot-end': '-6deg' } as React.CSSProperties}
      >
        ⚡ OMG SO HYPE!
      </div>

      <div 
        className="hidden md:block absolute top-10 right-8 bg-[#00FFFF] text-neutral-950 font-marker px-4 py-2 text-base rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] rotate-[8deg] animate-sticker select-none pointer-events-none z-10"
        style={{ '--rot': '8deg', '--rot-end': '12deg' } as React.CSSProperties}
      >
        🥨 SNACK ATTACK!
      </div>

      <div 
        className="hidden lg:block absolute bottom-8 left-12 bg-[#FF3366] text-white font-marker px-3 py-1.5 text-xs rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] rotate-[4deg] select-none pointer-events-none z-10"
      >
        🐕 CERTIFIED AMBASSADOR
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Profile Avatar with Glowing Cyan Rim & Interactive Squeak Action */}
        <div className="relative mb-6">
          <BusterAvatar onSqueak={handleSqueak} />

          {/* Squeak Bubble Pop Reaction */}
          {activeReaction && (
            <div className="absolute -top-3 -right-3 bg-[#FF3366] text-white font-marker px-3 py-1 rounded-full border-2 border-white shadow-[3px_3px_0px_#000] text-sm animate-bounce z-30">
              {activeReaction}
            </div>
          )}

          {squeakCount > 0 && (
            <div className="absolute -bottom-3 bg-neutral-900/90 text-neutral-300 text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-700 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
              {squeakCount} barks triggered today
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="font-marker text-4xl sm:text-6xl text-[#FFCC00] drop-shadow-[4px_4px_0px_#FF3366] tracking-wide mb-4 leading-tight">
          Barnaby "Buster" Bark-Waggen
        </h1>

        {/* Bio */}
        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-6 font-normal">
          Over-caffeinated NYC street walker, professional zoomie athlete, and officially certified Pet-Human Ambassador. I haven't slept since 2024 and I regret nothing!
        </p>

        {/* Live Dog Park Timestamp Pill */}
        <div className="inline-flex items-center gap-2 bg-[#00FFFF] text-neutral-950 font-marker text-xs sm:text-sm px-4 py-2 rounded-md shadow-[3px_3px_0px_#FFFFFF] mb-8 select-none">
          <Clock className="w-4 h-4 text-neutral-900" />
          <span>11:45 AM — DOG PARK MAYHEM!</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#merch-store"
            className="px-6 py-3 bg-[#FF3366] hover:bg-[#ff1a4d] text-white font-marker text-base rounded-lg border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
          >
            <span>SNAG OFFICIAL MERCH</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#vlog-vault"
            className="px-6 py-3 bg-[#FFCC00] hover:bg-[#e6b800] text-neutral-950 font-marker text-base rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
          >
            <span>WATCH VLOG REELS</span>
          </a>

          <button
            onClick={handleSqueak}
            className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-[#00FFFF] font-marker text-sm rounded-lg border-2 border-[#00FFFF] shadow-[4px_4px_0px_#00FFFF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>HIT SQUEAKER</span>
          </button>
        </div>

      </div>
    </div>
  );
};
