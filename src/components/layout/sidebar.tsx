"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, Calendar, User, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Discover", href: "/discover", icon: Compass },
  { name: "Ask", href: "/ask", icon: Sparkles },
  { name: "Events", href: "/events", icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 border-r border-border bg-card/30 backdrop-blur-3xl z-40">
      <div className="p-6">
        <Link href="/home" className="flex items-center gap-3 mb-10 px-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">MyKoodu</span>
          </div>
        </Link>

        <div className="px-2 mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            My community.<br/>My people.<br/>My world.
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
            pathname === "/profile"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Zeeshan</span>
            <span className="text-xs text-muted-foreground">View Profile</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
