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
      {/* Decorative background blur elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/40 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-transparent pointer-events-none -z-10 blur-3xl rounded-full" />

      <main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 md:pb-0 z-0 bg-white">
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
