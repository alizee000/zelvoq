"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUserMetadata(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const flat = formData.get("flat") as string;
  const tower = formData.get("tower") as string;
  const society = formData.get("society") as string;

  const client = await clerkClient();
  
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      flat,
      tower,
      society
    }
  });

  revalidatePath("/profile");
  return { success: true };
}
