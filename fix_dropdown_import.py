import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')
content = content.replace('  import { useEffect } from "react";\n', '')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)

