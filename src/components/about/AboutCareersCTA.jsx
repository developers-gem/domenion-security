import { ArrowRight, UserCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./AboutCareersCTA.css";

export default function AboutCareersCTA() {
  return (
    <section className="ds-about-careers-section">
      <div
        className="ds-about-careers-bg"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="ds-about-careers-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <Reveal direction="fade">
              <div className="ds-about-careers-badge">
                <UserCheck size={16} />
                <span>JOIN THE DOMENION SECURITY TEAM</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="ds-about-careers-title">
                Be part of a team
                <br />
                <span className="ds-gold-text">that protects what matters.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="ds-about-careers-desc">
                Explore career opportunities with Dominion Security and build a professional
                future grounded in responsibility, operational excellence, continuous
                training, and purpose.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <Button to="/careers" variant="primary" size="lg" icon={ArrowRight}>
                View Open Positions
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
