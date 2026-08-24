import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { industries } from "../../../data/industries";
import "./IndustryGrid.css";

export default function IndustryGrid() {
  return (
    <section className="section ds-ind-grid-section" id="all-industries">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">ALL PROTECTED INDUSTRIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Browse security by
                <br />
                <span>facility & industry type.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Click any sector to review environment-specific threat vectors, security post orders, and recommended Dominion services.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 2-Column Desktop Grid with Background Images */}
        <div className="row g-4">
          {industries.map((ind, index) => (
            <div key={ind.slug} className="col-md-6 col-lg-4">
              <Reveal direction="up" delay={0.04 * index}>
                <Link to={`/industries/${ind.slug}`} className="ds-ind-card-link">
                  <img
                    src={ind.heroImage || ind.overviewImage || "/images/company-security.jpg"}
                    alt={ind.title}
                    className="ds-ind-card-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-ind-card-overlay" />

                  <div className="ds-ind-card-body">
                    <span className="ds-ind-card-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="ds-ind-card-title">{ind.title}</h3>

                    <p className="ds-ind-card-subtext">
                      {ind.shortDescription || "Specialized environmental protection"}
                    </p>

                    <div className="ds-ind-card-action">
                      <span>Explore Sector</span>
                      <ArrowRight size={15} className="ds-ind-card-arrow" />
                    </div>
                  </div>

                  <div className="ds-ind-card-gold-line" />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
