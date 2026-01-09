import React from 'react';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 font-montserrat">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-center gap-3 mb-8">
            <FileText size={32} className="text-gray-400"/>
            <h1 className="text-3xl font-bold text-gray-900 text-center">Términos y Condiciones</h1>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 text-sm text-justify leading-relaxed space-y-6">
          
          <p>
            Al ingresar y utilizar este portal de Internet, cuyo nombre de dominio es <strong>www.novimundo.com</strong>, propiedad de <strong>JORGE LUIS HERNANDEZ VAZQUEZ</strong>, que en lo sucesivo se denominará “NOVIMUNDO”, el usuario está aceptando los TÉRMINOS Y CONDICIONES DE USO contenidos en este convenio y declara expresamente su aceptación utilizando para tal efecto medios electrónicos, en términos de lo dispuesto por el artículo 1803 del Código Civil Federal.
          </p>
          <p>
            En caso de no aceptar en forma absoluta y completa los términos y condiciones de este convenio, el usuario deberá abstenerse de acceder, utilizar y observar el sitio web www.novimundo.com. Y en caso de que el usuario acceda, utilice y observe el sitio web, se considerará como una absoluta y expresa aceptación de los TÉRMINOS Y CONDICIONES DE USO aquí estipulados.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">1. Licencia</h3>
          <p>
            Por virtud de la celebración de este convenio, “NOVIMUNDO” otorga y concede al usuario el derecho no exclusivo, revocable y no transferible de ver y utilizar el sitio web www.novimundo.com de conformidad con los TÉRMINOS Y CONDICIONES DE USO que aquí se estipulan.
          </p>
          <p>
            El usuario solo podrá imprimir y/o copiar cualquier información contenida o publicada en el sitio web exclusivamente para uso personal, queda terminantemente prohibido el uso comercial de dicha información. La reimpresión, publicación, distribución, asignación, sublicencia, venta, reproducción electrónica o por otro medio, parcial o total, de cualquier información, documento o gráfico que aparezca en el sitio web para cualquier uso distinto al personal no comercial le está expresamente prohibida al usuario.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">2. Reglas para el uso del sitio web</h3>
          <p>
            El usuario y NOVIMUNDO están de acuerdo en que la utilización del sitio web se sujetará a las siguientes reglas:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>NOVIMUNDO se reserva el derecho de bloquear el acceso o remover en forma parcial o total toda información, comunicación o material que a su exclusivo juicio pueda resultar abusivo, difamatorio, obsceno, fraudulento, artificioso o engañoso.</li>
            <li>El usuario reconoce que NOVIMUNDO no controla o censura previamente el contenido disponible en la página de Internet provisto por terceros.</li>
            <li>NOVIMUNDO no garantiza la exactitud, veracidad, amplitud y/o utilidad de cualquier contenido provisto por terceros.</li>
          </ul>

          <h3 className="text-gray-900 font-bold text-lg mt-6">3. Formato de Precios</h3>
          <p>
            El formato como se visualizan los precios en www.novimundo.com puede verse afectado por diferencias en las versiones y configuraciones de los navegadores. El formato correcto es: <strong>$5,999.00</strong> (seis mil novecientos noventa y nueve pesos). Si el usuario tiene una configuración diferente, el separador de millas podría cambiarse por puntos y mostrar un formato incorrecto como $5.999.00.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">4. Precios, Promociones y Disponibilidad</h3>
          <p>
            Los precios, promociones y disponibilidad de inventario que se muestra en www.novimundo.com aplican exclusivamente para ventas realizadas por internet y ventas por teléfono. En caso de fallas en el sistema que alteren precios, se informará al cliente y se efectuará la cancelación de la compra.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">5. Negación de garantías y Limitaciones</h3>
          <p>
            El usuario está de acuerdo que la utilización del sitio web se realiza bajo su propio riesgo. NOVIMUNDO no garantiza que la página satisfaga los requerimientos del usuario o que los servicios no sufran interrupciones.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">6. Modificaciones</h3>
          <p>
            NOVIMUNDO podrá en cualquier momento y cuando lo considere conveniente, sin necesidad de avisar al usuario, realizar correcciones, adiciones, mejoras o modificaciones al contenido y a los TÉRMINOS Y CONDICIONES DE USO.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">7. Legislación aplicable</h3>
          <p>
            Este convenio estará sujeto y será interpretado de acuerdo con las leyes y ante los tribunales del Distrito Federal, México.
          </p>

          <h3 className="text-gray-900 font-bold text-lg mt-6">8. Compras Efectuadas</h3>
          <p>
            Las compras efectuadas en el presente sitio web deberán realizarse por personas mayores de dieciocho años. En caso de que se efectúe una compra por una persona menor de edad, los responsables de dicha compra serán los padres o tutores del menor.
          </p>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
