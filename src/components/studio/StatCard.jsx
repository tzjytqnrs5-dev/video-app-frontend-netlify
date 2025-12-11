import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

export default function StatCard({ icon: Icon, label, value, trend, delay = 0, color = "purple" }) {
  const colors = {
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500"
  };

  return (
    <GlassCard delay={delay} hoverScale={false} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`text-sm font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-white/40 font-medium mb-1">{label}</p>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="text-3xl font-bold text-white"
        >
          {value}
        </motion.p>
      </div>
    </GlassCard>
  );
}