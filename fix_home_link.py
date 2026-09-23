with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Replace the specific Link for the Knock-Knocks
old_link = 'if (knockKnocksCount) trendingItems.push({ count: knockKnocksCount, label: "Neighbors needing help", href: "/add", icon: Activity, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });'
new_link = 'if (knockKnocksCount) trendingItems.push({ count: knockKnocksCount, label: "Neighbors needing help", href: "/knock-knocks", icon: Activity, bg: "bg-[#FFFBEB]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" });'

content = content.replace(old_link, new_link)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

