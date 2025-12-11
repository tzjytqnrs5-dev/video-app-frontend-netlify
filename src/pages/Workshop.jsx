import React from 'react';
import { useQuery } from '@tanstack/react-query';
// NOTE: The real API client import is commented out or ignored for the temporary fix.
// import { getVideoStatus } from '../api/base44Client'; 
// import { generateVideo } from '../api/base44Client'; 


// 🎯 TEMPORARY HARDCODED DATA to bypass the failing API call (Step 83)
const HARDCODED_VIDEOS = [
    { id: '1', title: 'Test Video 1 (COMPLETED)', status: 'COMPLETED', videoUrl: 'https://example.com/video1.mp4' },
    { id: '2', title: 'Test Video 2 (PENDING)', status: 'PENDING' },
    { id: '3', title: 'Test Video 3 (ERROR)', status: 'ERROR' },
];

function Workshop() {
    // 🚨 API BYPASS IMPLEMENTATION: 
    // This replaces the actual useQuery call with hardcoded data to prove 
    // that the API connection is the problem, not the frontend rendering logic.
    const { data: videos = HARDCODED_VIDEOS, isLoading, isError } = {
        data: HARDCODED_VIDEOS,       // Always use the hardcoded list
        isLoading: false,             // Always report not loading
        isError: false                // Always report no error
    };
    
    // 
    // --- The rest of the component logic remains the same, but now uses the hardcoded 'videos' array ---
    // 

    if (isLoading) {
        return <div className="p-6 text-center">Loading Videos...</div>;
    }

    if (isError) {
        return (
            <div className="p-6 text-center text-red-600">
                <h2 className="text-xl font-bold">Error Loading Videos</h2>
                <p>Could not connect to the video service. Please check your network or API status.</p>
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return <div className="p-6 text-center">No videos found. Create one now!</div>;
    }

    // --- Video List Display (Using the hardcoded data) ---
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Video Workshop (Test Mode Active)</h1>
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