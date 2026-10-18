import React, { useState } from 'react';
import { ExternalLink, Star, Eye, Trash2, Edit3, ShoppingBag, X } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { Product } from '../types';

export const MerchStore: React.FC = () => {
  const {
    products,
    isAdminAuthenticated,
    deleteProduct,
    setIsAdminOpen
  } = useBuster();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  const categories = ['All', 'Apparel', 'Toys', 'Gear', 'Treats'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const openProductDetail = (product: Product) => {
    setSelectedProductModal(product);
  };

  return (
    <section id="merch-store" className="scroll-mt-24 mb-16">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-marker text-2xl sm:text-3xl text-[#FF3366] uppercase tracking-wide flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-[#FFCC00]" />
            <span>Official Merch & Gear</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Buster-tested gear, noise-makers, and streetwear. Click "Grab It" to visit official partner stores!
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#FFCC00] text-neutral-950 font-marker shadow-[2px_2px_0px_#000]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Quick Action Bar */}
      {isAdminAuthenticated && (
        <div className="mb-6 p-3 bg-neutral-900/90 border-2 border-[#00FFFF] rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-[#00FFFF]">
            ⚙️ Admin Mode Active: Manage affiliate redirect URLs, edit descriptions, or delete items.
          </span>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3 py-1 bg-[#00FFFF] text-neutral-950 font-marker text-xs rounded border border-black shadow-[2px_2px_0px_#000]"
          >
            + ADD AFFILIATE PRODUCT
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="font-marker text-xl text-neutral-300 mb-1">No products found in this category</h3>
          <p className="text-sm text-neutral-500 mb-4">Try selecting "All" or add new products via the Admin Panel.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="px-4 py-2 bg-neutral-800 text-neutral-200 text-xs font-bold uppercase rounded hover:bg-neutral-700"
          >
            View All Merch
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => {
            const isNeon = idx % 2 === 0;
            const cardAccent = product.accentColor || (isNeon ? '#00FFFF' : '#FF3366');

            return (
              <div
                key={product.id}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 relative group"
                style={{
                  border: `3px solid ${cardAccent}`,
                  boxShadow: `6px 6px 0px ${cardAccent}`
                }}
              >
                {/* Badge if present */}
                {product.badge && (
                  <div 
                    className="absolute top-3 left-3 z-10 font-marker text-[11px] px-2.5 py-0.5 rounded shadow-[2px_2px_0px_#000] border border-black"
                    style={{
                      backgroundColor: product.badgeColor || '#FFCC00',
                      color: '#000000'
                    }}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Admin Quick Buttons on card */}
                {isAdminAuthenticated && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setIsAdminOpen(true);
                      }}
                      title="Edit Product in Admin"
                      className="p-1.5 bg-black/80 hover:bg-black text-[#00FFFF] rounded border border-[#00FFFF]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete affiliate product "${product.name}"?`)) {
                          deleteProduct(product.id);
                        }
                      }}
                      title="Delete Product"
                      className="p-1.5 bg-black/80 hover:bg-rose-900 text-rose-400 rounded border border-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Product Image Container */}
                <div 
                  onClick={() => openProductDetail(product)}
                  className="relative h-56 bg-neutral-900 cursor-pointer overflow-hidden border-b-3"
                  style={{ borderBottomColor: cardAccent }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Hover Inspect overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/90 text-white font-marker text-xs px-3 py-1.5 rounded-lg border border-white flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                      <Eye className="w-3.5 h-3.5" />
                      QUICK VIEW
                    </span>
                  </div>
                </div>

                {/* Product Details Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                      <span className="font-mono uppercase">{product.category}</span>
                      <div className="flex items-center gap-1 text-[#FFCC00]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold font-mono">{product.rating}</span>
                        <span className="text-neutral-500">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => openProductDetail(product)}
                      className="font-marker text-xl mb-1.5 cursor-pointer hover:underline transition-colors leading-tight"
                      style={{ color: cardAccent }}
                    >
                      {product.name}
                    </h3>

                    <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Affiliate Action Row (Direct Redirect - NO PRICE) */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3 mt-auto">
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                      <span>Verified Partner Gear</span>
                    </span>

                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 font-marker text-xs sm:text-sm rounded-lg border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-2 text-neutral-950 font-bold"
                      style={{
                        backgroundColor: cardAccent === '#00FFFF' ? '#00FFFF' : '#FFCC00'
                      }}
                    >
                      <span>GRAB IT</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border-3 border-[#FF3366] rounded-2xl max-w-2xl w-full overflow-hidden shadow-[8px_8px_0px_#FFCC00] animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Top Bar */}
            <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
              <span className="font-marker text-sm text-[#FFCC00]">
                BUSTER VAULT // AFFILIATE GEAR DETAIL
              </span>
              <button
                onClick={() => setSelectedProductModal(null)}
                aria-label="Close modal"
                className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border-2 border-neutral-700">
                  <img
                    src={selectedProductModal.imageUrl}
                    alt={selectedProductModal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProductModal.badge && (
                    <span className="absolute top-2 left-2 bg-[#FFCC00] text-black font-marker text-[11px] px-2 py-0.5 rounded border border-black shadow-[2px_2px_0px_#000]">
                      {selectedProductModal.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#00FFFF] block mb-1">
                      {selectedProductModal.category}
                    </span>
                    <h3 className="font-marker text-2xl text-white mb-2 leading-tight">
                      {selectedProductModal.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-300 mb-3">
                      <Star className="w-4 h-4 fill-[#FFCC00] text-[#FFCC00]" />
                      <span className="font-bold text-white">{selectedProductModal.rating}</span>
                      <span className="text-neutral-500">· {selectedProductModal.reviewsCount} dog parent reviews</span>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                      {selectedProductModal.description}
                    </p>
                  </div>

                  {/* Sizing Information if applicable */}
                  {selectedProductModal.sizes && selectedProductModal.sizes.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs font-mono text-neutral-400 block mb-1.5">
                        AVAILABLE SIZES ON PARTNER STORE:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProductModal.sizes.map((sz) => (
                          <span
                            key={sz}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
                          >
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-xs text-neutral-400 font-mono">
                    ✦ Clicking "Grab It" opens the official partner purchase page directly.
                  </div>
                </div>
              </div>

              {/* Bullet Details */}
              {selectedProductModal.details && selectedProductModal.details.length > 0 && (
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <h4 className="font-marker text-sm text-[#00FFFF] uppercase mb-2">
                    Official Product Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {selectedProductModal.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#FF3366]">✦</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="px-4 py-2.5 bg-neutral-800 text-neutral-300 text-xs font-bold uppercase rounded-lg hover:bg-neutral-700"
                >
                  Close
                </button>
                <a
                  href={selectedProductModal.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#FFCC00] hover:bg-[#e6b800] text-neutral-950 font-marker text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_#FFFFFF] flex items-center gap-2"
                >
                  <span>GRAB IT ON PARTNER STORE</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
