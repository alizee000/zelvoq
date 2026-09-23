"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";

export function CommunityVideo() {
  const videoUrl = "https://aqalfjxrzamtkrsxsvpe.supabase.co/storage/v1/object/public/video/gemini_generated_video_822701fb.mp4";
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="animate-in fade-in zoom-in-95 duration-700 delay-75">
      <div className="w-full aspect-video bg-slate-100 rounded-[2rem] overflow-hidden relative shadow-sm border border-slate-100 group">
        
        <video 
          ref={videoRef}
          src={videoUrl}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
          <button 
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </section>
  );
}
