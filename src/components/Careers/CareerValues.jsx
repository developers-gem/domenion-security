import Reveal from "../common/Reveal";
import "./CareerValues.css";

const CAREER_VALUES = [
  {
    num: "01",
    tag: "RESPONSIBILITY",
    title: "Take ownership of the post.",
    desc: "Take full ownership of the environment, personnel, and post orders entrusted to your security team.",
  },
  {
    num: "02",
    tag: "PROFESSIONALISM",
    title: "Disciplined & accountable posture.",
    desc: "Present a clean, vigilant, and authoritative presence that instills trust across every client facility.",
  },
  {
    num: "03",
    tag: "AWARENESS",
    title: "Proactive situational alertness.",
    desc: "Maintain constant situational awareness to detect vulnerabilities and contain threats before they escalate.",
  },
  {
    num: "04",
    tag: "INTEGRITY",
    title: "Unyielding honesty & trust.",
    desc: "Uphold total accountability, accurate reporting, and uncompromised ethical standards across all operations.",
  },
];

export default function CareerValues() {
  return (
    <section className="section ds-career-values-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHAT WE LOOK FOR</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                Strong people.
                <br />
                <span>Professional standards.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-cvalues-intro-desc">
                We seek individuals who take pride in their duty, demonstrate high operational integrity, and embody Dominion's security standards.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Full-Width Editorial Value Rows */}
        <div className="row g-4">
          {CAREER_VALUES.map((item, idx) => (
            <div key={item.tag} className="col-md-6 col-lg-3">
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="ds-cvalue-card">
                  <div className="ds-cvalue-header">
                    <span className="ds-cvalue-num">{item.num}</span>
                    <span className="ds-cvalue-tag">{item.tag}</span>
                  </div>

                  <h3 className="ds-cvalue-title">{item.title}</h3>
                  <p className="ds-cvalue-desc">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
