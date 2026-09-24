import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getUserDetails } from "@/lib/auth-helpers";
import ChatClient from "./chat-client";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: talent } = await supabase.from("talents").select("*").eq("id", resolvedParams.id).single();
  const { data: groupBuy } = await supabase.from("group_buys").select("*").eq("id", resolvedParams.id).single();
  const { data: borrowItem } = await supabase.from("borrow_items").select("*").eq("id", resolvedParams.id).single();

  if (!talent && !groupBuy && !borrowItem) return notFound();

  let receiverName = "User";
  let talentTitle = "Chat";
  let ownerNameForImage = null;

  if (talent) {
    receiverName = talent.owner_name;
    talentTitle = talent.title;
    ownerNameForImage = talent.owner_name;
  } else if (groupBuy) {
    receiverName = "Group Buy Chat";
    talentTitle = groupBuy.title;
  } else if (borrowItem) {
    receiverName = borrowItem.owner_name;
    talentTitle = borrowItem.title;
    ownerNameForImage = borrowItem.owner_name;
  }

  let receiverImage = null;
  if (ownerNameForImage) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("image_url")
      .eq("owner_name", ownerNameForImage)
      .single();
    receiverImage = profile?.image_url || null;
  }

  
  const { ownerName: currentUserName } = await getUserDetails();

  const { data: rawMessages } = await supabase
    .from("feed_posts")
    .select("*")
    .eq("type", "chat")
    .eq("tower", resolvedParams.id)
    .order("created_at", { ascending: true });

  // Map feed_posts back to message format
  const relevantMessages = (rawMessages || []).map(m => ({
    id: m.id,
    sender_name: m.author_name,
    receiver_name: receiverName,
    text: m.content,
    created_at: m.created_at
  }));

  return (
    <>
      <ChatClient 
        talentId={resolvedParams.id}
        receiverName={receiverName}
        receiverImage={receiverImage}
        talentTitle={talentTitle}
        currentUserName={currentUserName}
        initialMessages={relevantMessages}
      />
    </>
  );
}
