import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, X, Phone, ShieldCheck } from "lucide-react";

import { services } from "../../data/services";
import { industries } from "../../data/industries";
import Button from "../common/Button";

/**
 * Mobile Navigation Drawer component.
 * Styled purely with Tailwind CSS (Light Enterprise Theme).
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
        <div className="relative z-50">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="fixed inset-0 bg-domenion-blue/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col text-domenion-blue border-l border-neutral-border"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-border">
              <Link to="/" className="flex items-center gap-3 text-decoration-none" onClick={onClose}>
                <div className="w-9 h-9 rounded-full bg-domenion-blue/10 border border-domenion-gold/40 grid place-items-center text-domenion-gold">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col leading-none">
                  <strong className="text-domenion-blue font-heading font-extrabold text-base tracking-wider">DOMENION</strong>
                  <span className="text-domenion-gold font-heading font-bold text-[9px] tracking-widest mt-0.5">SECURITY</span>
                </div>
              </Link>

              <button
                type="button"
                className="p-2 rounded-md bg-neutral-light border border-neutral-border text-domenion-blue hover:text-domenion-gold hover:border-domenion-gold transition-colors"
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Body */}
            <nav className="flex-1 py-4 px-5 flex flex-col gap-1 overflow-y-auto">
              {/* Home */}
              <Link
                to="/"
                className={`flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                  isCurrentRoute("/") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                }`}
                onClick={onClose}
              >
                <span>Home</span>
              </Link>

              {/* About */}
              <Link
                to="/about"
                className={`flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                  isCurrentRoute("/about") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                }`}
                onClick={onClose}
              >
                <span>About Us</span>
              </Link>

              {/* Services Collapsible Accordion */}
              <div>
                <button
                  type="button"
                  className={`w-full flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                    isCurrentRoute("/services") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                  }`}
                  onClick={() => toggleSubmenu("services")}
                  aria-expanded={openSubmenu === "services"}
                >
                  <Link
                    to="/services"
                    className="flex-1 text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                  >
                    Services
                  </Link>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      openSubmenu === "services" ? "rotate-180 text-domenion-gold" : "text-domenion-blue/50"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSubmenu === "services" && (
                    <motion.div
                      className="overflow-hidden flex flex-col gap-0.5 mt-1 ml-2 border-l-2 border-domenion-gold/30 pl-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {services.map((service, index) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className={`flex items-center gap-2.5 py-2 px-3 rounded font-heading text-sm transition-colors ${
                            location.pathname === `/services/${service.slug}`
                              ? "text-domenion-gold font-bold bg-neutral-light"
                              : "text-gray-700 hover:text-domenion-gold hover:bg-neutral-light"
                          }`}
                          onClick={onClose}
                        >
                          <span className="text-[10px] font-bold text-domenion-gold bg-domenion-gold/10 px-1.5 py-0.5 rounded">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 truncate">{service.title}</span>
                          <ChevronRight size={14} className="text-gray-400" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Collapsible Accordion */}
              <div>
                <button
                  type="button"
                  className={`w-full flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                    isCurrentRoute("/industries") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                  }`}
                  onClick={() => toggleSubmenu("industries")}
                  aria-expanded={openSubmenu === "industries"}
                >
                  <Link
                    to="/industries"
                    className="flex-1 text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                  >
                    Industries
                  </Link>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      openSubmenu === "industries" ? "rotate-180 text-domenion-gold" : "text-domenion-blue/50"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openSubmenu === "industries" && (
                    <motion.div
                      className="overflow-hidden flex flex-col gap-0.5 mt-1 ml-2 border-l-2 border-domenion-gold/30 pl-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {industries.map((industry, index) => (
                        <Link
                          key={industry.slug}
                          to={`/industries/${industry.slug}`}
                          className={`flex items-center gap-2.5 py-2 px-3 rounded font-heading text-sm transition-colors ${
                            location.pathname === `/industries/${industry.slug}`
                              ? "text-domenion-gold font-bold bg-neutral-light"
                              : "text-gray-700 hover:text-domenion-gold hover:bg-neutral-light"
                          }`}
                          onClick={onClose}
                        >
                          <span className="text-[10px] font-bold text-domenion-gold bg-domenion-gold/10 px-1.5 py-0.5 rounded">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 truncate">{industry.title}</span>
                          <ChevronRight size={14} className="text-gray-400" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Coverage / Service Areas */}
              <Link
                to="/service-areas"
                className={`flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                  isCurrentRoute("/service-areas") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                }`}
                onClick={onClose}
              >
                <span>50-State Coverage</span>
              </Link>

              {/* Careers */}
              <Link
                to="/careers"
                className={`flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                  isCurrentRoute("/careers") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                }`}
                onClick={onClose}
              >
                <span>Careers</span>
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`flex items-center justify-between py-3 px-3 rounded-md font-heading font-bold text-base transition-colors ${
                  isCurrentRoute("/contact") ? "text-domenion-gold bg-neutral-light" : "text-domenion-blue hover:text-domenion-gold hover:bg-neutral-light"
                }`}
                onClick={onClose}
              >
                <span>Contact</span>
              </Link>
            </nav>

            {/* Footer / CTA Actions */}
            <div className="p-5 border-t border-neutral-border flex flex-col gap-3 bg-neutral-light">
              <Button
                to="/contact"
                variant="primary"
                fullWidth
                onClick={onClose}
              >
                Request Security Quote
              </Button>

              <a href="tel:+16024384445" className="flex items-center justify-center gap-2 py-2 text-domenion-blue font-heading font-bold text-sm hover:text-domenion-gold transition-colors">
                <Phone size={15} className="text-domenion-gold" />
                <span>Call Us: (602) 438-4445</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

