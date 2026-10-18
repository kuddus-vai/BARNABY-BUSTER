import React, { useState } from 'react';
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
  Save
} from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { Product, SocialLink } from '../types';

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
      updateProduct(editingProductId, {
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
      });
      setEditingProductId(null);
    } else {
      addProduct({
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
      });
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
                <span>GITHUB PAGES & BACKUP</span>
              </button>
            </div>

            {/* TAB 1: PRODUCTS MANAGER */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
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
                      onClick={resetProductsToDefault}
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
                                deleteProduct(prod.id);
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

            {/* TAB 3: GITHUB PAGES & BACKUP */}
            {activeTab === 'github' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Backup & Restore Box */}
                <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-6">
                  <h3 className="font-marker text-lg text-white mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#FFCC00]" />
                    <span>EXPORT & IMPORT BACKUP (JSON)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    Because this site runs client-side for GitHub Pages hosting, all your changes are stored in the browser's persistent storage. You can download a full JSON snapshot of your products and socials, and restore it anytime or across different computers.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleDownloadBackup}
                      className="px-4 py-2.5 bg-[#FFCC00] text-neutral-950 font-marker text-xs rounded-lg border border-black shadow-[3px_3px_0px_#fff] flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD SITE-DATA.JSON</span>
                    </button>

                    <label className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-[#00FFFF] font-marker text-xs rounded-lg border border-[#00FFFF] cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                      <Upload className="w-4 h-4" />
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

                {/* GitHub Pages Hosting Guide */}
                <div className="bg-[#181818] border-2 border-[#FF3366] rounded-xl p-6">
                  <h3 className="font-marker text-lg text-[#FF3366] mb-3 flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    <span>HOW TO HOST ON GITHUB PAGES</span>
                  </h3>
                  
                  <div className="space-y-4 text-xs font-mono text-neutral-300">
                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                      <p className="text-[#00FFFF] font-bold mb-1">Option A: Automated via GitHub Actions (Zero Commands)</p>
                      <p className="text-neutral-300 leading-relaxed">
                        We generated <code className="text-amber-400">.github/workflows/deploy.yml</code>. Whenever you push commits to GitHub, GitHub automatically builds and deploys your site!
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-2">
                        Just go to GitHub repo → <strong>Settings</strong> → <strong>Pages</strong> → Build and deployment Source: <strong>GitHub Actions</strong>.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                      <p className="text-[#00FFFF] font-bold mb-1">Option B: 1-Click Terminal Command</p>
                      <p className="text-neutral-300 leading-relaxed mb-2">
                        Run the new deploy script we configured in your package.json:
                      </p>
                      <code className="text-amber-400 block bg-neutral-900 p-2 rounded">
                        npm run deploy
                      </code>
                      <p className="text-[11px] text-neutral-400 mt-2">
                        This compiles the production bundle and pushes to the <code className="text-neutral-200">gh-pages</code> branch.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                      <p className="text-[#00FFFF] font-bold mb-1">Live URL Format</p>
                      <p className="text-neutral-300 leading-relaxed">
                        Your site is configured with relative base paths (<code className="text-neutral-200">base: './'</code>), so it works flawlessly on any repository name or custom domain:
                      </p>
                      <p className="text-[#FFCC00] mt-1 font-bold">
                        https://&lt;your-github-username&gt;.github.io/&lt;your-repository-name&gt;/
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
