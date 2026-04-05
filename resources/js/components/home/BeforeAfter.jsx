import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Testimonials Data
  const testimonials = [
    {
      text: "I run a lawn company and I tested some of your Neutralyze last year with one of my trucks. It worked great, the yards perked up nicely. This year we are going to switch our whole system to using Neutralyze and PatchPro+. It works great with our program.",
      author: "Jon",
      role: "Lawn Care Professional"
    },
    {
      text: "The difference in just three weeks was astounding. My neighbors actually stopped to ask what I was using. The fact that it's safe for my dogs makes it a no-brainer for me.",
      author: "Sarah M.",
      role: "Homeowner"
    },
    {
      text: "I've tried every granule product on the shelf. TurfTec's liquid system is so much easier to apply and the absorption rate is clearly superior. My soil tests prove it.",
      author: "Michael R.",
      role: "Turf Enthusiast"
    },
    {
      text: "Finally a product that balances pH without burning the grass. The Before & After photos don't do it justice. You have to see the deep green in person.",
      author: "David K.",
      role: "Golf Course Superintendent"
    },
    {
      text: "Simple, effective, and shipped right to my door. I love that I don't have to guess which nutrients my lawn needs anymore.",
      author: "Jessica T.",
      role: "Busy Mom"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Images representing the transformation
  // Using Unsplash images for preview; replace with your local paths "/images/lawn-before.png" if available
  const beforeImage = "/images/lawn_before_cropped.png";
  const afterImage = "/images/lawn_after_cropped.png";

  // Handlers for dragging interaction
  const handleMouseDown = () => setIsDragging(true);
  
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  // Global event listeners for smooth dragging
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => isDragging && handleMove(e.clientX);
    const handleTouchMove = (e) => isDragging && handleMove(e.touches[0].clientX);

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  const handleInteractionStart = (e) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    handleMove(clientX);
  };

  return (
    <section className="py-24 bg-[#F1F4F3] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-gray-900 mb-12 font-serif">
          Before & After{' '}
          <span className="relative inline-block italic font-serif">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              TurfTec
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
        </h2>

        {/* Comparison Slider */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-6xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl cursor-ew-resize select-none group touch-none"
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
        >
          {/* Base Layer: AFTER Image (Right side visible by default) */}
          <img 
            src={afterImage} 
            alt="After TurfTec treatment" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          {/* Badge: AFTER */}
          <div className="absolute bottom-6 right-6 bg-[#1B5E20] text-white text-xs md:text-sm font-bold tracking-widest px-4 py-1.5 rounded-md shadow-lg">
            AFTER
          </div>

          {/* Overlay Layer: BEFORE Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden bg-gray-200"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Before image is absolute to cover the base image exactly */}
            <img 
              src={beforeImage} 
              alt="Before TurfTec treatment" 
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
            />
            
            {/* Badge: BEFORE */}
            <div className="absolute bottom-6 left-6 bg-[#3F51B5] text-white text-xs md:text-sm font-bold tracking-widest px-4 py-1.5 rounded-md shadow-lg z-10">
              BEFORE
            </div>
            
            {/* Gradient Shadow on the cut line */}
            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-black/20 to-transparent"></div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2E7D32] transform transition-transform group-hover:scale-110">
              <div className="flex gap-0.5">
                <ChevronLeft size={18} strokeWidth={2.5} />
                <ChevronRight size={18} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 text-center max-w-4xl mx-auto px-4">
          <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#2E7D32] opacity-20 mx-auto mb-6 fill-current" />
          
          <div className="min-h-[160px] flex flex-col justify-center transition-all duration-500">
            <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed mb-8 font-medium animate-fade-in">
              "{testimonials[currentTestimonial].text}"
            </p>
            
            <div className="mb-10">
              <p className="font-bold text-gray-900 text-sm uppercase tracking-widest">
                {testimonials[currentTestimonial].author}
              </p>
              {testimonials[currentTestimonial].role && (
                 <p className="text-xs text-gray-500 font-medium mt-1">
                   {testimonials[currentTestimonial].role}
                 </p>
              )}
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-green-700 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-125'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}