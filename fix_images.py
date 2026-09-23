import re

with open('src/app/(app)/home/community-handshake.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Man%20walking/3D/man_walking_3d.png"',
    'src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Man%20walking%20facing%20right/Default/3D/man_walking_facing_right_3d_default.png"'
)

content = content.replace(
    'src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Woman%20walking/3D/woman_walking_3d.png"',
    'src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Woman%20walking%20facing%20right/Default/3D/woman_walking_facing_right_3d_default.png"'
)

# Replace next/image with standard img tags just in case next.config domains aren't set
content = content.replace(
    '<Image',
    '<img'
)
content = content.replace(
    'fill\n                unoptimized',
    ''
)
# We need to make sure the standard img inherits the size correctly.
# The wrapping div is `w-8 h-8 relative`, we can just say `className="w-full h-full object-contain"`
content = content.replace(
    'className="object-contain"',
    'className="w-full h-full object-contain"'
)
content = content.replace(
    '/>',
    '/>'
)

with open('src/app/(app)/home/community-handshake.tsx', 'w') as f:
    f.write(content)
