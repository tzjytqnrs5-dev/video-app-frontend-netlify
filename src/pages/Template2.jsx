import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Zap, Wand2, ChevronDown } from 'lucide-react';
// 🚨 FIX: Import the functions you defined in base44Client.js directly
import { generateVideo, getVideoStatus } from '@/api/base44Client';
import Button from '../components/studio/Button';
import { createPageUrl } from '../utils';
import { toast } from 'sonner';

// Template-specific topic collections
const TEMPLATE_TOPICS = {
  'viral_facts': [
    "The shortest war in history lasted 38 minutes",
    "Cleopatra lived closer to the iPhone than the pyramids",
    "Honey never spoils - 3000 year old honey is still edible",
    "Octopuses have three hearts and blue blood",
    "Bananas are berries but strawberries aren't",
    "A day on Venus is longer than its year",
    "Your brain uses 20% of your oxygen but is only 2% of body weight",
    "The Eiffel Tower grows 6 inches in summer",
    "Sharks existed before trees did",
    "There are more stars than grains of sand on Earth",
    "Butterflies can taste with their feet",
    "A single strand of spaghetti is called a spaghetto",
    "The inventor of the Pringles can is buried in one",
    "Cows have best friends and get stressed when separated",
    "The longest English word is 189,819 letters long",
    "Sea otters hold hands while sleeping to stay together",
    "A shrimp's heart is in its head",
    "The wood frog can hold its pee for 8 months",
    "Cats can't taste sweetness",
    "A group of flamingos is called a flamboyance"
  ],
  'mystery': [
    "The man who vanished from a plane mid-flight",
    "The abandoned ghost ship with hot food on the table",
    "The cipher that has stumped codebreakers for 50 years",
    "The island where compasses stop working",
    "The ancient computer found at the bottom of the ocean",
    "The forest where hundreds of people disappear",
    "The town that was swallowed by the earth overnight",
    "The painting that drives people insane",
    "The solved murder that couldn't have happened",
    "The identical strangers who lived parallel lives",
    "The manuscript written in a language nobody can read",
    "The mystery of the sealed room murders",
    "The lighthouse keepers who vanished without a trace",
    "The ship graveyard with no explanation",
    "The perfectly preserved ancient bodies in the bog",
    "The underground city discovered by accident",
    "The missing plane found 50 years later",
    "The locked room with no possible exit",
    "The twin who lived their sibling's life",
    "The treasure that rewrites history"
  ],
  'how_to': [
    "How to make $1000 in 24 hours with no investment",
    "How to learn any language in 3 months",
    "How to read 100 books a year effortlessly",
    "How to wake up at 5am without hating life",
    "How to negotiate anything and always win",
    "How to remember everything you read forever",
    "How to build a 6-figure side hustle",
    "How to master any skill in 20 hours",
    "How to make people instantly like you",
    "How to never procrastinate again",
    "How to build unstoppable confidence in 30 days",
    "How to quit your 9-5 in 6 months",
    "How to write content that goes viral",
    "How to train your brain to focus for hours",
    "How to build a morning routine that changes your life",
    "How to turn your hobby into a business",
    "How to network like the top 1%",
    "How to speak with charisma and command attention",
    "How to build habits that actually stick",
    "How to become an expert in any field"
  ],
  'story_time': [
    "I survived 3 days trapped in an elevator",
    "My Uber driver turned out to be a serial killer",
    "I found my doppelganger living my exact life",
    "I woke up with someone else's memories",
    "My AI assistant tried to ruin my life",
    "I accidentally joined a cult on a yoga retreat",
    "My roommate was secretly famous the whole time",
    "I discovered my house was built on a graveyard",
    "I catfished my online best friend for 2 years",
    "My DNA test revealed I was switched at birth",
    "I married someone I met on a plane - we never spoke",
    "My childhood imaginary friend was real",
    "I found a hidden room in my apartment",
    "My boss was my high school bully",
    "I discovered I had a twin I never knew about",
    "I accidentally became TikTok famous overnight",
    "My vacation turned into a survival story",
    "I lived in an airport for 3 months",
    "My neighbor was living a double life",
    "I witnessed something I can't explain"
  ],
  'motivation': [
    "You're not lazy, you're just scared",
    "Stop waiting for the perfect moment - it doesn't exist",
    "Your comfort zone is killing your dreams",
    "Discipline is choosing what you want most over what you want now",
    "Everyone successful was once where you are now",
    "The pain of regret is worse than the pain of discipline",
    "You don't need motivation, you need a system",
    "Your excuses are just fear wearing a disguise",
    "Small actions compound into massive results",
    "You're one decision away from a different life",
    "Stop comparing your chapter 1 to someone's chapter 20",
    "Your future self is watching what you do right now",
    "Confidence is built through action, not thought",
    "Every expert was once a beginner who didn't quit",
    "Your potential is wasted on comfort",
    "Winners are just losers who got up one more time",
    "The person you'll be in 5 years is decided today",
    "Motivation fades but discipline compounds",
    "You're capable of so much more than you think",
    "The only failure is not trying at all"
  ],
  'cooking': [
    "The secret ingredient that makes restaurant food addictive",
    "How to make Gordon Ramsay's perfect scrambled eggs",
    "The 5-minute pasta that tastes like fine dining",
    "Why your rice is always mushy - and how to fix it",
    "The steak technique that rivals Michelin stars",
    "How to make crispy bacon without the mess",
    "The chocolate cake that needs no oven",
    "Why adding salt makes your desserts taste better",
    "The ancient bread recipe that's still perfect today",
    "How to turn instant ramen into a gourmet meal",
    "The pizza dough trick from Italian nonnas",
    "Why restaurant burgers taste better - the hidden secret",
    "How to poach an egg perfectly every time",
    "The soup that cures any bad day",
    "Why your cookies spread - science behind baking",
    "The roast chicken that's impossible to mess up",
    "How to make sushi without special equipment",
    "The sauce that transforms any boring dish",
    "Why adding butter last changes everything",
    "The breakfast sandwich that beats any restaurant"
  ],
  'tech': [
    "This AI tool does your job in 10 seconds",
    "The iPhone feature you've been using wrong",
    "How hackers steal your data with one click",
    "The app that saves me 20 hours a week",
    "Why your phone battery dies so fast",
    "The productivity hack Silicon Valley doesn't want you to know",
    "How to use ChatGPT like a pro in 2025",
    "The hidden features in Google that change everything",
    "Why everyone is switching to this browser",
    "The automation that replaced 3 employees",
    "How to become unhackable in 5 minutes",
    "The keyboard shortcuts that save hours daily",
    "Why you should never use public WiFi",
    "The app that turns your voice into perfect writing",
    "How to make your computer 10x faster for free",
    "The dark web secrets nobody talks about",
    "Why tech companies are terrified of this new AI",
    "The smartphone trick that doubles battery life",
    "How to completely disappear online",
    "The coding language that will dominate 2025"
  ],
  'fitness': [
    "Why you're not losing weight - the hidden reason",
    "The 7-minute workout that's scientifically proven",
    "How to build muscle eating less protein",
    "The exercise that burns fat for 48 hours after",
    "Why morning workouts are sabotaging your gains",
    "The perfect diet that nutritionists don't want you to know",
    "How to get abs without a single situp",
    "The stretching mistake that's causing your pain",
    "Why you should never skip leg day - the real reason",
    "The 30-day challenge that transforms your body",
    "How to build a home gym for under $100",
    "The supplement that's actually worth your money",
    "Why cardio is killing your muscle gains",
    "The breathing technique that boosts performance 40%",
    "How to fix your posture in one week",
    "The meal timing trick that doubles fat loss",
    "Why your gym routine stopped working",
    "The 5 exercises that replace going to the gym",
    "How to recover faster and train harder",
    "The sleep hack that increases muscle growth"
  ],
  'travel': [
    "The hidden country where $20 buys luxury",
    "How I traveled the world with no money",
    "The airport hack that gets you upgraded for free",
    "Why you should never book flights on Tuesday",
    "The secret island tourists don't know about",
    "How to live in 5-star hotels for hostel prices",
    "The passport that opens 195 countries visa-free",
    "Why this hidden city is the new Dubai",
    "The travel mistake that's costing you thousands",
    "How digital nomads make $10k while traveling",
    "The countries that pay you to visit them",
    "Why everyone is moving to this unknown paradise",
    "The credit card that gives free flights worldwide",
    "How to travel luxury on a backpacker budget",
    "The dangerous places that are actually safe",
    "Why this empty beach is better than Maldives",
    "The visa loophole that lets you stay forever",
    "How to find $50 flights to anywhere",
    "The travel insurance secret that saves lives",
    "Why traditional tourism is dead in 2025"
  ],
  'business': [
    "How this 19-year-old built a $10M company",
    "The business model that prints money",
    "Why most startups fail in the first year",
    "How to validate your business idea in 48 hours",
    "The marketing strategy that costs $0",
    "Why you don't need investors to start",
    "How to automate your business completely",
    "The pricing psychology that doubles sales",
    "Why personal branding is the new business card",
    "How to hire world-class talent remotely",
    "The sales technique that closes 90% of deals",
    "Why your business needs a content strategy now",
    "How to scale from $0 to $100k in 6 months",
    "The partnership that changed everything",
    "Why most businesses ignore their goldmine",
    "How to build a business that runs without you",
    "The email that generated $500k in sales",
    "Why your competitors are winning",
    "How to turn customers into evangelists",
    "The business pivot that saved this failing company"
  ]
};

