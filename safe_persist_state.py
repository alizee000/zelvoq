import re

configs = [
    {
        'file': 'src/components/shared/group-buy-card.tsx',
        'state': 'isJoined',
        'set_state': 'setIsJoined',
        'key': 'deal'
    },
    {
        'file': 'src/components/shared/borrow-card.tsx',
        'state': 'isRequested',
        'set_state': 'setIsRequested',
        'key': 'borrow'
    },
    {
        'file': 'src/components/shared/space-card.tsx',
        'state': 'isRequested',
        'set_state': 'setIsRequested',
        'key': 'space'
    },
    {
        'file': 'src/components/shared/co-own-card.tsx',
        'state': 'invested',
        'set_state': 'setInvested',
        'key': 'coown'
    }
]

for cfg in configs:
    filepath = cfg['file']
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Add useEffect to import if missing
    if 'import { useState, useEffect }' not in content and 'import { useEffect, useState }' not in content:
        content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')

    state_name = cfg['state']
    set_state = cfg['set_state']
    key = cfg['key']

    use_effect_block = f"""
  useEffect(() => {{
    const savedState = localStorage.getItem(`{key}_${{id}}`);
    if (savedState === 'true') {set_state}(true);
    
    const savedChat = localStorage.getItem(`{key}_chat_${{id}}`);
    if (savedChat) {{
      try {{ setChatMessages(JSON.parse(savedChat)); }} catch (e) {{}}
    }}
  }}, [id]);
"""
    if "const handleJoin =" in content:
        content = content.replace("  const handleJoin =", use_effect_block + "  const handleJoin =")
    elif "const handleRequest =" in content:
        content = content.replace("  const handleRequest =", use_effect_block + "  const handleRequest =")
    elif "const progress =" in content and key == 'coown':
        content = content.replace("  const progress =", use_effect_block + "  const progress =")

    if "setIsJoined(true);" in content:
        content = content.replace("setIsJoined(true);", f"setIsJoined(true);\n    localStorage.setItem(`{key}_${{id}}`, 'true');")
    if "setIsRequested(true);" in content:
        content = content.replace("setIsRequested(true);", f"setIsRequested(true);\n    localStorage.setItem(`{key}_${{id}}`, 'true');")

    if key == 'coown' and "onClick={() => setInvested(true)}" in content:
        content = content.replace("onClick={() => setInvested(true)}", "onClick={() => { setInvested(true); localStorage.setItem(`coown_${id}`, 'true'); }}")

    old_send = """  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" }]);
    setMessage("");
  };"""
    
    new_send = f"""  const handleSendMessage = (e: React.FormEvent) => {{
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = {{ id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" }};
    const newMessages = [...chatMessages, newMsg];
    setChatMessages(newMessages);
    localStorage.setItem(`{key}_chat_${{id}}`, JSON.stringify(newMessages));
    setMessage("");
  }};"""
    
    coown_old_send = """  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: "You", text: message, time: "Just now" }]);
    setMessage("");
  };"""

    content = content.replace(old_send, new_send)
    content = content.replace(coown_old_send, new_send)

    if f"{set_state}(false);" in content:
        content = content.replace(f"{set_state}(false);", f"{set_state}(false); localStorage.removeItem(`{key}_${{id}}`); localStorage.removeItem(`{key}_chat_${{id}}`);")

    with open(filepath, 'w') as f:
        f.write(content)

