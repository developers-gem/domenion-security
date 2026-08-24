import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { industries } from "../../../data/industries";
import "./RelatedIndustries.css";

export default function RelatedIndustries({ currentSlug }) {
  const otherIndustries = industries.filter((i) => i.slug !== currentSlug);
  const relatedList = otherIndustries.slice(0, 3);

  return (
    <section className="section ds-rel-ind-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">OTHER PROTECTED SECTORS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Explore protection for
                <br />
                <span>other environments.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0 text-lg-end">
            <Reveal direction="up" delay={0.2}>
              <Link to="/industries" className="ds-rel-ind-view-all">
                <span>View All Industries</span>
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* 3 Related Industry Image Cards */}
        <div className="row g-4">
          {relatedList.map((item, idx) => (
            <div key={item.slug} className="col-md-4">
              <Reveal direction="up" delay={0.1 * idx}>
                <Link to={`/industries/${item.slug}`} className="ds-rel-ind-card">
                  <img
                    src={item.heroImage || item.overviewImage || "/images/company-security.jpg"}
                    alt={item.title}
                    className="ds-rel-ind-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-rel-ind-overlay" />

                  <div className="ds-rel-ind-body">
                    <span className="ds-rel-ind-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="ds-rel-ind-title">{item.title}</h3>
                    <p className="ds-rel-ind-desc">
                      {item.shortDescription || "Environmental security capability."}
                    </p>

                    <div className="ds-rel-ind-link">
                      <span>Explore Sector</span>
                      <ArrowRight size={14} className="ds-rel-ind-arrow" />
                    </div>
                  </div>

                  <div className="ds-rel-ind-gold-line" />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
