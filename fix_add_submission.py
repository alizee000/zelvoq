import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import { addTalent } from "@/app/actions/talents";
import { addGroupBuy } from "@/app/actions/group-buys";
import { createEvent } from "@/app/actions/events";
import { createKnockKnock } from "@/app/actions/knock-knocks";
import { createCoOwnItem } from "@/app/actions/co-own";"""

if 'import { addTalent }' not in content:
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\n' + imports)

# Update handleSubmit
old_submit = """    // Simulate API Call
    await new Promise(r => setTimeout(r, 1200));
    
    // Route based on category
    if (category === 'deal') router.push('/home');
    else if (category === 'event') router.push('/events');
    else if (category === 'knock') router.push('/knocks');
    else router.push('/home');"""

new_submit = """    try {
      if (category === 'deal') {
        await addGroupBuy(formData);
        router.push('/home');
      } else if (category === 'event') {
        await createEvent(formData);
        router.push('/events');
      } else if (category === 'knock') {
        await createKnockKnock(formData.get("title") as string);
        router.push('/home'); // Knocks show on Home page now
      } else if (category === 'coown') {
        await createCoOwnItem(formData);
        router.push('/home');
      } else {
        // skill, item, space map to talents
        // we need to inject category manually if it's missing from form
        formData.set("category", category as string);
        formData.set("tags", finalTags);
        formData.set("is_paid", data.is_paid === 'on' ? "true" : "false");
        await addTalent(formData);
        router.push('/home');
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create listing.");
    }"""

content = content.replace(old_submit, new_submit)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
