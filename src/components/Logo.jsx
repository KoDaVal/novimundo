import React from 'react';
// Importamos la imagen directamente. 
// Vite se encargará de optimizarla y asegurar que cargue.
import logoSrc from '../assets/novimundo.png'; 

const Logo = ({ onClick }) => {
  return (
    <div className="h-full flex items-center justify-start cursor-pointer" onClick={onClick}> 
      <img 
        src={logoSrc} 
        alt="Novimundo" 
        // CAMBIOS IMPORTANTES AQUÍ:
        // 1. max-h-12: En celular lo hacemos un poco más bajo para que no se vea gigante.
        // 2. md:max-h-20: En PC (md) dejamos que sea alto (como estaba antes).
        // 3. max-w-[150px]: ESTA ES LA CLAVE. Limitamos el ancho en celular para que no empuje al menú.
        // 4. md:max-w-none: En PC quitamos el límite de ancho.
        className="h-full w-auto max-h-12 md:max-h-20 max-w-[150px] md:max-w-none object-contain object-left block" 
      />
    </div>
  );
};

export default Logo;
