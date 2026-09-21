"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadProfilePic(formData: FormData) {
  const supabase = await createClient();
  const imageFile = formData.get("image") as File | null;
  const ownerName = "Zeeshan Ali"; // Hardcoded user

  if (!imageFile || imageFile.size === 0) {
    throw new Error("No image provided");
  }

  const fileExt = imageFile.name.split('.').pop();
  const fileName = `profile-${ownerName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;
  
  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, imageFile, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error("Failed to upload image");
  }

  // 2. Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);
    
  const imageUrl = publicUrlData.publicUrl;

  // 3. Upsert into the new profiles table
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert({ 
      owner_name: ownerName, 
      image_url: imageUrl 
    }, { onConflict: "owner_name" });

  if (upsertError) {
    console.error("Failed to update profile:", upsertError);
  }

  // Also update existing talents just in case, to keep the feed in sync
  await supabase
    .from("talents")
    .update({ image_url: imageUrl })
    .eq("owner_name", ownerName);

  revalidatePath("/profile");
  revalidatePath("/discover");
  
  return { success: true, imageUrl };
}
