exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { query, routeData } = JSON.parse(event.body);
    const s = (n) => n >= 0 ? '+' : '';

    let prompt;

    if (routeData) {
      prompt = `You are a route advisor for the Spirit Airlines Fare Impact Dashboard. Spirit Airlines shut down May 2, 2026.

Route: ${routeData.route}
Spirit avg fare (BTS 2025): $${routeData.bts.toFixed(0)}
Current fare (May 2026): $${routeData.gf.toFixed(0)}
Change: ${s(routeData.pct)}${routeData.pct}% (${s(routeData.abs)}$${Math.abs(routeData.abs).toFixed(0)})
Now served by: ${routeData.carrier}
Impact tier: ${routeData.impact}

Write exactly 3 lines of advice. Each line is one sentence starting with an emoji. No intro text, no labels, just the 3 lines:
📊 [Fare impact — use the exact numbers, say whether it went up or down and by how much]
✈️ [Who serves it now and what that means for travelers — is this good or bad news?]
💡 [One concrete actionable tip — be specific, not generic]`;
    } else {
      prompt = `You are a route advisor for the Spirit Airlines Fare Impact Dashboard. Spirit Airlines shut down May 2, 2026.

A user asked about: "${query}"

This route is not in Spirit's top 20, so there is no specific before/after data. Write exactly 3 lines of advice. Each line is one sentence starting with an emoji. No intro text, no labels, just the 3 lines:
📊 [General fare context for this route post-Spirit-shutdown — what the broader market looks like]
✈️ [Which major carriers typically serve this route and how competitive it is]
💡 [One concrete actionable tip for booking this route today]`;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 350,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: 'API error' }) };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ recommendation: data.content[0].text }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
