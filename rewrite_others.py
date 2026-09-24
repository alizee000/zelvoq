import re

def process_file(filepath, chat_id_prefix, link_text):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add Link import
    if 'import Link from' not in content:
        content = content.replace('import { useState, useEffect }', 'import { useState, useEffect } from "react";\nimport Link from "next/link";')

    # Remove states related to chat
    content = re.sub(r'const \[showChat, setShowChat\] = useState\(false\);\n\s*const \[message, setMessage\] = useState\(""\);\n\s*const \[chatMessages, setChatMessages\] = useState\(\[\s*\{.*?\}\s*\]\);', '', content, flags=re.DOTALL)

    # Remove handleSendMessage
    content = re.sub(r'const handleSendMessage =.*?\}\;\n', '', content, flags=re.DOTALL)

    # Remove localstorage chat
    content = re.sub(r'const savedChat = localStorage\.getItem\(`'+chat_id_prefix+r'_chat_\$\{id\}`\);\n\s*if \(savedChat\) \{\n\s*try \{ setChatMessages\(JSON\.parse\(savedChat\)\); \} catch \(e\) \{\}\n\s*\}', '', content, flags=re.DOTALL)
    content = content.replace("localStorage.removeItem(`"+chat_id_prefix+"_chat_${id}`); setShowChat(false);", "")

    # Replace the chat button and Expandable UI with Link
    chat_button_and_ui = r'<button \n\s*onClick=\{\(\) => setShowChat\(!showChat\)\}.*?\{\/\* Expandable Chat UI \*\/\}.*?\}\)\}'
    
    new_link = f"""<Link 
             href={{`/chat/${{id}}`}}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
           >
             <MessageCircle className="w-4 h-4" /> 
             {link_text}
           </Link>"""

    content = re.sub(chat_button_and_ui, new_link, content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)

process_file('src/components/shared/borrow-card.tsx', 'borrow', 'Chat with {ownerName.split(" ")[0]} 🎉')
process_file('src/components/shared/space-card.tsx', 'space', 'Chat with {ownerName.split(" ")[0]} 🎉')

