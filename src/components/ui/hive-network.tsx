"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Star, Zap, Plus, Minus, Maximize, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";

interface HiveNetworkProps {
  talents: any[];
}

export function HiveNetwork({ talents }: HiveNetworkProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Expand/Collapse State (Only Root expanded by default)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  
  // Zoom State
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const CANVAS_WIDTH = 3000;
  const CANVAS_HEIGHT = 2000;
  const CENTER_X = CANVAS_WIDTH / 2;
  const CENTER_Y = CANVAS_HEIGHT / 2;

  const centerScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth, scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
      containerRef.current.scrollTop = (scrollHeight - clientHeight) / 2 - 400; // Offset to see root
      setZoom(1);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    // Add small delay to ensure DOM is ready for centering
    setTimeout(centerScroll, 50);
  }, []);

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  // Process data to create a Top-Down Hierarchy
  const { nodes, links, childrenCount } = useMemo(() => {
    const allNodes: any[] = [];
    const allLinks: any[] = [];
    const childrenMap: Record<string, number> = {};
    
    // 1. ROOT NODE
    allNodes.push({
      id: 'root',
      type: 'root',
      label: 'MyKoodu Network',
      x: 0,
      y: -600,
      isVisible: true
    });

    const groups: Record<string, any[]> = { Culinary: [], Tech: [], Fitness: [], Creative: [], Community: [] };
    talents.forEach((t) => {
      const title = (t.title || "").toLowerCase();
      let matched = false;
      if (title.includes("bake") || title.includes("cook") || title.includes("food") || title.includes("sourdough") || title.includes("mango")) { groups.Culinary.push(t); matched = true; }
      if (title.includes("tech") || title.includes("code") || title.includes("app") || title.includes("drone")) { groups.Tech.push(t); matched = true; }
      if (title.includes("fit") || title.includes("yoga") || title.includes("sport") || title.includes("badminton") || title.includes("run")) { groups.Fitness.push(t); matched = true; }
      if (title.includes("photo") || title.includes("art") || title.includes("paint") || title.includes("guitar") || title.includes("music")) { groups.Creative.push(t); matched = true; }
      if (!matched) { groups.Community.push(t); }
    });

    const activeCategories = Object.entries(groups).filter(([_, items]) => items.length > 0);
    childrenMap['root'] = activeCategories.length;

    const catSpacing = 450; 
    
    activeCategories.forEach(([catName, users], catIndex) => {
      const catId = `cat-${catName}`;
      const catX = (catIndex - (activeCategories.length - 1) / 2) * catSpacing;
      const catY = -150;
      
      childrenMap[catId] = users.length;

      // Add Category Node (Visible if Root is expanded)
      allNodes.push({
        id: catId,
        type: 'category',
        label: catName,
        x: catX,
        y: catY,
        parentId: 'root',
        isVisible: expandedNodes.has('root')
      });

      allLinks.push({
        id: `link-root-${catName}`,
        source: 'root',
        target: catId,
        isVisible: expandedNodes.has('root')
      });

      // 3. USERS
      const userSpacing = 140; 
      users.forEach((user, userIndex) => {
        const maxPerRow = 3;
        const row = Math.floor(userIndex / maxPerRow);
        const col = userIndex % maxPerRow;
        const usersInThisRow = Math.min(maxPerRow, users.length - (row * maxPerRow));
        
        const userX = catX + (col - (usersInThisRow - 1) / 2) * userSpacing;
        const userY = 150 + (row * 150); 
        const uniqueUserId = `user-${user.id}-${catName}`;

        allNodes.push({
          id: uniqueUserId,
          type: 'person',
          data: user,
          x: userX,
          y: userY,
          parentId: catId,
          isVisible: expandedNodes.has('root') && expandedNodes.has(catId)
        });

        allLinks.push({
          id: `link-${catName}-${user.id}`,
          source: catId,
          target: uniqueUserId,
          isVisible: expandedNodes.has('root') && expandedNodes.has(catId)
        });
      });
    });

    return { nodes: allNodes, links: allLinks, childrenCount: childrenMap };
  }, [talents, expandedNodes]);

  if (!isMounted) return <div className="fixed inset-0 bg-[#FAFAFA] z-50" />;

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] z-50 font-sans overflow-hidden selection:bg-indigo-500/30 flex flex-col">
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-orange-400/20 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      {/* Header UI */}
      <div className="absolute top-0 left-0 right-0 z-40 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-4 group bg-white/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white shadow-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">Home</span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hive Mind</h1>
          <p className="text-xs font-medium text-slate-500 mt-1 max-w-[200px] leading-tight">
            Click nodes to explore the hierarchy.
          </p>
        </div>
      </div>

      {/* Floating Zoom Controls (Premium UI) */}
      <div className="absolute bottom-10 right-8 z-40 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-2xl overflow-hidden p-1">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <div className="h-px bg-slate-200 mx-2" />
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <Minus className="w-5 h-5" />
          </button>
        </div>
        <button onClick={centerScroll} className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-colors mt-2">
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Panning Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 w-full h-full overflow-auto cursor-grab active:cursor-grabbing relative hide-scrollbar"
      >
        <div className="relative min-w-max min-h-max" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
          
          <motion.div 
            className="absolute inset-0 origin-center"
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <AnimatePresence>
                {links.filter(l => l.isVisible).map(link => {
                  const sourceNode = nodes.find(n => n.id === link.source);
                  const targetNode = nodes.find(n => n.id === link.target);
                  if (!sourceNode || !targetNode) return null;
                  
                  const isHighlighted = hoveredNodeId === sourceNode.id || hoveredNodeId === targetNode.id;
                  
                  const x1 = CENTER_X + sourceNode.x;
                  const y1 = CENTER_Y + sourceNode.y;
                  const x2 = CENTER_X + targetNode.x;
                  const y2 = CENTER_Y + targetNode.y;
                  
                  const pathData = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
                  
                  return (
                    <motion.path
                      key={link.id}
                      d={pathData}
                      fill="transparent"
                      stroke={isHighlighted ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.2)"}
                      strokeWidth={isHighlighted ? 4 : 2}
                      strokeLinecap="round"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Nodes */}
            <AnimatePresence>
              {nodes.filter(n => n.isVisible).map(node => {
                const isHovered = hoveredNodeId === node.id || (node.parentId && hoveredNodeId === node.parentId);
                const hasChildren = childrenCount[node.id] > 0;
                const isExpanded = expandedNodes.has(node.id);
                
                // 1. ROOT NODE
                if (node.type === 'root') {
                  return (
                    <motion.div
                      key={node.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-auto"
                      style={{ left: CENTER_X + node.x, top: CENTER_Y + node.y }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onClick={(e) => toggleExpand(node.id, e)}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 border-[4px] border-white shadow-[0_15px_40px_rgba(99,102,241,0.4)] z-20 overflow-hidden cursor-pointer">
                        <Logo className="w-12 h-12 text-white relative z-10" />
                      </div>
                      <div className="mt-3 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] font-black text-slate-900 text-sm tracking-tight flex items-center gap-2">
                        MyKoodu
                        {hasChildren && (
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="bg-slate-100 rounded-full p-0.5">
                            <ChevronDown className="w-3 h-3 text-slate-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                }

                // 2. CATEGORY NODES
                if (node.type === 'category') {
                  return (
                    <motion.div
                      key={node.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-auto"
                      style={{ left: CENTER_X + node.x, top: CENTER_Y + node.y }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onClick={(e) => toggleExpand(node.id, e)}
                      initial={{ scale: 0, opacity: 0, y: -20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`px-8 py-4 rounded-[2rem] flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-slate-900 border-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.2)]' : 'bg-white/90 border-white shadow-xl'} border-2 backdrop-blur-xl z-10 cursor-pointer`}>
                        <span className={`font-black tracking-widest uppercase text-xs transition-colors ${isHovered ? 'text-white' : 'text-slate-800'} flex items-center gap-2`}>
                          {node.label}
                          {hasChildren && (
                            <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-[10px]">
                              {childrenCount[node.id]}
                            </span>
                          )}
                        </span>
                      </div>
                    </motion.div>
                  );
                }

                // 3. PERSON NODES
                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setSelectedNode(node.data)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group pointer-events-auto"
                    style={{ left: CENTER_X + node.x, top: CENTER_Y + node.y }}
                    initial={{ scale: 0, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.15, zIndex: 50 }}
                  >
                    <div className={`w-16 h-16 rounded-full overflow-hidden border-[4px] transition-all duration-300 shadow-md ${isHovered ? 'border-indigo-500 shadow-[0_10px_30px_rgba(99,102,241,0.4)] bg-indigo-50 scale-110' : 'border-white bg-slate-100'}`}>
                      {node.data.image_url ? (
                        <img src={node.data.image_url} alt={node.data.owner_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-slate-400" /></div>
                      )}
                    </div>
                    <div className={`px-4 py-1.5 rounded-full backdrop-blur-xl transition-all duration-300 shadow-sm ${isHovered ? 'bg-slate-900 text-white' : 'bg-white/80 text-slate-700 border border-white'}`}>
                      <span className="text-[11px] font-bold whitespace-nowrap block">{node.data.owner_name.split(' ')[0]}</span>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Selected Node Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50 to-transparent pointer-events-none" />
              
              <div className="relative flex flex-col items-center text-center mb-8 pt-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-[6px] border-white shadow-xl mb-5 bg-slate-100">
                  {selectedNode.image_url ? (
                    <img src={selectedNode.image_url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 text-slate-400" /></div>
                  )}
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{selectedNode.owner_name}</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                  <Star className="w-3 h-3" /> Talent Node
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedNode.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {selectedNode.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/talent/${selectedNode.id}`} className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 text-center text-[15px] font-bold py-4 rounded-xl transition-colors shadow-[0_8px_20px_rgba(99,102,241,0.25)]">
                  Connect
                </Link>
                <button onClick={() => setSelectedNode(null)} className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 text-[15px] font-bold rounded-xl transition-colors border border-slate-200">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
