import Reveal from "../common/Reveal";
import "./WhyWorkDominion.css";

const VALUE_ROWS = [
  {
    num: "01",
    title: "PROFESSIONAL GROWTH",
    desc: "Build experience through meaningful security work across commercial, critical infrastructure, and institutional posts.",
  },
  {
    num: "02",
    title: "PURPOSEFUL WORK",
    desc: "Contribute to environments where security matters—protecting occupants, assets, and operational continuity every day.",
  },
  {
    num: "03",
    title: "TEAM ENVIRONMENT",
    desc: "Work alongside disciplined security professionals who value mutual accountability, clear communication, and respect.",
  },
  {
    num: "04",
    title: "OPPORTUNITY",
    desc: "Explore roles across Dominion's physical guarding, mobile patrol, data center defense, and security management operations.",
  },
];

export default function WhyWorkDominion() {
  return (
    <section className="section ds-why-careers-section" id="why-dominion">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHY DOMINION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Work that matters.
                <br />
                <span>A team that cares.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Security is built on people. We value professionalism, responsibility, situational awareness, and a commitment to doing the job right.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Large Editorial Value Rows */}
        <div className="row g-4">
          {VALUE_ROWS.map((row, idx) => (
            <div key={row.num} className="col-md-6">
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="ds-career-value-row-card">
                  <div className="ds-value-row-header">
                    <span className="ds-value-row-num">{row.num}</span>
                    <h3 className="ds-value-row-title">{row.title}</h3>
                  </div>

                  <p className="ds-value-row-desc">{row.desc}</p>
                  <div className="ds-value-row-separator" />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
