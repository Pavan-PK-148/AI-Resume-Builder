import { Check, Layout, Crown } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate, onChange}) => {
  const [isOpen, setIsOpen] = useState(false)

  const templates = [
    {
       id: "classic",
       name: "Classic",
       preview: "A clean, traditional resume format with clear sections and professional typography"
    },
    {
       id: "modern",
       name: "Modern",
       preview: "Sleek design with strategic use of colour and modern font choices"
    },
    {
       id: "minimal-image",
       name: "Minimal Image",
       preview: "Minimal design with a single image and clean typography"
    },
    {
       id: "minimal",
       name: "Minimal",
       preview: "Ultra-clean design that puts your content front and center"
    },
    {
      id: "ATS-Premium",
      name: "ATS Premium",
      preview: "A high-compliance, recruiter-vetted layout precision-engineered for 100% ATS readability and professional content hierarchy.",
      isPremium: true 
    }
  ]

  return (
    <div className='relative'>
        <button onClick={()=> setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Layout size={14}/> <span className='max-sm:hidden'>Template</span>
        </button>
        {isOpen && (
            <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-xl max-h-80 overflow-y-auto overflow-x-hidden scroll-smooth'>
               {templates.map((template)=>(
                <div key={template.id} onClick={()=>{onChange(template.id); setIsOpen(false)}} className={`relative p-3 border rounded-xl cursor-pointer transition-all duration-300 ${selectedTemplate === template.id ? 
                    "border-blue-500 bg-blue-50/50 shadow-inner": "border-gray-200 hover:border-blue-300 hover:bg-slate-50"
                }`}>
                  
                  {/* Premium Badge: Gold Gradient & Crown Icon */}
                  {template.isPremium && (
                    <div className='absolute -top-2 -right-1 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 shadow-lg shadow-amber-200/50 rounded-full animate-pulse-slow'>
                      <Crown size={10} className="text-white fill-current" />
                      <span className='text-[9px] font-black text-white uppercase tracking-tighter'>
                        Premium
                      </span>
                    </div>
                  )}

                  {/* Selected Checkmark (Positioned to not hit the badge) */}
                  {selectedTemplate === template.id && (
                    <div className='absolute bottom-3 right-3'>
                       <div className='size-5 bg-blue-600 rounded-full flex items-center justify-center shadow-md'>
                        <Check className='w-3 h-3 text-white' strokeWidth={3}/>
                       </div>
                    </div>
                  )}

                  <div className='space-y-1 pr-12'>
                    <h4 className={`font-bold tracking-tight transition-colors ${selectedTemplate === template.id ? "text-blue-700" : "text-slate-800"}`}>
                        {template.name}
                    </h4>
                    <p className='text-[11px] leading-relaxed text-slate-500 line-clamp-2'>
                        {template.preview}
                    </p>
                  </div>
                </div>
               ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector