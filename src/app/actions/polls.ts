"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function castVote(pollId: string, vote: 'yes' | 'no') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let userName = "Koodu";
  if (user) {
    userName = user.user_metadata?.full_name || "Resident";
  } else if (cookieStore.has("test_name")) {
    userName = cookieStore.get("test_name")?.value || "Koodu";
  }

  const { error } = await supabase
    .from("poll_votes")
    .insert({
      poll_id: pollId,
      user_name: userName,
      vote: vote
    });

  if (error) {
    if (error.code === '23505') {
      // Duplicate vote - gracefully ignore
      return { success: true };
    }
    console.error("Error casting vote:", error);
    throw new Error("Failed to vote");
  }

  revalidatePath("/home");
  return { success: true };
}
