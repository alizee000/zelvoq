import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ChatClient from "./chat-client";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: talent } = await supabase
    .from("talents")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!talent) return notFound();

  // Fetch the owner's profile to get their image
  const { data: profile } = await supabase
    .from("profiles")
    .select("image_url")
    .eq("owner_name", talent.owner_name)
    .single();

  return (
    <>
      <ChatClient 
        talentId={talent.id}
        receiverName={talent.owner_name}
        receiverImage={profile?.image_url || null}
        talentTitle={talent.title}
      />
    </>
  );
}
