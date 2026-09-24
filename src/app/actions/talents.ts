"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addTalent(formData: FormData) {
  const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a listing");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const isPaid = formData.get("isPaid") === "true";
  const skillsRaw = formData.get("skills") as string;
  
  let skills = [];
  try {
    skills = skillsRaw ? JSON.parse(skillsRaw) : [];
  } catch (e) {}

  const imageFile = formData.get("image") as File | null;
  let imageUrl = null;

  // Handle Image Upload
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${ownerName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw new Error("Failed to upload image");
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
      
    imageUrl = publicUrlData.publicUrl;
  }

  // Check if it already exists
  const { data: existingData } = await supabase
    .from("talents")
    .select("id")
    .eq("title", title)
    .eq("owner_name", ownerName)
    .eq("category", category)
    .limit(1);

  const existing = existingData && existingData.length > 0 ? existingData[0] : null;

  let error;
  
  // Build the payload
  const payload: any = {
    description,
    is_paid: isPaid,
    skills: skills,
  };
  if (imageUrl) payload.image_url = imageUrl;

  if (existing) {
    // Update existing entry
    const { error: updateError } = await supabase
      .from("talents")
      .update(payload)
      .eq("id", existing.id);
    error = updateError;
  } else {
    // Insert new entry
    const { error: insertError } = await supabase
      .from("talents")
      .insert({
        title,
        category,
        owner_name: ownerName,
        tower,
        ...payload
      });
    error = insertError;
  }

  if (error) {
    console.error("Error inserting talent:", error);
    throw new Error((error as any).message);
  }

  // Broadcast to feed only for new entries
  if (!existing) {
    let feedContent = `is offering a new skill: ${title}.`;
    if (category === 'item') feedContent = `listed a new item to the Library: ${title}.`;
    if (category === 'space') feedContent = `listed a new space: ${title}.`;
      
    await supabase.from("feed_posts").insert([{
      content: feedContent,
      type: "offer",
      author_name: ownerName,
      tower: tower
    }]);
  }

  // Revalidate the discover page to show the new data
  revalidatePath("/discover");
  revalidatePath("/market");
  revalidatePath("/home");
  
  return { success: true };
}
