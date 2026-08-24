import { ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import "./CareerExperience.css";

export default function CareerExperience() {
  return (
    <section className="ds-career-exp-section">
      <div
        className="ds-career-exp-bg"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="ds-career-exp-overlay" />

      <div className="container position-relative text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal direction="fade">
            <div className="ds-exp-badge">
              <ShieldCheck size={16} />
              <span>THE DOMENION EXPERIENCE</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="ds-exp-headline">
              Professionalism is how we show up.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="ds-exp-subtext">
              From sharp uniforms and punctual shift reporting to vigilant post order execution,
              Dominion Security officers represent trust and discipline at every location.
            </p>
          </Reveal>

          <div className="ds-exp-gold-line" />
        </div>
      </div>
    </section>
  );
}
