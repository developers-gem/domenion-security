import Reveal from "../../common/Reveal";
import "./IndustryChallengePanels.css";

const CHALLENGES = [
  {
    num: "01",
    tag: "ACCESS",
    title: "Perimeter & Entry Point Verification",
    desc: "Rigorous badging, credential verification, and visitor logging at all facility access points.",
  },
  {
    num: "02",
    tag: "PEOPLE",
    title: "Occupant & Personnel Protection",
    desc: "Licensed security guards trained in de-escalation, conflict resolution, and emergency evacuation.",
  },
  {
    num: "03",
    tag: "ASSETS",
    title: "Inventory & Infrastructure Security",
    desc: "Active perimeter patrols, CCTV monitoring, and theft deterrence for critical assets.",
  },
  {
    num: "04",
    tag: "OPERATIONS",
    title: "Uncompromised Business Continuity",
    desc: "Standardized post orders and 24/7 central dispatch to ensure continuous operational momentum.",
  },
];

export default function IndustryChallengePanels({ industry }) {
  return (
    <section className="section ds-ind-chal-panels-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">ENVIRONMENTAL CHALLENGES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                4 core security pillars for
                <br />
                <span>{industry.badge || "this sector"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-chal-panels-desc">
                Dominion structures every security deployment around 4 critical operational dimensions to eliminate security blind spots.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Horizontal Panels on Desktop / Stacking Vertically on Mobile */}
        <div className="row g-4">
          {CHALLENGES.map((item, idx) => (
            <div key={item.num} className="col-md-6 col-lg-3">
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="ds-chal-panel-card">
                  <div className="ds-chal-panel-header">
                    <span className="ds-chal-panel-num">{item.num}</span>
                    <span className="ds-chal-panel-tag">{item.tag}</span>
                  </div>

                  <h3 className="ds-chal-panel-title">{item.title}</h3>
                  <p className="ds-chal-panel-text">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
