import { Sparkles, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { cookies } from "next/headers";
import { getPollsForUser } from "@/lib/data/polls";
import { NotificationsDropdown } from "./notifications-dropdown";
import { TopNavMenu } from "./top-nav-menu";
import { Logo } from "@/components/shared/logo";
import { logout } from "@/app/actions/auth";

export async function TopNav() {
  const supabase = await createClient();
  const { user, ownerName: fullName, tower } = await getUserDetails();
  const avatarUrl = "";
  
  // Fetch real notifications (feed posts from the same tower/apartment, not authored by the user)
  const { data: notifications } = await supabase
    .from("feed_posts")
    .select("*")
    .eq("tower", tower)
    .neq("author_name", fullName)
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order("created_at", { ascending: false })
    .limit(10);

  const { activePolls, completedPolls } = await getPollsForUser(fullName);

  return (
    <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            MyKoodu
          </h1>
        </div>
        <p className="text-[7.5px] font-bold uppercase tracking-widest text-slate-400 ml-10 -mt-1 opacity-80">
          My community. My people. My world.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <NotificationsDropdown initialActive={activePolls} initialCompleted={completedPolls} notifications={notifications || []} />
        

        <Link href="/profile" className="relative group shrink-0">
          <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
            ) : (
              <User className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></div>
        </Link>
        <TopNavMenu />
      </div>
    </header>
  );
}
