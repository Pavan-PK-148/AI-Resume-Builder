import React, { useState, useEffect } from 'react';
import api from '../configs/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Sparkles, Search, FileText, CheckCircle2, AlertCircle, Upload, BarChart2, Zap, ArrowRight, Copy } from 'lucide-react';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'react-hot-toast';

// --- SUB-COMPONENT: OptimizationResult ---
const OptimizationResult = ({ original, optimized, changes, scoreLift }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(optimized);
        toast.success("Optimized resume copied!");
    };

    return (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Score Comparison Header */}
            <div className="bg-slate-900 rounded-3xl p-6 flex items-center justify-between text-white shadow-xl">
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
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 h-[400px] overflow-y-auto text-sm text-slate-500 leading-relaxed">
                        {original}
                    </div>
                </div>
                <div className="space-y-3 relative">
                    <label className="text-[11px] font-black text-green-600 uppercase tracking-widest px-2 flex justify-between items-center">
                        AI Optimized Version
                        <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors capitalize tracking-normal bg-white px-2 py-1 rounded-md border shadow-sm">
                            <Copy size={14} /> Copy Text
                        </button>
                    </label>
                    <div className="bg-white border-2 border-green-100 rounded-2xl p-5 h-[400px] overflow-y-auto text-sm text-slate-800 leading-relaxed shadow-sm">
                        {optimized}
                    </div>
                </div>
            </div>

            {/* Changelog Section */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6">
                <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={20} />
                    Strategic Improvements Made
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {changes && changes.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Change #{idx + 1}</p>
                            <div className="space-y-2">
                                <p className="text-xs text-red-400 line-through italic">"{item.before}"</p>
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

// --- MAIN COMPONENT ---
const ATSScanner = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadMode, setUploadMode] = useState('saved'); 
    const [file, setFile] = useState(null);
    const [jobDesc, setJobDesc] = useState(() => localStorage.getItem('ats_job_desc') || '');
    const [optimizationData, setOptimizationData] = useState(null);
    const [optimizing, setOptimizing] = useState(false);

    const [result, setResult] = useState(() => {
        const savedResult = localStorage.getItem('ats_result');
        return savedResult ? JSON.parse(savedResult) : null;
    });

    useEffect(() => {
        localStorage.setItem('ats_job_desc', jobDesc);
    }, [jobDesc]);

    useEffect(() => {
        if (result) localStorage.setItem('ats_result', JSON.stringify(result));
    }, [result]);

    const handleReset = () => {
        setJobDesc('');
        setResult(null);
        setFile(null);
        setOptimizationData(null);
        localStorage.removeItem('ats_job_desc');
        localStorage.removeItem('ats_result');
        toast.success("Scanner cleared");
    };

    useEffect(() => {
        const loadResumes = async () => {
            try {
                const { data } = await api.get('/api/resumes/list'); 
                const actualData = Array.isArray(data) ? data : (data.resumes || []);
                setResumes(actualData);
                if (actualData.length > 0) setSelectedId(actualData[0]._id);
            } catch (err) {
                setResumes([]);
            }
        };
        loadResumes();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile?.type === 'application/pdf') {
            setFile(selectedFile);
            toast.success(`Selected: ${selectedFile.name}`);
        } else {
            toast.error("Please upload a PDF file");
        }
    };

    const handleRunAnalysis = async () => {
        if (!jobDesc.trim()) return toast.error("Please paste a job description!");
        setLoading(true);
        setOptimizationData(null); // Clear old optimization when running new scan
        try {
            let response;
            if (uploadMode === 'saved') {
                response = await api.post('/api/ai/ats-check', { resumeId: selectedId, jobDescription: jobDesc });
            } else {
                if (!file) return toast.error("Please upload a file first!");
                const formData = new FormData();
                formData.append('resume', file);
                formData.append('jobDescription', jobDesc);
                response = await api.post('/api/ai/ats-check-instant', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setResult(response.data);
            toast.success("Analysis Complete!");
        } catch (error) {
            toast.error("Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOptimize = async () => {
    setOptimizing(true);
    
    // Capture the original text before the API call
    const textToOptimize = result.extractedText || "Original Resume Content";

    try {
        const { data } = await api.post('/api/ai/optimize-resume', {
            jobDescription: jobDesc,
            resumeText: textToOptimize 
        });
        setOptimizationData({
            ...data,
            originalText: textToOptimize
        });
        
        toast.success("Resume Optimized!");
    } catch (error) {
        toast.error("Optimization failed.");
    } finally {
        setOptimizing(false);
    }
};

    return (
        <div className="max-w-6xl mx-auto space-y-6 mb-20">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                {/* Header Area */}
                <div className="p-8 border-b border-slate-50 bg-gradient-to-r from-slate-50/50 to-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-100 text-green-600 rounded-xl shadow-sm">
                            <Search size={22} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Smart ATS Scanner</h2>
                        </div>
                    </div>
                    {(jobDesc || result) && (
                        <button 
                            onClick={handleReset}
                            className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all uppercase tracking-widest"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Left Side: Setup */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
                                    <FileText size={16} className="text-slate-400" />
                                    1. Select Target Resume
                                </label>

                                <div className="flex bg-slate-100 p-1 rounded-xl mb-4 border border-slate-200/50">
                                    <button 
                                        onClick={() => setUploadMode('saved')}
                                        className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all ${uploadMode === 'saved' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        SAVED RESUMES
                                    </button>
                                    <button 
                                        onClick={() => setUploadMode('upload')}
                                        className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all ${uploadMode === 'upload' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        UPLOAD NEW PDF
                                    </button>
                                </div>

                                {uploadMode === 'saved' ? (
                                    <select 
                                        value={selectedId}
                                        onChange={(e) => setSelectedId(e.target.value)}
                                        className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50/50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all text-slate-600 font-medium cursor-pointer appearance-none"
                                    >
                                        <option value="">-- Choose from your library --</option>
                                        {resumes.map(r => <option key={r._id} value={r._id}>{r.title}</option>)}
                                    </select>
                                ) : (
                                    <div 
                                        onClick={() => document.getElementById('fileInput').click()}
                                        className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 cursor-pointer transition-all group"
                                    >
                                        <input type="file" id="fileInput" hidden onChange={handleFileChange} accept=".pdf" />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-green-100 transition-colors">
                                                <Upload className="text-slate-400 group-hover:text-green-600" size={24} />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {file ? file.name : "Click to upload or drag & drop"}
                                            </p>
                                            <p className="text-xs text-slate-400 font-medium">PDF only (Max 5MB)</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
                                    <Sparkles size={16} className="text-slate-400" />
                                    2. Paste Job Description
                                </label>
                                <textarea 
                                    className="w-full h-72 p-5 border border-slate-200 rounded-2xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none text-sm leading-relaxed font-medium"
                                    placeholder="Paste the job requirements here..."
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>

                            <button 
                                onClick={handleRunAnalysis}
                                disabled={loading || (uploadMode === 'saved' ? !selectedId : !file)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-[0.99] disabled:bg-slate-200 disabled:shadow-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing Match...
                                    </span>
                                ) : "Run AI Analysis"}
                            </button>
                        </div>

                        {/* Right Side: Results */}
                        <div className={`rounded-3xl p-8 transition-all duration-500 ${result ? 'bg-white border border-slate-100 shadow-inner' : 'bg-slate-50/50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[500px]'}`}>
                            {!result ? (
                                <div className="text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300">
                                        <BarChart2 size={32} />
                                    </div>
                                    <p className="text-slate-400 font-bold max-w-[200px]">Complete the steps to see your match score</p>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                    {/* Score Circle */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-36 h-36 mb-4 drop-shadow-sm">
                                            <CircularProgressbar 
                                                value={result.score <= 1 ? result.score * 100 : result.score} 
                                                text={`${result.score <= 1 ? (result.score * 100).toFixed(0) : result.score}%`} 
                                                styles={buildStyles({
                                                    pathColor: (result.score > 70 || result.score > 0.7) ? '#22c55e' : '#eab308',
                                                    textColor: '#0f172a',
                                                    trailColor: '#f1f5f9',
                                                    strokeLinecap: 'round',
                                                    textSize: '16px'
                                                })}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Analysis Result</h3>
                                        <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium px-2">{result.analysis}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-green-50/50 border border-green-100/50 rounded-2xl p-5">
                                            <h4 className="text-green-700 text-[11px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <CheckCircle2 size={14} /> Critical Improvements
                                            </h4>
                                            <div className="space-y-2.5">
                                                {result.suggestions?.slice(0, 3).map((s, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <div className="min-w-[6px] h-[6px] bg-green-500 rounded-full mt-1.5" />
                                                        <p className="text-sm text-slate-700 font-medium leading-relaxed">{s}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
                                            <h4 className="text-green-400 text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Sparkles size={14} /> Missing Keywords
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missing_keywords?.map((kw, i) => (
                                                    <span key={i} className="bg-white/10 text-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-white/5 hover:bg-white/20 transition-colors uppercase tracking-wider">
                                                        + {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {!optimizationData ? (
                                            <button 
                                                onClick={handleOptimize}
                                                disabled={optimizing}
                                                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:bg-slate-200 disabled:shadow-none uppercase text-[11px] tracking-[0.1em]"
                                            >
                                                {optimizing ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Processing Rewrite...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap size={16} className="fill-current group-hover:animate-pulse" />
                                                        Optimize Resume for this Job
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-100 rounded-2xl">
                                                <CheckCircle2 size={18} className="text-green-600" />
                                                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Optimization View Active</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RENDER COMPARISON VIEW HERE --- */}
            {optimizationData && (
    <OptimizationResult 
        original={optimizationData.originalText} // Use the text we saved
        optimized={optimizationData.optimizedText}
        changes={optimizationData.keyChanges}
        scoreLift={optimizationData.projectedScore}
    />
)}
        </div>
    );
};

export default ATSScanner;