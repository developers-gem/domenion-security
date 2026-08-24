import { CheckCircle2 } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./IndustryDetailPriorities.css";

export default function IndustryDetailPriorities({ industry }) {
  const prioritiesList = industry.highlights || [
    "Facility Security & Perimeter Control",
    "Personnel & Occupant Safety",
    "Controlled Access & Badging Verification",
    "Continuous Video Surveillance Monitoring",
    "24/7 Security Patrols & Escalation",
    "Detailed Activity Logs & Incident Documentation",
  ];

  return (
    <section className="section ds-ind-det-prio-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">PROTECTION PRIORITIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Operational priorities tailored
                <br />
                <span>for {industry.badge || "your sector"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Every environment requires tailored post orders and continuous performance verification to safeguard life, property, and operational continuity.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Priorities Grid */}
        <div className="row g-3">
          {prioritiesList.map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <Reveal direction="up" delay={0.04 * idx}>
                <div className="ds-det-prio-card">
                  <CheckCircle2 size={18} className="ds-prio-check-icon" />
                  <span className="ds-prio-item-text">{item}</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
