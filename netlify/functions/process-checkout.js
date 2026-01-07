// NO usamos require('node-fetch') para evitar errores de dependencias
exports.handler = async (event, context) => {
  // Configurar headers CORS para permitir peticiones desde tu frontend
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Manejo de pre-flight request (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  const wcUrl = process.env.VITE_WC_URL;
  const wcCk = process.env.VITE_WC_CK;
  const wcCs = process.env.VITE_WC_CS;

  if (!wcUrl || !wcCk || !wcCs) {
    console.error("Faltan variables de entorno en Netlify");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Error de configuración del servidor" })
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    // Autenticación Basic Auth
    const auth = Buffer.from(`${wcCk}:${wcCs}`).toString('base64');

    console.log(`Enviando a: ${wcUrl}/wp-json/wc/v3/orders`);

    // Usamos fetch nativo (global en Node 18+)
    const response = await fetch(`${wcUrl}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(orderData)
    });

    const contentType = response.headers.get("content-type");
    const textResponse = await response.text();

    console.log("Respuesta WP Status:", response.status);
    console.log("Respuesta WP Body (extracto):", textResponse.substring(0, 200));

    if (!response.ok) {
        return {
            statusCode: response.status,
            headers,
            body: textResponse // Devolvemos el error tal cual nos lo dio WP
        };
    }

    // Intentar parsear JSON solo si la respuesta fue OK
    try {
        const data = JSON.parse(textResponse);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "WooCommerce no devolvió JSON válido", raw: textResponse })
        };
    }

  } catch (error) {
    console.error("Error interno en funcion:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message })
    };
  }
};
