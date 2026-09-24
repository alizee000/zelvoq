import re

with open('src/app/(app)/chat/[id]/chat-client.tsx', 'r') as f:
    content = f.read()

# Update props
old_props = r'export default function ChatClient\(\{\s*talentId,\s*receiverName,\s*receiverImage,\s*talentTitle,\s*currentUserName,\s*initialMessages,\s*\}\: \{'
new_props = r"""export default function ChatClient({
  talentId,
  chatRoomId,
  receiverName,
  receiverImage,
  talentTitle,
  currentUserName,
  initialMessages,
}: {"""
content = re.sub(old_props, new_props, content)

# Update types
old_types = r'talentId\: string;\s*receiverName\: string;'
new_types = r"""talentId: string;
  chatRoomId?: string;
  receiverName: string;"""
content = re.sub(old_types, new_types, content)

# Update handleSend to use chatRoomId || talentId
old_send = r'await sendMessage\(talentId, targetReceiver, textToSend\);'
new_send = r'await sendMessage(chatRoomId || talentId, targetReceiver, textToSend);'
content = re.sub(old_send, new_send, content)

with open('src/app/(app)/chat/[id]/chat-client.tsx', 'w') as f:
    f.write(content)

