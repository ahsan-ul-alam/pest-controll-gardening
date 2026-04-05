import React, { useState } from 'react';
import { 
  MapPin, MonitorCheck, PackageOpen, Droplets, Star, ArrowRight, Sparkles, CheckCircle2, TrendingUp
} from 'lucide-react';

const StepItem = ({ icon: Icon, title, description, stepNumber, delay }) => (
  <div 
    className="relative group"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Step Number Badge - Top Right */}
    <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
      <span className="text-xl font-black text-white">
        {stepNumber}
      </span>
    </div>

    {/* Main Content Container */}
    <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-200/50 group-hover:border-emerald-200 group-hover:bg-white transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-500/10 group-hover:-translate-y-2">
      
      {/* Icon - Large and Centered */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:shadow-emerald-500/20 group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
        <Icon size={40} strokeWidth={2} />
      </div>
      
      {/* Title */}
      <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 text-center leading-tight group-hover:text-emerald-900 transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-base lg:text-lg text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
      
      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
    </div>
  </div>
);

// const StarRating = () => (
//   <div className="flex flex-col items-center gap-4 mt-12 animate-[fadeInUp_0.6s_ease-out]">
//     <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl border-2 border-emerald-100 transition-all duration-300 hover:scale-105">
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4].map((i) => (
//           <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-sm" />
//         ))}
//         <div className="relative">
//           <Star className="w-6 h-6 text-amber-400/20" />
//           <div className="absolute top-0 left-0 overflow-hidden w-[30%]">
//             <Star className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-sm" />
//           </div>
//         </div>
//       </div>
//       <span className="text-gray-900 font-bold ml-2 text-xl">4.3</span>
//       <span className="text-gray-500 text-sm font-medium">/5</span>
//     </div>
//     <div className="text-base text-gray-600 font-medium flex items-center gap-2">
//       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
//       Trusted by over <span className="font-bold text-emerald-700">10,000+ happy homeowners</span>
//     </div>
//   </div>
// );

export default function HowItWorks() {
  const [address, setAddress] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const steps = [
    {
      stepNumber: "01",
      icon: MonitorCheck,
      title: "Get yard analysis",
      description: "Answer a few easy questions about your yard and location. We use satellite data to build your unique plan tailored to your grass type and climate.",
    },
    {
      stepNumber: "02",
      icon: PackageOpen,
      title: "Open your box",
      description: "Your custom kit arrives at your door—including a free soil test—exactly when your lawn needs it most. No more guessing what to buy.",
    },
    {
      stepNumber: "03",
      icon: Droplets,
      title: "Just spray it on",
      description: "No heavy spreaders. Just attach the nutrient pouch to your hose, spray, and get back to enjoying your weekend. It's that simple.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 font-sans text-gray-900">
      
      {/* 1. How It Works Section */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 via-emerald-50/20 to-gray-50">
        {/* Enhanced Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-green-100 to-lime-100 rounded-full blur-3xl translate-x-1/2 opacity-30 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full blur-3xl translate-y-1/2 opacity-30 animate-pulse [animation-delay:4s]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm border-2 border-emerald-200">
              <Sparkles className="w-4 h-4" />
              <span>Simple 3-Step Process</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight font-serif">
              Lawn care made{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
                  simple
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 opacity-30 blur-sm"></div>
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Professional lawn care delivered to your door. No heavy equipment. No guesswork. Just beautiful results.
            </p>
            
            <div className="h-2 w-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto rounded-full shadow-lg"></div>
          </div>

          {/* Step Items - 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, index) => (
              <StepItem
                key={index}
                stepNumber={step.stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={index * 150}
              />
            ))}
          </div>

          {/* Bonus Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full py-4 px-8 md:px-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600 shadow-lg"></span>
              </span>
              <p className="text-emerald-900 font-semibold text-base md:text-lg">
                <span className="font-black">Bonus:</span> Includes expert advice & free shipping forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Get Started Section */}
      <section className="py-16 px-6 bg-[#EAF8E7] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-100 to-transparent rounded-full blur-3xl opacity-40"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-serif">
            Let's build your{' '}
            <span className="relative inline-block italic font-serif">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                perfect
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C60 4 140 4 198 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            {' '}plan
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
            Enter your address to get a custom lawn care plan designed specifically for your yard
          </p>
          
          {/* Enhanced Input Section */}
          <div 
            className={`bg-white p-4 rounded-3xl shadow-2xl border-2 ${
              isFocused ? 'border-emerald-400 shadow-emerald-500/20' : 'border-gray-200'
            } flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-3xl ${
              isFocused ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <div className="flex-1 w-full relative">
              <div className={`absolute left-6 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isFocused ? 'bg-emerald-100' : 'bg-gray-50'
              }`}>
                <MapPin className={`w-5 h-5 transition-colors duration-300 ${
                  isFocused ? 'text-emerald-600' : 'text-gray-400'
                }`} />
              </div>
              <div className={`absolute top-3 left-20 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                isFocused ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                Where do you live?
              </div>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your street address..." 
                className="w-full pl-20 pr-6 pt-8 pb-3 rounded-2xl outline-none text-gray-900 placeholder-gray-400 font-semibold bg-transparent text-lg transition-all duration-300"
              />
            </div>
            <button className="w-full md:w-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:via-teal-700 hover:to-green-700 text-white font-bold py-5 px-12 rounded-2xl shadow-xl shadow-emerald-900/30 hover:shadow-2xl hover:shadow-emerald-900/40 transition-all duration-500 flex items-center justify-center gap-3 group whitespace-nowrap active:scale-95 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10">Get My Plan</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2 relative z-10" />
            </button>
          </div>

          {/* <StarRating /> */}
          
          {/* Trust indicators */}
          {/* <div className="mt-16 flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-sm font-semibold text-gray-500">AS SEEN ON</div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-sm font-bold text-gray-400">GOOD MORNING AMERICA</div>
            <div className="text-sm font-bold text-gray-400">FORBES</div>
            <div className="text-sm font-bold text-gray-400">THE TODAY SHOW</div>
          </div> */}
        </div>
      </section>

    </div>
  );
}