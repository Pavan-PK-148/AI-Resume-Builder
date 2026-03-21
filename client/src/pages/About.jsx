import React from 'react'
import { CheckCircle2, Award, Briefcase, BrainCircuit, Target, Sparkles, Send, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import profile from "../assets/profile.png"

const About = () => {
  return (
    <section id="about" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">

        {/* --- BACK BUTTON --- */}
        <div className="mb-10">
          <Link 
            to="/app" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold transition-colors group"
          >
            <div className="p-2 rounded-full bg-slate-50 group-hover:bg-green-50 transition-colors">
              <ArrowLeft size={18} />
            </div>
            Back to Dashboard
          </Link>
        </div>
        
        {/* --- SECTION HEADER --- */}
       <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
        <BrainCircuit size={14} /> Meet the Developer
    </div>
    
    <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
        Behind the Code: <span className="text-green-600 whitespace-nowrap">Pavan Kalyan Srinivas Robba</span>
    </h2>
    
    <p className="text-slate-500 text-lg">
        Crafting scalable solutions with modern tech stacks, driven by a passion for AI and Full-Stack development.
    </p>
</div>

        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* --- LEFT PANEL: Profile & Quick Stats --- */}
            <div className="md:col-span-5 lg:col-span-4 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                
                {/* Profile Photo Area */}
<div className="aspect-square bg-white rounded-full p-2 shadow-lg border-2 border-slate-100 mb-8 relative overflow-hidden group">
    <img 
      src={profile}
      alt="Pavan Robba" 
      className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-xs font-bold bg-slate-900/60 p-2 px-4 rounded-full">Pro Developer</span>
    </div>
</div>

                {/* Resume Highlights (Extracted) */}
                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase mb-3 block">Specialization</p>
                        <div className="flex flex-wrap gap-2">
                            {['MERN Stack', 'Scalable e-Commerce', 'AI-Powered Apps'].map(tag => (
                                <span key={tag} className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900 text-white tracking-tight">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase mb-3 block">Primary Tech Stack</p>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">
                            <span className="font-bold text-green-700">React</span>, Node JS, Express, MongoDB, JavaScript, Java, Python, C
                        </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                        <p className="text-xs font-black text-slate-400 uppercase mb-3 block">Education (2027)</p>
                        <p className="text-slate-800 font-bold">B Tech in CSE</p>
                        <p className="text-sm text-slate-500 font-medium">GITAM University</p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL: Detailed Bio & Vision --- */}
            <div className="md:col-span-7 lg:col-span-8 space-y-12">
                
                <div className="p-8 md:p-10 rounded-3xl bg-green-50 border border-green-100 shadow-xl shadow-green-100/30">
                    <div className="flex items-start gap-4 mb-5">
                        <Briefcase className="text-green-600 size-7 mt-1" />
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 leading-snug">
                                Problem-Solver & Innovative Developer
                            </h3>
                            <p className="text-slate-500 font-medium mt-1">Based in GITAM University</p>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        Currently a highly motivated 3rd-year Computer Science student, I specialize in <span className="font-bold text-green-700">full-stack development</span>. Beyond pure coding, I possess a keen interest in AI and cybersecurity. My focus is on leveraging modern technologies like the MERN stack to engineer robust, scalable full-stack solutions.
                    </p>
                </div>

                {/* Key Attributes Grid */}
                <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Target className="text-green-600" /> Key Attributes
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: "Hands-on Experience", icon: Award, desc: "Frontend & MERN Stack Internships at ApexPlanet & UptoSkills." },
                            { title: "AI Integration", icon: Sparkles, desc: "Developing AI-powered tools like AI.Resume Builder." },
                            { title: "Robust Engineering", icon: CheckCircle2, desc: "Focus on secure user authentication and scalable order processing." },
                            { title: "E-Commerce Expert", icon: Briefcase, desc: "Built dynamic platforms like CashewKart." },
                        ].map(item => (
                            <div key={item.title} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm group hover:border-green-300 transition-all">
                                <item.icon className="text-slate-400 group-hover:text-green-600 size-6 mt-0.5 transition-colors" />
                                <div>
                                    <h5 className="font-bold text-slate-900 group-hover:text-green-700">{item.title}</h5>
                                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="pt-10 text-center">
                    <p className="text-slate-500 mb-4 font-medium italic">"Passion for development, commitment to scalability."</p>
                    <button className="flex items-center gap-2 mx-auto px-8 py-4 bg-green-600 text-white rounded-xl font-black text-lg shadow-xl shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all">
                        <Send size={20} /> Let's Build Something
                    </button>
                </div>

            </div>

        </div>
      </div>
    </section>
  )
}

export default About