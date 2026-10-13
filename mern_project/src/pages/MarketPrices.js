import { useEffect, useState } from 'react';

function MarketPrices() {
  const [commodity, setCommodity] = useState('Tomato');
  const [state, setState] = useState('Maharashtra');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchPrices(event) {
    if (event) event.preventDefault();
    setLoading(true); setError(''); setResult(null);
    try {
      const params = new URLSearchParams({ commodity, state, limit: '50' });
      const response = await fetch(`http://localhost:5000/api/market-prices?${params}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Market-price API request failed.');
      setResult(data);
      if (!data.live) setError(data.message || 'Live market data is not configured yet.');
    } catch (err) {
      setError(err.message || 'Could not connect to the Harvestly API. Start the backend and configure data.gov.in credentials.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPrices(); }, []);

  const rows = result?.records || [];
  return <div className="workspace-content">
    <section className="welcome-panel market-prices-panel"><div><span className="eyebrow">AGRICULTURAL MARKET INTELLIGENCE</span><h2>Compare mandi prices, <em>make informed decisions.</em></h2><p>Query the Government of India's open-data resource for daily commodity prices. Values are shown only when the configured API returns them.</p></div><div className="welcome-illustration">📈</div></section>
    <section className="content-section">
      <div className="content-heading"><div><span className="eyebrow">PRICE LOOKUP</span><h2>Market reference prices</h2><p>Choose a commodity and state. Reported prices and dates depend on source coverage.</p></div></div>
      <form className="data-form market-query-form" onSubmit={fetchPrices}>
        <label>Commodity<input value={commodity} onChange={e => setCommodity(e.target.value)} required placeholder="e.g. Tomato" /></label>
        <label>State<input value={state} onChange={e => setState(e.target.value)} required placeholder="e.g. Maharashtra" /></label>
        <button className="button button-primary" disabled={loading}>{loading ? 'Fetching…' : 'Fetch market data'}</button>
      </form>
      {error && <div className="notice-panel" role="status"><strong>{result?.live ? 'API note' : 'Live data not available'}</strong><p>{error}</p>{!result?.live && <p>Configure DATA_GOV_API_KEY and DATA_GOV_MARKET_RESOURCE_ID in the backend .env file. Sample prices are intentionally not presented as live.</p>}</div>}
      {result?.live && <div className="market-api-status"><span className="pill pill-green">Live government dataset response</span><small>Source: data.gov.in · Check the reported market date before comparing prices.</small></div>}
      {rows.length > 0 && <div className="table-wrap"><table className="data-table"><thead><tr>{Object.keys(rows[0]).map(key => <th key={key}>{key.replace(/_/g,' ')}</th>)}</tr></thead><tbody>{rows.map((row,index) => <tr key={index}>{Object.keys(rows[0]).map(key => <td key={key}>{String(row[key] ?? '—')}</td>)}</tr>)}</tbody></table></div>}
    </section>
    <p className="demo-note">Mandi prices are reference information, not guaranteed transaction prices. Confirm variety, grade, market, date, units, transport costs, and quality before negotiating.</p>
  </div>;
}
export default MarketPrices;
