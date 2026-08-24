import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./ServicesCTA.css";

export default function ServicesCTA() {
  return (
    <section className="ds-services-cta-section">
      <div className="container">
        <div className="ds-services-cta-card">
          <div className="row align-items-center g-4 lg:g-5">
            {/* Left Column: Premium Gold Consultation Copy */}
            <div className="col-lg-7">
              <div className="ds-serv-cta-content">
                <Reveal direction="fade">
                  <div className="ds-serv-cta-eyebrow">
                    <ShieldCheck size={16} />
                    <span>SECURITY CONSULTATION</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="ds-serv-cta-title">
                    Not sure which security
                    <br />
                    solution you need?
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-serv-cta-desc">
                    Tell us about your environment and requirements. Our security specialists
                    will help identify the right protection strategy for your facility.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-serv-cta-actions">
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

            {/* Right Column: Visual Security Image Panel */}
            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-serv-cta-visual-panel">
                  <img
                    src="/images/services/cyber-security/hero.jpg"
                    alt="Dominion Security Operations Team"
                    className="ds-serv-cta-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-serv-cta-overlay" />
                  <div className="ds-serv-cta-badge">
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
