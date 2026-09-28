import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function AskLoading() {
  return (
    <div className="flex flex-col min-h-full pb-24 pt-8 px-6">
      <div className="flex flex-col w-full pt-[15vh] relative">
        <div className="absolute left-0 top-0 p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </div>

        <div className="flex flex-col gap-3 mt-12 mb-8">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-6 w-64 rounded-md" />
        </div>

        <Skeleton className="w-full h-16 rounded-[2rem] shadow-sm mb-4" />
        
        <div className="flex gap-2 mb-8">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
