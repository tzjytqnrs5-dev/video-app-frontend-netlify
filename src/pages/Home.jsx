import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Settings, Share2, CreditCard } from 'lucide-react';
import { createPageUrl } from '../utils';

const FeatureTile = ({ title, description, url, delay, icon: Icon, gradient, className = 'h-40' }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(createPageUrl(url))}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative cursor-pointer w-full bg-gradient-to-br ${gradient} 
                 rounded-2xl md:rounded-3xl border border-white/10 hover:border-white/20 
                 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
        {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10 text-white/90" />}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {title}
          </h3>
          {description && <p className="text-sm md:text-base text-white/70">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
};


export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-[#f5f5f7] flex flex-col relative overflow-hidden">
      
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-20 px-4 md:px-6 py-6 flex justify-between items-center backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 font-bold tracking-tight text-white cursor-pointer group" 
          onClick={() => navigate(createPageUrl('Home'))}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-extrabold text-white shadow-lg group-hover:scale-95 transition-transform">
            S
          </div>
          <span className="text-lg">Sircus Studio</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/90 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          JS
        </motion.div>
      </nav>

      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
            Create Viral Content
          </h1>
          <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto">
            Professional video generation powered by AI. Choose a template and start creating.
          </p>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <main className="relative z-10 flex-1 px-4 md:px-6 pb-20"> 
        <div className="max-w-5xl w-full mx-auto">
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">

            {/* Workshop - Full Width */}
            <FeatureTile
              title="Workshop"
              description="Start creating"
              url="Workshop"
              delay={0.2}
              gradient="from-blue-600 to-red-600"
              className="col-span-2 h-32 md:h-36"
            />

            {/* Automation & Social Media - Split */}
            <FeatureTile
              title="Automation"
              url="Tools"
              delay={0.3}
              gradient="from-blue-600 to-cyan-600"
              className="h-16 md:h-24"
            />
            <FeatureTile
              title="Social Media"
              url="Tools"
              delay={0.4}
              gradient="from-emerald-600 to-teal-600"
              className="h-16 md:h-24"
            />

            {/* Plans - Full Width, Shorter */}
            <FeatureTile
              title="Plans"
              url="Plans"
              delay={0.5}
              gradient="from-red-600 to-purple-600"
              className="col-span-2 h-16 md:h-24"
            />

          </div>
        </div>
      </main>
    </div>
  );
}