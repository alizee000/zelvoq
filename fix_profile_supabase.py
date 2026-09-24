import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace('import { currentUser } from "@clerk/nextjs/server";', 'import { currentUser } from "@clerk/nextjs/server";\nimport { createClient } from "@/lib/supabase/server";')

# Initialize supabase
old_init = r'const clerkUser = await currentUser\(\);'
new_init = 'const clerkUser = await currentUser();\n  const supabase = await createClient();'
content = re.sub(old_init, new_init, content)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)

