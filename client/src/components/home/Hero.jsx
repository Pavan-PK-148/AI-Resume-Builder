import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../app/features/authSlice';
import toast from 'react-hot-toast';
// Importing one of your templates to use in the hero visual
import template1 from "../../assets/template1.jpeg";

const Hero = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { user } = useSelector(state => state.auth);

    const formData = { email: 'guest@example.com' };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mockUser = { name: "Test User", email: formData.email };
        const mockToken = "fake-token-123";

        dispatch(login({ user: mockUser, token: mockToken }));
        localStorage.setItem('token', mockToken);
        
        toast.success("Login Successful!");
        navigate('/app'); 
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#FDFEFF]">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ABFF7E]/20 to-transparent -z-10" />
            
            <nav className="flex items-center justify-between px-6 py-6 md:px-16 lg:px-24">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 p-2 rounded-lg">
                        <div className="w-4 h-4 bg-[#ABFF7E] rounded-sm animate-pulse" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">AI.Resume</span>
                </div>
                
                <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                    <a href="#features" className="hover:text-green-600 transition-colors">Templates</a>
                    <Link to="/about" className="hover:text-green-600 transition-colors">About</Link>
                </div>

                <div className="flex gap-3">
                    {!user ? (
                        <Link to='/app?state=login' className="px-6 py-2.5 rounded-full font-semibold border border-slate-200 hover:bg-slate-50 transition-all">
                            Login
                        </Link>
                    ) : (
                        <Link to='/app' className="px-6 py-2.5 bg-green-600 text-white rounded-full font-semibold shadow-lg shadow-green-200">
                            Dashboard
                        </Link>
                    )}
                </div>
            </nav>

            <div className="container mx-auto px-6 pt-16 lg:pt-24 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1.5 bg-[#ABFF7E] text-green-800 rounded-full text-xs font-bold tracking-widest uppercase">
                        Future of Job Hunting
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                        Build a resume <br /> 
                        <span className="relative inline-block">
                            that actually 
                            <span className="absolute bottom-2 left-0 w-full h-4 bg-[#ABFF7E] -z-10" />
                        </span>
                        works.
                    </h1>

                    <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                        Say goodbye to formatting headaches. Upload your old resume, and let our AI optimize it for ATS and recruiter eyes in seconds.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/app?state=register" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-green-100 transition-all hover:-translate-y-1">
                            Get Started Free
                        </Link>
                        <button className="px-8 py-4 bg-white border border-slate-200 hover:border-green-600 rounded-xl font-bold text-lg transition-all">
                            View Templates
                        </button>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <div className="flex -space-x-2">
                             {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden" />)}
                        </div>
                        <p className="text-sm text-slate-500 font-medium">Join 2,000+ applicants hired this month</p>
                    </div>
                </div>

                {/* --- UPDATED RIGHT SIDE: TEMPLATE PREVIEW --- */}
                <div className="relative h-[500px] hidden lg:block">
                    {/* The Template Image Card */}
                    <div className="absolute top-10 right-10 w-72 h-[400px] bg-white shadow-2xl rounded-2xl border border-slate-100 transform rotate-6 z-10 overflow-hidden">
                        <img 
                            src={template1} 
                            alt="Resume Template" 
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    
                    {/* The Background Accent Card */}
                    <div className="absolute top-20 right-20 w-72 h-[400px] bg-[#ABFF7E] shadow-2xl rounded-2xl border border-green-200 transform -rotate-3 z-0" />
                    
                    {/* Floating AI Tooltip */}
                    <div className="absolute bottom-10 left-0 p-6 bg-white shadow-2xl rounded-2xl border-l-8 border-green-500 z-20 animate-bounce-slow max-w-[280px]">
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">AI Enhancement</p>
                        <p className="text-sm font-bold text-slate-800 leading-tight">
                            "Enhanced professional summary with high-impact keywords."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero