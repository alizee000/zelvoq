"use client";

export function CommunityVideo() {
  const videoUrl = "https://aqalfjxrzamtkrsxsvpe.supabase.co/storage/v1/object/public/video/gemini_generated_video_150cafde.mp4";

  return (
    <section className="animate-in fade-in zoom-in-95 duration-700 delay-75">
      {/* 
        Ultra-wide banner aspect ratio (3:1 or 4:1) to keep the height very minimal 
        and remove all audio controls so it acts purely as a sleek moving banner.
      */}
      <div className="w-full aspect-[3.5/1] sm:aspect-[4/1] bg-slate-100 rounded-[1.5rem] overflow-hidden relative shadow-sm border border-slate-100 group">
        
        <video 
          src={videoUrl}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />

      </div>
    </section>
  );
}
