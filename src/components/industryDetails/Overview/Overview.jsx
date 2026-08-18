import "./Overview.css";
import {
  ShieldCheck,
  Users,
  Building2,
  Siren,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

function Overview({ industry }) {
  return (
    <section className="industry-overview section">
      <div className="container">

        <div className="industry-overview-header">
          <span className="section-label">
            INDUSTRY OVERVIEW
          </span>

          <h2 className="section-title">
            Security Built Around
            <span> Your Industry</span>
          </h2>

          <p className="section-description">
            {industry.overviewDescription}
          </p>
        </div>

        <div className="row g-5 align-items-center">

          {/* =========================
              LEFT IMAGE
          ========================= */}

          <div className="col-lg-6">

            <div className="industry-overview-visual">

              <div className="industry-image-wrapper">

                <img
                  src={industry.overviewImage}
                  alt={industry.title}
                />

                <div className="industry-image-overlay" />

                <div className="industry-image-content">

                  <span>
                    {industry.badge}
                  </span>

                  <h3>
                    Professional Protection.
                    <br />
                    Proven Results.
                  </h3>

                </div>

              </div>

              {/* Floating badge */}

              <div className="industry-security-badge">

                <div className="industry-security-icon">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <strong>24/7</strong>
                  <span>Security Coverage</span>
                </div>

              </div>

            </div>

          </div>


          {/* =========================
              RIGHT CONTENT
          ========================= */}

          <div className="col-lg-6">

            <div className="industry-overview-content">

              <h3>
                {industry.overviewTitle}
              </h3>

              <p className="industry-main-description">
                {industry.overviewDescription}
              </p>


              {/* =========================
                  SECURITY CAPABILITIES
              ========================= */}

              <div className="industry-capabilities">

                <div className="industry-capability">

                  <div className="capability-icon">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <strong>Professional Security</strong>
                    <span>
                      Experienced security professionals
                    </span>
                  </div>

                </div>


                <div className="industry-capability">

                  <div className="capability-icon">
                    <Users size={22} />
                  </div>

                  <div>
                    <strong>Trained Personnel</strong>
                    <span>
                      Highly trained protection teams
                    </span>
                  </div>

                </div>


                <div className="industry-capability">

                  <div className="capability-icon">
                    <Building2 size={22} />
                  </div>

                  <div>
                    <strong>Facility Protection</strong>
                    <span>
                      Complete property protection
                    </span>
                  </div>

                </div>


                <div className="industry-capability">

                  <div className="capability-icon">
                    <Siren size={22} />
                  </div>

                  <div>
                    <strong>Rapid Response</strong>
                    <span>
                      Fast response when it matters
                    </span>
                  </div>

                </div>

              </div>


              {/* =========================
                  HIGHLIGHTS
              ========================= */}

              <div className="industry-highlights">

                <div className="highlights-heading">

                  <span>
                    KEY PROTECTION AREAS
                  </span>

                  <ArrowUpRight size={18} />

                </div>

                <div className="highlights-grid">

                  {industry.highlights?.map((item, index) => (

                    <div
                      className="industry-highlight"
                      key={index}
                    >

                      <CheckCircle2 size={18} />

                      <span>
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Overview;