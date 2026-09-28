import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function ChatLoading() {
  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 overflow-hidden relative pb-16">
      {/* Top Navbar Skeleton */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 shadow-sm pt-safe pb-4 px-4 flex items-center gap-4">
        <div className="p-2 -ml-2 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </div>
        
        <Skeleton className="w-10 h-10 rounded-full" />
        
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-3 w-48 rounded-sm" />
        </div>
      </div>

      {/* Chat Messages Skeleton */}
      <div className="flex-1 p-6 space-y-6 overflow-hidden">
        {/* Timestamp */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>
        
        {/* Receiver Message */}
        <div className="flex items-end gap-3 justify-start max-w-[85%]">
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-48 rounded-2xl rounded-bl-sm" />
          </div>
        </div>

        {/* Sender Message */}
        <div className="flex items-end gap-3 justify-end max-w-[85%] ml-auto">
          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="h-12 w-64 rounded-2xl rounded-br-sm" />
            <Skeleton className="h-16 w-56 rounded-2xl rounded-br-sm" />
          </div>
        </div>
        
        {/* Receiver Message */}
        <div className="flex items-end gap-3 justify-start max-w-[85%]">
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-32 rounded-2xl rounded-bl-sm" />
          </div>
        </div>
      </div>

      {/* Bottom Input Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100">
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-12 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
