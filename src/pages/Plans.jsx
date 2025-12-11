import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { createPageUrl } from '../utils';

export default function Plans() {
  const navigate = useNavigate();

  const tiers = [
    { name: "Builder", price: "$", description: "Basic tools to begin." },
    { name: "Advanced", price: "$$", description: "More power + automation." },
    { name: "Professional", price: "$$$", description: "Full professional suite." },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <button
        onClick={() => navigate(createPageUrl('Home'))}
        className="mb-4 flex items-center gap-1 opacity-50 hover:opacity-100 text-sm"
      >
        <ChevronLeft className="w-3 h-3" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="border border-white/10 rounded-xl p-4 bg-black/5 hover:bg-white/40 transition"
          >
            <h2 className="text-lg font-semibold mb-1">{tier.name}</h2>
            <p className="text-2xl font-bold mb-2">{tier.price}</p>
            <p className="text-black/60 text-sm mb-4">{tier.description}</p>
            <button className="w-full py-1.5 rounded-lg bg-white text-white text-sm font-medium hover:opacity-80">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
