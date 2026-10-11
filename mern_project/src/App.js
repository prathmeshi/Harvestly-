
import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Pooling from './pages/Pooling';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('harvestly-theme') || 'system'
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const resolvedTheme =
        theme === 'system'
          ? media.matches
            ? 'dark'
            : 'light'
          : theme;

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;
    };

    applyTheme();
    localStorage.setItem('harvestly-theme', theme);

    media.addEventListener('change', applyTheme);

    return () => {
      media.removeEventListener('change', applyTheme);
    };
  }, [theme]);

  return (
    <div className="app">
      <Navbar />

      <div className="theme-control">
        <label htmlFor="theme-select">Appearance</label>
        <select
          id="theme-select"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/pooling" element={<Pooling />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/about"
            element={<h2 className="about-heading">About Harvestly</h2>}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;