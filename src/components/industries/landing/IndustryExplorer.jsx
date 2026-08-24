import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../../common/Reveal";
import { industries } from "../../../data/industries";
import "./IndustryExplorer.css";

export default function IndustryExplorer() {
  const [activeSlug, setActiveSlug] = useState(industries[0]?.slug || "government");

  const activeIndustry = industries.find((i) => i.slug === activeSlug) || industries[0];

  return (
    <section className="section ds-ind-explorer-section" id="industry-explorer">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">INTERACTIVE SECTOR EXPLORER</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Explore protection tailored
                <br />
                <span>for your environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Hover on desktop or tap on mobile to inspect Dominion Security's specialized capabilities across sectors.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Explorer Split Panel Layout */}
        <div className="row g-4 lg:g-5 align-items-center">
          {/* Left Column: Vertical Industry Nav List */}
          <div className="col-lg-5">
            <div className="ds-explorer-nav-list">
              {industries.map((ind, index) => {
                const isActive = ind.slug === activeSlug;
                return (
                  <button
                    key={ind.slug}
                    type="button"
                    className={`ds-explorer-item ${isActive ? "active" : ""}`}
                    onMouseEnter={() => setActiveSlug(ind.slug)}
                    onClick={() => setActiveSlug(ind.slug)}
                  >
                    <span className="ds-explorer-item-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="ds-explorer-item-title">{ind.title}</span>

                    <ChevronRight size={16} className="ds-explorer-item-arrow" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Crossfading Visual Image Frame */}
          <div className="col-lg-7">
            <div className="ds-explorer-visual-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndustry.slug}
                  className="ds-explorer-frame"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={activeIndustry.heroImage || activeIndustry.overviewImage || "/images/company-security.jpg"}
                    alt={activeIndustry.title}
                    className="ds-explorer-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-explorer-overlay" />

                  {/* Active Industry Statement Overlay */}
                  <div className="ds-explorer-content-overlay">
                    <span className="ds-explorer-badge">
                      {activeIndustry.badge || "SECURITY SECTOR"}
                    </span>
                    <h3 className="ds-explorer-active-title">
                      {activeIndustry.title}
                    </h3>
                    <p className="ds-explorer-active-desc">
                      {activeIndustry.shortDescription ||
                        "Tailored security post orders and operational procedures for this specific environment."}
                    </p>

                    <Link
                      to={`/industries/${activeIndustry.slug}`}
                      className="ds-explorer-link-btn"
                    >
                      <span>Explore {activeIndustry.badge || "Sector"}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
