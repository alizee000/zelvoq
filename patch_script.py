with open('safe_persist_state.py', 'r') as f:
    c = f.read()
import re
c = re.sub(r'f"onClick=\{\(\) => \{\{.*?\)\n', '    if key == \\\'coown\\\' and "onClick={() => setInvested(true)}" in content:\n        content = content.replace("onClick={() => setInvested(true)}", "onClick={() => { setInvested(true); localStorage.setItem(`coown_${id}`, \\\'true\\\'); }}")\n\n', c)
with open('safe_persist_state.py', 'w') as f:
    f.write(c)
