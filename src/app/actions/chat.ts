"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function sendMessage(listingId: string, receiverName: string, text: string) {
  const supabase = await createClient();
  const { user, isTestBypass, ownerName } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to send a message");
  }

  // Overloading feed_posts to act as a messages table
  const { error } = await supabase.from("feed_posts").insert([{
    type: "chat",
    content: text,
    author_name: ownerName,
    tower: listingId // Store listing ID in the tower column
  }]);

  if (error) {
    console.error("Failed to send message:", error);
    throw new Error("Failed to send message");
  }

  revalidatePath(`/chat/${listingId}`);
  return { success: true };
}
