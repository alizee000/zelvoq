import { Skeleton } from "@/components/ui/skeleton";

export default function AddLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-32 pt-8 px-6 relative overflow-hidden">
      <div className="mb-6">
        <Skeleton className="h-8 w-40 mb-2 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-4 w-64 rounded-md" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
