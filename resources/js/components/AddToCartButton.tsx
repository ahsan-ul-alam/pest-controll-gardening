import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ 
  product, 
  quantity = 1, 
  className = "",
  showIcon = true,
  size = "default" // "small", "default", "large"
}) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sizeClasses = {
    small: "p-2",
    default: "p-3",
    large: "py-3.5 px-6"
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
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
    flyingImage.style.width = '60px';
    flyingImage.style.height = '60px';
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
        padding: 8px;
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
        flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 30}px`;
        flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 30}px`;
        flyingImage.style.transform = 'scale(0.3) rotate(360deg)';
        flyingImage.style.opacity = '0';
      });
    });
    
    // Add to cart after animation starts
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
      setShowSuccess(true);
      
      // Remove flying image
      flyingImage.remove();
      
      // Reset success state
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 800);
  };

  if (showSuccess) {
    return (
      <button 
        className={`${className} ${sizeClasses[size]} bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold transition-all`}
        disabled
      >
        <Check size={20} className="animate-bounce" />
        <span className="hidden group-hover/btn:inline">Added!</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${className} ${sizeClasses[size]} ${
        isAdding 
          ? 'bg-emerald-400 cursor-wait' 
          : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
      } text-white rounded-xl shadow-lg shadow-gray-200 hover:shadow-emerald-500/30 transition-all duration-300 group/btn cursor-pointer flex items-center justify-center`}
    >
      {showIcon && (
        <ShoppingCart size={20} className="stroke-2 group-hover/btn:hidden" />
      )}
      <span className={`${showIcon ? 'hidden group-hover/btn:inline' : 'inline'} font-bold text-sm px-1`}>
        {isAdding ? 'Adding...' : 'Add'}
      </span>
    </button>
  );
};

export default AddToCartButton;