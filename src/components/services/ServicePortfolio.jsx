import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";
import "./ServicePortfolio.css";

export default function ServicePortfolio() {
  return (
    <section className="section ds-portfolio-section" id="all-services">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">COMPLETE SECURITY PORTFOLIO</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                One security partner.
                <br />
                <span>Comprehensive protection.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Explore Dominion Security's full portfolio of 14 core protection capabilities.
                Each service is tailored to your facility's operational risks and regulatory standards.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 2-Column Clean Editorial Grid */}
        <div className="row g-3">
          {services.map((service, index) => (
            <div key={service.slug} className="col-md-6">
              <Reveal direction="up" delay={0.03 * index}>
                <Link
                  to={`/services/${service.slug}`}
                  className="ds-portfolio-card-link"
                >
                  <span className="ds-portfolio-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="ds-portfolio-card-content">
                    <h3 className="ds-portfolio-title">{service.title}</h3>
                    <p className="ds-portfolio-shortdesc">
                      {service.shortDescription || "Enterprise protection capability"}
                    </p>
                  </div>

                  <div className="ds-portfolio-arrow-wrap">
                    <ArrowRight size={18} className="ds-portfolio-arrow" />
                  </div>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
