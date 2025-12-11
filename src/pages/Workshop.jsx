// src/pages/Workshop.jsx (Full Reversion)

import React from 'react';
import { useQuery } from '@tanstack/react-query'; // KEEP THIS CORRECT IMPORT
import { getVideoStatus } from '../api/base44Client'; 
// import { generateVideo } from '../api/base44Client'; // Keep commented if not used here


function Workshop() {
    // 🚀 RE-ENABLED API CALL
    const { 
        data: videos = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ['videos'],
        // NOTE: This call is the one we suspect is failing (no /videos endpoint)
        queryFn: () => getVideoStatus(), 
        retry: 2 
    });
    
    // --- Loading, Error, and Empty States ---
    if (isLoading) {
        return <div className="p-6 text-center">Loading Videos...</div>;
    }

    if (isError) {
        return (
            <div className="p-6 text-center text-red-600">
                <h2 className="text-xl font-bold">Error Loading Videos</h2>
                <p>Could not connect to the video service. Please check your network or API status.</p>
                <p className="text-sm mt-2">The backend may not have a /videos list endpoint.</p>
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return <div className="p-6 text-center">No videos found. Create one now!</div>;
    }

    // --- Video List Display (Renders if the API call succeeds) ---
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Video Workshop</h1>
            <div className="space-y-4">
                {videos.map((video) => (
                    <div key={video.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">{video.title}</p>
                            <span className={`text-sm font-medium ${
                                video.status === 'COMPLETED' ? 'text-green-600' :
                                video.status === 'PENDING' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                                Status: {video.status}
                            </span>
                        </div>
                        {video.status === 'COMPLETED' && video.videoUrl && (
                            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" 
                               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                View
                            </a>
                        )}
                        {video.status === 'PENDING' && (
                            <button disabled className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-not-allowed">
                                Rendering...
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Workshop;