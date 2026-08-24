import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, LockKeyhole, Radio, Cpu, Siren } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";
import "./ServicesSection.css";

export default function ServicesSection() {
  // Extract top 5 services for homepage feature layout
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
                className="ds-featured-service-card"
              >
                <div
                  className="ds-featured-bg"
                  style={{
                    backgroundImage: `url(/images/guard-1.jpg)`,
                  }}
                />
                <div className="ds-featured-overlay" />

                <div className="ds-featured-content">
                  <div className="ds-featured-badge">
                    <span>FEATURED CAPABILITY</span>
                  </div>

                  <span className="ds-featured-num">01</span>

                  <h3 className="ds-featured-title">
                    {featuredPhysical.title}
                  </h3>

                  <p className="ds-featured-desc">
                    {featuredPhysical.shortDescription ||
                      "Professional armed & unarmed security officers protecting people, commercial property, and critical infrastructure."}
                  </p>

                  <div className="ds-featured-link">
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
                      className="ds-service-subcard"
                    >
                      <div className="ds-subcard-header">
                        <span className="ds-subcard-num">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <ArrowRight size={16} className="ds-subcard-arrow" />
                      </div>

                      <h4 className="ds-subcard-title">{service.title}</h4>

                      <p className="ds-subcard-desc">
                        {service.shortDescription || "Enterprise protection capability"}
                      </p>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>

            {/* Bottom Link Bar */}
            <div className="mt-4 pt-2">
              <Reveal direction="up" delay={0.4}>
                <div className="ds-services-all-cta">
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
