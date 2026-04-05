import React, { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, ChevronDown, ChevronUp, Check, Droplets, Sprout, AlertCircle, Share2, ThumbsUp, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useCart } from '../context/CartContext';

const productData = {
  id: 'prod-001',
  title: "Bug Doom Home Insect Control",
  subtitle: "Gallon with Wand (2-pack)",
  price: 72.00,
  originalPrice: 80.00,
  rating: 4.5,
  reviewCount: 328,
  description: "Shield your home from invaders. Bug Doom creates a long-lasting barrier against ants, roaches, spiders, and other common household pests. Our pro-grade formula is tough on bugs but safe for use around kids and pets when used as directed.",
  images: [
    "/images/products/heatguard_quart_gallon.png", // Main
    "https://placehold.co/600x600/f0fdf4/166534?text=Wand+Detail",
    "https://placehold.co/600x600/f0fdf4/166534?text=Application",
    "https://placehold.co/600x600/f0fdf4/166534?text=Label"
  ],
  benefits: [
    "Kills on contact & creates a barrier",
    "Battery-operated wand included",
    "Dries odorless & non-staining",
    "Safe for indoor & outdoor use"
  ],
  ingredients: "Active: Deltamethrin (0.02%). Other: Water, Solvent, Emulsifiers.",
  howToUse: "Shake well. Connect the wand. Spray a 12-inch band along the foundation of your home, around doors, windows, and vents. Allow to dry completely before letting pets enter the area.",
  category: "Pest Control", // ← NEW (for cart context)
  image: "/images/products/heatguard_quart_gallon.png", // ← NEW (for cart context)
  isFreeShipping: true, // ← NEW
  inStock: true // ← NEW
};

const reviewsData = [
  {
    id: 1,
    author: "Sarah M.",
    verified: true,
    rating: 5,
    date: "April 12, 2026",
    title: "Finally bug free!",
    content: "I live in Texas where the roaches are huge. Since using this around my perimeter, I haven't seen a single one inside. The wand makes it super easy to apply without pumping.",
    helpful: 24
  },
  {
    id: 2,
    author: "Mike R.",
    verified: true,
    rating: 4,
    date: "March 28, 2026",
    title: "Good stuff, battery died though",
    content: "The liquid works great. Ants stopped coming in immediately. My only complaint is the battery in the wand died halfway through the second gallon, but it's easily replaceable.",
    helpful: 8
  },
  {
    id: 3,
    author: "Jessica T.",
    verified: false,
    rating: 5,
    date: "February 15, 2026",
    title: "Safe for my dogs",
    content: "I was worried about my two labs, but I followed the instructions to let it dry, and we've had no issues. Love that it doesn't smell like harsh chemicals.",
    helpful: 42
  }
];

// --- Sub-Components ---

const Accordion = ({ title, children, defaultOpen = false, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-lg"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={20} className="text-[#2E7D32]" />}
          <span className="font-bold text-gray-900 text-lg group-hover:text-[#2E7D32] transition-colors font-serif">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-gray-600 leading-relaxed text-base pl-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="border-b border-gray-200 py-8 last:border-0">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
          {review.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
          {review.verified && (
            <span className="text-xs text-[#2E7D32] flex items-center gap-0.5">
              <ShieldCheck size={12} /> Verified Buyer
            </span>
          )}
        </div>
      </div>
      <span className="text-xs text-gray-400">{review.date}</span>
    </div>

    <div className="flex items-center gap-2 my-3">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-100 text-gray-200'}`} 
          />
        ))}
      </div>
      <span className="font-bold text-gray-900 text-sm">{review.title}</span>
    </div>

    <p className="text-gray-600 text-sm leading-relaxed mb-4">
      {review.content}
    </p>

    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
      <ThumbsUp size={14} />
      Helpful ({review.helpful})
    </button>
  </div>
);

// --- Main Component ---

