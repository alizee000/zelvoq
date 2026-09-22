"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, Wrench, ShoppingBag, HeartHandshake, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addTalent } from "@/app/actions/talents";
import { addGroupBuy } from "@/app/actions/group-buys";

function TagsInput() {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tags</label>
      <input 
        name="tags" 
        placeholder="e.g., cooking, math, tools (comma separated)" 
        className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
      />
    </div>
  );
}

export default function AddPage() {
  const [category, setCategory] = useState<"skill" | "item" | "deal">("skill");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-32">
      
      {/* Sleek Page Header */}
      <header className="px-6 pt-8 pb-6 flex items-center justify-between">
        <Link href="/home" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Create Listing
        </h1>
        <div className="w-10 h-10" /> {/* Spacer for centering */}
      </header>

      <form 
        action={async (formData) => {
          setIsSubmitting(true);
          formData.append("category", category);
          try {
            if (category === "deal") {
              const res = await addGroupBuy(formData);
              if (res.success) router.push("/market");
            } else {
              const res = await addTalent(formData);
              if (res.success) router.push(category === "skill" ? "/discover" : "/market?tab=borrow");
            }
          } catch (e: any) {
            setIsSubmitting(false);
            alert("Error: " + e.message);
          }
        }} 
        className="flex flex-col gap-8 px-6"
      >
        {/* iOS Segmented Control Style Category Selector */}
        <div className="bg-slate-100 p-1.5 rounded-full flex relative">
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(${category === 'skill' ? '0%' : category === 'item' ? '100%' : '200%'})` 
            }}
          />
          <button 
            type="button"
            onClick={() => setCategory("skill")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-10 transition-colors ${category === 'skill' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Sparkles className="w-4 h-4" /> Skill
          </button>
          <button 
            type="button"
            onClick={() => setCategory("item")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-10 transition-colors ${category === 'item' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Wrench className="w-4 h-4" /> Library
          </button>
          <button 
            type="button"
            onClick={() => setCategory("deal")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-10 transition-colors ${category === 'deal' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Group Buy
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Title</label>
            <input 
              name="title" 
              required
              placeholder={category === 'skill' ? "e.g., Mathematics Tutoring" : category === 'item' ? "e.g., Bosch Power Drill" : "e.g., Farm Fresh Mangoes"} 
              className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
            <textarea 
              name="description"
              required
              rows={4} 
              placeholder="Provide more details about what you're sharing..." 
              className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
            />
          </div>

          {category === 'deal' ? (
            <div className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Vendor Name</label>
                <input name="vendor" required placeholder="e.g., Local Farm Supply" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Retail (₹)</label>
                  <input name="originalPrice" type="number" required placeholder="500" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Deal (₹)</label>
                  <input name="discountedPrice" type="number" required placeholder="300" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-emerald-600 font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target Qty</label>
                  <input name="targetQuantity" type="number" required placeholder="10" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Days Active</label>
                  <input name="expiresInDays" type="number" required placeholder="3" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {category === 'skill' && <TagsInput />}
              
              {/* Vibe / Paid Toggle */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Is this free?</label>
                <div className="flex gap-3">
                  <label className="flex-1 relative cursor-pointer group">
                    <input type="radio" name="isPaid" value="false" defaultChecked className="peer sr-only" />
                    <div className="bg-slate-50 border-2 border-transparent peer-checked:border-indigo-600 peer-checked:bg-indigo-50 rounded-2xl p-4 transition-all text-center">
                      <span className="text-[13px] font-extrabold text-slate-900 peer-checked:text-indigo-900 block mb-1">Free</span>
                      <span className="text-[10px] text-slate-500 font-medium">Just helping out</span>
                    </div>
                  </label>
                  <label className="flex-1 relative cursor-pointer group">
                    <input type="radio" name="isPaid" value="true" className="peer sr-only" />
                    <div className="bg-slate-50 border-2 border-transparent peer-checked:border-indigo-600 peer-checked:bg-indigo-50 rounded-2xl p-4 transition-all text-center">
                      <span className="text-[13px] font-extrabold text-slate-900 peer-checked:text-indigo-900 block mb-1">Paid</span>
                      <span className="text-[10px] text-slate-500 font-medium">Professional service</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Optional Photo Upload for Items/Deals */}
        {category !== 'skill' && (
          <div className="mt-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">
              Cover Photo <span className="text-slate-400 font-medium normal-case tracking-normal">(Optional)</span>
            </label>
            <div className="w-full aspect-[21/9] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-400">Tap to upload image</span>
            </div>
          </div>
        )}

        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 mt-4 rounded-full bg-slate-900 text-white text-[15px] font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isSubmitting ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Publish Listing
            </>
          )}
        </button>

      </form>
    </div>
  );
}
