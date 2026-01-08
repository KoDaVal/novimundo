import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { sendOrderToWP } from '../services/dataService';
import { ChevronRight, MapPin, CreditCard, Wallet, DollarSign, AlertTriangle, Loader, CheckCircle, Lock } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, cartTotal, setIsCartOpen, clearCart } = useCart();
    const navigate = useNavigate();
    
    // Estado del formulario (Mantenemos tus nombres de variables originales)
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

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        // --- CORRECCIÓN CLAVE AQUÍ ---
        // Transformamos tus datos (camelCase) al formato que WooCommerce exige (snake_case)
        const orderPayload = {
            payment_method: paymentMethod,
            payment_method_title: paymentMethod === 'bacs' ? 'Transferencia Bancaria' : 'Pago contra entrega',
            set_paid: false,
            
            // Billing: WooCommerce necesita 'first_name', 'address_1', etc.
            billing: { 
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address,
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode || "00000", // Valor por defecto si está vacío
                country: 'MX',
                email: formData.email,
                phone: formData.phone
            },
            
            // Shipping: Igual que Billing
            shipping: { 
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address,
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode || "00000",
                country: 'MX'
            },
            
            // Line Items: Agregamos 'name' y 'price' explícitamente
            line_items: cart.map(item => ({ 
                product_id: item.id, 
                quantity: item.qty,
                name: item.name,   // IMPORTANTE: Para que no salga como "Producto" genérico
                price: item.price  // IMPORTANTE: Para calcular totales correctamente
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
                        <div className="grid grid-cols-2 gap-4">
                            <input required name="email" type="email" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Email" />
                            <input required name="phone" type="tel" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Teléfono" />
                        </div>
                        {/* Campo de Código Postal opcional pero recomendado para envíos */}
                        <input name="postcode" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Código Postal (Opcional)" />
                        <textarea name="note" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Notas del pedido (referencias, etc.)" rows="2"></textarea>
                    </form>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6 flex items-center gap-2">
                        <CreditCard className="text-noviblue" /> Método de Pago
                    </h2>
                    
                    <div className="space-y-3">
                         <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer ${paymentMethod === 'bacs' ? 'border-noviblue bg-blue-50' : ''}`}>
                            <input type="radio" name="payment" value="bacs" checked={paymentMethod === 'bacs'} onChange={() => setPaymentMethod('bacs')} className="accent-noviblue" />
                            <div className="flex-1"><span className="block font-bold">Transferencia / Mercado Pago</span></div>
                            <Wallet className="text-gray-400" />
                        </label>
                         <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer ${paymentMethod === 'cod' ? 'border-noviblue bg-blue-50' : ''}`}>
                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-noviblue" />
                            <div className="flex-1"><span className="block font-bold">Pago contra entrega</span></div>
                            <DollarSign className="text-gray-400" />
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
                        <button type="submit" form="checkout-form" disabled={isSubmitting} className="w-full bg-noviyellow text-gray-900 font-extrabold py-4 rounded-lg shadow-lg hover:bg-yellow-400 flex items-center justify-center gap-2">
                            {isSubmitting ? <Loader className="animate-spin" /> : <CheckCircle />} CONFIRMAR PEDIDO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CheckoutPage;
