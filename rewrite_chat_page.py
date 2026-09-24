with open('src/app/(app)/chat/[id]/page.tsx', 'w') as f:
    f.write("""import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getUserDetails } from "@/lib/auth-helpers";
import ChatClient from "./chat-client";
import Link from "next/link";
import { ChevronLeft, MessageSquare } from "lucide-react";

export default async function ChatPage(
  props: { params: Promise<{ id: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const resolvedParams = await props.params;
  const searchParams = await props.searchParams;
  const buyerParam = typeof searchParams.buyer === 'string' ? searchParams.buyer : null;
  
  const supabase = await createClient();
  
  const { data: talent } = await supabase.from("talents").select("*").eq("id", resolvedParams.id).single();
  const { data: groupBuy } = await supabase.from("group_buys").select("*").eq("id", resolvedParams.id).single();
  const { data: borrowItem } = await supabase.from("borrow_items").select("*").eq("id", resolvedParams.id).single();

  if (!talent && !groupBuy && !borrowItem) return notFound();

  const isPublicChat = !!groupBuy;

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

  const { ownerName: currentUserName } = await getUserDetails();
  const isOwner = currentUserName === receiverName;

  // Determine the chat room ID (tower)
  let chatRoomId = resolvedParams.id;
  if (!isPublicChat) {
    if (isOwner) {
      if (buyerParam) {
        chatRoomId = `${resolvedParams.id}::${buyerParam}`;
      } else {
        // Render Inbox UI for Owner
        const { data: allThreads } = await supabase
          .from("feed_posts")
          .select("tower, author_name")
          .eq("type", "chat")
          .like("tower", `${resolvedParams.id}::%`);
          
        const uniqueBuyers = Array.from(new Set(
          (allThreads || [])
            .map(t => t.tower.split('::')[1])
            .filter(name => name && name !== currentUserName)
        ));

        return (
          <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/home" className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Messages</h1>
                <p className="text-sm font-medium text-slate-500">For "{talentTitle}"</p>
              </div>
            </div>

            {uniqueBuyers.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No messages yet</h3>
                <p className="text-sm text-slate-500">When neighbors message you about this listing, their conversations will appear here.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {uniqueBuyers.map(buyer => (
                  <Link key={buyer} href={`/chat/${resolvedParams.id}?buyer=${buyer}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                          {buyer.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{buyer}</h3>
                          <p className="text-sm text-slate-500 font-medium group-hover:text-indigo-600 transition-colors">View conversation &rarr;</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }
    } else {
      // Buyer chatting with Owner
      chatRoomId = `${resolvedParams.id}::${currentUserName}`;
    }
  }

  let receiverImage = null;
  let queryName = ownerNameForImage;
  
  if (!isPublicChat && isOwner && buyerParam) {
     // If owner is looking at buyer chat, the 'receiver' for this specific view is the buyer
     queryName = buyerParam;
  }

  if (queryName) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("image_url")
      .eq("owner_name", queryName)
      .single();
    receiverImage = profile?.image_url || null;
  }

  const { data: rawMessages } = await supabase
    .from("feed_posts")
    .select("*")
    .eq("type", "chat")
    .eq("tower", chatRoomId)
    .order("created_at", { ascending: true });

  const relevantMessages = (rawMessages || []).map(m => ({
    id: m.id,
    sender_name: m.author_name,
    receiver_name: !isPublicChat && isOwner && buyerParam ? buyerParam : receiverName,
    text: m.content,
    created_at: m.created_at
  }));

  return (
    <>
      <ChatClient 
        talentId={resolvedParams.id}
        chatRoomId={chatRoomId}
        receiverName={!isPublicChat && isOwner && buyerParam ? buyerParam : receiverName}
        receiverImage={receiverImage}
        talentTitle={talentTitle}
        currentUserName={currentUserName}
        initialMessages={relevantMessages}
      />
    </>
  );
}
""")
