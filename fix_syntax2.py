import os

files = [
    'src/components/shared/group-buy-card.tsx',
    'src/components/shared/borrow-card.tsx',
    'src/components/shared/space-card.tsx',
    'src/components/shared/co-own-card.tsx'
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()

        # Just fix the specific syntax errors manually
        # Find where newMessages is defined
        import re
        
        # Replace the broken function entirely
        broken_func_pattern = re.compile(r'const handleSendMessage = \(e: React\.FormEvent\) => \{.*?setMessage\(""\);\n  \};', re.DOTALL)
        
        key = "deal"
        if "borrow" in filepath: key = "borrow"
        if "space" in filepath: key = "space"
        if "co-own" in filepath: key = "coown"
        
        new_func = f"""  const handleSendMessage = (e: React.FormEvent) => {{
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = {{ id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" }};
    const newMessages = [...chatMessages, newMsg];
    setChatMessages(newMessages);
    localStorage.setItem(`{key}_chat_${{id}}`, JSON.stringify(newMessages));
    setMessage("");
  }};"""

        content = broken_func_pattern.sub(new_func, content)
        
        with open(filepath, 'w') as f:
            f.write(content)
