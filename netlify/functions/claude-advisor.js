exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { query, routeData } = JSON.parse(event.body);

    const sign = (n) => n >= 0 ? '+' : '';

    const prompt = `You are a route advisor for the Spirit Airlines Fare Impact Dashboard. Spirit Airlines shut down on May 2, 2026.

User asked about: "${query}"
Route: ${routeData.route}
Spirit avg fare (2025 BTS data): $${routeData.bts.toFixed(0)}
Current fare (May 2026): $${routeData.gf.toFixed(0)}
Change: ${sign(routeData.pct)}${routeData.pct}% (${sign(routeData.abs)}$${Math.abs(routeData.abs).toFixed(0)})
Now served by: ${routeData.carrier}
Impact tier: ${routeData.impact}

Write 2-3 sentences of plain English advice for a traveler on this route. Mention: (1) whether fares went up or down vs Spirit and by how much, (2) who serves it now and if that's good or bad news, (3) one actionable tip. Be direct, specific, and conversational. No bullet points.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 500, body: JSON.stringify({ error: `API error: ${err}` }) };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ recommendation: data.content[0].text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
