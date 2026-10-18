import React, { useState } from 'react';
import { Volume2, Sparkles, Dog, Flame } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { 
  playLowBoof, 
  playHuskyDramaTantrum, 
  playRapidSquirrelYips, 
  playTalkingDog, 
  playDemandBark, 
  playBigChonkerWoof 
} from '../utils/audio';

interface DogBarkSound {
  id: string;
  name: string;
  subtitle: string;
  breedTag: string;
  icon: string;
  badge: string;
  accentColor: string;
  action: () => void;
}

export const Soundboard: React.FC = () => {
  const { soundEnabled, showToast } = useBuster();
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [barksDispatched, setBarksDispatched] = useState<number>(0);
  const [recentlyPlayedId, setRecentlyPlayedId] = useState<string | null>(null);

  const triggerBark = (id: string, soundFn: () => void, reactionText: string) => {
    soundFn();
    setActiveReaction(reactionText);
    setRecentlyPlayedId(id);
    setBarksDispatched(prev => prev + 1);
    setTimeout(() => {
      setActiveReaction(null);
      setRecentlyPlayedId(null);
    }, 900);
  };

  const handleCanineChorus = () => {
    // Chaos mode: trigger funny staggered bark medley
    playLowBoof(0.4);
    setTimeout(() => playTalkingDog(0.35), 180);
    setTimeout(() => playRapidSquirrelYips(0.35), 400);
    setTimeout(() => playHuskyDramaTantrum(0.4), 650);
    setBarksDispatched(prev => prev + 5);
    setActiveReaction('🚨 FULL CANINE CHOIR ACTIVATED!');
    showToast('Buster summoned all NYC dogs into one giant bark chorus!');
    setTimeout(() => setActiveReaction(null), 1800);
  };

  const barks: DogBarkSound[] = [
    {
      id: 'husky-drama',
      name: 'Husky Drama Tantrum',
      subtitle: 'Operatic howling argument over bath time',
      breedTag: 'Siberian Drama Queen',
      icon: '🐺',
      badge: 'A-WROOO-ROOO!',
      accentColor: '#00FFFF',
      action: () => triggerBark('husky-drama', () => playHuskyDramaTantrum(0.4), '🐺 A-WROOOOO-ROOO!')
    },
    {
      id: 'low-boof',
      name: 'The 2 AM Sneaky Boof',
      subtitle: 'Muffled suspicious boof at a jacket on the coat rack',
      breedTag: 'Guilty Terrier',
      icon: '🐕',
      badge: '*boof... boof*',
      accentColor: '#FFCC00',
      action: () => triggerBark('low-boof', () => playLowBoof(0.45), '🐕 *muffled boof*')
    },
    {
      id: 'squirrel-yips',
      name: 'Squirrel Alert Yip-Frenzy',
      subtitle: 'Three rapid-fire high velocity staccato barks',
      breedTag: 'Jack Russell Zoomie',
      icon: '🐿️',
      badge: 'YAP! YAP! YAP!',
      accentColor: '#FF3366',
      action: () => triggerBark('squirrel-yips', () => playRapidSquirrelYips(0.4), '⚡ YAP-YAP-YAP!')
    },
    {
      id: 'talking-dog',
      name: 'Talking Dog Back-Talk',
      subtitle: 'Chewbacca-style guttural canine verbal comeback',
      breedTag: 'Talking Golden',
      icon: '🗣️',
      badge: 'Row-Row-Raow!',
      accentColor: '#10B981',
      action: () => triggerBark('talking-dog', () => playTalkingDog(0.4), '🗣️ ROW-ROW-ROARGH!')
    },
    {
      id: 'demand-bacon',
      name: 'Impatient Bacon Demand',
      subtitle: 'High whimper that explodes into an urgent BORK',
      breedTag: 'Hungry Corgi',
      icon: '🥓',
      badge: '*whine* BORK!',
      accentColor: '#FFCC00',
      action: () => triggerBark('demand-bacon', () => playDemandBark(0.45), '🥓 *whine* BORK!')
    },
    {
      id: 'subwoofer-woof',
      name: 'Subwoofer Floor-Shaker',
      subtitle: 'Deep 120-lb Mastiff ground-shaking chest ruff',
      breedTag: 'Giant Chonker',
      icon: '🐻',
      badge: 'THUDDING RUFF!',
      accentColor: '#FF3366',
      action: () => triggerBark('subwoofer-woof', () => playBigChonkerWoof(0.5), '🐻 BOOOOM RUFF!')
    }
  ];

  return (
    <section id="soundboard" className="scroll-mt-24 mb-16">
      <div className="bg-[#181818] border-3 border-[#00FFFF] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#00FFFF] relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Dog className="w-6 h-6 text-[#FFCC00]" />
              <h2 className="font-marker text-2xl sm:text-3xl text-[#FFCC00] uppercase tracking-wide">
                Buster's Bark-O-Meter Soundboard
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Real, hilarious acoustic canine vocalizations. Click any button to unleash genuine dog barks!
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {activeReaction && (
              <span className="font-marker text-sm px-3.5 py-1.5 bg-[#FF3366] text-white rounded-lg border-2 border-white shadow-[2px_2px_0px_#000] animate-bounce">
                {activeReaction}
              </span>
            )}

            <button
              onClick={handleCanineChorus}
              className="px-3.5 py-1.5 bg-[#FF3366] hover:bg-[#ff1a4d] text-white font-marker text-xs rounded-lg border border-white shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-transform active:scale-95"
              title="Trigger all funny barks simultaneously in a chaotic canine choir"
            >
              <Flame className="w-3.5 h-3.5 text-[#FFCC00]" />
              <span>BARK RIOT MODE</span>
            </button>

            <span className="text-xs font-mono text-neutral-300 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-700 tabular-nums">
              {barksDispatched} Barks Fired
            </span>
          </div>
        </div>

        {/* 6 Real Funny Dog Bark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {barks.map((bark) => {
            const isPlaying = recentlyPlayedId === bark.id;
            return (
              <button
                key={bark.id}
                onClick={bark.action}
                className={`p-4 rounded-xl border-2 font-marker text-left transition-all active:scale-95 hover:-translate-y-1 bg-[#1f1f1f] flex flex-col justify-between min-h-[140px] relative overflow-hidden group shadow-[4px_4px_0px_#000] ${
                  isPlaying ? 'ring-2 ring-white scale-102 bg-neutral-800' : ''
                }`}
                style={{
                  borderColor: bark.accentColor
                }}
              >
                {/* Top Row: Icon & Breed Tag */}
                <div className="flex items-start justify-between gap-2 mb-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl group-hover:scale-125 transition-transform">
                      {bark.icon}
                    </span>
                    <div>
                      <span className="text-base text-white block leading-tight font-marker">
                        {bark.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono tracking-normal block">
                        {bark.breedTag}
                      </span>
                    </div>
                  </div>

                  <span 
                    className="text-[10px] font-marker px-2 py-0.5 rounded shadow-[1px_1px_0px_#000] border border-black shrink-0"
                    style={{
                      backgroundColor: bark.accentColor,
                      color: '#000000'
                    }}
                  >
                    {bark.badge}
                  </span>
                </div>

                {/* Subtitle / Backstory */}
                <p className="text-xs text-neutral-300 font-sans leading-snug line-clamp-2 my-2">
                  "{bark.subtitle}"
                </p>

                {/* Bottom Row: Play Indicator */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 w-full text-[11px] font-mono">
                  <span className="text-neutral-400 flex items-center gap-1 group-hover:text-white transition-colors">
                    <Volume2 className="w-3.5 h-3.5" style={{ color: bark.accentColor }} />
                    TAP TO BARK
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    SYNTH AC-AUDIO
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {!soundEnabled && (
          <p className="text-xs text-amber-400 font-mono mt-4 text-center">
            ⚠️ Sound is currently muted. Click the speaker icon in the header to hear these hilarious barks!
          </p>
        )}
      </div>
    </section>
  );
};
