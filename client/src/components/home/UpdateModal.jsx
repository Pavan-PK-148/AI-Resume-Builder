import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import version from "../../assets/version1.jpeg";
import ats from "../../assets/Atsscanner.jpeg";
import upload from "../../assets/upload.jpeg";
import optimize from "../../assets/optimize2.jpeg";

const UpdateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Meet Version 2.0",
      description: "We've rebuilt the engine from the ground up for faster, smarter resume building.",
      image: version,
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Smart ATS Engine",
      description: "New high-precision scanner ensures your resume scores 95+ on Workday, Taleo, and Lever.",
      image: ats, 
      color: "from-slate-900 to-slate-800"
    },
    {
      title: "Instant PDF Import",
      description: "Switching made easy. Upload your old PDF and our AI will map it to a premium layout in seconds.",
      image: upload,
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Keyword Optimization",
      description: "Live skill-matching technology that suggests high-traffic keywords based on your target job description.",
      image: optimize,
      color: "from-amber-500 to-orange-600"
    }
  ];

  useEffect(() => {
 
  const timer = setTimeout(() => {
    setIsOpen(true);
  }, 1500); // Opens 1.5 seconds after the component mounts

  return () => clearTimeout(timer);
}, []);

  // useEffect(() => {
  //   const hasSeenUpdate = localStorage.getItem('v2_modal_seen');
  //   if (!hasSeenUpdate) {
  //     const timer = setTimeout(() => setIsOpen(true), 1500);
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('v2_modal_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button 
  onClick={handleClose}
  className="absolute top-6 right-6 z-20 p-2 bg-slate-900/10 hover:bg-slate-900/20 backdrop-blur-md rounded-full text-slate-900 transition-all border border-slate-900/10"
>
  <X size={20} />
</button>

            {/* Top Visual Area (Static Height) */}
<div className="relative h-[350px] overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}
      // REMOVED p-12 here to allow image to touch edges
      className={`absolute inset-0 bg-gradient-to-br ${slides[currentIndex].color} flex items-center justify-center`}
    >
      <img 
        src={slides[currentIndex].image} 
        alt="feature" 
        // CHANGED object-contain to object-cover
        // REMOVED rotate-2 and shadow-2xl for a cleaner edge-to-edge fit
        className="w-full h-full object-cover transition-transform duration-500"
        onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=V2+Feature+Preview"; }}
      />
    </motion.div>
  </AnimatePresence>
</div>

            {/* Bottom Content Area (Dynamic Height with Flex) */}
            <div className="p-10 flex flex-col items-center text-center bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <Sparkles size={18} className="text-green-500" />
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {slides[currentIndex].title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                    {slides[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation & CTA (Now using regular flow, no overlap) */}
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-green-500' : 'w-2 bg-slate-200'}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleClose}
                  className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all flex items-center gap-3 shadow-xl"
                >
                  Explore Features <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpdateModal;