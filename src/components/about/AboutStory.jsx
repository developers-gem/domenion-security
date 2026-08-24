import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./AboutStory.css";

export default function AboutStory() {
  return (
    <section className="section ds-about-story-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Visual Security Image */}
          <div className="col-lg-6">
            <Reveal direction="left">
              <div className="ds-story-visual-wrap">
                <img
                  src="/images/about-security.jpg"
                  alt="Dominion Security Professional Guard Operations"
                  className="ds-story-main-img"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />

                <div className="ds-story-card-overlay">
                  <span className="ds-story-badge-num">01</span>
                  <div className="ds-story-badge-text">
                    <strong>SECURITY WITHOUT COMPROMISE</strong>
                    <span>Built Around What Matters</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="col-lg-6">
            <div className="ds-story-content">
              <Reveal direction="up" delay={0.1}>
                <span className="section-label">WHO WE ARE</span>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 className="section-title">
                  Experience, discipline
                  <br />
                  <span>& operational preparedness.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="ds-story-lead">
                  Dominion Security delivers professional security solutions built
                  around the real-world requirements of the commercial enterprises,
                  facilities, and communities we protect.
                </p>
                <p className="mt-3 text-secondary-custom">
                  From professional armed and unarmed security guards to specialized
                  data center protection, cybersecurity oversight, and mobile patrols,
                  our approach combines experienced security personnel, disciplined post
                  orders, and modern surveillance technology.
                </p>
              </Reveal>

              {/* Credibility Checklist */}
              <div className="ds-story-checklist mt-4">
                <Reveal direction="up" delay={0.4}>
                  <div className="ds-check-item">
                    <CheckCircle2 size={18} className="ds-check-icon" />
                    <span>Professional, state-licensed security officers</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.5}>
                  <div className="ds-check-item">
                    <CheckCircle2 size={18} className="ds-check-icon" />
                    <span>Integrated physical guarding, access control & monitoring</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.6}>
                  <div className="ds-check-item">
                    <CheckCircle2 size={18} className="ds-check-icon" />
                    <span>24/7 rapid emergency dispatch & operational readiness</span>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="up" delay={0.7}>
                <div className="mt-4 pt-2">
                  <Button to="/contact" variant="primary" icon={ArrowRight}>
                    Talk To Our Security Team
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
