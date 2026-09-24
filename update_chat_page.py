import re

with open('src/app/(app)/chat/[id]/page.tsx', 'r') as f:
    content = f.read()

# Add getUserDetails import
if 'getUserDetails' not in content:
    content = content.replace('import { notFound } from "next/navigation";', 'import { notFound } from "next/navigation";\nimport { getUserDetails } from "@/lib/auth-helpers";')

# Fetch current user and messages
old_return = r'return \(\s*<>\s*<ChatClient \s*talentId=\{resolvedParams\.id\}\s*receiverName=\{receiverName\}\s*receiverImage=\{receiverImage\}\s*talentTitle=\{talentTitle\}\s*\/>\s*<\/>\s*\);'

new_return = """
  const { ownerName: currentUserName } = await getUserDetails();

  const { data: rawMessages } = await supabase
    .from("messages")
    .select("*")
    .eq("listing_id", resolvedParams.id)
    .order("created_at", { ascending: true });

  // Only show messages where the current user is either the sender or receiver
  // Or if the current user is the owner of the listing, they can see messages sent to them about this listing
  const relevantMessages = (rawMessages || []).filter(m => m.sender_name === currentUserName || m.receiver_name === currentUserName || receiverName === currentUserName);

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
  );"""

content = re.sub(old_return, new_return, content)

with open('src/app/(app)/chat/[id]/page.tsx', 'w') as f:
    f.write(content)

