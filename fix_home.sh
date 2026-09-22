sed -i '' 's|import { Bell, MapPin, Wrench, Flame, Users, Sparkles, Plus, Search } from "lucide-react";|import { Bell, MapPin, Wrench, Flame, Users, Sparkles, Plus, Search, Calendar } from "lucide-react";|g' src/app/\(app\)/home/page.tsx
sed -i '' 's|const groupBuys = await getGroupBuys();|const groupBuys = await getGroupBuys();\n  const { data: events } = await supabase.from("events").select("*");\n  const upcomingEvents = events || [];|g' src/app/\(app\)/home/page.tsx
sed -i '' 's|<section className="flex gap-4">|<section className="grid grid-cols-2 gap-4">|g' src/app/\(app\)/home/page.tsx
