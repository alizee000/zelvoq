import re

with open('src/components/shared/group-buy-card.tsx', 'r') as f:
    content = f.read()

# Remove the entire Expandable Chat UI block
pattern = r'\{\/\* Expandable Chat UI \*\/\}.*?\}\s*\{\s*isJoined && \('
replacement = r'{isJoined && ('

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Remove the `handleSendMessage` if it exists
content = re.sub(r'const handleSendMessage =.*?\}\;', '', content, flags=re.DOTALL)

# Remove `setShowChat(false)` from the `Leave Group Buy` button
content = content.replace('setShowChat(false);', '')
content = content.replace("localStorage.removeItem(`deal_chat_${id}`);", '')

with open('src/components/shared/group-buy-card.tsx', 'w') as f:
    f.write(content)

