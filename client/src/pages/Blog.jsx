import React, { useState } from 'react';
import { ArrowRight, Clock, User, Tag, Sparkles, BookOpen, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Beat the ATS in 2026: A Developer's Guide",
    excerpt: "Learn the secret keywords and formatting tricks that get your resume past the automated filters and into human hands.",
    category: "Career Advice",
    author: "Pavan Robba",
    date: "March 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Top 5 MERN Stack Projects to Boost Your Portfolio",
    excerpt: "Stand out from the crowd by building these high-impact full-stack applications that hiring managers actually care about.",
    category: "Technical",
    author: "Pavan Robba",
    date: "March 10, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Future of AI in Resume Building",
    excerpt: "How generative AI is changing the way we describe our professional achievements and what it means for your next job hunt.",
    category: "AI & Tech",
    author: "Pavan Robba",
    date: "March 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/app" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold mb-8 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                <BookOpen size={14} /> Knowledge Hub
              </div>
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
                Career <span className="text-green-600">Insights</span>
              </h1>
              <p className="text-slate-500 text-xl max-w-2xl">
                Expert advice on resume building, tech interviews, and navigating the modern software engineering landscape.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-500 outline-none transition-all font-bold text-slate-800"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* --- FEATURED POST --- */}
        <section className="mb-20">
            <div className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row transition-all hover:border-green-300">
                <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                    <img 
                        src={BLOG_POSTS[0].image} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt="Featured"
                    />
                </div>
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-green-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Featured</span>
                        <span className="text-slate-400 font-bold text-sm flex items-center gap-1"><Clock size={14} /> {BLOG_POSTS[0].readTime}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 group-hover:text-green-600 transition-colors">
                        {BLOG_POSTS[0].title}
                    </h2>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        {BLOG_POSTS[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-green-100 border border-green-200 flex items-center justify-center font-bold text-green-700 text-xs">PR</div>
                            <span className="font-bold text-slate-800">{BLOG_POSTS[0].author}</span>
                        </div>
                        <button className="flex items-center gap-2 text-green-600 font-black group/btn">
                            Read More <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* --- RECENT POSTS GRID --- */}
        <section className="mb-20">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <Sparkles className="text-green-600" /> Recent Articles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.slice(1).map(post => (
                    <div key={post.id} className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <div className="h-56 overflow-hidden">
                            <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                        </div>
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-wider">{post.category}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">{post.title}</h4>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{post.excerpt}</p>
                            <button className="flex items-center gap-2 text-sm text-slate-900 font-black">
                                View Post <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                
                {/* Newsletter Card */}
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 size-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all" />
                    <h4 className="text-2xl font-bold mb-2">Subscribe</h4>
                    <p className="text-slate-400 text-sm mb-6 font-medium">Get the latest career tips delivered to your inbox weekly.</p>
                    <div className="space-y-3">
                        <input type="email" placeholder="email@example.com" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-green-500 outline-none transition-all" />
                        <button className="w-full py-3 bg-green-600 text-white rounded-xl font-black text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-900/40">Join Now</button>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Blog;