import { useMemo, useState } from 'react';

const initialLots = [
  { id: 'lot-101', crop: 'Fresh tomatoes', icon: '🍅', farmer: 'Green Valley Farm', location: 'Pune, Maharashtra', quantity: '500 kg', quality: 'Grade A, freshly harvested', base: 18, end: 'Demo closes today, 6:00 PM', bids: [{ buyer: 'FreshCart Wholesale', amount: 21 }, { buyer: 'City Vegetable Hub', amount: 23 }] },
  { id: 'lot-102', crop: 'Nashik red onions', icon: '🧅', farmer: 'Nashik Growers', location: 'Nashik, Maharashtra', quantity: '1,000 kg', quality: 'Cured onions, mixed medium size', base: 15, end: 'Demo closes tomorrow, 12:00 PM', bids: [{ buyer: 'Deccan Foods', amount: 17 }] },
  { id: 'lot-103', crop: 'Sweet corn', icon: '🌽', farmer: 'Sunrise Fields', location: 'Satara, Maharashtra', quantity: '300 kg', quality: 'Fresh cobs, harvest-ready', base: 20, end: 'Demo closes tomorrow, 4:00 PM', bids: [] },
  { id: 'lot-104', crop: 'Potatoes', icon: '🥔', farmer: 'Deccan Produce Co-op', location: 'Pune, Maharashtra', quantity: '750 kg', quality: 'Table potatoes, sorted', base: 16, end: 'Demo closes in 2 days', bids: [{ buyer: 'Market Basket Traders', amount: 18 }, { buyer: 'FreshCart Wholesale', amount: 19 }] },
];

