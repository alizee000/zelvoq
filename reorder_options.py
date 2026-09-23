import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Define regex to extract each block. Each block starts with {/* X Option */} and ends right before the next {/* Y Option */} or </div>
def get_block(option_name):
    # Match from {/* Option Name */} up to either the next {/* ... Option */} or </div>
    pattern = r'({\/\* ' + option_name + r' \*\/\}.*?)(?={\/\* \w+ Option \*\*\/|<\/div>)'
    # Actually simpler: split by {/* 
    pass

# A safer way is to just find the indices of each comment.
options = [
    "Knock-Knock Option",
    "Item Option",
    "Skill Option",
    "Deal Option",
    "Event Option",
    "Space Option",
    "Co-Own Option"
]

blocks = {}

# Split the content around the container div
start_marker = '<div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">'
end_marker = '          </div>\n        </div>\n      </div>\n    );\n  }'

parts = content.split(start_marker)
before = parts[0] + start_marker + '\n'
rest = parts[1]
parts2 = rest.split(end_marker)
inner = parts2[0]
after = end_marker + parts2[1]

# Now we extract blocks from `inner`.
# Each block starts with `            {/* X Option */}`
import sys

# Find all blocks by splitting on `            {/* `
raw_blocks = inner.split('            {/* ')
# raw_blocks[0] will be empty or whitespace

for rb in raw_blocks[1:]:
    # rb looks like `Space Option */}\n            <button ...`
    lines = rb.split(' */}')
    name = lines[0]
    block_content = '            {/* ' + name + ' */}' + lines[1]
    blocks[name] = block_content

# Now reassemble in desired order
new_inner = ""
for opt in options:
    if opt in blocks:
        new_inner += blocks[opt]

new_content = before + new_inner + after

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(new_content)
