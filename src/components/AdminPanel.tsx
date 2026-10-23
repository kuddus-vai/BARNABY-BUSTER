import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  RotateCcw, 
  ShoppingBag, 
  Share2, 
  GitBranch, 
  Check, 
  AlertCircle,
  ExternalLink,
  Save,
  Copy,
  CheckCircle2,
  Send,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { Product, SocialLink } from '../types';
import { VLOGS, DOG_PARKS, FAN_BARKS } from '../data/busterData';
import { safeStorage } from '../utils/storage';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    socialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    resetSocialsToDefault,
    exportSiteData,
    importSiteData,
    showToast
  } = useBuster();

  const [activeTab, setActiveTab] = useState<'products' | 'socials' | 'github'>('products');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Product Form State (for Add or Edit)
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    tagline: string;
    affiliateUrl: string;
    category: 'Apparel' | 'Toys' | 'Gear' | 'Treats';
    description: string;
    badge: string;
    badgeColor: string;
    accentColor: string;
    sizes: string;
    imageUrl: string;
    details: string;
  }>({
    name: '',
    tagline: '',
    affiliateUrl: 'https://yourshoplink.com/product1',
    category: 'Apparel',
    description: '',
    badge: '',
    badgeColor: '#FFCC00',
    accentColor: '#00FFFF',
    sizes: 'S, M, L, XL',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    details: '100% Canine Approved\nNYC Streetwear Standard\nWater and mud resistant'
  });

  // Social Form State
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [socialForm, setSocialForm] = useState<{
    platform: 'Facebook' | 'Instagram' | 'YouTube' | 'TikTok' | 'X' | 'Other';
    title: string;
    url: string;
    description: string;
    buttonText: string;
    badgeText: string;
    accentColor: string;
    enabled: boolean;
  }>({
    platform: 'Facebook',
    title: '',
    url: '',
    description: '',
    buttonText: 'Visit Link',
    badgeText: '',
    accentColor: '#FFCC00',
    enabled: true
  });

  // GitHub Direct Sync State
  const [ghOwner, setGhOwner] = useState<string>(() => safeStorage.getItem('buster_gh_owner') || '');
  const [ghRepo, setGhRepo] = useState<string>(() => safeStorage.getItem('buster_gh_repo') || 'BARNABY-BUSTER');
  const [ghBranch, setGhBranch] = useState<string>(() => safeStorage.getItem('buster_gh_branch') || 'main');
  const [ghToken, setGhToken] = useState<string>(() => safeStorage.getItem('buster_gh_token') || '');
  const [ghStatus, setGhStatus] = useState<'idle' | 'pushing' | 'success' | 'error'>('idle');
  const [ghMessage, setGhMessage] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!isAdminOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasscode('');
    }
  };

  // Product Handlers
  const handleStartEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      tagline: prod.tagline,
      affiliateUrl: prod.affiliateUrl || 'https://yourshoplink.com',
      category: prod.category,
      description: prod.description,
      badge: prod.badge || '',
      badgeColor: prod.badgeColor || '#FFCC00',
      accentColor: prod.accentColor || '#00FFFF',
      sizes: prod.sizes ? prod.sizes.join(', ') : '',
      imageUrl: prod.imageUrl,
      details: prod.details ? prod.details.join('\n') : ''
    });
  };

  const handleCancelProductEdit = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      tagline: '',
      affiliateUrl: 'https://yourshoplink.com/product1',
      category: 'Apparel',
      description: '',
      badge: '',
      badgeColor: '#FFCC00',
      accentColor: '#00FFFF',
      sizes: 'S, M, L, XL',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      details: '100% Canine Approved\nNYC Streetwear Standard'
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSizes = productForm.sizes
      ? productForm.sizes.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;
    const parsedDetails = productForm.details
      ? productForm.details.split('\n').map(d => d.trim()).filter(Boolean)
      : ['Buster Approved'];

    if (editingProductId) {
      const updates = {
        name: productForm.name,
        tagline: productForm.tagline,
        affiliateUrl: productForm.affiliateUrl,
        category: productForm.category,
        description: productForm.description,
        badge: productForm.badge || undefined,
        badgeColor: productForm.badgeColor,
        accentColor: productForm.accentColor,
        sizes: parsedSizes,
        imageUrl: productForm.imageUrl,
        details: parsedDetails
      };

      const nextProducts = products.map(p => (p.id === editingProductId ? { ...p, ...updates } : p));
      updateProduct(editingProductId, updates);
      setEditingProductId(null);

      // Auto-push to GitHub in background if configured
      if (autoSyncOnSave && ghToken && ghOwner) {
        pushProductsToGithub(nextProducts, true);
      }
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: productForm.name,
        tagline: productForm.tagline,
        affiliateUrl: productForm.affiliateUrl,
        rating: 5.0,
        reviewsCount: 1,
        category: productForm.category,
        description: productForm.description,
        badge: productForm.badge || undefined,
        badgeColor: productForm.badgeColor,
        accentColor: productForm.accentColor,
        sizes: parsedSizes,
        imageUrl: productForm.imageUrl,
        details: parsedDetails,
        inStock: true
      };

      const nextProducts = [newProd, ...products];
      addProduct(newProd);

      // Auto-push to GitHub in background if configured
      if (autoSyncOnSave && ghToken && ghOwner) {
        pushProductsToGithub(nextProducts, true);
      }
    }

    handleCancelProductEdit();
  };

  // Social Handlers
  const handleStartEditSocial = (item: SocialLink) => {
    setEditingSocialId(item.id);
    setSocialForm({
      platform: item.platform,
      title: item.title,
      url: item.url,
      description: item.description,
      buttonText: item.buttonText,
      badgeText: item.badgeText || '',
      accentColor: item.accentColor,
      enabled: item.enabled
    });
  };

  const handleCancelSocialEdit = () => {
    setEditingSocialId(null);
    setSocialForm({
      platform: 'Facebook',
      title: '',
      url: '',
      description: '',
      buttonText: 'Visit Link',
      badgeText: '',
      accentColor: '#FFCC00',
      enabled: true
    });
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSocialId) {
      updateSocialLink(editingSocialId, {
        platform: socialForm.platform,
        title: socialForm.title,
        url: socialForm.url,
        description: socialForm.description,
        buttonText: socialForm.buttonText,
        badgeText: socialForm.badgeText || undefined,
        accentColor: socialForm.accentColor,
        enabled: socialForm.enabled
      });
      setEditingSocialId(null);
    } else {
      addSocialLink({
        platform: socialForm.platform,
        title: socialForm.title,
        url: socialForm.url,
        description: socialForm.description,
        buttonText: socialForm.buttonText,
        badgeText: socialForm.badgeText || undefined,
        accentColor: socialForm.accentColor,
        enabled: socialForm.enabled
      });
    }
    handleCancelSocialEdit();
  };

  // Export JSON file download
  const handleDownloadBackup = () => {
    const jsonStr = exportSiteData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buster-site-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded site data JSON!');
  };

  // Auto-Sync to GitHub on Add/Edit/Delete preference
  const [autoSyncOnSave, setAutoSyncOnSave] = useState<boolean>(() => {
    return safeStorage.getItem('buster_auto_sync') !== 'false';
  });

  const toggleAutoSync = (enabled: boolean) => {
    setAutoSyncOnSave(enabled);
    safeStorage.setItem('buster_auto_sync', enabled ? 'true' : 'false');
    showToast(enabled ? '⚡ GitHub Auto-Sync ON: Saves will push to GitHub automatically.' : 'GitHub Auto-Sync turned OFF (manual push only).');
  };

  // Generate full src/data/busterData.ts code
  const generateBusterDataCode = (overrideProducts?: Product[]): string => {
    const listToEncode = overrideProducts || products;
    return `import { Product } from '../types';

export interface VlogItem {
  id: string;
  title: string;
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'TikTok';
  views: string;
  duration: string;
  thumbnail: string;
  description: string;
  date: string;
  tags: string[];
  commentsCount: number;
}

export interface ParkRadar {
  id: string;
  name: string;
  neighborhood: string;
  vibeScore: number;
  vibeStatus: string;
  activeDogsCount: number;
  currentActivity: string;
  lastUpdated: string;
  tags: string[];
}

export interface FanBark {
  id: string;
  author: string;
  dogName: string;
  breed: string;
  message: string;
  timestamp: string;
  sticker: string;
  likes: number;
}

export const PRODUCTS: Product[] = ${JSON.stringify(listToEncode, null, 2)};

export const VLOGS: VlogItem[] = ${JSON.stringify(VLOGS, null, 2)};

export const DOG_PARKS: ParkRadar[] = ${JSON.stringify(DOG_PARKS, null, 2)};

export const FAN_BARKS: FanBark[] = ${JSON.stringify(FAN_BARKS, null, 2)};
`;
  };

  // Download busterData.ts file
  const handleDownloadBusterData = () => {
    const code = generateBusterDataCode();
    const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'busterData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded busterData.ts! Replace src/data/busterData.ts to publish to GitHub.');
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    const code = generateBusterDataCode();
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
      showToast('Copied busterData.ts code to clipboard!');
    } catch {
      showToast('Clipboard access denied. Please click Download busterData.ts instead.');
    }
  };

  // Push directly to GitHub repo via REST API (manual or auto)
  const pushProductsToGithub = async (overrideProducts?: Product[], isAuto = false): Promise<boolean> => {
    const cleanOwner = ghOwner.trim() || safeStorage.getItem('buster_gh_owner')?.trim() || '';
    const cleanRepo = ghRepo.trim() || safeStorage.getItem('buster_gh_repo')?.trim() || 'BARNABY-BUSTER';
    const cleanBranch = ghBranch.trim() || safeStorage.getItem('buster_gh_branch')?.trim() || 'main';
    const cleanToken = ghToken.trim() || safeStorage.getItem('buster_gh_token')?.trim() || '';
    const targetProducts = overrideProducts || products;

    if (!cleanOwner || !cleanRepo || !cleanToken) {
      if (!isAuto) {
        setGhStatus('error');
        setGhMessage('Please fill in GitHub Username/Owner, Repository Name, and Personal Access Token.');
      }
      return false;
    }

    setGhStatus('pushing');
    setGhMessage(isAuto ? 'Auto-syncing changes to GitHub repository...' : 'Connecting to GitHub API to commit changes...');

    if (isAuto) {
      showToast('⚡ Auto-syncing update to GitHub in background...');
    }

    try {
      safeStorage.setItem('buster_gh_owner', cleanOwner);
      safeStorage.setItem('buster_gh_repo', cleanRepo);
      safeStorage.setItem('buster_gh_branch', cleanBranch);
      safeStorage.setItem('buster_gh_token', cleanToken);

      const generatedCode = generateBusterDataCode(targetProducts);
      const encodedContent = btoa(unescape(encodeURIComponent(generatedCode)));

      // 1. Get current file sha (if file exists)
      const fileUrl = `https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/src/data/busterData.ts?ref=${cleanBranch}`;
      let currentSha: string | undefined = undefined;

      const getRes = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (getRes.ok) {
        const fileInfo = await getRes.json();
        currentSha = fileInfo.sha;
      } else if (getRes.status === 401) {
        throw new Error('Invalid GitHub token. Ensure your token has "repo" or "contents:write" permission.');
      }

      // 2. Commit update
      const putRes = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/src/data/busterData.ts`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `chore: auto-sync ${targetProducts.length} products from Buster Admin Panel`,
          content: encodedContent,
          sha: currentSha,
          branch: cleanBranch
        })
      });

      if (!putRes.ok) {
        const errData = await putRes.json().catch(() => ({}));
        throw new Error(errData.message || `GitHub error ${putRes.status}`);
      }

      setGhStatus('success');
      const successMsg = `🎉 Synced to GitHub! ${targetProducts.length} products committed to ${cleanOwner}/${cleanRepo}@${cleanBranch}. GitHub Actions will deploy automatically in ~60s.`;
      setGhMessage(successMsg);
      showToast('🎉 Synced to GitHub! Live site is deploying automatically.');
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown network error';
      setGhStatus('error');
      setGhMessage(`Sync failed: ${msg}`);
      showToast(`GitHub sync failed: ${msg}`);
      return false;
    }
  };

  const handlePushToGithub = () => {
    pushProductsToGithub(products, false);
  };

  // Import JSON file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importSiteData(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-[#161616] border-4 border-[#00FFFF] rounded-2xl max-w-4xl w-full h-[92vh] flex flex-col shadow-[10px_10px_0px_#FF3366] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1e1e1e] border-b-2 border-neutral-800 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#00FFFF] text-neutral-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-marker text-lg sm:text-xl text-white">
                BUSTER ADMIN CONTROL PANEL
              </h2>
              <p className="text-[11px] font-mono text-neutral-400">
                GitHub Pages Ready · LocalStorage Synced · Zero Backend Required
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-2.5 py-1 text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-neutral-800 rounded border border-rose-500/40"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close admin panel"
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate: If not authenticated, show passcode unlock screen */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-sm w-full bg-neutral-900 border-2 border-[#FFCC00] rounded-2xl p-6 text-center shadow-[6px_6px_0px_#000]">
              <div className="w-14 h-14 rounded-full bg-[#FFCC00]/20 text-[#FFCC00] flex items-center justify-center mx-auto mb-4 border border-[#FFCC00]">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="font-marker text-xl text-white mb-1">
                Admin Passcode Required
              </h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                Enter your site passcode to unlock product management, social link editor, and backup tools.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode (default: buster)"
                    autoFocus
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2.5 text-center text-white font-mono text-sm focus:border-[#00FFFF] outline-none"
                  />
                  {authError && (
                    <p className="text-rose-400 text-xs font-mono mt-1.5">
                      Incorrect passcode. Hint: use <strong>buster</strong> or <strong>admin</strong>.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF3366] hover:bg-[#ff1a4d] text-white font-marker text-sm rounded-lg border border-white shadow-[2px_2px_0px_#000]"
                >
                  UNLOCK ADMIN MODE
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-500">
                Default unlock passcode: <span className="text-[#00FFFF]">buster</span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Workspace */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="bg-neutral-900/80 border-b border-neutral-800 px-4 flex gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 px-4 font-marker text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'border-[#FFCC00] text-[#FFCC00]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>PRODUCTS & MERCH ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('socials')}
                className={`py-3 px-4 font-marker text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'socials'
                    ? 'border-[#00FFFF] text-[#00FFFF]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>SOCIAL LINKS & VLOGS ({socialLinks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`py-3 px-4 font-marker text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'github'
                    ? 'border-[#FF3366] text-[#FF3366]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <GitBranch className="w-4 h-4" />
                <span>GITHUB SYNC & BACKUP</span>
                <span className="text-[10px] bg-[#FF3366]/20 text-[#FF3366] px-1.5 py-0.5 rounded font-mono">
                  LIVE
                </span>
              </button>
            </div>

            {/* TAB 1: PRODUCTS MANAGER */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Live Sync Banner */}
                <div className="p-3 bg-neutral-900 border border-neutral-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${ghToken && ghOwner ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                      <span className="text-white font-bold">{products.length} Products Active</span>
                    </div>
                    <span className="text-neutral-400">
                      {ghToken && ghOwner ? (
                        autoSyncOnSave 
                          ? '· ⚡ Auto-Sync ON: Saves push to GitHub automatically'
                          : '· GitHub connected (Auto-Sync paused)'
                      ) : (
                        '· Saved in browser. Connect GitHub to auto-publish live.'
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {ghToken && ghOwner ? (
                      <button
                        onClick={() => toggleAutoSync(!autoSyncOnSave)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-colors ${
                          autoSyncOnSave 
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60' 
                            : 'bg-neutral-800 text-neutral-300 border-neutral-600 hover:bg-neutral-700'
                        }`}
                        title="Toggle automatic background push to GitHub whenever you add/edit/delete a product"
                      >
                        Auto-Sync: {autoSyncOnSave ? 'ON' : 'OFF'}
                      </button>
                    ) : null}

                    <button
                      onClick={() => setActiveTab('github')}
                      className="px-3 py-1 bg-[#00FFFF]/10 hover:bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/50 rounded-lg font-marker text-[11px] flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{ghToken && ghOwner ? 'PUSH NOW' : 'CONNECT GITHUB'}</span>
                    </button>
                  </div>
                </div>

                {/* Product Add / Edit Form */}
                <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
                    <h3 className="font-marker text-base text-[#FFCC00] flex items-center gap-2">
                      {editingProductId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span>{editingProductId ? 'EDIT PRODUCT' : 'ADD NEW MERCH PRODUCT'}</span>
                    </h3>
                    {editingProductId && (
                      <button
                        onClick={handleCancelProductEdit}
                        className="text-xs font-mono text-neutral-400 hover:text-white underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">PRODUCT NAME *</label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          placeholder="e.g. Squeaky Bone"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">AFFILIATE REDIRECT URL * (TARGET SHOP/STORE)</label>
                        <input
                          type="url"
                          required
                          value={productForm.affiliateUrl}
                          onChange={(e) => setProductForm({ ...productForm, affiliateUrl: e.target.value })}
                          placeholder="https://yourshoplink.com/product1"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">CATEGORY</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none font-mono"
                        >
                          <option value="Apparel">Apparel</option>
                          <option value="Toys">Toys</option>
                          <option value="Gear">Gear</option>
                          <option value="Treats">Treats</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">SHORT TAGLINE *</label>
                        <input
                          type="text"
                          required
                          value={productForm.tagline}
                          onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                          placeholder="One-liner description for grid cards"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">IMAGE URL</label>
                        <input
                          type="url"
                          required
                          value={productForm.imageUrl}
                          onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">BADGE TEXT (OPTIONAL)</label>
                        <input
                          type="text"
                          value={productForm.badge}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          placeholder="BESTSELLER / NEW / VIP"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">ACCENT COLOR</label>
                        <select
                          value={productForm.accentColor}
                          onChange={(e) => setProductForm({ ...productForm, accentColor: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none font-mono"
                        >
                          <option value="#00FFFF">Cyan (#00FFFF)</option>
                          <option value="#FF3366">Neon Pink (#FF3366)</option>
                          <option value="#FFCC00">Electric Yellow (#FFCC00)</option>
                          <option value="#10B981">Emerald (#10B981)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">SIZES (COMMA SEPARATED)</label>
                        <input
                          type="text"
                          value={productForm.sizes}
                          onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                          placeholder="S, M, L, XL"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">FULL DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        placeholder="Detailed backstory and materials"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#FFCC00] outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#FFCC00] text-neutral-950 font-marker text-xs rounded border border-black shadow-[2px_2px_0px_#fff] flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingProductId ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Existing Products List Table */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                  <div className="p-4 bg-neutral-800/60 border-b border-neutral-700 flex items-center justify-between">
                    <span className="font-marker text-sm text-neutral-200">
                      CURRENT PRODUCT CATALOG ({products.length})
                    </span>
                    <button
                      onClick={() => {
                        if (confirm('Reset products to factory default catalog?')) {
                          resetProductsToDefault();
                          if (autoSyncOnSave && ghToken && ghOwner) {
                            pushProductsToGithub(undefined, true);
                          }
                        }
                      }}
                      className="text-xs font-mono text-neutral-400 hover:text-amber-400 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Factory Defaults</span>
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-800">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-800/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-12 h-12 rounded object-cover bg-neutral-800 border border-neutral-700 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading font-bold text-sm text-white truncate">
                                {prod.name}
                              </h4>
                              {prod.badge && (
                                <span className="bg-[#FFCC00] text-black text-[10px] font-marker px-1.5 py-0.2 rounded">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
                              <span className="text-neutral-400">{prod.category}</span>
                              <span className="text-neutral-600">·</span>
                              <a
                                href={prod.affiliateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#00FFFF] hover:underline flex items-center gap-1 truncate max-w-[200px]"
                                title={prod.affiliateUrl}
                              >
                                <span>{prod.affiliateUrl}</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <button
                            onClick={() => handleStartEditProduct(prod)}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-[#00FFFF] text-xs font-mono rounded border border-neutral-600 flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${prod.name}"?`)) {
                                const nextProducts = products.filter(p => p.id !== prod.id);
                                deleteProduct(prod.id);
                                if (autoSyncOnSave && ghToken && ghOwner) {
                                  pushProductsToGithub(nextProducts, true);
                                }
                              }
                            }}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-rose-950 text-rose-400 text-xs font-mono rounded border border-neutral-600 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SOCIAL LINKS MANAGER */}
            {activeTab === 'socials' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Social Form */}
                <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
                    <h3 className="font-marker text-base text-[#00FFFF] flex items-center gap-2">
                      {editingSocialId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span>{editingSocialId ? 'EDIT SOCIAL CHANNEL' : 'ADD NEW SOCIAL LINK'}</span>
                    </h3>
                    {editingSocialId && (
                      <button
                        onClick={handleCancelSocialEdit}
                        className="text-xs font-mono text-neutral-400 hover:text-white underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveSocial} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">PLATFORM</label>
                        <select
                          value={socialForm.platform}
                          onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value as any })}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none font-mono"
                        >
                          <option value="Facebook">Facebook</option>
                          <option value="Instagram">Instagram</option>
                          <option value="YouTube">YouTube</option>
                          <option value="TikTok">TikTok</option>
                          <option value="X">X (Twitter)</option>
                          <option value="Other">Other Custom</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">DISPLAY TITLE *</label>
                        <input
                          type="text"
                          required
                          value={socialForm.title}
                          onChange={(e) => setSocialForm({ ...socialForm, title: e.target.value })}
                          placeholder="e.g. Facebook Page"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">DIRECT LINK URL *</label>
                        <input
                          type="url"
                          required
                          value={socialForm.url}
                          onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                          placeholder="https://facebook.com/..."
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">BUTTON TEXT</label>
                        <input
                          type="text"
                          value={socialForm.buttonText}
                          onChange={(e) => setSocialForm({ ...socialForm, buttonText: e.target.value })}
                          placeholder="Visit Facebook"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">FOLLOWER / BADGE TEXT</label>
                        <input
                          type="text"
                          value={socialForm.badgeText}
                          onChange={(e) => setSocialForm({ ...socialForm, badgeText: e.target.value })}
                          placeholder="e.g. 140K Followers"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">BORDER ACCENT COLOR</label>
                        <select
                          value={socialForm.accentColor}
                          onChange={(e) => setSocialForm({ ...socialForm, accentColor: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none font-mono"
                        >
                          <option value="#FFCC00">Electric Yellow (#FFCC00)</option>
                          <option value="#FF3366">Neon Pink (#FF3366)</option>
                          <option value="#00FFFF">Cyan (#00FFFF)</option>
                          <option value="#10B981">Green (#10B981)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">DESCRIPTION *</label>
                      <input
                        type="text"
                        required
                        value={socialForm.description}
                        onChange={(e) => setSocialForm({ ...socialForm, description: e.target.value })}
                        placeholder="Catch the latest unhinged street vlogs, reels, and community mayhem!"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FFFF] outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={socialForm.enabled}
                          onChange={(e) => setSocialForm({ ...socialForm, enabled: e.target.checked })}
                          className="w-4 h-4 accent-[#00FFFF] rounded"
                        />
                        <span>Show on Public Website</span>
                      </label>

                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#00FFFF] text-neutral-950 font-marker text-xs rounded border border-black shadow-[2px_2px_0px_#fff] flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingSocialId ? 'UPDATE SOCIAL' : 'ADD SOCIAL CHANNEL'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Social Channels List */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                  <div className="p-4 bg-neutral-800/60 border-b border-neutral-700 flex items-center justify-between">
                    <span className="font-marker text-sm text-neutral-200">
                      ACTIVE SOCIAL CHANNELS ({socialLinks.length})
                    </span>
                    <button
                      onClick={resetSocialsToDefault}
                      className="text-xs font-mono text-neutral-400 hover:text-amber-400 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Default Socials</span>
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-800">
                    {socialLinks.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-800/40"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-marker text-base text-white">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                              {item.platform}
                            </span>
                            {!item.enabled && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-400">
                                Hidden
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {item.description}
                          </p>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono text-[#00FFFF] hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            <span>{item.url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <button
                            onClick={() => handleStartEditSocial(item)}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-[#FFCC00] text-xs font-mono rounded border border-neutral-600 flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete social channel "${item.title}"?`)) {
                                deleteSocialLink(item.id);
                              }
                            }}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-rose-950 text-rose-400 text-xs font-mono rounded border border-neutral-600 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: GITHUB SYNC & BACKUP */}
            {activeTab === 'github' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Section 1: 1-Click Direct GitHub Repo Push */}
                <div className="bg-[#181818] border-2 border-[#00FFFF] rounded-xl p-5 sm:p-6 shadow-[4px_4px_0px_#00FFFF]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-marker text-lg text-[#00FFFF] flex items-center gap-2">
                      <Send className="w-5 h-5 text-[#00FFFF]" />
                      <span>⚡ AUTOMATIC GITHUB SYNC (1-CLICK PUSH)</span>
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/30 font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    Push your latest active products directly to your GitHub repository from this browser! Once pushed, your GitHub Actions workflow will instantly build and deploy the updated catalog to GitHub Pages in ~60 seconds.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                        GITHUB USER / ORG *
                      </label>
                      <input
                        type="text"
                        value={ghOwner}
                        onChange={(e) => setGhOwner(e.target.value)}
                        placeholder="e.g. your-github-username"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-[#00FFFF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                        REPOSITORY NAME *
                      </label>
                      <input
                        type="text"
                        value={ghRepo}
                        onChange={(e) => setGhRepo(e.target.value)}
                        placeholder="e.g. BARNABY-BUSTER"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-[#00FFFF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                        TARGET BRANCH *
                      </label>
                      <input
                        type="text"
                        value={ghBranch}
                        onChange={(e) => setGhBranch(e.target.value)}
                        placeholder="main or root"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-[#00FFFF] outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-mono text-neutral-400">
                        GITHUB PERSONAL ACCESS TOKEN (PAT) *
                      </label>
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-[#00FFFF] hover:underline flex items-center gap-1"
                      >
                        <span>Generate Token (repo scope)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <input
                      type="password"
                      value={ghToken}
                      onChange={(e) => setGhToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-[#00FFFF] outline-none"
                    />
                    <p className="text-[10px] font-mono text-neutral-500 mt-1">
                      Stored only locally in your browser's private localStorage. Never sent to any third party.
                    </p>
                  </div>

                  {/* Auto-Sync Toggle */}
                  <label className="flex items-center gap-3 p-3 bg-neutral-950/80 rounded-lg border border-neutral-800 cursor-pointer mb-4 hover:border-neutral-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={autoSyncOnSave}
                      onChange={(e) => toggleAutoSync(e.target.checked)}
                      className="w-4 h-4 accent-[#00FFFF] rounded cursor-pointer shrink-0"
                    />
                    <div>
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#00FFFF]" />
                        <span>Automatic Background Sync on Every Add / Edit / Delete</span>
                      </span>
                      <span className="text-[11px] text-neutral-400 block mt-0.5">
                        When enabled, saving or deleting any product automatically triggers a GitHub commit to <code className="text-neutral-300 font-mono">{ghOwner || 'repo'}/{ghRepo}@{ghBranch}</code> in the background without needing to press Push manually.
                      </span>
                    </div>
                  </label>

                  {/* Status Banner */}
                  {ghStatus !== 'idle' && (
                    <div className={`p-3 rounded-lg mb-4 text-xs font-mono border flex items-center gap-2 ${
                      ghStatus === 'pushing'
                        ? 'bg-amber-950/40 border-amber-600/50 text-amber-300'
                        : ghStatus === 'success'
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-600/50 text-rose-300'
                    }`}>
                      {ghStatus === 'pushing' && <RefreshCw className="w-4 h-4 animate-spin shrink-0" />}
                      {ghStatus === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
                      {ghStatus === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
                      <span>{ghMessage}</span>
                    </div>
                  )}

                  <button
                    onClick={handlePushToGithub}
                    disabled={ghStatus === 'pushing'}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#00FFFF] hover:bg-[#33ffff] text-neutral-950 font-marker text-xs rounded-lg border border-black shadow-[3px_3px_0px_#fff] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{ghStatus === 'pushing' ? 'COMMITTING TO GITHUB...' : `PUSH ${products.length} PRODUCTS TO GITHUB NOW`}</span>
                  </button>
                </div>

                {/* Section 2: Code File Export & Copy (Offline / No Token Needed) */}
                <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-5 sm:p-6 shadow-sm">
                  <h3 className="font-marker text-lg text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FFCC00]" />
                    <span>MANUAL CODE SYNC (NO TOKEN REQUIRED)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Prefer not using a GitHub token? You can download or copy the exact formatted <code className="text-amber-400">src/data/busterData.ts</code> file with all {products.length} active products right now and commit it to git.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleDownloadBusterData}
                      className="px-4 py-2.5 bg-[#FFCC00] hover:bg-[#ffe066] text-neutral-950 font-marker text-xs rounded-lg border border-black shadow-[3px_3px_0px_#fff] flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD BUSTERDATA.TS</span>
                    </button>

                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-marker text-xs rounded-lg border border-neutral-600 flex items-center gap-2"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">COPIED TO CLIPBOARD!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#00FFFF]" />
                          <span>COPY BUSTERDATA.TS CODE</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">
                    Destination path in repository: <code className="text-neutral-300">src/data/busterData.ts</code>
                  </p>
                </div>

                {/* Section 3: Full JSON Backup & Restore */}
                <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-5 sm:p-6">
                  <h3 className="font-marker text-lg text-white mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#FF3366]" />
                    <span>EXPORT & IMPORT BACKUP (JSON)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Download a full JSON snapshot of your products and socials, and restore it anytime or transfer across different computers and browsers.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleDownloadBackup}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-[#FF3366] font-marker text-xs rounded-lg border border-[#FF3366] flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD SITE-DATA.JSON</span>
                    </button>

                    <label className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-marker text-xs rounded-lg border border-neutral-600 cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#00FFFF]" />
                      <span>RESTORE FROM JSON FILE</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Section 4: GitHub Actions Deployment Status */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                  <h4 className="font-marker text-sm text-neutral-300 mb-2 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#00FFFF]" />
                    <span>AUTOMATIC GITHUB PAGES DEPLOYMENT (.github/workflows/deploy.yml)</span>
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                    Whenever new commits land on your <code className="text-amber-400">main</code>, <code className="text-amber-400">master</code>, or <code className="text-amber-400">root</code> branch, GitHub Actions compiles your Vite app with Node 22 and deploys it automatically to your live GitHub Pages URL with zero manual commands.
                  </p>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
