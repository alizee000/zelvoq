import re

files = {
    'group-buy-card.tsx': {
        'state_name': 'isJoined',
        'set_state': 'setIsJoined',
        'key_prefix': 'deal'
    },
    'borrow-card.tsx': {
        'state_name': 'isRequested',
        'set_state': 'setIsRequested',
        'key_prefix': 'borrow'
    },
    'space-card.tsx': {
        'state_name': 'isRequested',
        'set_state': 'setIsRequested',
        'key_prefix': 'space'
    },
    'co-own-card.tsx': {
        'state_name': 'invested',
        'set_state': 'setInvested',
        'key_prefix': 'coown'
    }
}

for filename, config in files.items():
    filepath = f"src/components/shared/{filename}"
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        # Add useEffect to imports if missing
        if 'useEffect' not in content:
            content = content.replace('useState', 'useState, useEffect')
            
        state_name = config['state_name']
        set_state = config['set_state']
        key = config['key_prefix']
        
        # Inject useEffect for state hydration
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
        # Insert after the chatMessages useState
        if 'setChatMessages([' in content:
            # find end of the useState
            parts = content.split(']);\n')
            if len(parts) > 1:
                content = parts[0] + ']);\n' + use_effect_block + parts[1]

        # Update set state calls to also set localStorage
        # Find handleJoin or handleRequest
        content = content.replace(f'{set_state}(true);', f'{set_state}(true);\n    localStorage.setItem(`{key}_${{id}}`, "true");')
        
        # Update handleSendMessage to save chat
        chat_save = f'    setChatMessages(newMessages);\n    localStorage.setItem(`{key}_chat_${{id}}`, JSON.stringify(newMessages));'
        content = re.sub(
            r'setChatMessages\(\[\.\.\.chatMessages, [^\]]+\]\);',
            r'const newMessages = [...chatMessages, { id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" }];\n' + chat_save,
            content
        )
        
        # Also fix Co-Own handleSendMessage which didn't use currentUserName
        content = content.replace('sender: "You"', 'sender: currentUserName || "You"')
        
        # Update leave/cancel buttons
        content = content.replace(f'{set_state}(false);', f'{set_state}(false);\n    localStorage.removeItem(`{key}_${{id}}`);')
        
        with open(filepath, 'w') as f:
            f.write(content)
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")
