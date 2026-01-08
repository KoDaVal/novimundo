// CAMBIO CRÍTICO: Usamos 'export const handler' para compatibilidad con "type": "module" en package.json
export const handler = async (event, context) => {
  // Configurar headers CORS para permitir peticiones desde tu frontend
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Manejo de pre-flight request (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Validar método POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Método no permitido' }) };
  }

  // Leer variables de entorno y limpiar URL (quitar slash final si existe)
  const wcUrl = process.env.VITE_WC_URL ? process.env.VITE_WC_URL.replace(/\/$/, "") : "";
  const wcCk = process.env.VITE_WC_CK;
  const wcCs = process.env.VITE_WC_CS;

  // Validación básica de configuración
  if (!wcUrl || !wcCk || !wcCs) {
    console.error("❌ ERROR CONFIG: Faltan variables de entorno VITE_WC_URL, VITE_WC_CK o VITE_WC_CS.");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Error interno de configuración del servidor (Env Vars)." })
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    
    // Autenticación Basic Auth para WooCommerce
    // En Node.js moderno (ESM), Buffer es global, así que esto funciona directo.
    const auth = Buffer.from(`${wcCk}:${wcCs}`).toString('base64');
    const targetUrl = `${wcUrl}/wp-json/wc/v3/orders`;

    console.log(`🚀 Iniciando petición a: ${targetUrl}`);

    // Intentamos el fetch con headers adicionales para evitar bloqueos de WAF (ej. Neubox/ModSecurity)
    // El User-Agent falso es clave para que el hosting no rechace la petición por venir de un bot/script.
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', // Disfraz de Chrome
        'Accept': 'application/json, text/plain, */*',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify(orderData)
    });

    const textResponse = await response.text();
    console.log(`📡 Respuesta WP Status: ${response.status}`);
    
    // Si WP devuelve error (no 2xx), lo pasamos al frontend para debug
    if (!response.ok) {
        console.error(`⚠️ Error de WP: ${textResponse.substring(0, 500)}`);
        return {
            statusCode: response.status,
            headers,
            body: textResponse
        };
    }

    // Éxito: Devolvemos la respuesta de WP tal cual
    return {
        statusCode: 200,
        headers,
        body: textResponse
    };

  } catch (error) {
    console.error("🔥 FALLO CRÍTICO DE RED:", error);
    
    let errorMsg = "Error de conexión con la tienda principal.";
    
    // Diagnóstico de errores de red comunes
    if (error.cause) {
        if (error.cause.code === 'ECONNREFUSED') errorMsg += " (Firewall bloqueando conexión)";
        if (error.cause.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') errorMsg += " (Problema SSL)";
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
          message: errorMsg, 
          debug_error: error.message
      })
    };
  }
};
