import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

old_people = '  const people = allTalents.filter((t: any) => t.category === "skill" || t.category === "service").slice(0, 5);'
new_people = '''  const allPeople = allTalents.filter((t: any) => t.category === "skill" || t.category === "service");
  const uniquePeopleMap = new Map();
  allPeople.forEach((t: any) => {
    if (!uniquePeopleMap.has(t.owner_name)) {
      uniquePeopleMap.set(t.owner_name, t);
    }
  });
  const people = Array.from(uniquePeopleMap.values()).slice(0, 5);'''

content = content.replace(old_people, new_people)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

