"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, Wrench, ShoppingBag, HeartHandshake, UploadCloud, Building, Target, CarFront, PieChart, Calendar, BellRing } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { addTalent } from "@/app/actions/talents";
import { addGroupBuy } from "@/app/actions/group-buys";
import { createEvent } from "@/app/actions/events";
import { createKnockKnock } from "@/app/actions/knock-knocks";
import { createCoOwnItem } from "@/app/actions/co-own";

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
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") as "skill" | "item" | "deal" | "space" | "event" | "knock" | "coown" | null;
  const [category, setCategory] = useState<"skill" | "item" | "deal" | "space" | "event" | "knock" | "coown" | null>(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50/50 pb-32 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

        <div className="flex flex-col gap-6 px-6 pt-6 ">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Add Listing
            </h1>
            <p className="text-sm text-slate-500 mt-1">Select a category to get started.</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Knock-Knock Option */}
            <button onClick={() => setCategory("knock")} className="w-full text-left bg-[#FFF1F2] rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[50ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-rose-900 mb-1">Knock-Knock SOS</h3>
                <p className="text-sm text-rose-500 font-medium">Ask neighbors for a quick favor</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-110 transition-transform">
                <BellRing className="w-7 h-7" />
              </div>
            </button>

            {/* Item Option */}
            <button onClick={() => setCategory("item")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[100ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Lend an Item</h3>
                <p className="text-sm text-slate-500 font-medium">Share idle tools and equipment</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Wrench className="w-7 h-7" />
              </div>
            </button>


            {/* Skill Option */}
            <button onClick={() => setCategory("skill")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[150ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Offer a Skill</h3>
                <p className="text-sm text-slate-500 font-medium">Teach math, yoga, or baking</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Target className="w-7 h-7" />
              </div>
            </button>


            {/* Deal Option */}
            <button onClick={() => setCategory("deal")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[200ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Start Group Buy</h3>
                <p className="text-sm text-slate-500 font-medium">Unlock bulk discounts together</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <ShoppingBag className="w-7 h-7" />
              </div>
            </button>


            {/* Event Option */}
            <button onClick={() => setCategory("event")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[250ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Host an Event</h3>
                <p className="text-sm text-slate-500 font-medium">Tournament, Festival, or Meetup</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Calendar className="w-7 h-7" />
              </div>
            </button>

            {/* Space Option */}
            <button onClick={() => setCategory("space")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[300ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Share a Space</h3>
                <p className="text-sm text-slate-500 font-medium">Rent out your parking spot or room</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <CarFront className="w-7 h-7" />
              </div>
            </button>




            {/* Co-Own Option */}
            <button onClick={() => setCategory("coown")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[350ms] fill-mode-both"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Co-Own an Asset</h3>
                <p className="text-sm text-slate-500 font-medium">Pool money to buy a drone or PS5</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <PieChart className="w-7 h-7" />
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
          {category === 'space' ? 'New Space' : category === 'deal' ? 'New Group Buy' : category === 'item' ? 'Lend Item' : category === 'event' ? 'Host Event' : category === 'knock' ? 'Ask a Favor' : 'Offer Skill'}
        </h1>
        <div className="w-10 h-10" />
      </header>

      {/* Form Area */}
      <div className="px-6 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[100ms] fill-mode-both">
        <form action={async (formData) => {
          setIsSubmitting(true);
          try {
            formData.append("category", category);
            
            if (category === "deal") {
              const res = await addGroupBuy(formData);
              if (res.success) router.push("/market");
            } else if (category === "event") {
              const res = await createEvent(formData);
              if (res.success) router.push("/events/" + res.id);
            } else if (category === "knock") {
              const res = await createKnockKnock(formData.get("title") as string);
              if (res.success) router.push("/home");
                        } else if (category === "coown") {
              const res = await createCoOwnItem(formData);
              if (res.success) router.push("/market?tab=coown");
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
              placeholder={category === 'skill' ? "e.g., Mathematics Tutoring" : category === 'item' ? "e.g., Bosch Power Drill" : category === 'space' ? "e.g., Covered Parking Basement 1" : category === 'event' ? "e.g., Weekend Badminton Tournament" : category === 'knock' ? "e.g., Need 2 eggs urgently!" : category === 'coown' ? "e.g., DJI Mini 4 Pro Drone" : "e.g., Farm Fresh Mangoes"} 
              className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {category !== 'knock' && (
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
          )}


          {category === 'coown' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Price</label>
                <input name="total_price" type="number" required placeholder="₹50000" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Max Shares</label>
                  <input name="max_shares" type="number" required placeholder="10" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Price per Share</label>
                  <input name="price_per_share" type="number" required placeholder="₹5000" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
                </div>
              </div>
            </>
          )}

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
          ) : category === 'event' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Location</label>
                <input name="location" required placeholder="e.g., Clubhouse, Badminton Court" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event Date & Time</label>
                <input name="event_date" type="datetime-local" required className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
              </div>
            </>
          ) : (
            <>
              {category === 'skill' && <TagsInput />}
              
              {category !== 'knock' && (
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
              )}
            </>
          )}

          {category !== 'skill' && category !== 'knock' && (
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
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Publish Listing
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}
