import React from 'react';
import { ArrowRight, CheckCircle2, Copy, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

const OptimizationResult = ({ original, optimized, changes, scoreLift }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(optimized);
        toast.success("Optimized resume copied!");
    };

    // Helper to turn AI paragraph text into readable blocks/bullets
    const formatOptimizedText = (text) => {
        if (!text) return null;
        // Splits by new lines or bullet symbols returned by AI
        return text.split(/\n|•|\*/).filter(line => line.trim().length > 0).map((line, i) => (
            <div key={i} className="flex gap-3 mb-3 items-start">
                <div className="min-w-[6px] h-[6px] bg-green-500 rounded-full mt-2" />
                <p className="text-slate-800 leading-relaxed">{line.trim()}</p>
            </div>
        ));
    };

    return (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header - Kept your design */}
            <div className="bg-slate-900 rounded-3xl p-6 flex items-center justify-between text-white shadow-xl shadow-slate-200">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500 rounded-2xl shadow-lg shadow-green-500/20">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Optimization Success</h3>
                        <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">AI Rewrite Complete</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</p>
                        <span className="text-xl font-bold text-slate-300">Boosted</span>
                    </div>
                    <ArrowRight className="text-slate-600" />
                    <div className="text-center">
                        <p className="text-[10px] text-green-400 font-bold uppercase mb-1">New Score</p>
                        <span className="text-2xl font-black text-green-400">{scoreLift}%</span>
                    </div>
                </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Original Context</label>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-[550px] overflow-y-auto text-sm text-slate-500 leading-relaxed font-medium whitespace-pre-wrap">
                        {original}
                    </div>
                </div>
                
                <div className="space-y-3 relative">
                    <label className="text-[11px] font-black text-green-600 uppercase tracking-widest px-2 flex justify-between items-center">
                        AI Optimized Version
                        <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors capitalize tracking-normal bg-white px-3 py-1 rounded-lg border border-green-100 shadow-sm">
                            <Copy size={14} /> Copy Text
                        </button>
                    </label>
                    <div className="bg-white border-2 border-green-100 rounded-2xl p-6 h-[550px] overflow-y-auto text-sm shadow-sm shadow-green-100/50">
                        {/* THE FIX: Rendered as Points */}
                        {formatOptimizedText(optimized)}
                    </div>
                </div>
            </div>

            {/* Changelog Section - Kept your UI exactly as requested */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8">
                <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={20} />
                    Strategic Improvements Made
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {changes.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:border-green-100 transition-colors">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Change #{idx + 1}</p>
                            <div className="space-y-2">
                                <p className="text-xs text-red-400 line-through">"{item.before}"</p>
                                <p className="text-sm text-slate-800 font-bold">"{item.after}"</p>
                                <p className="text-[11px] text-slate-500 italic mt-2">Reason: {item.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OptimizationResult;