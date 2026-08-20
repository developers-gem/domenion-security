import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import "./Header.css";

import { services } from "../../data/services";
import { industries } from "../../data/industries";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">

      <div className="header-inner">

        {/* ================= LOGO ================= */}

        <Link to="/" className="site-logo" onClick={closeMobileMenu}>

          <div className="logo-mark">
            D
          </div>

          <div className="logo-text">
            <strong>DOMENION</strong>
            <small>SECURITY SERVICES</small>
          </div>

        </Link>


        {/* ================= DESKTOP NAV ================= */}

        <nav className="desktop-nav">

          <Link to="/" className="nav-link">
            Home
          </Link>


          <Link to="/about" className="nav-link">
            About
          </Link>


          {/* ================= SERVICES ================= */}

          <div className="nav-dropdown">

            <Link
              to="/services"
              className="nav-link nav-dropdown-link"
            >
              Services

              <ChevronDown size={14} />
            </Link>


            <div className="mega-menu services-menu">

              <div className="mega-service-grid">

                {services.map((service, index) => (

                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="industry-service-link"
                  >

                    <span className="service-menu-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="service-menu-title">
                      {service.title}
                    </span>

                    <ChevronRight
                      size={15}
                      className="mega-arrow"
                    />

                  </Link>

                ))}

              </div>

            </div>

          </div>


          {/* ================= INDUSTRIES ================= */}

          <div className="nav-dropdown">

            <Link
              to="/industries"
              className="nav-link nav-dropdown-link"
            >
              Industries

              <ChevronDown size={14} />
            </Link>


            <div className="mega-menu services-menu">

              <div className="mega-service-grid">

                {industries.map((industry, index) => (

                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="industry-service-link"
                  >

                    <span className="service-menu-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="service-menu-title">
                      {industry.title}
                    </span>

                    <ChevronRight
                      size={15}
                      className="mega-arrow"
                    />

                  </Link>

                ))}

              </div>

            </div>

          </div>


          {/* ================= OTHER LINKS ================= */}

          <Link to="/careers" className="nav-link">
            Careers
          </Link>

          <Link to="/contact" className="nav-link">
            Contact
          </Link>

        </nav>


        {/* ================= HEADER ACTION ================= */}

        <div className="header-actions">

          <Link
            to="/contact"
            className="header-quote"
          >
            Request Quote
          </Link>

        </div>


        {/* ================= MOBILE BUTTON ================= */}

        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


        {/* ================= MOBILE NAV ================= */}

        <nav className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>

          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMobileMenu}>
            About
          </Link>

          <Link to="/services" onClick={closeMobileMenu}>
            Services
          </Link>

          <div className="mobile-submenu">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                onClick={closeMobileMenu}
              >
                {service.title}
              </Link>
            ))}
          </div>

          <Link to="/industries" onClick={closeMobileMenu}>
            Industries
          </Link>

          <div className="mobile-submenu">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                onClick={closeMobileMenu}
              >
                {industry.title}
              </Link>
            ))}
          </div>

          <Link to="/careers" onClick={closeMobileMenu}>
            Careers
          </Link>

          <Link to="/contact" onClick={closeMobileMenu}>
            Contact
          </Link>

          <Link
            to="/contact"
            className="mobile-quote"
            onClick={closeMobileMenu}
          >
            Request Quote
          </Link>

        </nav>

      </div>

    </header>
  );
}

export default Header;