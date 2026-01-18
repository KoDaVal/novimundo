import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import OrderSuccess from './pages/OrderSuccess'; 
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage'; 
import StoresPage from './pages/StoresPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import HelpPage from './pages/HelpPage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
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
              
              {/* ✅ AHORA SÍ, SOLO UNA RUTA PARA AYUDA */}
              <Route path="ayuda" element={<HelpPage />} />

              {/* Ruta antigua */}
              <Route path="order-success" element={<SuccessPage />} />

              {/* Nueva ruta de éxito */}
              <Route path="gracias" element={<OrderSuccess />} />

              {/* Comodín */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
