import "./Features.css";
import { ArrowUpRight } from "lucide-react";

function Features({ industry }) {
  return (
    <section className="industry-features section">

      <div className="container">

        {/* ================= HEADER ================= */}

        <div className="industry-features-header">

          <div className="industry-features-heading">

            <span className="section-label">
              SECURITY CAPABILITIES
            </span>

            <h2 className="section-title">
              {industry.featuresTitle}
            </h2>

          </div>

          <div className="industry-features-description">

            <p>
              {industry.featuresDescription}
            </p>

          </div>

        </div>


        {/* ================= FEATURES GRID ================= */}

        <div className="row g-4">

          {industry.features?.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                className="col-lg-4 col-md-6"
                key={index}
              >

                <div className="industry-feature-card">

                  {/* TOP */}

                  <div className="industry-feature-top">

                    <span className="industry-feature-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <ArrowUpRight
                      size={22}
                      className="industry-feature-arrow"
                    />

                  </div>


                  {/* ICON */}

                  <div className="industry-feature-icon">

                    <Icon size={32} strokeWidth={1.8} />

                  </div>


                  {/* CONTENT */}

                  <div className="industry-feature-content">

                    <h3>
                      {feature.title}
                    </h3>

                    <p>
                      {feature.text}
                    </p>

                  </div>


                  {/* BOTTOM LINE */}

                  <div className="industry-feature-line" />

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;