import { Skeleton } from "@/components/ui/skeleton";

export default function MarketLoading() {
  return (
    <div className="w-full flex flex-col min-h-screen pb-24 px-6 pt-12">
      {/* Header */}
      <Skeleton className="h-10 w-48 mb-6" />

      {/* Tabs Skeleton */}
      <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-full">
        <Skeleton className="h-10 flex-1 rounded-full bg-white shadow-sm" />
        <Skeleton className="h-10 flex-1 rounded-full bg-transparent" />
        <Skeleton className="h-10 flex-1 rounded-full bg-transparent" />
        <Skeleton className="h-10 flex-1 rounded-full bg-transparent" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-[140px] w-full rounded-[2rem]" />
        <Skeleton className="h-[140px] w-full rounded-[2rem]" />
        <Skeleton className="h-[140px] w-full rounded-[2rem]" />
      </div>
    </div>
  );
}
