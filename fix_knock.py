import re

with open('src/app/actions/knock-knocks.ts', 'r') as f:
    content = f.read()

# Modify resolveKnockKnock to fetch the creator's name and insert a direct notification
old_resolve = r'export async function resolveKnockKnock\(id: string\) \{.*?return \{ success: true \};\s*\}'
new_resolve = """export async function resolveKnockKnock(id: string) {
  const supabase = await createClient();
  const { ownerName: resolvedBy } = await getUserDetails();

  // First fetch the knock to get the creator's name
  const { data: knock } = await supabase.from("knock_knocks").select("creator_name, title").eq("id", id).single();

  const { error } = await supabase.from("knock_knocks")
    .update({ status: 'resolved', resolved_by: resolvedBy })
    .eq('id', id);

  if (error) throw new Error("Failed to resolve Knock-Knock");

  // Send a direct notification to the creator
  if (knock) {
    await supabase.from("feed_posts").insert([{
      content: `I can help with: ${knock.title}`,
      type: "knock_resolved",
      author_name: resolvedBy,
      tower: knock.creator_name // Overload tower to target the specific user
    }]);
  }

  revalidatePath("/knock-knocks");
  revalidatePath("/home");
  revalidatePath("/profile");
  return { success: true };
}"""
content = re.sub(old_resolve, new_resolve, content, flags=re.DOTALL)

with open('src/app/actions/knock-knocks.ts', 'w') as f:
    f.write(content)

