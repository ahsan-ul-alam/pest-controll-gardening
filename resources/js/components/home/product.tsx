import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Truck, ShoppingCart, Sparkles, TrendingUp, Eye, X, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import AddToCartButton from '../AddToCartButton';
import { router } from '@inertiajs/react';

const mockProducts = [
  {
    id: 1,
    badge: { text: 'SAVE $6', type: 'save' },
    image: '/images/products/aerate_quart_gallons.png',
    title: 'Lawn Strong Liquid Fertilizer',
    subtitle: 'Premium Root Support',
    price: 54.00,
    originalPrice: 60.00,
    rating: 5,
    reviewCount: 1,
    isFreeShipping: true,
    category: 'Fertilizer',
    description: "Our advanced formula promotes deep root growth and vibrant green color without the rapid surge growth of traditional fertilizers. Safe for pets and kids immediately after application."
  },
  {
    id: 2,
    badge: { text: 'SAVE $8', type: 'save' },
    image: '/images/products/heatguard_quart_gallon.png',
    title: 'Bug Doom Home Insect Control',
    subtitle: 'Gallon with Wand (2-pack)',
    price: 72.00,
    originalPrice: 80.00,
    rating: 4,
    reviewCount: 53,
    isFreeShipping: true,
    category: 'Pest Control',
    description: "Keep your home pest-free with our eco-friendly barrier spray. Effective against ants, spiders, roaches, and more. Includes a battery-operated wand for easy application."
  },
  {
    id: 3,
    badge: { text: 'BUNDLE & SAVE', type: 'bundle' },
    image: '/images/products/kickstart_ quart_gallon.png',
    title: 'Indoor & Outdoor Pest Kit',
    subtitle: 'Complete Home Protection',
    price: 60.00,
    originalPrice: 75.00,
    rating: 4.8,
    reviewCount: 12,
    isFreeShipping: true,
    category: 'Bundles',
    description: "The ultimate defense package. Includes Bug Doom for perimeter protection and our Mosquito Deleter for yard coverage. Enjoy a bug-free season inside and out."
  },
  {
    id: 4,
    badge: { text: 'SAVE $8.80', type: 'save' },
    image: '/images/products/neutralyze_quart_gallon.png',
    title: 'Dandelion Doom Herbicide',
    subtitle: 'Concentrate Refill (2-pack)',
    price: 35.20,
    originalPrice: 44.00,
    rating: 4.5,
    reviewCount: 119,
    isFreeShipping: true,
    category: 'Weed Control',
    description: "Iron-based herbicide that kills broadleaf weeds down to the root without harming your grass. Visible results in hours. Perfect for spot treatment."
  },
  {
    id: 5,
    badge: { text: 'BEST SELLER', type: 'bestseller' },
    image: '/images/products/aerate_quart_gallons.png',
    title: 'Weed Warrior Herbicide',
    subtitle: 'Concentrate Starter (2-pack)',
    price: 43.20,
    originalPrice: 54.00,
    rating: 5,
    reviewCount: 72,
    isFreeShipping: true,
    category: 'Weed Control',
    description: "Our strongest formula for tough weeds like clover, moss, and algae. Certified organic and safe for use around vegetable gardens."
  },
  {
    id: 6,
    badge: { text: 'SAVE $5', type: 'save' },
    image: '/images/products/heatguard_quart_gallon.png',
    title: 'Mosquito Deleter Concentrate',
    subtitle: 'Refill (2-pack)',
    price: 45.00,
    originalPrice: 50.00,
    rating: 4,
    reviewCount: 25,
    isFreeShipping: true,
    category: 'Pest Control',
    description: "Reclaim your backyard. This cedar oil-based concentrate repels mosquitoes, ticks, and fleas. Connects directly to your hose for easy spraying."
  },
];

