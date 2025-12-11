import React from 'react';
import { useNavigate } from 'react-router-dom';
// Removed: ChevronLeft, Video as VideoIcon, Sparkles from 'lucide-react'
import { createPageUrl } from '../utils';
// Removed: useQuery and MOCK_VIDEOS as they are moving to MyVideos.jsx

export default function Workshop() {
  const navigate = useNavigate();
  
  // Handlers for navigation
  const handleTemplateClick = () => navigate(createPageUrl('Templates'));
  const handleMagicGenerateClick = () => {
    // Now redirects to the Templates page
    navigate(createPageUrl('Templates')); 
  };
  const handleMyVideosClick = () => navigate(createPageUrl('MyVideos'));

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* --- Header/Back Navigation --- */}
      <div className="p-4 md:p-6 flex items-center gap-4 mb-10 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <button 
          onClick={() => navigate(createPageUrl('Home'))} 
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-1"
        >
          {/* Replaced ChevronLeft icon with a simple arrow character */}
          <span className="text-xl leading-none pt-0.5">&larr;</span> 
        </button>
        <span className="font-bold text-2xl tracking-tight">Workshop</span>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* --- All Action Tiles: Template, Magic Gen, and NEW My Videos --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tile 1: Create from Template */}
          <div 
            onClick={handleTemplateClick} 
            className="group relative h-48 md:h-56 bg-[#1c1c1e] border border-purple-500/30 rounded-3xl 
                       flex flex-col justify-center p-6 cursor-pointer 
                       hover:border-purple-500 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            
            <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
              Templates
            </h2>
            <p className="relative z-10 mt-2 text-white/60">
              Start with a pre-designed video structure.
            </p>
          </div>
          
          {/* Tile 2: Magic Generate (Random!) */}
          <div 
            onClick={handleMagicGenerateClick} 
            className="group relative h-48 md:h-56 bg-[#1c1c1e] border border-blue-500/30 rounded-3xl 
                       flex flex-col justify-center p-6 cursor-pointer 
                       hover:border-blue-500 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            
            <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
              Random
            </h2>
            <p className="relative z-10 mt-2 text-white/60">
              I'm feeling lucky! 
            </p>
          </div>

          {/* Tile 3: My Videos */}
          <div 
            onClick={handleMyVideosClick} 
            className="group relative h-48 md:h-56 bg-[#1c1c1e] border border-green-500/30 rounded-3xl 
                       flex flex-col justify-center p-6 cursor-pointer 
                       hover:border-green-500 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            
            <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
              My Videos
            </h2>
            <p className="relative z-10 mt-2 text-white/60">
              Previously generated videos.
            </p>
          </div>
        </div>
        
        {/* Removed: Generating and Completed Videos Sections */}
      </div>
    </div>
  );
}