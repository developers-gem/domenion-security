import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./FinalCTA.css";

// REPLACEMENT OFFICER IMAGE ASSET: Component prepared for new corporate security officer image asset
const CORPORATE_OFFICER_IMAGE_PATH = "/images/company-security.jpg";

export default function FinalCTA() {
  return (
    <section className="ds-final-cta-section">
      <div className="container">
        <div className="ds-final-cta-card">
          <div className="row align-items-center g-4 lg:g-5">
            {/* Left Column: Premium Gold Conversion Messaging */}
            <div className="col-lg-7">
              <div className="ds-cta-content">
                <Reveal direction="fade">
                  <div className="ds-cta-eyebrow">
                    <ShieldCheck size={16} />
                    <span>SECURITY CONSULTATION</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="ds-cta-title">
                    Ready to strengthen
                    <br />
                    your security?
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-cta-desc">
                    Tell us what matters most. We'll build a customized security solution around it.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-cta-actions">
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

            {/* Right Column: Dark Security Visual Panel */}
            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-cta-visual-panel">
                  <img
                    src={CORPORATE_OFFICER_IMAGE_PATH}
                    alt="Domenion Security Operations"
                    className="ds-cta-visual-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-cta-visual-overlay" />
                  <div className="ds-cta-visual-badge">
                    <span>24/7 PROTECTION</span>
                    <strong>Dominion Security</strong>
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
