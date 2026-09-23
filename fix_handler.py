with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import { createEvent } from "@/app/actions/events";',
    'import { createEvent } from "@/app/actions/events";\nimport { createKnockKnock } from "@/app/actions/knock-knocks";'
)

old_handler = """            if (category === "deal") {
              const res = await addGroupBuy(formData);
              if (res.success) router.push("/market");
            } else if (category === "event") {
              const res = await createEvent(formData);
              if (res.success) router.push("/events/" + res.id);
            } else {
              const res = await addTalent(formData);
              if (res.success) router.push(category === "skill" ? "/discover" : category === "space" ? "/market?tab=spaces" : "/market?tab=borrow");
            }"""

new_handler = """            if (category === "deal") {
              const res = await addGroupBuy(formData);
              if (res.success) router.push("/market");
            } else if (category === "event") {
              const res = await createEvent(formData);
              if (res.success) router.push("/events/" + res.id);
            } else if (category === "knock") {
              const res = await createKnockKnock(formData.get("title") as string);
              if (res.success) router.push("/home");
            } else {
              const res = await addTalent(formData);
              if (res.success) router.push(category === "skill" ? "/discover" : category === "space" ? "/market?tab=spaces" : "/market?tab=borrow");
            }"""

content = content.replace(old_handler, new_handler)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
