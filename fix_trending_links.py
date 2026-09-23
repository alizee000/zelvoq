import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Replace the trendingItems push logic to include hrefs
old_push = """  if (dealsCount) trendingItems.push({ count: dealsCount, label: "Active community deals", icon: Ticket, bg: "bg-[#F0FDF4]", iconBg: "bg-[#DCFCE7]", iconColor: "text-[#166534]" });
  if (knockKnocksCount) trendingItems.push({ count: knockKnocksCount, label: "Neighbors needing help", icon: Activity, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });
  if (eventsCount) trendingItems.push({ count: eventsCount, label: "Upcoming community events", icon: Coffee, bg: "bg-[#FFF1F2]", iconBg: "bg-[#FFE4E6]", iconColor: "text-[#BE123C]" });
  if (libraryCount) trendingItems.push({ count: libraryCount, label: "Items to borrow", icon: Camera, bg: "bg-[#F3E8FF]", iconBg: "bg-[#E9D5FF]", iconColor: "text-[#7E22CE]" });
  if (skillsCount) trendingItems.push({ count: skillsCount, label: "Local experts & skills", icon: Sparkles, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });"""

new_push = """  if (dealsCount) trendingItems.push({ count: dealsCount, label: "Active community deals", href: "/market", icon: Ticket, bg: "bg-[#F0FDF4]", iconBg: "bg-[#DCFCE7]", iconColor: "text-[#166534]" });
  if (knockKnocksCount) trendingItems.push({ count: knockKnocksCount, label: "Neighbors needing help", href: "/add", icon: Activity, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });
  if (eventsCount) trendingItems.push({ count: eventsCount, label: "Upcoming community events", href: "/events", icon: Coffee, bg: "bg-[#FFF1F2]", iconBg: "bg-[#FFE4E6]", iconColor: "text-[#BE123C]" });
  if (libraryCount) trendingItems.push({ count: libraryCount, label: "Items to borrow", href: "/market?tab=borrow", icon: Camera, bg: "bg-[#F3E8FF]", iconBg: "bg-[#E9D5FF]", iconColor: "text-[#7E22CE]" });
  if (skillsCount) trendingItems.push({ count: skillsCount, label: "Local experts & skills", href: "/discover", icon: Sparkles, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });"""

content = content.replace(old_push, new_push)


# Update the trending items map to use <Link>
old_map = """            {trendingItems.map((item, i) => {
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
            })}"""

new_map = """            {trendingItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={i} className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.02] hover:shadow-md transition-all`}>
                  <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center mb-4 ${item.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 mb-1">{item.count}</div>
                  <div className="text-xs text-slate-600 leading-tight">{item.label}</div>
                </Link>
              );
            })}"""

content = content.replace(old_map, new_map)

# Also make the Hidden Gem clickable by adding href if it doesn't have it, but wait, it already has <Link href="/discover">.
# Also make the People You Should Know cards clickable to /discover
old_people = """              <div key={person.id} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm">"""
new_people = """              <Link href="/discover" key={person.id} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm hover:scale-[1.02] hover:border-indigo-100 transition-all cursor-pointer">"""

content = content.replace(old_people, new_people)

# Need to change the closing </div> to </Link> for people map
old_people_end = """                <p className="text-[9px] text-slate-400 line-clamp-1 w-full mt-1 uppercase tracking-wider">{person.tower || "Resident"}</p>
              </div>"""
new_people_end = """                <p className="text-[9px] text-slate-400 line-clamp-1 w-full mt-1 uppercase tracking-wider">{person.tower || "Resident"}</p>
              </Link>"""

content = content.replace(old_people_end, new_people_end)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

