import './App.css';
import Home from './pages/Home';
import Farmer from './pages/Farmer';
import Buyer from './pages/Buyer';
import FPO from './pages/FPO';
import Fertilizers from './pages/Fertilizers';
import MarketPrices from './pages/MarketPrices';

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const pages = {
    '/farmer': { title: 'Farmer workspace', component: <Farmer /> },
    '/buyer': { title: 'Buyer workspace', component: <Buyer /> },
    '/fpo': { title: 'FPO workspace', component: <FPO /> },
    '/fertilizers': { title: 'Fertilizer guide', component: <Fertilizers /> },
    '/market-prices': { title: 'Market prices', component: <MarketPrices /> },
  };
  const current = pages[path];

  return (
    <div className="app-shell">
      <header className="navbar">
        <a className="brand" href="/" aria-label="Harvestly home">Harvestly<span>.</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/">Home</a><a href="/farmer">Farmer</a><a href="/buyer">Buyer</a>
          <a href="/fpo">FPO</a><a href="/market-prices">Mandi prices</a><a href="/fertilizers">Fertilizers</a>
        </nav>
        <a className="nav-cta" href={current ? path : '/farmer'}>{current ? 'Workspace' : 'Get started'} <span aria-hidden="true">↗</span></a>
      </header>
      {current && <div className="page-intro"><span className="eyebrow">HARVESTLY WORKSPACE</span><h1>{current.title}</h1><p>Tools to help the agricultural community connect, coordinate, and grow.</p></div>}
      <main>{current ? current.component : <Home />}</main>
      <footer className="site-footer">
        <a className="brand footer-brand" href="/">Harvestly<span>.</span></a>
        <p>Connecting farms, organizations, and buyers.</p>
        <span>© 2026 Harvestly · Demo experience</span>
      </footer>
    </div>
  );
}
export default App;
