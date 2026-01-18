import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in-down font-montserrat">
      
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-noviblue mb-4 uppercase">
          ¿Cómo podemos ayudarte?
        </h1>
        <p className="text-gray-500 text-lg">
          Estamos aquí para resolver tus dudas. Contáctanos por cualquiera de nuestros medios oficiales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* Columna Izquierda: Información de Contacto */}
        <div className="space-y-6">
          
          {/* Tarjeta Teléfono */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-noviblue shrink-0">
              <Phone size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Atención Telefónica</p>
              <a href="tel:9666631003" className="text-2xl font-bold text-gray-800 hover:text-noviblue transition-colors block">
                966 663 1003
              </a>
              <p className="text-xs text-gray-400 mt-1">Lunes a Sábado de 9:00am a 8:00pm</p>
            </div>
          </div>

          {/* Tarjeta Correo */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-novired shrink-0">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Correo Electrónico</p>
              <a href="mailto:ventas@novimundo.com" className="text-xl md:text-2xl font-bold text-gray-800 hover:text-noviblue transition-colors break-all">
                ventas@novimundo.com
              </a>
              <p className="text-xs text-gray-400 mt-1">Te respondemos en menos de 24 horas.</p>
            </div>
          </div>

           {/* Tarjeta WhatsApp (Opcional, simulando el mismo número) */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
              <MessageCircle size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">WhatsApp</p>
              <a href="https://wa.me/529666631003" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors">
                Enviar mensaje
              </a>
              <p className="text-xs text-gray-400 mt-1">Chat directo con un asesor.</p>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Información Adicional */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-noviblue" /> Horarios de Atención
          </h3>
          
          <ul className="space-y-4 text-sm text-gray-600 mb-8">
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Lunes - Viernes</span>
              <span className="font-bold text-gray-800">9:00 AM - 8:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Sábado</span>
              <span className="font-bold text-gray-800">10:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Domingo</span>
              <span className="font-bold text-novired">Cerrado</span>
            </li>
          </ul>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
               <MapPin size={18} className="text-noviblue" /> ¿Prefieres visitarnos?
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Encuentra la sucursal más cercana a tu ubicación y visítanos hoy mismo.
            </p>
            <button 
                onClick={() => navigate('/sucursales')}
                className="w-full py-2 bg-noviblue text-white rounded-lg font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2 text-sm"
            >
                Ver Sucursales <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;
