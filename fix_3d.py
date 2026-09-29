with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Replace the Main Canvas Area with a 3D Isometric setup
# We will add perspective to the wrapper, and rotate the canvas.
# Nodes will be counter-rotated so they stand upright.

old_canvas = """      {/* Main Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center">"""

new_canvas = """      {/* Main Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        
        {/* The 3D Floor Plane */}
        <motion.div 
          initial={{ rotateX: 60, rotateZ: 0, scale: 0.5, opacity: 0 }}
          animate={{ rotateX: 65, rotateZ: 45, scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Glowing Floor Grid */}
          <div className="absolute w-[200vw] h-[200vw] bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:40px_40px] rounded-full opacity-30" />
"""

content = content.replace(old_canvas, new_canvas)

# Counter-rotate the nodes
old_node_class = "className={`absolute flex flex-col items-center justify-center gap-2 z-20 group transition-all`}"
new_node_class = """className={`absolute flex flex-col items-center justify-center gap-2 z-20 group transition-all`}
            style={{ transformStyle: "preserve-3d" }}
"""
content = content.replace(old_node_class, new_node_class)


# Add floating animation and counter rotation to the glowing hexagon wrapper
old_hexagon = """{/* Glowing Hexagon */}
            <div className={`relative flex items-center justify-center w-16 h-16 ${selectedNode?.id === node.id ? 'scale-125' : ''} transition-transform`}>"""

new_hexagon = """{/* Glowing Hexagon - Counter Rotated to stand up in 3D */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
              className={`relative flex items-center justify-center w-16 h-16 ${selectedNode?.id === node.id ? 'scale-125' : ''} transition-transform`}
              style={{ transform: "rotateZ(-45deg) rotateX(-65deg)", transformStyle: "preserve-3d" }}
            >
              {/* 3D Pillar Shadow */}
              <div className="absolute -bottom-4 w-10 h-2 bg-black/40 blur-md rounded-full" style={{ transform: "rotateX(65deg) rotateZ(45deg)" }} />
"""

content = content.replace(old_hexagon, new_hexagon)

# Fix the closing tags for motion.div instead of div for hexagon wrapper
content = content.replace(
    """                  <User className="w-6 h-6 text-slate-400" />
                )}
              </div>
            </div>""",
    """                  <User className="w-6 h-6 text-slate-400" />
                )}
              </div>
            </motion.div>"""
)


# Also counter-rotate the Central Core
old_core = """        {/* Central Core */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-indigo-600/20 border-2 border-indigo-500/50 shadow-[0_0_60px_rgba(79,70,229,0.3)] backdrop-blur-xl z-10"
        >
          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
        </motion.div>"""

new_core = """        {/* Central Core */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-indigo-600/20 border-2 border-indigo-500/50 shadow-[0_0_60px_rgba(79,70,229,0.3)] backdrop-blur-xl z-10"
        >
          <div style={{ transform: "rotateZ(-45deg) rotateX(-65deg)" }}>
            <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
        </motion.div>"""
        
content = content.replace(old_core, new_core)

# Close the new 3D Floor Plane motion.div
content = content.replace(
    """          ))}
        </svg>
      </div>""",
    """          ))}
        </svg>
        </motion.div>
      </div>"""
)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)
