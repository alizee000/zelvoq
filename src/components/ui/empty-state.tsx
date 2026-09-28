import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-3xl border border-slate-100 min-h-[300px]", className)}>
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-indigo-50/50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl" />
        <Icon className="w-8 h-8 text-indigo-400 relative z-10" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-slate-500 mb-8 max-w-[250px] leading-relaxed">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link 
          href={actionHref}
          className="bg-slate-900 hover:bg-indigo-600 text-white text-sm font-bold px-6 py-3 rounded-full transition-colors duration-300 shadow-sm"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
