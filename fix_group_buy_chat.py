import re

with open('src/components/shared/group-buy-card.tsx', 'r') as f:
    content = f.read()

# Replace the button with a Link
old_button_section = r'<button \s*onClick=\{\(\) => setShowChat\(!showChat\)\}\s*className=\{`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 \$\{\s*showChat \s*\? \'bg-slate-100 text-slate-600\' \s*\: \'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100\'\s*\}\`\}\s*>\s*<MessageCircle className="w-4 h-4" /> \s*\{showChat \? \'Close Chat\' : \'Enter Deal Chat 🎉\'\}\s*</button>\s*\)\}'

new_button_section = """<Link 
             href={`/chat/${id}`}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
           >
             <MessageCircle className="w-4 h-4" /> 
             Enter Deal Chat 🎉
           </Link>
        )}"""

content = re.sub(old_button_section, new_button_section, content)

# Remove the expandable chat UI
expandable_ui = r'\{\/\* Expandable Chat UI \*\/\}.*?</div>\s*</div>\s*\)\}'
content = re.sub(expandable_ui, '', content, flags=re.DOTALL)

# Remove showChat, message, and chatMessages states
content = re.sub(r'const \[showChat, setShowChat\] = useState\(false\);', '', content)
content = re.sub(r'const \[message, setMessage\] = useState\(""\);', '', content)
content = re.sub(r'const \[chatMessages, setChatMessages\] = useState\(\[.*?\]\);', '', content, flags=re.DOTALL)

# Import Link if not already present
if 'import Link' not in content:
    content = content.replace('import { ActionModal }', 'import Link from "next/link";\nimport { ActionModal }')

with open('src/components/shared/group-buy-card.tsx', 'w') as f:
    f.write(content)

