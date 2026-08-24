import Reveal from "../../common/Reveal";
import "./IndustryStory.css";

export default function IndustryStory() {
  return (
    <section className="section ds-ind-story-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: 55% Architectural Security Visual */}
          <div className="col-lg-7">
            <Reveal direction="left">
              <div className="ds-ind-story-visual-wrap">
                <img
                  src="/images/industries/story-context.jpg"
                  alt="Dominion Security Environmental Protection"
                  className="ds-ind-story-img"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="ds-ind-story-overlay" />
                <div className="ds-ind-story-badge">
                  <span>SECURITY IN CONTEXT</span>
                  <strong>ENVIRONMENT-SPECIFIC DEFENSE</strong>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 45% Context Narrative */}
          <div className="col-lg-5">
            <div className="ds-ind-story-content">
              <Reveal direction="up">
                <span className="section-label">THE DOMINION DIFFERENCE</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  Different environments require
                  <br />
                  <span>different security strategies.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-ind-story-lead">
                  A high-occupancy hospital emergency room cannot be secured like a remote data center or a commercial office tower.
                </p>
                <p className="mt-3 text-secondary-custom">
                  Dominion Security designs custom post orders, visitor verification protocols, and emergency escalation matrices tailored around the physical layout, operational pace, and regulatory requirements of each facility we protect.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
