import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Zap } from 'lucide-react'; // Imported icons for better visual clarity
import { createPageUrl } from '../utils';

// Component for a clickable feature card
const ToolCard = ({ title, description, url, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(createPageUrl(url))} 
      className="p-8 bg-[#1c1c1e] rounded-3xl border border-white/5 
                 hover:bg-[#252528] active:scale-[0.98] transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div className="mb-4">
        {/* Render the Lucide icon passed as a prop */}
        <Icon className="w-8 h-8 text-purple-400" /> 
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">
        {title}
      </h3>
      <p className="text-sm opacity-70 text-white/90">
        {description}
      </p>
    </div>
  );
};


export default function Tools() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(createPageUrl('Home'))} 
          className="mb-10 flex items-center gap-2 opacity-80 hover:opacity-100 text-sm transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" /> **Back to Home**
        </button>
        
        {/* Main Title */}
        <h1 className="text-4xl font-bold mb-12">
          Schedule Posts
        </h1>
        
        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          
          <ToolCard
            title="Content Calendar"
            description="Visualize, drag-and-drop, and manage all your scheduled content across every platform on an intuitive timeline."
            icon={Calendar} // Using the Calendar icon
          />
          
          <ToolCard
            title="Platform Integrations"
            description="Connect your social media accounts to automatically publish your scheduled posts exactly when you need them."
            icon={Zap} // Using the Zap icon
          />
          
        </div>
      </div>
    </div>
  );
}