import React, { useState, useEffect } from 'react';
import api from '../configs/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'react-hot-toast';

const ATSCheckerPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch user resumes on mount to fill the dropdown
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get('/api/resumes/my-resumes'); // Adjust to your route
        setResumes(data);
      } catch (err) {
        toast.error("Could not load your resumes");
      }
    };
    fetchResumes();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedResumeId || !jobDescription) {
      return toast.error("Please select a resume and paste a job description");
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/ai/ats-check', {
        resumeId: selectedResumeId,
        jobDescription
      });
      setResult(data);
      toast.success("Analysis Complete!");
    } catch (error) {
      toast.error("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ATS Optimization Hub</h1>
        <p className="text-gray-600">Select a resume and compare it against any job description.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <label className="block text-sm font-semibold mb-2">1. Choose Your Resume</label>
            <select 
              className="w-full p-2 border rounded-md bg-gray-50"
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
            >
              <option value="">-- Select Resume --</option>
              {resumes.map(r => (
                <option key={r._id} value={r._id}>{r.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <label className="block text-sm font-semibold mb-2">2. Target Job Description</label>
            <textarea 
              className="w-full h-64 p-3 border rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Analyzing..." : "Calculate ATS Score"}
            </button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-2">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-white p-10 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-400">Results will appear here</h3>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Score Card */}
              <div className="bg-white p-8 rounded-xl shadow-sm border flex flex-col md:flex-row items-center gap-8">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar 
                    value={result.score} 
                    text={`${result.score}%`} 
                    styles={buildStyles({
                      pathColor: result.score > 70 ? '#10b981' : '#f59e0b',
                      textColor: '#1f2937',
                      textSize: '20px'
                    })}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Match Analysis</h2>
                  <p className="text-gray-600 mt-2">{result.analysis}</p>
                </div>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                    <span className="mr-2">💡</span> Improvement Tips
                  </h3>
                  <ul className="space-y-2">
                    {result.suggestions?.map((s, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-2">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keyword Card (What you asked for) */}
                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                  <h3 className="font-bold text-indigo-800 mb-3 flex items-center">
                    <span className="mr-2">🔑</span> High-Impact Keywords
                  </h3>
                  <p className="text-xs text-indigo-600 mb-4">Adding these to your resume could increase your score significantly:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.missing_keywords?.map((kw, i) => (
                      <span key={i} className="bg-white border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSCheckerPage;