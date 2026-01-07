import React, { createContext, useState, useContext, useEffect } from 'react';
import { GOOGLE_SHEET_URL, GOOGLE_SHEET_BEST_SELLERS_URL, parseCSV } from '../services/dataService';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lógica de carga de datos (Idéntica a tu App.jsx original)
  useEffect(() => {
      const loadDatabase = async () => {
          try {
              // 1. Cargar Catálogo General
              if (GOOGLE_SHEET_URL) {
                  const response = await fetch(GOOGLE_SHEET_URL);
                  if (response.ok) {
                      const csvText = await response.text();
                      const parsedProducts = parseCSV(csvText);
                      setProducts(parsedProducts);
                  }
              }

              // 2. Cargar Más Vendidos
              if (GOOGLE_SHEET_BEST_SELLERS_URL) {
                  const responseBest = await fetch(GOOGLE_SHEET_BEST_SELLERS_URL);
                  if (responseBest.ok) {
                      const csvTextBest = await responseBest.text();
                      const parsedBest = parseCSV(csvTextBest);
                      setBestSellers(parsedBest);
                  }
              }
          } catch (err) {
              console.error("Error cargando base de datos:", err);
          } finally {
              setLoading(false);
          }
      };
      loadDatabase();
  }, []);

  return (
    <ProductContext.Provider value={{ products, bestSellers, loading }}>
      {children}
    </ProductContext.Provider>
  );
};