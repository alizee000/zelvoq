"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function createKnockKnock(title: string) {
  const supabase = await createClient();
  const { ownerName: creatorName, tower } = await getUserDetails();

  const { error } = await supabase.from("knock_knocks").insert([{
    title,
    creator_name: creatorName,
    tower: tower,
    status: 'active'
  }]);

  if (error) throw new Error("Failed to create Knock-Knock");

  // Also broadcast to feed
  await supabase.from("feed_posts").insert([{
    content: `needs help: ${title}`,
    type: "knock",
    author_name: creatorName,
    tower: tower
  }]);

  revalidatePath("/knock-knocks");
  revalidatePath("/home");
  return { success: true };
}

export async function resolveKnockKnock(id: string) {
  const supabase = await createClient();
  const { ownerName: resolvedBy } = await getUserDetails();

  const { error } = await supabase.from("knock_knocks")
    .update({ status: 'resolved', resolved_by: resolvedBy })
    .eq('id', id);

  if (error) throw new Error("Failed to resolve Knock-Knock");

  revalidatePath("/knock-knocks");
  revalidatePath("/home");
  revalidatePath("/profile");
  return { success: true };
}
