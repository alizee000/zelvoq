import { getTalents } from "@/lib/data/fetchers";
import { DiscoverClient } from "./discover-client";

export const revalidate = 0;


export default async function DiscoverPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const allTalents = await getTalents();
  // Filter for category 'skill' only
  const skills = allTalents.filter((t: any) => t.category === 'skill');

  return (
    <div className="flex flex-col min-h-full">
      <DiscoverClient skills={skills} initialQuery={q} />
      
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
