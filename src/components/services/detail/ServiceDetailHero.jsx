import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ShieldCheck, LockKeyhole } from "lucide-react";
import Button from "../../common/Button";
import Reveal from "../../common/Reveal";
import "./ServiceDetailHero.css";

export default function ServiceDetailHero({ service }) {
  const heroImg = service.heroImage || service.overviewImage || "/images/company-security.jpg";

  return (
    <section className="ds-detail-hero-section">
      <div
        className="ds-detail-hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="ds-detail-hero-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center g-4 lg:g-5">
          {/* Left Column: Headlines & Breadcrumb */}
          <div className="col-lg-7">
            <div className="ds-detail-hero-left">
              {/* Breadcrumb Nav */}
              <Reveal direction="fade">
                <div className="ds-detail-breadcrumb">
                  <Link to="/">Home</Link>
                  <ChevronRight size={13} />
                  <Link to="/services">Services</Link>
                  <ChevronRight size={13} />
                  <span>{service.badge || "Service Detail"}</span>
                </div>
              </Reveal>

              {/* Eyebrow */}
              <Reveal direction="right" delay={0.1}>
                <div className="ds-detail-hero-eyebrow">
                  <ShieldCheck size={15} />
                  <span>{service.badge || "DOMINION SECURITY"}</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.2}>
                <h1 className="ds-detail-hero-title">
                  {service.title}
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.3}>
                <p className="ds-detail-hero-description">
                  {service.shortDescription || service.description}
                </p>
              </Reveal>

              {/* Buttons */}
              <Reveal direction="right" delay={0.4}>
                <div className="ds-detail-hero-actions mt-4">
                  <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                    Request A Security Quote
                  </Button>
                  <Button to="/services" variant="outline-light" size="lg">
                    Explore All Services
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Service Visual Image Panel */}
          <div className="col-lg-5">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-detail-hero-visual-panel">
                <div className="ds-detail-gold-accent-line" />

                <div className="ds-detail-img-frame">
                  <img
                    src={heroImg}
                    alt={service.title}
                    className="ds-detail-visual-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-detail-img-overlay" />
                </div>

                {/* Floating Information Block */}
                <div className="ds-detail-visual-card">
                  <div className="ds-detail-card-badge">
                    <LockKeyhole size={14} />
                    <span>24/7 READINESS</span>
                  </div>
                  <div className="ds-detail-card-info">
                    <strong>{service.badge || "DOMINION PROTECTION"}</strong>
                    <span>Protected with purpose.</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
