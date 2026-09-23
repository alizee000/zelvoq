"use client";

import { useState, useRef } from "react";
import { Search, MapPin, Star, Sparkles, Filter, ChevronLeft, ChevronRight } from "lucide-react";
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

export function DiscoverClient({ skills, initialQuery = "" }: { skills: any[], initialQuery?: string }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };


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
        <section className="">
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
        <section className="">
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
        <section className="">
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

        {/* Carousel Content */}
        <section className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both relative group">
          {uniqueNeighbors.length > 0 ? (
            <>
              <button 
                onClick={() => scroll("left")}
                className="absolute -left-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:scale-110 border border-slate-100 opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => scroll("right")}
                className="absolute -right-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:scale-110 border border-slate-100 opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 snap-x hide-scrollbar scroll-smooth">
              {uniqueNeighbors.map((talent: any, i: number) => (
                <Link 
                  href={`/talent/${talent.id}`} 
                  key={talent.id} 
                  className="flex-none w-[42vw] md:w-[200px] bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center text-center snap-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-indigo-100 transition-all cursor-pointer"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 bg-slate-100 border-4 border-white shadow-sm shrink-0">
                    {talent.image_url ? (
                      <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-indigo-50">
                        👤
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 w-full leading-tight">{talent.owner_name}</h3>
                  <p className="text-[13px] text-slate-500 w-full mt-1.5 font-medium leading-relaxed">{talent.title}</p>
                  <div className="mt-auto pt-3 w-full">
                    <p className="text-[10px] text-slate-400 w-full uppercase tracking-wider font-bold">{talent.tower || "Resident"}</p>
                  </div>
                </Link>
              ))}
            </div>
            </>
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


