import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

data_injection = """
  // Dynamic Trending Data
  const { count: dealsCount } = await supabase.from("group_buys").select("id", { count: "exact", head: true });
  const { count: knockKnocksCount } = await supabase.from("knock_knocks").select("id", { count: "exact", head: true });
  const { count: eventsCount } = await supabase.from("events").select("id", { count: "exact", head: true });
  const libraryCount = allTalents?.filter((t: any) => t.category === "lend" || t.category === "item").length || 0;
  const skillsCount = allTalents?.filter((t: any) => t.category === "skill").length || 0;

  const trendingItems = [];
  if (dealsCount) trendingItems.push({ count: dealsCount, label: "Active community deals", icon: Ticket, bg: "bg-[#F0FDF4]", iconBg: "bg-[#DCFCE7]", iconColor: "text-[#166534]" });
  if (knockKnocksCount) trendingItems.push({ count: knockKnocksCount, label: "Neighbors needing help", icon: Activity, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });
  if (eventsCount) trendingItems.push({ count: eventsCount, label: "Upcoming community events", icon: Coffee, bg: "bg-[#FFF1F2]", iconBg: "bg-[#FFE4E6]", iconColor: "text-[#BE123C]" });
  if (libraryCount) trendingItems.push({ count: libraryCount, label: "Items to borrow", icon: Camera, bg: "bg-[#F3E8FF]", iconBg: "bg-[#E9D5FF]", iconColor: "text-[#7E22CE]" });
  if (skillsCount) trendingItems.push({ count: skillsCount, label: "Local experts & skills", icon: Sparkles, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });
"""

# Replace the old extraction block
content = re.sub(r'  // Dynamic Real Data Fetching.*?const gemTalent =', data_injection + '\n  const gemTalent =', content, flags=re.DOTALL)


# Replace the old cards rendering with a dynamic map
cards_replacement = """
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x hide-scrollbar">
            {trendingItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm`}>
                  <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center mb-4 ${item.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 mb-1">{item.count}</div>
                  <div className="text-xs text-slate-600 leading-tight">{item.label}</div>
                </div>
              );
            })}
          </div>"""

# Find the start of the cards container
content = re.sub(r'<div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x hide-scrollbar">.*?</div>\s*</section>', cards_replacement + '\n        </section>', content, flags=re.DOTALL)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

