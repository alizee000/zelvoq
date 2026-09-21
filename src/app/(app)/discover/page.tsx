import { getTalents } from "@/lib/data/fetchers";
import { DiscoverClient } from "./discover-client";

export default async function DiscoverPage() {
  const allTalents = await getTalents();
  // Filter for category 'skill' only
  const skills = allTalents.filter((t: any) => t.category === 'skill');

  return (
    <div className="flex flex-col gap-8 pb-24 pt-8 px-6 min-h-full animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <DiscoverClient skills={skills} />
      
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
