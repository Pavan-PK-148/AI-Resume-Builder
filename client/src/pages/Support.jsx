import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  LifeBuoy, 
  Search, 
  ChevronDown, 
  ArrowLeft, 
  Send, 
  Zap, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';

const FAQ_ITEMS = [
  {
    question: "How does the AI Resume Builder work?",
    answer: "Our builder uses OpenAI's advanced language models to analyze your input and suggest professional, industry-specific bullet points and summaries that are optimized for ATS (Applicant Tracking Systems)."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Yes! Once you've finished designing your resume, you can export it as a high-quality PDF. PRO users have access to unlimited downloads and premium templates."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your data. We do not sell your personal information to third parties, and you can delete your data at any time."
  },
  {
    question: "How do I cancel my PRO subscription?",
    answer: "You can manage or cancel your subscription at any time through your Account Settings. Your PRO features will remain active until the end of your current billing cycle."
  }
];

const Support = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-start mb-8">
            <Link to="/app" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
            <LifeBuoy size={14} /> Support Center
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How can we <span className="text-green-600">help you?</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-10 font-medium">
            Search our knowledge base or get in touch with our team of experts.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="Search for answers (e.g., 'PDF download', 'AI limit')..." 
              className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-green-500 outline-none transition-all font-bold text-slate-800 shadow-inner"
            />
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: FAQ ACCORDION --- */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <Zap className="text-green-600" /> Frequently Asked Questions
            </h2>
            
            {FAQ_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white border rounded-[2rem] overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-green-300 shadow-xl shadow-green-100/50' : 'border-slate-200'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group"
                >
                  <span className={`font-black text-lg ${openFaq === index ? 'text-green-600' : 'text-slate-800'}`}>
                    {item.question}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-green-600' : 'text-slate-400'}`} />
                </button>
                <div className={`px-8 transition-all duration-300 ease-in-out ${openFaq === index ? 'pb-8 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- RIGHT: CONTACT FORM & CARDS --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 size-32 bg-green-500/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageSquare className="text-green-400" /> Need more help?
              </h3>
              <p className="text-slate-400 mb-8 font-medium">
                Our support team is available Monday—Friday, 9 AM to 6 PM IST.
              </p>
              
              <form className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-green-400 outline-none transition-all placeholder:text-slate-500"
                />
                <textarea 
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-green-400 outline-none transition-all placeholder:text-slate-500"
                ></textarea>
                <button className="w-full py-4 bg-green-600 text-white rounded-xl font-black text-sm hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2">
                  Send Message <Send size={16} />
                </button>
              </form>
            </div>

            {/* Alternative Links */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-green-300 transition-all group">
                <Mail className="text-slate-400 group-hover:text-green-600 mb-3" />
                <h4 className="font-bold text-slate-800">Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">support@pavandev.com</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-green-300 transition-all group">
                <ShieldCheck className="text-slate-400 group-hover:text-green-600 mb-3" />
                <h4 className="font-bold text-slate-800">Report Bug</h4>
                <p className="text-xs text-slate-500 mt-1">Found an issue?</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;