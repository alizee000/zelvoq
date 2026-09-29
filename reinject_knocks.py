import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# 1. Add imports
if 'LiveKnocks' not in content:
    content = content.replace(
        'import { Sparkles } from "lucide-react";',
        'import { Sparkles } from "lucide-react";\nimport { LiveKnocks } from "@/components/ui/live-knocks";'
    )
    # If the user doesn't have sparkles imported, fallback generic import
    if 'import { LiveKnocks }' not in content:
        content = content.replace(
            'import Link from "next/link";',
            'import Link from "next/link";\nimport { LiveKnocks } from "@/components/ui/live-knocks";'
        )

# 2. Add database query to HomePage
query_code = """
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: dbKnocks } = await supabase.from("knock_knocks").select("*").eq("status", "active").order("created_at", { ascending: false });
  
  const liveKnocks = dbKnocks?.map((k: any) => ({
    id: k.id,
    title: k.title,
    owner_name: k.creator_name,
    image_url: '', 
    created_at: k.created_at,
    tower: k.tower
  })) || [];
"""
if 'const liveKnocks' not in content:
    content = content.replace(
        'const allTalents = await getTalents();',
        'const allTalents = await getTalents();\n' + query_code
    )

# 3. Inject the LiveKnocks component right after the Search bar
if '<LiveKnocks' not in content:
    search_bar_end = """        {/* Search Bar */}
        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search neighborhood..." 
              className="w-full bg-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border border-slate-200 shadow-sm transition-all"
            />
          </div>
        </div>"""
    
    live_knocks_ui = """
        {/* Live Knocks Status Row */}
        <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
"""
    if search_bar_end in content:
        content = content.replace(search_bar_end, search_bar_end + live_knocks_ui)
    else:
        # Fallback if the exact formatting is slightly different
        content = content.replace('placeholder="Search neighborhood..."', 'placeholder="Search neighborhood..."')
        # Just find the end of search bar using regex
        pattern = re.compile(r'\{\/\* Search Bar \*\/\}[\s\S]*?<\/div>\s*<\/div>')
        match = pattern.search(content)
        if match:
            content = content[:match.end()] + live_knocks_ui + content[match.end():]

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

