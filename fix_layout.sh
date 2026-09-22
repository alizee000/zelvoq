sed -i '' 's|<main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 md:pb-0 z-0 bg-white">|<main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 md:pb-0 z-0 bg-white">\n        <TopNav />|g' src/app/\(app\)/layout.tsx

sed -i '' '/import { TopNav } from "@\/components\/layout\/top-nav";/d' src/app/\(app\)/home/page.tsx
sed -i '' '/<TopNav \/>/d' src/app/\(app\)/home/page.tsx

sed -i '' '/import { TopNav } from "@\/components\/layout\/top-nav";/d' src/app/\(app\)/market/page.tsx
sed -i '' '/<TopNav \/>/d' src/app/\(app\)/market/page.tsx

sed -i '' '/import { TopNav } from "@\/components\/layout\/top-nav";/d' src/app/\(app\)/discover/page.tsx
sed -i '' '/<TopNav \/>/d' src/app/\(app\)/discover/page.tsx

sed -i '' '/import { TopNav } from "@\/components\/layout\/top-nav";/d' src/app/\(app\)/profile/page.tsx
sed -i '' '/<TopNav \/>/d' src/app/\(app\)/profile/page.tsx
