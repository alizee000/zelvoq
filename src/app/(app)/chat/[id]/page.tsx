import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
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

  return (
    <>
      <ChatClient 
        talentId={resolvedParams.id}
        receiverName={receiverName}
        receiverImage={receiverImage}
        talentTitle={talentTitle}
      />
    </>
  );
}
