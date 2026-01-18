import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
// Agregamos 'ChevronDown' para la flecha personalizada del select
import { Filter, Check, ChevronRight, PackageOpen, ShoppingCart, Ban, ChevronDown } from 'lucide-react'; 

const CategoryPage = ({ isSearch = false, isOffers = false }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedSubcats, setSelectedSubcats] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  // Estado inicial 'default' (sin orden específico aún)
  const [sortOrder, setSortOrder] = useState('default');

  const getPageTitle = () => {
      if (isSearch) return `Resultados para "${searchTerm}"`;
      if (isOffers) return "Ofertas del Día";
      if (!slug) return "Catálogo";
      return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const displayedProductsBase = products.filter(prod => {
      if (isOffers) return prod.tag && prod.tag.trim() !== '';
      const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
      
      if (isSearch) {
          const lowerTerm = normalize(searchTerm);
          return (normalize(prod.name).includes(lowerTerm) || normalize(prod.brand).includes(lowerTerm) || normalize(prod.subcategory).includes(lowerTerm) || normalize(prod.category).includes(lowerTerm));
      }
      const prodCat = normalize(prod.category);
      const currentCatSlug = slug ? slug.replace(/-/g, ' ') : '';
      if (currentCatSlug === 'linea blanca' && (prodCat === 'linea_blanca' || prodCat.includes('linea blanca'))) return true;
      if (prodCat.includes(currentCatSlug)) return true;
      return false;
  });

  const dynamicSubcats = [...new Set(displayedProductsBase.map(p => p.subcategory).filter(Boolean))].sort();
  const dynamicBrands = [...new Set(displayedProductsBase.map(p => p.brand).filter(Boolean))].sort();

  const filteredProducts = displayedProductsBase.filter(prod => {
      if (prod.price < (priceRange.min || 0) || prod.price > (priceRange.max || 50000)) return false;
      if (selectedSubcats.length > 0 && !selectedSubcats.includes(prod.subcategory)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(prod.brand)) return false;
      return true;
  });

  // Lógica de ordenamiento (Solo precio)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
          return a.price - b.price; // Menor a Mayor
      } else if (sortOrder === 'desc') {
          return b.price - a.price; // Mayor a Menor
      }
      return 0; 
  });

  const toggleSubcat = (name) => setSelectedSubcats(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);
  const toggleBrand = (name) => setSelectedBrands(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);

  if (loading) return <div className="p-20 text-center">Cargando productos...</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-down font-montserrat">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
          <span onClick={() => navigate('/')} className="cursor-pointer hover:text-noviblue hover:underline">Inicio</span>
          <ChevronRight size={14} />
          <span className="font-bold text-noviblue uppercase">{getPageTitle()}</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ASIDE - FILTROS LATERALES */}
        <aside className="w-full lg:w-1/4 shrink-0">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm sticky top-28">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                    <Filter size={20} className="text-noviblue" />
                    <h2 className="font-bold text-gray-800 text-lg">Filtros</h2>
                </div>
                <div className="mb-8">
                    <h3 className="font-bold text-sm text-gray-700 mb-4 uppercase tracking-wide">Precio</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})} className="w-full p-2 border rounded text-sm" placeholder="Min" />
                        <span>-</span>
                        <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})} className="w-full p-2 border rounded text-sm" placeholder="Max" />
                    </div>
                </div>
                {dynamicSubcats.length > 0 && (
                    <div className="mb-8">
                        <h3 className="font-bold text-sm text-gray-700 mb-4 uppercase tracking-wide">Categoría</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                            {dynamicSubcats.map((sub, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={selectedSubcats.includes(sub)} onChange={() => toggleSubcat(sub)} className="accent-noviblue"/>
                                    <span className="text-sm text-gray-600">{sub}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
                {dynamicBrands.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-bold text-sm text-gray-700 mb-4 uppercase tracking-wide">Marcas</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                            {dynamicBrands.map((brand, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-noviblue"/>
                                    <span className="text-sm text-gray-600">{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-extrabold text-gray-900 uppercase">{getPageTitle()}</h1>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    
                    {/* --- SELECTOR DE ORDENAMIENTO ESTILIZADO --- */}
                    <div className="relative group">
                        <select 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="appearance-none w-full sm:w-56 bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 pl-4 pr-10 rounded-full shadow-sm cursor-pointer hover:border-noviblue focus:outline-none focus:ring-2 focus:ring-noviblue/20 transition-all"
                        >
                            {/* Opción oculta que sirve de placeholder */}
                            <option value="default" disabled hidden>Ordenar por precio</option> 
                            <option value="asc">Precio: Menor a Mayor</option>
                            <option value="desc">Precio: Mayor a Menor</option>
                        </select>
                        
                        {/* Icono de flecha posicionado absolutamente para reemplazar el del navegador */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 group-hover:text-noviblue transition-colors">
                            <ChevronDown size={16} strokeWidth={2.5} />
                        </div>
                    </div>
                    {/* ------------------------------------------- */}

                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap hidden sm:inline-block">
                        {sortedProducts.length} Productos
                    </span>
                </div>
            </div>

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col cursor-pointer" onClick={() => navigate(`/producto/${product.id}`)}>
                             <div className="relative h-56 overflow-hidden p-4 bg-white">
                                {product.tag && (<span className="absolute top-3 left-3 bg-noviblue text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm uppercase">{product.tag}</span>)}
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" onError={(e) => e.target.src='https://via.placeholder.com/200?text=Sin+Imagen'}/>
                             </div>
                             <div className="p-4 flex-1 flex flex-col">
                                <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wide">{product.subcategory}</p>
                                <h3 className="font-bold text-sm text-gray-800 mb-2 leading-tight line-clamp-2">{product.name}</h3>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-lg font-extrabold text-gray-900">{product.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: product.price % 1 === 0 ? 0 : 2 })}</span>
                                    {product.inStock ? (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }} 
                                            className="p-2 bg-gray-50 rounded-full text-noviblue hover:bg-noviblue hover:text-white transition-colors"
                                        >
                                            <ShoppingCart size={16} />
                                        </button>
                                    ) : (
                                        <button disabled className="p-2 bg-gray-100 rounded-full text-gray-400 cursor-not-allowed">
                                            <Ban size={16} />
                                        </button>
                                    )}
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 min-h-[400px] flex flex-col items-center justify-center p-10 text-center">
                    <PackageOpen size={64} className="text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">Sin Productos</h3>
                    <p className="text-gray-500">No encontramos productos que coincidan.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
