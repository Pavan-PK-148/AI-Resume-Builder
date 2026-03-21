import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, LayoutDashboard, Clock, FileText, Sparkles, BookOpen, CheckCircle2, ArrowRight,ChevronLeft, ChevronRight, Target } from 'lucide-react'
import React, { useState, useEffect,useRef } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import template1 from "../assets/template1.jpeg";
import template2 from "../assets/template2.jpeg";
import template3 from "../assets/template3.jpeg";
import template4 from "../assets/template4.jpeg";
import template5 from "../assets/template5.jpeg";
import Footer from '../components/home/Footer'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)
  // Standardized Green palette
  const colors = ["#22c55e", "#16a34a", "#15803d", "#166534", "#4ade80"]
  
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()

  // --- LOGIC (UNTOUCHED BACKEND CONNECTIONS) ---
  const loadAllResumes = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/api/resumes/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) { setAllResumes(data.resumes); }
    } catch (error) {
      console.error("Failed to load resumes:", error);
      if (allResumes.length === 0) setAllResumes(dummyResumeData);
    } finally { setIsLoading(false) }
  };

  const scrollRef = useRef(null);

const scroll = (direction) => {
  if (scrollRef.current) {
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth / 2 
      : scrollLeft + clientWidth / 2;
    
    scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }
};

  const createResume = async (event) => {
    event.preventDefault()
    try {
      const { data } = await api.post('/api/resumes/create', { title }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      setShowCreateResume(false)
      navigate(`/app/builder/${Date.now().toString()}`)
      toast.error("Network Error: Entering Demo Mode")
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resume) return toast.error("Select a PDF file");
    const formData = new FormData();
    formData.append('title', title);
    formData.append('resumeFile', resume);
    try {
      const { data } = await api.post('/api/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setAllResumes([...allResumes, data.resume]);
        setShowUploadResume(false);
        setTitle('');
        setResume(null);
        toast.success("Uploaded successfully");
      }
    } catch (error) { toast.error("Upload failed"); }
  };

  const editTitle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/api/resumes/update/${editResumeId}`, { title });
      if (data.success) {
        setAllResumes(prev => prev.map(r => r._id === editResumeId ? { ...r, title: data.resume.title } : r));
        toast.success("Title updated");
        setEditResumeId('');
        setTitle('');
      }
    } catch (error) { toast.error("Update failed"); }
  };

  const deleteResume = async (id) => {
    if (window.confirm("Delete permanently?")) {
      try {
        const { data } = await api.delete(`/api/resumes/delete/${id}`);
        if (data.success) {
          setAllResumes(prev => prev.filter(r => r._id !== id));
          toast.success("Deleted successfully");
        }
      } catch (error) { toast.error("Delete failed"); }
    }
  };

  const TEMPLATES = [
  { id: 'classic', name: 'The Executive', image: template1, desc: 'Clean & Professional' },
  { id: 'modern', name: 'Modern Minimal', image: template2, desc: 'High Contrast' },
  { id: 'creative', name: 'Creative Portfolio', image: template3, desc: 'Visual Heavy' },
  { id: 'ats_friendly', name: 'Standard ATS', image: template4, desc: 'Recruiter Approved' },
  { id: 'dynamic', name: 'Dynamic', image: template5, desc: 'Presentive' },
];

  useEffect(() => { if (token) loadAllResumes(); }, [token]);
  useEffect(() => { if (!user) setAllResumes([]); }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50"> {/* Added flex flex-col */}
      {/* --- PREMIUM GREEN HERO --- */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ... Hero Content ... */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> AI Powered Builder
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, <span className="text-green-600">{user?.name?.split(' ')[0] || 'User'}</span>!
              </h1>
              <p className="text-slate-500 text-lg max-w-xl">
                Ready to land your dream job? Pick up where you left off or start a fresh design.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-5 rounded-2xl border border-green-100 min-w-[140px]">
                <p className="text-3xl font-black text-green-600">{allResumes.length}</p>
                <p className="text-sm font-bold text-green-800/60 uppercase">Saved Docs</p>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl min-w-[140px]">
                <p className="text-white text-sm font-bold opacity-60 uppercase mb-1">Status</p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <div className="size-2 rounded-full bg-green-400 animate-pulse"></div>
                  PRO Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container with flex-grow to push footer down */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        
        {/* --- MAIN ACTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <button 
            onClick={() => setShowCreateResume(true)}
            className="flex items-center justify-between p-8 rounded-3xl bg-green-600 hover:bg-green-700 transition-all shadow-xl shadow-green-200 group"
          >
            <div className="text-left">
              <h3 className="text-white text-2xl font-bold">Create New Resume</h3>
              <p className="text-green-100 mt-1">Start with a professional template</p>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <PlusIcon className="text-white size-8" />
            </div>
          </button>

          <button 
  onClick={() => toast('Feature Coming Soon! ✨', {
    icon: '🚀',
    style: {
      borderRadius: '15px',
      background: '#1e293b',
      color: '#fff',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontWeight: 'bold'
    },
  })}
  className="flex items-center justify-between p-8 rounded-3xl bg-white border border-slate-200 hover:border-green-500 transition-all shadow-sm group"
>
  <div className="text-left">
    <h3 className="text-slate-900 text-2xl font-bold">Upload PDF</h3>
    <p className="text-slate-500 mt-1">Import your existing resume</p>
  </div>
  <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
    <UploadCloudIcon className="text-slate-400 group-hover:text-green-600 size-8 transition-colors" />
  </div>
</button>
        </div>

        {/* --- RECENT DOCUMENTS --- */}
<section className="mb-16 min-h-[300px]">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
      <LayoutDashboard className="text-green-600" /> Recent Resumes
    </h2>
  </div>

  {isLoading ? (
    <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200">
       <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600 border-r-transparent mb-4"></div>
       <p className="text-slate-400 font-bold animate-pulse">Fetching your documents...</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {allResumes && allResumes.length > 0 ? (
        allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];
          return (
            <div key={resume._id || index} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-green-300 transition-all duration-300 relative animate-in fade-in slide-in-from-bottom-2">
              <div 
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="h-48 cursor-pointer flex flex-col items-center justify-center relative transition-colors"
                style={{ background: `${baseColor}10` }} // Slightly more visible background
              >
                <FileText className="size-16 mb-2 transition-transform group-hover:scale-110" style={{ color: baseColor }} />
                
                {/* Actions Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                  <button onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className="p-2 bg-white shadow-lg rounded-xl text-slate-600 hover:text-green-600 hover:scale-110 transition-all">
                    <PencilIcon size={14} />
                  </button>
                  <button onClick={() => deleteResume(resume._id)} className="p-2 bg-white shadow-lg rounded-xl text-slate-600 hover:text-red-600 hover:scale-110 transition-all">
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-slate-50 bg-white">
                <h4 className="font-bold text-slate-800 truncate">{resume.title || 'Untitled Resume'}</h4>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-bold uppercase tracking-widest">
                  <Clock size={10} /> {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : 'Just now'}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        /* Enhanced Empty State */
        <div className="col-span-full py-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center">
           <div className="bg-slate-50 p-6 rounded-full mb-4">
              <FilePenLineIcon size={40} className="text-slate-300" />
           </div>
           <h3 className="text-xl font-bold text-slate-700">No resumes found</h3>
           <p className="text-slate-400 max-w-xs mx-auto mt-2 mb-8">Ready to land your dream job? Create your first professional resume now.</p>
           <button 
             onClick={() => setShowCreateResume(true)}
             className="px-8 py-3 bg-green-600 text-white rounded-xl font-black hover:bg-green-700 transition-all shadow-lg shadow-green-100"
           >
             Start Building
           </button>
        </div>
      )}
    </div>
  )}
</section>

        {/* --- TEMPLATES SECTION --- */}
        <section className="mb-16 relative group/section">
          {/* ... Templates code remains same ... */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <BookOpen className="text-green-600" /> Premium Templates
            </h2>
            <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase">
              {TEMPLATES.length} Styles Available
            </span>
          </div>
          <div className="hidden md:block">
            <button onClick={() => scroll('left')} className="absolute left-[-20px] top-[45%] z-10 bg-white shadow-xl border border-slate-200 p-3 rounded-full text-slate-600 hover:text-green-600 hover:scale-110 transition-all opacity-0 group-hover/section:opacity-100"><ChevronLeft size={24} /></button>
            <button onClick={() => scroll('right')} className="absolute right-[-20px] top-[45%] z-10 bg-white shadow-xl border border-slate-200 p-3 rounded-full text-slate-600 hover:text-green-600 hover:scale-110 transition-all opacity-0 group-hover/section:opacity-100"><ChevronRight size={24} /></button>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth">
            {TEMPLATES.map((temp) => (
              <div key={temp.id} onClick={() => {setTitle(`New ${temp.name} Resume`); setShowCreateResume(true);}} className="min-w-[280px] group cursor-pointer">
                <div className="h-[380px] bg-white rounded-[2.5rem] overflow-hidden relative border-4 border-transparent group-hover:border-green-500 transition-all shadow-md group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img src={temp.image} alt={temp.name} className="w-full h-full object-contain p-4 object-top transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Resume+Preview"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <button className="bg-white text-green-700 font-black py-4 rounded-2xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg active:scale-95"><PlusIcon size={20} /><span>Use Template</span></button>
                  </div>
                </div>
                <div className="mt-5 px-4"><h4 className="font-black text-slate-800 text-lg group-hover:text-green-600 transition-colors tracking-tight">{temp.name}</h4><p className="text-sm text-slate-500 font-bold opacity-70">{temp.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* --- QUICK TIPS --- */}
        <section className="mb-16 bg-green-600 rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
                <h2 className="text-3xl font-black mb-4">Resume Writing Tips</h2>
                <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-green-200 size-5" /> Use strong action verbs (Led, Managed, Built)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-green-200 size-5" /> Quantify your results (Saved 20%, Built 5 apps)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-green-200 size-5" /> Keep it clean and easy to read (1-2 pages)</li>
                </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <p className="text-sm italic font-medium">"This builder helped me land an interview at Google within 2 weeks! The templates are ATS-friendly."</p>
                <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-green-200" />
                    <p className="text-xs font-bold">Alex Johnson, Software Engineer</p>
                </div>
            </div>
        </section>

        {/* --- CAREER PROGRESS & ACTIVITY --- */}
        <section className="mb-20"> {/* Margin bottom for space before footer */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* ... Progress Cards ... */}
                <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-6">
                        <div><h3 className="text-xl font-black text-slate-800">Resume Activity</h3><p className="text-sm text-slate-500 font-medium">Updates across all your documents</p></div>
                        <div className="bg-green-50 p-3 rounded-xl"><Clock className="text-green-600 size-5" /></div>
                    </div>
                    <div className="flex items-end gap-3 h-32 mt-4">
                        {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-slate-100 rounded-t-lg group-hover:bg-green-100 transition-all duration-500 relative" style={{ height: `${height}%` }}>
                                    {height > 75 && <div className="absolute -top-1 left-0 right-0 h-1 bg-green-500 rounded-full animate-pulse" />}
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 size-32 bg-green-500/20 rounded-full blur-3xl" />
                    <div>
                        <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6"><Target className="text-green-400 size-6" /></div>
                        <h3 className="text-xl font-bold mb-2">Profile Strength</h3>
                        <p className="text-slate-400 text-sm">Your primary resume is <span className="text-green-400 font-bold">85% complete</span>. Add a photo to hit 100%.</p>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[85%] rounded-full" /></div>
                        <button onClick={() => allResumes[0] && navigate(`/app/builder/${allResumes[0]._id}`)} className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-green-400 transition-colors flex items-center justify-center gap-2">Improve Now <ArrowRight size={16} /></button>
                    </div>
                </div>
            </div>
        </section>

        {/* --- MODALS --- */}
        {(showCreateResume || showUploadResume || editResumeId) && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => {setShowCreateResume(false); setShowUploadResume(false); setEditResumeId(''); setTitle('')}}>
            {/* Modal Content */}
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                <div className="h-3 bg-green-500 w-full" />
                <div className="p-10">
                    <button className="absolute top-8 right-8 text-slate-400 hover:text-slate-600" onClick={() => {setShowCreateResume(false); setShowUploadResume(false); setEditResumeId(''); setTitle('')}}><XIcon size={28} /></button>
                    <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{editResumeId ? 'Rename' : showUploadResume ? 'Upload PDF' : 'Create New'}</h2>
                    <p className="text-slate-500 mb-8 font-medium">Almost there! Just fill in the details.</p>
                    <form onSubmit={editResumeId ? editTitle : showUploadResume ? uploadResume : createResume} className="space-y-6">
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Resume Title</label>
                            <input autoFocus onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="e.g. My Dream Job Resume" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-500 outline-none transition-all font-bold text-slate-800" required />
                        </div>
                        {showUploadResume && (
                            <div className="relative border-2 border-dashed border-green-200 rounded-2xl p-10 text-center hover:bg-green-50 transition-colors">
                                <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])} />
                                <label htmlFor="resume-input" className="cursor-pointer">
                                    <UploadCloud className="mx-auto size-12 text-green-600 mb-3" />
                                    <p className="text-sm font-black text-slate-700">{resume ? resume.name : "Select your PDF file"}</p>
                                </label>
                            </div>
                        )}
                        <button type="submit" className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all active:scale-95">{editResumeId ? 'Update Resume' : showUploadResume ? 'Upload Now' : 'Create Resume'}</button>
                    </form>
                </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard