import { ShieldCheck, ArrowRight, Phone } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./ContactHero.css";

export default function ContactHero() {
  const handleScrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ds-contact-hero-section">
      <div
        className="ds-contact-hero-bg"
        style={{ backgroundImage: `url(/images/contact/bg.jpg)` }}
      />
      <div className="ds-contact-hero-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center g-4 lg:g-5">
          {/* Left Column: Headlines */}
          <div className="col-lg-7">
            <div className="ds-contact-hero-left">
              <Reveal direction="fade">
                <div className="ds-contact-hero-eyebrow">
                  <ShieldCheck size={15} />
                  <span>CONTACT DOMINION SECURITY</span>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.1}>
                <h1 className="ds-contact-hero-title">
                  Let's talk about
                  <br />
                  <span className="ds-gold-text">your security.</span>
                </h1>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p className="ds-contact-hero-description">
                  Tell us what you need protected, where you operate, and what matters most. Our team can help you explore the right security approach.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <div className="ds-contact-hero-actions mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleScrollToForm}
                    icon={ArrowRight}
                  >
                    Request a Security Quote
                  </Button>
                  <Button
                    href="tel:+16024384445"
                    variant="outline-light"
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

          {/* Right Column: Architectural Security Visual Panel */}
          <div className="col-lg-5">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-contact-hero-visual-panel">
                <div className="ds-contact-gold-accent-line" />

                <div className="ds-contact-img-frame">
                  <img
                    src="/images/guard-10.jpg"
                    alt="Dominion Security Headquarters Operations"
                    className="ds-contact-visual-img"
                    onError={(e) => {
                      e.target.src = "/images/guard-10.jpg";
                    }}
                  />
                  <div className="ds-contact-img-overlay" />
                </div>

                {/* Floating Information Block */}
                <div className="ds-contact-visual-card">
                  <div className="ds-contact-card-badge">
                    <span>24/7 CONSULTATION & DISPATCH</span>
                  </div>
                  <div className="ds-contact-card-info">
                    <strong>(602) 438-4445</strong>
                    <span>Direct line to operational dispatch</span>
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
