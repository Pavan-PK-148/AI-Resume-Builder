import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/home/Footer';
import template1 from "../assets/template1.jpeg";
import template2 from "../assets/template2.jpeg";
import template3 from "../assets/template3.jpeg";
import template4 from "../assets/template4.jpeg";

const Templates = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => window.scrollTo(0, 0), []);

  const handleAction = () => isLoggedIn ? navigate('/app') : navigate('/app?state=login');

  const templateList = [
    { id: 1, name: "The Executive", category: "Professional", img: template1, score: "98%", tag: "Popular" },
    { id: 2, name: "Modern Creative", category: "Design", img: template2, score: "95%" },
    { id: 3, name: "Minimalist Mono", category: "Clean", img: template3, score: "97%" },
    { id: 4, name: "Tech Innovator", category: "Engineering", img: template4, score: "96%" },
  ];

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-slate-900">

      {/* NAV */}
      <nav className="flex justify-between px-10 py-6 sticky top-0 bg-white/70 backdrop-blur-xl z-50 border-b border-slate-100">
        <Link to="/"><img src="/logo.svg" className="h-8"/></Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAction}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-xl hover:shadow-green-400/30"
        >
          Start Building
        </motion.button>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-black tracking-tight"
        >
          Pick a <span className="text-green-600">Style</span>.<br/>
          Land the Job.
        </motion.h1>

        <p className="text-slate-500 mt-6">
          Professionally designed templates optimized for ATS & recruiters.
        </p>
      </section>

      {/* GRID */}
      <section className="px-20 py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {templateList.map((temp, index) => (
          
          <motion.div
            key={temp.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}

            whileHover={{
              scale: 1.06,
              y: -10
            }}

            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15
            }}

            className="group relative z-0 hover:z-20"
          >

            {/* CARD */}
            <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-md group-hover:shadow-2xl transition-all duration-500">

              {/* IMAGE */}
              <img 
                src={temp.img}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* POPULAR TAG */}
              {temp.tag && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                  {temp.tag}
                </div>
              )}

              {/* ATS SCORE */}
              <div className="absolute top-4 right-4 bg-white/90 text-slate-900 text-xs px-3 py-1 rounded-full font-bold shadow">
                ATS {temp.score}
              </div>

              {/* OVERLAY */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <motion.button
                  onClick={handleAction}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-green-600 transition-all"
                >
                  Use Template
                </motion.button>
              </motion.div>

              {/* BOTTOM INFO BAR */}
              <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md px-4 py-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-600">
                  Recruiter Approved
                </span>
                <span className="text-xs text-green-600 font-bold">
                  High Success Rate
                </span>
              </div>
            </div>

            {/* TEXT */}
            <div className="mt-5 px-1">
              <h3 className="font-bold text-lg group-hover:text-green-600 transition">
                {temp.name}
              </h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                {temp.category}
              </p>
            </div>

          </motion.div>
        ))}
      </section>

      {/* Final CTA Section */}
<section className="py-10 px-6">
  <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-center border border-slate-800 shadow-xl">

    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
      Build your resume in minutes
    </h2>

    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8">
      AI-powered templates designed to pass ATS and impress recruiters.
    </p>

    {/* Mini Trust Indicators */}
    <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
      <span>ATS Optimized</span>
      <span>Free Templates</span>
      <span>Instant Download</span>
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleAction}
      className="bg-green-500 px-10 py-4 text-slate-900 rounded-xl text-sm font-black shadow-md hover:bg-white hover:text-slate-900 transition-all"
    >
      Start Building
    </motion.button>

  </div>
</section>

      <Footer />
    </div>
  );
};

export default Templates;