import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import logo from "../assets/images/logo.svg";
import "./appbar.css";


const getSystemPreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const getInitialTheme = () => (localStorage.getItem("theme") as "light" | "dark") || getSystemPreference();
function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="app-header" role="banner">
      <nav
        className={`app-bar ${isScrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="app-bar-container">
          <div className="app-bar-content">
            {/* Logo + Brand */}
            <div className="app-bar-logo-container">
              <img
                src={logo}
                alt="TADSTech logo - The Average Data Scientist brand mark"
                className="app-bar-logo"
                loading="eager"
              />
              <button
                onClick={toggleTheme}
                className="app-bar-title-button"
                aria-label="Toggle theme"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                TADSTech
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/services" className="nav-link">
                Services
              </NavLink>
              <NavLink to="/github" className="nav-link">
                Portfolio
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavLink to="/contact" className="nav-button">
                Contact Us
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-menu-toggle">
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
        <CSSTransition
          in={isMobileMenuOpen}
          timeout={300}
          classNames="menu"
          unmountOnExit
        >
          <div className="mobile-menu" role="menu">
            <div className="mobile-menu-container">
              <NavLink
                to="/"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Services
              </NavLink>
              <NavLink
                to="/github"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/about"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="mobile-nav-button"
                onClick={toggleMobileMenu}
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </CSSTransition>
      </nav>
    </header>
  );
}

export default AppBar;