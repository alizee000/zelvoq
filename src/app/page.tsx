import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-blue-500/10 to-purple-500/10 blur-[120px]" />
        <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-b from-orange-500/10 to-pink-500/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 z-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">MyInAi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-foreground hover:text-foreground/80">Log in</Link>
            <Link href="/home" className="bg-foreground text-background text-sm font-medium px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-sm">
              Explore Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto mt-20 md:mt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-sm font-medium text-muted-foreground mb-8">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>The AI-Powered Community Network</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-8">
          THERE'S MORE TALENT <br className="hidden md:block" />
          <span className="text-gradient-primary">BEHIND EVERY DOOR.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Discover People. Discover Possibilities.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/home" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
            Explore Your Community
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-card border border-border text-foreground font-medium text-lg hover:bg-muted transition-colors flex items-center justify-center">
            See How It Works
          </Link>
        </div>

        {/* Hero Visual Concept */}
        <div className="mt-24 w-full max-w-4xl relative aspect-video rounded-3xl border border-white/10 bg-black/5 shadow-2xl overflow-hidden glass-card">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            {/* Visual representation of a connected community graph */}
            <div className="relative w-full h-full max-w-2xl mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-[0_0_50px_rgba(var(--primary),0.5)]">You</div>
              </div>
              
              <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-orange-500/20 text-orange-600 flex items-center justify-center text-xs font-bold border border-orange-500/20 backdrop-blur-md">Baker</div>
              <div className="absolute top-1/3 right-1/4 w-14 h-14 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-500/20 backdrop-blur-md">Doctor</div>
              <div className="absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs font-bold border border-green-500/20 backdrop-blur-md">Yoga</div>
              <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-purple-500/20 text-purple-600 flex items-center justify-center text-xs font-bold border border-purple-500/20 backdrop-blur-md">Tutor</div>
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                <line x1="50" y1="50" x2="75" y2="33" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                <line x1="50" y1="50" x2="33" y2="66" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                <line x1="50" y1="50" x2="66" y2="75" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              </svg>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 z-20 text-left">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">The Community Graph</h3>
            <p className="text-muted-foreground">Connecting you with the capabilities around you.</p>
          </div>
        </div>
      </main>
      
      <div className="h-32" />
    </div>
  );
}
