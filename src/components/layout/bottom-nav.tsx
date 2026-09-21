"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Store, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const LEFT_NAV = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Explore", href: "/discover", icon: Compass },
];

const RIGHT_NAV = [
  { name: "Market", href: "/market", icon: Store },
  { name: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  const renderNavItems = (items: typeof LEFT_NAV) => 
    items.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center h-full space-y-1 transition-all px-3",
            isActive ? "text-indigo-600" : "text-slate-400 hover:text-indigo-400"
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isActive ? "scale-110" : "scale-100"
            )}
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span className={cn(
            "text-[10px] font-bold tracking-widest uppercase",
            isActive ? "opacity-100" : "opacity-0 scale-75 hidden"
          )}>
            {item.name}
          </span>
        </Link>
      );
    });

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-md h-16 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-full shadow-[0_20px_40px_-10px_rgba(79,70,229,0.15)] z-50 flex items-center justify-between px-4 pb-safe">
      <div className="flex items-center gap-2 h-full">
        {renderNavItems(LEFT_NAV)}
      </div>
      
      {/* Center Action Button */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-5">
        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
        <Link href="/add" className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white hover:scale-105 hover:-translate-y-1 transition-all group border-4 border-slate-50/50">
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </div>

      <div className="flex items-center gap-2 h-full">
        {renderNavItems(RIGHT_NAV)}
      </div>
    </div>
  );
}
