import React, { useState } from 'react';
import { Star, UploadCloud, Check, X, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head } from '@inertiajs/react';

// --- Mock Product Data ---
const product = {
  id: 'prod-001',
  name: "Bug Doom Home Insect Control",
  variant: "Gallon with Wand (2-pack)",
  image: "/images/products/heatguard_quart_gallon.png",
};

export default function CreateReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Image Upload (Mock)
  const handleImageUpload = (e) => {
    e.preventDefault();
    // In a real app, handle file reading/upload here
    // Adding mock images for visualization
    const newMockImage = `https://placehold.co/200x200/e0f2f1/166534?text=Photo+${images.length + 1}`;
    setImages([...images, newMockImage]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <AppHeaderLayout>
      <Head title="Write a Review" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb */}
        <div className="mb-8">
           <Link href="/products/post" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#2E7D32] transition-colors">
             <ChevronLeft size={16} />
             Back to Product
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Product Summary & Tips */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
              <div className="w-48 h-48 mx-auto bg-gray-50 rounded-2xl mb-6 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h2 className="text-xl font-black font-serif text-gray-900 mb-2">{product.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{product.variant}</p>
            </div>

            <div className="bg-[#E8F5E9] p-6 rounded-3xl border border-green-100">
              <h3 className="font-bold text-[#1B5E20] mb-4 flex items-center gap-2">
                <Star size={18} className="fill-[#1B5E20]" />
                Writing a great review
              </h3>
              <ul className="space-y-3 text-sm text-[#2E7D32]">
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span>Focus on specific results (e.g., "Weeds died in 3 days").</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span>Mention your location or grass type if relevant.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Pro Tip:</strong> Photos of your lawn make your review 3x more helpful!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Review Form */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl md:text-4xl font-black font-serif text-gray-900 mb-2">Write a Review</h1>
            <p className="text-gray-500 text-lg mb-10">Share your experience with the TurfTec community.</p>

            <form className="space-y-8">
              
              {/* Rating */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={40} 
                        className={`transition-colors duration-200 ${
                          star <= (hoverRating || rating) 
                            ? 'fill-[#FDB94E] text-[#FDB94E]' 
                            : 'fill-transparent text-gray-200'
                        }`} 
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-lg font-bold text-gray-400">
                    {rating > 0 ? (rating === 5 ? "Excellent!" : rating === 4 ? "Great" : rating === 3 ? "Average" : "Poor") : ""}
                  </span>
                </div>
              </div>

              {/* Review Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Review Title</label>
                  <input 
                    type="text" 
                    id="title"
                    placeholder="Sum up your experience"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Location (Optional)</label>
                  <input 
                    type="text" 
                    id="location"
                    placeholder="e.g. Austin, TX"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Your Review</label>
                <textarea 
                  id="content"
                  rows={5}
                  placeholder="What did you like or dislike? How was the application process?"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all placeholder:text-gray-400 font-medium resize-none"
                ></textarea>
              </div>

              {/* Photo Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Add Photos</label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100">
                      <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 4 && (
                    <button 
                      type="button"
                      onClick={handleImageUpload}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#2E7D32] hover:text-[#2E7D32] hover:bg-green-50/30 transition-all gap-2 group"
                    >
                      <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors">
                         <UploadCloud size={24} />
                      </div>
                      <span className="text-xs font-bold">Upload</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Recommendation */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Would you recommend this product?</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setRecommend(true)}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      recommend === true 
                        ? 'border-[#2E7D32] bg-green-50 text-[#1B5E20]' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Check size={18} /> Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecommend(false)}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      recommend === false 
                        ? 'border-gray-900 bg-gray-50 text-gray-900' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <X size={18} /> No
                  </button>
                </div>
              </div>

              {/* User Info */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Name (Displayed)</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Your name"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Email (Private)</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="your@email.com"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-lg py-4 px-12 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98]"
                >
                  Submit Review
                </button>
                <p className="text-xs text-gray-400 mt-4 text-center md:text-left">
                  By submitting, you agree to our <a href="#" className="underline hover:text-[#2E7D32]">Terms & Conditions</a>.
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </AppHeaderLayout>
  );
}