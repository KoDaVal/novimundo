import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('novimundo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => { localStorage.setItem('novimundo_cart', JSON.stringify(cart)); }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      }
      return [...prev, { ...product, qty: quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, newQty) => { if (newQty < 1) return; setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item)); };
  const clearCart = () => setCart([]);

  const value = { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQty, clearCart, cartTotal: cart.reduce((acc, item) => acc + (item.price * item.qty), 0), cartCount: cart.reduce((acc, item) => acc + item.qty, 0) };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

