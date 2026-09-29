import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# I need to find the stray `)}` and remove them.
# The easiest way is to restore the file from git and then do a clean regex removal, or just manually fix the specific lines.
