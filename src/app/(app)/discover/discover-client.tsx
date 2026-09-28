"use client";

import { useState } from "react";
import { Search, MapPin, Sparkles, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function DiscoverClient({ skills, initialQuery = "" }: { skills: any[], initialQuery?: string }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredSkills = skills.filter((skill) => {
    const q = searchQuery.toLowerCase();
    if (!q) return false; // Show nothing in search results if no query
    return (
      skill.title?.toLowerCase().includes(q) || 
      skill.owner_name?.toLowerCase().includes(q) ||
      skill.description?.toLowerCase().includes(q) ||
      (skill.skills && skill.skills.some((s: string) => s.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 font-sans">
      {/* Sticky Header with Search */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 pt-12 pb-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <input 
            type="text" 
            placeholder="What do you need?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-slate-400 hover:text-slate-900"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      <div className="px-6 pt-6">
        {searchQuery ? (
          /* SEARCH RESULTS */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="text-sm font-bold text-slate-900 tracking-tight">
              We found {filteredSkills.length} {filteredSkills.length === 1 ? 'person' : 'people'} nearby.
            </div>

            {filteredSkills.map((talent: any) => (
              <Link 
                key={talent.id} 
                href={`/talent/${talent.id}`}
                className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
              >
                <div className="w-full h-48 bg-slate-100 relative">
                  {talent.image_url ? (
                    <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100"><User className="w-8 h-8 text-slate-400" /></div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-700">
                    <MapPin className="w-3.5 h-3.5" /> {talent.tower || "Resident"}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{talent.owner_name.split(' ')[0]}</h3>
                  
                  {/* Natural language explanation instead of raw tags */}
                  <div className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                    {talent.title} &bull; Can help with {talent.skills ? talent.skills.slice(0,2).join(" & ").toLowerCase() : "various tasks"}.
                  </div>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
                    Connect with {talent.owner_name.split(' ')[0]} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredSkills.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No exact matches</h3>
                <p className="text-sm text-slate-500 max-w-[250px] mx-auto font-medium">Try asking for something else, or ask MyKoodu to notify you when someone joins with this skill.</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* ZERO STATE (Curated Discovery) */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-10 mt-2">
            
            {/* Visual Categories */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Browse by Vibe</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setSearchQuery('Food')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80" alt="Culinary" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Culinary Arts</span>
                  </div>
                </button>
                <button onClick={() => setSearchQuery('Tech')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" alt="Tech" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-indigo-900/40 group-hover:bg-indigo-900/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Technology</span>
                  </div>
                </button>
                <button onClick={() => setSearchQuery('Wellness')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" alt="Wellness" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-emerald-900/40 group-hover:bg-emerald-900/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Wellness</span>
                  </div>
                </button>
                <button onClick={() => setSearchQuery('Creative')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80" alt="Creative" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-orange-900/40 group-hover:bg-orange-900/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Creative</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">You might want to meet...</h2>
              {skills.slice(0, 2).map((talent: any) => (
                <Link key={talent.id} href={`/talent/${talent.id}`} className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl hover:bg-slate-100 transition-colors">
                  <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden relative bg-slate-200 shrink-0">
                    {talent.image_url ? (
                      <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-slate-400" /></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-900 leading-tight mb-0.5">{talent.owner_name}</h4>
                    <p className="text-[13px] font-medium text-slate-500 mb-1">{talent.title}</p>
                    <p className="text-[11px] font-bold text-indigo-500 uppercase">Because you both like Tech</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">You didn't know...</h2>
              <Link href={`/talent/${skills[2]?.id || skills[0]?.id}`} className="relative w-full h-48 rounded-[2rem] overflow-hidden group shadow-sm">
                <Image src={skills[2]?.image_url || skills[0]?.image_url || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80"} alt="Discovery" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Hidden Capability</p>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {skills[2]?.owner_name.split(' ')[0] || "A neighbor"} makes incredible custom birthday cakes.
                  </h3>
                </div>
              </Link>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}
