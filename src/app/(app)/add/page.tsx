"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, Wrench, ShoppingBag, HeartHandshake, UploadCloud, Building, Target, CarFront } from "lucide-react";
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
  const [category, setCategory] = useState<"skill" | "item" | "deal" | "space" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-32 pt-8">

        <div className="px-6 pt-6">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-2">
            What would you like to list?
          </h1>
          <p className="text-slate-500 font-medium mb-10">Select a category to get started.</p>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Space Option */}
            <button 
              onClick={() => setCategory("space")}
              className="text-left bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-5 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform flex flex-col justify-between h-[200px]"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                <CarFront className="w-6 h-6" />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-white leading-tight mb-1">Share Space</h3>
                <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-wider">Parking & Rooms</p>
              </div>
            </button>

            {/* Deal Option */}
            <button 
              onClick={() => setCategory("deal")}
              className="text-left bg-gradient-to-br from-orange-400 to-rose-500 rounded-[2rem] p-5 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform flex flex-col justify-between h-[200px]"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-white leading-tight mb-1">Group Buy</h3>
                <p className="text-[10px] font-bold text-orange-100 uppercase tracking-wider">Bulk Discounts</p>
              </div>
            </button>

            {/* Item Option */}
            <button 
              onClick={() => setCategory("item")}
              className="text-left bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[2rem] p-5 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform flex flex-col justify-between h-[200px]"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-white leading-tight mb-1">Lend Item</h3>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Tools & Books</p>
              </div>
            </button>

            {/* Skill Option */}
            <button 
              onClick={() => setCategory("skill")}
              className="text-left bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[2rem] p-5 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform flex flex-col justify-between h-[200px]"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                <Target className="w-6 h-6" />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-white leading-tight mb-1">Offer Skill</h3>
                <p className="text-[10px] font-bold text-teal-100 uppercase tracking-wider">Teach & Help</p>
              </div>
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-right-4 duration-300 pb-32">
      
      {/* Sleek Page Header with Back Button */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between border-b border-slate-100">
        <button 
          onClick={() => setCategory(null)} 
          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black tracking-tight text-slate-900">
          {category === 'space' ? 'New Space' : category === 'deal' ? 'New Group Buy' : category === 'item' ? 'Lend Item' : 'Offer Skill'}
        </h1>
        <div className="w-10 h-10" />
      </header>

      {/* Form Area */}
      <div className="px-6 mt-8">
        <form action={async (formData) => {
          setIsSubmitting(true);
          try {
            formData.append("category", category);
            
            if (category === "deal") {
              const res = await addGroupBuy(formData);
              if (res.success) router.push("/market");
            } else {
              const res = await addTalent(formData);
              if (res.success) router.push(category === "skill" ? "/discover" : category === "space" ? "/market?tab=spaces" : "/market?tab=borrow");
            }
          } catch (e: any) {
            setIsSubmitting(false);
          }
        }} className="flex flex-col gap-6">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Title
            </label>
            <input 
              name="title" 
              required 
              placeholder={category === 'skill' ? "e.g., Mathematics Tutoring" : category === 'item' ? "e.g., Bosch Power Drill" : category === 'space' ? "e.g., Covered Parking Basement 1" : "e.g., Farm Fresh Mangoes"} 
              className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
            <textarea 
              name="description" 
              required 
              placeholder="Provide some details..." 
              rows={4}
              className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          {category === 'deal' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Vendor Name</label>
                <input name="vendor" required placeholder="e.g., FreshFarms Co." className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Original Price</label>
                  <input name="original_price" type="number" required placeholder="₹800" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Discount Price</label>
                  <input name="discounted_price" type="number" required placeholder="₹600" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
                </div>
              </div>
            </>
          ) : (
            <>
              {category === 'skill' && <TagsInput />}
              
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{category === 'space' ? "Is this space free?" : "Is this free?"}</p>
                  <p className="text-xs text-slate-500 font-medium">Charge money or offer it for free</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="is_paid" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </>
          )}

          {category !== 'skill' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Cover Photo</label>
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors relative overflow-hidden">
                <UploadCloud className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform text-slate-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Tap to upload</span>
                <input name="image_url" type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[15px] py-4 rounded-2xl transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Publishing..." : <><Sparkles className="w-4 h-4" /> Publish Listing</>}
          </button>
        </form>
      </div>
    </div>
  );
}
