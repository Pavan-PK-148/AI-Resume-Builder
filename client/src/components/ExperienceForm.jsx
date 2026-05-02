import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import api from '../configs/api'; // Ensure this path is correct
import { useState } from 'react';

const ExperienceForm = ({ data, onChange }) => {

  const [isEnhancing, setIsEnhancing] = useState(false);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleEnhanceJob = async (index) => {
    const currentDescription = data[index].description;
    
    if (!currentDescription || currentDescription.length < 10) {
      return toast.error("Write a bit more before enhancing!");
    }

    const toastId = toast.loading("AI is polishing your text...");
    try {
      const { data: res } = await api.post('/api/ai/enhance-job-desc', 
        { userContent: currentDescription }
        // No need to manually add headers if your 'api' (axios instance) handles it
      );

      if (res.enhancedContent) {
        const updated = [...data];
        updated[index].description = res.enhancedContent;
        onChange(updated);
        toast.success("ATS Optimized!", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.status === 429 
        ? "Rate limit reached. Wait 60 seconds." 
        : "Optimization failed. Try again.";
      
      toast.error(errorMsg, { id: toastId });
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
            <p className='text-sm text-gray-500'>Add your job history here</p>
          </div>
          <button onClick={addExperience} type="button" className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
            <Plus size={18} />
            Add Experience
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <p>No work experience added yet.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((experience, index) => (
            <div key={index} className='p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-3'>
              <div className='flex justify-between items-start border-b pb-2'>
                <h4 className='font-medium text-gray-700'>Job #{index + 1}</h4>
                <button onClick={() => removeExperience(index)} type="button" className='text-red-400 hover:text-red-600 transition-colors'>
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <input value={experience.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)}
                  type="text" placeholder='Company Name' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />

                <input value={experience.position || ""} onChange={(e) => updateExperience(index, "position", e.target.value)}
                  type="text" placeholder='Job Title (e.g. Senior Developer)' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />

                <div className='flex flex-col'>
                    <label className='text-[10px] text-gray-400 ml-1'>Start Date</label>
                    <input value={experience.start_date || ""} onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                    type="month" className='px-3 py-2 text-sm border border-gray-300 rounded-lg' />
                </div>

                <div className='flex flex-col'>
                    <label className='text-[10px] text-gray-400 ml-1'>End Date</label>
                    <input value={experience.end_date || ""} onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                    type="month" disabled={experience.is_current} className='px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50' />
                </div>
              </div>

              <label className='flex items-center gap-2 cursor-pointer w-fit'>
                <input type="checkbox" checked={experience.is_current || false} onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                <span className='text-xs text-gray-600 font-medium'>Currently working here</span>
              </label>

              <div className='space-y-2 pt-2'>
                <div className='flex items-center justify-between'>
                  <label className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Job Description</label>
                  <button type="button" onClick={() => handleEnhanceJob(index)} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded

hover:bg-purple-200 transition-colors disabled:opacity-50'>

<Sparkles className='w-3 h-3'/>

Enhance with AI

</button>
                </div>
                <textarea 
                    value={experience.description || ""} 
                    onChange={(e) => updateExperience(index, "description", e.target.value)} 
                    rows={5} 
                    className='w-full text-sm px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-1 focus:ring-blue-500 outline-none' 
                    placeholder='E.g. Led a team of 5 to develop a React-based dashboard, improving load times by 40%...'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm