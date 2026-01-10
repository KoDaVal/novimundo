import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // Importar Contexto
import { Star, CreditCard, Truck, ShieldCheck, ShoppingCart, ChevronRight, Ban, CheckCircle } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts(); // Usamos productos globales
   
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  // Buscamos el producto en la lista global
  useEffect(() => {
    if (products.length > 0) {
        const found = products.find(p => String(p.id) === String(id));
        if (found) { 
            setProduct(found); 
            setMainImage(found.image); 
        }
    }
  }, [id, products]);

  if (loading) return <div className="p-20 text-center">Cargando producto...</div>;
  if (!product) return <div className="p-20 text-center">Producto no encontrado. <button onClick={() => navigate('/')} className="text-noviblue underline">Volver</button></div>;

  const thumbnails = [product.image, product.image2, product.image3].filter(img => img && img.trim() !== "");

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-down font-montserrat bg-white">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium"><span onClick={() => navigate('/')} className="cursor-pointer hover:text-noviblue hover:underline">Inicio</span><ChevronRight size={14} /><span className="font-bold text-noviblue truncate">{product.name}</span></div>
        <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-3/5">
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto py-2 md:py-0">
                        {thumbnails.length > 0 ? thumbnails.map((img, idx) => (<button key={idx} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 ${mainImage === img ? 'border-noviblue' : 'border-gray-200'}`}><img src={img} className="w-full h-full object-cover" alt="" onError={(e)=>e.target.src='https://via.placeholder.com/100'} /></button>)) : (<div className="w-20 h-20 border-2 border-noviblue rounded-lg"><img src={product.image} className="w-full h-full object-cover" alt="" /></div>)}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center"><img src={mainImage} alt={product.name} className="max-h-[500px] w-full object-contain" onError={(e)=>e.target.src='https://via.placeholder.com/500'} /></div>
                </div>
            </div>
            <div className="lg:w-2/5 flex flex-col">
                <div className="mb-2"><span className="text-sm font-bold text-noviblue uppercase">Marca: {product.brand || 'Novimundo'}</span></div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-6"><div className="flex text-noviyellow">{[...Array(5)].map((_, i) => (<Star key={i} size={18} className={i < (product.rating || 5) ? "fill-current" : "text-gray-200"} />))}</div><span className="text-sm font-medium text-gray-500">SKU: {product.id}NM</span></div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-4xl font-extrabold text-gray-900">{product.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: product.price % 1 === 0 ? 0 : 2 })}</span>
                    <div className="flex items-center justify-between mt-2">
                         <div className="flex items-center gap-2 text-sm text-noviblue font-bold"><CreditCard size={16} /> Hasta 12 MSI</div>
                         
                         {/* Indicador visual de disponibilidad */}
                         {product.inStock ? (
                             <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                                <CheckCircle size={12}/> Disponible
                             </div>
                         ) : (
                             <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                                <Ban size={12}/> Agotado
                             </div>
                         )}
                    </div>
                </div>

                <p className="text-gray-600 mb-8">{product.description || `Descripción del producto: ${product.name}.`}</p>
                
                {/* 🚦 BLOQUE DE COMPRA CONTROLADO POR STOCK 🚦 */}
                {product.inStock ? (
                    <>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-sm font-bold text-gray-700">CANTIDAD:</span>
                            <div className="flex items-center border border-gray-300 rounded-full">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 hover:text-noviblue">-</button>
                                <span className="w-8 text-center font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 hover:text-noviblue">+</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mb-8">
                            <button onClick={() => { addToCart(product, quantity); navigate('/checkout'); }} className="w-full bg-noviyellow text-gray-900 font-extrabold py-4 rounded-full shadow-lg hover:bg-yellow-400 transform active:scale-95 transition-all">
                                Comprar Ahora
                            </button>
                            <button onClick={() => addToCart(product, quantity)} className="w-full bg-white border-2 border-noviblue text-noviblue font-bold py-3.5 rounded-full hover:bg-blue-50 flex items-center justify-center gap-2 transform active:scale-95 transition-all">
                                <ShoppingCart size={20} /> Agregar al Carrito
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-3 mb-8">
                        <button disabled className="w-full bg-gray-200 text-gray-500 font-extrabold py-4 rounded-full shadow-none cursor-not-allowed flex items-center justify-center gap-2">
                             <Ban size={20} /> PRODUCTO AGOTADO
                        </button>
                    </div>
                )}

                <div className="mt-auto space-y-4 text-sm text-gray-500"><div className="flex items-start gap-3"><Truck size={20} className="text-noviblue shrink-0" /> Envío Gratis</div><div className="flex items-start gap-3"><ShieldCheck size={20} className="text-noviblue shrink-0" /> Garantía Novimundo</div></div>
            </div>
        </div>
    </div>
  );
};
export default ProductPage;
