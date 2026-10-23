import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Sparkles, Dog } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { safeStorage } from '../utils/storage';

interface BusterAvatarProps {
  onSqueak: () => void;
}

const STORAGE_AVATAR_KEY = 'buster_custom_avatar_v2';

export const BusterAvatar: React.FC<BusterAvatarProps> = ({ onSqueak }) => {
  const { showToast } = useBuster();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom uploaded image if available
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    return safeStorage.getItem(STORAGE_AVATAR_KEY);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image file too large (max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomAvatar(result);
        safeStorage.setItem(STORAGE_AVATAR_KEY, result);
        showToast('Profile picture updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group inline-block select-none">
      
      {/* Hidden file input for uploading the screenshot directly */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Avatar Circle */}
      <div
        onClick={onSqueak}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#00FFFF] overflow-hidden shadow-[0_0_25px_rgba(0,255,255,0.45)] cursor-pointer relative bg-neutral-900 transition-transform active:scale-95 group-hover:scale-105"
        title="Barnaby Buster Bark-Waggen! Click to Bark/Squeak"
      >
        {customAvatar ? (
          <img
            src={customAvatar}
            alt="Barnaby Buster Bark-Waggen"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          /* Faithful vector depiction of the curly-wig, round-glasses wide-smiling Buster */
          <div className="w-full h-full bg-gradient-to-b from-stone-900 via-neutral-900 to-black relative flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Glow */}
              <circle cx="100" cy="100" r="100" fill="#1c1917" />
              <circle cx="100" cy="100" r="75" fill="#292524" />

              {/* Wild Curly Afro Hair / Wig (Black Curls) */}
              <g fill="#121212" stroke="#262626" strokeWidth="2">
                <circle cx="50" cy="45" r="28" />
                <circle cx="80" cy="30" r="32" />
                <circle cx="120" cy="30" r="32" />
                <circle cx="150" cy="45" r="28" />
                <circle cx="32" cy="75" r="26" />
                <circle cx="168" cy="75" r="26" />
                <circle cx="28" cy="110" r="24" />
                <circle cx="172" cy="110" r="24" />
                <circle cx="45" cy="140" r="22" />
                <circle cx="155" cy="140" r="22" />
                {/* Additional tight curls */}
                <circle cx="65" cy="22" r="18" fill="#171717" />
                <circle cx="100" cy="18" r="20" fill="#171717" />
                <circle cx="135" cy="22" r="18" fill="#171717" />
                <circle cx="25" cy="92" r="18" fill="#171717" />
                <circle cx="175" cy="92" r="18" fill="#171717" />
              </g>

              {/* Dog Face / Snout Structure */}
              <ellipse cx="100" cy="120" rx="46" ry="54" fill="#6b6158" />
              <ellipse cx="100" cy="110" rx="38" ry="42" fill="#786c62" />

              {/* Big Round Glasses Frames */}
              <g fill="none" stroke="#000000" strokeWidth="9">
                <circle cx="70" cy="88" r="24" />
                <circle cx="130" cy="88" r="24" />
                <path d="M 94 88 L 106 88" strokeWidth="8" />
              </g>
              {/* Glasses Lens Tint */}
              <circle cx="70" cy="88" r="20" fill="#000000" opacity="0.35" />
              <circle cx="130" cy="88" r="20" fill="#000000" opacity="0.35" />
              {/* Lens Glare */}
              <ellipse cx="62" cy="80" rx="6" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-25 62 80)" />
              <ellipse cx="122" cy="80" rx="6" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-25 122 80)" />

              {/* Dog Nose Bridge & Big Black Nose Leather */}
              <path d="M 90 92 Q 100 86 110 92 L 118 106 Q 100 114 82 106 Z" fill="#2d2825" />
              <ellipse cx="100" cy="96" rx="22" ry="16" fill="#1c1917" />
              {/* Nostrils */}
              <ellipse cx="91" cy="97" rx="5" ry="6" fill="#0c0a09" />
              <ellipse cx="109" cy="97" rx="5" ry="6" fill="#0c0a09" />
              {/* Nose Shine */}
              <ellipse cx="100" cy="91" rx="9" ry="3" fill="#ffffff" opacity="0.3" />

              {/* Massive Ecstatic Grin / Open Mouth */}
              <path
                d="M 64 116 Q 100 112 136 116 Q 146 148 100 178 Q 54 148 64 116 Z"
                fill="#3f0e1a"
                stroke="#1c1917"
                strokeWidth="4"
              />

              {/* Deep Throat Cavity */}
              <ellipse cx="100" cy="148" rx="26" ry="20" fill="#20050c" />

              {/* Big Happy Pink Tongue with Center Fold */}
              <path
                d="M 85 142 C 85 174 115 174 115 142 Z"
                fill="#f43f5e"
              />
              <line x1="100" y1="140" x2="100" y2="168" stroke="#be123c" strokeWidth="2.5" />

              {/* Upper White Teeth Row */}
              <g fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8">
                <rect x="74" y="117" width="6" height="10" rx="2" />
                <rect x="81" y="118" width="5.5" height="9" rx="1.5" />
                <rect x="87.5" y="119" width="5.5" height="8.5" rx="1.5" />
                <rect x="94" y="119" width="5.5" height="8.5" rx="1.5" />
                <rect x="100.5" y="119" width="5.5" height="8.5" rx="1.5" />
                <rect x="107" y="119" width="5.5" height="8.5" rx="1.5" />
                <rect x="113.5" y="118" width="5.5" height="9" rx="1.5" />
                <rect x="120" y="117" width="6" height="10" rx="2" />
              </g>

              {/* Sharp Lower Teeth / Canines */}
              <g fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8">
                <polygon points="76,160 81,148 86,160" />
                <polygon points="114,160 119,148 124,160" />
                <rect x="87" y="157" width="6" height="7" rx="1" />
                <rect x="94" y="158" width="6" height="7" rx="1" />
                <rect x="101" y="158" width="6" height="7" rx="1" />
                <rect x="108" y="157" width="6" height="7" rx="1" />
              </g>
            </svg>
          </div>
        )}

        {/* Hover Click-to-Bark Badge */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-black/85 text-[#FFCC00] font-marker text-xs px-3 py-1 rounded-md border border-[#FFCC00] shadow-[2px_2px_0px_#000]">
            TAP TO BARK!
          </span>
        </div>
      </div>

      {/* Upload/Change Avatar Camera Button */}
      <button
        onClick={handleUploadClick}
        aria-label="Upload custom profile photo"
        className="absolute bottom-0 right-0 p-2 rounded-full bg-[#FF3366] hover:bg-[#ff1a4d] text-white border-2 border-white shadow-[2px_2px_0px_#000] hover:scale-110 active:scale-95 transition-all z-20"
        title="Upload or Change Buster's Profile Picture"
      >
        <Camera className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
