import { CheckIcon, Palette, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({ selectedColor, onChange, selectedTemplate }) => {

    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#10B981" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Gray", value: "#6B7280" },
        { name: "Black", value: "#1a2e52" },
    ]

    const [isOpen, setIsOpen] = useState(false);
    const isATSTemplate = selectedTemplate === "ATS-Premium";

    return (
        <div className='relative'>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'
            >
                <Palette size={16}/> <span className='max-sm:hidden'>Accent</span>
            </button>

            {isOpen && (
                <div className='grid grid-cols-4 w-60 gap-x-2 gap-y-3 absolute top-full left-0 p-3 mt-2 z-20 bg-white rounded-xl border border-gray-200 shadow-xl animate-in fade-in zoom-in duration-150'>
                    {colors.map((color) => {
                        const showSuggested = isATSTemplate && color.name === "Black";

                        return (
                            <div 
                                key={color.value} 
                                className='relative cursor-pointer group flex flex-col items-center pt-1 pb-2' 
                                onClick={() => { onChange(color.value); setIsOpen(false) }}
                            >
                                <div 
                                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center 
                                              ${selectedColor === color.value 
                                                ? "border-slate-800 scale-110 shadow-md" 
                                                : "border-transparent group-hover:scale-105"}`} 
                                    style={{ backgroundColor: color.value }}
                                >
                                    {selectedColor === color.value && (
                                        <CheckIcon className='size-4 text-white' strokeWidth={3}/>
                                    )}
                                </div>

                                <p className={`text-[10px] mt-1 font-medium ${selectedColor === color.value ? "text-slate-900" : "text-gray-500"}`}>
                                    {color.name}
                                </p>

                                {showSuggested && (
                                    <div className='absolute -bottom-1 z-10 flex items-center gap-0.5 px-1.5 py-[1px] 
                                                  bg-gradient-to-r from-amber-500 to-amber-600 
                                                  text-white rounded-full shadow-sm whitespace-nowrap'>
                                        <Sparkles size={7} className="fill-current"/>
                                        <span className='text-[7px] font-bold uppercase tracking-tighter'>Suggested</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default ColorPicker