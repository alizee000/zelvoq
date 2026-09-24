import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function getUserDetails() {
  const clerkUser = await currentUser();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  let ownerName = "Guest";
  let tower = "Unknown Tower";

  if (clerkUser) {
    if (clerkUser.firstName) {
        ownerName = `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim();
    } else if (clerkUser.emailAddresses?.[0]?.emailAddress) {
        ownerName = clerkUser.emailAddresses[0].emailAddress.substring(0, 4);
    }
    tower = (clerkUser.publicMetadata?.tower as string) || "DSR Rainbow Heights";
  } else if (isTestBypass) {
    ownerName = cookieStore.get("test_name")?.value || "Test Resident";
    tower = cookieStore.get("test_tower")?.value || "Test Tower";
  }

  return { user: clerkUser, isTestBypass, ownerName, tower };
}
