"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addFeedPost(formData: FormData) {
  const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to perform this action");
  }

  const content = formData.get("content") as string;
  const type = formData.get("type") as string || "request";

  const { error } = await supabase.from("feed_posts").insert([
    {
      content,
      type,
      author_name: ownerName,
      tower: tower,
    }
  ]);

  if (error) {
    console.error("Error creating feed post:", error);
    throw new Error("Failed to create feed post");
  }

  revalidatePath("/home");
  return { success: true };
}
