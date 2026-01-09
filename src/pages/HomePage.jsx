import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
// Agregué 'Plug' para el icono de electrodomésticos y quité 'Armchair'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star, Loader, PackageOpen, Award, ShieldCheck, Lock, Snowflake, Headphones, Laptop, BedDouble, Plug } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { bestSellers, loading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920&q=80", title: "Gran Venta de Liquidación", subtitle: "Hasta 50% de descuento en salas seleccionadas", cta: "Ver Ofertas", color: "text-noviyellow", link: "/ofertas" },
    { id: 2, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80", title: "Renueva tu Comedor", subtitle: "Mesas y sillas con diseño exclusivo", cta: "Comprar Ahora", color: "text-white", link: "/categoria/muebles" },
    { id: 3, image: "https://images.unsplash.com/photo-1505693416388-b0346efee539?auto=format&fit=crop&w=1920&q=80", title: "Descanso Perfecto", subtitle: "Colchones y recámaras al mejor precio", cta: "Ver Catálogo", color: "text-noviblue", link: "/categoria/colchones" }
  ];

  // AQUÍ ESTÁ EL CAMBIO PRINCIPAL EN LA ÚLTIMA CATEGORÍA
  const categories = [
    { name: 'Línea Blanca', icon: <Snowflake size={20} />, slug: 'linea-blanca', image: 'https://resources.sears.com.mx/medios-plazavip/fotos/productos_sears1/original/4511460.jpg', color: 'border-noviblue' }, 
    { name: 'Audio', icon: <Headphones size={20} />, slug: 'audio', image: 'https://m.media-amazon.com/images/I/61mOR017+fL.jpg', color: 'border-novired' }, 
    { name: 'Electrónicos', icon: <Laptop size={20} />, slug: 'electronicos', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-skyblue-select-202503?wid=892&hei=820&fmt=jpeg&qlt=90&.v=M2RyY09CWXlTQUp1KzEveHR6VXNxcTQ1bzN1SitYTU83Mm9wbk1xa1lWN2h4SGtCQ2R3aStVaDRhL2VUV1NjdkJkRlpCNVhYU3AwTldRQldlSnpRa0lIV0Fmdk9rUlVsZ3hnNXZ3K3lEVlk', color: 'border-novigreen' }, 
    { name: 'Colchones', icon: <BedDouble size={20} />, slug: 'colchones', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR8bBxwcA8zmAbc5lgPyL7yg_NlPxEAD35KsRwUZa5GZ6G7lM4qecrMkiJlUBUc4mlZBOJ81-fjWVl9pAXxok8ixHsU0YTSPGkEPheuFWjp', color: 'border-noviyellow' }, 
    { 
        name: 'Electrodomésticos', // Nombre cambiado
        icon: <Plug size={20} />, // Icono cambiado a Enchufe
        slug: 'electrodomesticos', // Slug actualizado
        image: 'https://esoquiero.mx/cdn/shop/files/49.jpg?v=1754067860', // Tu imagen nueva
        color: 'border-gray-300' 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1)), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in-down">
      <section className="relative bg-gray-900 overflow-hidden h-[300px] sm:h-[400px] md:h-[500px]">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 md:px-20">
              <h2 className={`text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${slide.color}`}>{slide.title}</h2>
              <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-2xl font-light drop-shadow-md">{slide.subtitle}</p>
              <button onClick={() => navigate(slide.link)} className="bg-noviyellow text-gray-900 hover:bg-white hover:text-noviblue font-bold py-3 px-8 rounded-full text-lg transition transform hover:-translate-y-1 shadow-lg border-2 border-transparent">{slide.cta}</button>
            </div>
          </div>
        ))}
        <button onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm"><ChevronLeft size={32} /></button>
        <button onClick={() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm"><ChevronRight size={32} /></button>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center uppercase tracking-wide">Categorías Populares</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {categories.map((cat, idx) => {
               // Ajustamos la lógica para que Electrodomésticos también se vea bien si quieres imagen completa o contenida
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

      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 border-b pb-4"><div><h2 className="text-3xl font-bold text-gray-900">Más Vendidos</h2><div className="h-1 w-20 bg-noviblue mt-2 rounded-full"></div></div></div>
        {loading ? ( <div className="flex justify-center items-center h-64"><Loader size={40} className="animate-spin text-noviblue" /><span className="ml-3 text-gray-500 font-medium">Cargando destacados...</span></div> ) : 
          bestSellers.length === 0 ? ( <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-gray-100"><PackageOpen size={48} className="mx-auto mb-3 text-gray-300" /><p>No hay productos destacados.</p></div> ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer" onClick={() => navigate(`/producto/${product.id}`)}>
                <div className="relative h-64 overflow-hidden bg-white p-6 flex items-center justify-center">
                  {product.tag && (<span className={`absolute top-4 left-4 ${product.tagColor || 'bg-noviblue'} text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-sm uppercase tracking-wider`}>{product.tag}</span>)}
                  <button className="absolute top-4 right-4 bg-gray-50 p-2 rounded-full text-gray-400 hover:text-novired hover:bg-red-50 transition-colors z-10"><Heart size={18} /></button>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src='https://via.placeholder.com/200?text=Sin+Imagen'}/>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white to-transparent">
                    <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="w-full bg-noviblue text-white font-bold py-3 rounded-lg shadow-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 text-sm"><ShoppingCart size={16} /> Agregar</button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-bold text-base text-gray-800 mb-2 leading-tight group-hover:text-noviblue transition-colors line-clamp-2 min-h-[2.5em]">{product.name}</h3>
                  <div className="flex items-center mb-3">{[...Array(5)].map((_, i) => (<Star key={i} size={12} className={i < product.rating ? "text-noviyellow fill-current" : "text-gray-200"} />))}</div>
                  <div className="flex items-center justify-between mt-auto"><span className="text-xl font-extrabold text-gray-900">${product.price.toLocaleString()}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4"><div className="bg-white rounded-full shadow-lg py-4 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto"><div className="flex items-center gap-4"><div className="bg-gray-50 p-3 rounded-full"><Award size={32} className="text-noviyellow" /></div><div className="text-left"><h3 className="text-xl font-extrabold text-gray-800 leading-none">+50 Años</h3><p className="text-gray-500 text-sm font-medium">De Experiencia</p></div></div><div className="hidden md:block w-px h-10 bg-gray-200"></div><div className="flex items-center gap-4"><div className="bg-gray-50 p-3 rounded-full"><ShieldCheck size={32} className="text-novigreen" /></div><div className="text-left"><h3 className="text-xl font-extrabold text-gray-800 leading-none">Garantía</h3><p className="text-gray-500 text-sm font-medium">Total en tus compras</p></div></div><div className="hidden md:block w-px h-10 bg-gray-200"></div><div className="flex items-center gap-4"><div className="bg-gray-50 p-3 rounded-full"><Lock size={32} className="text-novired" /></div><div className="text-left"><h3 className="text-xl font-extrabold text-gray-800 leading-none">Compra Fácil</h3><p className="text-gray-500 text-sm font-medium">Y 100% Segura</p></div></div></div></div>
      </section>
    </div>
  );
};
export default HomePage;
