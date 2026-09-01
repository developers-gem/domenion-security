import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

import { services } from "../../data/services";
import { industries } from "../../data/industries";
import Button from "../common/Button";
import MobileNavDrawer from "./MobileNavDrawer";
import { dropdownMenu } from "../common/motionVariants";
import "./Header.css";

/**
 * Enterprise Header Component for Domenion Security.
 * Features sticky scroll state with glassmorphism, viewport-fixed centered mega-menus,
 * continuous hover timer, 50-state coverage dropdown, active route indicators, and mobile drawer integration.
 */
export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'industries' | 'coverage' | null
  const closeTimerRef = useRef(null);

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Stable Mega Menu Hover Handlers (150–250ms closing buffer)
  const handleOpenDropdown = (name) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleCloseDropdown = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Helper to check active route
  const isCurrentRoute = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`ds-site-header ${isScrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <div className="ds-header-inner">
          {/* ================= LOGO ================= */}
          <Link to="/" className="ds-site-logo" aria-label="Domenion Security Home">
            <div className="ds-logo-mark">
              <img
                src="/domenion-logo.png"
                alt="Domenion Security Shield Logo"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="ds-logo-fallback" style={{ display: "none" }}>
                DS
              </span>
            </div>
            <div className="ds-logo-text">
              <strong>DOMENION</strong>
              <small>SECURITY</small>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="ds-desktop-nav" aria-label="Main Navigation">
            <Link
              to="/"
              className={`ds-nav-link ${isCurrentRoute("/") ? "active" : ""}`}
            >
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`ds-nav-link ${
                isCurrentRoute("/about") ? "active" : ""
              }`}
            >
              <span>About</span>
            </Link>

            {/* SERVICES MEGA DROPDOWN */}
            <div
              className="ds-nav-dropdown-wrap"
              onMouseEnter={() => handleOpenDropdown("services")}
              onMouseLeave={handleCloseDropdown}
            >
              <Link
                to="/services"
                className={`ds-nav-link ds-dropdown-trigger ${
                  isCurrentRoute("/services") || activeDropdown === "services"
                    ? "active"
                    : ""
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`ds-dropdown-arrow ${
                    activeDropdown === "services" ? "open" : ""
                  }`}
                />
              </Link>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <div
                    className="ds-mega-portal"
                    onMouseEnter={() => handleOpenDropdown("services")}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <motion.div
                      className="ds-mega-menu ds-services-menu"
                      variants={dropdownMenu}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="ds-mega-header">
                        <span>OUR SECURITY CAPABILITIES</span>
                        <Link to="/services" className="ds-mega-view-all" onClick={() => setActiveDropdown(null)}>
                          View All Services <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="ds-mega-grid">
                        {services.map((service, index) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className={`ds-mega-card-link ${
                              service.parentSlug ? "ds-mega-subitem" : ""
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="ds-mega-number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="ds-mega-card-title">
                              {service.title}
                            </span>
                            <ChevronRight size={14} className="ds-mega-arrow" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* INDUSTRIES MEGA DROPDOWN */}
            <div
              className="ds-nav-dropdown-wrap"
              onMouseEnter={() => handleOpenDropdown("industries")}
              onMouseLeave={handleCloseDropdown}
            >
              <Link
                to="/industries"
                className={`ds-nav-link ds-dropdown-trigger ${
                  isCurrentRoute("/industries") || activeDropdown === "industries"
                    ? "active"
                    : ""
                }`}
              >
                <span>Industries</span>
                <ChevronDown
                  size={14}
                  className={`ds-dropdown-arrow ${
                    activeDropdown === "industries" ? "open" : ""
                  }`}
                />
              </Link>

              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <div
                    className="ds-mega-portal"
                    onMouseEnter={() => handleOpenDropdown("industries")}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <motion.div
                      className="ds-mega-menu ds-industries-menu"
                      variants={dropdownMenu}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="ds-mega-header">
                        <span>SECTORS WE PROTECT</span>
                        <Link to="/industries" className="ds-mega-view-all" onClick={() => setActiveDropdown(null)}>
                          View All Industries <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="ds-mega-grid">
                        {industries.map((industry, index) => (
                          <Link
                            key={industry.slug}
                            to={`/industries/${industry.slug}`}
                            className="ds-mega-card-link"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="ds-mega-number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="ds-mega-card-title">
                              {industry.title}
                            </span>
                            <ChevronRight size={14} className="ds-mega-arrow" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* 50-STATE COVERAGE DROPDOWN */}
            <div
              className="ds-nav-dropdown-wrap"
              onMouseEnter={() => handleOpenDropdown("coverage")}
              onMouseLeave={handleCloseDropdown}
            >
              <Link
                to="/service-areas"
                className={`ds-nav-link ds-dropdown-trigger ${
                  isCurrentRoute("/service-areas") || activeDropdown === "coverage"
                    ? "active"
                    : ""
                }`}
              >
                <span>Coverage</span>
                <ChevronDown
                  size={14}
                  className={`ds-dropdown-arrow ${
                    activeDropdown === "coverage" ? "open" : ""
                  }`}
                />
              </Link>

              <AnimatePresence>
                {activeDropdown === "coverage" && (
                  <div
                    className="ds-mega-portal"
                    onMouseEnter={() => handleOpenDropdown("coverage")}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <motion.div
                      className="ds-mega-menu ds-coverage-menu"
                      variants={dropdownMenu}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="ds-mega-header">
                        <span>NATIONWIDE COVERAGE</span>
                        <Link to="/service-areas" className="ds-mega-view-all" onClick={() => setActiveDropdown(null)}>
                          Explore All 50 States <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="ds-coverage-dropdown-card">
                        <div className="ds-cov-card-badge">
                          <ShieldCheck size={18} />
                          <span>50-STATE COVERAGE</span>
                        </div>
                        <h4 className="ds-cov-card-title">
                          Licensed, bonded, and providing professional security coverage across all 50 states.
                        </h4>
                        <p className="ds-cov-card-desc">
                          Domenion Security operates nationwide, offering rapid guard deployment, mobile patrols, and critical infrastructure protection.
                        </p>
                        <Link to="/service-areas" className="ds-cov-card-btn" onClick={() => setActiveDropdown(null)}>
                          <MapPin size={15} />
                          <span>View State Coverage & Locations</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/careers"
              className={`ds-nav-link ${
                isCurrentRoute("/careers") ? "active" : ""
              }`}
            >
              <span>Careers</span>
            </Link>

            <Link
              to="/contact"
              className={`ds-nav-link ${
                isCurrentRoute("/contact") ? "active" : ""
              }`}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* ================= HEADER ACTION CTA ================= */}
          <div className="ds-header-actions">
            <Button to="/contact" variant="primary" size="sm">
              Request Quote
            </Button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              className="ds-mobile-hamburger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE NAV DRAWER ================= */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
