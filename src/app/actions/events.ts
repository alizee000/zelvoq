"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const dateStr = formData.get("event_date") as string;

  let ownerName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";
  let tower = user?.user_metadata?.tower || cookieStore.get("test_tower")?.value || "Test Tower";

  const { data: event, error } = await supabase.from("events").insert([{
    title,
    description,
    category,
    location,
    event_date: new Date(dateStr).toISOString(),
    owner_name: ownerName,
    tower: tower
  }]).select().single();

  if (error) throw new Error("Failed to create event");

  // Auto-RSVP the creator
  await supabase.from("event_attendees").insert([{
    event_id: event.id,
    user_name: ownerName,
    tower: tower
  }]);

  // Broadcast to feed
  await supabase.from("feed_posts").insert([{
    content: `is hosting a new ${category}: ${title}!`,
    type: "offer",
    author_name: ownerName,
    tower: tower
  }]);

  revalidatePath("/events");
  revalidatePath("/home");
  return { success: true, id: event.id };
}

export async function joinEvent(eventId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let userName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";
  let tower = user?.user_metadata?.tower || cookieStore.get("test_tower")?.value || "Test Tower";

  await supabase.from("event_attendees").insert([{
    event_id: eventId,
    user_name: userName,
    tower: tower
  }]);

  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  return { success: true };
}

export async function sendEventMessage(eventId: string, message: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let userName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";

  await supabase.from("event_messages").insert([{
    event_id: eventId,
    user_name: userName,
    message: message
  }]);

  revalidatePath(`/events/${eventId}`);
  return { success: true };
}

export async function leaveEvent(eventId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const userName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";

  if (!userName) throw new Error("Not logged in");

  const { error } = await supabase
    .from("event_attendees")
    .delete()
    .match({ event_id: eventId, user_name: userName });

  if (error) {
    console.error("Error leaving event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  return { success: true };
}
