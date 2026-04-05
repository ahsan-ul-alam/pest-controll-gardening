import React, { useState } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Leaf, Sparkles } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head } from '@inertiajs/react';

export default function LocationQueryPage() {
  const [zipCode, setZipCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <AppHeaderLayout>
      <Head title="Custom Lawn Plan" />
      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        
        {/* Main Card Container */}
        <div className="relative bg-[#2E7D32] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/20 isolate">
          
          {/* Decorative Background Elements (Subtle Noise/Gradient) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] z-0"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 z-0 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            
            {/* Left Column: Content & Form */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 w-fit mb-8 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#81C784]" />
                <span className="text-white text-xs font-bold tracking-wider uppercase">
                  Limited Offer
                </span>
              </div>

              {/* Headlines */}
              <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-4 font-serif tracking-tight">
                What's the <span className="text-[#A5D6A7] italic">real</span> current location of your home?
              </h1>
              
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px bg-white/30 w-12"></div>
                <p className="text-white/90 font-medium text-lg">
                  Save <span className="font-bold text-[#FFD54F]">30%</span> on custom yard plans
                </p>
              </div>

              {/* Form Section */}
              <div className="max-w-md">
                <label 
                  htmlFor="zip-input" 
                  className="block text-white text-sm font-bold uppercase tracking-wider mb-3 ml-1"
                >
                  Where do you live?
                </label>
                
                <div 
                  className={`
                    relative bg-white rounded-2xl p-2 shadow-xl transition-all duration-300 ease-out flex flex-col sm:flex-row items-center gap-2
                    ${isFocused ? 'ring-4 ring-[#81C784]/30 transform -translate-y-1' : ''}
                  `}
                >
                  <div className="relative w-full">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      id="zip-input"
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Enter Zip Code"
                      className="w-full pl-14 pr-4 py-4 rounded-xl outline-none text-gray-900 font-bold placeholder-gray-400 bg-transparent text-lg"
                    />
                  </div>

                  <button className="w-full sm:w-auto bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap shadow-lg">
                    Next
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                
                <p className="text-white/60 text-xs mt-3 ml-2 font-medium flex items-center gap-1.5">
                  Get started: zip code
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
               {/* Decorative curved separator for desktop */}
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-[#2E7D32] lg:bg-transparent lg:bg-gradient-to-r lg:from-[#2E7D32] lg:to-transparent z-10 hidden lg:block"></div>
              
               {/* Decorative curved separator for mobile */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#2E7D32] to-transparent z-10 lg:hidden"></div>

              <img 
                src="https://images.unsplash.com/photo-1575881875475-31023242e3f9?q=80&w=2070&auto=format&fit=crop" 
                alt="Lush Green Lawn" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Element on Image */}
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl max-w-[200px] hidden sm:block animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#2E7D32]">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase">Result</div>
                    <div className="text-gray-900 font-bold text-sm">Healthy Turf</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF50] w-[90%] rounded-full"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Trust Indicators (Optional Footer for this page) */}
        {/* <div className="mt-12 grid grid-cols-3 gap-4 text-center opacity-60 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-gray-900 text-lg">50k+</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Lawns Analyzed</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-gray-300">
            <span className="font-bold text-gray-900 text-lg">4.8/5</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">User Rating</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-gray-900 text-lg">100%</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Custom Plans</span>
          </div>
        </div> */}

      </div>
    </AppHeaderLayout>
  );
}