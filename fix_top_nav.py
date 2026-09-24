import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

# Replace auth imports
content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')

# Replace the auth block
old_auth = r'const supabase = await createClient\(\);\s*const \{ data: \{ user \} \} = await supabase\.auth\.getUser\(\);\s*const cookieStore = await cookies\(\);\s*const avatarUrl = user\?\.user_metadata\?\.avatar_url \|\| "";\s*let fullName = "Koodu";\s*if \(user\) \{\s*fullName = user\.user_metadata\?\.full_name \|\| "Resident";\s*\} else if \(cookieStore\.has\("test_name"\)\) \{\s*fullName = cookieStore\.get\("test_name"\)\?\.value \|\| "Koodu";\s*\}'

new_auth = """const supabase = await createClient();
  const { user, ownerName: fullName, tower } = await getUserDetails();
  const avatarUrl = "";
  
  // Fetch real notifications (feed posts from the same tower/apartment, not authored by the user)
  const { data: notifications } = await supabase
    .from("feed_posts")
    .select("*")
    .eq("tower", tower)
    .neq("author_name", fullName)
    .order("created_at", { ascending: false })
    .limit(10);"""

content = re.sub(old_auth, new_auth, content)

# Pass notifications down
content = content.replace('<NotificationsDropdown initialActive={activePolls} initialCompleted={completedPolls} />', '<NotificationsDropdown initialActive={activePolls} initialCompleted={completedPolls} notifications={notifications || []} />')

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
