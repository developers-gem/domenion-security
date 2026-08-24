import Reveal from "../../common/Reveal";
import "./ServiceDetailIntro.css";

export default function ServiceDetailIntro({ service }) {
  return (
    <section className="section ds-detail-intro-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Eyebrow + Large Statement */}
          <div className="col-lg-6">
            <div className="ds-detail-intro-left">
              <Reveal direction="up">
                <span className="section-label">OVERVIEW</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  {service.overviewTitle || `Protection built around your ${service.badge || "environment"}.`}
                </h2>
              </Reveal>

              <div className="ds-intro-gold-bar mt-4" />
            </div>
          </div>

          {/* Right Column: 2 Concise Explanatory Paragraphs */}
          <div className="col-lg-6">
            <div className="ds-detail-intro-right">
              <Reveal direction="up" delay={0.2}>
                <p className="ds-intro-paragraph-lead">
                  {service.overviewDescription ||
                    service.description ||
                    `Dominion Security delivers tailored ${service.title} designed around the operational demands, entry vectors, and regulatory standards of your facility.`}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="ds-intro-paragraph-sub">
                  Our security directors establish disciplined post orders, rapid escalation workflows,
                  and integrated surveillance monitoring to safeguard your personnel, infrastructure, and core business assets round the clock.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
