import { Hexagon, User, LogOut } from "lucide-react";
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
    .or(`tower.eq."${tower}",tower.eq."${fullName}"`)
    .neq("author_name", fullName)
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order("created_at", { ascending: false })
    .limit(10);

  const { activePolls, completedPolls } = await getPollsForUser(fullName);

  return (
    <header className="sticky top-0 z-40 pl-6 pr-2 py-4 flex items-center justify-between bg-white/90 backdrop-blur-3xl border-b border-slate-100/50">
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-slate-900 flex items-center justify-center shadow-sm shrink-0">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-[20px] font-black tracking-tight text-slate-900 leading-none">
            MyKoodu
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5">
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
