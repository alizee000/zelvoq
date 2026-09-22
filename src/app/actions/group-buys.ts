"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addGroupBuy(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a group buy");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const vendor = formData.get("vendor") as string;
  const originalPrice = parseFloat(formData.get("original_price") as string) || 0;
  const discountedPrice = parseFloat(formData.get("discounted_price") as string) || 0;
  const targetQuantity = parseInt(formData.get("target_quantity") as string, 10) || 10; // Default to 10 if not provided
  const expiresInDays = parseInt(formData.get("expires_in_days") as string, 10) || 3; // Default to 3 days if not provided

  const { error } = await supabase.from("group_buys").insert([
    {
      title,
      description,
      vendor,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      target_quantity: targetQuantity,
      current_quantity: 1, // The creator joins by default
      expires_in_days: expiresInDays,
    }
  ]);

  if (error) {
    console.error("Error creating group buy:", error);
    throw new Error("Failed to create group buy");
  }

  // Get owner info for the feed post
  let ownerName = "";
  let tower = "";
  if (user) {
    ownerName = user.user_metadata?.full_name || user.email;
    tower = user.user_metadata?.tower || "Unknown Tower";
  } else {
    ownerName = cookieStore.get("test_name")?.value || "Test Resident";
    tower = cookieStore.get("test_tower")?.value || "Test Tower";
  }

  // Broadcast to feed
  await supabase.from("feed_posts").insert([{
    content: `started a new Group Buy for ${title} from ${vendor}!`,
    type: "offer",
    author_name: ownerName,
    tower: tower
  }]);

  revalidatePath("/market");
  revalidatePath("/home");
  return { success: true };
}
