with open('src/app/actions/events.ts', 'r') as f:
    content = f.read()

leave_action = """
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
"""

if 'leaveEvent' not in content:
    with open('src/app/actions/events.ts', 'a') as f:
        f.write(leave_action)
