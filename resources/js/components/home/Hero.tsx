import React, { useState } from 'react';
import { MapPin, ArrowRight, Check, Leaf, TreePine } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function HeroSection() {
  const [zipCode, setZipCode] = useState('');

  return (
    
    <div className="relative w-full h-auto min-h-[600px] lg:h-[85vh] flex items-center justify-center overflow-hidden font-sans">
      <Head title="Home" />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Green manicured lawn with trees" 
          className="w-full h-full object-cover"
        />
        {/* Premium gradient overlay for better text readability and visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/65 to-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 lg:py-0 flex flex-col items-center text-center">
        
        {/* Main Content Column */}
        <div className="flex flex-col gap-6 w-full items-center">
          {/* Main Headline - Updated font to match app style */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
            A Greener Lawn, <br />
            Made Simple <br />
            For Homes & Pro Turf
          </h1>
          
          {/* Sub-headline adapted to fit design style of Image 1 */}
          {/* <p className=" font-poppins text-white/90 text-lg md:text-2xl font-medium max-w-2xl">
            Professional agronomy plans starting at <span className="font-bold text-[#FFD54F]">$55</span>
          </p> */}

          {/* <div className="h-1 w-24 bg-[#FFD54F] rounded-full my-2"></div> */}

          {/* Input Group - Centered */}
          <div className="w-full max-w-xl mt-6">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
              Where do you live?
            </label>
            
            <div className="bg-white p-1.5 rounded-lg shadow-2xl flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter zip code..." 
                  className="w-full pl-12 pr-4 h-12 md:h-14 rounded-md outline-none text-gray-900 placeholder-gray-400 font-semibold bg-transparent text-lg"
                />
              </div>
              <button className="w-full md:w-auto bg-[#2E7D32] text-white font-extrabold py-3 md:py-4 px-8 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 text-lg shadow-md whitespace-nowrap cursor-pointer">
                Get your plan
              </button>
            </div>

            {/* Secondary Link for "For Landscapers..." context from Image 2 */}
            {/* <div className="mt-6">
              <a href="#" className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-colors border-b border-white/30 hover:border-white pb-0.5">
                <TreePine className="w-4 h-4" />
                For Landscapers & Golf Courses
              </a>
            </div> */}
          </div>
        </div>

      </div>
    </div>
  );
}