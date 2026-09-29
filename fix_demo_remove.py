import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# I messed up the regex. I will just rewrite the component start to fix it.
correct_start = """  // 1. Group knocks by user
  const groupedKnocks = knocks.reduce((acc: any, knock: any) => {
    if (!acc[knock.owner_name]) {
      acc[knock.owner_name] = {
        owner_name: knock.owner_name,
        image_url: knock.image_url,
        tower: knock.tower,
        knocks: []
      };
    }
    acc[knock.owner_name].knocks.push(knock);
    return acc;
  }, {});

  let usersList = Object.values(groupedKnocks);"""

# Replace from "const groupedKnocks" up to "const handleResolve"
import re
pattern = re.compile(r'const groupedKnocks = knocks\.reduce\([\s\S]*?let usersList = Object\.values\(groupedKnocks\);[\s\S]*?(?=const handleResolve = async \(\) => \{)')
match = pattern.search(content)

if match:
    content = content[:match.start()] + correct_start + "\n\n  " + content[match.end():]
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully fixed syntax.")
else:
    print("Could not find pattern.")
