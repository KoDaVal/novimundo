import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Clock } from 'lucide-react';
import { STORES_DATA } from '../services/dataService';

const StoresPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-down font-montserrat bg-white">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium"><span onClick={() => navigate('/')} className="cursor-pointer hover:text-noviblue underline">Inicio</span><ChevronRight size={14} /><span className="font-bold text-noviblue">Sucursales</span></div>
            <h1 className="text-3xl font-extrabold text-center mb-10">Nuestras Tiendas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {STORES_DATA.map(store => (
                    <div key={store.id} className="bg-white rounded-xl shadow-md border overflow-hidden">
                        <div className="h-48 bg-gray-100 relative"><iframe src={store.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title={store.name}></iframe></div>
                        <div className="p-6"><h3 className="text-xl font-bold mb-3">{store.name}</h3><div className="space-y-3 text-sm text-gray-600 mb-6"><div className="flex gap-3"><MapPin size={18} className="text-noviblue" />{store.address}</div><div className="flex gap-3"><Phone size={18} className="text-noviblue" />{store.phone}</div><div className="flex gap-3"><Clock size={18} className="text-noviblue" />{store.hours}</div></div></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default StoresPage;
