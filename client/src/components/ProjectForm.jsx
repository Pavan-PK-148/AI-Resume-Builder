import { Plus, Sparkles, Trash2, FolderIcon } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import api from '../configs/api';

const ProjectForm = ({ data, onChange }) => {
    
    const addProject = () => {
        const newProject = {
            name: "",
            type: "", // e.g., Full Stack, Mobile App, Machine Learning
            description: "",
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    // AI Enhancement Logic
    const handleEnhanceProject = async (index) => {
        const currentDescription = data[index].description;

        if (!currentDescription || currentDescription.length < 10) {
            return toast.error("Please provide a short description first!");
        }

        const toastId = toast.loading("Enhancing project details...");
        try {
            const token = localStorage.getItem('token');
            const { data: res } = await api.post('/api/ai/enhance-job-desc', 
                { userContent: currentDescription },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.enhancedContent) {
                const updated = [...data];
                updated[index].description = res.enhancedContent;
                onChange(updated);
                toast.success("Project enhanced!", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to enhance project.", { id: toastId });
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects</h3>
                    <p className='text-sm text-gray-500'>Showcase your best work.</p>
                </div>
                <button 
                    type="button"
                    onClick={addProject} 
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'
                >
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-100 rounded-xl'>
                    <FolderIcon className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No projects added yet.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((project, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm'>
                            <div className='flex justify-between items-start border-b pb-2'>
                                <h4 className='text-sm font-medium text-gray-600'>Project #{index + 1}</h4>
                                <button 
                                    type="button"
                                    onClick={() => removeProject(index)} 
                                    className='text-red-400 hover:text-red-600 transition-colors'
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid gap-3'>
                                <div className='grid md:grid-cols-2 gap-3'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-xs font-medium text-gray-700'>Project Name</label>
                                        <input 
                                            value={project.name || ""} 
                                            onChange={(e) => updateProject(index, "name", e.target.value)}
                                            type="text" 
                                            placeholder='e.g., E-commerce Dashboard' 
                                            className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500' 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-xs font-medium text-gray-700'>Project Type / Tech Stack</label>
                                        <input 
                                            value={project.type || ""} 
                                            onChange={(e) => updateProject(index, "type", e.target.value)}
                                            type="text" 
                                            placeholder='e.g., React, Node.js, MongoDB' 
                                            className='px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500' 
                                        />
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <label className='text-xs font-medium text-gray-700'>Description</label>
                                        <button 
                                            type="button"
                                            onClick={() => handleEnhanceProject(index)}
                                            className='flex items-center gap-1.5 px-2 py-1 text-xs bg-purple-50 text-purple-600 border border-purple-100 rounded-full hover:bg-purple-100 transition-colors'
                                        >
                                            <Sparkles size={12} />
                                            Enhance with AI
                                        </button>
                                    </div>
                                    <textarea 
                                        rows={4} 
                                        value={project.description || ""} 
                                        onChange={(e) => updateProject(index, "description", e.target.value)}
                                        placeholder='Explain what you built and what problem it solved...' 
                                        className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none outline-none focus:ring-1 focus:ring-blue-500' 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectForm;