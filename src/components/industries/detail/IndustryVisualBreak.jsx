import { ShieldCheck } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./IndustryVisualBreak.css";

export default function IndustryVisualBreak({ industry }) {
  const breakStatement = industry.badge
    ? `PROTECTION BUILT FOR ${industry.badge}.`
    : "PROTECTION BUILT FOR THE REAL WORLD.";

  return (
    <section className="ds-ind-vis-break-section">
      <div
        className="ds-ind-vis-break-bg"
        style={{ backgroundImage: `url(${industry.benefitsImage || industry.heroImage || "/images/company-security.jpg"})` }}
      />
      <div className="ds-ind-vis-break-overlay" />

      <div className="container position-relative text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal direction="fade">
            <div className="ds-vis-break-badge">
              <ShieldCheck size={16} />
              <span>DOMENION OPERATIONAL EXCELLENCE</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="ds-vis-break-headline">
              {breakStatement}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="ds-vis-break-subtext">
              Dependable security guard presence, 24/7 rapid emergency dispatch, and custom
              post order enforcement tailored around your facility.
            </p>
          </Reveal>

          <div className="ds-vis-break-gold-line" />
        </div>
      </div>
    </section>
  );
}