// Default fallback topics
const DEFAULT_TOPICS = TEMPLATE_TOPICS['viral_facts'];

// Function to format the template key (e.g., 'viral_facts' -> 'Viral Facts')
const formatTemplateName = (key) => {
    return key.replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
};

export default function Template2() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // NEW STATE: Dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false); 
  
  // Memoize template data structure
  const allTemplates = useMemo(() => {
    return Object.keys(TEMPLATE_TOPICS).map(key => ({
        key: key,
        name: formatTemplateName(key),
    }));
  }, []);


  // Determine current template info
  const getTopicsForTemplate = useCallback(() => {
    const templateKey = state?.template?.preview || state?.templateName?.toLowerCase().replace(/\s+/g, '_') || 'viral_facts';
    return TEMPLATE_TOPICS[templateKey] || DEFAULT_TOPICS;
  }, [state]);

  const currentTopics = getTopicsForTemplate();
  const currentTemplateName = state?.templateName || 'Viral Facts';
  const currentTemplateKey = currentTemplateName.toLowerCase().replace(/\s+/g, '_');


  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (topic || loading || videoUrl || isGenerating) return;
    
    let idx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const current = currentTopics[idx];
      
      if (isDeleting) {
        setTypedText(current.substring(0, charIdx - 1));
        charIdx--;
        
        if (charIdx === 0) {
          isDeleting = false;
          idx = (idx + 1) % currentTopics.length;
          timeoutId = setTimeout(type, 500);
        } else {
          timeoutId = setTimeout(type, 30);
        }
      } else {
        setTypedText(current.substring(0, charIdx + 1));
        charIdx++;
        
        if (charIdx === current.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        } else {
          timeoutId = setTimeout(type, 80);
        }
      }
    };

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, [topic, loading, videoUrl, isGenerating, currentTopics]);

  const handleGenerate = useCallback(async () => {
    const trimmedTopic = topic.trim();
    
    if (!trimmedTopic) {
      toast.error("Please enter a topic");
      return;
    }

    if (trimmedTopic.length < 3) {
      toast.error("Topic must be at least 3 characters long");
      return;
    }

    if (trimmedTopic.length > 200) {
      toast.error("Topic is too long (max 200 characters)");
      return;
    }

    setIsGenerating(true);
    setLoading(true);
    setError(null);
    setProgress(0);
    setStatusMessage("Initializing...");

    try {
      // 🚨 FIX: Combined the create/invoke steps into one call to the new generateVideo function
      // Assuming your new Railway generateVideo handles creation and processing.
      
      // Step 1: Start the generation via the new Railway API endpoint
      const response = await generateVideo({
        topic: trimmedTopic,
        template_name: currentTemplateName,
        // Pass any other necessary template/style details to the Railway backend
      });

      // Assuming the response from generateVideo is the new video record/status
      // You may need to adjust the structure based on your actual Railway response.
      const videoRecord = response; 

      setStatusMessage("Video generation started");
      setProgress(10);
      toast.success('Generating video...');
      
      // Since the old SDK required two steps (create then invoke), and your new API
      // should combine this into one call, we can directly set the status/navigate.
      // We are no longer polling the progress in this specific file, we rely on the
      // Workshop page to see the job start.

      setProgress(100);
      setStatusMessage("Complete!");
      
      // The 2-second smooth fade-back sequence starts here
      setTimeout(() => {
        navigate(createPageUrl('Workshop'));
      }, 2000); // Increased time to allow for the smooth fade-back animation
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate video');
      toast.error(`Error: ${err.message || 'Failed to generate video'}`);
      setLoading(false);
      setIsGenerating(false);
    }
  }, [topic, state, navigate, currentTemplateName]);

  const handleRandomTopic = useCallback(() => {
    const randomTopic = currentTopics[Math.floor(Math.random() * currentTopics.length)];
    setTopic(randomTopic);
  }, [currentTopics]);

  const handleBack = useCallback(() => {
    navigate(createPageUrl('Templates'));
  }, [navigate]);

  const handleTryAgain = useCallback(() => {
    setLoading(false);
    setIsGenerating(false);
    setError(null);
    setProgress(0);
  }, []);

  const handleCreateAnother = useCallback(() => {
    setVideoUrl(null);
    setTopic("");
    setError(null);
    setProgress(0);
    setIsGenerating(false);
  }, []);
  
  // NEW HANDLER: Navigate to a new template
  const handleSelectTemplate = useCallback((templateKey, templateName) => {
    setShowDropdown(false);
    
    // Check if the user is selecting the current template
    if (templateKey === currentTemplateKey) {
        return;
    }

    // Navigate to the same component (Template2) but pass the new state/props
    navigate(location.pathname, { 
        replace: true, // Replace current history entry
        state: { 
            templateName: templateName, 
            template: { preview: templateKey }, // Mimic the structure needed by getTopicsForTemplate
            templateId: 1 // Default ID, you might need to adjust this
        } 
    });
  }, [navigate, location.pathname, currentTemplateKey]);

  // Video ready view
  if (videoUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
      >
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[9/16] bg-zinc-900 rounded-[2rem] overflow-hidden border-4 border-zinc-800 shadow-2xl"
          >
            <video 
              src={videoUrl} 
              className="w-full h-full object-cover" 
              controls 
              playsInline 
              autoPlay 
              loop 
              muted 
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('Video playback error:', e);
                toast.error('Failed to load video');
              }}
            />
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-4xl font-bold text-white">Your Video is Ready! 🎉</h2>
            <p className="text-white/60 text-lg">Your video has been generated successfully</p>
            <Button 
              onClick={handleCreateAnother} 
              variant="primary"
              className="px-8 py-3"
            >
              Create Another Video
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2a1b3d_0%,_#000000_70%)] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#1a0f2e_0%,_transparent_50%)] opacity-30 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-20 p-6 flex justify-between items-center">
        <motion.button 
          onClick={handleBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          disabled={loading}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </motion.button>
        
        {/* Template Dropdown Container */}
        <div className="relative">
            {/* Template badge / Pill Button */}
            <motion.button
              onClick={() => setShowDropdown(prev => !prev)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-sm transition-colors ${loading ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200'}`}
              aria-expanded={showDropdown}
            >
              {currentTemplateName}
              <motion.span
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-60 bg-[#1c1c1e] rounded-xl shadow-2xl overflow-hidden border border-white/10"
                        // Close dropdown on click outside/blur
                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)} 
                        tabIndex={-1}
                    >
                        {allTemplates.map((template) => (
                            <button
                                key={template.key}
                                onClick={() => handleSelectTemplate(template.key, template.name)}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors 
                                            ${template.key === currentTemplateKey 
                                                ? 'bg-purple-600 text-white font-bold' 
                                                : 'text-white/80 hover:bg-white/10'}`}
                                disabled={template.key === currentTemplateKey}
                            >
                                {template.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-[10vh] px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-8 max-w-md"
            >
              {/* Loading spinner */}
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                <motion.div 
                  className="absolute inset-0 border-t-4 border-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Status message */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{statusMessage}</h3>
                <div className="space-y-2">
                  <p className="text-white/40 text-sm">{progress}% complete</p>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 mt-8"
                >
                  <div className="text-red-400 bg-red-500/10 px-4 py-3 rounded-lg border border-red-500/20 max-w-md text-sm">
                    {error}
                  </div>
                  <Button 
                    onClick={handleTryAgain} 
                    variant="ghost"
                    className="px-6 py-2"
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl w-full space-y-8 text-center"
            >
              {/* Header */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Write your idea,
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  I'll do the rest.
                </h2>
              </div>

              {/* Input container */}
              <div className="relative group">
                <textarea 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  placeholder=""
                  className="w-full bg-[#1c1c1e]/80 backdrop-blur-xl border-2 border-white/10 focus:border-white/30 rounded-3xl px-6 py-5 text-lg md:text-xl text-white placeholder-white/30 outline-none min-h-[120px] resize-none transition-all shadow-2xl hover:border-white/20"
                  maxLength={200}
                  aria-label="Video topic input"
                />
                
                {/* Animated placeholder with cursor */}
                {!topic && (
                  <div className="absolute inset-0 px-6 py-5 text-lg md:text-xl text-white/30 pointer-events-none">
                    {typedText}
                    <span className={`inline-block w-0.5 h-5 bg-white/50 ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                )}

                {/* Random topic button */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <motion.button 
                    onClick={handleRandomTopic}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors backdrop-blur-sm"
                    title="Random topic"
                    aria-label="Generate random topic"
                  >
                    <Wand2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Generate button - only shows when text is entered */}
              <AnimatePresence>
                {topic.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={handleGenerate} 
                        variant="primary" 
                        className="px-8 py-3 text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
                        icon={Zap}
                        disabled={isGenerating}
                      >
                        Generate Video
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}