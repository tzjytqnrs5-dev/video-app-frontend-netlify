import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      
      <h1 className="text-6xl md:text-9xl font-extrabold text-red-600 mb-4">
        404
      </h1>
      
      <p className="text-2xl md:text-4xl font-semibold mb-8">
        HELP SOS 911!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </p>
      
      <p className="text-white/70 mb-12 max-w-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable or something like that haahahahahahha, nerd. 
      </p>

      <button
        onClick={() => navigate(-1)} // Navigate back one step in history
        className="flex items-center gap-2 px-6 py-3 text-lg font-medium bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
      >
        <span className="text-xl leading-none pt-0.5">&larr;</span>
        Go Back
      </button>

    </div>
  );
}
