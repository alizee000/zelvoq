import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AuthClientPage from "./auth-client";

export default async function AuthPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return <AuthClientPage />;
}
