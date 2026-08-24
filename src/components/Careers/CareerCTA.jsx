import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./CareerCTA.css";

export default function CareerCTA() {
  const handleScrollToJobs = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ds-career-cta-section">
      <div className="container">
        <div className="ds-career-cta-card">
          <div className="row align-items-center g-4 lg:g-5">
            {/* Left Column: Copy */}
            <div className="col-lg-7">
              <div className="ds-career-cta-content">
                <Reveal direction="fade">
                  <div className="ds-career-cta-eyebrow">
                    <ShieldCheck size={16} />
                    <span>JOIN DOMINION SECURITY</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="ds-career-cta-title">
                    Ready to take the
                    <br />
                    next step?
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-career-cta-desc">
                    Explore current opportunities and find a role where your skills, responsibility, and dedication can make a real difference.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-career-cta-actions">
                    <Button
                      variant="dark"
                      size="lg"
                      onClick={handleScrollToJobs}
                      icon={ArrowRight}
                    >
                      View Open Positions
                    </Button>

                    <Button
                      to="/contact"
                      variant="gold-outline"
                      size="lg"
                    >
                      Contact Dominion
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column: Visual Panel */}
            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-career-cta-visual-panel">
                  <img
                    src="/images/guard-8.jpg"
                    alt="Dominion Security Guard Officer"
                    className="ds-career-cta-img"
                    onError={(e) => {
                      e.target.src = "/images/about-security.jpg";
                    }}
                  />
                  <div className="ds-career-cta-overlay" />
                  <div className="ds-career-cta-badge">
                    <span>CAREERS INQUIRIES</span>
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
