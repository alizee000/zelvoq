import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Replace Supabase imports with Clerk
content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { currentUser } from "@clerk/nextjs/server";')

# Replace Supabase user check with Clerk
old_auth = r'const supabase = await createClient\(\);\s*const \{ data: \{ user \} \} = await supabase\.auth\.getUser\(\);\s*const cookieStore = await cookies\(\);\s*const isTestBypass = cookieStore\.has\("test_bypass"\);\s*if \(!user && !isTestBypass\) \{\s*redirect\("/"\);\s*\}\s*let ownerName = "";\s*let tower = "";\s*let flat = "";\s*if \(user\) \{\s*ownerName = user\.user_metadata\?\.full_name \|\| user\.email;\s*tower = user\.user_metadata\?\.tower \|\| "Unknown Tower";\s*flat = user\.user_metadata\?\.flat \|\| "Unknown Flat";\s*\} else \{'

new_auth = """const clerkUser = await currentUser();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!clerkUser && !isTestBypass) {
    redirect("/");
  }

  let ownerName = "Guest";
  let tower = "Unknown Tower";
  let flat = "Unknown Flat";

  if (clerkUser) {
    if (clerkUser.firstName) {
        ownerName = `${clerkUser.firstName} ${clerkUser.lastName || ''}`.strip();
    } else if (clerkUser.emailAddresses?.[0]?.emailAddress) {
        ownerName = clerkUser.emailAddresses[0].emailAddress.substring(0, 4);
    }
    
    tower = (clerkUser.publicMetadata?.tower as string) || "DSR Rainbow Heights";
    flat = (clerkUser.publicMetadata?.flat as string) || "Apt 402";
  } else {"""

content = re.sub(old_auth, new_auth, content)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)

