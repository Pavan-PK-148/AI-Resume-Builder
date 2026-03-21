import { Sparkles } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import api from '../configs/api';

const ProfessionalSummaryForm = ({data, onChange}) => {

  const handleEnhance = async () => {
  if (!data || data.length < 10) {
    return toast.error("Please write a bit more before enhancing!");
  }

  const toastId = toast.loading("AI is polishing your summary...");
  
  try {
    // 1. Get the token from localStorage
    const token = localStorage.getItem('token');

    // 2. Pass the token in the headers of the POST request
    const { data: res } = await api.post('/api/ai/enhance-pro-sum', 
      { userContent: data }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // 3. Update the UI with the AI-generated content
    if (res.enhancedContent) {
      onChange(res.enhancedContent);
      toast.success("Summary enhanced!", { id: toastId });
    }
  } catch (error) {
    console.error("AI Enhance Error:", error);
    // 4. Show a more specific error message if available
    const errorMsg = error.response?.data?.message || "AI service is busy. Try again later.";
    toast.error(errorMsg, { id: toastId });
  }
};

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
         <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-500'>Add summary for your resume here</p>
         </div>
         <button onClick={handleEnhance} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
          <Sparkles size={18}/> 
          AI Enhance
         </button>
      </div>

      <div className='mt-6'>
        <textarea value={data || ""} onChange={(e)=> onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500
         focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key stranghts and career objectives...'/>
         <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it consise (3-4 sentences) nad focus on your most relevant achievements and skills.</p>

      </div>

    </div>
  )
}

export default ProfessionalSummaryForm