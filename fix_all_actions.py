import os
import glob

def fix_events():
    path = 'src/app/actions/events.ts'
    with open(path, 'r') as f:
        content = f.read()
    content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')
    old_block = """  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const dateStr = formData.get("event_date") as string;

  let ownerName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";
  let tower = user?.user_metadata?.tower || cookieStore.get("test_tower")?.value || "Test Tower";"""

    new_block = """  const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const dateStr = formData.get("event_date") as string;"""
    content = content.replace(old_block, new_block)
    with open(path, 'w') as f:
        f.write(content)

def fix_coown():
    path = 'src/app/actions/co-own.ts'
    with open(path, 'r') as f:
        content = f.read()
    if 'getUserDetails' not in content:
        content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')
        old_block = """  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a co-own item");
  }

  let ownerName = "";
  let tower = "";

  if (user) {
    ownerName = user.user_metadata?.full_name || user.email;
    tower = user.user_metadata?.tower || "Unknown Tower";
  } else {
    ownerName = cookieStore.get("test_name")?.value || "Test Resident";
    tower = cookieStore.get("test_tower")?.value || "Test Tower";
  }"""
        new_block = """  const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a co-own item");
  }"""
        content = content.replace(old_block, new_block)
        with open(path, 'w') as f:
            f.write(content)

def fix_knock():
    path = 'src/app/actions/knock-knocks.ts'
    with open(path, 'r') as f:
        content = f.read()
    if 'getUserDetails' not in content:
        content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')
        old_block = """  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();

  let ownerName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";
  let tower = user?.user_metadata?.tower || cookieStore.get("test_tower")?.value || "Test Tower";"""
        new_block = """  const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();"""
        content = content.replace(old_block, new_block)
        with open(path, 'w') as f:
            f.write(content)

def fix_group():
    path = 'src/app/actions/group-buys.ts'
    with open(path, 'r') as f:
        content = f.read()
    if 'getUserDetails' not in content:
        content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')
        old_block = """  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a group buy");
  }"""
        new_block = """  const supabase = await createClient();
  const { user, isTestBypass, ownerName, tower } = await getUserDetails();

  if (!user && !isTestBypass) {
    throw new Error("You must be logged in to add a group buy");
  }"""
        content = content.replace(old_block, new_block)
        
        # Replace the manual user values at the bottom
        old_insert = """      owner_name: user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident",
      tower: user?.user_metadata?.tower || cookieStore.get("test_tower")?.value || "Test Tower","""
        new_insert = """      owner_name: ownerName,
      tower: tower,"""
        content = content.replace(old_insert, new_insert)
        with open(path, 'w') as f:
            f.write(content)

def fix_polls():
    path = 'src/app/actions/polls.ts'
    with open(path, 'r') as f:
        content = f.read()
    if 'getUserDetails' not in content:
        content = content.replace('import { createClient } from "@/lib/supabase/server";', 'import { createClient } from "@/lib/supabase/server";\nimport { getUserDetails } from "@/lib/auth-helpers";')
        old_block = """  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let voterName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";"""
        new_block = """  const supabase = await createClient();
  const { user, isTestBypass, ownerName: voterName } = await getUserDetails();"""
        content = content.replace(old_block, new_block)
        with open(path, 'w') as f:
            f.write(content)

fix_events()
fix_coown()
fix_knock()
fix_group()
fix_polls()

