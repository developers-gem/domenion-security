import Reveal from "../../common/Reveal";
import "./IndustryOverview.css";

export default function IndustryOverview({ industry }) {
  const panelImg = industry.overviewImage || industry.benefitsImage || "/images/company-security.jpg";

  return (
    <section className="section ds-ind-ov-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Statement & Copy */}
          <div className="col-lg-6">
            <div className="ds-ind-ov-content">
              <Reveal direction="up">
                <span className="section-label">{industry.badge || "SECTOR OVERVIEW"}</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  {industry.overviewTitle || `Protecting ${industry.title} with purpose & precision.`}
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-ind-ov-lead mt-3">
                  {industry.overviewDescription || industry.shortDescription}
                </p>
                <p className="mt-3 text-secondary-custom">
                  Dominion Security establishes rigorous post orders, entry point access controls, visitor verification rules, and emergency escalation protocols specifically engineered for {industry.title.toLowerCase()}.
                </p>
              </Reveal>

              <div className="ds-ind-ov-gold-line mt-4" />
            </div>
          </div>

          {/* Right Column: Architectural Visual Panel */}
          <div className="col-lg-6">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-ind-ov-visual">
                <img
                  src={panelImg}
                  alt={industry.title}
                  className="ds-ind-ov-img"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="ds-ind-ov-overlay" />
                <div className="ds-ind-ov-badge">
                  <span>ENVIRONMENTAL DEFENSE</span>
                  <strong>{industry.badge || "DOMINION SECURITY"}</strong>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
