import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data, onChange}) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field : "",
            graduation_date : "",
            gpa : "",
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i)=>i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

  return (
    <div className='space-y-6'>
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-500'>Add your academic background</p>
                </div>
                <button 
                    type="button" 
                    onClick={addEducation} 
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'
                >
                    <Plus size={18}/> 
                    Add Education
                </button>
            </div>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-100 rounded-xl'>
              <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
              <p>No education added yet.</p>
            </div>
        ): (
            <div className='space-y-4'>
              {data.map((education, index)=> (
                <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm'>
                   <div className='flex justify-between items-start border-b pb-2'>
                       <h4 className='text-sm font-medium text-gray-600'>Education #{index + 1}</h4>
                       <button 
                            type="button" 
                            onClick={()=> removeEducation(index)} 
                            className='text-red-400 hover:text-red-600 transition-colors'
                        >
                            <Trash2 className='size-4'/>
                       </button>
                   </div>

                   <div className='grid md:grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium text-gray-700'>Institution</label>
                        <input value={education.institution || ""} onChange={(e)=> updateEducation(index, "institution", e.target.value)} 
                        type="text" placeholder='e.g., Stanford University' className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium text-gray-700'>Degree</label>
                        <input value={education.degree || ""} onChange={(e)=> updateEducation(index, "degree", e.target.value)} 
                        type="text" placeholder="e.g., Bachelor of Science" className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium text-gray-700'>Field of Study</label>
                        <input value={education.field || ""} onChange={(e)=> updateEducation(index, "field", e.target.value)} 
                        type="text" placeholder='e.g., Computer Science' className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium text-gray-700'>Graduation Date</label>
                        <input value={education.graduation_date || ""} onChange={(e)=> updateEducation(index, "graduation_date", e.target.value)} 
                        type="month" className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'/>
                    </div>
                   </div>
                    
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium text-gray-700'>GPA / Grade (Optional)</label>
                        <input value={education.gpa || ""} onChange={(e)=> updateEducation(index, "gpa", e.target.value)} 
                        type="text" placeholder='e.g., 3.8/4.0' className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 w-1/2'/>
                    </div>
                </div>
              ))}
            </div>
        )}
    </div>
  )
}

export default EducationForm