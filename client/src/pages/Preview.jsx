import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, LockIcon } from 'lucide-react';
import api from '../configs/api'; // Ensure this path is correct
import Loader from '../components/Loader';
import ResumePreview from '../components/ResumePreview';

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const loadResume = async () => {
    try {
        setIsLoading(true);
        setIsPrivate(false); // Reset state before fetch

        // Ensure the URL matches exactly: /api/resumes/public/YOUR_ID
        const { data } = await api.get(`/api/resumes/public/${resumeId}`);
        
        if (data.success && data.resume) {
            setResumeData(data.resume);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        
        // If the backend returns 403, it means it's private
        if (error.response?.status === 403) {
            setIsPrivate(true);
        } else if (error.response?.status === 404) {
            setResumeData(null); // This will show your 404 UI
        }
    } finally {
        setIsLoading(false);
    }
}

  useEffect(() => {
    if (resumeId) loadResume();
  }, [resumeId]);

  if (isLoading) return <div className='h-screen flex items-center justify-center'><Loader /></div>;

  // Case 1: Resume is Private
  if (isPrivate) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-slate-50 px-4 text-center'>
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center'>
            <LockIcon className='size-12 text-slate-400 mb-4' />
            <h2 className='text-2xl font-bold text-slate-800'>This Resume is Private</h2>
            <p className='text-slate-500 mt-2 max-w-sm'>The owner has not made this resume public yet. If this is yours, enable "Public" mode in the editor.</p>
            <Link to="/app" className='mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all'>
                Back to Dashboard
            </Link>
        </div>
      </div>
    );
  }

  // Case 2: Resume Found and Public
  return resumeData ? (
    <div className='bg-slate-100 min-h-screen'>
       {/* Small header for the public view */}
       <div className='bg-white border-b border-slate-200 py-3 px-4 sticky top-0 z-10 print:hidden'>
          <div className='max-w-5xl mx-auto flex justify-between items-center'>
             <span className='text-sm font-medium text-slate-600'>Viewing Resume: {resumeData.title}</span>
             <button onClick={() => window.print()} className='text-sm bg-slate-800 text-white px-4 py-1.5 rounded hover:bg-slate-900 transition-all'>
                Download as PDF
             </button>
          </div>
       </div>

       <div className='max-w-4xl mx-auto py-10 px-4'>
         <div className='bg-white shadow-xl rounded-sm'>
            <ResumePreview 
              data={resumeData} 
              template={resumeData.template} 
              accentColor={resumeData.accent_color}
            />
         </div>
       </div>
    </div>
  ) : (
    // Case 3: Resume Not Found
    <div className='flex flex-col items-center justify-center h-screen bg-slate-50'>
      <p className='text-center text-4xl text-slate-300 font-bold'>404</p>
      <p className='text-xl text-slate-500 font-medium'>Resume not found</p>
      <Link to="/" className='mt-6 flex items-center gap-2 text-blue-600 hover:underline'>
        <ArrowLeftIcon size={16}/> Go to home page
      </Link>
    </div>
  );
}

export default Preview;