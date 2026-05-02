import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Sparkles, Wand2, ArrowRight, CheckCircle, Cpu } from 'lucide-react';
import Footer from '../components/home/Footer';

const AIRewriter = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAction = () => {
        isLoggedIn ? navigate('/app') : navigate('/app?state=login');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Navigation */}
            <nav className="flex justify-between items-center px-10 md:px-20 py-6 border-b border-slate-50">
                <Link to="/"><img src="/logo.svg" alt="logo" className="h-8" /></Link>
                <button onClick={() => navigate('/app')} className="text-sm font-bold text-green-600">Go to Dashboard</button>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-green-50/50 to-white">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-green-100 px-4 py-2 rounded-full mb-8 animate-bounce">
                        <Sparkles size={16} className="text-green-500" />
                        <span className="text-xs font-bold uppercase text-slate-600">Next-Gen AI Writing</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
                        Turn Bullet Points into <br/>
                        <span className="text-green-600">Career Milestones.</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Our AI analyzes 10 million+ successful resumes to help you rephrase average work history into high-impact, metric-driven statements that recruiters crave.
                    </p>
                    <button 
                        onClick={handleAction}
                        className="bg-slate-900 hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl flex items-center gap-3 mx-auto"
                    >
                        Rewrite My Resume Now <ArrowRight />
                    </button>
                </div>
            </section>

            {/* Detailed Feature breakdown */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">How our AI Engine works</h2>
                            <p className="text-slate-500">Unlike basic spell-checkers, our engine uses Natural Language Processing (NLP) to understand the context of your industry.</p>
                        </div>
                        
                        <div className="space-y-8">
                            {[
                                { icon: <Wand2 className="text-green-600"/>, title: "Action Verb Enhancement", text: "We swap passive words like 'managed' for 'orchestrated', 'spearheaded', or 'architected'." },
                                { icon: <Cpu className="text-green-600"/>, title: "Semantic Analysis", text: "The AI ensures your tone matches the seniority of the role you are applying for." },
                                { icon: <CheckCircle className="text-green-600"/>, title: "Metric Auto-Suggestion", text: "Don't have numbers? Our AI suggests industry-standard KPIs to add to your bullets." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Mockup */}
                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-3xl"></div>
                        <div className="space-y-8 relative z-10">
                            <div className="pb-8 border-b border-slate-800">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Original Input</span>
                                <p className="mt-4 text-slate-400 italic">"I was in charge of a team and we sold a lot of software last year."</p>
                            </div>
                            <div className="pt-4">
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Zap size={10} fill="currentColor"/> AI Rewritten Result
                                </span>
                                <p className="mt-4 text-lg font-medium leading-relaxed">
                                    "Spearheaded a cross-functional sales team of 12, driving a <span className="text-green-400">45% increase in SaaS revenue</span> and surpassing annual targets by $1.2M."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AIRewriter;