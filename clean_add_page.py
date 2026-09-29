import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Remove the knock submit logic
content = content.replace("""      } else if (category === 'knock') {
        await createKnockKnock(formData.get("title") as string);
        router.push('/home'); // Knocks show on Home page now""", "")

# Remove knock import
content = content.replace('import { createKnockKnock } from "@/app/actions/knock-knocks";\n', "")

# Clean up UI logic
content = content.replace("category === 'knock' ? 'What do you need?' : 'Title'", "'Title'")
content = content.replace('category === \'deal\' ? "e.g., 50kg Alphonso Mangoes" : category === \'knock\' ? "e.g., Can someone lend me a ladder?" : "e.g., Sourdough Baking Masterclass"', 'category === \'deal\' ? "e.g., 50kg Alphonso Mangoes" : "e.g., Sourdough Baking Masterclass"')
content = content.replace("{category !== 'knock' && (", "")
content = content.replace("category !== 'skill' && category !== 'knock'", "category !== 'skill'")

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
