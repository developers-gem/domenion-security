import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../../common/Button";
import Reveal from "../../common/Reveal";
import "./IndustriesCTA.css";

export default function IndustriesCTA() {
  return (
    <section className="ds-ind-cta-section">
      <div className="container">
        <div className="ds-ind-cta-card">
          <div className="row align-items-center g-4 lg:g-5">
            <div className="col-lg-7">
              <div className="ds-ind-cta-content">
                <Reveal direction="fade">
                  <div className="ds-ind-cta-eyebrow">
                    <ShieldCheck size={16} />
                    <span>ENVIRONMENTAL SECURITY CONSULTATION</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="ds-ind-cta-title">
                    Let's build security
                    <br />
                    around your environment.
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-ind-cta-desc">
                    Tell us about your facility, operational risks, and industry requirements. Our security specialists will help design a customized protection strategy.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-ind-cta-actions">
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

            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-ind-cta-visual-panel">
                  <img
                    src="/images/industries/government/hero.jpg"
                    alt="Dominion Security Operations"
                    className="ds-ind-cta-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-ind-cta-overlay" />
                  <div className="ds-ind-cta-badge">
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
