import { useState } from 'react';
import './components.css';
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import './appbar.css';

function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="app-bar">
      <div className="app-bar-container">
        <div className="app-bar-content">
          {/* Logo and Title */}
          <div className="app-bar-logo-container">
            <img
              alt="TADSTech Logo"
              src={logo}
              className="app-bar-logo"
            />
            <span className="app-bar-title">
              TADSTech
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/services" className="nav-link">
              Services
            </Link>
            <Link to="/github" className="nav-link">
              GitHub
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-button">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="mobile-menu">
          <div className="mobile-menu-container">
            <Link to="/"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link to="/services"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link to="/github"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              GitHub
            </Link>
            <Link to="/about"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link to="/contact"
              className="mobile-nav-button"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;