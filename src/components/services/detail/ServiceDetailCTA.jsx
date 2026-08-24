import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../../common/Button";
import Reveal from "../../common/Reveal";
import "./ServiceDetailCTA.css";

export default function ServiceDetailCTA({ service }) {
  const ctaHeadline = service.badge
    ? `Ready to strengthen your ${service.badge.toLowerCase()}?`
    : `Ready to strengthen your security posture?`;

  return (
    <section className="ds-detail-cta-section">
      <div className="container">
        <div className="ds-detail-cta-card">
          <div className="row align-items-center g-4 lg:g-5">
            {/* Left Column: Copy */}
            <div className="col-lg-7">
              <div className="ds-detail-cta-content">
                <Reveal direction="fade">
                  <div className="ds-detail-cta-eyebrow">
                    <ShieldCheck size={16} />
                    <span>SECURITY CONSULTATION</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="ds-detail-cta-title">
                    {ctaHeadline}
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-detail-cta-desc">
                    Tell us about your environment, operational risks, and facility requirements. Our security specialists will help design the right protection plan.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-detail-cta-actions">
                    <Button
                      to="/contact"
                      variant="dark"
                      size="lg"
                      icon={ArrowRight}
                    >
                      Request a Security Quote
                    </Button>

                    <Button
                      href="tel:+16024384445"
                      variant="gold-outline"
                      size="lg"
                      icon={Phone}
                      iconPosition="left"
                    >
                      Call Dominion
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column: Visual Image Panel */}
            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-detail-cta-visual-panel">
                  <img
                    src={service.heroImage || service.overviewImage || "/images/company-security.jpg"}
                    alt={service.title}
                    className="ds-detail-cta-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-detail-cta-overlay" />
                  <div className="ds-detail-cta-badge">
                    <span>24/7 CONSULTATION</span>
                    <strong>(602) 438-4445</strong>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
