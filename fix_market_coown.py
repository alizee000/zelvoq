with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Add currentUserName to CoOwnCard if missing
if 'currentUserName={currentUserName}' not in content.split('<CoOwnCard')[1].split('/>')[0]:
    content = content.replace('status={item.status}\n                />', 'status={item.status}\n                  currentUserName={currentUserName}\n                />')

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
