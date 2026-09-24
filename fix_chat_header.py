import re

with open('src/app/(app)/chat/[id]/page.tsx', 'r') as f:
    content = f.read()

# Change the hardcoded 'Group Buy Chat' to something more descriptive
content = content.replace('receiverName = "Group Buy Chat";', 'receiverName = "Group Discussion";')

with open('src/app/(app)/chat/[id]/page.tsx', 'w') as f:
    f.write(content)


with open('src/app/(app)/chat/[id]/chat-client.tsx', 'r') as f:
    content = f.read()

# Make the Group Buy header display the actual deal title prominently
old_header = r'<h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">\s*\{currentUserName === receiverName \? talentTitle \: receiverName\}\s*</h2>\s*<p className="text-\[10px\] font-bold text-indigo-600 uppercase tracking-widest">\s*\{currentUserName === receiverName \? "Listing Chat" \: talentTitle\}\s*</p>'

new_header = """<h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                {receiverName === "Group Discussion" ? talentTitle : currentUserName === receiverName ? talentTitle : receiverName}
              </h2>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                {receiverName === "Group Discussion" ? "Community Chat" : currentUserName === receiverName ? "Listing Chat" : talentTitle}
              </p>"""

content = re.sub(old_header, new_header, content)

# Also fix the avatar fallback letter for group buys
content = content.replace('{receiverName.charAt(0)}', '{receiverName === "Group Discussion" ? "👥" : receiverName.charAt(0)}')

with open('src/app/(app)/chat/[id]/chat-client.tsx', 'w') as f:
    f.write(content)

