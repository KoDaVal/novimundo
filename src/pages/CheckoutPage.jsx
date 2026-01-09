import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { sendOrderToWP } from '../services/dataService';
import { ChevronRight, MapPin, CreditCard, Wallet, AlertTriangle, Loader, CheckCircle, Lock } from 'lucide-react';

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

    // --- LÓGICA DE CÓDIGOS POSTALES ---
    const [isPostcodeValid, setIsPostcodeValid] = useState(true); // Asumimos válido al inicio hasta que escriban
    
    // Lista de CPs permitidos (como números o strings para comparar fácil)
    const ALLOWED_POSTCODES = [
        "30500", "30503", "30507", "30509", "30513", "30515", 
        "30560", "30563", "30564", 
        "30600", "30603", "30604", "30605"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validación en tiempo real del CP
        if (name === 'postcode') {
            const cleanCode = value.trim();
            // Si está vacío no mostramos error, pero si tiene 5 dígitos validamos
            if (cleanCode.length === 5) {
                if (ALLOWED_POSTCODES.includes(cleanCode)) {
                    setIsPostcodeValid(true);
                } else {
                    setIsPostcodeValid(false);
                }
            } else {
                // Mientras escribe o si borra, reseteamos a válido para no molestar,
                // pero el 'required' del form evitará enviar si está vacío.
                setIsPostcodeValid(true); 
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Doble validación al enviar por si acaso
        if (!ALLOWED_POSTCODES.includes(formData.postcode.trim())) {
            setIsPostcodeValid(false);
            setErrorMsg("Lo sentimos, no tenemos cobertura en este Código Postal.");
            return;
        }

        setIsSubmitting(true);
        setErrorMsg('');

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
            
            if (result.payment_url) { 
                window.location.href = result.payment_url; 
            } else { 
                clearCart(); 
                navigate('/order-success', { state: { orderId: result.id, orderKey: result.order_key } }); 
            }
        } catch (err) { 
            console.error(err); 
            setErrorMsg("Error al procesar el pedido. Intenta nuevamente."); 
        } finally { 
            setIsSubmitting(false); 
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
                        
                        {/* INPUT DE CÓDIGO POSTAL CON VALIDACIÓN VISUAL */}
                        <div>
                            <input 
                                required 
                                name="postcode" 
                                onChange={handleChange} 
                                maxLength="5" // Limitamos a 5 caracteres
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
                    
                    {/* SOLO UNA OPCIÓN DE PAGO DISPONIBLE AHORA */}
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

                        {/* EL BOTÓN SE DESACTIVA SI EL CP NO ES VÁLIDO */}
                        <button 
                            type="submit" 
                            form="checkout-form" 
                            disabled={isSubmitting || !isPostcodeValid} 
                            className={`w-full font-extrabold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                                !isPostcodeValid 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-noviyellow text-gray-900 hover:bg-yellow-400'
                            }`}
                        >
                            {isSubmitting ? <Loader className="animate-spin" /> : <CheckCircle />} 
                            {isPostcodeValid ? 'CONFIRMAR PEDIDO' : 'SIN COBERTURA'}
                        </button>

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
