"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { TalentCard } from "@/components/shared/talent-card";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { name: "🍰 Food", id: "food" },
  { name: "🏏 Sports", id: "sports" },
  { name: "🧘 Wellness", id: "wellness" },
  { name: "🎵 Music", id: "music" },
  { name: "📚 Education", id: "education" },
  { name: "💻 Technology", id: "tech" },
  { name: "🎨 Art", id: "art" },
  { name: "📸 Photography", id: "photo" },
  { name: "⚕ Professionals", id: "prof" },
];

export function DiscoverClient({ skills }: { skills: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter skills based on search query and selected category
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = 
      skill.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      skill.owner_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Simple category matching logic (in a real app, you'd match actual tags)
    // Here we check if the category ID is anywhere in the text as a basic proxy
    const matchesCategory = selectedCategory 
      ? (skill.title?.toLowerCase().includes(selectedCategory.toLowerCase()) || 
         skill.description?.toLowerCase().includes(selectedCategory.toLowerCase()))
      : true;

    return matchesSearch && matchesCategory;
  });

  // Group by neighbor so each profile appears exactly once (unless we want to show multiple skills)
  const uniqueNeighborsMap = new Map();
  filteredSkills.forEach((talent: any) => {
    if (!uniqueNeighborsMap.has(talent.owner_name)) {
      uniqueNeighborsMap.set(talent.owner_name, talent);
    }
  });
  const uniqueNeighbors = Array.from(uniqueNeighborsMap.values());

  return (
    <>
      {/* Header & Search */}
      <header className="flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Discover
        </h1>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search skills, talents, neighbors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 text-base bg-white border-slate-200 rounded-2xl shadow-sm text-slate-900 placeholder:text-slate-400 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent"
          />
        </div>
      </header>

      {/* Categories Horizontal Scroll */}
      <section>
        <div className="flex flex-wrap gap-2 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl border text-xs font-bold tracking-wide transition-colors snap-start shadow-sm
                ${selectedCategory === cat.id 
                  ? "bg-indigo-600 border-indigo-600 text-white" 
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="flex flex-col gap-10">
        <DiscoverSection title={searchQuery || selectedCategory ? "Search Results" : "Recently Added Skills"}>
          {uniqueNeighbors.length > 0 ? (
            uniqueNeighbors.map((talent: any) => (
              <TalentCard 
                key={talent.id} 
                id={talent.id} 
                name={talent.owner_name} 
                role={talent.title} 
                tower={talent.tower} 
                endorsements={Math.floor(Math.random() * 50) + 1} 
                imageUrl={talent.image_url}
              />
            ))
          ) : (
            <p className="text-sm text-slate-500 col-span-2">No matching profiles found.</p>
          )}
        </DiscoverSection>
      </section>
    </>
  );
}

function DiscoverSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        {children && Array.isArray(children) && children.length > 0 && (
          <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700">See all</button>
        )}
      </div>
      <div className="flex overflow-x-auto gap-4 pb-6 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar">
        {children}
      </div>
    </div>
  );
}
