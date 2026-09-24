import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Add society to the extracted metadata
old_let_flat = r'let flat = "Unknown Flat";'
new_let_flat = 'let flat = "Unknown Flat";\n  let society = "DSR Rainbow Heights";'
content = re.sub(old_let_flat, new_let_flat, content)

old_flat_val = r'flat = \(clerkUser\.publicMetadata\?\.flat as string\) \|\| "Apt 134";'
new_flat_val = 'flat = (clerkUser.publicMetadata?.flat as string) || "Apt 134";\n    society = (clerkUser.publicMetadata?.society as string) || "DSR Rainbow Heights";'
content = re.sub(old_flat_val, new_flat_val, content)

old_test_flat_val = r'flat = cookieStore\.get\("test_flat"\)\?\.value \|\| "101";'
new_test_flat_val = 'flat = cookieStore.get("test_flat")?.value || "101";\n    society = cookieStore.get("test_society")?.value || "Test Society";'
content = re.sub(old_test_flat_val, new_test_flat_val, content)

# Update the display string
old_display = r'<p className="text-slate-500 font-medium text-\[13px\] mt-1 tracking-wide uppercase">Flat \{flat\} · \{tower\}<\/p>'
new_display = '<p className="text-slate-500 font-medium text-[11px] mt-1 tracking-wide uppercase">Flat {flat} · {tower}<br/>{society}</p>'
content = re.sub(old_display, new_display, content)

# Pass society to the modal
old_modal = r'<EditProfileModal currentFlat=\{flat\} currentTower=\{tower\} currentSociety="DSR Rainbow Heights" \/>'
new_modal = '<EditProfileModal currentFlat={flat} currentTower={tower} currentSociety={society} />'
content = re.sub(old_modal, new_modal, content)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)
