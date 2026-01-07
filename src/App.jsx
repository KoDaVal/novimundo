import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext'; // Importar Nuevo Contexto

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import StoresPage from './pages/StoresPage';

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
              <Route path="order-success" element={<SuccessPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
};
export default App;