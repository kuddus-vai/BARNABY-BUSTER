import React, { useState } from 'react';
import { Video, ArrowRight, Play, Eye, MessageSquare, ExternalLink, PlusCircle, Edit3, Film, X } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { VLOGS } from '../data/busterData';
import { VlogItem } from '../types';

export const VlogVault: React.FC = () => {
  const { socialLinks, isAdminAuthenticated, setIsAdminOpen } = useBuster();
  const [activeVideoModal, setActiveVideoModal] = useState<VlogItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filter only enabled links
  const visibleLinks = socialLinks.filter(l => l.enabled);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return '📘';
      case 'Instagram':
        return '📸';
      case 'YouTube':
        return '▶️';
      case 'TikTok':
        return '🎵';
      case 'X':
        return '𝕏';
      default:
        return '🌐';
    }
  };

  return (
    <section id="vlog-vault" className="scroll-mt-24 mb-16">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-marker text-2xl sm:text-3xl text-[#00FFFF] uppercase tracking-wide flex items-center gap-2.5">
            <Video className="w-7 h-7 text-[#FF3366]" />
            <span>Vlog Vault & Socials</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Official social channels and NYC dog-cam video broadcasts
          </p>
        </div>

        {isAdminAuthenticated && (
          <button
            onClick={() => setIsAdminOpen(true)}
            className="self-start sm:self-auto px-3 py-1.5 bg-[#FFCC00] text-neutral-950 font-marker text-xs rounded border border-black shadow-[2px_2px_0px_#fff] flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>MANAGE SOCIAL LINKS</span>
          </button>
        )}
      </div>

      {/* Dynamic Social Cards Grid (Connected to Admin Panel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {visibleLinks.map((link, idx) => {
          const isPrimary = idx % 2 === 0;
          const borderColor = link.accentColor || (isPrimary ? '#FFCC00' : '#FF3366');

          return (
            <div
              key={link.id}
              className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 text-center transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between"
              style={{
                border: `3px solid ${borderColor}`,
                boxShadow: `6px 6px 0px ${borderColor}`
              }}
            >
              <div>
                <div className="text-5xl mb-3">{getPlatformIcon(link.platform)}</div>
                
                {link.badgeText && (
                  <span className="inline-block bg-neutral-900 text-neutral-300 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-neutral-700 mb-2">
                    {link.badgeText}
                  </span>
                )}

                <h3 className="font-marker text-2xl text-white mb-2">
                  {link.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  {link.description}
                </p>
              </div>

              <div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-marker text-sm px-6 py-3 rounded-lg border-2 border-white shadow-[3px_3px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  style={{
                    backgroundColor: isPrimary ? '#FF3366' : '#FFCC00',
                    color: isPrimary ? '#ffffff' : '#121212'
                  }}
                >
                  <span>{link.buttonText || `Visit ${link.platform}`}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Video Episodes / Street Vlogs */}
      <div className="border-t-2 border-neutral-800 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <Film className="w-5 h-5 text-[#FFCC00]" />
          <h3 className="font-marker text-xl text-white uppercase tracking-wide">
            Featured Street Dog-Cam Episodes
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VLOGS.map((vlog) => (
            <div
              key={vlog.id}
              onClick={() => {
                setActiveVideoModal(vlog);
                setIsPlaying(true);
              }}
              className="bg-[#181818] border-2 border-neutral-700 hover:border-[#00FFFF] rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group shadow-[4px_4px_0px_#000]"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                <img
                  src={vlog.thumbnail}
                  alt={vlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback visually
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF3366] text-white flex items-center justify-center shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/85 text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                  {vlog.duration}
                </span>
                <span className="absolute top-2 left-2 bg-[#FFCC00] text-black font-marker text-[10px] px-1.5 py-0.5 rounded">
                  {vlog.platform}
                </span>
              </div>

              {/* Vlog Info */}
              <div className="p-3.5">
                <h4 className="font-heading font-bold text-sm text-neutral-100 group-hover:text-[#00FFFF] line-clamp-2 mb-2 leading-snug">
                  {vlog.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#FF3366]" />
                    {vlog.views}
                  </span>
                  <span>{vlog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retro Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border-3 border-[#00FFFF] rounded-2xl max-w-2xl w-full overflow-hidden shadow-[8px_8px_0px_#FF3366] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF3366]"></span>
                <span className="w-3 h-3 rounded-full bg-[#FFCC00]"></span>
                <span className="w-3 h-3 rounded-full bg-[#00FFFF]"></span>
                <span className="font-marker text-xs text-neutral-400 ml-2">
                  DOG-CAM PLAYER v2.4 // {activeVideoModal.platform}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close video player"
                className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport Simulation */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeVideoModal.thumbnail}
                alt={activeVideoModal.title}
                className="w-full h-full object-cover filter brightness-75"
              />
              {/* Scanline CRT overlay in player */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none"></div>

              {/* Dog-Cam Telemetry HUD */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-[#00FFFF] bg-black/70 px-2 py-1 rounded border border-[#00FFFF]/40">
                REC ● 4K 60FPS // GPS: 40.7308° N, 73.9973° W
              </div>

              <div className="absolute top-4 right-4 font-mono text-[11px] text-[#FFCC00] bg-black/70 px-2 py-1 rounded border border-[#FFCC00]/40">
                HEART RATE: 148 BPM (ZOOMING)
              </div>

              {/* Big Play / Pause Overlay */}
              <button
                onClick={() => setIsPlaying(prev => !prev)}
                className="w-16 h-16 rounded-full bg-[#FF3366]/90 text-white flex items-center justify-center border-2 border-white shadow-[4px_4px_0px_#000] hover:scale-110 transition-transform z-10"
              >
                {isPlaying ? <Play className="w-7 h-7 fill-current ml-1" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>

              {/* Subtitles Simulation */}
              <div className="absolute bottom-6 inset-x-6 text-center">
                <span className="bg-black/85 text-[#FFCC00] font-marker text-sm px-3 py-1 rounded border border-neutral-700">
                  "Barnaby: *heavy panting* 'PIGEON CONFIRMED AT 2 O'CLOCK!'"
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FF3366] text-white font-marker text-xs px-2 py-0.5 rounded">
                  {activeVideoModal.platform}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {activeVideoModal.views} views · {activeVideoModal.date}
                </span>
              </div>

              <h3 className="font-marker text-xl text-white mb-2">
                {activeVideoModal.title}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                {activeVideoModal.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {activeVideoModal.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-xs text-[#00FFFF] font-mono bg-neutral-900 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs font-bold uppercase rounded hover:bg-neutral-700"
                >
                  Close Player
                </button>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#FFCC00] text-neutral-950 font-marker text-xs rounded border border-black shadow-[2px_2px_0px_#fff]"
                >
                  Open on {activeVideoModal.platform}
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
