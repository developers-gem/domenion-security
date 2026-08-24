import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./ServicesIntro.css";

export default function ServicesIntro() {
  return (
    <section className="section ds-services-intro-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Intro Copy */}
          <div className="col-lg-6">
            <div className="ds-services-intro-content">
              <Reveal direction="up">
                <span className="section-label">OUR CAPABILITIES</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  Security designed
                  <br />
                  <span>for real-world risk.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-intro-lead mt-3">
                  Every environment presents distinct operational threats, access control
                  challenges, and regulatory compliance standards. Dominion Security
                  delivers customized defense solutions tailored to your organization.
                </p>
                <p className="mt-3 text-secondary-custom">
                  Combining trained security officers, advanced surveillance monitoring,
                  mobile patrols, and enterprise cybersecurity, our integrated approach
                  ensures total operational preparedness.
                </p>
              </Reveal>

              <div className="ds-intro-line-accent mt-4" />
            </div>
          </div>

          {/* Right Column: Architectural Visual Panel */}
          <div className="col-lg-6">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-services-intro-visual">
                <img
                  src="/images/about-security.jpg"
                  alt="Dominion Security Operations Officer"
                  className="ds-services-intro-img"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />

                <div className="ds-intro-visual-card">
                  <span className="ds-intro-num">01</span>
                  <div className="ds-intro-badge-info">
                    <strong>INTEGRATED PROTECTION</strong>
                    <span>Physical • Cyber • Infrastructure</span>
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
