const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Claves SEGURAS desde el panel de Netlify
  const wcUrl = process.env.VITE_WC_URL;
  const wcCk = process.env.VITE_WC_CK;
  const wcCs = process.env.VITE_WC_CS;

  if (!wcUrl || !wcCk || !wcCs) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error: Faltan credenciales en el servidor." })
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    // Usamos las claves para autenticarnos con WordPress
    const auth = Buffer.from(`${wcCk}:${wcCs}`).toString('base64');

    const response = await fetch(`${wcUrl}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify(data) };
    }

    return { statusCode: 200, body: JSON.stringify(data) };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};