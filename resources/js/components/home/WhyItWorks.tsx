import React from 'react';
import { Globe, Zap, Trophy, PawPrint, FlaskConical, Sprout, CheckCircle2, Sparkles } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description, index }) => (
  <div 
    className="relative flex items-start gap-6 group"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Icon Container - Fixed on left */}
    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:shadow-emerald-500/20 group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
      <Icon size={32} strokeWidth={2} className="transform transition-transform duration-500" />
    </div>
    
    {/* Content */}
    <div className="flex-1 pt-1">
      <h3 className="text-gray-900 font-bold text-xl mb-2 leading-tight group-hover:text-emerald-900 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
      
      {/* Animated underline */}
      <div className="h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
    </div>
  </div>
);

export default function WhyTurfTecWorks() {
  const features = [
    {
      icon: Globe,
      title: "Works in Any Region or Turf Type",
      description: "Designed for warm season, cool season, and golf grade turf."
    },
    {
      icon: Zap,
      title: "Fast Acting Liquid Nutrients",
      description: "Liquids absorb faster and move through the soil more efficiently than granular fertilizers."
    },
    {
      icon: Trophy,
      title: "Better Soil Structure",
      description: "Improves compaction and nutrient movement for stronger, more resilient turf."
    },
    {
      icon: PawPrint,
      title: "Safe for Kids & Pets",
      description: "Non-toxic ingredients that let your family enjoy the outdoors sooner."
    },
    {
      icon: FlaskConical,
      title: "Backed by Agronomy Science",
      description: "Trusted by homeowners, landscapers, golf courses, and sports turf managers."
    },
    {
      icon: Sprout,
      title: "Deeper, Healthier Roots",
      description: "Our formulas boost root development for long term lawn health."
    }
  ];

  return (
    <section className="py-24 bg-[#EAF8E7] font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-100/40 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:5s] [animation-delay:1s]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm border-2 border-emerald-200">
            <Sparkles className="w-4 h-4" />
            <span>Why Choose TurfTec</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight font-serif">
            Why{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
                TurfTec
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 opacity-30 blur-sm"></div>
            </span>
            {' '}Works
          </h2>
          
          <p className="text-gray-600 text-xl md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed">
            Fast acting liquid nutrients backed by agronomy—designed for{' '}
            <span className="text-emerald-700 font-bold">healthier soil</span>,{' '}
            <span className="text-emerald-700 font-bold">deeper roots</span>, and{' '}
            <span className="text-emerald-700 font-bold">greener lawns</span>.
          </p>

          <div className="h-2 w-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto rounded-full shadow-lg"></div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}