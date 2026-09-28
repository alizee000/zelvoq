export default function ProfileLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-32 pt-6 px-6 relative overflow-hidden">
      {/* Header Skeleton */}
      <div className="h-8 w-32 bg-slate-200 rounded-lg animate-pulse mb-2" />
      <div className="h-4 w-48 bg-slate-100 rounded-lg animate-pulse mb-6" />

      {/* ID Card Skeleton */}
      <div className="w-full h-[400px] bg-white rounded-[2rem] border border-slate-100 shadow-sm animate-pulse p-8 flex flex-col items-center">
        <div className="w-28 h-28 rounded-[2rem] bg-slate-100 mb-6" />
        <div className="h-8 w-48 bg-slate-100 rounded-lg mb-4" />
        <div className="h-4 w-32 bg-slate-100 rounded-lg mb-8" />
        <div className="w-full h-20 bg-slate-100 rounded-2xl" />
      </div>

      {/* Listings Skeleton */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-6 w-20 bg-indigo-50 rounded-full animate-pulse" />
        </div>
        <div className="h-20 bg-white border border-slate-100 rounded-[1.5rem] animate-pulse" />
        <div className="h-20 bg-white border border-slate-100 rounded-[1.5rem] animate-pulse" />
      </div>
    </div>
  );
}
