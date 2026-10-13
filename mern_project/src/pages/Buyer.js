import { useMemo, useState } from 'react';
import { readProduce } from '../data/marketData';

function Buyer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [shortlist, setShortlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('harvestly-shortlist') || '[]'); } catch { return []; }
  });
  const [listings] = useState(() => readProduce());

  const categories = ['All', ...new Set(listings.map(item => item.category || 'Other'))];
  const filtered = useMemo(() => listings.filter(item =>
    (category === 'All' || item.category === category) &&
    `${item.name} ${item.farmer} ${item.location} ${item.variety || ''}`.toLowerCase().includes(query.toLowerCase())
  ), [listings, category, query]);

  function toggleShortlist(id) {
    const updated = shortlist.includes(id) ? shortlist.filter(item => item !== id) : [...shortlist, id];
    setShortlist(updated);
    localStorage.setItem('harvestly-shortlist', JSON.stringify(updated));
  }

  return <div className="workspace-content">
    <section className="welcome-panel buyer-panel"><div><span className="eyebrow">PROCUREMENT WORKSPACE</span><h2>Find fresh produce, <em>closer to source.</em></h2><p>Search available listings shared in this browser, compare asking prices, and shortlist produce for follow-up.</p><a className="button button-primary" href="#listings">Browse listings <span>↓</span></a></div><div className="welcome-illustration">🧺</div></section>
    <div className="metric-grid"><article className="metric-card"><span>Visible listings</span><strong>{listings.length.toString().padStart(2,'0')}</strong><small>Sample + local browser listings</small></article><article className="metric-card"><span>Categories</span><strong>{Math.max(0,categories.length-1).toString().padStart(2,'0')}</strong><small>Based on catalogue categories</small></article><article className="metric-card"><span>Shortlisted</span><strong>{shortlist.length.toString().padStart(2,'0')}</strong><small>Saved in this browser</small></article></div>
    <section className="content-section" id="listings"><div className="content-heading"><div><span className="eyebrow">DISCOVER PRODUCE</span><h2>Available listings</h2><p>Sample listings are illustrative; local listings are not uploaded to a shared server.</p></div></div>
      <div className="listing-toolbar"><input aria-label="Search listings" placeholder="Search produce, seller, or location…" value={query} onChange={event => setQuery(event.target.value)} /><div className="filter-chips">{categories.map(option => <button className={category === option ? 'filter-chip active' : 'filter-chip'} key={option} onClick={() => setCategory(option)}>{option}</button>)}</div></div>
      <div className="buyer-listing-grid">{filtered.map(item => <article className="buyer-listing" key={item.id}><div className="listing-art"><span>{item.icon || '🌱'}</span><small>{item.category}</small></div><div className="listing-body"><div className="listing-title"><h3>{item.name}</h3><strong>₹{item.price} / {item.unit || 'kg'}</strong></div><p>{item.farmer}</p><small className="listing-location">⌖ {item.location}</small>{item.variety && <p className="listing-variety">Variety: {item.variety}</p>}<div className="listing-bottom"><span>{item.quantity} {item.unit || 'kg'} available</span><button className={shortlist.includes(item.id) ? 'button button-outline selected' : 'button button-outline'} onClick={() => toggleShortlist(item.id)}>{shortlist.includes(item.id) ? 'Shortlisted ✓' : 'Shortlist +'}</button></div><span className={`data-tag ${item.source === 'demo' ? 'tag-demo' : 'tag-local'}`}>{item.source === 'demo' ? 'Sample data' : 'Local browser listing'}</span></div></article>)}</div>
      {filtered.length === 0 && <div className="empty-state">No listings match this search. Try another keyword or category.</div>}
    </section>
    <p className="demo-note">No order or payment is created by shortlisting. A real marketplace needs authenticated buyer accounts, server-side inventory, order records, and seller notifications.</p>
  </div>;
}
export default Buyer;
