import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add import
import_statement = 'import { CarouselWrapper } from "@/components/ui/carousel-wrapper";\n'
content = content.replace('import { CommunityVideo } from "./community-video";', import_statement + 'import { CommunityVideo } from "./community-video";')


# Replace Trending carousel
trending_old = r'<div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x hide-scrollbar">\s*\{trendingItems\.map\(\(item, i\) => \{(.*?)\}\)\}\s*<\/div>'
def trending_replacer(match):
    inner = match.group(1)
    return f'<CarouselWrapper>\n            {{trendingItems.map((item, i) => {{{inner}}})}}\n          </CarouselWrapper>'

content = re.sub(trending_old, trending_replacer, content, flags=re.DOTALL)


# Replace People carousel
people_old = r'<div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x hide-scrollbar">\s*\{people\.length > 0 \? people\.map\(\(person: any\) => \((.*?)\)\) : \(\s*<div className="text-sm text-slate-500 p-4">No profiles found\. Encourage your neighbors to join!<\/div>\s*\)\}\s*<\/div>'
def people_replacer(match):
    inner = match.group(1)
    return f'<CarouselWrapper>\n            {{people.length > 0 ? people.map((person: any) => ({inner})) : (\n              <div className="text-sm text-slate-500 p-4">No profiles found. Encourage your neighbors to join!</div>\n            )}}\n          </CarouselWrapper>'

content = re.sub(people_old, people_replacer, content, flags=re.DOTALL)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

