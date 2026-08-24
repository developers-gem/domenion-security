import { ShieldCheck, ArrowDown, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./CareersHero.css";

export default function CareersHero() {
  const handleScrollToJobs = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToWhy = () => {
    const el = document.getElementById("why-dominion");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ds-careers-hero-section">
      <div
        className="ds-careers-hero-bg"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="ds-careers-hero-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center g-4 lg:g-5">
          {/* Left Column: Story & Headlines */}
          <div className="col-lg-7">
            <div className="ds-careers-hero-left">
              {/* Eyebrow */}
              <Reveal direction="fade">
                <div className="ds-careers-hero-eyebrow">
                  <ShieldCheck size={15} />
                  <span>CAREERS AT DOMINION SECURITY</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.1}>
                <h1 className="ds-careers-hero-title">
                  Build a career
                  <br />
                  <span className="ds-gold-text">with purpose.</span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.2}>
                <p className="ds-careers-hero-description">
                  Join a team committed to professional security, responsibility, and protecting the people, property, and environments that matter.
                </p>
              </Reveal>

              {/* Actions */}
              <Reveal direction="right" delay={0.3}>
                <div className="ds-careers-hero-actions mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleScrollToJobs}
                    icon={ArrowDown}
                  >
                    View Open Positions
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    onClick={handleScrollToWhy}
                  >
                    Why Dominion?
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Human & Team Visual Panel */}
          <div className="col-lg-5">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-careers-hero-visual-panel">
                <div className="ds-careers-gold-accent-line" />

                <div className="ds-careers-img-frame">
                  <img
                    src="/images/guard-5.jpg"
                    alt="Dominion Security Professional Guards Team"
                    className="ds-careers-visual-img"
                    onError={(e) => {
                      e.target.src = "/images/guard-5.jpg";
                    }}
                  />  
                  <div className="ds-careers-img-overlay" />
                </div>

                {/* Floating Information Block */}
                <div className="ds-careers-visual-card">
                  <div className="ds-careers-card-badge">
                    <span>WHO BUILDS DOMINION</span>
                  </div>
                  <div className="ds-careers-card-info">
                    <strong>PEOPLE • DISCIPLINE • TRUST</strong>
                    <span>Professional security personnel nationwide.</span>
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
