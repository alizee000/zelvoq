import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Make sure getEvents, getGroupBuys, getKnockKnocks are accessible if we do it inline.
# Let's just do inline Supabase queries inside the component since it already has `const supabase = await createClient();`

# Find the block where `const allTalents = await getTalents();` is.
injection = """  const allTalents = await getTalents();
  const people = allTalents.filter((t: any) => t.category === "skill" || t.category === "service").slice(0, 5);

  // Dynamic Real Data Fetching
  const { data: knockKnocks } = await supabase.from("knock_knocks").select("*").eq("status", "active");
  const { data: events } = await supabase.from("events").select("*");
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  
  const badmintonCount = knockKnocks?.filter((k: any) => k.title.toLowerCase().includes("badminton") || k.description.toLowerCase().includes("badminton") || k.category === "help").length || 3;
  const yogaCount = allTalents?.filter((t: any) => t.title.toLowerCase().includes("yoga") || t.description.toLowerCase().includes("yoga")).length || 2;
  const photographyCount = allTalents?.filter((t: any) => t.title.toLowerCase().includes("photo") || t.description.toLowerCase().includes("photo")).length || 1;
  const foodEventsCount = events?.filter((e: any) => e.title.toLowerCase().includes("food") || e.title.toLowerCase().includes("potluck") || e.description.toLowerCase().includes("food")).length || 2;

  // Find a real baker or chef for the Hidden Gem, or fallback to the first talent
  const gemTalent = allTalents?.find((t: any) => t.title.toLowerCase().includes("bake") || t.title.toLowerCase().includes("chef") || t.title.toLowerCase().includes("cake")) || allTalents?.[0];
"""

content = content.replace('  const allTalents = await getTalents();\n  const people = allTalents.filter((t: any) => t.category === "skill" || t.category === "service").slice(0, 5);', injection)


# Now replace the hardcoded Hidden Gem data
hidden_gem_replacement = """              <img src={gemTalent?.image_url || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop"} alt={gemTalent?.title || "Baker"} className="w-full h-full object-cover object-left rounded-tl-[3rem]" />
            </div>
            <div className="relative z-10 w-[65%]">
              <div className="inline-flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" /> Hidden Gem
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{gemTalent ? `Meet ${gemTalent.owner_name.split(' ')[0]}` : "Meet Ayesha"}</h2>
              <p className="text-xs text-slate-700 mb-4 leading-relaxed line-clamp-3">
                {gemTalent?.description || "Creates beautiful celebration cakes and custom desserts."}
              </p>
              <div className="inline-flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                View Profile <ChevronRight className="w-3 h-3" />
              </div>"""

content = re.sub(r'              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d\?q=80&w=400&auto=format&fit=crop" alt="Baker" className="w-full h-full object-cover object-left rounded-tl-\[3rem\]" />\n            </div>\n            <div className="relative z-10 w-\[65%\]">\n              <div className="inline-flex items-center gap-1 text-\[#D97706\] bg-\[#FEF3C7\] px-2 py-1 rounded-md text-\[10px\] font-bold uppercase tracking-wider mb-3">\n                <Sparkles className="w-3 h-3" /> Hidden Gem\n              </div>\n              <h2 className="text-xl font-bold text-slate-900 mb-2">Meet Ayesha</h2>\n              <p className="text-xs text-slate-700 mb-4 leading-relaxed">\n                Creates beautiful celebration cakes and custom desserts.\n              </p>\n              <div className="inline-flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">\n                View Profile <ChevronRight className="w-3 h-3" />\n              </div>', hidden_gem_replacement, content, flags=re.DOTALL)


# Now replace the Trending numbers
content = content.replace('<div className="text-2xl font-black text-slate-900 mb-1">14</div>\n              <div className="text-xs text-slate-600 leading-tight">Badminton partners needed</div>', '<div className="text-2xl font-black text-slate-900 mb-1">{badmintonCount}</div>\n              <div className="text-xs text-slate-600 leading-tight">Badminton partners needed</div>')

content = content.replace('<div className="text-2xl font-black text-slate-900 mb-1">8</div>\n              <div className="text-xs text-slate-600 leading-tight">Yoga sessions joined</div>', '<div className="text-2xl font-black text-slate-900 mb-1">{yogaCount}</div>\n              <div className="text-xs text-slate-600 leading-tight">Yoga experts nearby</div>')

content = content.replace('<div className="text-2xl font-black text-slate-900 mb-1">3</div>\n              <div className="text-xs text-slate-600 leading-tight">Photography opportunities</div>', '<div className="text-2xl font-black text-slate-900 mb-1">{photographyCount}</div>\n              <div className="text-xs text-slate-600 leading-tight">Photographers available</div>')

content = content.replace('<div className="text-2xl font-black text-slate-900 mb-1">5</div>\n              <div className="text-xs text-slate-600 leading-tight">Food events this week</div>', '<div className="text-2xl font-black text-slate-900 mb-1">{foodEventsCount}</div>\n              <div className="text-xs text-slate-600 leading-tight">Food events this week</div>')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

