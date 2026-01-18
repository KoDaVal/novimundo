import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Menu, ChevronDown, Heart, Star, MapPin, HelpCircle } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, categories, onNavigate }) => {
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex justify-start md:hidden">
            {/* Backdrop con efecto blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            {/* Panel lateral */}
            <div className="relative w-[85%] max-w-xs bg-white h-full shadow-2xl flex flex-col animate-fade-in-left overflow-y-auto">
                
                {/* --- HEADER DEL MENÚ (SIN CUENTA) --- */}
                <div className="bg-noviblue p-6 text-white">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-2xl tracking-tight">Novimundo</h2>
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-blue-100 text-sm font-medium">
                        Bienvenido al menú principal
                    </p>
                </div>

                <div className="flex-1 py-2">
                    {/* Sección 1: Favoritos (Único sobreviviente de la sección personal) */}
                    <div className="border-b border-gray-100 pb-2">
                        <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 text-gray-700 transition">
                            <Heart size={20} className="text-gray-400" />
                            <span className="font-medium">Favoritos</span>
                        </button>
                    </div>

                    {/* Sección 2: Navegación Principal */}
                    <div className="py-2 border-b border-gray-100">
                        <div className="px-6 py-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Navegación</span>
                        </div>
                        
                        {/* Acordeón de Categorías */}
                        <div>
                            <button onClick={() => setCategoriesOpen(!categoriesOpen)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 text-gray-700 transition">
                                <div className="flex items-center gap-4">
                                    <Menu size={20} className="text-noviblue" />
                                    <span className="font-bold">Todas las Categorías</span>
                                </div>
                                <ChevronDown size={16} className={`transition-transform duration-300 ${categoriesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {categoriesOpen && (
                                <div className="bg-gray-50 border-t border-b border-gray-100 animate-fade-in-down">
                                    {categories.map((cat, idx) => (
                                        <button key={idx} onClick={() => onNavigate(cat)} className="w-full flex items-center gap-3 px-10 py-3 text-sm text-gray-600 hover:text-noviblue hover:bg-gray-100 transition border-l-4 border-transparent hover:border-noviblue">
                                            <span className="text-gray-400">{cat.icon}</span>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button onClick={() => onNavigate({type: 'offers'})} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 text-novired font-bold transition">
                            <Star size={20} className="fill-current" />
                            <span>Ofertas del Día</span>
                        </button>
                        
                        <button onClick={() => onNavigate({type: 'stores'})} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 text-gray-700 transition">
                            <MapPin size={20} className="text-gray-400" />
                            <span className="font-medium">Sucursales</span>
                        </button>
                    </div>

                    {/* Sección 3: Soporte (Sin Contáctanos) */}
                    <div className="py-2">
                         <div className="px-6 py-2">
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Soporte</span>
                         </div>
                        <button 
                            onClick={() => { navigate('/ayuda'); onClose(); }} 
                            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 text-gray-700 transition"
                        >
                            <HelpCircle size={20} className="text-gray-400" />
                            <span className="font-medium">Ayuda</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
                    <p className="text-xs text-center text-gray-400">v1.0.5 • Novimundo App</p>
                </div>
            </div>
            
            <style>{`@keyframes fade-in-left { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .animate-fade-in-left { animation: fade-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1); }`}</style>
        </div>
    );
};

export default MobileMenu;
