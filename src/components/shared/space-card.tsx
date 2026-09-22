import { MapPin, Calendar } from "lucide-react";

interface SpaceCardProps {
  title: string;
  description: string;
  ownerName: string;
  location: string;
  availability: string;
  price: string;
  imageUrl: string;
}

export function SpaceCard({ title, description, ownerName, location, availability, price, imageUrl }: SpaceCardProps) {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden group hover:scale-[1.01] transition-transform">
      <div className="relative h-48 w-full bg-slate-200">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{price}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black text-slate-900 leading-tight">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            {location}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            {availability}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-colors">
            Request Space
          </button>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50" />
            <span className="relative z-10 text-[10px] font-black text-slate-400">{ownerName.substring(0,2).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
