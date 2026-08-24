import Reveal from "../../common/Reveal";
import "./IndustryPriorities.css";

const PRIORITIES_DATA = [
  { num: "01", title: "ACCESS & CONTROL", desc: "Verifying credentials, visitor logs, and perimeter entry points across all shift hours." },
  { num: "02", title: "PEOPLE & ASSET PROTECTION", desc: "Safeguarding employees, visitors, patients, residents, and high-value physical inventory." },
  { num: "03", title: "THREAT AWARENESS", desc: "Continuous surveillance monitoring and proactive risk detection before breaches occur." },
  { num: "04", title: "OPERATIONAL CONTINUITY", desc: "Mitigating security interruptions to keep essential facility operations running smoothly." },
  { num: "05", title: "SITE SECURITY", desc: "Routine perimeter checks, vehicle patrols, and secure keyholding procedures." },
  { num: "06", title: "RESPONSE READINESS", desc: "24/7 emergency dispatch and standardized incident escalation protocols." },
];

export default function IndustryPriorities() {
  return (
    <section className="section ds-ind-priorities-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">SECURITY PRIORITIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Core priorities across
                <br />
                <span>every protected sector.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Regardless of industry type, Dominion Security structures every operational program around 6 core security pillars.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 6 Editorial Horizontal Rows */}
        <div className="row g-4">
          {PRIORITIES_DATA.map((item, idx) => (
            <div key={item.num} className="col-md-6 col-lg-4">
              <Reveal direction="up" delay={0.06 * idx}>
                <div className="ds-priority-row-card">
                  <div className="ds-prio-card-header">
                    <span className="ds-prio-num">{item.num}</span>
                    <h3 className="ds-prio-title">{item.title}</h3>
                  </div>
                  <p className="ds-prio-desc">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
