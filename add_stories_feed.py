import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if 'CommunityStories' not in content:
    import_statement = 'import { CommunityStories } from "@/components/ui/community-stories";\n'
    content = content.replace('import { DynamicGreeting } from "./dynamic-greeting";', 'import { DynamicGreeting } from "./dynamic-greeting";\n' + import_statement)

# 2. Add logic to generate stories before the return statement
logic = """
  // Generate AI-like Community Stories
  const generatedStories = allTalents?.slice(0, 5).map((t: any) => {
    let text = "";
    if (t.category === "item" || t.category === "lend") {
      text = `Did you know ${t.owner_name} has a ${t.title} sitting idle today? Save money and borrow it locally!`;
    } else if (t.category === "space") {
      text = `Need extra parking? ${t.owner_name} has a ${t.title} open right now. Book it before it's gone.`;
    } else {
      text = `Neighbors are loving ${t.owner_name}'s expertise in ${t.title}. Tap to connect and learn more!`;
    }
    return {
      id: t.id,
      type: t.category,
      title: t.title,
      text: text,
      avatar: t.image_url,
      ownerName: t.owner_name,
      href: `/talent/${t.id}`
    };
  }) || [];

  return (
"""
content = content.replace('return (', logic, 1)

# 3. Inject the UI below Trending
trending_end = "</CarouselWrapper>\n </MotionSection>"
stories_ui = """</CarouselWrapper>
 </MotionSection>

 {/* Community Stories Section */}
 <MotionSection delay={0.35}>
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-base font-bold text-slate-900">Community Stories</h2>
 <ChevronRight className="w-4 h-4 text-slate-400" />
 </div>
 <CommunityStories stories={generatedStories} />
 </MotionSection>"""
 
content = content.replace(trending_end, stories_ui, 1)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

