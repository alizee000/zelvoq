"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function castVote(pollId: string, vote: 'yes' | 'no') {
  const supabase = await createClient();
  const { ownerName: userName } = await getUserDetails();

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
