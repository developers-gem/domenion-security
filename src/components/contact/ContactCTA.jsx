import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./ContactCTA.css";

export default function ContactCTA() {
  const handleScrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ds-contact-cta-section">
      <div className="container">
        <div className="ds-contact-cta-card">
          <div className="row align-items-center g-4 lg:g-5">
            {/* Left Column: Copy */}
            <div className="col-lg-7">
              <div className="ds-contact-cta-content">
                <Reveal direction="fade">
                  <div className="ds-contact-cta-eyebrow">
                    <ShieldCheck size={16} />
                    <span>START A CONVERSATION</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="ds-contact-cta-title">
                    Let's build the right
                    <br />
                    security approach together.
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-contact-cta-desc">
                    Tell us what matters most and take the first step toward a more focused, dependable security strategy for your site.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-contact-cta-actions">
                    <Button
                      variant="dark"
                      size="lg"
                      onClick={handleScrollToForm}
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

            {/* Right Column: Visual Panel */}
            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-contact-cta-visual-panel">
                  <img
                    src="/images/company-security.jpg"
                    alt="Dominion Security Officer"
                    className="ds-contact-cta-img"
                    onError={(e) => {
                      e.target.src = "/images/about-security.jpg";
                    }}
                  />
                  <div className="ds-contact-cta-overlay" />
                  <div className="ds-contact-cta-badge">
                    <span>24/7 DISPATCH DESK</span>
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
