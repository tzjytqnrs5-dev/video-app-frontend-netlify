import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = "", hoverScale = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverScale ? { scale: 1.02 } : {}}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-50" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}