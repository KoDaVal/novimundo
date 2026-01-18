import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star, Loader, PackageOpen, Award, ShieldCheck, Lock, Snowflake, Headphones, Laptop, BedDouble, Plug, CheckCircle } from 'lucide-react';
// IMPORTANTE: SEO
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { bestSellers, loading } = useProducts();
    
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerSlides, setBannerSlides] = useState([]);

  // --- DATOS PARA GOOGLE (SEO MULTI-SUCURSAL) ---
  const multiLocationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FurnitureStore",
        "name": "Novimundo Tonalá (Matriz)",
        "image": "https://novimundo.netlify.app/logo.png",
        "description": "Mueblería y electrónica en el centro de Tonalá.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Rayon Esq 15 de Febrero, Col. Centro",
          "addressLocality": "Tonalá",
          "addressRegion": "Chiapas",
          "postalCode": "30500",
          "addressCountry": "MX"
        },
        "telephone": "+529666631003",
        "priceRange": "$$"
      },
      {
        "@type": "FurnitureStore",
        "name": "Novimundo Mapastepec",
        "description": "La mejor tienda de línea blanca y muebles en Mapastepec.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mapastepec",
          "addressRegion": "Chiapas",
          "addressCountry": "MX"
        },
        "priceRange": "$$"
      },
      {
        "@type": "FurnitureStore",
        "name": "Novimundo Escuintla",
        "description": "Electrodomésticos y colchones a crédito en Escuintla.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Escuintla",
          "addressRegion": "Chiapas",
          "addressCountry": "MX"
        },
        "priceRange": "$$"
      }
    ]
  };

  // ✅ ÚNICO BANNER POR DEFECTO (Si falla la Google Sheet)
  // Asegúrate de tener "bannerDefault.png" en la carpeta /public
  const defaultSlides = [
    { id: 1, image: "/bannerDefault.png", link: "" }
  ];

  // FETCH BANNERS
  useEffect(() => {
    const fetchBanners = async () => {
        try {
            const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vReghg6xM6cC5_C3w4ZqkgImVW8lrreL3Oo8c3onylbpDROhRTHldO4OZuN27EKBmkmRjlejhAD2tey/pub?gid=100796148&single=true&output=csv');
            const text = await response.text();
            const rows = text.split('\n').slice(1);
            const loadedSlides = rows.map((row, index) => {
                const columns = row.split(',');
                if (columns.length < 1) return null;
                const image = columns[0]?.trim().replace(/^"|"$/g, '');
                const link = columns[1]?.trim().replace(/^"|"$/g, '');
                if (!image) return null; 
                return { id: `banner-${index}`, image: image, link: link || '' };
            }).filter(Boolean);
            if (loadedSlides.length > 0) setBannerSlides(loadedSlides);
        } catch (error) { console.error("Error banners", error); }
    };
    fetchBanners();
  }, []);

  const activeSlides = bannerSlides.length > 0 ? bannerSlides : defaultSlides;

  const categories = [
    { name: 'Línea Blanca', icon: <Snowflake size={20} />, slug: 'linea-blanca', image: 'https://resources.sears.com.mx/medios-plazavip/fotos/productos_sears1/original/4511460.jpg', color: 'border-noviblue' }, 
    { name: 'Audio', icon: <Headphones size={20} />, slug: 'audio', image: 'https://www.megaaudio.com.mx/cdn/shop/files/Bafle-Profesional-Recargable-KSR-MSA-7515MX-01.jpg?v=1698426215', color: 'border-novired' }, 
    { name: 'Electrónicos', icon: <Laptop size={20} />, slug: 'electronicos', image: 'https://www.rac.mx/wp-content/uploads/2024/11/television-hisense-43-pulgadas-full-hd-smart-tv.jpg', color: 'border-novigreen' }, 
    { name: 'Colchones', icon: <BedDouble size={20} />, slug: 'colchones', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR8bBxwcA8zmAbc5lgPyL7yg_NlPxEAD35KsRwUZa5GZ6G7lM4qecrMkiJlUBUc4mlZBOJ81-fjWVl9pAXxok8ixHsU0YTSPGkEPheuFWjp', color: 'border-noviyellow' }, 
    { name: 'Electrodomésticos', icon: <Plug size={20} />, slug: 'electrodomesticos', image: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/962cf107-c3aa-4e71-bd63-1de21c0fe10a.46e2283af9c989070f50fb2bf0707fe3.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', color: 'border-gray-300' }
  ];

  useEffect(() => {
    // Si solo hay un slide (el default), no necesitamos intervalo
    if (activeSlides.length <= 1) return;
    
    const timer = setInterval(() => setCurrentSlide(prev => (prev === activeSlides.length - 1 ? 0 : prev + 1)), 5000);
    return () => clearInterval(timer);
  }, [activeSlides]);

  return (
    <div className="animate-fade-in-down">
      
      {/* --- SEO POTENTE PARA TODA LA COSTA --- */}
      <Helmet>
        <title>Mueblería en Tonalá, Mapastepec y Escuintla | Novimundo</title>
        <meta name="description" content="Novimundo: Tu cadena de muebles y electrónica líder en la Costa de Chiapas. Sucursales en Tonalá, Mapastepec y Escuintla. Envíos gratis y crédito fácil." />
        <meta name="keywords" content="muebleria tonala, muebleria mapastepec, muebleria escuintla, refrigeradores chiapas, linea blanca, novimundo" />
        <script type="application/ld+json">
          {JSON.stringify(multiLocationSchema)}
        </script>
      </Helmet>

      {/* CARRUSEL OPTIMIZADO */}
      <section className="relative bg-gray-100 overflow-hidden w-full h-[200px] sm:h-[350px] md:h-[550px]">
        {activeSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            onClick={() => { if(slide.link) navigate(slide.link); }}
          >
            <img 
                src={slide.image} 
                alt="Oferta Novimundo" 
                className="w-full h-full object-cover object-center"
            />
            
            {slide.title && (
                 <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 md:px-20 bg-black/30">
                    <h2 className={`text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${slide.color || 'text-white'}`}>{slide.title}</h2>
                    <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-2xl font-light drop-shadow-md">{slide.subtitle}</p>
                    <button className="bg-noviyellow text-gray-900 hover:bg-white hover:text-noviblue font-bold py-3 px-8 rounded-full text-lg transition transform hover:-translate-y-1 shadow-lg border-2 border-transparent">Ver Más</button>
                 </div>
            )}
          </div>
        ))}
        {/* Solo mostramos flechas si hay más de 1 slide */}
        {activeSlides.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setCurrentSlide(prev => (prev === 0 ? activeSlides.length - 1 : prev - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all"><ChevronLeft size={24} className="md:w-8 md:h-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); setCurrentSlide(prev => (prev === activeSlides.length - 1 ? 0 : prev + 1)); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all"><ChevronRight size={24} className="md:w-8 md:h-8" /></button>
          </>
        )}
      </section>

      {/* CATEGORÍAS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center uppercase tracking-wide">Categorías Populares</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {categories.map((cat, idx) => {
               const isFullImage = ['Colchones', 'Electrodomésticos'].includes(cat.name);
               const imgClass = isFullImage ? "w-full h-full object-cover p-0 transition-transform duration-500 group-hover:scale-110" : "w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110";
               return (
                <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={() => navigate(`/categoria/${cat.slug}`)}>
                  <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 ${cat.color} p-1 mb-4 transition-transform transform group-hover:scale-105 overflow-hidden bg-white shadow-lg`}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-300 overflow-hidden relative"><div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 rounded-full"></div><img src={cat.image} alt={cat.name} className={imgClass} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} /></div>
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-noviblue text-sm tracking-wide uppercase">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÁS VENDIDOS */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 border-b pb-4"><div><h2 className="text-3xl font-bold text-gray-900">Más Vendidos</h2><div className="h-1 w-20 bg-noviblue mt-2 rounded-full"></div></div></div>
        {loading ? ( <div className="flex justify-center items-center h-64"><Loader size={40} className="animate-spin text-noviblue" /><span className="ml-3 text-gray-500 font-medium">Cargando destacados...</span></div> ) : 
          bestSellers.length === 0 ? ( <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-gray-100"><PackageOpen size={48} className="mx-auto mb-3 text-gray-300" /><p>No hay productos destacados.</p></div> ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => {
              // Verificamos si está en carrito
              const isInCart = cart.some(item => item.id === product.id);

              return (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer" onClick={() => navigate(`/producto/${product.id}`)}>
                    <div className="relative h-64 overflow-hidden bg-white p-6 flex items-center justify-center">
                    {product.tag && (<span className={`absolute top-4 left-4 ${product.tagColor || 'bg-noviblue'} text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-sm uppercase tracking-wider`}>{product.tag}</span>)}
                    <button className="absolute top-4 right-4 bg-gray-50 p-2 rounded-full text-gray-400 hover:text-novired hover:bg-red-50 transition-colors z-10"><Heart size={18} /></button>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src='https://via.placeholder.com/200?text=Sin+Imagen'}/>
                    
                    {/* BOTÓN DE COMPRA */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white to-transparent">
                        {product.inStock ? (
                            isInCart ? (
                                <button disabled className="w-full bg-green-100 text-green-700 font-bold py-3 rounded-lg shadow-none flex items-center justify-center gap-2 text-sm cursor-default">
                                    <CheckCircle size={16} /> En el Carrito
                                </button>
                            ) : (
                                <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="w-full bg-noviblue text-white font-bold py-3 rounded-lg shadow-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 text-sm">
                                    <ShoppingCart size={16} /> Agregar
                                </button>
                            )
                        ) : (
                            <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-lg shadow-none cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                                <ShoppingCart size={16} /> Agotado
                            </button>
                        )}
                    </div>

                    </div>
                    <div className="p-5">
                    <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">{product.category}</p>
                    <h3 className="font-bold text-base text-gray-800 mb-2 leading-tight group-hover:text-noviblue transition-colors line-clamp-2 min-h-[2.5em]">{product.name}</h3>
                    <div className="flex items-center mb-3">{[...Array(5)].map((_, i) => (<Star key={i} size={12} className={i < product.rating ? "text-noviyellow fill-current" : "text-gray-200"} />))}</div>
                    <div className="flex items-center justify-between mt-auto"><span className="text-xl font-extrabold text-gray-900">${product.price.toLocaleString()}</span></div>
                    </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ICONOS DE CONFIANZA */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4"><div className="bg-white rounded-full shadow-lg py-4 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto"><div className="flex items-center gap-4"><div className="bg-gray-50 p-3 rounded-full"><Award size={32} className="text-noviyellow" /></div><div className="text-left"><h3 className="text-xl font-extrabold text-gray-800 leading-none">+50 Años</h3><p className="text-gray-500 text-sm font-medium">De Experiencia</p></div></div><div className="hidden md:block w-px h-10 bg-gray-200"></div><div className="flex items-center gap-4"><div className="bg-gray-50 p-3 rounded-full"><ShieldCheck size={32} className="text-novigreen" /></div><div className="text-left"><h3 className="text-xl font-extrabold text-gray-800 leading-none">Garantía</h3><p className="text-gray-500 text-sm font-medium">Total en tus compras</p></div></div><div className="hidden md:block w-px h-10 bg-gray-200"></div><div className="flex items-center gap-4"><div className="bg-gray-50 p-3 rounded-full"><Lock size={32} className="text-novired" /></div><div className="text-left"><h3 className="text-xl font-extrabold text-gray-800 leading-none">Compra Fácil</h3><p className="text-gray-500 text-sm font-medium">Y 100% Segura</p></div></div></div></div>
      </section>
    </div>
  );
};
export default HomePage;
