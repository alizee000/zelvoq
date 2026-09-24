import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    lines = f.readlines()

count = 0
for i, line in enumerate(lines):
    if '<CarouselWrapper autoScrollInterval={1000}>' in line:
        count += 1
        # Leave the first one (Hidden Gems) alone, but revert the 2nd and 3rd ones
        if count > 1:
            lines[i] = line.replace('<CarouselWrapper autoScrollInterval={1000}>', '<CarouselWrapper>')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.writelines(lines)
