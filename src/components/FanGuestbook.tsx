import React, { useState } from 'react';
import { MessageSquare, Heart, Send, Sparkles } from 'lucide-react';
import { FAN_BARKS as INITIAL_FAN_BARKS } from '../data/busterData';
import { FanBark } from '../types';
import { useBuster } from '../context/BusterContext';
import { playSqueak } from '../utils/audio';

export const FanGuestbook: React.FC = () => {
  const { soundEnabled, showToast } = useBuster();
  const [barks, setBarks] = useState<FanBark[]>(INITIAL_FAN_BARKS);
  const [author, setAuthor] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('OMG SO HYPE!');

  const stickers = [
    'OMG SO HYPE!',
    'SNACK ATTACK!',
    'NO SLEEP TIL BROOKLYN',
    'SQUEAK REVOLUTION'
  ];

  const handlePostBark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !author.trim()) return;

    const newBark: FanBark = {
      id: `bark-${Date.now()}`,
      author: author.trim(),
      dogName: dogName.trim() || 'Anonymous Canine',
      breed: breed.trim() || 'Good Boy / Girl',
      message: message.trim(),
      timestamp: 'Just now',
      sticker: selectedSticker,
      likes: 1
    };

    setBarks(prev => [newBark, ...prev]);
    setMessage('');
    setAuthor('');
    setDogName('');
    setBreed('');
    if (soundEnabled) playSqueak(0.3);
    showToast('Your Fan Bark has been posted to Buster\'s wall!');
  };

  const handleLike = (id: string) => {
    setBarks(prev =>
      prev.map(b => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
    if (soundEnabled) playSqueak(0.15);
  };

  return (
    <section className="mb-16">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-marker text-2xl sm:text-3xl text-[#FFCC00] uppercase tracking-wide flex items-center gap-2.5">
          <MessageSquare className="w-7 h-7 text-[#00FFFF]" />
          <span>Buster's Fan Bark Wall</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Leave a dispatch, scream at squirrels, or send Buster a virtual belly rub.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Column */}
        <div className="bg-[#1a1a1a] border-3 border-[#FF3366] rounded-2xl p-5 shadow-[5px_5px_0px_#FF3366] lg:col-span-1 h-fit">
          <h3 className="font-marker text-lg text-white mb-3">
            LEAVE A FAN BARK
          </h3>

          <form onSubmit={handlePostBark} className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 font-mono block mb-1">YOUR NAME</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Sarah & Oliver"
                className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white focus:border-[#FF3366] outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-neutral-400 font-mono block mb-1">DOG'S NAME</label>
                <input
                  type="text"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  placeholder="e.g. Buster Jr."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white focus:border-[#FF3366] outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-neutral-400 font-mono block mb-1">BREED</label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g. Jack Russell"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white focus:border-[#FF3366] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 font-mono block mb-1">BADGE STICKER</label>
              <select
                value={selectedSticker}
                onChange={(e) => setSelectedSticker(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white focus:border-[#FF3366] outline-none font-mono"
              >
                {stickers.map((stk) => (
                  <option key={stk} value={stk}>{stk}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-neutral-400 font-mono block mb-1">MESSAGE / BARK</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell Buster about your dog's most chaotic NYC moment..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white focus:border-[#FF3366] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FF3366] hover:bg-[#ff1a4d] text-white font-marker text-xs rounded-lg border border-white shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>POST FAN BARK</span>
            </button>
          </form>
        </div>

        {/* Barks List Column */}
        <div className="lg:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {barks.map((bark) => (
            <div
              key={bark.id}
              className="bg-[#181818] border-2 border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-[3px_3px_0px_#000] transition-colors hover:border-neutral-700"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">
                      {bark.author}
                    </h4>
                    <span className="text-[11px] font-mono text-[#00FFFF]">
                      🐾 {bark.dogName} ({bark.breed}) · {bark.timestamp}
                    </span>
                  </div>
                  <span className="bg-[#FFCC00] text-black font-marker text-[10px] px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                    {bark.sticker}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                  "{bark.message}"
                </p>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleLike(bark.id)}
                  className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono rounded border border-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  <Heart className="w-3 h-3 text-[#FF3366] fill-[#FF3366]" />
                  <span>{bark.likes} Woofs</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
