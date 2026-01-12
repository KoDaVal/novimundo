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

  // --- LÓGICA MODIFICADA: SOLO 1 POR PERSONA ---
  const addToCart = (product) => {
    setCart(prev => {
      // 1. Verificamos si el producto ya existe por su ID
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        // 2. Si YA existe, NO hacemos nada (no sumamos cantidad).
        // Solo retornamos el estado anterior tal cual.
        return prev;
      }
      
      // 3. Si NO existe, lo agregamos forzando 'qty: 1'
      return [...prev, { ...product, qty: 1 }];
    });
    
    // Abrimos el carrito para confirmar al usuario
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  // La función updateQty ya no es necesaria para sumar, pero la dejamos para no romper otros componentes,
  // aunque ya no la usaremos en el Drawer.
  const updateQty = (id, newQty) => { 
      if (newQty < 1) return; 
      // Opcional: Podrías forzar aquí también que newQty nunca sea > 1
      setCart(prev => prev.map(item => item.id === id ? { ...item, qty: 1 } : item)); 
  };
  
  const clearCart = () => setCart([]);

  const value = { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    removeFromCart, 
    updateQty, 
    clearCart, 
    cartTotal: cart.reduce((acc, item) => acc + (item.price * item.qty), 0), 
    cartCount: cart.reduce((acc, item) => acc + item.qty, 0) 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
