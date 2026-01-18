// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mueve la ventana al inicio (0, 0) cada vez que cambia la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
