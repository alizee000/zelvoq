import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="w-full flex flex-col min-h-screen pb-24">
      {/* Header Skeleton */}
      <div className="px-6 pt-12 pb-6">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="px-6 mb-8 flex gap-3">
        <Skeleton className="h-12 flex-1 rounded-full" />
        <Skeleton className="h-12 flex-1 rounded-full" />
      </div>

      {/* Trending Skeleton */}
      <div className="px-6 mb-4 flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
      
      <div className="flex gap-4 px-6 overflow-x-hidden mb-8">
        <Skeleton className="h-[200px] w-[280px] shrink-0 rounded-[2rem]" />
        <Skeleton className="h-[200px] w-[280px] shrink-0 rounded-[2rem]" />
      </div>

      {/* Stories Skeleton */}
      <div className="px-6 mb-4">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="flex gap-4 px-6 overflow-x-hidden mb-8">
        <Skeleton className="h-32 w-48 shrink-0 rounded-3xl" />
        <Skeleton className="h-32 w-48 shrink-0 rounded-3xl" />
        <Skeleton className="h-32 w-48 shrink-0 rounded-3xl" />
      </div>
    </div>
  );
}
