import { ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ServicesImageStatement.css";

export default function ServicesImageStatement() {
  return (
    <section className="ds-services-statement-section">
      <div
        className="ds-services-statement-bg"
        style={{ backgroundImage: `url(/images/data-center-security.jpg)` }}
      />
      <div className="ds-services-statement-overlay" />

      <div className="container position-relative text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal direction="fade">
            <div className="ds-statement-badge">
              <ShieldCheck size={16} />
              <span>DOMENION OPERATIONAL EXCELLENCE</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="ds-statement-headline">
              PROTECTION BUILT FOR THE REAL WORLD.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="ds-statement-subtext">
              Dependable security guard presence, 24/7 rapid emergency dispatch, and custom
              post order enforcement for mission-critical facilities.
            </p>
          </Reveal>

          <div className="ds-statement-gold-line" />
        </div>
      </div>
    </section>
  );
}
