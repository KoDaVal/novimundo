import React from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2, Lock } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onUpdateQty, onCheckout }) => {
    if (!isOpen) return null;
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-in-right">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-noviblue text-white">
                    <div className="flex items-center gap-2"><ShoppingCart size={20} /><h2 className="font-bold text-lg">Tu Carrito ({cartItems.reduce((a,c) => a + c.qty, 0)})</h2></div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition"><X size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400"><ShoppingCart size={64} className="mb-4 opacity-20" /><p className="font-medium text-lg">Tu carrito está vacío</p><button onClick={onClose} className="mt-4 text-noviblue font-bold hover:underline">Continuar comprando</button></div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100"><img src={item.image} alt={item.name} className="w-full h-full object-contain" /></div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div><h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">{item.name}</h3><p className="text-xs text-gray-400 mt-1 uppercase">{item.brand}</p></div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center border border-gray-200 rounded-md"><button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="p-1 hover:bg-gray-100 text-gray-500 disabled:opacity-50" disabled={item.qty <= 1}><Minus size={14} /></button><span className="w-8 text-center text-xs font-bold">{item.qty}</span><button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="p-1 hover:bg-gray-100 text-gray-500"><Plus size={14} /></button></div>
                                        <div className="text-right"><p className="font-extrabold text-noviblue">${(item.price * item.qty).toLocaleString()}</p></div>
                                    </div>
                                </div>
                                <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-novired self-start p-1 transition"><Trash2 size={16} /></button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-4"><span className="text-gray-500 font-medium">Subtotal</span><span className="text-2xl font-extrabold text-gray-900">${total.toLocaleString()}</span></div>
                        <p className="text-xs text-gray-400 text-center mb-4">Envío calculado al finalizar</p>
                        <button onClick={onCheckout} className="w-full bg-noviyellow text-gray-900 font-extrabold py-3.5 rounded-lg shadow-lg hover:bg-yellow-400 transition flex items-center justify-center gap-2 transform hover:-translate-y-1"><Lock size={18} /> PROCEDER AL PAGO</button>
                    </div>
                )}
            </div>
            <style>{`@keyframes fade-in-right { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .animate-fade-in-right { animation: fade-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1); }`}</style>
        </div>
    );
};
export default CartDrawer;