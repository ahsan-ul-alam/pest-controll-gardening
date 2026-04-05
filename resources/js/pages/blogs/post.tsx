import React from 'react';
import { Calendar, Clock, User, Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronLeft, ArrowRight, Mail } from 'lucide-react';
import { Link, Head } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';


// --- Mock Data for a Single Post (Static Sample) ---
const post = {
  id: 1,
  title: "The Ultimate Guide to Spring Lawn Wake-Up",
  subtitle: "Spring is the most critical time for your lawn. Learn the exact steps to wake up your turf from dormancy and prepare it for a lush, disease-free growing season.",
  image: "https://images.unsplash.com/photo-1703432043433-3bb86c844968?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Seasonal Care",
  author: {
    name: "Dr. Sarah Green",
    role: "Chief Agronomist",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  date: "March 15, 2026",
  readTime: "8 min read",
  content: `
    <p>As the frost melts and the days grow longer, your lawn is waking up from its winter slumber. This transitional period is crucial. What you do now sets the stage for the entire growing season. Many homeowners make the mistake of rushing in with heavy fertilizers too early, which can actually harm the grass by forcing top growth before the roots are ready.</p>
    
    <h3>1. The Raking Ritual</h3>
    <p>Before you do anything else, give your lawn a good raking. This isn't just about clearing fallen leaves; it's about breaking up thatch and lifting matted grass blades. This allows air and sunlight to reach the soil surface, promoting faster green-up. Be gentle, though—the soil might still be soft and muddy.</p>

    <h3>2. Soil Testing: The Roadmap</h3>
    <p>Guessing what your lawn needs is a recipe for disaster. A soil test is the only way to know exactly what nutrients are missing. At TurfTec, we recommend testing every spring.</p>
    
    <blockquote>"A soil test is like a blood test for your lawn. Without it, you're just prescribing medication in the dark."</blockquote>

    <h3>3. The First Feed</h3>
    <p>Once your grass is actively growing (you've mowed it at least once), it's time to feed. Avoid heavy nitrogen blasts. Instead, opt for a balanced, slow-release liquid nutrient like our <strong>TurfTec Spring Starter</strong>. Liquid applications are superior in spring because they can be absorbed foliarly even if the soil temperatures are still cool.</p>

    <h3>4. Pre-Emergent: Timing is Everything</h3>
    <p>If you struggled with crabgrass last year, apply a pre-emergent herbicide now. The rule of thumb is to apply when soil temperatures reach 55°F for three consecutive days. This usually coincides with the blooming of forsythia bushes.</p>
  `
};

const relatedPosts = [
  {
    id: 1,
    title: "Which lawn fertilizer is right for me?",
    image: "https://images.unsplash.com/photo-1590820292118-e256c3ac2676?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Science",
    date: "Mar 12, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Liquid vs. Granular: Why Liquid Wins",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=2021&auto=format&fit=crop",
    category: "Science",
    date: "Mar 12, 2026",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Banishing Crabgrass Before It Starts",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2064&auto=format&fit=crop",
    category: "Pest Control",
    date: "Mar 08, 2026",
    readTime: "6 min read"
  }
];

export default function BlogPostPage() {
  return (
    <AppHeaderLayout>
      <Head title={post.title} />

      <article className="pt-20 pb-24">
        
        {/* Breadcrumb / Back */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#2E7D32] transition-colors">
            <ChevronLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-[#2E7D32] rounded-full">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-serif leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            {post.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 font-semibold">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div className="text-left">
                <span className="block text-gray-900">{post.author.name}</span>
                <span className="text-xs font-normal text-gray-400 uppercase tracking-wide">{post.author.role}</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar (Share & TOC) */}
          <aside className="hidden lg:block col-span-3 pl-8">
            <div className="sticky top-24 space-y-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share</span>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
                  <Linkedin size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#2E7D32] hover:border-green-200 transition-all shadow-sm">
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <div className="col-span-1 lg:col-span-7">
            <div 
              className="prose prose-lg prose-green max-w-none [&>p]:text-gray-600 [&>p]:leading-8 [&>p]:mb-6 [&>h3]:text-2xl [&>h3]:font-black [&>h3]:font-serif [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#2E7D32] [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-8 [&>blockquote]:text-xl"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* In-Article Call to Action */}
            <div className="my-12 p-8 bg-[#E8F5E9] rounded-3xl border border-green-100 flex flex-col sm:flex-row items-center gap-6 not-prose">
               <div className="flex-1">
                 <h4 className="text-xl font-bold text-[#1B5E20] mb-2">Ready to wake up your lawn?</h4>
                 <p className="text-[#2E7D32]/80 text-sm font-medium mb-0">Get your custom spring plan delivered to your door today.</p>
               </div>
               <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-900/10 transition-transform active:scale-95 whitespace-nowrap cusor-pointer">
                 Get My Plan
               </button>
            </div>

            <div className="max-w-none">
               <p className="text-lg text-gray-600 leading-8">Remember, patience is a virtue in lawn care. Rushing the process often leads to weak roots and disease susceptibility. Stick to the science, observe your local climate, and your lawn will reward you with deep, resilient green color.</p>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
              {['Spring', 'Fertilizer', 'Lawn Care 101', 'Soil Health'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2"></div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900 font-serif">Read Next</h2>
            <Link href="/blogs" className="hidden sm:flex items-center gap-2 font-bold text-[#2E7D32] hover:underline">
              View all articles <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map(post => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-[#2E7D32] rounded-lg z-20">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-serif mb-2 group-hover:text-[#2E7D32] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wide">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </section>

    </AppHeaderLayout>
  );
}