import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import OrderSuccess from './pages/OrderSuccess'; // ✅ Tu nueva página
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage'; // La antigua (puedes dejarla por si acaso)
import StoresPage from './pages/StoresPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="producto/:id" element={<ProductPage />} />
              <Route path="categoria/:slug" element={<CategoryPage />} />
              <Route path="buscar" element={<CategoryPage isSearch={true} />} />
              <Route path="ofertas" element={<CategoryPage isOffers={true} />} />
              <Route path="sucursales" element={<StoresPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="nosotros" element={<AboutPage />} />
              <Route path="preguntas-frecuentes" element={<FaqPage />} />
              <Route path="terminos-y-condiciones" element={<TermsPage />} />
              
              {/* Ruta antigua (por si alguien entra por historial) */}
              <Route path="order-success" element={<SuccessPage />} />

              {/* ✅ TU NUEVA RUTA (La que limpia el carrito) */}
              <Route path="gracias" element={<OrderSuccess />} />

              {/* ⚠️ El comodín siempre al final de la lista */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;

