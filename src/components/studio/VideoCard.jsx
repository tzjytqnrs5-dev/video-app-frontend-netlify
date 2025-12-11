import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Share2, Heart, MoreVertical, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function VideoCard({ video, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-zinc-900 shadow-xl ring-1 ring-white/5 transition-all duration-300 group-hover:ring-white/15 group-hover:shadow-2xl">
        {/* Thumbnail */}
        {video.thumbnail_url ? (
          <img 
            src={video.thumbnail_url} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <div className="flex gap-2">
            {video.status === 'completed' && (
              <span className="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-xs font-semibold">
                Ready
              </span>
            )}
            {video.favorited && (
              <div className="h-8 w-8 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              </div>
            )}
          </div>
          <button 
            className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle more options
            }}
          >
            <MoreVertical className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          <div>
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {video.title}
            </h3>
            <p className="text-white/50 text-xs">
              {video.template_name}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/40">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {video.downloads || 0}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(video.created_date), 'MMM d')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}