import { useMemo, useState } from 'react';
import fertilizerCatalog from '../data/fertilizers.json';

function Fertilizers() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const types = ['All', ...new Set(fertilizerCatalog.map(item => item.type))];
  const filtered = useMemo(() => fertilizerCatalog.filter(item =>
    (type === 'All' || item.type === type) &&
    `${item.name} ${item.grade} ${item.type}`.toLowerCase().includes(query.toLowerCase())
  ), [query, type]);

  return <div className="workspace-content">
    <section className="welcome-panel fertilizer-panel"><div><span className="eyebrow">INPUTS & SOIL HEALTH</span><h2>Find the right input, <em>use it responsibly.</em></h2><p>Browse a reference catalogue of common fertilizer types and check official sources for current policies, availability, and prices.</p><a className="button button-primary" href="#fertilizer-catalog">Browse fertilizer guide ↓</a></div><div className="welcome-illustration">🌱</div></section>
    <div className="notice-panel"><strong>Reference guide, not a live shop.</strong><p>Items below are educational catalogue entries. This page does not claim current stock, seller availability, or live retail prices. Follow the product label and local agricultural guidance.</p></div>
    <section className="content-section" id="fertilizer-catalog">
      <div className="content-heading"><div><span className="eyebrow">FERTILIZER CATALOGUE</span><h2>Common fertilizer types</h2><p>Search by name, grade, or nutrient type.</p></div></div>
      <div className="listing-toolbar"><input aria-label="Search fertilizer catalogue" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search urea, DAP, NPK…" /><div className="filter-chips">{types.map(item => <button key={item} className={type === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setType(item)}>{item}</button>)}</div></div>
      <div className="fertilizer-grid">{filtered.map(item => <article className="fertilizer-card" key={item.id}><div className="fertilizer-icon">{item.icon}</div><span className="data-tag tag-demo">Reference entry</span><h3>{item.name}</h3><strong className="fertilizer-grade">{item.grade}</strong><p className="fertilizer-type">{item.type}</p><p>{item.note}</p><small>Package example: {item.package}</small></article>)}</div>
    </section>
    <section className="content-section"><div className="content-heading"><div><span className="eyebrow">OFFICIAL DATA SOURCES</span><h2>Check current information</h2><p>Government datasets can cover fertilizer demand, availability, consumption, stock, imports, and subsidy. Coverage and reporting periods vary.</p></div></div><div className="source-links"><a href="https://data.gov.in/keywords/Fertilizer" target="_blank" rel="noreferrer">Explore fertilizer datasets on data.gov.in ↗</a><a href="https://www.india.gov.in/category/agriculture-rural-environment/subcategory/resources-for-agriculture/details/website-of-department-of-fertilizers" target="_blank" rel="noreferrer">Department of Fertilizers ↗</a><a href="https://soilhealth.dac.gov.in/" target="_blank" rel="noreferrer">Soil Health Card portal ↗</a><a href="https://www.icar.org.in/en/technologies-and-knowledge-resources" target="_blank" rel="noreferrer">ICAR crop and nutrient resources ↗</a></div></section>
  </div>;
}
export default Fertilizers;
