import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Video as VideoIcon, Loader2 } from 'lucide-react';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query'; 

// 🎯 Mock Video Data (Now housed here)
const MOCK_VIDEOS = [
    { id: '1', title: 'Example Video 1 (Completed)', status: 'completed', video_url: 'https://example.com/video1.mp4', template_name: 'Generic' },
    { id: '2', title: 'Example Video 2 (Generating)', status: 'generating', template_name: 'Custom' },
    { id: '3', title: 'Example Video 3 (Failed)', status: 'failed', template_name: 'Generic' },
    { id: '4', title: 'Example Video 4 (Completed)', status: 'completed', video_url: 'https://example.com/video4.mp4', template_name: 'Custom' },
];

export default function MyVideos() {
  const navigate = useNavigate();

  // --- Mock Data Fetching Logic ---
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500)); 
        return MOCK_VIDEOS;
    },
  });

  const generating = videos.filter(v => v.status === 'generating');
  const completed = videos.filter(v => v.status === 'completed');

  // --- Rendering Logic ---
  if (isLoading) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white/60" />
            <span className="ml-3">Loading My Videos...</span>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* --- Header/Back Navigation --- */}
      <div className="p-4 md:p-6 flex items-center gap-4 mb-10 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <button 
          onClick={() => navigate(createPageUrl('Workshop'))} 
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-2xl tracking-tight">My Videos</span>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* --- Generating Videos Section --- */}
        <div className="space-y-4 pt-4">
            {generating.length > 0 && (
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-white/60" /> Generating Videos ({generating.length})
                </h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {generating.map((video) => (
                    <div 
                        key={video.id} 
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
              <VideoIcon className="w-6 h-6 text-white/60" /> Video Library ({completed.length})
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