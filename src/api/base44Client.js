// 🚨 IMPORTANT: Change this base URL to your actual, public Railway domain.
// This is the single critical fix for your application.
const RAILWAY_API_BASE_URL = 'https://strong-alignment-production-c935.up.railway.app';

/**
 * Executes a POST request to start the video generation process on the Railway Dispatcher.
 * * @param {string} topic - The user-provided topic for the video script.
 * @returns {Promise<{videoId: string}>} - The ID of the newly created video job.
 */
export async function generateVideo(topic) {
    const url = `${RAILWAY_API_BASE_URL}/dispatch`;
    
    // NOTE: You might need to adjust the structure of the body 
    // depending on what your Railway backend expects (e.g., if it needs a user ID).
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // If your Railway API requires an API Key or Auth Token, add it here:
            // 'Authorization': `Bearer ${process.env.RAILWAY_API_KEY}` 
        },
        body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
        // Throw an error if the Railway API returns a non-200 status
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred.' }));
        throw new Error(`Failed to dispatch job: ${errorData.message || response.statusText}`);
    }

    // Assuming your Railway dispatcher returns a JSON body like { videoId: "..." }
    return response.json(); 
}

/**
 * Executes a GET request to retrieve the status and result of a video job.
 * * @param {string} videoId - The ID of the video job to check.
 * @returns {Promise<{status: string, videoUrl?: string}>} - The video status and URL if completed.
 */
export async function getVideoStatus(videoId) {
    const url = `${RAILWAY_API_BASE_URL}/videos/${videoId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // If authentication is needed, add it here too
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch video status for ID ${videoId}`);
    }

    // Assuming your Railway API returns the video object/status
    return response.json(); 
}

// NOTE: You may need to replace any other old Base44 function exports here 
// with corresponding functions that call your new Railway endpoints.