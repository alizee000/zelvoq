import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# I need to add state for rotation, and an onMouseMove handler to the section.
# First, ensure useState is imported (it already is).

# Let's find the component start to inject the state and handler
component_start = 'export function DiscoverClient({ skills }: { skills: any[] }) {'
handler_code = """
  const [wheelRotation, setWheelRotation] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Map the mouse X position across the screen to a rotation angle
    const width = window.innerWidth;
    // Move from +60deg (left) to -60deg (right)
    const angle = ((e.clientX / width) - 0.5) * -120;
    setWheelRotation(angle);
  };
"""

# Inject handler after selectedCategory state
content = content.replace('const [selectedCategory, setSelectedCategory] = useState<string>("all");', 
                          'const [selectedCategory, setSelectedCategory] = useState<string>("all");\n' + handler_code)

# Now find the section and replace it to include onMouseMove and the dynamic rotation
# We also remove the infinite spin from the wheel
old_section = '<section className="relative flex justify-center py-10 h-[600px] overflow-hidden bg-[#e5e5e5] rounded-[2rem] mt-6 mx-0 shadow-inner">'
new_section = '<section onMouseMove={handleMouseMove} onMouseLeave={() => setWheelRotation(0)} className="relative flex justify-center py-10 h-[600px] overflow-hidden bg-[#e5e5e5] rounded-[2rem] mt-6 mx-0 shadow-inner">'
content = content.replace(old_section, new_section)

# Replace the animate-[spin...] on the wheel with the dynamic style
old_wheel = 'className="absolute -bottom-[800px] left-1/2 w-[1000px] h-[1000px] -ml-[500px] flex items-center justify-center animate-[spin_40s_linear_infinite]"'
new_wheel = 'className="absolute -bottom-[800px] left-1/2 w-[1000px] h-[1000px] -ml-[500px] flex items-center justify-center transition-transform duration-700 ease-out" style={{ transform: `rotate(${wheelRotation}deg)` }}'
content = content.replace(old_wheel, new_wheel)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

