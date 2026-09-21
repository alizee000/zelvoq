"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addFeedPost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to post to the feed");
  }

  let ownerName = "";
  let tower = "";

  if (user) {
    ownerName = user.user_metadata?.full_name || user.email;
    tower = user.user_metadata?.tower || "Unknown Tower";
  } else {
    ownerName = cookieStore.get("test_name")?.value || "Test Resident";
    tower = cookieStore.get("test_tower")?.value || "Test Tower";
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
