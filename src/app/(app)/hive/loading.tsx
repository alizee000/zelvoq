import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HiveLoading() {
  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden">
      {/* Dark mode header skeleton */}
      <div className="absolute top-12 left-6 right-6 z-50 flex items-center justify-between">
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
          <ArrowLeft className="w-5 h-5 text-white/50" />
        </div>
        <Skeleton className="h-8 w-32 rounded-lg bg-white/5" />
      </div>

      {/* Orbiting nodes placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="w-[300px] h-[300px] rounded-full bg-indigo-500/10" />
        <Skeleton className="absolute w-[200px] h-[200px] rounded-full bg-purple-500/10" />
        <Skeleton className="absolute w-20 h-20 rounded-full bg-white/5" />
      </div>
      
      {/* Bottom panel skeleton */}
      <div className="absolute bottom-6 left-6 right-6 z-50">
        <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col gap-3">
          <Skeleton className="h-6 w-48 rounded-md bg-white/5" />
          <Skeleton className="h-4 w-64 rounded-md bg-white/5" />
        </div>
      </div>
    </div>
  );
}
