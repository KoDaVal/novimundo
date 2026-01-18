import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { sendOrderToWP } from '../services/dataService';
import { ChevronRight, MapPin, CreditCard, Wallet, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
// Nota: Quité 'Loader' de los imports porque ya no usaremos el icono giratorio

const CheckoutPage = () => {
    const { cart, cartTotal, setIsCartOpen, clearCart } = useCart();
    const navigate = useNavigate();
    
    // Estado del formulario
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        address: '', 
        city: '', 
        state: '', 
        postcode: '', 
        email: '', 
        phone: '', 
        note: '' 
    });
    
    const [paymentMethod, setPaymentMethod] = useState('bacs');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    // --- NUEVO ESTADO PARA LA BARRA DE PROGRESO ---
    const [progress, setProgress] = useState(0);

    // --- LÓGICA DE CÓDIGOS POSTALES ---
    const [isPostcodeValid, setIsPostcodeValid] = useState(true); 
    
    const ALLOWED_POSTCODES = [
    // 29xxx
    "29000", "29010", "29014", "29016", "29017", "29018", "29019", "29020", 
    "29023", "29024", "29025", "29026", "29027", "29028", "29030", "29034", 
    "29037", "29038", "29039", "29040", "29043", "29044", "29045", "29047", 
    "29049", "29050", "29054", "29055", "29056", "29057", "29058", "29059", 
    "29060", "29064", "29065", "29066", "29067", "29070", "29073", "29075", 
    "29076", "29077", "29078", "29079", "29080", "29086", "29087", "29089", 
    "29090", "29094", "29096", "29098",
    // 30xxx
    "30500", "30503", "30507", "30509", "30513", "30515", 
    "30560", "30563", "30564", 
    "30600", "30603", "30604", "30605"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'postcode') {
            const cleanCode = value.trim();
            if (cleanCode.length === 5) {
                if (ALLOWED_POSTCODES.includes(cleanCode)) {
                    setIsPostcodeValid(true);
                } else {
                    setIsPostcodeValid(false);
                }
            } else {
                setIsPostcodeValid(true); 
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ALLOWED_POSTCODES.includes(formData.postcode.trim())) {
            setIsPostcodeValid(false);
            setErrorMsg("Lo sentimos, no tenemos cobertura en este Código Postal.");
            return;
        }

        setIsSubmitting(true);
        setErrorMsg('');
        setProgress(10); // Inicia la barra al 10% inmediatamente

        // --- SIMULACIÓN DE PROGRESO ---
        // Esto hace que la barra avance visualmente mientras esperamos al servidor
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                // Si llega a 90%, se queda ahí esperando a que termine la petición real
                if (prev >= 90) return 90;
                return prev + 10; // Sube 10% cada 400ms
            });
        }, 400);

        const orderPayload = {
            payment_method: paymentMethod,
            payment_method_title: 'Transferencia / Mercado Pago',
            set_paid: false,
            billing: { 
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address,
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode,
                country: 'MX',
                email: formData.email,
                phone: formData.phone
            },
            shipping: { 
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address,
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode,
                country: 'MX'
            },
            line_items: cart.map(item => ({ 
                product_id: item.id, 
                quantity: item.qty, 
                name: item.name,
                price: item.price
            })),
            customer_note: formData.note
        };

        try {
            const result = await sendOrderToWP(orderPayload);
            
            // ¡Éxito! Completamos la barra
            clearInterval(progressInterval);
            setProgress(100);

            // Damos un pequeño delay (500ms) para que el usuario vea la barra llena antes de redirigir
            setTimeout(() => {
                if (result.payment_url) { 
                    window.location.href = result.payment_url; 
                } else { 
                    clearCart(); 
                    navigate('/order-success', { state: { orderId: result.id, orderKey: result.order_key } }); 
                }
            }, 500);

        } catch (err) { 
            console.error(err); 
            clearInterval(progressInterval); // Detenemos la animación
            setProgress(0); // Reseteamos la barra
            setErrorMsg("Error al procesar el pedido. Intenta nuevamente."); 
            setIsSubmitting(false); // Reactivamos el botón
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-down font-montserrat bg-gray-50">
             <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
                <span onClick={() => { setIsCartOpen(true); }} className="cursor-pointer hover:text-noviblue underline">Carrito</span>
                <ChevronRight size={14} />
                <span className="font-bold text-noviblue">Finalizar Compra</span>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Columna Izquierda: Formulario */}
                <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <MapPin className="text-noviblue" /> Dirección de Envío
                    </h2>
                    
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required name="firstName" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Nombre" />
                            <input required name="lastName" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Apellidos" />
                        </div>
                        <input required name="address" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Dirección completa" />
                        <div className="grid grid-cols-2 gap-4">
                            <input required name="city" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Ciudad" />
                            <input required name="state" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Estado" />
                        </div>
                        
                        {/* INPUT DE CÓDIGO POSTAL */}
                        <div>
                            <input 
                                required 
                                name="postcode" 
                                onChange={handleChange} 
                                maxLength="5"
                                className={`w-full p-3 border rounded-lg ${!isPostcodeValid ? 'border-red-500 bg-red-50' : ''}`} 
                                placeholder="Código Postal (Solo cobertura local)" 
                            />
                            {!isPostcodeValid && (
                                <p className="text-red-500 text-xs mt-1 font-bold">
                                    ❌ Lo sentimos, este servicio no está disponible en esa zona.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input required name="email" type="email" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Email" />
                            <input required name="phone" type="tel" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Teléfono" />
                        </div>
                        <textarea name="note" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Notas del pedido (referencias, etc.)" rows="2"></textarea>
                    </form>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6 flex items-center gap-2">
                        <CreditCard className="text-noviblue" /> Método de Pago
                    </h2>
                    
                    <div className="space-y-3">
                         <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer border-noviblue bg-blue-50`}>
                            <input type="radio" name="payment" value="bacs" checked={true} readOnly className="accent-noviblue" />
                            <div className="flex-1">
                                <span className="block font-bold">Transferencia / Mercado Pago</span>
                                <span className="text-xs text-gray-500">Paga seguro con tarjeta o efectivo</span>
                            </div>
                            <Wallet className="text-noviblue" />
                        </label>
                    </div>
                    
                    {errorMsg && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex gap-2"><AlertTriangle size={20} />{errorMsg}</div>}
                </div>
                
                {/* Columna Derecha: Resumen */}
                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-28">
                        <h3 className="font-bold text-xl text-gray-800 mb-6">Resumen</h3>
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <div>
                                        <p className="font-bold text-gray-700">{item.name}</p>
                                        <p className="text-xs text-gray-500">Cant: {item.qty}</p>
                                    </div>
                                    <span className="font-medium">${(item.price * item.qty).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 flex justify-between text-xl font-extrabold mb-6">
                            <span>Total</span>
                            <span>${cartTotal.toLocaleString()}</span>
                        </div>

                        {/* ========================================================= */}
                        {/* BOTÓN CON EFECTO DE BARRA DE CARGA */}
                        {/* ========================================================= */}
                        <button 
                            type="submit" 
                            form="checkout-form" 
                            disabled={isSubmitting || !isPostcodeValid} 
                            // Agregamos 'relative' y 'overflow-hidden' para contener la barra
                            className={`w-full relative overflow-hidden font-extrabold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                                !isPostcodeValid 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-noviyellow text-gray-900 hover:bg-yellow-400'
                            }`}
                        >
                            {/* LA BARRA DE CARGA (Fondo Oscuro Transparente) */}
                            {isSubmitting && (
                                <div 
                                    className="absolute left-0 top-0 h-full bg-black/20 transition-all duration-300 ease-out" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            )}

                            {/* EL TEXTO Y EL ÍCONO (Z-Index para estar encima de la barra) */}
                            <span className="relative z-10 flex items-center gap-2">
                                {isSubmitting ? (
                                    // Texto mientras carga
                                    <span>PROCESANDO... {progress}%</span>
                                ) : (
                                    // Texto normal
                                    <>
                                        <CheckCircle size={20} />
                                        {isPostcodeValid ? 'CONFIRMAR PEDIDO' : 'SIN COBERTURA'}
                                    </>
                                )}
                            </span>
                        </button>
                        {/* ========================================================= */}

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                             <Lock size={12}/> Pagos procesados de forma segura
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CheckoutPage;

