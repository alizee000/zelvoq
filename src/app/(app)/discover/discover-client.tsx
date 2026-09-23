"use client";

import { useState } from "react";
import { Search, MapPin, Star, Sparkles, Filter } from "lucide-react";
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
    <div className="flex flex-col min-h-screen pb-[90px] bg-white">
      <div className="flex flex-col gap-6 px-6 pt-6">
        
        {/* Page Header */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Discover
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Explore talents & skills in your community.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="animate-in fade-in zoom-in-95 duration-700 delay-75">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search chefs, tutors, skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </section>

        {/* Categories (Apple style pills) */}
        <section className="animate-in fade-in slide-in-from-right-8 duration-700 delay-[200ms]">
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-6 px-6 hide-scrollbar snap-x">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0
                    ${isSelected 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </section>

        {/* Grid Content */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[300ms]">
          {uniqueNeighbors.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {uniqueNeighbors.map((talent: any) => (
                <Link href={`/talent/${talent.id}`} key={talent.id} className="flex-none bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-sm hover:scale-[1.02] hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center relative">
                    {talent.image_url ? (
                      <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-indigo-50 text-indigo-300">
                        {talent.owner_name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1 w-full">{talent.owner_name}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 w-full mt-0.5 font-medium">{talent.title}</p>
                  <p className="text-[9px] text-slate-400 line-clamp-1 w-full mt-1 uppercase tracking-wider">{talent.tower || "Resident"}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No results</h3>
              <p className="text-sm text-slate-500">Try adjusting your filters.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
