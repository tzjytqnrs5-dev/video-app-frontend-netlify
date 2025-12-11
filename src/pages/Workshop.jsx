import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Video as VideoIcon, Loader2 } from 'lucide-react';
import { createPageUrl } from '../utils';

// --- KEY FIX: Import the functions you defined in base44Client.js directly ---
import { generateVideo, getVideoStatus } from '@/api/base44Client';
// NOTE: getVideoStatus is used below, but we assume it can also return a list of videos (filter)
// If your Railway backend has a separate "get all videos" endpoint, you should define and import it here instead.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 

export default function Workshop() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showRandomConfirm, setShowRandomConfirm] = React.useState(false);
  
  // State to manage the visual transition period (the smooth fade reset)
  const [isAnimating, setIsAnimating] = React.useState(false); 

  // Refs needed for the animation library to determine position and size
  const magicTileRef = React.useRef(null);
  const targetVideoTileRef = React.useRef(null); 

  // --- Data Fetching Logic (Updated) ---
  // The queryFn is changed to call your new API function. 
  // We assume getVideoStatus (or a dedicated function if you create one) returns a list of all videos.
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    // 🚨 FIX: Replaced base44.entities.Video.filter with the new API client function
    queryFn: () => getVideoStatus(), 
    refetchInterval: 3000
  });

  // NOTE: Status names might need adjustment to match your Railway backend (e.g., 'GENERATING' vs 'generating')
  const generating = videos.filter(v => v.status.toLowerCase() === 'generating');
  const completed = videos.filter(v => v.status.toLowerCase() === 'completed');

  // --- useMutation for Asynchronous Video Creation (Updated) ---
  const randomVideoMutation = useMutation({
    mutationFn: async () => {
      // 🚨 FIX: Replaced base44.entities.Video.create with the new generateVideo function
      const response = await generateVideo({
        topic: "Generate a completely unique trendy AI short-form video.", // Topic passed to Railway
        template_name: "Random",
        // The Railway backend will handle the rest of the logic (style, randomness, ai_mode, title)
      });
      return response;
    },
    onSuccess: (newVideo) => {
      // 1. Invalidate cache to show the new 'generating' video immediately
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      
      // 2. Set isAnimating to true to begin the fade-out/reset sequence
      setIsAnimating(true);

      // 3. Reset the button state after 2000ms (2 seconds)
      setTimeout(() => {
        // Reset confirmation state
        setShowRandomConfirm(false);
        // Turn off animating, which allows the opacity to smoothly transition back to 100%
        setIsAnimating(false); 
        // We must also manually reset the mutation status for subsequent presses
        randomVideoMutation.reset();
      }, 2000); 
    },
    onError: (err) => {
      console.error("Random generation failed:", err);
      // Reset state immediately on error
      setShowRandomConfirm(false); 
      setIsAnimating(false);
    }
  });

  // --- Update onClick Handler ---
  const handleMagicGenerateClick = () => {
    // Block clicks if the tile is actively pending or flying
    if (randomVideoMutation.isPending || isAnimating) {
        return;
    }

    // 1. First click: Instant change to Confirm state
    if (!showRandomConfirm) {
      setShowRandomConfirm(true);
      return;
    }

    // 2. Second click (Confirm): Instant change to Success/Loading state & start mutation
    if (showRandomConfirm) {
      randomVideoMutation.mutate();
    }
  };

  // --- Rendering Logic ---
  // Add a loading state for the initial video fetch
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
        <span className="ml-3 text-xl">Loading Videos...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* --- Header/Back Navigation --- */}
      <div className="p-4 md:p-6 flex items-center gap-4 mb-10 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <button 
          onClick={() => navigate(createPageUrl('Home'))} 
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-2xl tracking-tight">Workshop</span>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* --- Primary Action Tiles (Templates & Magic Gen) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tile 1: Create from Template (No Change) */}
          <div 
            onClick={() => navigate(createPageUrl('Templates'))} 
            className="group relative h-48 md:h-56 bg-[#1c1c1e] border border-purple-500/30 rounded-3xl 
                         flex flex-col justify-center p-6 cursor-pointer 
                         hover:border-purple-500 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            
            <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
              Create from Template
            </h2>
            <p className="relative z-10 mt-2 text-white/60">
              Start with a pre-designed structure for fast video creation.
            </p>
          </div>
          
          {/* Tile 2: Magic Generate (Random) - Animation Source */}
          <div 
            ref={magicTileRef} // <-- REF: Source position for the flying animation
            onClick={handleMagicGenerateClick} 
            // The opacity change handles the "buttery fade" when isAnimating resets.
            className={`group relative h-48 md:h-56 bg-[#1c1c1e] border border-blue-500/30 rounded-3xl 
                         flex flex-col justify-center p-6 cursor-pointer 
                         hover:border-blue-500 transition-all duration-500 overflow-hidden 
                         ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
                         ${randomVideoMutation.isSuccess ? 'border-green-500' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

            {/* SUCCESS STATE (Visible immediately after mutation starts, disappears when isAnimating becomes true) */}
            {randomVideoMutation.isSuccess && (
                <div className='relative z-10 flex items-center gap-3'>
                    <VideoIcon className="w-8 h-8 text-green-400" />
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-green-400">
                        Success!
                    </h2>
                </div>
            )}

            {/* LOADING STATE (Visible while the API call is pending, instantly replaced by Success) */}
            {randomVideoMutation.isPending && !randomVideoMutation.isSuccess && (
                <div className='relative z-10 flex items-center gap-3'>
                    <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                    <h2 className="text-3xl font-extrabold tracking-tighter text-blue-400">
                        Starting Generation...
                    </h2>
                </div>
            )}

            {/* DEFAULT VIEW (Visible only if no other state is active) */}
            {!showRandomConfirm && !randomVideoMutation.isPending && !randomVideoMutation.isSuccess && (
              <>
                <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
                  Magic Generate
                </h2>
                <p className="relative z-10 mt-2 text-white/60">
                  Generate a unique video instantly using AI and random elements.
                </p>
              </>
            )}

            {/* CONFIRM STATE (Visible after first tap, instantly replaced by Loading/Success) */}
            {showRandomConfirm && !randomVideoMutation.isPending && !randomVideoMutation.isSuccess && (
              <>
                <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tighter text-blue-400">
                  Confirm?
                </h2>
                <p className="relative z-10 mt-2 text-white/60">
                  Tap again to generate a random video.
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* --- Generating Videos Section --- */}
        <div className="space-y-4 pt-4">
            {generating.length > 0 && (
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-white/60" /> Generating Videos
                </h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Target REF Slot: Use this element to find the destination position/size */}
                {generating.map((video, index) => (
                    <div 
                        key={video.id} 
                        ref={index === 0 ? targetVideoTileRef : null} // <-- REF: Target size/position
                        className="bg-[#1c1c1e] rounded-xl p-4 border border-white/5"
                    >
                        <div className="aspect-[9/16] bg-zinc-800 rounded-lg mb-3 flex flex-col items-center justify-center text-center p-4">
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                            <p className="text-white/40 text-xs mt-2">Processing...</p>
                        </div>
                        <p className="text-white/60 text-sm truncate">{video.title}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- Completed Videos Section --- */}
        {completed.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <VideoIcon className="w-6 h-6 text-white/60" /> Your Video Library
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {completed.map(video => (
                <div 
                  key={video.id} 
                  onClick={() => {
                    if (!video.video_url) return;
                    const a = document.createElement('a');
                    a.href = video.video_url;
                    a.download = `${video.title}.mp4`;
                    a.click();
                  }} 
                  className="bg-[#1c1c1e] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="aspect-[9/16] bg-zinc-900 relative">
                    {video.video_url ? (
                      <video 
                        src={video.video_url} 
                        className="w-full h-full object-cover" 
                        muted 
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">No URL</div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <VideoIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white/80 text-sm truncate">{video.title}</p>
                    <p className="text-white/40 text-xs mt-1">{video.template_name || 'Custom'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}