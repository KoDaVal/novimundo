import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { 
  ShoppingCart, Search, Menu, Heart, Star, ChevronRight, ChevronDown, 
  Snowflake, Headphones, Laptop, Lamp, BedDouble 
} from 'lucide-react';

import MobileMenu from './MobileMenu'; 
import CartDrawer from './CartDrawer';
import Logo from './Logo';

const Layout = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQty, cartCount } = useCart();
  const { products } = useProducts(); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // --- LÓGICA DE BÚSQUEDA ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = [
    { name: 'Línea Blanca', icon: <Snowflake size={20} />, slug: 'linea-blanca' }, 
    { name: 'Audio', icon: <Headphones size={20} />, slug: 'audio' }, 
    { name: 'Electrónicos', icon: <Laptop size={20} />, slug: 'electronicos' }, 
    { name: 'Colchones', icon: <BedDouble size={20} />, slug: 'colchones' }, 
    { name: 'Electrodomésticos', icon: <Lamp size={20} />, slug: 'electrodomesticos' }
  ];

  const goHome = () => navigate('/');
  const handleCheckout = () => { setIsCartOpen(false); navigate('/checkout'); };

  // Helper para normalizar texto
  const normalizeText = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

  const handleSearchInput = (e) => {
      const term = e.target.value;
      setSearchTerm(term);

      if (term.length > 1) {
          const lowerTerm = normalizeText(term);
          // Filtrar usando los productos del contexto global
          const filtered = products.filter(prod => {
              return (
                  normalizeText(prod.name).includes(lowerTerm) ||
                  normalizeText(prod.brand).includes(lowerTerm) ||
                  normalizeText(prod.subcategory).includes(lowerTerm) ||
                  normalizeText(prod.category).includes(lowerTerm)
              );
          });
          setSearchSuggestions(filtered.slice(0, 5));
          setShowSuggestions(true);
      } else {
          setSearchSuggestions([]);
          setShowSuggestions(false);
      }
  };

  const executeSearch = () => {
      if (searchTerm.trim() === '') return;
      navigate(`/buscar?q=${searchTerm}`);
      setShowSuggestions(false);
      // Cerrar teclado en móvil
      if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
      }
  };

  const goToProduct = (product) => { 
      navigate(`/producto/${product.id}`); 
      setShowSuggestions(false);
      setSearchTerm('');
  };

  const goToCategory = (cat) => {
      navigate(`/categoria/${cat.slug || cat.name.toLowerCase()}`);
      setIsCategoryOpen(false);
  };

  return (
    <div className="font-montserrat flex flex-col min-h-screen">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap'); .font-montserrat { font-family: 'Montserrat', sans-serif; }`}</style>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} categories={categories} onNavigate={(cat) => {
          if(cat.type === 'offers') navigate('/ofertas');
          else if(cat.type === 'stores') navigate('/sucursales');
          else goToCategory(cat);
          setIsMenuOpen(false);
      }} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onCheckout={handleCheckout} />

      <div className="sticky top-0 z-40 w-full shadow-lg">
        <header className="bg-noviblue h-24 flex items-center justify-between pl-0 pr-4 sm:pr-6 relative z-50">
          <div className="h-full flex-shrink-0 flex items-center justify-start z-50">
              <Logo onClick={goHome} />
          </div>
          
          {/* BUSCADOR DESKTOP */}
          <div className="flex-1 px-4 hidden md:flex items-center justify-center max-w-3xl mx-auto ml-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="¿Qué estás buscando hoy?" 
                className="w-full py-2.5 pl-5 pr-12 rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-inner text-gray-700 placeholder-gray-400 bg-white font-medium" 
                value={searchTerm} 
                onChange={handleSearchInput} 
                onKeyDown={(e) => e.key === 'Enter' && executeSearch()} 
              />
              <button onClick={executeSearch} className="absolute right-1 top-1 bottom-1 bg-noviyellow text-gray-900 rounded-full p-2 hover:bg-yellow-400 transition-colors font-bold"><Search size={20} /></button>
              
              {/* SUGERENCIAS DE BÚSQUEDA */}
              {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-xl border border-gray-100 overflow-hidden z-[100] mt-1 max-h-96 overflow-y-auto">
                      {searchSuggestions.map(item => (
                          <div key={item.id} onMouseDown={() => goToProduct(item)} className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0">
                              <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0"><img src={item.image} alt="" className="w-full h-full object-cover" /></div>
                              <div><p className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</p><p className="text-xs text-gray-400">{item.brand} • {item.subcategory}</p></div>
                          </div>
                      ))}
                  </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 h-full text-white flex-shrink-0">
            {/* SECCIÓN DE CUENTA ELIMINADA */}
            
            <button className="hidden md:flex flex-col items-center hover:text-noviyellow transition duration-300 group"><Heart size={26} className="group-hover:scale-110 transition-transform" /><span className="text-[10px] font-bold mt-1 uppercase tracking-wide">Favoritos</span></button>
            <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center hover:text-noviyellow transition duration-300 mr-1 group">
              <ShoppingCart size={30} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (<span className="absolute -top-1 -right-2 bg-novired text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md border border-white">{cartCount}</span>)}
              <span className="hidden md:block text-[10px] font-bold mt-1 uppercase tracking-wide">Carrito</span>
            </button>
            <button className="md:hidden text-white ml-2" onClick={() => setIsMenuOpen(true)}><Menu size={32} /></button>
          </div>
        </header>

        <nav className="bg-gray-100 border-b border-gray-200 hidden md:block z-40 relative">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-12">
               <div className="relative h-full flex items-center" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
                 <button className="flex items-center gap-2 font-bold text-gray-700 hover:text-noviblue transition-colors h-full px-4 border-r border-gray-200 tracking-wide text-sm"><Menu size={20} /> TODAS LAS CATEGORÍAS <ChevronDown size={16} /></button>
                 {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-noviblue py-2 rounded-b-lg overflow-hidden animate-fade-in-down">
                        {categories.map((cat, idx) => (<button key={idx} onClick={() => goToCategory(cat)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-noviblue transition-colors text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0 text-left"><span className="text-gray-400 group-hover:text-noviblue">{cat.icon}</span>{cat.name}<ChevronRight size={14} className="ml-auto text-gray-300" /></button>))}
                    </div>
                 )}
               </div>
               <ul className="flex items-center gap-6 text-xs font-bold text-gray-600 tracking-wider uppercase">
                  <li className="cursor-pointer hover:text-noviblue transition" onClick={() => navigate('/sucursales')}>Tiendas</li>
                  <li className="cursor-pointer hover:text-noviblue transition" onClick={() => navigate('/ayuda')}>Ayuda</li>
                  <li onClick={() => navigate('/ofertas')} className="text-novired hover:text-red-700 cursor-pointer font-extrabold flex items-center gap-1 text-sm"><Star size={16} fill="currentColor"/> OFERTAS DEL DÍA</li>
               </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* BUSCADOR MÓVIL (ACTIVADO) */}
      <div className="md:hidden bg-noviblue pb-4 px-4 shadow-md sticky top-24 z-40">
        <div className="relative w-full">
            <input 
                type="text" 
                placeholder="Buscar muebles..." 
                className="w-full py-2 pl-4 pr-10 rounded-lg border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-noviyellow text-gray-800 font-montserrat"
                value={searchTerm}
                onChange={handleSearchInput}
                onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
            />
            <button 
                onClick={executeSearch}
                className="absolute right-3 top-2.5 text-noviblue"
            >
                <Search size={18} />
            </button>
        </div>
      </div>
      
      <main className="flex-1"><Outlet /></main>

      <footer className="bg-gray-900 text-white mt-auto pt-16 pb-8 border-t-4 border-noviyellow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Columna 1: Logo y Eslogan */}
            <div>
              <h4 className="text-2xl font-bold text-noviblue mb-4">Novimundo</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                las mejores marcas al mejor precio, siempre!
              </p>
            </div>

            {/* Columna 2: Enlaces Rápidos */}
            <div>
              <h5 className="font-bold mb-4 text-gray-200 tracking-wide uppercase text-sm">Enlaces Rápidos</h5>
              <ul className="space-y-2 text-sm text-gray-400 font-medium">
                <li 
                  className="hover:text-noviblue cursor-pointer transition-colors" 
                  onClick={() => navigate('/nosotros')}
                >
                  Nosotros
                </li>
                <li 
                  className="hover:text-noviblue cursor-pointer transition-colors" 
                  onClick={() => navigate('/sucursales')}
                >
                  Sucursales
                </li>
              </ul>
            </div>

            {/* Columna 3: Atención al Cliente */}
            <div>
              <h5 className="font-bold mb-4 text-gray-200 tracking-wide uppercase text-sm">Atención al Cliente</h5>
              <ul className="space-y-2 text-sm text-gray-400 font-medium">
                <li 
                  className="hover:text-noviblue cursor-pointer transition-colors" 
                  onClick={() => navigate('/preguntas-frecuentes')}
                >
                  Preguntas Frecuentes
                </li>
                <li 
                  className="hover:text-noviblue cursor-pointer transition-colors" 
                  onClick={() => navigate('/preguntas-frecuentes')}
                >
                  Garantías
                </li>
              </ul>
            </div>

          </div>

          {/* Barra inferior: Copyright y Legales */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
            <p>&copy; 2026 Novimundo. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span 
                className="cursor-pointer hover:text-gray-300" 
                onClick={() => navigate('/terminos-y-condiciones')}
              >
                Aviso de Privacidad
              </span>
              <span 
                className="cursor-pointer hover:text-gray-300" 
                onClick={() => navigate('/terminos-y-condiciones')}
              >
                Términos y Condiciones
              </span>
            </div>
          </div>
        </div>
      </footer>
      <style>{`.text-noviblue { color: #009CD3; } .bg-noviblue { background-color: #009CD3; } .border-noviblue { border-color: #009CD3; } .text-novired { color: #ED1C24; } .bg-novired { background-color: #ED1C24; } .border-novired { border-color: #ED1C24; } .text-noviyellow { color: #FFC90E; } .bg-noviyellow { background-color: #FFC90E; } .border-noviyellow { border-color: #FFC90E; } .text-novigreen { color: #B5E61D; } .bg-novigreen { background-color: #B5E61D; } .border-novigreen { border-color: #B5E61D; } @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }`}</style>
    </div>
  );
};

export default Layout;
