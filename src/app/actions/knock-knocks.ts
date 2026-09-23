"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createKnockKnock(title: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let creatorName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";
  let tower = user?.user_metadata?.tower || cookieStore.get("test_tower")?.value || "Test Tower";

  const { error } = await supabase.from("knock_knocks").insert([{
    title,
    creator_name: creatorName,
    tower: tower,
    status: 'active'
  }]);

  if (error) throw new Error("Failed to create Knock-Knock");

  revalidatePath("/home");
  return { success: true };
}

export async function resolveKnockKnock(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let resolvedBy = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";

  const { error } = await supabase.from("knock_knocks")
    .update({ status: 'resolved', resolved_by: resolvedBy })
    .eq('id', id);

  if (error) throw new Error("Failed to resolve Knock-Knock");

  revalidatePath("/home");
  revalidatePath("/profile");
  return { success: true };
}
