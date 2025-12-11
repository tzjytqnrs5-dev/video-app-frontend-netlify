import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronLeft } from 'lucide-react';
import TemplateCard from '../components/studio/TemplateCard';
import { createPageUrl } from '../utils';

const TEMPLATE1 = [
  // Storytelling & Narratives
  { id: 1,  name: 'Viral Facts',        gradient: 'from-purple-600 to-pink-600',     preview: 'viral_facts' },
  { id: 2,  name: 'Story Time',         gradient: 'from-blue-600 to-cyan-600',       preview: 'story_time' },
  { id: 3,  name: 'Crazy Theories',     gradient: 'from-indigo-600 to-purple-600',   preview: 'crazy_theories' },
  { id: 4,  name: 'Mini Documentaries', gradient: 'from-red-600 to-rose-600',        preview: 'mini_documentaries' },
  { id: 5,  name: 'Confessions',        gradient: 'from-teal-600 to-emerald-600',    preview: 'confessions' },
  { id: 6,  name: 'Plot Twist',         gradient: 'from-orange-600 to-amber-600',    preview: 'plot_twist' },

  // Educational / Value
  { id: 7,  name: 'Quick Tips',         gradient: 'from-green-600 to-emerald-600',   preview: 'quick_tips' },
  { id: 8,  name: 'Teach Me',           gradient: 'from-violet-600 to-fuchsia-600',  preview: 'teach_me' },
  { id: 9,  name: 'Did You Know',       gradient: 'from-cyan-600 to-blue-600',       preview: 'did_you_know' },
  { id: 10, name: 'Breakdown',          gradient: 'from-slate-600 to-gray-600',      preview: 'breakdown' },
  { id: 11, name: 'Explain This',       gradient: 'from-zinc-600 to-neutral-600',    preview: 'explain_this' },
  { id: 12, name: 'Smart Hacks',        gradient: 'from-lime-600 to-green-600',      preview: 'smart_hacks' },

  // Lifestyle / Personal
  { id: 13, name: 'Day in Life',        gradient: 'from-rose-600 to-pink-600',       preview: 'day_in_life' },
  { id: 14, name: 'Before & After',     gradient: 'from-emerald-600 to-green-600',   preview: 'before_after' },
  { id: 15, name: 'Glow Up',            gradient: 'from-yellow-600 to-orange-600',   preview: 'glow_up' },
  { id: 16, name: 'Habits',             gradient: 'from-sky-600 to-blue-500',        preview: 'habits' },
  { id: 17, name: 'Routines',           gradient: 'from-orange-500 to-red-500',      preview: 'routines' },
  { id: 18, name: 'Aesthetic Moments',  gradient: 'from-purple-500 to-indigo-500',   preview: 'aesthetic_moments' },

  // Business / Cash / Social Growth
  { id: 19, name: 'Money Talk',         gradient: 'from-green-700 to-emerald-700',   preview: 'money_talk' },
  { id: 20, name: 'Creator Tips',       gradient: 'from-fuchsia-600 to-pink-600',    preview: 'creator_tips' },
  { id: 21, name: 'Side Hustles',       gradient: 'from-amber-600 to-yellow-600',    preview: 'side_hustles' },
  { id: 22, name: 'Business Wins',      gradient: 'from-blue-700 to-indigo-700',     preview: 'business_wins' },
  { id: 23, name: 'Growth Hacks',       gradient: 'from-rose-500 to-red-500',        preview: 'growth_hacks' },
  { id: 24, name: 'Content Blueprint',  gradient: 'from-gray-700 to-slate-700',      preview: 'content_blueprint' },

  // Mystery / Dark / Creepy
  { id: 25, name: 'Mystery Mode',       gradient: 'from-gray-900 to-gray-700',       preview: 'mystery_mode' },
  { id: 26, name: 'True Crime Byte',    gradient: 'from-red-800 to-rose-800',        preview: 'true_crime_byte' },
  { id: 27, name: 'Creepy Facts',       gradient: 'from-purple-900 to-fuchsia-900',  preview: 'creepy_facts' },
  { id: 28, name: 'Strange Events',     gradient: 'from-indigo-900 to-blue-900',     preview: 'strange_events' },
  { id: 29, name: 'Unsolved Moments',   gradient: 'from-slate-900 to-slate-700',     preview: 'unsolved_moments' },
  { id: 30, name: 'Dark Stories',       gradient: 'from-black to-gray-800',          preview: 'dark_stories' },

  // Trendy Visual / Fast Edits
  { id: 31, name: 'Quick Cuts',         gradient: 'from-blue-500 to-sky-500',        preview: 'quick_cuts' },
  { id: 32, name: 'Flash Edit',         gradient: 'from-white to-gray-300',          preview: 'flash_edit' },
  { id: 33, name: 'Montage Mode',       gradient: 'from-teal-500 to-cyan-500',       preview: 'montage_mode' },
  { id: 34, name: 'Swipe Edit',         gradient: 'from-pink-500 to-purple-500',     preview: 'swipe_edit' },
  { id: 35, name: 'Pulse Sync',         gradient: 'from-red-500 to-orange-500',      preview: 'pulse_sync' },
  { id: 36, name: 'Trend Sync',         gradient: 'from-violet-500 to-blue-500',     preview: 'trend_sync' }
];

export default function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = useMemo(() => {
    return TEMPLATE1.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-full bg-black text-[#f5f5f7] selection:bg-white/20 pb-40">

      {/* Apple-Style Sticky Navigation */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/60 border-b border-white/5 px-4 lg:px-12 py-4">
        <div className="mx-auto max-w-[1600px] flex items-center justify-between">

          {/* Back + Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(createPageUrl('Workshop'))}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div 
              className="flex items-center gap-2 font-semibold cursor-pointer group"
              onClick={() => navigate(createPageUrl('Home'))}
            >
              <div className="w-4 h-4 rounded-sm bg-white group-hover:scale-90 transition-transform duration-300" />
              <span className="text-white/90 tracking-wide">Sircus Studio</span>
            </div>
          </div>

          {/* Right Nav Label */}
          <div className="text-white/60 font-medium tracking-wide">
            Library
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-[1600px] px-2 md:px-6 lg:px-12 pt-20">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 px-2"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-8xl font-semibold tracking-tighter text-white mb-2 md:mb-6">
              Template Library
            </h1>
            <p className="text-sm md:text-2xl text-[#86868b] font-medium leading-relaxed tracking-tight max-w-[90%] md:max-w-none">
              Curated, high-fidelity templates for your next masterpiece.
            </p>
          </div>

          {/* Minimal Search */}
          <div className="w-full md:w-auto relative group min-w-[200px] md:min-w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-4 w-4 text-[#86868b] group-focus-within:text-white transition-colors" />
            </div>

            <input 
              type="text"
              placeholder="Find a style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1c1e] text-white placeholder-[#5a5a5f] rounded-full py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:bg-[#2c2c2e] focus:ring-1 focus:ring-white/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Strict 3-Column Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-8 lg:gap-10">
          {filteredTemplates.map((t, i) => (
            <TemplateCard
              key={t.id}
              template={t}
              index={i}
              onClick={(id, name) =>
                navigate(createPageUrl('Preview'), {
                  state: { templateId: id, templateName: name, template: t, from: 'template' }
                })
              }
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-[#86868b] text-xl font-medium">No templates found.</p>
          </div>
        )}

      </main>
    </div>
  );
}