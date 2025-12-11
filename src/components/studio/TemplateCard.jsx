import React from 'react';
import { motion } from 'framer-motion';

export default function TemplateCard({ template, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.2, 0.65, 0.3, 0.9] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full"
    >
      <button 
        className="absolute inset-0 z-50 w-full h-full cursor-pointer bg-transparent"
        onClick={() => onClick(template.id, template.name)}
        aria-label={`Select ${template.name}`}
      />

      <div className="relative aspect-[3.5/5] w-full overflow-hidden rounded-xl md:rounded-[2rem] lg:rounded-[2.5rem] bg-[#1c1c1e] shadow-2xl shadow-black/50 ring-1 ring-white/5 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-5 lg:p-8">
          <div className="flex justify-between items-start">
            <div className="px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1 md:gap-2">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-white/90">New</span>
            </div>
          </div>
          <div className="transform transition-transform duration-500 group-hover:-translate-y-1 md:group-hover:-translate-y-2">
            <p className="hidden md:block text-[9px] md:text-xs font-bold tracking-widest text-white/50 uppercase mb-1 md:mb-3">
              No. 0{template.id}
            </p>
            <h3 className="text-sm md:text-2xl lg:text-3xl font-bold text-white tracking-tighter leading-tight mb-0 md:mb-2 line-clamp-2">
              {template.name}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}