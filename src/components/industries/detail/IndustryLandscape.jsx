import Reveal from "../../common/Reveal";
import "./IndustryLandscape.css";

export default function IndustryLandscape({ industry }) {
  return (
    <section className="section ds-ind-landscape-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">THE SECURITY LANDSCAPE</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Understanding the operational realities of
                <br />
                <span>{industry.badge || "your environment"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Security in {industry.title.toLowerCase()} must balance public access or high occupant volume with strict access controls, asset protection, and continuous threat monitoring.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3 Editorial Narrative Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <Reveal direction="up" delay={0.1}>
              <div className="ds-landscape-card">
                <span className="ds-landscape-num">01</span>
                <h3 className="ds-landscape-title">Public vs. Restricted Access</h3>
                <p className="ds-landscape-desc">
                  Managing public ingress while isolating high-security zones, administrative offices, and sensitive infrastructure.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="col-md-4">
            <Reveal direction="up" delay={0.2}>
              <div className="ds-landscape-card">
                <span className="ds-landscape-num">02</span>
                <h3 className="ds-landscape-title">Occupant & Asset Safety</h3>
                <p className="ds-landscape-desc">
                  Protecting employees, guests, patients, and physical inventory with licensed security officers trained in de-escalation.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="col-md-4">
            <Reveal direction="up" delay={0.3}>
              <div className="ds-landscape-card">
                <span className="ds-landscape-num">03</span>
                <h3 className="ds-landscape-title">Operational Continuity</h3>
                <p className="ds-landscape-desc">
                  Preventing disruption, unauthorized trespass, and security breaches through 24/7 monitoring and rapid dispatch.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
