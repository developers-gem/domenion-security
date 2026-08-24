import Reveal from "../../common/Reveal";
import "./IndustrySnapshot.css";

export default function IndustrySnapshot() {
  return (
    <section className="section ds-ind-snapshot-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Statement */}
          <div className="col-lg-8">
            <div className="ds-ind-snapshot-left">
              <Reveal direction="up">
                <span className="section-label">ENVIRONMENTAL ADAPTABILITY</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  ONE APPROACH DOESN'T FIT EVERY ENVIRONMENT.
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-snapshot-lead mt-3">
                  From government facilities and financial institutions to healthcare, retail,
                  transportation, and critical infrastructure, security requirements change with the environment.
                </p>
                <p className="mt-3 text-secondary-custom">
                  Dominion Security analyzes post orders, access vectors, visitor flows, and threat models for each specific sector—deploying trained personnel and integrated surveillance engineered specifically for that environment.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Counter Box */}
          <div className="col-lg-4">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-ind-counter-card">
                <span className="ds-counter-num">11+</span>
                <span className="ds-counter-label">PROTECTED SECTORS</span>
                <p className="ds-counter-sub">Custom security post orders engineered per environment.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
