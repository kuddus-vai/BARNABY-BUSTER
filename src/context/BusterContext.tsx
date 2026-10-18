import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SocialLink } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/busterData';
import { playChaChing } from '../utils/audio';

const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'social-fb',
    platform: 'Facebook',
    title: 'Facebook Page',
    url: 'https://facebook.com',
    description: 'Catch the latest unhinged street vlogs, reels, and community mayhem!',
    buttonText: 'Visit Facebook',
    badgeText: '84.2K Followers',
    accentColor: '#FFCC00',
    enabled: true
  },
  {
    id: 'social-ig',
    platform: 'Instagram',
    title: 'Instagram Reels',
    url: 'https://instagram.com',
    description: 'Daily stories, zoomie sprints, and behind-the-scenes NYC chaos.',
    buttonText: 'Visit Instagram',
    badgeText: '142K Followers',
    accentColor: '#FF3366',
    enabled: true
  },
  {
    id: 'social-yt',
    platform: 'YouTube',
    title: 'Buster\'s 4K POV Walks',
    url: 'https://youtube.com',
    description: 'Full-length uncut dog-cam strolls down 5th Avenue and through Central Park.',
    buttonText: 'Watch YouTube',
    badgeText: '65K Subscribers',
    accentColor: '#00FFFF',
    enabled: true
  },
  {
    id: 'social-tt',
    platform: 'TikTok',
    title: 'TikTok Chaos Drops',
    url: 'https://tiktok.com',
    description: 'High-frequency 15-second zoomies, pigeon stalking, and treat ASMR.',
    buttonText: 'Follow TikTok',
    badgeText: '310K Followers',
    accentColor: '#FFCC00',
    enabled: true
  }
];

interface BusterContextType {
  products: Product[];
  socialLinks: SocialLink[];
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  scanlinesEnabled: boolean;
  setScanlinesEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  // Product CRUD
  addProduct: (productData: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  // Social Links CRUD
  addSocialLink: (socialData: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  resetSocialsToDefault: () => void;
  // Backup & Import
  exportSiteData: () => string;
  importSiteData: (jsonStr: string) => { success: boolean; message: string };
  // Toast notifications
  toast: string | null;
  showToast: (msg: string) => void;
}

const BusterContext = createContext<BusterContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'buster_affiliate_products_v3',
  SOCIALS: 'buster_socials_v3',
  ADMIN_AUTH: 'buster_admin_auth_v3',
  SOUND: 'buster_sound_pref_v3',
  SCANLINES: 'buster_scanlines_pref_v3'
};

export const BusterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved products:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOCIALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved socials:', e);
    }
    return INITIAL_SOCIAL_LINKS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  // Sync social links to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(socialLinks));
    } catch (e) {
      console.error('Failed to save socials:', e);
    }
  }, [socialLinks]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const loginAdmin = (passcode: string): boolean => {
    const cleaned = passcode.trim().toLowerCase();
    if (cleaned === 'buster2026' || cleaned === 'buster' || cleaned === 'admin') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      showToast('Admin Mode unlocked! You have full editor access.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {}
    showToast('Logged out of Admin Mode');
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Affiliate product "${newProduct.name}" added!`);
    if (soundEnabled) playChaChing(0.25);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast(`Affiliate product updated!`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product "${target?.name || 'Item'}" deleted.`);
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Reset products to factory default affiliate catalog.');
  };

  // Socials CRUD
  const addSocialLink = (socialData: Omit<SocialLink, 'id'>) => {
    const newSocial: SocialLink = {
      ...socialData,
      id: `soc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setSocialLinks(prev => [...prev, newSocial]);
    showToast(`Social link "${newSocial.title}" created!`);
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    setSocialLinks(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
    showToast(`Social link updated!`);
  };

  const deleteSocialLink = (id: string) => {
    const target = socialLinks.find(s => s.id === id);
    setSocialLinks(prev => prev.filter(s => s.id !== id));
    showToast(`Deleted social link "${target?.title || 'Link'}".`);
  };

  const resetSocialsToDefault = () => {
    setSocialLinks(INITIAL_SOCIAL_LINKS);
    showToast('Reset social links to default channels.');
  };

  // Export / Import
  const exportSiteData = (): string => {
    const exportData = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      products,
      socialLinks
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importSiteData = (jsonStr: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (Array.isArray(parsed.socialLinks)) {
        setSocialLinks(parsed.socialLinks);
      }
      showToast('Import successful! Affiliate products & socials updated.');
      return { success: true, message: 'Successfully imported site configuration.' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON file';
      return { success: false, message: msg };
    }
  };

  return (
    <BusterContext.Provider
      value={{
        products,
        socialLinks,
        soundEnabled,
        setSoundEnabled,
        scanlinesEnabled,
        setScanlinesEnabled,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        resetSocialsToDefault,
        exportSiteData,
        importSiteData,
        toast,
        showToast
      }}
    >
      {children}
    </BusterContext.Provider>
  );
};

export const useBuster = (): BusterContextType => {
  const context = useContext(BusterContext);
  if (!context) {
    throw new Error('useBuster must be used within a BusterProvider');
  }
  return context;
};
