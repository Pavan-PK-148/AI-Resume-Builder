import React, { useState } from 'react';
import { ShieldCheck, FileText, Scale, Lock, Cpu, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/home/Footer';

const PrivacyAndTerms = () => {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'

  const lastUpdated = "March 21, 2026";
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/app" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold mb-6 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Legal & <span className="text-green-600">Compliance</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium text-lg">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* --- TAB NAVIGATION --- */}
        <div className="flex p-1 bg-slate-200 rounded-2xl mb-12 w-full md:w-fit">
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'privacy' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ShieldCheck size={18} /> Privacy Policy
          </button>
          <button 
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'terms' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Scale size={18} /> Terms of Service
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-200 shadow-xl shadow-slate-200/50">
          
          {activeTab === 'privacy' ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Lock className="text-green-600" /> Data Protection
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Your privacy is our priority. We collect only the information necessary to provide you with a high-quality resume-building experience, including your contact details, work history, and education.
                </p>
              </section>

              {/* AI Clause Section */}
              <section className="p-8 bg-green-50 rounded-3xl border border-green-100 border-l-8 border-l-green-600">
                <h3 className="text-xl font-black text-green-900 flex items-center gap-3 mb-3">
                  <Cpu /> AI Content Enhancement
                </h3>
                <p className="text-green-800/80 font-medium leading-relaxed">
                  To provide professional-grade content suggestions and grammar corrections, we integrate with <strong>OpenAI technologies</strong>. By using our "AI Enhance" features, you acknowledge that relevant portions of your resume data may be processed via OpenAI's API to generate improvements. We do not use your personal data to train public AI models.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900">How We Use Your Data</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                    {['Account Management', 'Resume Storage', 'Template Customization', 'AI Suggestions'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 font-bold">
                            <CheckCircle2 className="text-green-500" size={18} /> {item}
                        </li>
                    ))}
                </ul>
              </section>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <FileText className="text-green-600" /> Usage Agreement
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  By accessing this platform, you agree to provide accurate information. You are responsible for the content you generate and for maintaining the security of your account.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Pro Access & Payments</h2>
                <p className="text-slate-600 leading-relaxed">
                  Certain templates and AI features require "PRO Access." Payments are processed securely via our payment partners. Subscriptions can be managed or cancelled at any time through your dashboard settings.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900">AI Accuracy Disclaimer</h2>
                <p className="text-slate-600 leading-relaxed italic">
                  While our AI enhancement (powered by OpenAI) is highly advanced, users are encouraged to review all generated content for accuracy. We are not responsible for errors or omissions in the final resume documents.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* --- HELP SECTION --- */}
        <div className="mt-12 text-center p-8 bg-slate-900 rounded-[2rem] text-white">
            <h3 className="text-xl font-bold mb-2">Have questions about our legal terms?</h3>
            <p className="text-slate-400 mb-6 font-medium">We're here to help you understand your rights.</p>
            <button onClick={()=> navigate("/support")} className="bg-green-600 hover:bg-green-700 text-white font-black px-8 py-3 rounded-xl transition-all shadow-lg shadow-green-900/40">
                Contact Legal Support
            </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyAndTerms;