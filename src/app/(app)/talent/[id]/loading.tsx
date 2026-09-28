import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TalentLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-32">
      {/* Editorial Header / Cover Skeleton */}
      <div className="relative w-full h-[280px] bg-slate-50">
        <Skeleton className="absolute inset-0 rounded-none w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-12 left-6 z-20">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-slate-200">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-24 relative z-10 max-w-2xl mx-auto w-full">
        {/* Avatar Skeleton */}
        <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-white mb-6 relative">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        </div>

        {/* Identity Skeleton */}
        <div className="mb-8 flex flex-col gap-3">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-5 w-64 rounded-md" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-3 mb-12">
          <Skeleton className="flex-1 h-14 rounded-2xl" />
          <Skeleton className="flex-1 h-14 rounded-2xl" />
        </div>

        <div className="space-y-10">
          {/* Services Section Skeleton */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          </div>

          {/* About Section Skeleton */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
            <div className="pl-8 space-y-2">
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-11/12 rounded-sm" />
              <Skeleton className="h-4 w-4/5 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
