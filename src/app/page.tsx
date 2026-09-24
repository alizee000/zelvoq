import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthClientPage from "./auth-client";

export default async function AuthPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/home");
  }

  return <AuthClientPage />;
}
