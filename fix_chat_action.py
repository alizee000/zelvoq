import re

with open('src/app/actions/chat.ts', 'r') as f:
    content = f.read()

content = content.replace('revalidatePath(`/chat/${listingId}`);', 'revalidatePath("/chat/[id]", "page");')

with open('src/app/actions/chat.ts', 'w') as f:
    f.write(content)

