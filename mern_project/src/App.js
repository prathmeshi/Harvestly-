import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Harvestly</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Marketplace</a>
          <a href="/">Pooling</a>
          <a href="/">About</a>
          <button>Login</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Connecting Farmers to Better Markets</h1>

          <p>
            Harvestly helps farmers connect with marketplaces,
            collaborate through crop pooling, and reach more buyers.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Explore Marketplace</button>
            <button className="secondary-btn">Join Harvestly</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>What Harvestly Offers</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>Marketplace</h3>
            <p>Connect farmers directly with potential buyers and marketplaces.</p>
          </div>

          <div className="feature-card">
            <h3>Crop Pooling</h3>
            <p>Pool produce with other farmers to meet larger market demands.</p>
          </div>

          <div className="feature-card">
            <h3>Better Opportunities</h3>
            <p>Discover new markets and improve access to buyers.</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© 2026 Harvestly · Connecting farmers with better markets</p>
      </footer>
    </div>
  );
}

export default App;