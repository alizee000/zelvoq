"use client";

import { useState } from "react";
import { Search, MapPin, Star, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "All", id: "all" },
  { name: "🍰 Food", id: "food" },
  { name: "🏏 Sports", id: "sports" },
  { name: "🧘 Wellness", id: "wellness" },
  { name: "🎵 Music", id: "music" },
  { name: "💻 Tech", id: "tech" },
];

export function DiscoverClient({ skills }: { skills: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = 
      skill.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      skill.owner_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory !== "all" 
      ? (skill.title?.toLowerCase().includes(selectedCategory.toLowerCase()) || 
         skill.description?.toLowerCase().includes(selectedCategory.toLowerCase()))
      : true;

    return matchesSearch && matchesCategory;
  });

  const uniqueNeighborsMap = new Map();
  filteredSkills.forEach((talent: any) => {
    if (!uniqueNeighborsMap.has(talent.owner_name)) {
      uniqueNeighborsMap.set(talent.owner_name, talent);
    }
  });
  const uniqueNeighbors = Array.from(uniqueNeighborsMap.values());

  return (
    <div className="flex flex-col relative bg-white min-h-screen pb-32">
      
      {/* Page Header */}
      <div className="pt-6 pb-4 px-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900">
            Discover
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative group mb-6 animate-in fade-in zoom-in-95 duration-700 delay-[100ms] fill-mode-both">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search chefs, tutors, skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 py-6 text-base font-medium bg-slate-50 border-transparent rounded-2xl shadow-none text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:bg-white transition-all"
          />
          <button className="absolute inset-y-0 right-4 flex items-center">
            <Filter className="h-5 w-5 text-slate-400 hover:text-indigo-600 transition-colors" />
          </button>
        </div>

        {/* Categories (Apple style pills) */}
        <div className="flex overflow-x-auto gap-2 -mx-6 px-6 hide-scrollbar animate-in fade-in slide-in-from-right-8 duration-700 delay-[200ms] fill-mode-both">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all shrink-0 border
                  ${isSelected 
                    ? "bg-slate-900 border-slate-900 text-white shadow-md" 
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[300ms] fill-mode-both">
        {uniqueNeighbors.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {uniqueNeighbors.map((talent: any) => (
              <Link href={`/talent/${talent.id}`} key={talent.id} className="group flex flex-col">
                {/* Image Container */}
                <div className="w-full aspect-[4/5] rounded-[1.5rem] relative overflow-hidden mb-3 bg-slate-100">
                  {talent.image_url ? (
                    <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-black uppercase bg-indigo-50 text-indigo-200 transition-transform duration-500 group-hover:scale-105">
                      {talent.owner_name?.charAt(0) || '?'}
                    </div>
                  )}
                  {/* Subtle gradient for text readability if we had text on image, but we don't here */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-slate-700">5.0</span>
                  </div>
                </div>
                
                {/* Text Content below image */}
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 leading-tight truncate">{talent.owner_name}</h4>
                  <p className="text-[13px] font-medium text-slate-500 truncate mt-0.5">{talent.title}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{talent.tower || "A-402"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No results</h3>
            <p className="text-sm text-slate-500">Try adjusting your filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
