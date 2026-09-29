with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# 1. Filter Hidden Gems to only show PEOPLE (skills/services)
content = content.replace(
    "{allTalents?.map((talent: any) => (",
    "{allTalents?.filter((t: any) => t.category === 'skill' || t.category === 'service').map((talent: any) => ("
)

# 2. Filter Community Stories to only show ITEMS and SPACES
content = content.replace(
    "const generatedStories = allTalents?.slice(0, 5).map((t: any) => {",
    "const generatedStories = allTalents?.filter((t: any) => t.category === 'item' || t.category === 'lend' || t.category === 'space').slice(0, 5).map((t: any) => {"
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
