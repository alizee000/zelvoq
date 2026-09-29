"use client";

import { useState } from "react";
import { Star, Package, Key, ShoppingBag, Calendar, PieChart, Hand, Check, UploadCloud, HeartHandshake, ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { addTalent } from "@/app/actions/talents";
import { addGroupBuy } from "@/app/actions/group-buys";
import { createEvent } from "@/app/actions/events";
import { createCoOwnItem } from "@/app/actions/co-own";

function TagsInput() {
  const [tags, setTags] = useState<string[]>([]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tags (Press Enter)</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <div key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <input 
        type="text"
        placeholder="e.g., Cooking, Tech, Fitness"
        onKeyDown={handleKeyDown}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:bg-white focus:border-indigo-500/50 shadow-sm px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
      />
      <input type="hidden" name="tags" value={tags.join(',')} />
    </div>
  );
}

export default function AddPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const categories = [
    { id: 'skill', label: 'Share a Skill', desc: 'Teach or offer services', icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { id: 'item', label: 'Lend an Item', desc: 'Tools, books, appliances', icon: Package, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
    { id: 'event', label: 'Host Event', desc: 'Meetups, games, classes', icon: Calendar, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    { id: 'space', label: 'Share Space', desc: 'Parking, storage, desks', icon: Key, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { id: 'deal', label: 'Group Buy', desc: 'Split bulk purchases', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { id: 'coown', label: 'Co-own Asset', desc: 'Fractional ownership', icon: PieChart, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Auto-detect tags from title if not explicitly set
    let finalTags = data.tags;
    if (!finalTags || finalTags === '') {
      const titleLower = String(data.title).toLowerCase();
      const detected = [];
      if (titleLower.includes('bake') || titleLower.includes('cook') || titleLower.includes('food')) detected.push('Culinary');
      if (titleLower.includes('tech') || titleLower.includes('code') || titleLower.includes('app')) detected.push('Tech');
      if (titleLower.includes('fit') || titleLower.includes('yoga') || titleLower.includes('sport')) detected.push('Fitness');
      finalTags = detected.join(',');
    }

    // Prepare payload
    const payload = {
      ...data,
      category,
      tags: finalTags ? String(finalTags).split(',').filter(Boolean) : [],
      is_paid: data.is_paid === 'on',
    };

    try {
      if (category === 'deal') {
        await addGroupBuy(formData);
        router.push('/home');
      } else if (category === 'event') {
        await createEvent(formData);
        router.push('/events');

      } else if (category === 'coown') {
        await createCoOwnItem(formData);
        router.push('/home');
      } else {
        // skill, item, space map to talents
        // we need to inject category manually if it's missing from form
        formData.set("category", category as string);
        formData.set("tags", finalTags);
        formData.set("is_paid", data.is_paid === 'on' ? "true" : "false");
        await addTalent(formData);
        router.push('/home');
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create listing.");
    }
    
    setIsSubmitting(false);
  };

  const selectedCat = categories.find(c => c.id === category);

  // STEP 1: WIZARD CATEGORY SELECTION
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans">
        <div className="px-6 pt-16 pb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Create New</h1>
          <p className="text-slate-500 font-medium text-[15px]">What would you like to add to the community?</p>
        </div>

        <div className="px-6 pb-32 grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="flex flex-col items-start p-5 bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all active:scale-95 text-left group"
            >
              <div className={`w-12 h-12 rounded-2xl ${cat.bg} border ${cat.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
              </div>
              <span className="font-bold text-slate-900 text-[15px] leading-tight mb-1">{cat.label}</span>
              <span className="text-[11px] font-medium text-slate-500 leading-snug">{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // STEP 2: WIZARD FORM
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans selection:bg-indigo-500/30">
      <div className="px-6 pt-12 pb-32 max-w-lg mx-auto w-full">
        
        {/* Back Button */}
        <button 
          onClick={() => setCategory(null)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Selected Category Header */}
        {selectedCat && (
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-16 h-16 rounded-[1.25rem] ${selectedCat.bg} border ${selectedCat.border} flex items-center justify-center shadow-inner`}>
              <selectedCat.icon className={`w-8 h-8 ${selectedCat.color}`} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{selectedCat.label}</h1>
              <p className="text-sm font-medium text-slate-500">Fill in the details below.</p>
            </div>
          </div>
        )}

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
              {'Title'}
            </label>
            <input 
              name="title" 
              required 
              autoFocus
              placeholder={category === 'deal' ? "e.g., 50kg Alphonso Mangoes" : "e.g., Sourdough Baking Masterclass"} 
              className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 px-5 py-4 text-[16px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm"
            />
          </div>

          
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Description</label>
              <textarea 
                name="description" 
                required 
                rows={3} 
                placeholder="Share the details..." 
                className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm resize-none"
              />
            </div>

          {category === 'coown' && (
            <>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Total Price</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input name="total_price" type="number" required placeholder="50000" className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-9 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Max Shares</label>
                  <input name="max_shares" type="number" required placeholder="10" className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-5 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Price per Share</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input name="price_per_share" type="number" required placeholder="5000" className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-8 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            </>
          )}

          {category === 'deal' ? (
            <>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Vendor Name</label>
                <input name="vendor" required placeholder="e.g., FreshFarms Co." className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-5 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Original Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input name="original_price" type="number" required placeholder="800" className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-8 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Discount Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input name="discounted_price" type="number" required placeholder="600" className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-8 py-4 text-[15px] font-bold text-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            </>
          ) : category === 'event' ? (
            <>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Location</label>
                <input name="location" required placeholder="e.g., Clubhouse, Badminton Court" className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-5 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Event Date & Time</label>
                <input name="event_date" type="datetime-local" required className="w-full bg-white border border-slate-200 rounded-2xl text-slate-900 px-5 py-4 text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" />
              </div>
            </>
          ) : (
            <>
              {category === 'skill' && <TagsInput />}
              
              
              <label className="flex items-center gap-4 bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <HeartHandshake className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-slate-900">{category === 'space' ? "Is this space free?" : "Is this free?"}</p>
                  <p className="text-xs text-slate-500 font-medium">Toggle if you are charging money</p>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" name="is_paid" className="sr-only peer" />
                  <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-indigo-600"></div>
                </div>
              </label>
            </>
          )}

          {category !== 'skill' && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cover Photo</label>
              <div className="w-full h-40 bg-white border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-[1.5rem] flex flex-col items-center justify-center text-slate-500 group cursor-pointer transition-all relative overflow-hidden shadow-sm">
                <UploadCloud className="w-8 h-8 mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-all text-slate-400 group-hover:text-indigo-500" />
                <span className="text-sm font-bold text-slate-900">Upload an image</span>
                <span className="text-xs font-medium text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                <input name="image_url" type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          )}

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[16px] py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-70 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" /> Publish Listing
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
