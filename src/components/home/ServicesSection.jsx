import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";
import "./ServicesSection.css";

// REPLACEMENT OFFICER IMAGE ASSET: Component prepared for new corporate security officer image asset
const CORPORATE_OFFICER_IMAGE_PATH = "/images/physical-security.jpg";

export default function ServicesSection() {
  const featuredPhysical = services.find((s) => s.slug === "physical-security") || services[0];
  const gridServices = services
    .filter((s) => s.slug !== "physical-security")
    .slice(0, 4);

  return (
    <section className="section ds-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">OUR SERVICES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Complete security
                <br />
                <span>solutions for every environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                From armed and unarmed security guards to critical data center defense
                and cybersecurity, Domenion delivers specialized solutions tailored to
                your exact operational risks.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Services Showcase Grid: 1 Large Featured Card + 4 Grid Cards */}
        <div className="row g-4">
          {/* Main Featured Service (Physical Security) */}
          <div className="col-lg-6">
            <Reveal direction="left">
              <Link
                to={`/services/${featuredPhysical.slug}`}
                className="ds-featured-service-card-premium"
              >
                <div
                  className="ds-featured-bg-img"
                  style={{
                    backgroundImage: `url(${CORPORATE_OFFICER_IMAGE_PATH})`,
                  }}
                />
                <div className="ds-featured-overlay-navy" />

                <div className="ds-featured-content-inner">
                  <div className="ds-featured-badge-gold">
                    <ShieldCheck size={14} />
                    <span>FEATURED CAPABILITY</span>
                  </div>

                  <span className="ds-featured-num-gold">01</span>

                  <h3 className="ds-featured-title-text">
                    {featuredPhysical.title}
                  </h3>

                  <p className="ds-featured-desc-text">
                    {featuredPhysical.shortDescription ||
                      "Professional armed & unarmed security officers protecting people, commercial property, and critical infrastructure."}
                  </p>

                  <div className="ds-featured-link-gold">
                    <span>Explore Physical Security</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* 4 Secondary Service Cards */}
          <div className="col-lg-6">
            <div className="row g-4">
              {gridServices.map((service, index) => (
                <div key={service.slug} className="col-sm-6">
                  <Reveal direction="up" delay={0.1 * index}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="ds-service-subcard-premium"
                    >
                      <div className="ds-subcard-header-bar">
                        <span className="ds-subcard-num-gold">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <ArrowRight size={16} className="ds-subcard-arrow-icon" />
                      </div>

                      <h4 className="ds-subcard-title-text">{service.title}</h4>

                      <p className="ds-subcard-desc-text">
                        {service.shortDescription || "Enterprise protection capability"}
                      </p>

                      <div className="ds-subcard-explore-link">
                        <span>Explore Capability</span>
                      </div>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>

            {/* Bottom Link Bar */}
            <div className="mt-4 pt-2">
              <Reveal direction="up" delay={0.4}>
                <div className="ds-services-all-cta-box">
                  <span>Looking for complete protection solutions?</span>
                  <Button to="/services" variant="gold-outline" icon={ArrowRight}>
                    View All Services
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
