import { getTalents } from "@/lib/data/fetchers";
import { HiveNetwork } from "@/components/ui/hive-network";

export const revalidate = 0;

export default async function HivePage() {
  const talents = await getTalents();
  
  // Dedup users if they have multiple listings for the sake of the prototype visual
  const uniqueTalents = Array.from(new Map(talents.map((t: any) => [t.owner_name, t])).values());

  return (
    <div className="fixed inset-0 bg-slate-950">
      <HiveNetwork talents={uniqueTalents} />
    </div>
  );
}
