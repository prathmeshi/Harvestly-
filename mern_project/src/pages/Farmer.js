import { useMemo, useState } from 'react';
import WeatherWidget from '../components/WeatherWidget';
import { readProduce, saveProduce } from '../data/marketData';

const icons = { Tomato: '🍅', Onion: '🧅', Potato: '🥔', Spinach: '🥬', 'Sweet corn': '🌽', Other: '🌱' };

function Farmer() {
  const [produce, setProduce] = useState(() => readProduce());
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Vegetables', variety: '', quantity: '', unit: 'kg', price: '', location: 'Pune, Maharashtra', farmer: 'My Farm' });
  const [notice, setNotice] = useState('');

  const activeCount = useMemo(() => produce.length, [produce]);
  const totalQuantity = useMemo(() => produce.reduce((sum, item) => sum + Number(item.quantity || 0), 0), [produce]);

  function addProduce(event) {
    event.preventDefault();
    const item = {
      ...form,
      id: `farmer-${Date.now()}`,
      quantity: Number(form.quantity),
      price: Number(form.price),
      icon: icons[form.name] || '🌱',
      source: 'user-demo',
    };
    const updated = [item, ...produce];
    setProduce(updated);
    saveProduce(updated);
    setForm({ name: '', category: 'Vegetables', variety: '', quantity: '', unit: 'kg', price: '', location: 'Pune, Maharashtra', farmer: 'My Farm' });
    setFormOpen(false);
    setNotice('Produce listing saved in this browser. It is visible in the Buyer workspace on this device.');
  }

  function removeProduce(id) {
    const updated = produce.filter(item => item.id !== id);
    setProduce(updated);
    saveProduce(updated);
    setNotice('Listing removed from this browser.');
  }

  return <div className="workspace-content">
    <section className="welcome-panel farmer-panel"><div><span className="eyebrow">FARM MANAGEMENT</span><h2>Your harvest, <em>your opportunities.</em></h2><p>Maintain a produce catalogue and let buyers discover the harvest you make available.</p><a className="button button-primary" href="#produce">View my produce <span>↓</span></a></div><div className="welcome-illustration">🌾</div></section>
    <div className="metric-grid">
      <article className="metric-card"><span>Listings in this browser</span><strong>{activeCount}</strong><small>Seeded demo + listings you add</small></article>
      <article className="metric-card"><span>Total listed quantity</span><strong>{totalQuantity.toLocaleString('en-IN')} <small>units</small></strong><small>Mixed produce units; use per-item values</small></article>
      <article className="metric-card"><span>Data status</span><strong>Local</strong><small>Not yet synced to a server database</small></article>
    </div>
    <WeatherWidget />
    <section className="content-section" id="produce">
      <div className="content-heading"><div><span className="eyebrow">YOUR INVENTORY</span><h2>Produce listings</h2><p>Demo seed records are labelled in the interface; additions are saved to this browser.</p></div><button className="button button-primary" onClick={() => { setFormOpen(!formOpen); setNotice(''); }}>{formOpen ? 'Cancel' : '＋ Add produce'}</button></div>
      {notice && <p className="inline-notice" role="status">{notice}</p>}
      {formOpen && <form className="data-form" onSubmit={addProduce}>
        <label>Produce name<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="e.g. Fresh tomatoes" /></label>
        <label>Category<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}><option>Vegetables</option><option>Fruits</option><option>Grains & pulses</option><option>Other</option></select></label>
        <label>Variety<input value={form.variety} onChange={e => setForm({...form,variety:e.target.value})} placeholder="e.g. Nashik Red" /></label>
        <label>Quantity<input required min="1" type="number" value={form.quantity} onChange={e => setForm({...form,quantity:e.target.value})} placeholder="Quantity" /></label>
        <label>Unit<select value={form.unit} onChange={e => setForm({...form,unit:e.target.value})}><option>kg</option><option>quintal</option><option>tonne</option><option>crate</option><option>piece</option></select></label>
        <label>Expected price (₹ per unit)<input required min="0" type="number" step="0.01" value={form.price} onChange={e => setForm({...form,price:e.target.value})} placeholder="Price" /></label>
        <label>Farm / seller name<input required value={form.farmer} onChange={e => setForm({...form,farmer:e.target.value})} /></label>
        <label>Location<input required value={form.location} onChange={e => setForm({...form,location:e.target.value})} /></label>
        <button className="button button-primary" type="submit">Save listing</button>
      </form>}
      <div className="inventory-list">{produce.map(item => <article className="inventory-row" key={item.id}><div className="inventory-product"><span className="inventory-icon">{item.icon || '🌱'}</span><div><strong>{item.name}</strong><small>{item.variety || item.category} · {item.farmer}</small></div></div><div><small>Quantity</small><strong>{item.quantity} {item.unit || 'kg'}</strong></div><div><small>Expected price</small><strong>₹{item.price} / {item.unit || 'kg'}</strong></div><span className={`pill ${item.source === 'demo' ? 'pill-muted' : 'pill-green'}`}>{item.source === 'demo' ? 'Sample' : 'Local listing'}</span>{item.source !== 'demo' && <button className="text-button" onClick={() => removeProduce(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>}</article>)}</div>
    </section>
    <section className="tip-panel"><span className="tip-icon">✦</span><div><strong>Before publishing a real listing</strong><p>Confirm quantity, grade, harvest date, unit, location, and price. This demo saves data only in your browser; it does not publish to a live marketplace.</p></div></section>
  </div>;
}
export default Farmer;
