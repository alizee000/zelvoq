import re

with open('src/app/actions/events.ts', 'r') as f:
    content = f.read()

if 'import { redirect } from "next/navigation";' not in content:
    content = content.replace('import { cookies } from "next/headers";', 'import { cookies } from "next/headers";\nimport { redirect } from "next/navigation";')

# Add redirect to joinEvent
join_logic = '''  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  return { success: true };
}'''
join_logic_new = '''  revalidatePath("/events");
  redirect(`/chat/${eventId}`);
}'''
content = content.replace(join_logic, join_logic_new)

with open('src/app/actions/events.ts', 'w') as f:
    f.write(content)


with open('src/app/(app)/events/[id]/page.tsx', 'r') as f:
    page_content = f.read()

# Replace the chat area with a simple "Enter Event Chat" button if joined
old_chat_area = '''      {/* Chat Area */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">'''

# I will just replace the entire bottom half starting from {/* Chat Area */}
import re
page_content = re.sub(r'\{/\* Chat Area \*/\}.*', '''{/* Realtime Chat Button */}
      {hasJoined && (
        <div className="px-6 mt-6">
          <Link href={`/chat/${eventId}`} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Enter Event Chat
          </Link>
        </div>
      )}
    </div>
  );
}''', page_content, flags=re.DOTALL)

with open('src/app/(app)/events/[id]/page.tsx', 'w') as f:
    f.write(page_content)
