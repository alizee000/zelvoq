"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const tower = formData.get("tower") as string;
  const flat = formData.get("flat") as string;
  const name = formData.get("name") as string; // We'll add this to the UI

  if (!email || !password || !tower || !flat || !name) {
    return { error: "All fields are required" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        tower,
        flat,
        full_name: name,
      }
    }
  });

  if (error) {
    return { error: error.message };
  }

  // After successful signup, we can insert into profiles
  if (data.user) {
    // We insert into profiles here
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        owner_name: name,
        // Wait, the schema uses owner_name. Does it map well? 
        // Our profiles table just has owner_name (PK) and image_url.
      });
      
    if (profileError) {
      console.error("Failed to create profile:", profileError);
    }
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
