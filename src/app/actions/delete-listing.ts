"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function deleteTalent(id: string) {
  const supabase = await createClient();
  const { user, isTestBypass, ownerName } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to perform this action");
  }

  // Find the talent first to verify ownership
  const { data: talent } = await supabase.from("talents").select("owner_name").eq("id", id).single();
  if (!talent) return { success: false, error: "Not found" };

  // Allow delete if names match or if it's the demo account "Koodu"
  if (talent.owner_name !== ownerName && ownerName !== "Koodu") {
     return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase.from("talents").delete().eq("id", id);
  if (error) throw new Error("Failed to delete");

  revalidatePath("/market");
  revalidatePath("/discover");
  revalidatePath("/profile");
  return { success: true };
}

export async function deleteGroupBuy(id: string) {
  const supabase = await createClient();
  const { user, isTestBypass } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to perform this action");
  }

  const { error } = await supabase.from("group_buys").delete().eq("id", id);
  if (error) throw new Error("Failed to delete");

  revalidatePath("/market");
  return { success: true };
}
