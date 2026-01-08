import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { useCart } from '../context/CartContext'; // 1. Importamos el contexto

const OrderSuccess = () => {
  // 2. Sacamos la función para limpiar el carrito
  const { clearCart } = useCart();

  // 3. useEffect se ejecuta automáticamente cuando carga la página
  useEffect(() => {
    clearCart(); 
    // Esto borra el carrito en cuanto el cliente pisa esta pantalla
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-montserrat animate-fade-in-down">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-16 h-16" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          ¡Gracias por tu compra!
        </h1>
        
        <p className="text-gray-600 text-lg mb-8">
          Tu pedido ha sido recibido correctamente. Te hemos enviado un correo con los detalles.
        </p>

        <div className="bg-blue-50 p-4 rounded-xl mb-8 text-sm text-blue-800">
          <p className="font-bold">¿Qué sigue?</p>
          <p>Nos pondremos en contacto contigo pronto para coordinar el envío a tu domicilio.</p>
        </div>

        <Link to="/" className="w-full bg-noviblue text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <Home size={20} /> VOLVER AL INICIO
        </Link>

      </div>
    </div>
  );
};

export default OrderSuccess;
