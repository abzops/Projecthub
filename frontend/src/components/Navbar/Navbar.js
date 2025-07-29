import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">ProjectHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/discover" className="nav-link">
            <span className="link-text">Discover</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/features" className="nav-link">
            <span className="link-text">Features</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/resources" className="nav-link">
            <span className="link-text">Resources</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/about" className="nav-link">
            <span className="link-text">About</span>
            <span className="link-underline"></span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <Link to="/login" className="auth-link login">
            Log In
          </Link>
          <Link to="/signup" className="auth-link signup">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/discover" className="mobile-nav-link">
          Discover
        </Link>
        <Link to="/features" className="mobile-nav-link">
          Features
        </Link>
        <Link to="/resources" className="mobile-nav-link">
          Resources
        </Link>
        <Link to="/about" className="mobile-nav-link">
          About
        </Link>
        <div className="mobile-auth">
          <Link to="/login" className="mobile-login">
            Log In
          </Link>
          <Link to="/signup" className="mobile-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;