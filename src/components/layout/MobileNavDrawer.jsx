import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, X, Phone, ShieldCheck } from "lucide-react";

import { services } from "../../data/services";
import { industries } from "../../data/industries";
import Button from "../common/Button";
import "./MobileNavDrawer.css";

/**
 * Mobile Navigation Drawer component.
 * Features slide-over animation, dark navy backdrop blur, body scroll lock,
 * and expandable submenus for Services and Industries.
 */
export default function MobileNavDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null); // 'services' | 'industries' | null

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const isCurrentRoute = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ds-mobile-drawer-root">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="ds-mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            className="ds-mobile-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Header */}
            <div className="ds-mobile-drawer-header">
              <Link to="/" className="ds-mobile-logo" onClick={onClose}>
                <div className="ds-mobile-logo-badge">
                  <ShieldCheck size={18} />
                </div>
                <div className="ds-mobile-logo-text">
                  <strong>DOMENION</strong>
                  <span>SECURITY</span>
                </div>
              </Link>

              <button
                type="button"
                className="ds-mobile-drawer-close"
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Body */}
            <nav className="ds-mobile-drawer-body">
              {/* Home */}
              <Link
                to="/"
                className={`ds-mobile-nav-link ${
                  isCurrentRoute("/") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <span>Home</span>
              </Link>

              {/* About */}
              <Link
                to="/about"
                className={`ds-mobile-nav-link ${
                  isCurrentRoute("/about") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <span>About Us</span>
              </Link>

              {/* Services Collapsible Accordion */}
              <div className="ds-mobile-accordion-item">
                <button
                  type="button"
                  className={`ds-mobile-accordion-btn ${
                    isCurrentRoute("/services") ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenu("services")}
                  aria-expanded={openSubmenu === "services"}
                >
                  <div className="ds-mobile-accordion-title">
                    <Link
                      to="/services"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                    >
                      Services
                    </Link>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`ds-mobile-chevron ${
                      openSubmenu === "services" ? "open" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSubmenu === "services" && (
                    <motion.div
                      className="ds-mobile-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {services.map((service, index) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className={`ds-mobile-sublink ${
                            location.pathname === `/services/${service.slug}`
                              ? "active"
                              : ""
                          }`}
                          onClick={onClose}
                        >
                          <span className="ds-mobile-subnum">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="ds-mobile-subtext">
                            {service.title}
                          </span>
                          <ChevronRight size={14} className="ds-mobile-arrow" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Collapsible Accordion */}
              <div className="ds-mobile-accordion-item">
                <button
                  type="button"
                  className={`ds-mobile-accordion-btn ${
                    isCurrentRoute("/industries") ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenu("industries")}
                  aria-expanded={openSubmenu === "industries"}
                >
                  <div className="ds-mobile-accordion-title">
                    <Link
                      to="/industries"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                    >
                      Industries
                    </Link>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`ds-mobile-chevron ${
                      openSubmenu === "industries" ? "open" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSubmenu === "industries" && (
                    <motion.div
                      className="ds-mobile-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {industries.map((industry, index) => (
                        <Link
                          key={industry.slug}
                          to={`/industries/${industry.slug}`}
                          className={`ds-mobile-sublink ${
                            location.pathname ===
                            `/industries/${industry.slug}`
                              ? "active"
                              : ""
                          }`}
                          onClick={onClose}
                        >
                          <span className="ds-mobile-subnum">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="ds-mobile-subtext">
                            {industry.title}
                          </span>
                          <ChevronRight size={14} className="ds-mobile-arrow" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Careers */}
              <Link
                to="/careers"
                className={`ds-mobile-nav-link ${
                  isCurrentRoute("/careers") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <span>Careers</span>
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`ds-mobile-nav-link ${
                  isCurrentRoute("/contact") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <span>Contact</span>
              </Link>
            </nav>

            {/* Footer / CTA Actions */}
            <div className="ds-mobile-drawer-footer">
              <Button
                to="/contact"
                variant="primary"
                fullWidth
                onClick={onClose}
              >
                Request Security Quote
              </Button>

              <a href="tel:+16024384445" className="ds-mobile-phone-link">
                <Phone size={15} />
                <span>Call Us: (602) 438-4445</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
