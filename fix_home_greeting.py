import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add the import
import_statement = 'import { DynamicGreeting } from "./dynamic-greeting";\n'
if import_statement not in content:
    content = content.replace('import { CommunityVideo } from "./community-video";', 
                            'import { CommunityVideo } from "./community-video";\n' + import_statement)

# Replace the hardcoded h1
old_header = '          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">\n            ☀️ Good morning, {firstName}\n          </h1>'
new_header = '          <DynamicGreeting firstName={firstName} />'

content = content.replace(old_header, new_header)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

