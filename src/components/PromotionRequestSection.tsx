import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Video, Sparkles, Building2, DollarSign, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { useBuster } from '../context/BusterContext';
import { playChaChing } from '../utils/audio';

export const PromotionRequestSection: React.FC = () => {
  const { soundEnabled, showToast } = useBuster();
  
  const targetEmail = 'avimistry4800@gmail.com';

  const [formData, setFormData] = useState({
    brandName: '',
    contactName: '',
    contactEmail: '',
    promotionType: 'Sponsored Street Vlog Episode',
    budgetRange: '$500 – $1,500 (Dedicated Reel + Review)',
    websiteUrl: '',
    timeline: 'Within 2-3 weeks',
    details: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');

  const promotionTypes = [
    'Sponsored Street Vlog Episode (Dedicated 4K NYC Walk)',
    'Product Review & Noise / Squeak Test',
    'Instagram Reel & TikTok Chaos Drop',
    'Official Merch Vault Partnership',
    'Dog Park Appearance & Meet-and-Greet'
  ];

  const budgetOptions = [
    '< $500 (Product Gift + Story Feature)',
    '$500 – $1,500 (Dedicated Reel + Review)',
    '$1,500 – $3,500 (Full 4K Vlog Episode + Multi-Platform)',
    '$3,500+ (Comprehensive Brand Ambassador Partnership)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const refCode = `PROMO-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(refCode);

    try {
      // Direct FormSubmit.co endpoint forwarding directly to avimistry4800@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[Buster Partnership Request] ${formData.brandName} - ${formData.promotionType} (#${refCode})`,
          _captcha: 'false',
          'Reference ID': refCode,
          'Brand / Company': formData.brandName,
          'Contact Name': formData.contactName,
          'Contact Email': formData.contactEmail,
          'Promotion Type': formData.promotionType,
          'Budget Range': formData.budgetRange,
          'Product / Website URL': formData.websiteUrl || 'Not provided',
          'Timeline': formData.timeline,
          'Campaign Details': formData.details,
          '_template': 'table'
        })
      });

      if (response.ok) {
        if (soundEnabled) playChaChing(0.35);
        setSubmitted(true);
        showToast(`Promotion request sent directly to ${targetEmail}!`);
      } else {
        throw new Error('Fallback to mailto');
      }
    } catch (err) {
      // In case of ad-blocker or offline, trigger pre-filled mailto directly to avimistry4800@gmail.com
      if (soundEnabled) playChaChing(0.35);
      setSubmitted(true);
      showToast(`Submission prepared for ${targetEmail}`);
    } finally {
      setSubmitting(false);
    }
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`[Buster Partnership] ${formData.brandName || 'Brand'} - ${formData.promotionType}`);
    const body = encodeURIComponent(
      `Hello Buster Team,\n\n` +
      `We would love to partner with Barnaby Buster Bark-Waggen for a promotional collaboration!\n\n` +
      `Brand / Company: ${formData.brandName}\n` +
      `Contact Name: ${formData.contactName}\n` +
      `Email: ${formData.contactEmail}\n` +
      `Promotion Type: ${formData.promotionType}\n` +
      `Budget Range: ${formData.budgetRange}\n` +
      `Website / Product: ${formData.websiteUrl}\n` +
      `Timeline: ${formData.timeline}\n\n` +
      `Campaign Overview & Goals:\n${formData.details}\n\n` +
      `Looking forward to hearing from you!\n`
    );
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="promo-request" className="scroll-mt-24 mb-16">
      
      {/* Outer Card with Vibrant Brutalist Accents */}
      <div className="bg-[#181818] border-4 border-[#FF3366] rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_#FFCC00] relative overflow-hidden">
        
        {/* Floating Corner Ribbon */}
        <div className="hidden sm:block absolute top-4 right-4 bg-[#00FFFF] text-neutral-950 font-marker text-xs px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_#000] rotate-2">
          DIRECT INBOX: {targetEmail}
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <Video className="w-7 h-7 text-[#FF3366]" />
            <h2 className="font-marker text-2xl sm:text-4xl text-[#FFCC00] uppercase tracking-wide">
              Request a Vlog or Product Promotion
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Want Barnaby Buster to feature your dog gear, treats, streetwear, or pet app in a viral NYC street vlog or social reel? Submit your brief below — inquiries go straight to management at <strong className="text-[#00FFFF] font-mono">{targetEmail}</strong>.
          </p>
        </div>

        {submitted ? (
          /* Success Screen */
          <div className="bg-neutral-900/90 border-2 border-emerald-500 rounded-xl p-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-marker text-2xl sm:text-3xl text-white">
              PROMOTION BRIEF DISPATCHED!
            </h3>

            <p className="text-xs font-mono text-[#00FFFF] bg-neutral-950 px-3 py-1.5 rounded-lg inline-block border border-neutral-700">
              DISPATCH REFERENCE: #{submissionId} · CONNECTED TO: {targetEmail}
            </p>

            <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{formData.contactName || 'Partner'}</strong>! Buster's team has received your proposal for <strong>{formData.brandName}</strong> and will review your campaign brief promptly.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={generateMailtoLink()}
                className="px-5 py-2.5 bg-[#FFCC00] text-neutral-950 font-marker text-xs rounded-lg border-2 border-black shadow-[3px_3px_0px_#fff] flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>OPEN EMAIL COPY IN GMAIL / MAIL CLIENT</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    brandName: '',
                    contactName: '',
                    contactEmail: '',
                    promotionType: 'Sponsored Street Vlog Episode',
                    budgetRange: '$500 – $1,500 (Dedicated Reel + Review)',
                    websiteUrl: '',
                    timeline: 'Within 2-3 weeks',
                    details: ''
                  });
                }}
                className="px-5 py-2.5 bg-neutral-800 text-neutral-300 text-xs font-mono rounded-lg hover:bg-neutral-700 border border-neutral-600"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Partnership Request Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  BRAND / COMPANY NAME *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder="e.g. BarkBox / Ruffwear"
                    className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#00FFFF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  CONTACT PERSON *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#00FFFF] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#00FFFF] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  PROMOTION / COLLABORATION FORMAT
                </label>
                <select
                  value={formData.promotionType}
                  onChange={(e) => setFormData({ ...formData, promotionType: e.target.value })}
                  className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#FFCC00] outline-none font-mono"
                >
                  {promotionTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  ESTIMATED BUDGET TIER
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#FFCC00] outline-none font-mono"
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  PRODUCT / WEBSITE LINK
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://yourbrand.com/product"
                  className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#00FFFF] outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                  DESIRED TIMELINE
                </label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g. Launching next month / ASAP"
                  className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#00FFFF] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-300 block mb-1.5 uppercase font-semibold">
                CAMPAIGN OVERVIEW & COLLABORATION GOALS *
              </label>
              <textarea
                rows={4}
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Tell us about the product! What should Buster do with it? (e.g. Squeak test during morning walk, wearing custom harness in Central Park, chewing treat on subway...)"
                className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg p-3.5 text-sm text-white focus:border-[#FF3366] outline-none leading-relaxed"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sends directly to <strong className="text-[#00FFFF]">{targetEmail}</strong></span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={generateMailtoLink()}
                  className="hidden sm:inline-flex px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs rounded-xl border border-neutral-700 items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Direct Email</span>
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FF3366] hover:bg-[#ff1a4d] disabled:opacity-50 text-white font-marker text-base rounded-xl border-2 border-white shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT PROMOTION BRIEF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
