import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShieldCheck, Zap, BarChart, ArrowRight, MousePointerClick } from 'lucide-react';
import Footer from '../components/home/Footer';

const ATSFeature = () => {
    const navigate = useNavigate();

    // Ensure page starts at top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Branded Header */}
            <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-50">
                <Link to="/"><img src="/logo.svg" alt="logo" className="h-8"/></Link>
                <Link to="/app" className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-slate-900 transition-all">
                    Open App
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="py-15 px-10 md:px-32 bg-gradient-to-b from-green-50/50 to-white">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-widest uppercase">
                            ATS Optimization Engine
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
                            Beat the <span className="text-green-600">Bots</span>. Get the Interview.
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            90% of Fortune 500 companies use an Applicant Tracking System. Our AI scans your resume against job descriptions to ensure you're never "filtered out" again.
                        </p>
                        <button 
                            onClick={() => navigate('/app')}
                            className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl shadow-green-200"
                        >
                            Scan My Resume <ArrowRight size={20}/>
                        </button>
                    </div>

                    {/* Animated Visual */}
                    <div className="lg:w-1/2 w-full bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative">
                        <div className="absolute -top-4 -right-4 bg-green-500 text-slate-900 px-4 py-2 rounded-xl font-black text-sm animate-pulse">
                            98% Match
                        </div>
                        <div className="space-y-4">
                            <div className="h-2 w-full bg-slate-800 rounded"></div>
                            <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                            <div className="py-4 border-y border-slate-800 my-6">
                                <p className="text-green-400 font-mono text-xs mb-2">Analyzing keywords...</p>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Node.js', 'Agile', 'Team Lead'].map(tag => (
                                        <span key={tag} className="text-[10px] bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="h-2 w-5/6 bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-Depth "What we do" Section */}
            <section className="py-15 px-10 md:px-32 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-black text-slate-900">How our Technology Works</h2>
                    <p className="text-slate-500 mt-4">We use proprietary algorithms to simulate recruiter search patterns.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="group space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-green-100 transition-all border border-transparent hover:border-green-100">
                        <div className="bg-white p-4 rounded-2xl w-fit shadow-sm text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Search />
                        </div>
                        <h4 className="font-bold text-xl text-slate-800">Keyword Extraction</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">We pull the most weighted skills from job postings and compare them to your existing bullet points in real-time.</p>
                    </div>

                    <div className="group space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-green-100 transition-all border border-transparent hover:border-green-100">
                        <div className="bg-white p-4 rounded-2xl w-fit shadow-sm text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <BarChart />
                        </div>
                        <h4 className="font-bold text-xl text-slate-800">Density Score</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Our AI warns you of "keyword stuffing" which can get you shadow-banned, and suggests the perfect density for every skill.</p>
                    </div>

                    <div className="group space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-green-100 transition-all border border-transparent hover:border-green-100">
                        <div className="bg-white p-4 rounded-2xl w-fit shadow-sm text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <ShieldCheck />
                        </div>
                        <h4 className="font-bold text-xl text-slate-800">Formatting Audit</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">We detect invisible tables, images, or fonts that break ATS scanners, ensuring your file is 100% readable by any bot.</p>
                    </div>
                </div>
            </section>

            {/* Stick to the theme with the Footer at the end */}
            <Footer />
        </div>
    );
};

export default ATSFeature;