// --- Quick View Modal Component ---
const QuickViewModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!product) return null;

  const handleAddToCart = (e) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    // Get cart icon position
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon) return;
    
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Create flying product image
    const flyingImage = document.createElement('div');
    flyingImage.style.position = 'fixed';
    flyingImage.style.left = `${buttonRect.left}px`;
    flyingImage.style.top = `${buttonRect.top}px`;
    flyingImage.style.width = '80px';
    flyingImage.style.height = '80px';
    flyingImage.style.zIndex = '9999';
    flyingImage.style.pointerEvents = 'none';
    flyingImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Create image container with shadow
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
          src="${product.image}" 
          alt="${product.title}"
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
    
    // Trigger animation
    setIsAdding(true);
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 40}px`;
        flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 40}px`;
        flyingImage.style.transform = 'scale(0.2) rotate(360deg)';
        flyingImage.style.opacity = '0';
      });
    });
    
    // Add to cart after animation starts
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
      
      // Remove flying image
      flyingImage.remove();
      
      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 300);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-12 relative">
           <img 
             src={product.image} 
             alt={product.title} 
             className="w-full h-full max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply"
           />
           {product.badge && (
             <div className="absolute top-6 left-6 bg-[#2E7D32] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
               {product.badge.text}
             </div>
           )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="mb-auto">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-serif leading-tight mb-2">
              {product.title}
            </h2>
            <p className="text-gray-500 font-medium text-lg mb-4">{product.subtitle}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-200" : ""} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-bold underline decoration-gray-300 underline-offset-4">
                {product.reviewCount} Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-[#2E7D32]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-medium">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
              {product.description || "Premium lawn care product designed to deliver professional results at home. Easy to use, safe for pets, and backed by our satisfaction guarantee."}
            </p>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-100 pt-6 mt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add Button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 ${
                  isAdding ? 'bg-[#1B5E20]' : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                } text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-green-900/20 transition-transform active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                <ShoppingCart size={20} />
                {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
            
            {product.isFreeShipping && (
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide justify-center sm:justify-start">
                <Truck size={14} className="text-[#2E7D32]" />
                Free Shipping on this item
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const ProductCard = ({ product, onQuickView }) => {
  const badgeConfig = {
    save: {
      bg: 'bg-rose-500',
      text: 'text-white',
      shadow: 'shadow-rose-500/30',
      icon: null,
    },
    bundle: {
      bg: 'bg-violet-600',
      text: 'text-white',
      shadow: 'shadow-violet-600/30',
      icon: <Sparkles className="w-3 h-3" />,
    },
    bestseller: {
      bg: 'bg-amber-400',
      text: 'text-amber-950',
      shadow: 'shadow-amber-400/30',
      icon: <TrendingUp className="w-3 h-3" />,
    },
  };

  const badge = product.badge ? badgeConfig[product.badge.type] : null;

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : i < rating
                ? 'fill-amber-400 text-amber-400 opacity-50'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const savingsPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="w-80 flex-shrink-0 group relative">
      <div className="h-full bg-white rounded-3xl p-5 flex flex-col transition-all duration-500 border border-gray-100 hover:border-transparent hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative z-10 overflow-hidden">
        
        {/* Hover Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Badges */}
        <div className="flex justify-between items-start mb-4 relative z-20">
          {savingsPercent > 0 ? (
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-wider uppercase px-2 py-1 rounded-lg border border-emerald-100">
              -{savingsPercent}%
            </span>
          ) : <div></div>}

          {product.badge && badge && (
            <span className={`${badge.bg} ${badge.text} ${badge.shadow} shadow-lg px-3 py-1 text-[10px] font-bold tracking-wide uppercase rounded-full flex items-center gap-1.5`}>
              {badge.icon}
              {product.badge.text}
            </span>
          )}
        </div>

        {/* Image Area */}
        <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
          <div className="absolute inset-0 bg-gray-100/50 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 origin-bottom-right" />
          <div className="relative bg-gray-50 rounded-2xl p-6 overflow-hidden">
             <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-contain mix-blend-multiply filter contrast-105"
            />
            
            {/* Quick View Button on Hover */}
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <button 
                 onClick={() => onQuickView(product)}
                 className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-emerald-50 hover:text-[#2E7D32] cursor-pointer"
               >
                 <Eye size={16} /> Quick View
               </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2 relative z-20">
          <div>
            <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => router.visit('/product/post')}>
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-gray-500 text-xs font-medium mt-1">{product.subtitle}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1">
            {renderStars(product.rating)}
            <span className="text-gray-400 text-xs font-medium pt-0.5">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price & Shipping */}
          <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-extrabold text-2xl">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 text-sm line-through decoration-red-400/50">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.isFreeShipping && (
                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-wide mt-1">
                  <Truck size={12} />
                  <span>Free Shipping</span>
                </div>
              )}
            </div>

            <AddToCartButton 
              product={product}
              className="bg-emerald-600"
              size="default"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductSection() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="w-full py-24 bg-[#FAFAF9] relative overflow-hidden font-sans">
      
      {/* Background Mesh Gradient (Subtle) */}
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-emerald-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 mix-blend-multiply pointer-events-none" />

      {/* Styles for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-4 font-poppins">
              What Your Lawn Needs
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Popular products loved by lawn care enthusiasts. Limited time savings on premium solutions.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* Left Navigation Button */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 md:-left-4 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full border shadow-xl transition-all duration-300 flex items-center justify-center bg-white/90 backdrop-blur-md ${
              !canScrollLeft 
                ? 'opacity-0 pointer-events-none' 
                : 'border-gray-100 text-gray-900 hover:border-emerald-500 hover:text-emerald-600 hover:scale-110 active:scale-95'
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-12 pt-4 pl-4"
            onScroll={checkScrollButtons}
          >
            {mockProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-4 md:-right-4 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full border shadow-xl transition-all duration-300 flex items-center justify-center bg-white/90 backdrop-blur-md ${
              !canScrollRight 
                ? 'opacity-0 pointer-events-none' 
                : 'border-gray-100 text-gray-900 hover:border-emerald-500 hover:text-emerald-600 hover:scale-110 active:scale-95'
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Mobile Overlay Gradients for scroll hints */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAFAF9] to-transparent md:hidden pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAF9] to-transparent md:hidden pointer-events-none z-20" />
        </div>

        <div className="mt-4 text-center">
            <a href="/products" className="inline-flex items-center text-sm font-bold text-gray-900 border-b-2 border-transparent hover:border-emerald-500 transition-colors pb-1">
               View All Products <ChevronRight size={16} className="ml-1" />
            </a>
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </section>
  );
}