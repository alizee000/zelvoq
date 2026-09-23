import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Let's create an extreme Orbit card deal that starts from the center of the screen
orbit_style = """
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbitDeal {
          0% { 
            opacity: 0; 
            transform: translate(-100vw, 100vh) rotate(-180deg) scale(0.2); 
          }
          60% {
            opacity: 1;
            transform: translate(10px, -10px) rotate(10deg) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translate(0) rotate(0deg) scale(1); 
          }
        }
      `}} />
    </div>
  );
}
"""
# Replace the previous style block
content = re.sub(r'<style dangerouslySetInnerHTML.*?</style>', '', content, flags=re.DOTALL)
content = content.replace('    </div>\n  );\n}', orbit_style)

# Update the link style to use the new animation with a longer duration
old_link_pattern = r'style=\{\{ animation: `orbitDeal.*?` \}\}'
new_link = 'style={{ animation: `orbitDeal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.12}s both` }}'
content = re.sub(old_link_pattern, new_link, content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

