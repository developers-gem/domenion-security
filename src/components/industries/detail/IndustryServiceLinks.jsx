import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../../common/Reveal";
import { services } from "../../../data/services";
import "./IndustryServiceLinks.css";

export default function IndustryServiceLinks({ industry }) {
  // Select 4 services to connect to this industry
  const recommendedServices = services.slice(0, 4);

  return (
    <section className="section ds-ind-svc-links-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">RELEVANT DOMINION SERVICES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Recommended protection capabilities
                <br />
                <span>for {industry.badge || "this sector"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0 text-lg-end">
            <Reveal direction="up" delay={0.2}>
              <Link to="/services" className="ds-svc-links-view-all">
                <span>Explore All Services</span>
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Large Horizontal Service Rows Layout */}
        <div className="ds-svc-rows-wrap">
          {recommendedServices.map((svc, idx) => (
            <Reveal key={svc.slug} direction="up" delay={0.06 * idx}>
              <Link to={`/services/${svc.slug}`} className="ds-svc-horizontal-row">
                <span className="ds-svc-row-num">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="ds-svc-row-info">
                  <h3>{svc.title}</h3>
                  <p>{svc.shortDescription || "Enterprise protection capability."}</p>
                </div>

                <div className="ds-svc-row-btn">
                  <span>Explore Capability</span>
                  <ArrowRight size={16} className="ds-svc-row-arrow" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
