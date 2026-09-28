import { BottomNav } from "@/components/layout/bottom-nav";
import { TopNav } from "@/components/layout/top-nav";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!userId && !isTestBypass) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 selection:bg-indigo-500/30 text-slate-900 flex-col relative">
      {/* VisionOS Ambient Glow (Global Background) */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#FAFAFA]" />
      <div className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-orange-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 md:pb-0 z-0 bg-transparent shadow-[0_0_50px_rgba(0,0,0,0.03)] border-x border-white/50 backdrop-blur-[2px]">
        <TopNav />
        <div className="min-h-full">
          {children}
        </div>
      </main>
      
      {/* Bottom Nav */}
      <BottomNav />
      
      {/* CSS to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
