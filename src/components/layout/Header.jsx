import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

import { services } from "../../data/services";
import { industries } from "../../data/industries";
import MobileNavDrawer from "./MobileNavDrawer";
import { dropdownMenu } from "../common/motionVariants";

/**
 * Enterprise Header Component for Domenion Security.
 * Styled purely with Tailwind CSS (Light Enterprise Theme).
 */
export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'industries' | 'coverage' | null
  const closeTimerRef = useRef(null);

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
        className="sticky top-0 z-40 bg-[#07111ff5]  shadow-sm transition-all duration-300 relative"
        role="banner"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex items-center justify-between">
          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center gap-3 text-decoration-none group" aria-label="Domenion Security Home">
            <img
              src="/500 security logo.png"
              alt="Domenion Security Shield Logo"
              className="h-10 sm:h-12 lg:h-[58px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.target.src = "/domenion-logo.png";
              }}
            />
            <div className="flex flex-col justify-center leading-none">
              <strong className="text-white font-heading text-base sm:text-lg lg:text-xl font-extrabold tracking-wider">DOMENION</strong>
              <small className="text-domenion-gold font-heading text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-[0.22em] mt-0.5">SECURITY</small>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-7 ml-auto mr-6 xl:mr-8" aria-label="Main Navigation">
            {/* HOME */}
            <Link
              to="/"
              className={`relative h-12 flex items-center justify-center font-heading text-[16px] font-bold transition-colors duration-200 ${
                isCurrentRoute("/") ? "text-white" : "text-white hover:text-domenion-gold"
              }`}
            >
              <span>Home</span>
              {isCurrentRoute("/") && (
                <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
              )}
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              className={`relative h-12 flex items-center justify-center font-heading text-[16px] font-bold transition-colors duration-200 ${
                isCurrentRoute("/about") ? "text-white" : "text-white hover:text-domenion-gold"
              }`}
            >
              <span>About</span>
              {isCurrentRoute("/about") && (
                <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
              )}
            </Link>

            {/* SERVICES MEGA DROPDOWN */}
            <div
              className="static"
              onMouseEnter={() => handleOpenDropdown("services")}
              onMouseLeave={handleCloseDropdown}
            >
              <Link
                to="/services"
                className={`relative h-12 flex items-center justify-center gap-1.5 font-heading text-[16px] font-bold transition-colors duration-200 ${
                  isCurrentRoute("/services") || activeDropdown === "services"
                    ? "text-white"
                    : "text-white hover:text-domenion-gold"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180 text-white" : "text-white"
                  }`}
                />
                {(isCurrentRoute("/services") || activeDropdown === "services") && (
                  <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <div
                    className="absolute top-full left-0 right-0 flex justify-center pointer-events-none z-50 px-4 pt-1"
                    onMouseEnter={() => handleOpenDropdown("services")}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <motion.div
                      className="pointer-events-auto w-full max-w-[920px] max-h-[calc(100vh-120px)] overflow-y-auto bg-white border border-domenion-gold/30 rounded-xl shadow-2xl p-6 text-domenion-blue"
                      variants={dropdownMenu}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-border">
                        <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR SECURITY CAPABILITIES</span>
                        <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-domenion-blue hover:text-domenion-gold transition-colors" onClick={() => setActiveDropdown(null)}>
                          View All Services <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                        {services.map((service, index) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className={`flex items-center gap-3.5 p-3.5 rounded-lg border border-neutral-border/60 hover:border-domenion-gold/50 hover:bg-neutral-light transition-all duration-200 group min-h-[58px] ${
                              service.parentSlug ? "ml-4 border-l-2 border-l-domenion-gold bg-domenion-gold/5" : ""
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="w-7 h-7 rounded-full bg-domenion-gold/15 text-domenion-gold font-heading text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-domenion-blue font-heading text-[16px] font-semibold truncate group-hover:text-domenion-gold">
                              {service.title}
                            </span>
                            <ChevronRight size={15} className="text-domenion-blue/30 opacity-0 group-hover:opacity-100 group-hover:text-domenion-gold transition-all flex-shrink-0" />
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
              className="static"
              onMouseEnter={() => handleOpenDropdown("industries")}
              onMouseLeave={handleCloseDropdown}
            >
              <Link
                to="/industries"
                className={`relative h-12 flex items-center justify-center gap-1.5 font-heading text-[16px] font-bold transition-colors duration-200 ${
                  isCurrentRoute("/industries") || activeDropdown === "industries"
                    ? "text-white"
                    : "text-white hover:text-domenion-gold"
                }`}
              >
                <span>Industries</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "industries" ? "rotate-180 text-white" : "text-white"
                  }`}
                />
                {(isCurrentRoute("/industries") || activeDropdown === "industries") && (
                  <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <div
                    className="absolute top-full left-0 right-0 flex justify-center pointer-events-none z-50 px-4 pt-1"
                    onMouseEnter={() => handleOpenDropdown("industries")}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <motion.div
                      className="pointer-events-auto w-full max-w-[920px] max-h-[calc(100vh-120px)] overflow-y-auto bg-white border border-domenion-gold/30 rounded-xl shadow-2xl p-6 text-domenion-blue"
                      variants={dropdownMenu}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-border">
                        <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">SECTORS WE PROTECT</span>
                        <Link to="/industries" className="inline-flex items-center gap-1.5 text-xs font-bold text-domenion-blue hover:text-domenion-gold transition-colors" onClick={() => setActiveDropdown(null)}>
                          View All Industries <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                        {industries.map((industry, index) => (
                          <Link
                            key={industry.slug}
                            to={`/industries/${industry.slug}`}
                            className="flex items-center gap-3.5 p-3.5 rounded-lg border border-neutral-border/60 hover:border-domenion-gold/50 hover:bg-neutral-light transition-all duration-200 group min-h-[58px]"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="w-7 h-7 rounded-full bg-domenion-gold/15 text-domenion-gold font-heading text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-domenion-blue font-heading text-[16px] font-semibold truncate group-hover:text-domenion-gold">
                              {industry.title}
                            </span>
                            <ChevronRight size={15} className="text-domenion-blue/30 opacity-0 group-hover:opacity-100 group-hover:text-domenion-gold transition-all flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* 50-STATE COVERAGE DROPDOWN */}
            {/* <div
              className="static"
              onMouseEnter={() => handleOpenDropdown("coverage")}
              onMouseLeave={handleCloseDropdown}
            >
              <Link
                to="/service-areas"
                className={`relative h-12 flex items-center justify-center gap-1.5 font-heading text-[16px] font-bold transition-colors duration-200 ${
                  isCurrentRoute("/service-areas") || activeDropdown === "coverage"
                    ? "text-domenion-gold"
                    : "text-white hover:text-domenion-gold"
                }`}
              >
                <span>Coverage</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "coverage" ? "rotate-180 text-domenion-gold" : "text-domenion-blue/60"
                  }`}
                />
                {(isCurrentRoute("/service-areas") || activeDropdown === "coverage") && (
                  <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === "coverage" && (
                  <div
                    className="absolute top-full left-0 right-0 flex justify-center pointer-events-none z-50 px-4 pt-1"
                    onMouseEnter={() => handleOpenDropdown("coverage")}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <motion.div
                      className="pointer-events-auto w-full max-w-[560px] max-h-[calc(100vh-120px)] overflow-y-auto bg-white border border-domenion-gold/30 rounded-xl shadow-2xl p-6 text-domenion-blue"
                      variants={dropdownMenu}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-border">
                        <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">NATIONWIDE COVERAGE</span>
                        <Link to="/service-areas" className="inline-flex items-center gap-1.5 text-xs font-bold text-domenion-blue hover:text-domenion-gold transition-colors" onClick={() => setActiveDropdown(null)}>
                          Explore All 50 States <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold tracking-wider">
                          <ShieldCheck size={18} />
                          <span>50-STATE COVERAGE</span>
                        </div>
                        <h4 className="text-domenion-blue font-heading text-base font-bold leading-snug">
                          Licensed, bonded, and providing professional security coverage across all 50 states.
                        </h4>
                        <p className="text-gray-600 text-[16px] leading-relaxed">
                          Domenion Security operates nationwide, offering rapid guard deployment, mobile patrols, and critical infrastructure protection.
                        </p>
                        <Link to="/service-areas" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-domenion-blue text-white font-heading text-xs font-bold hover:bg-domenion-blue/90 transition-colors w-fit mt-1" onClick={() => setActiveDropdown(null)}>
                          <MapPin size={15} className="text-domenion-gold" />
                          <span>View State Coverage & Locations</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div> */}

            {/* CAREERS */}
            <Link
              to="/careers"
              className={`relative h-12 flex items-center justify-center font-heading text-[16px] font-bold transition-colors duration-200 ${
                isCurrentRoute("/careers") ? "text-white" : "text-white hover:text-domenion-gold"
              }`}
            >
              <span>Careers</span>
              {isCurrentRoute("/careers") && (
                <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
              )}
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              className={`relative h-12 flex items-center justify-center font-heading text-[16px] font-bold transition-colors duration-200 ${
                isCurrentRoute("/contact") ? "text-white" : "text-white hover:text-domenion-gold"
              }`}
            >
              <span>Contact</span>
              {isCurrentRoute("/contact") && (
                <span className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-domenion-gold rounded-full" />
              )}
            </Link>
          </nav>

          {/* ================= HEADER ACTION CTA ================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-11 lg:h-12 px-4 sm:px-6 rounded-lg bg-domenion-gold text-white font-heading text-xs lg:text-[16px] font-extrabold tracking-wider uppercase hover:bg-domenion-gold-hover transition-colors shadow-sm no-underline text-decoration-none"
            >
              Request Quote
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              className="lg:hidden w-11 h-11 rounded-lg bg-neutral-light border border-neutral-border text-domenion-blue hover:text-domenion-gold hover:border-domenion-gold transition-colors flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={22} />
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

