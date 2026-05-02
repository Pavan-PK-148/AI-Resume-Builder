import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart3, Target, Search, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import Footer from '../components/home/Footer';

const KeywordAnalysis = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAction = () => {
        isLoggedIn ? navigate('/app') : navigate('/app?state=login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Simple Navigation */}
            <nav className="flex justify-between items-center px-10 md:px-20 py-6 bg-white border-b border-slate-100">
                <Link to="/"><img src="/logo.svg" alt="logo" className="h-8" /></Link>
                <Link to="/app" className="text-sm font-bold text-slate-600 hover:text-green-600">Back to Dashboard</Link>
            </nav>

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                                Find the <span className="text-green-600 text-shadow-sm">Missing Links</span> in your profile.
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our Deep Analysis tool cross-references your resume against 50,000+ job descriptions in our database to find exactly which industry keywords are missing from your text.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="p-1 bg-green-100 rounded-full text-green-600"><ShieldCheck size={16}/></div>
                                    Identify Hard & Soft Skill Gaps
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="p-1 bg-green-100 rounded-full text-green-600"><ShieldCheck size={16}/></div>
                                    Real-time Keyword Density Scoring
                                </div>
                            </div>
                            <button onClick={handleAction} className="bg-green-600 hover:bg-slate-900 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg">
                                Start Deep Analysis
                            </button>
                        </div>

                        {/* Interactive Data Card */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-black text-slate-800">Keyword Density</h3>
                                    <BarChart3 className="text-green-500" />
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { label: "Cloud Computing", val: "85%", color: "bg-green-500" },
                                        { label: "Team Leadership", val: "40%", color: "bg-amber-400" },
                                        { label: "Agile Scrum", val: "15%", color: "bg-red-400" },
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                                <span>{item.label}</span>
                                                <span>{item.val} Match</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: item.val }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10 p-4 bg-green-50 border border-green-100 rounded-2xl flex gap-3 items-center">
                                    <Info className="text-green-600" size={20}/>
                                    <p className="text-xs text-green-800 leading-relaxed font-medium">
                                        Tip: Adding <strong>"Agile Scrum"</strong> to your summary will increase your match rate by 22% for this role.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default KeywordAnalysis;