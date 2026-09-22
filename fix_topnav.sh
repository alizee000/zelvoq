sed -i '' 's|export default async function HomePage() {|import { TopNav } from "@/components/layout/top-nav";\n\nexport default async function HomePage() {|g' src/app/\(app\)/home/page.tsx
sed -i '' 's|<div className="flex flex-col min-h-screen pb-\[90px\] relative bg-\[#F8FAFC\]">|<div className="flex flex-col min-h-screen pb-\[90px\] relative bg-\[#F8FAFC\]">\n      <TopNav />|g' src/app/\(app\)/home/page.tsx

sed -i '' 's|export default async function MarketPage({|import { TopNav } from "@/components/layout/top-nav";\n\nexport default async function MarketPage({|g' src/app/\(app\)/market/page.tsx
sed -i '' 's|<div className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">|<div className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">\n      <TopNav />|g' src/app/\(app\)/market/page.tsx

sed -i '' 's|export default async function ProfilePage() {|import { TopNav } from "@/components/layout/top-nav";\n\nexport default async function ProfilePage() {|g' src/app/\(app\)/profile/page.tsx
sed -i '' 's|<div className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-32">|<div className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-32">\n      <TopNav />|g' src/app/\(app\)/profile/page.tsx
