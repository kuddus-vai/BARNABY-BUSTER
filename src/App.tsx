import React, { useEffect } from 'react';
import { BusterProvider, useBuster } from './context/BusterContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VibeMetrics } from './components/VibeMetrics';
import { VlogVault } from './components/VlogVault';
import { MerchStore } from './components/MerchStore';
import { PromotionRequestSection } from './components/PromotionRequestSection';
import { ParkRadarSection } from './components/ParkRadarSection';
import { FanGuestbook } from './components/FanGuestbook';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { toast, setIsAdminOpen } = useBuster();

  useEffect(() => {
    // Check if URL contains /kuddus slug, or hash #/kuddus or #kuddus
    const checkSlug = () => {
      try {
        const loc = typeof window !== 'undefined' ? window.location : null;
        if (!loc) return;

        const pathname = (loc.pathname || '').toLowerCase().replace(/\/+$/, '');
        const hash = (loc.hash || '').toLowerCase();
        const search = (loc.search || '').toLowerCase();

        const isKuddusPath = pathname.endsWith('/kuddus') || pathname === 'kuddus';
        const isKuddusHash = hash === '#/kuddus' || hash === '#kuddus' || hash.includes('kuddus');
        const isKuddusQuery = search.includes('kuddus') || search.includes('page=kuddus');

        if (isKuddusPath || isKuddusHash || isKuddusQuery) {
          setIsAdminOpen(true);
        }
      } catch (e) {
        console.warn('Error reading window.location:', e);
      }
    };

    checkSlug();
    window.addEventListener('hashchange', checkSlug);
    window.addEventListener('popstate', checkSlug);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A or Cmd + Shift + A still works as backup shortcut
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkSlug);
      window.removeEventListener('popstate', checkSlug);
    };
  }, [setIsAdminOpen]);

  return (
    <div className="min-h-screen bg-[#121212] text-[#F9F9F9] flex flex-col relative">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFCC00] text-neutral-950 font-marker text-xs sm:text-sm px-4 py-2.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#FF3366] animate-bounce flex items-center gap-2 max-w-sm">
          <Sparkles className="w-4 h-4 shrink-0 text-black" />
          <span>{toast}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Hero Header */}
      <Hero />

      {/* Main Content Sections */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <MerchStore />
        <VibeMetrics />
        <VlogVault />
        <PromotionRequestSection />
        <ParkRadarSection />
        <FanGuestbook />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Panel Modal */}
      <AdminPanel />
    </div>
  );
};

export default function App() {
  return (
    <BusterProvider>
      <AppContent />
    </BusterProvider>
  );
}