export default function CropAuction() {
  const [lots, setLots] = useState(initialLots);
  const [buyer, setBuyer] = useState('');
  const [bidInputs, setBidInputs] = useState({});
  const [notice, setNotice] = useState('');
  const [showFarmerForm, setShowFarmerForm] = useState(false);
  const [form, setForm] = useState({ crop: '', icon: '🌱', farmer: '', location: '', quantity: '', quality: '', base: '' });
  const [showBidForm, setShowBidForm] = useState({});
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => lots.filter(lot => filter === 'All' || (filter === 'Open' ? true : (Math.max(0, ...lot.bids.map(b => b.amount)) > lot.base))), [lots, filter]);

  function submitLot(e) {
    e.preventDefault();
    if (!form.crop.trim() || !form.farmer.trim() || !form.location.trim() || !form.quantity.trim() || Number(form.base) <= 0) {
      setNotice('Complete the required crop, farmer, location, quantity, and base price fields.');
      return;
    }
    setLots(current => [{ ...form, id: `lot-${Date.now()}`, base: Number(form.base), bids: [], end: 'Demo auction; no real closing time' }, ...current]);
    setNotice('Demo crop lot created. It is available in this page session only.');
    setForm({ crop: '', icon: '🌱', farmer: '', location: '', quantity: '', quality: '', base: '' });
    setShowFarmerForm(false);
  }
  function placeBid(lot) {
    const amount = Number(bidInputs[lot.id]);
    if (!buyer.trim()) { setNotice('Enter your buyer / company name before placing a demo bid.'); return; }
    const highest = Math.max(lot.base, ...lot.bids.map(b => b.amount));
    if (!Number.isFinite(amount) || amount <= highest) { setNotice(`Your bid must be higher than the current highest bid of ₹${highest}/kg.`); return; }
    setLots(current => current.map(item => item.id === lot.id ? { ...item, bids: [...item.bids, { buyer: buyer.trim(), amount }] } : item));
    setNotice(`Demo bid of ₹${amount}/kg recorded for ${lot.crop}. No real order or binding offer has been created.`);
    setBidInputs(current => ({ ...current, [lot.id]: '' }));
    setShowBidForm(current => ({ ...current, [lot.id]: false }));
  }

  return <div className="workspace-content">
    <section className="welcome-panel fertilizer-panel"><div><span className="eyebrow">CROP POOLING & BIDDING</span><h2>One harvest, <em>competitive offers.</em></h2><p>Farmers list crop lots and interested buyers place demo bids. The highest displayed bid is marked as the current leader.</p><div className="auction-hero-actions"><a className="button button-primary" href="#crop-lots">Browse crop lots ↓</a><button className="button button-outline" onClick={() => setShowFarmerForm(v => !v)}>{showFarmerForm ? 'Close form' : 'List your crops +'}</button></div></div><div className="welcome-illustration">🤝</div></section>
    <div className="notice-panel"><strong>Static demo auction — not a real sale</strong><p>All farmers, lots, bids, and closing times are sample data. Bids are held in page memory only and disappear on refresh. The displayed leader is only a demo winner candidate; no automatic award, payment, contract, or real-world sale occurs. User accounts, verified weights/quality, bid audit trail, auction deadlines, dispute handling, and secure backend processing are future scope.</p></div>
    {showFarmerForm && <section className="content-section"><div className="content-heading"><div><span className="eyebrow">FARMER WORKFLOW</span><h2>Create a crop lot</h2></div></div><form className="agri-form" onSubmit={submitLot}>
      <label>Crop name<input value={form.crop} onChange={e => setForm({...form,crop:e.target.value})} placeholder="e.g. Fresh tomatoes" required /></label>
      <label>Farmer / FPO name<input value={form.farmer} onChange={e => setForm({...form,farmer:e.target.value})} placeholder="Farm or FPO name" required /></label>
      <label>Location<input value={form.location} onChange={e => setForm({...form,location:e.target.value})} placeholder="District, state" required /></label>
      <label>Quantity<input value={form.quantity} onChange={e => setForm({...form,quantity:e.target.value})} placeholder="e.g. 500 kg" required /></label>
      <label>Base price (₹/kg)<input type="number" min="1" value={form.base} onChange={e => setForm({...form,base:e.target.value})} placeholder="Minimum bid" required /></label>
      <label>Quality / description<input value={form.quality} onChange={e => setForm({...form,quality:e.target.value})} placeholder="Grade, harvest date, details" /></label>
      <div className="full-field"><button className="button button-primary" type="submit">Publish demo crop lot</button></div>
    </form></section>}
    <section className="content-section" id="crop-lots"><div className="content-heading"><div><span className="eyebrow">AVAILABLE LOTS</span><h2>Browse and bid</h2><p>Enter a buyer name and place a bid above the current highest bid.</p></div></div>
      <div className="listing-toolbar"><input value={buyer} onChange={e => setBuyer(e.target.value)} placeholder="Your buyer / company name" aria-label="Buyer or company name" /><div className="filter-chips">{['All','Open'].map(item => <button key={item} className={filter===item?'filter-chip active':'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
      <div className="auction-grid">{filtered.map(lot => {
        const highest = Math.max(0, ...lot.bids.map(b => b.amount));
        const leader = lot.bids.reduce((top, bid) => !top || bid.amount > top.amount ? bid : top, null);
        return <article className="auction-card" key={lot.id}>
          <div className="auction-card-top"><span className="auction-crop-icon">{lot.icon}</span><span className="data-tag tag-demo">Demo lot</span></div>
          <h3>{lot.crop}</h3><p className="seller-name">{lot.farmer}</p><div className="seller-meta"><span>📍 {lot.location}</span><span>⚖️ {lot.quantity}</span></div>
          <p>{lot.quality || 'Farmer-provided crop details'}</p>
          <div className="auction-price-grid"><div><small>Base price</small><strong>₹{lot.base}/kg</strong></div><div><small>Highest bid</small><strong>{highest ? `₹${highest}/kg` : 'No bids yet'}</strong></div></div>
          {leader ? <div className="auction-leader"><span>🏆 Current highest bidder</span><strong>{leader.buyer}</strong><small>₹{leader.amount}/kg · demo leader only</small></div> : <div className="auction-no-bids">Be the first to place a bid above ₹{lot.base}/kg.</div>}
          <small className="auction-closing">{lot.end}</small>
          <div className="auction-actions"><button className="button button-primary" onClick={() => setShowBidForm(v => ({...v,[lot.id]:!v[lot.id]}))}>{showBidForm[lot.id] ? 'Cancel bid' : 'Place a bid'}</button><span>{lot.bids.length} bid{lot.bids.length===1?'':'s'}</span></div>
          {showBidForm[lot.id] && <div className="bid-form"><label>Offer (₹ per kg)<input type="number" min={Math.max(lot.base,...lot.bids.map(b=>b.amount))+0.01} step="0.01" value={bidInputs[lot.id]||''} onChange={e => setBidInputs(v=>({...v,[lot.id]:e.target.value}))} placeholder={`Above ₹${Math.max(lot.base,...lot.bids.map(b=>b.amount))}`} /></label><button className="button button-outline" onClick={() => placeBid(lot)}>Submit demo bid</button></div>}
        </article>;
      })}</div>
    </section>
    {notice && <p className="notice-panel form-notice" role="status">{notice}</p>}
    <section className="content-section auction-rules"><div className="content-heading"><div><span className="eyebrow">HOW IT WORKS</span><h2>Simple demo auction flow</h2></div></div><div className="auction-steps"><article><strong>01</strong><h3>Farmer lists a crop lot</h3><p>Quantity, location, quality notes, and a minimum price.</p></article><article><strong>02</strong><h3>Buyers submit bids</h3><p>Each demo bid must exceed the currently displayed highest bid.</p></article><article><strong>03</strong><h3>Highest bid leads</h3><p>The highest bid is shown as the leader. Awarding the lot is not automated in this static version.</p></article></div></section>
  </div>;
}
