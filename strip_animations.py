import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Remove all animate-in classes
content = re.sub(r'\s*animate-in fade-in slide-in-from-top-4 duration-700', '', content)
content = re.sub(r'\s*animate-in fade-in zoom-in-95 duration-700 delay-75', '', content)
content = re.sub(r'\s*animate-in fade-in slide-in-from-right-8 duration-700 delay-\[200ms\]', '', content)

# Remove the extra </div> at the end that causes an error if there's no opening div (wait, the file has two closing divs at the end, but one opens at the start `<div className="flex flex-col min-h-screen pb-[90px] bg-white">` and another `<div className="flex flex-col gap-6 px-6 pt-6">`. Yes, two closing divs is correct).

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

