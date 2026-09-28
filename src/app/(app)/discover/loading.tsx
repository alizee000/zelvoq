import { Search } from "lucide-react";

export default function DiscoverLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 pt-12 px-6">
      {/* Search Bar Skeleton */}
      <div className="w-full h-14 bg-slate-100 rounded-2xl flex items-center px-4 animate-pulse mb-8">
        <Search className="w-5 h-5 text-slate-300" />
      </div>

      <div className="flex flex-col gap-10">
        {/* Curated Section 1 */}
        <div className="flex flex-col gap-4">
          <div className="h-6 w-48 bg-slate-100 rounded-lg animate-pulse" />
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl animate-pulse">
            <div className="w-16 h-16 rounded-[1.25rem] bg-slate-200 shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="h-3 w-48 bg-slate-200 rounded" />
              <div className="h-3 w-24 bg-indigo-100 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl animate-pulse">
            <div className="w-16 h-16 rounded-[1.25rem] bg-slate-200 shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-3 w-40 bg-slate-200 rounded" />
              <div className="h-3 w-20 bg-indigo-100 rounded" />
            </div>
          </div>
        </div>

        {/* Curated Section 2 */}
        <div className="flex flex-col gap-4">
          <div className="h-6 w-40 bg-slate-100 rounded-lg animate-pulse" />
          <div className="w-full h-48 bg-slate-100 rounded-[2rem] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
