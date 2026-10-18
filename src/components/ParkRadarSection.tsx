import React, { useState } from 'react';
import { MapPin, Activity, Plus, CheckCircle, Dog, Sparkles } from 'lucide-react';
import { DOG_PARKS as INITIAL_PARKS } from '../data/busterData';
import { ParkRadar } from '../types';
import { useBuster } from '../context/BusterContext';
import { playBark } from '../utils/audio';

export const ParkRadarSection: React.FC = () => {
  const { soundEnabled, showToast } = useBuster();
  const [parks, setParks] = useState<ParkRadar[]>(INITIAL_PARKS);
  const [isReporting, setIsReporting] = useState(false);
  const [newReport, setNewReport] = useState({
    parkName: 'Washington Square Park Dog Run',
    vibeStatus: '🔥 MAXIMUM ZOOMIES',
    vibeScore: 95,
    activity: 'Group sprint around the central bench',
    dogName: 'My Pup'
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playBark(0.3);

    const updatedParks = parks.map(p => {
      if (p.name === newReport.parkName) {
        return {
          ...p,
          vibeScore: newReport.vibeScore,
          vibeStatus: newReport.vibeStatus,
          currentActivity: `${newReport.dogName}: ${newReport.activity}`,
          lastUpdated: 'Just now',
          activeDogsCount: p.activeDogsCount + 1
        };
      }
      return p;
    });

    setParks(updatedParks);
    setIsReporting(false);
    showToast(`Vibe check logged for ${newReport.parkName}!`);
  };

  return (
    <section id="zoomie-radar" className="scroll-mt-24 mb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-marker text-2xl sm:text-3xl text-[#00FFFF] uppercase tracking-wide flex items-center gap-2.5">
            <MapPin className="w-7 h-7 text-[#FF3366]" />
            <span>NYC Zoomie Radar // Dog Run Intel</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time canine activity updates across Buster's favorite Manhattan territories.
          </p>
        </div>

        <button
          onClick={() => setIsReporting(true)}
          className="self-start sm:self-auto px-4 py-2 bg-[#FFCC00] hover:bg-[#e6b800] text-neutral-950 font-marker text-xs rounded-lg border-2 border-black shadow-[3px_3px_0px_#FFFFFF] flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>REPORT PARK VIBE</span>
        </button>
      </div>

      {/* Grid of Parks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {parks.map((park) => (
          <div
            key={park.id}
            className="bg-[#1a1a1a] border-3 border-neutral-700 hover:border-[#FFCC00] rounded-2xl p-5 shadow-[5px_5px_0px_#000] transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-mono text-[#00FFFF] uppercase tracking-wider block">
                  {park.neighborhood}
                </span>
                <h3 className="font-marker text-lg text-white">
                  {park.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="bg-[#FF3366] text-white font-marker text-xs px-2.5 py-1 rounded shadow-[2px_2px_0px_#000] inline-block whitespace-nowrap">
                  {park.vibeStatus}
                </span>
              </div>
            </div>

            <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 mb-3">
              <span className="text-neutral-500 font-mono block text-[10px] uppercase mb-0.5">CURRENT DISPATCH:</span>
              <p className="font-semibold text-neutral-200">
                "{park.currentActivity}"
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800/80">
              <span className="flex items-center gap-1.5 text-[#FFCC00]">
                <Activity className="w-3.5 h-3.5" />
                <span>{park.activeDogsCount} dogs on-site</span>
              </span>
              <span>Updated {park.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {isReporting && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border-3 border-[#FFCC00] rounded-2xl max-w-md w-full p-6 shadow-[8px_8px_0px_#000]">
            <h3 className="font-marker text-xl text-[#FFCC00] mb-2 flex items-center gap-2">
              <Dog className="w-5 h-5" />
              <span>DISPATCH DOG PARK INTEL</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Seen Buster or sprinting yourself? Report the current park energy level!
            </p>

            <form onSubmit={handleSubmitReport} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="text-neutral-300 block mb-1">SELECT DOG PARK</label>
                <select
                  value={newReport.parkName}
                  onChange={(e) => setNewReport({ ...newReport, parkName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white outline-none focus:border-[#FFCC00]"
                >
                  {parks.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">YOUR / DOG'S NAME</label>
                <input
                  type="text"
                  required
                  value={newReport.dogName}
                  onChange={(e) => setNewReport({ ...newReport, dogName: e.target.value })}
                  placeholder="e.g. Barnaby Buster / Cooper"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white outline-none focus:border-[#FFCC00]"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">CURRENT VIBE</label>
                <select
                  value={newReport.vibeStatus}
                  onChange={(e) => setNewReport({ ...newReport, vibeStatus: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white outline-none focus:border-[#FFCC00]"
                >
                  <option value="🔥 MAXIMUM ZOOMIES">🔥 MAXIMUM ZOOMIES</option>
                  <option value="⚡ HIGH SPEED CHASE">⚡ HIGH SPEED CHASE</option>
                  <option value="🥨 HEAVY SNACK CIRCLE">🥨 HEAVY SNACK CIRCLE</option>
                  <option value="💤 LAZY BELLY RUBS">💤 LAZY BELLY RUBS</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">WHAT'S HAPPENING RIGHT NOW?</label>
                <input
                  type="text"
                  required
                  value={newReport.activity}
                  onChange={(e) => setNewReport({ ...newReport, activity: e.target.value })}
                  placeholder="e.g. 5 dogs sprinting in tandem around tree"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white outline-none focus:border-[#FFCC00]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReporting(false)}
                  className="px-3 py-1.5 bg-neutral-800 text-neutral-300 rounded uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FFCC00] text-neutral-950 font-marker rounded border border-black shadow-[2px_2px_0px_#fff]"
                >
                  SUBMIT DISPATCH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
