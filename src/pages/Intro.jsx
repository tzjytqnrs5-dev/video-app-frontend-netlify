import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Intro() {
  const navigate = useNavigate();
  
  useEffect(() => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    const timer = setTimeout(() => navigate(createPageUrl('Home'), { replace: true }), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1.05, 1.1] }}
        transition={{ duration: 4, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter">
          Sircus Studio.
        </h1>
        <p className="mt-4 text-xs font-mono text-white/30">v4.0 - Direct</p>
      </motion.div>
    </div>
  );
}