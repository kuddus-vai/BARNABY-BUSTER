import React, { useState } from 'react';
import { Zap, Flame, Compass, Heart, Wind, Gauge } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { playZoomie } from '../utils/audio';

export const VibeMetrics: React.FC = () => {
  const { soundEnabled } = useBuster();
  const [zoomieLevel, setZoomieLevel] = useState<number>(100);

  const handleZoomieChange = (newVal: number) => {
    setZoomieLevel(newVal);
    if (soundEnabled && newVal > 120) {
      playZoomie(0.2);
    }
  };

  const getStatusText = (val: number) => {
    if (val < 30) return '💤 Couch Potato Mode (Recharging battery with belly rubs)';
    if (val < 70) return '🐾 Polite Trot (Sniffing leaves at standard sidewalk pace)';
    if (val < 130) return '⚡ Optimal Mayhem (Executing 360-degree dog park spins)';
    return '🚀 TURBO CHARGED (Approaching speed of sound, MTA warned!)';
  };

  const calculatedSpeed = Math.round((zoomieLevel / 100) * 28.4);

  return (
    <section id="vibe-metrics" className="scroll-mt-24 mb-16">
      
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-marker text-2xl sm:text-3xl text-[#00FFFF] uppercase tracking-wide flex items-center gap-2.5">
          <Zap className="w-7 h-7 text-[#FFCC00]" />
          <span>Vibe Metrics</span>
        </h2>
        <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
          TELEMETRY // LIVE
        </span>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Energy Level */}
        <div className="bg-[#1e1e1e] border-3 border-[#FF3366] p-6 rounded-xl text-center shadow-[5px_5px_0px_#FF3366] transition-transform hover:-translate-y-1">
          <div className="inline-flex p-3 rounded-full bg-[#FF3366]/20 text-[#FF3366] mb-3">
            <Flame className="w-8 h-8" />
          </div>
          <h3 className="text-4xl sm:text-5xl font-marker text-[#FFCC00] mb-1 tabular-nums">
            ∞ / 10
          </h3>
          <p className="text-neutral-300 font-semibold text-base uppercase tracking-wider">
            Energy Level
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            Has not sat still since the Great Squirrel Incident of 2024.
          </p>
        </div>

        {/* Card 2: Focus Span */}
        <div className="bg-[#1e1e1e] border-3 border-[#FFCC00] p-6 rounded-xl text-center shadow-[5px_5px_0px_#FFCC00] transition-transform hover:-translate-y-1">
          <div className="inline-flex p-3 rounded-full bg-[#FFCC00]/20 text-[#FFCC00] mb-3">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-4xl sm:text-5xl font-marker text-[#00FFFF] mb-1 tabular-nums">
            2 / 10
          </h3>
          <p className="text-neutral-300 font-semibold text-base uppercase tracking-wider">
            Focus Span
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            "Wait what was that? A leaf? Did you say treat? A LEAF?!"
          </p>
        </div>

        {/* Card 3: Charisma */}
        <div className="bg-[#1e1e1e] border-3 border-[#00FFFF] p-6 rounded-xl text-center shadow-[5px_5px_0px_#00FFFF] transition-transform hover:-translate-y-1">
          <div className="inline-flex p-3 rounded-full bg-[#00FFFF]/20 text-[#00FFFF] mb-3">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-4xl sm:text-5xl font-marker text-[#FF3366] mb-1 tabular-nums">
            9 / 10
          </h3>
          <p className="text-neutral-300 font-semibold text-base uppercase tracking-wider">
            Charisma
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            Subway passengers physically cannot resist giving head scratches.
          </p>
        </div>

      </div>

      {/* Interactive Zoomie Controller / Engine Dial */}
      <div className="bg-neutral-900 border-2 border-neutral-700 p-6 rounded-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-[#FFCC00]" />
              <h4 className="font-marker text-lg text-white uppercase tracking-wide">
                Interactive Zoomie Throttle
              </h4>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Adjust Buster's caffeine and energy levels in real-time
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-neutral-400 block">ESTIMATED VELOCITY</span>
              <span className="font-mono text-xl font-bold text-[#00FFFF] tabular-nums">
                {calculatedSpeed} MPH
              </span>
            </div>
            <div className="text-right pl-3 border-l border-neutral-700">
              <span className="text-xs text-neutral-400 block">THROTTLE</span>
              <span className="font-mono text-xl font-bold text-[#FFCC00] tabular-nums">
                {zoomieLevel}%
              </span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={zoomieLevel}
            onChange={(e) => handleZoomieChange(Number(e.target.value))}
            aria-label="Adjust Buster's zoomie throttle level"
            className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF3366] focus-visible:outline-2 focus-visible:outline-[#00FFFF]"
          />
          <div className="flex justify-between text-[11px] font-mono text-neutral-400">
            <span>0% Sleepy Pup</span>
            <span>50% Standard Trot</span>
            <span>100% NYC Default</span>
            <span>200% MAX TURBO</span>
          </div>
        </div>

        {/* Dynamic Vibe Readout */}
        <div className="mt-4 p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center gap-2.5">
          <Wind className={`w-4 h-4 text-[#FF3366] ${zoomieLevel > 120 ? 'animate-spin' : ''}`} />
          <span className="text-xs font-mono text-neutral-300">
            {getStatusText(zoomieLevel)}
          </span>
        </div>
      </div>

    </section>
  );
};
