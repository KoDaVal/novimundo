import React from 'react';
import { Store, Award, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">¿Quiénes Somos?</h1>
          <div className="w-24 h-1 bg-noviblue mx-auto rounded-full"></div>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              <div className="bg-blue-50 p-6 rounded-full shrink-0">
                <Store size={48} className="text-noviblue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Historia y Tradición</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Novimundo es una empresa dedicada desde hace <span className="font-bold text-noviblue">más de 50 años</span> a la venta de línea blanca y electrónica en tiendas físicas ubicadas en la zona costa de Chiapas.
                </p>
              </div>
            </div>

            <hr className="border-gray-100 my-8" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Award className="text-yellow-500 shrink-0" size={32} />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Nuestra Misión</h3>
                  <p className="text-gray-600 mt-2">
                    Tenemos grandes planes para seguir dando nuestros buenos precios y excelentes productos a más personas a través de nuestra página <strong>NOVIMUNDO.COM</strong>.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Users className="text-green-500 shrink-0" size={32} />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Compromiso</h3>
                  <p className="text-gray-600 mt-2">
                    Esperamos que tu visita sea placentera y que nuestros precios, productos y atención te convenzan de realizar tu compra con nosotros.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
