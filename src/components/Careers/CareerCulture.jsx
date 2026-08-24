import Reveal from "../common/Reveal";
import "./CareerCulture.css";

export default function CareerCulture() {
  return (
    <section className="section ds-culture-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Overlapping Dual Image Composition */}
          <div className="col-lg-6">
            <Reveal direction="left">
              <div className="ds-culture-visual-wrap">
                <div className="ds-culture-main-img-frame">
                  <img
                    src="/images/guard-6.jpg"
                    alt="Dominion Security Guard Team Briefing"
                    className="ds-culture-main-img"
                    onError={(e) => {
                      e.target.src = "/images/about-security.jpg";
                    }}
                  />
                  <div className="ds-culture-main-overlay" />
                </div>

                <div className="ds-culture-small-img-frame">
                  <img
                    src="/images/guard-7.jpg"
                    alt="Dominion Security Officer on Post"
                    className="ds-culture-small-img"
                    onError={(e) => {
                      e.target.src = "/images/guard-6.jpg";
                    }}
                  />
                  <div className="ds-culture-small-border" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Culture Narrative */}
          <div className="col-lg-6">
            <div className="ds-culture-content">
              <Reveal direction="up">
                <span className="section-label">OUR PEOPLE</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  Security starts with
                  <br />
                  <span>the professionals on post.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-culture-lead mt-3">
                  Every successful security operation depends on professionals who are alert, prepared, and committed to their post orders.
                </p>
                <p className="mt-3 text-secondary-custom">
                  At Dominion Security, our people are at the center of everything we protect. We support our security personnel with clear post operational guidelines, continuous readiness oversight, and strong leadership.
                </p>
              </Reveal>

              <div className="ds-culture-gold-line mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
