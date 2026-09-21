import { Search } from "lucide-react";
import { TalentCard } from "@/components/shared/talent-card";
import { Input } from "@/components/ui/input";
import { getTalents } from "@/lib/data/fetchers";

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

export default async function DiscoverPage() {
  const allTalents = await getTalents();
  // Filter for category 'skill' only
  const skills = allTalents.filter((t: any) => t.category === 'skill');

  // Group by neighbor so each profile appears exactly once
  const uniqueNeighborsMap = new Map();
  skills.forEach((talent: any) => {
    if (!uniqueNeighborsMap.has(talent.owner_name)) {
      uniqueNeighborsMap.set(talent.owner_name, talent);
    }
  });
  const uniqueNeighbors = Array.from(uniqueNeighborsMap.values());

  return (
    <div className="flex flex-col gap-8 pb-24 pt-8 px-6 min-h-full animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
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
              className="whitespace-nowrap px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold tracking-wide text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors snap-start shadow-sm"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="flex flex-col gap-10">
        
        <DiscoverSection title="Recently Added Skills">
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
            <p className="text-sm text-slate-500 col-span-2">No skills listed yet. Be the first!</p>
          )}
        </DiscoverSection>

      </section>
      
      {/* CSS to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

function DiscoverSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700">See all</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4">
        {children}
      </div>
    </div>
  );
}
