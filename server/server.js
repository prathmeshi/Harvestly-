require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ name: 'Harvestly API', status: 'running' }));

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Onion', quantity: '500 kg', farmer: 'Demo Farmer', source: 'sample' },
    { id: 2, name: 'Tomato', quantity: '300 kg', farmer: 'Demo Farmer', source: 'sample' }
  ]);
});

app.get('/api/market-prices', async (req, res) => {
  const apiKey = process.env.DATA_GOV_API_KEY;
  const resourceId = process.env.DATA_GOV_MARKET_RESOURCE_ID;
  if (!apiKey || !resourceId) {
    return res.status(200).json({
      live: false,
      source: 'data.gov.in',
      records: [],
      message: 'Government market-price API is not configured. Add DATA_GOV_API_KEY and DATA_GOV_MARKET_RESOURCE_ID to server/.env.'
    });
  }

  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '50', 10) || 50, 1), 100);
  const url = new URL(`https://api.data.gov.in/resource/${encodeURIComponent(resourceId)}`);
  url.searchParams.set('api-key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', String(limit));
  if (req.query.state) url.searchParams.set('filters[state]', String(req.query.state).slice(0, 80));
  if (req.query.commodity) url.searchParams.set('filters[commodity]', String(req.query.commodity).slice(0, 80));

  try {
    const upstream = await fetch(url, { headers: { Accept: 'application/json' } });
    const payload = await upstream.json();
    if (!upstream.ok) {
      return res.status(502).json({
        live: false, source: 'data.gov.in', records: [],
        message: `The government data service returned HTTP ${upstream.status}. Check your API key, resource ID, and dataset fields.`
      });
    }
    return res.json({
      live: true,
      source: 'data.gov.in',
      total: payload.total ?? null,
      records: Array.isArray(payload.records) ? payload.records : [],
      message: Array.isArray(payload.records) && payload.records.length ? 'Market data loaded.' : 'The API returned no records for these filters.'
    });
  } catch (error) {
    console.error('Market-price API request failed:', error.message);
    return res.status(502).json({
      live: false, source: 'data.gov.in', records: [],
      message: 'Could not reach the government data service. Try again later.'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Harvestly API running at http://localhost:${PORT}`));
