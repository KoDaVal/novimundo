import React from 'react';
import { ShieldCheck, Truck, Wrench, Phone, Mail } from 'lucide-react';

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-montserrat">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Preguntas Frecuentes</h1>

        <div className="space-y-6">
          
          {/* Pregunta 1: Seguridad */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-green-600 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">¿Es seguro comprar en Novimundo.com?</h3>
                <p className="text-gray-600">
                  Contamos con certificados de seguridad que te dan la certeza de que los detalles de tus compras están seguros y encriptados. Garantizamos la privacidad y protección de tu información.
                </p>
                <p className="text-gray-600 mt-2 font-medium">
                  Además, contamos con el respaldo de <span className="text-blue-600">MERCADO PAGO</span> para realizar tus pagos de forma 100% segura.
                </p>
                <p className="text-gray-500 text-sm mt-2 italic">
                  Después de hacer tu compra tendrás información sobre tu pedido hasta que lo recibas en la puerta de tu casa.
                </p>
              </div>
            </div>
          </div>

          {/* Pregunta 2: Envíos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <Truck className="text-noviblue shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">¿Cuánto tarda mi pedido en llegar?</h3>
                <p className="text-gray-600">
                  Sabemos que necesitas tu producto. Procuraremos que sea en el menor tiempo posible, pero te damos de referencia un lapso de <span className="font-bold text-gray-900">2 a 5 días hábiles</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Pregunta 3: Garantías */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <Wrench className="text-orange-500 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">¿En dónde puedo hacer válida mi garantía?</h3>
                <p className="text-gray-600 mb-4">
                  Puedes ir a cualquier tienda física <strong>NOVIMUNDO</strong> con el ticket, el correo de confirmación de compra o la factura.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 mb-2 uppercase">Contacto directo:</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:9666631003" className="flex items-center gap-2 text-gray-700 hover:text-noviblue font-medium">
                      <Phone size={18} /> 966 663 1003
                    </a>
                    <a href="mailto:ventas@novimundo.com" className="flex items-center gap-2 text-gray-700 hover:text-noviblue font-medium">
                      <Mail size={18} /> ventas@novimundo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FaqPage;
