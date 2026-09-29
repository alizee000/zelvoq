import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthClientPage from "./auth-client";
import { cookies } from "next/headers";

export default async function AuthPage() {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (userId || isTestBypass) {
    redirect("/home");
  }

  return <AuthClientPage />;
}
