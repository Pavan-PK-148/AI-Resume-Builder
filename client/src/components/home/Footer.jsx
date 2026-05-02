import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="w-full flex flex-col lg:flex-row justify-between items-start overflow-hidden py-20 px-10 md:px-20 lg:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/40 to-white mt-40">
        
        {/* Left Section: Branding */}
        <div className="flex flex-col gap-4 min-w-[250px] mb-12 lg:mb-0">
          <a href="/">
            <img src="/logo.svg" alt="logo" className='h-10 w-auto'/>
          </a>
          <p className="leading-relaxed text-slate-600 max-w-[240px]">
            Making every customer feel valued—no matter the size of your audience.
          </p>
          <div className="flex items-center gap-5 text-slate-400">
            <a href="#" className="hover:text-green-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path></svg>
            </a>
            <a href="#" className="hover:text-green-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="hover:text-green-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="hover:text-green-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
            </a>
          </div>
          <p className="mt-2 text-gray-400 text-xs">© 2026 Resume Builder</p>
        </div>

        {/* Right Section: Navigation Links - flex-1 and justify-between for even spread */}
        <div className="flex flex-1 flex-wrap justify-between items-start max-w-4xl w-full lg:ml-20">
          <div>
            <p className="text-slate-900 font-bold mb-5 tracking-tight">Features</p>
            <ul className="space-y-4">
              <li><a href="/ats" className="hover:text-green-600 transition">ATS Scanner</a></li>
              <li><a href="/rewriter" className="hover:text-green-600 transition">AI Rewriter</a></li>
              <li><a href="/templates" className="hover:text-green-600 transition">Templates</a></li>
              <li><a href="/analysis" className="hover:text-green-600 transition">Analysis</a></li>
            </ul>
          </div>

          <div>
            <p className="text-slate-900 font-bold mb-5 tracking-tight">Product</p>
            <ul className="space-y-4">
              <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
              <li><a href="/support" className="hover:text-green-600 transition">Support</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-slate-900 font-bold mb-5 tracking-tight">Resources</p>
            <ul className="space-y-4">
              <li><a href="/blog" className="hover:text-green-600 transition">Blogs</a></li>
              <li><a href="/" className="hover:text-green-600 transition">Careers<span className="text-xs text-white bg-green-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a></li>
              <li><a href="/about" className="hover:text-green-600 transition">About</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-slate-900 font-bold mb-5 tracking-tight">Legal</p>
            <ul className="space-y-4">
              <li><a href="/privacy" className="hover:text-green-600 transition">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  )
}

export default Footer