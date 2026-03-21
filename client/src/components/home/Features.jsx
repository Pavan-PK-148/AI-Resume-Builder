import React, { useState } from "react";
import { Zap, Sparkles, ShieldCheck, FileDown, MousePointer2 } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const [activeCard, setActiveCard] = useState(1);

  return (
    <div id="features" className="flex flex-col items-center my-24 scroll-mt-12 bg-[#FDFEFF]">
      
      {/* Badge */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-700 bg-green-100 rounded-full px-6 py-2 w-fit mx-auto mb-6">
        <Zap size={14} className="fill-green-700" />
        <span>How it works</span>
      </div>
      
      <Title 
        title='Powerful Features' 
        description='Everything you need to transform your career history into a high-impact, professional resume that gets you noticed.'
      />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-8">
        
        {/* Left Image / Visual Area */}
        <div className="relative group">
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-green-200/30 blur-3xl rounded-full -z-10 group-hover:bg-green-300/40 transition-colors" />
            <img
              className="max-w-2xl w-full xl:-ml-24 transform group-hover:scale-[1.02] transition-transform duration-700"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
              alt="AI Resume Features"
            />
        </div>

        {/* Right Features List */}
        <div className="px-4 md:px-0 space-y-4">
          
          {/* Feature 1: AI Enhancement */}
          <div
            className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
            onMouseEnter={() => setActiveCard(1)}
          >
            <div
              className={`p-6 flex gap-4 rounded-[1.5rem] border-2 transition-all duration-300 ${
                activeCard === 1
                  ? "border-green-500 bg-white shadow-xl shadow-green-100 translate-x-2"
                  : "border-transparent opacity-60"
              }`}
            >
              <div className={`p-3 rounded-xl ${activeCard === 1 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <Sparkles size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-800">
                  AI-Powered Content
                </h3>
                <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
                  Generate high-impact bullet points and summaries tailored to your target job.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: ATS Optimization */}
          <div
            className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
            onMouseEnter={() => setActiveCard(2)}
          >
            <div
              className={`p-6 flex gap-4 rounded-[1.5rem] border-2 transition-all duration-300 ${
                activeCard === 2
                  ? "border-green-500 bg-white shadow-xl shadow-green-100 translate-x-2"
                  : "border-transparent opacity-60"
              }`}
            >
               <div className={`p-3 rounded-xl ${activeCard === 2 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-800">
                  ATS-Friendly Layouts
                </h3>
                <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
                  Our templates are engineered to bypass automated filters and reach recruiters.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Instant Export */}
          <div
            className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
            onMouseEnter={() => setActiveCard(3)}
          >
            <div
              className={`p-6 flex gap-4 rounded-[1.5rem] border-2 transition-all duration-300 ${
                activeCard === 3
                  ? "border-green-500 bg-white shadow-xl shadow-green-100 translate-x-2"
                  : "border-transparent opacity-60"
              }`}
            >
               <div className={`p-3 rounded-xl ${activeCard === 3 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <FileDown size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-800">
                  One-Click PDF Export
                </h3>
                <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
                  Download your polished resume in high-quality PDF format ready to upload.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Font Import and Base Overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        #features {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Features;