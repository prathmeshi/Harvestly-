import { Link } from 'react-router-dom';

function navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Harvestly</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/pooling">Pooling</Link>
        <Link to="/about">About</Link>
        <Link to="/login"><button>Login</button></Link>
      </div>
    </nav>
  );
}

export default navbar;