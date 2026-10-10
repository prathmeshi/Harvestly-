import { useEffect, useState } from 'react';

const CATEGORIES = ['all', 'grains', 'fruits', 'vegetables'];

function daysAgo(dateStr) {
  if (!dateStr) return '-';
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setError('Could not load products. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const q = search.trim().toLowerCase();
  const visible = products.filter((p) => {
    const matchesCategory = category === 'all' || p.category === category;
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.farmerName || '').toLowerCase().includes(q) ||
      (p.location || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="market-page">
      <div className="market-banner">
        <h1>Fresh produce directly from farmers</h1>
        <p>Browse listings from farmers and FPOs, with photos and prices up front.</p>
      </div>

      <div className="market-toolbar">
        <input
          className="market-search"
          type="text"
          placeholder="Search crops, farmers, places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="market-chips">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="market-message">Loading products...</p>}
      {error && <p className="market-message market-error">{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className="market-message">No products found.</p>
      )}

      <div className="market-grid">
        {visible.map((p) => (
          <div className="market-card" key={p._id}>
            {p.imageUrl ? (
              <img className="market-img" src={p.imageUrl} alt={p.name} />
            ) : (
              <div className="market-img market-img-empty">No photo yet</div>
            )}

            <div className="market-card-body">
              <div className="market-card-top">
                <h3>{p.name}</h3>
                <span className="price-tag">
                  ₹{p.price}/{p.unit}
                </span>
              </div>

              <p className="market-farmer">
                {p.farmerName || 'Farmer'}
                {p.location ? ` · ${p.location}` : ''}
              </p>

              <div className="spec-row">
                <span>Quantity</span>
                <span>
                  {p.quantity} {p.unit}
                </span>
              </div>
              <div className="spec-row">
                <span>Harvested</span>
                <span>{daysAgo(p.harvestedOn)}</span>
              </div>

              <button type="button" className="order-btn">
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;