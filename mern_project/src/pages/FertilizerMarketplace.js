import { useMemo, useState } from 'react';

const initialProducts = [
  { id: 1, seller: 'Shree Agro Centre', name: 'Urea', grade: '46-0-0', pack: '45 kg bag', price: 266, stock: 40, location: 'Pune, Maharashtra', note: 'Demo price; confirm current regulated pricing and availability with seller.' },
  { id: 2, seller: 'Kisan Krushi Seva Kendra', name: 'DAP', grade: '18-46-0', pack: '50 kg bag', price: 1350, stock: 25, location: 'Nashik, Maharashtra', note: 'Demo listing; price and stock are not live.' },
  { id: 3, seller: 'GreenGrow Inputs', name: 'NPK 10:26:26', grade: '10-26-26', pack: '50 kg bag', price: 1475, stock: 18, location: 'Satara, Maharashtra', note: 'Demo listing; check the product label and local recommendation.' },
  { id: 4, seller: 'Sahyadri Organic Supplies', name: 'Vermicompost', grade: 'Organic input', pack: '25 kg bag', price: 220, stock: 60, location: 'Thane, Maharashtra', note: 'Demo listing; nutrient content varies by product.' },
];

export default function FertilizerMarketplace() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ seller: '', name: '', grade: '', pack: '50 kg bag', price: '', stock: '', location: '', note: '' });
  const filtered = useMemo(() => products.filter(p => `${p.name} ${p.grade} ${p.seller} ${p.location}`.toLowerCase().includes(query.toLowerCase())), [products, query]);

  function update(field, value) { setForm(current => ({ ...current, [field]: value })); }
  function submit(e) {
    e.preventDefault();
    if (!form.seller.trim() || !form.name.trim() || Number(form.price) <= 0 || Number(form.stock) <= 0 || !form.location.trim()) {
      setNotice('Please enter seller, product, a valid price, stock quantity, and location.');
      return;
    }
    setProducts(current => [{ ...form, id: Date.now(), price: Number(form.price), stock: Number(form.stock), note: form.note || 'Seller-provided demo listing; verify details before purchase.' }, ...current]);
    setNotice('Demo listing added. It exists only in this page session and is not published to other users.');
    setForm({ seller: '', name: '', grade: '', pack: '50 kg bag', price: '', stock: '', location: '', note: '' });
  }

  return <div className="workspace-content">
    <section className="welcome-panel fertilizer-panel"><div><span className="eyebrow">AGRI-INPUT MARKETPLACE</span><h2>Fertilizer supplies, <em>closer to the farm.</em></h2><p>Browse example seller listings or add a demo listing to show how fertilizer sellers can reach farmers.</p><a className="button button-primary" href="#fertilizer-sellers">Browse sellers ↓</a></div><div className="welcome-illustration">🧑‍🌾</div></section>
    <div className="notice-panel"><strong>Static demonstration only</strong><p>Seller names, prices, and stock shown here are illustrative demo records—not verified offers, current market prices, or real inventory. No purchase, payment, or order is submitted. Dynamic accounts, seller verification, live inventory, and checkout are future scope.</p></div>
    <section className="content-section" id="fertilizer-sellers">
      <div className="content-heading"><div><span className="eyebrow">AVAILABLE EXAMPLE LISTINGS</span><h2>Find fertilizer sellers</h2><p>Search by fertilizer, seller, grade, or location.</p></div></div>
      <div className="listing-toolbar"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search urea, DAP, Pune…" aria-label="Search fertilizer sellers" /><span className="result-count">{filtered.length} listings</span></div>
      <div className="seller-grid">{filtered.map(item => <article className="seller-card" key={item.id}><div className="seller-card-top"><span className="fertilizer-icon">🧪</span><span className="data-tag tag-demo">Demo seller</span></div><h3>{item.name}</h3><strong className="fertilizer-grade">{item.grade}</strong><p className="seller-name">{item.seller}</p><div className="seller-meta"><span>📦 {item.pack}</span><span>📍 {item.location}</span></div><div className="seller-price-row"><div><small>Example price</small><strong>₹{Number(item.price).toLocaleString('en-IN')}</strong></div><div><small>Example stock</small><strong>{item.stock} units</strong></div></div><p className="seller-note">{item.note}</p><button className="button button-outline" type="button" onClick={() => setNotice(`Demo only: contact details and ordering for ${item.seller} will be added in the dynamic version.`)}>View seller details</button></article>)}</div>
    </section>
    <section className="content-section seller-form-section"><div className="content-heading"><div><span className="eyebrow">FOR SELLERS</span><h2>List your fertilizer</h2><p>Add a temporary demo listing to preview the seller workflow.</p></div></div>
      <form className="agri-form" onSubmit={submit}>
        <label>Seller / shop name<input value={form.seller} onChange={e => update('seller', e.target.value)} placeholder="e.g. Kisan Krushi Seva Kendra" required /></label>
        <label>Fertilizer name<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Urea" required /></label>
        <label>Grade / composition<input value={form.grade} onChange={e => update('grade', e.target.value)} placeholder="e.g. 46-0-0" /></label>
        <label>Package size<select value={form.pack} onChange={e => update('pack', e.target.value)}><option>50 kg bag</option><option>45 kg bag</option><option>25 kg bag</option><option>Bulk / loose</option><option>Other</option></select></label>
        <label>Price per package (₹)<input type="number" min="1" value={form.price} onChange={e => update('price', e.target.value)} placeholder="Example price" required /></label>
        <label>Available quantity<input type="number" min="1" value={form.stock} onChange={e => update('stock', e.target.value)} placeholder="Number of bags / units" required /></label>
        <label className="full-field">Location<input value={form.location} onChange={e => update('location', e.target.value)} placeholder="Town / district, state" required /></label>
        <label className="full-field">Product notes (optional)<textarea value={form.note} onChange={e => update('note', e.target.value)} placeholder="Product details, certification, delivery notes…" rows="3" /></label>
        <div className="full-field"><button className="button button-primary" type="submit">Add demo listing <span>↗</span></button></div>
      </form>
      {notice && <p className="notice-panel form-notice" role="status">{notice}</p>}
    </section>
  </div>;
}
