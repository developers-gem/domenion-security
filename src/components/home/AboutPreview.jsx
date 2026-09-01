import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./AboutPreview.css";

// REPLACEMENT OFFICER IMAGE ASSET: Component prepared for new corporate security officer image asset
const CORPORATE_OFFICER_IMAGE_PATH = "/images/about-security.jpg";

export default function AboutPreview() {
  return (
    <section className="section ds-about-preview-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Visual Image with Floating Gold Badge */}
          <div className="col-lg-6">
            <Reveal direction="left">
              <div className="ds-about-visual-wrap">
                <img
                  src={CORPORATE_OFFICER_IMAGE_PATH}
                  alt="Domenion Security Corporate Operations"
                  className="ds-about-main-img"
                  onError={(e) => {
                    e.target.src = "/images/about-security.jpg";
                  }}
                />

                <div className="ds-about-visual-accent" />

                <div className="ds-about-badge-card">
                  <span className="ds-badge-num">01</span>
                  <div className="ds-badge-text">
                    <strong>SECURITY WITHOUT COMPROMISE</strong>
                    <span>Built Around What Matters</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Content & Credibility Points */}
          <div className="col-lg-6">
            <div className="ds-about-content">
              <Reveal direction="up" delay={0.1}>
                <span className="section-label">ABOUT DOMENION</span>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 className="section-title">
                  Protection built
                  <br />
                  <span>around what matters.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="company-intro-lead mt-3">
                  Dominion Security provides comprehensive physical, digital and
                  critical infrastructure security solutions designed to protect
                  people, property, facilities and information in an increasingly
                  complex world.
                </p>
              </Reveal>

              {/* 3 Credibility Points */}
              <div className="ds-about-points">
                <Reveal direction="up" delay={0.4}>
                  <div className="ds-about-point-item">
                    <div className="ds-point-num">01</div>
                    <div className="ds-point-info">
                      <h3>Experienced Protection</h3>
                      <p>
                        Professional security solutions built around real-world
                        operational requirements.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.5}>
                  <div className="ds-about-point-item">
                    <div className="ds-point-num">02</div>
                    <div className="ds-point-info">
                      <h3>Integrated Capabilities</h3>
                      <p>
                        Physical security, mobile patrol, and cybersecurity
                        working together seamlessly.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.6}>
                  <div className="ds-about-point-item">
                    <div className="ds-point-num">03</div>
                    <div className="ds-point-info">
                      <h3>Security-Minded Approach</h3>
                      <p>
                        Proactive strategies focused on prevention, preparedness, and
                        rapid response.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="up" delay={0.7}>
                <div className="mt-4 pt-2">
                  <Button to="/about" variant="primary" icon={ArrowRight}>
                    Learn More About Domenion
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
