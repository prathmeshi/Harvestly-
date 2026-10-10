import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Connecting Farmers to Better Markets</h1>

          <p>
            Harvestly helps farmers connect with marketplaces,
            collaborate through crop pooling, and reach more buyers.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate('/marketplace')}>
              Explore Marketplace
            </button>
            <button className="secondary-btn" onClick={() => navigate('/register')}>
              Join Harvestly
            </button>
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
    </>
  );
}

export default Home;