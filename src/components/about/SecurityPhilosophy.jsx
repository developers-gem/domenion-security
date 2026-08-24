import { ShieldCheck, Quote } from "lucide-react";
import Reveal from "../common/Reveal";
import "./SecurityPhilosophy.css";

export default function SecurityPhilosophy() {
  return (
    <section className="ds-philosophy-section">
      <div
        className="ds-philosophy-bg"
        style={{ backgroundImage: `url(/images/data-center-security.jpg)` }}
      />
      <div className="ds-philosophy-overlay" />

      <div className="container position-relative text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal direction="fade">
            <div className="ds-philosophy-badge">
              <ShieldCheck size={16} />
              <span>DOMENION SECURITY PHILOSOPHY</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <Quote size={40} className="ds-philosophy-quote-icon" />
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <blockquote className="ds-philosophy-quote text-white">
              "Protection is more than presence. It is preparation, discipline, and the
              unwavering ability to respond when it matters most."
            </blockquote>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="ds-philosophy-meta">
              <span className="ds-meta-brand">DOMENION SECURITY OPERATIONAL STANDARD</span>
              <span className="ds-meta-sub">Preparedness • Readiness • Trust</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
