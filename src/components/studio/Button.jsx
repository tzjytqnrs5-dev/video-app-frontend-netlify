import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary", 
  disabled = false, 
  icon: Icon = null,
  loading = false,
  size = "md"
}) {
  const baseStyle = "relative overflow-hidden font-semibold tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2.5 group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-xl",
    ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/60",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
    </motion.button>
  );
}