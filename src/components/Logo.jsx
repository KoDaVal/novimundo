import React from 'react';
// Importamos la imagen directamente. 
// Vite se encargará de optimizarla y asegurar que cargue.
// ⚠️ Asegúrate de que tu archivo se llame 'logo.png' y esté en 'src/assets/'
import logoSrc from '../assets/novimundo.png'; 

const Logo = ({ onClick }) => {
  return (
    <div className="h-full flex items-center justify-start cursor-pointer" onClick={onClick}> 
      <img 
        src={logoSrc} 
        alt="Novimundo" 
        className="h-full w-auto max-h-20 object-contain object-left block" 
      />
    </div>
  );
};

export default Logo;