import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-white/50 flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-[10px] font-bold tracking-widest text-indigo-900/60 uppercase">Loading</p>
      </div>
    </div>
  );
}
