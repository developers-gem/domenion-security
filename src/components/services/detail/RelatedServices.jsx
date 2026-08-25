import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { services } from "../../../data/services";
import "./RelatedServices.css";

export default function RelatedServices({ currentSlug }) {
  // Find 3 other related services excluding currentSlug
  const otherServices = services.filter((s) => s.slug !== currentSlug);
  const relatedList = otherServices.slice(0, 3);

  return (
    <section className="section ds-related-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">RELATED CAPABILITIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Explore complementary
                <br />
                <span>security services.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0 text-lg-end">
            <Reveal direction="up" delay={0.2}>
              <Link to="/services" className="ds-related-view-all-link">
                <span>View Full Service Portfolio</span>
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* 3 Related Service Cards */}
        <div className="row g-4">
          {relatedList.map((service, idx) => (
            <div key={service.slug} className="col-md-4">
              <Reveal direction="up" delay={0.1 * idx}>
                <div className="ds-related-card">
                  <Link to={`/services/${service.slug}`} className="ds-related-img-wrap">
                    <img
                      src={service.heroImage || service.overviewImage || "/images/physical-security.jpg"}
                      alt={service.title}
                      className="ds-related-img"
                      onError={(e) => {
                        e.target.src = "/images/company-security.jpg";
                      }}
                    />
                    <div className="ds-related-overlay" />
                    <span className="ds-related-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </Link>

                  <div className="ds-related-body">
                    <span className="ds-related-badge">{service.badge || "SECURITY"}</span>
                    <h3 className="ds-related-title">
                      <Link to={`/services/${service.slug}`} className="ds-related-title-link">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="ds-related-desc">
                      {service.shortDescription || "Enterprise security capability."}
                    </p>

                    <Link to={`/services/${service.slug}`} className="ds-related-link">
                      <span>Explore Capability</span>
                      <ArrowRight size={14} className="ds-related-arrow" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
