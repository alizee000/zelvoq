import re

with open('src/app/(app)/layout.tsx', 'r') as f:
    content = f.read()

# Replace Supabase imports with Clerk
content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { auth } from "@clerk/nextjs/server";')

# Replace Supabase user check with Clerk userId check
old_auth = r'const supabase = await createClient\(\);\n\s*const \{ data: \{ user \} \} = await supabase\.auth\.getUser\(\);'
new_auth = 'const { userId } = await auth();'
content = re.sub(old_auth, new_auth, content)

content = content.replace('if (!user && !isTestBypass)', 'if (!userId && !isTestBypass)')

with open('src/app/(app)/layout.tsx', 'w') as f:
    f.write(content)

