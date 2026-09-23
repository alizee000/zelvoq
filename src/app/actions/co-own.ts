"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createCoOwnItem(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a co-own item.");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const total_price = parseInt(formData.get("total_price") as string);
  const max_shares = parseInt(formData.get("max_shares") as string);
  const price_per_share = parseInt(formData.get("price_per_share") as string);
  
  // Fake image handling just like we do for other items
  const image_url = "https://images.unsplash.com/photo-1574887428585-dfa806969562?q=80&w=800&auto=format&fit=crop";

  const { data, error } = await supabase.from("co_own_items").insert({
    title,
    description,
    total_price,
    max_shares,
    price_per_share,
    image_url,
    created_by: user.id,
    funded_shares: 0,
    status: 'funding'
  });

  if (error) {
    console.error("Error inserting co-own item:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/market");
  return { success: true };
}
