import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';

// 1. IMPORTANTE: Creamos esta variable vacía para evitar el error de "undefined"
const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolvemos la App y le pasamos el contexto */}
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
