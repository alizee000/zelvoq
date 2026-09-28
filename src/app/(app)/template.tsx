"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30, 
        mass: 0.8,
        opacity: { duration: 0.2 }
      }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  );
}
