"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, Wrench, HeartHandshake, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addTalent } from "@/app/actions/talents";
import { addGroupBuy } from "@/app/actions/group-buys";
import { TagsInput } from "@/components/shared/tags-input";

export default function AddTalentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("skill");

  return (
    <div className="flex flex-col min-h-full pb-24 pt-8 px-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ease-out">
      
      <header className="flex items-center gap-4 mb-8">
        <Link href="/home" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm hover:scale-105 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Share with Neighbors
        </h1>
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
            console.error(e);
            alert("Error: " + e.message);
          }
        }} 
        className="flex flex-col gap-6"
      >
        {/* Category Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button 
            type="button"
            onClick={() => setCategory("skill")}
            className={`p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all ${category === 'skill' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <Sparkles className={`w-5 h-5 mb-1.5 ${category === 'skill' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <div className={`font-bold text-[10px] uppercase tracking-wider ${category === 'skill' ? 'text-indigo-900' : 'text-slate-700'}`}>Skill</div>
          </button>
          <button 
            type="button"
            onClick={() => setCategory("item")}
            className={`p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all ${category === 'item' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <Wrench className={`w-5 h-5 mb-1.5 ${category === 'item' ? 'text-orange-600' : 'text-slate-400'}`} />
            <div className={`font-bold text-[10px] uppercase tracking-wider ${category === 'item' ? 'text-orange-900' : 'text-slate-700'}`}>Library</div>
          </button>
          <button 
            type="button"
            onClick={() => setCategory("deal")}
            className={`p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all ${category === 'deal' ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <ShoppingBag className={`w-5 h-5 mb-1.5 ${category === 'deal' ? 'text-green-600' : 'text-slate-400'}`} />
            <div className={`font-bold text-[10px] uppercase tracking-wider ${category === 'deal' ? 'text-green-900' : 'text-slate-700'}`}>Group Buy</div>
          </button>
        </div>

        {/* Inputs */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5 space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Title</label>
            <input 
              name="title" 
              required
              placeholder={category === 'skill' ? "e.g., Math Tutoring" : category === 'item' ? "e.g., Power Drill" : "e.g., Farm Fresh Apples"} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
            <textarea 
              name="description"
              required
              rows={3} 
              placeholder="Provide more details..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
            />
          </div>

          {category === 'deal' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Vendor Name</label>
                <input name="vendor" required placeholder="e.g., Local Orchard" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Retail Price (₹)</label>
                  <input name="originalPrice" type="number" required placeholder="500" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Deal Price (₹)</label>
                  <input name="discountedPrice" type="number" required placeholder="300" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Target Qty</label>
                  <input name="targetQuantity" type="number" required placeholder="10" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Days Active</label>
                  <input name="expiresInDays" type="number" required placeholder="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium" />
                </div>
              </div>
            </div>
          ) : (
            <>
              {category === 'skill' && <TagsInput />}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Vibe</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="isPaid" value="false" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700">Free / Helping Out</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="isPaid" value="true" className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700">Paid</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <HeartHandshake className="w-5 h-5" />
              Publish to Community
            </>
          )}
        </button>

      </form>
    </div>
  );
}
