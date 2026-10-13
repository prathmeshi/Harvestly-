const roles = [
  { href: '/farmer', icon: '🌱', tag: 'FOR GROWERS', title: 'Farmer', description: 'List your harvest, track produce, and discover buyers looking for your crops.', action: 'Open farmer workspace', tone: 'green' },
  { href: '/buyer', icon: '🧺', tag: 'FOR PROCUREMENT', title: 'Buyer', description: 'Browse available produce, compare sample listings, and organize purchasing needs.', action: 'Explore buyer workspace', tone: 'orange' },
  { href: '/fpo', icon: '🤝', tag: 'FOR ORGANIZATIONS', title: 'FPO', description: 'Coordinate member farmers, consolidate produce, and respond to larger orders.', action: 'Open FPO workspace', tone: 'blue' },
];

function Home() {
  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> FARMERS. MARKETS. OPPORTUNITY.</div>
          <h1>A better harvest starts with <em>better connections.</em></h1>
          <p>Harvestly brings farmers, Farmer Producer Organizations, and buyers into one place to make agricultural trade more connected and collaborative.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#workspaces">Explore workspaces <span>↘</span></a>
            <a className="text-link" href="/buyer">Browse buyer view <span>→</span></a>
          </div>
          <div className="hero-note"><span>✳</span> Built around stronger agricultural communities</div>
        </div>
        <div className="hero-art" aria-label="Illustration of a basket of fresh produce" role="img">
          <div className="art-sun" />
          <span className="produce produce-carrot">🥕</span><span className="produce produce-leaf">🥬</span><span className="produce produce-tomato">🍅</span><span className="produce produce-corn">🌽</span>
          <div className="produce-basket"><span>FRESH HARVEST</span></div>
          <div className="art-label label-top">✳ Farm fresh</div><div className="art-label label-bottom"><span className="status-dot" /> Growing together</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Harvestly benefits"><div><strong>01</strong><span>Connect directly</span></div><div><strong>02</strong><span>Coordinate supply</span></div><div><strong>03</strong><span>Reach more markets</span></div></section>

      <section className="workspaces section" id="workspaces">
        <div className="section-heading"><div><span className="eyebrow">CHOOSE YOUR WORKSPACE</span><h2>One ecosystem.<br /><em>Three ways to grow.</em></h2></div><p>Choose the experience that matches your role in the agricultural supply chain.</p></div>
        <div className="role-grid">{roles.map((role) => <article className={`role-card ${role.tone}`} key={role.title}><div className="role-card-top"><span className="role-icon">{role.icon}</span><span className="role-tag">{role.tag}</span></div><h3>{role.title}</h3><p>{role.description}</p><a href={role.href}>{role.action}<span aria-hidden="true">↗</span></a></article>)}</div>
      </section>


      <section className="data-tools section">
        <div className="section-heading"><div><span className="eyebrow">AGRICULTURE DATA TOOLS</span><h2>More than a marketplace.</h2></div><p>Explore reference data and tools designed to support produce planning and farm input research.</p></div>
        <div className="data-tool-grid">
          <a className="data-tool-card" href="/market-prices"><span>📈</span><strong>Mandi price lookup</strong><p>Query daily commodity price records from a configured government open-data API.</p><b>Explore market prices ↗</b></a>
          <a className="data-tool-card" href="/fertilizers"><span>🌱</span><strong>Fertilizer guide</strong><p>Browse common fertilizer types and follow official sources for current policy and stock data.</p><b>Explore fertilizer guide ↗</b></a>
        </div>
      </section>

      <section className="closing-banner"><div><span className="eyebrow eyebrow-light">BETTER TOGETHER</span><h2>Small farms. Stronger networks.<br />Bigger possibilities.</h2><p>Start with your workspace and see how Harvestly can support your next step.</p></div><a className="button button-light" href="/fpo">Explore FPO workspace <span>→</span></a></section>
    </>
  );
}
export default Home;
