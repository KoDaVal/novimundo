import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId || 'CONFIRMADO';
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center font-montserrat animate-fade-in-down">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-bounce"><CheckCircle size={48} strokeWidth={3} /></div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">¡Gracias por tu compra!</h1>
            <p className="text-lg text-gray-600 max-w-lg mb-8">Hemos recibido tu pedido correctamente.</p>
            <div className="bg-white p-6 rounded-xl border shadow-sm mb-8"><p className="text-sm text-gray-500 font-bold uppercase">Pedido #</p><p className="text-3xl font-extrabold text-noviblue">{orderId}</p></div>
            <button onClick={() => navigate('/')} className="bg-noviblue text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 flex items-center gap-2"><ArrowLeft size={20} /> Volver al Inicio</button>
        </div>
    );
};
export default SuccessPage;
