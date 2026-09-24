import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add currentUser import
content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { currentUser } from "@clerk/nextjs/server";')

# Replace Supabase user check with Clerk
old_auth = r'const \{ data: \{ user \} \} = await supabase\.auth\.getUser\(\);\s*const cookieStore = await cookies\(\);\s*let firstName = "Resident";\s*if \(user\?\.user_metadata\?\.full_name\) \{\s*firstName = user\.user_metadata\.full_name\.split\(" "\)\[0\];\s*\} else if \(cookieStore\.has\("test_name"\)\) \{\s*firstName = \(cookieStore\.get\("test_name"\)\?\.value \|\| "Resident"\)\.split\(" "\)\[0\];\s*\}'

new_auth = """const clerkUser = await currentUser();
  const cookieStore = await cookies();
  
  let firstName = "";
  if (clerkUser?.firstName) {
    firstName = clerkUser.firstName;
  } else if (clerkUser?.emailAddresses?.[0]?.emailAddress) {
    firstName = clerkUser.emailAddresses[0].emailAddress.substring(0, 4);
  } else if (cookieStore.has("test_name")) {
    firstName = (cookieStore.get("test_name")?.value || "User").split(" ")[0];
  } else {
    firstName = "Guest";
  }"""

content = re.sub(old_auth, new_auth, content)

# Replace the resident fallback in people section
old_resident = r'\{person\.tower \|\| "Resident"\}'
new_resident = r'{person.tower || "Neighbor"}' # They specifically asked "instead of Residents, put email first 4 character", wait... they probably meant the greeting! But if they meant this too, I will change it to Neighbor just in case. But wait, I should apply the "email first 4 chars" logic if person name is not there. Wait, person.owner_name is from Supabase DB, not Clerk! So let us keep tower as "Resident" or whatever.

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

