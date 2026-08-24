import { ArrowRight, UserCheck, Shield } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./CareersBanner.css";

export default function CareersBanner() {
  return (
    <section className="ds-careers-banner-section">
      <div
        className="ds-careers-banner-bg"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="ds-careers-banner-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <Reveal direction="fade">
              <div className="ds-careers-badge">
                <UserCheck size={16} />
                <span>BUILD YOUR CAREER WITH DOMENION</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="ds-careers-banner-title">
                Build a career that
                <br />
                <span className="ds-gold-text">protects others.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="ds-careers-banner-desc">
                Join a professional security organization where discipline, continuous
                training, operational excellence, and purpose matter every single day.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="ds-careers-banner-actions">
                <Button to="/careers" variant="primary" size="lg" icon={ArrowRight}>
                  View Open Positions
                </Button>
                <div className="ds-careers-perks">
                  <span>✔ Competitive Pay</span>
                  <span>✔ Advanced Training</span>
                  <span>✔ Career Advancement</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
