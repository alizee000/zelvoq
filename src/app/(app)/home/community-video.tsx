"use client";

import { Play } from "lucide-react";
import Link from "next/link";

export function CommunityVideo() {
  const videoUrl = "https://aqalfjxrzamtkrsxsvpe.supabase.co/storage/v1/object/public/video/gemini_generated_video_822701fb.mp4";

  return (
    <div className="w-full h-20 sm:h-24 bg-slate-900 rounded-[1.5rem] overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] group animate-in fade-in zoom-in-95 duration-700 delay-0 fill-mode-both border border-slate-800">
      
      {/* 
        Attempt to auto-play the video inline.
        If the Gemini Share link doesn't serve raw video bytes directly, 
        this will remain a sleek dark background until clicked.
      */}
      <video 
        src={videoUrl}
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover opacity-100 object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30 pointer-events-none" />
      
      
      

    </div>
  );
}
