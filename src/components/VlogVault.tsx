import React from 'react';
import { Video, ExternalLink, Edit3 } from 'lucide-react';
import { useBuster } from '../context/BusterContext';

export const VlogVault: React.FC = () => {
  const { socialLinks, isAdminAuthenticated, setIsAdminOpen } = useBuster();

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

    </section>
  );
};
