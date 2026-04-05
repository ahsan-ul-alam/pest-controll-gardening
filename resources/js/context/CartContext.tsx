// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('turftec_cart');
//     if (savedCart) {
//       try {
//         setCart(JSON.parse(savedCart));
//       } catch (error) {
//         console.error('Error loading cart:', error);
//       }
//     }
//     setIsLoaded(true);
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('turftec_cart', JSON.stringify(cart));
//     }
//   }, [cart, isLoaded]);

//   // Add item to cart
//   const addToCart = (product, quantity = 1) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find(item => item.id === product.id);

//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       return [
//         ...prevCart,
//         {
//           id: product.id,
//           name: product.title,          
//           price: product.price,
//           originalPrice: product.original_price ?? null,
//           image: product.image,
//           variant: product.variant ?? '',
//           inStock: product.inStock ?? true,
//           quantity,
//         }
//       ];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   // Update item quantity
//   const updateQuantity = (productId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }
    
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // Get cart total
//   const getCartTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Get cart count
//   const getCartCount = () => {
//     return cart.reduce((count, item) => count + item.quantity, 0);
//   };

//   const value = {
//     cart,
//     isLoaded, // ← ADDED: Expose isLoaded state
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getCartTotal,
//     getCartCount,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null); // ← NEW

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('turftec_cart');
    const savedPromo = localStorage.getItem('turftec_promo'); // ← NEW
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    
    if (savedPromo) { // ← NEW
      try {
        setAppliedPromo(JSON.parse(savedPromo));
      } catch (error) {
        console.error('Error loading promo:', error);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('turftec_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Save promo to localStorage whenever it changes ← NEW
  useEffect(() => {
    if (isLoaded) {
      if (appliedPromo) {
        localStorage.setItem('turftec_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('turftec_promo');
      }
    }
  }, [appliedPromo, isLoaded]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.title,          
          price: product.price,
          originalPrice: product.original_price ?? null,
          image: product.image,
          variant: product.variant ?? '',
          inStock: product.inStock ?? true,
          quantity,
        }
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null); // ← Clear promo when cart is cleared
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // ──────────────────────────────────────────────────
  //   NEW: Promo Code Functions
  // ──────────────────────────────────────────────────
  
  // Available promo codes (you can move this to a database later)
  const PROMO_CODES = {
    SPRINGREADY20: {
      code: 'SPRINGREADY20',
      discount: 0.20, // 20%
      type: 'percentage',
      description: '20% off your order'
    },
    // Add more promo codes here as needed
    // SUMMER10: {
    //   code: 'SUMMER10',
    //   discount: 0.10,
    //   type: 'percentage',
    //   description: '10% off your order'
    // },
    // FLAT15: {
    //   code: 'FLAT15',
    //   discount: 15,
    //   type: 'fixed',
    //   description: '$15 off your order'
    // }
  };

  // Apply promo code
  const applyPromoCode = (code) => {
    const upperCode = code.trim().toUpperCase();
    const promo = PROMO_CODES[upperCode];
    
    if (!promo) {
      return { success: false, message: 'Invalid promo code' };
    }
    
    setAppliedPromo(promo);
    return { success: true, message: `Promo code applied: ${promo.description}` };
  };

  // Remove promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculate discount amount
  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    
    const subtotal = getCartTotal();
    
    if (appliedPromo.type === 'percentage') {
      return subtotal * appliedPromo.discount;
    } else if (appliedPromo.type === 'fixed') {
      return Math.min(appliedPromo.discount, subtotal); // Don't exceed subtotal
    }
    
    return 0;
  };

  const value = {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    getDiscountAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};