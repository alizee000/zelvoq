import re

with open('src/app/actions/talents.ts', 'r') as f:
    content = f.read()

# Add import
content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')

# Replace the giant auth block
old_auth = r'const supabase = await createClient\(\);\s*const \{ data: \{ user \} \} = await supabase\.auth\.getUser\(\);\s*const cookieStore = await cookies\(\);\s*const isTestBypass = cookieStore\.has\("test_bypass"\);\s*if \(!user && !isTestBypass\) \{\s*throw new Error\("You must be logged in to add a listing"\);\s*\}\s*let ownerName = "";\s*let tower = "";\s*if \(user\) \{\s*ownerName = user\.user_metadata\?\.full_name \|\| user\.email;\s*tower = user\.user_metadata\?\.tower \|\| "Unknown Tower";\s*\} else \{\s*ownerName = cookieStore\.get\("test_name"\)\?\.value \|\| "Test Resident";\s*tower = cookieStore\.get\("test_tower"\)\?\.value \|\| "Test Tower";\s*\}'

new_auth = """const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a listing");
  }"""

content = re.sub(old_auth, new_auth, content)

with open('src/app/actions/talents.ts', 'w') as f:
    f.write(content)