export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // ← NEW
  const [isAdding, setIsAdding] = useState(false); // ← NEW

  // ──────────────────────────────────────────────────
  //   NEW: Handle Add to Cart with Animation
  // ──────────────────────────────────────────────────
  const handleAddToCart = (e) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    // Get cart icon position
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon) {
      // If cart icon not found, just add to cart without animation
      addToCart(productData, quantity);
      return;
    }
    
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Create flying product image
    const flyingImage = document.createElement('div');
    flyingImage.style.position = 'fixed';
    flyingImage.style.left = `${buttonRect.left + buttonRect.width / 2 - 40}px`;
    flyingImage.style.top = `${buttonRect.top + buttonRect.height / 2 - 40}px`;
    flyingImage.style.width = '80px';
    flyingImage.style.height = '80px';
    flyingImage.style.zIndex = '9999';
    flyingImage.style.pointerEvents = 'none';
    flyingImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    flyingImage.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img 
          src="${productData.image}" 
          alt="${productData.title}"
          style="
            width: 100%;
            height: 100%;
            object-fit: contain;
            mix-blend-mode: multiply;
          "
        />
      </div>
    `;
    
    document.body.appendChild(flyingImage);
    
    setIsAdding(true);
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 40}px`;
        flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 40}px`;
        flyingImage.style.transform = 'scale(0.2) rotate(360deg)';
        flyingImage.style.opacity = '0';
      });
    });
    
    setTimeout(() => {
      addToCart(productData, quantity);
      setIsAdding(false);
      flyingImage.remove();
    }, 800);
  };

  return (

        <div className="bg-[#FDFBF7] min-h-screen font-sans text-gray-900 pb-32 lg:pb-20">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 uppercase tracking-wider">
            <a href="#" className="hover:text-[#2E7D32] transition-colors">Shop</a>
            <ChevronDown className="-rotate-90" size={12} />
            <a href="#" className="hover:text-[#2E7D32] transition-colors">Pest Control</a>
            <ChevronDown className="-rotate-90" size={12} />
            <span className="text-gray-900">Bug Doom</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Image Gallery (Col Span 7) */}
            <div className="lg:col-span-7">
                <div className="sticky top-24">
                <div className="flex flex-col-reverse lg:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar p-2 lg:pb-0">
                    {productData.images.map((img, idx) => (
                        <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                            activeImage === idx ? 'border-[#2E7D32] shadow-md scale-105' : 'border-transparent bg-white opacity-80 hover:opacity-100'
                        }`}
                        >
                        <img src={img} alt="" className="w-full h-full object-cover mix-blend-multiply p-2" />
                        </button>
                    ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img 
                        src={productData.images[activeImage]} 
                        alt={productData.title} 
                        className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 relative z-10"
                    />
                    <div className="absolute top-4 right-4 z-20">
                        <button className="p-3 bg-white/90 backdrop-blur rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#2E7D32] shadow-sm">
                        <Share2 size={20} />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Right: Product Info (Col Span 5) */}
            <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                <div className="mb-6">
                    <span className="text-[#2E7D32] font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">Best Seller</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black font-serif text-gray-900 mb-2 leading-[1.1]">
                    {productData.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium mb-6">{productData.subtitle}</p>

                {/* Ratings */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-yellow-700">{productData.rating}</span>
                    </div>
                    <a href="#reviews" className="text-sm font-bold text-gray-500 hover:text-[#2E7D32] transition-colors border-b border-gray-300 hover:border-[#2E7D32] pb-0.5">
                    Read {productData.reviewCount} Reviews
                    </a>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-8 pb-8 border-b border-gray-200">
                    <span className="text-5xl font-black text-[#1A1A1A]">${productData.price.toFixed(2)}</span>
                    <span className="text-xl text-gray-400 line-through mb-2 font-medium">${productData.originalPrice.toFixed(2)}</span>
                </div>

                {/* Description */}
                <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                    <p>{productData.description}</p>
                </div>

                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                    {productData.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700 font-bold bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-[#2E7D32]">
                        <Check size={14} strokeWidth={3} />
                        </div>
                        {benefit}
                    </div>
                    ))}
                </div>

                {/* Desktop Actions - UPDATED */}
                <div className="hidden lg:block bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 mb-8">
                    <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900">Quantity</span>
                        <div className="flex items-center bg-gray-50 rounded-xl px-2 py-1 border border-gray-200">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                            disabled={isAdding}
                        >
                            <Minus size={18} />
                        </button>
                        <span className="w-10 text-center font-black text-lg text-gray-900">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                            disabled={isAdding}
                        >
                            <Plus size={18} />
                        </button>
                        </div>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`w-full ${
                          isAdding ? 'bg-[#1B5E20]' : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                        } text-white font-extrabold text-lg py-4 px-8 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2`}
                    >
                        <ShoppingCart size={22} />
                        {isAdding ? 'Adding...' : `Add to Cart - $${(productData.price * quantity).toFixed(2)}`}
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 py-2 rounded-lg">
                        <Truck size={14} className="text-[#2E7D32]" /> Free Shipping
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 py-2 rounded-lg">
                        <ShieldCheck size={14} className="text-[#2E7D32]" /> Secure Checkout
                        </div>
                    </div>
                    </div>
                </div>

                {/* Accordions */}
                <div className="border-t border-gray-200">
                    <Accordion title="Ingredients" icon={AlertCircle}>
                    <p>{productData.ingredients}</p>
                    </Accordion>
                    <Accordion title="How to use" defaultOpen={true} icon={Droplets}>
                    <div className="flex flex-col gap-4">
                        <p>{productData.howToUse}</p>
                        <div className="grid grid-cols-3 gap-3">
                        {['Mix', 'Spray', 'Dry'].map((step, i) => (
                            <div key={i} className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                            <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center text-[#2E7D32] font-black text-sm mb-1 shadow-sm">
                                {i + 1}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{step}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    </Accordion>
                    <Accordion title="Shipping & Returns" icon={Truck}>
                    <p>Ships within 1-2 business days. 30-day money back guarantee if you are not satisfied with the results.</p>
                    </Accordion>
                </div>

                </div>
            </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="mt-24 border-t border-gray-200 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Reviews Summary Sidebar */}
                <div className="lg:col-span-4">
                <h2 className="text-3xl font-black font-serif text-gray-900 mb-6">Customer Reviews</h2>
                
                <div className="flex items-end gap-4 mb-6">
                    <span className="text-6xl font-black text-gray-900">4.5</span>
                    <div className="mb-2">
                    <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} className={i >= 4 ? "text-gray-200" : ""} />
                        ))}
                    </div>
                    <p className="text-sm font-bold text-gray-500">Based on 328 reviews</p>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-500 w-3">{star}</span>
                        <Star size={12} className="text-gray-400" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                        ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-400 w-8 text-right">
                        {star === 5 ? '70%' : star === 4 ? '20%' : '5%'}
                        </span>
                    </div>
                    ))}
                </div>

                <button className="w-full bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-3 rounded-xl transition-colors">
                    <Link href="/review">Write a Review</Link>
                </button>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <span className="font-bold text-gray-900">{reviewsData.length} Reviews</span>
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="bg-transparent font-bold text-gray-900 text-sm outline-none cursor-pointer">
                        <option>Most Recent</option>
                        <option>Highest Rated</option>
                        <option>Lowest Rated</option>
                    </select>
                    </div>
                </div>

                <div className="space-y-2">
                    {reviewsData.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
                
                <div className="mt-8 text-center">
                    <button className="text-[#2E7D32] font-bold text-sm hover:underline underline-offset-4">
                    Load More Reviews
                    </button>
                </div>
                </div>
                
            </div>
            </div>

        </div>

        {/* Sticky Bottom Bar for Mobile - UPDATED */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden z-40 pb-safe shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex gap-4 items-center max-w-7xl mx-auto">
                <div className="flex-1">
                <div className="text-xs text-gray-500 font-bold">Total Price</div>
                <div className="text-xl font-black text-[#1A1A1A]">${(productData.price * quantity).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-lg h-12 px-2 bg-gray-50">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="px-2 text-gray-400"
                        disabled={isAdding}
                    >
                        <Minus size={16} />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(quantity + 1)} 
                        className="px-2 text-gray-400"
                        disabled={isAdding}
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`${
                      isAdding ? 'bg-[#1B5E20]' : 'bg-[#2E7D32]'
                    } text-white h-12 px-6 rounded-xl font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-transform flex items-center gap-2`}
                >
                    <ShoppingCart size={20} />
                    <span className="hidden sm:inline">{isAdding ? 'Adding...' : 'Add to Cart'}</span>
                </button>
                </div>
            </div>
        </div>

        </div>
  );
}