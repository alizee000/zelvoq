import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

export function QuickActionCard({ title, icon: Icon, color, href }: QuickActionCardProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border hover:bg-slate-800/80 transition-all duration-300 w-full text-left group", color.split(' ').find(c => c.startsWith('border-')))}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-current/20 transition-transform duration-300 group-hover:scale-110", color)}>
        <Icon className="w-5 h-5" style={{ filter: 'drop-shadow(0 0 5px currentColor)' }} />
      </div>
      <span className="font-bold text-xs uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">{title}</span>
    </Link>
  );
}
