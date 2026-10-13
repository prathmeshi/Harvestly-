import { useMemo, useState } from 'react';

import crops from '../data/crops.json';
const sources = [
  { name: 'ICAR crop advisories', detail: 'Seasonal guidance for crops and regions; confirm the relevant year and region.', url: 'https://icar.org.in/node/14312' },
  { name: 'ICAR technologies and knowledge resources', detail: 'Links to crop-management knowledge portals and expert systems.', url: 'https://www.icar.org.in/en/technologies-and-knowledge-resources' },
  { name: 'Meghdoot / IMD agro-advisories', detail: 'Weather-linked crop advisories; availability and coverage can vary by district.', url: 'https://meghdoot.imd.gov.in/' },
  { name: 'Soil Health Card portal', detail: 'Use soil-test results and field-specific recommendations for nutrient planning.', url: 'https://soilhealth.dac.gov.in/' },
  { name: 'Agriculture datasets on data.gov.in', detail: 'Explore government datasets; check publication date, geography, units, and update frequency.', url: 'https://data.gov.in/sector/agriculture' }
];

export default function CropGuide() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const filtered = useMemo(() => crops.filter(crop =>
    (group === 'All' || crop.group === group) &&
    `${crop.name} ${crop.group} ${crop.overview}`.toLowerCase().includes(query.toLowerCase())
  ), [query, group]);

  return <div className="workspace-content">
    <section className="welcome-panel fertilizer-panel">
      <div><span className="eyebrow">CROP KNOWLEDGE & ADVISORIES</span>
        <h2>Grow with better information, <em>not guesswork.</em></h2>
        <p>Browse starter crop notes and open official Indian agricultural resources for regional, seasonal guidance.</p>
        <a className="button button-primary" href="#crop-library">Explore crop library ↓</a>
      </div><div className="welcome-illustration">🌱</div>
    </section>
    <div className="notice-panel"><strong>Guidance and data quality</strong>
      <p>The crop cards below are general orientation only, not live or district-specific recommendations. Confirm season, variety, seed rate, nutrient dose, and plant-protection advice with the relevant ICAR/KVK/state agriculture guidance. No crop yield or fertilizer dose is invented here.</p>
    </div>
    <section className="content-section" id="crop-library">
      <div className="content-heading"><div><span className="eyebrow">CROP LIBRARY</span><h2>Crop overview</h2><p>Search the starter library or filter by crop group.</p></div></div>
      <div className="listing-toolbar">
        <input aria-label="Search crop guide" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tomato, rice, maize…" />
        <div className="filter-chips">{['All', 'Vegetable', 'Cereal'].map(item => <button key={item} className={group === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setGroup(item)}>{item}</button>)}</div>
      </div>
      <div className="fertilizer-grid">{filtered.map(crop => <article className="fertilizer-card" key={crop.name}>
        <div className="fertilizer-icon">{crop.icon}</div><span className="data-tag tag-demo">General reference</span>
        <h3>{crop.name}</h3><strong className="fertilizer-grade">{crop.group}</strong><p>{crop.overview}</p>
        <h4>Checklist</h4><ul>{crop.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        <small>{crop.caution}</small>
      </article>)}</div>
    </section>
    <section className="content-section"><div className="content-heading"><div><span className="eyebrow">OFFICIAL SOURCES</span><h2>Crop and soil resources</h2><p>Open the original source to verify the latest guidance for your region.</p></div></div>
      <div className="source-links">{sources.map(source => <a key={source.name} href={source.url} target="_blank" rel="noreferrer"><strong>{source.name} ↗</strong><br/><span>{source.detail}</span></a>)}</div>
    </section>
  </div>;
}
