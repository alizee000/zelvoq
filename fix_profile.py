import re

with open('src/app/actions/profile.ts', 'r') as f:
    content = f.read()

content = content.replace('const ownerName = user ? (ownerName) : (cookieStore.get("test_name")?.value || "Test Resident");', '')

with open('src/app/actions/profile.ts', 'w') as f:
    f.write(content)
