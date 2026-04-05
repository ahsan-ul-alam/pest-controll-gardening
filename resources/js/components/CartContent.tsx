import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Tag,
  ShoppingCart,
  X,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useCart } from '../context/CartContext';

export default function CartContent() {
  const {
    cart,
    isLoaded,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    getDiscountAmount,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(''); 
  const [promoSuccess, setPromoSuccess] = useState(''); 

  // Show loading state while cart loads from localStorage
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Calculations
  const subtotal = getCartTotal();
  const discountAmount = getDiscountAmount();
  const shippingThreshold = 75;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 9.99;
  const taxEstimate = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shippingCost + taxEstimate;

  const hasItems = cart.length > 0;

  // ──────────────────────────────────────────────────
  //   NEW: Handle Promo Code Application
  // ──────────────────────────────────────────────────
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    const result = applyPromoCode(promoCode);
    
    if (result.success) {
      setPromoSuccess(result.message);
      setPromoCode('');
      // Clear success message after 3 seconds
      setTimeout(() => setPromoSuccess(''), 3000);
    } else {
      setPromoError(result.message);
    }
  };

  // Handle removing promo code
  const handleRemovePromo = () => {
    removePromoCode();
    setPromoError('');
    setPromoSuccess('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-black font-serif text-gray-900 mb-8">
        Your Cart
      </h1>

      {hasItems ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8">
            {/* Cart List */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex flex-col sm:flex-row gap-6 group hover:bg-gray-50/40 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name || item.title || 'Product'}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        onError={(e) =>
                          (e.currentTarget.src =
                            'https://placehold.co/400x500/eee/999?text=No+Image')
                        }
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                              {item.name || item.title || 'Unnamed Product'}
                            </h3>
                            {(item.variant || item.subtitle) && (
                              <p className="text-gray-500 text-sm mt-1">
                                {item.variant || item.subtitle}
                              </p>
                            )}
                            {item.inStock !== false ? (
                              <span className="text-xs font-bold text-[#2E7D32] mt-2 inline-block">
                                In Stock
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-red-500 mt-2 inline-block">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-black text-lg text-gray-900">
                              $
                              {(
                                (item.price || 0) * (item.quantity || 1)
                              ).toFixed(2)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-sm text-gray-400 line-through">
                                $
                                {(
                                  (item.originalPrice || 0) *
                                  (item.quantity || 1)
                                ).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-between items-end mt-4 sm:mt-0">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, (item.quantity || 1) - 1),
                                )
                              }
                              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                              disabled={(item.quantity || 1) <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-900">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, (item.quantity || 1) + 1)
                              }
                              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-600 text-sm flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold font-serif mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* NEW: Show Discount if promo applied */}
                {appliedPromo && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span className="flex items-center gap-2">
                      Discount ({appliedPromo.code})
                      <button
                        onClick={handleRemovePromo}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove promo code"
                      >
                        <X size={14} />
                      </button>
                    </span>
                    <span className="font-bold">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping estimate</span>
                  {isFreeShipping ? (
                    <span className="font-bold text-[#2E7D32]">FREE</span>
                  ) : (
                    <span className="font-bold text-gray-900">
                      ${shippingCost.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax estimate</span>
                  <span className="font-bold text-gray-900">
                    ${taxEstimate.toFixed(2)}
                  </span>
                </div>

                {/* Promo Code - UPDATED */}
                {!appliedPromo && (
                  <div className="pt-4 pb-2">
                    <label
                      htmlFor="promo"
                      className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
                    >
                      <Tag size={14} className="text-[#2E7D32]" />
                      Promo Code
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="promo"
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError('');
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleApplyPromo();
                          }
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-4 pr-24 text-gray-900 text-sm focus:outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="absolute right-1 top-1 bottom-1 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 rounded-md transition-colors shadow-sm"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-xs mt-2">{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p className="text-[#2E7D32] text-xs mt-2">{promoSuccess}</p>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-base font-black text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/"
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold py-4 rounded-xl shadow-lg shadow-green-900/20 mt-8 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>

              <div className="mt-6 flex flex-col gap-3 text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck size={14} className="text-[#2E7D32]" />
                  <span>Secure checkout guaranteed</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CreditCard size={14} />
                  <span>Ships within 1-2 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6 text-[#2E7D32]">
            <ShoppingCart size={48} />
          </div>
          <h2 className="text-3xl font-black font-serif text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Looks like you haven't added anything yet. Let's find something great for your project!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#2E7D32] text-white hover:brightness-110 font-extrabold py-4 px-10 rounded-full transition-all shadow-sm"
          >
            Browse Products
            <ChevronRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}