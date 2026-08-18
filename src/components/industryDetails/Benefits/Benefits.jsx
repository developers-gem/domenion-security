import "./Benefits.css";
import {
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

function Benefits({ industry }) {
  return (
    <section className="industry-benefits section">

      <div className="container">

        <div className="row align-items-center g-5">

          {/* LEFT IMAGE */}

          <div className="col-lg-6">

            <div className="industry-benefits-image">

              <img
                src={industry.benefitsImage}
                alt={`${industry.title} Security`}
                className="img-fluid"
              />

              <div className="industry-benefits-card">

                <ShieldCheck size={30} />

                <div>
                  <strong>24/7</strong>

                  <span>
                    Protection & Monitoring
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* RIGHT CONTENT */}

          <div className="col-lg-6">

            <span className="section-label">
              WHY CHOOSE US
            </span>

            <h2 className="section-title">
              {industry.benefitsTitle}
            </h2>

            <p className="section-description">
              {industry.benefitsDescription}
            </p>


            {/* BENEFITS LIST */}

            <div className="industry-benefits-list">

              {industry.benefits?.map((benefit, index) => (

                <div
                  className="industry-benefit-item"
                  key={index}
                >

                  <CheckCircle2 size={19} />

                  <span>
                    {benefit}
                  </span>

                </div>

              ))}

            </div>


            {/* SMALL STATS */}

            <div className="industry-benefit-stats">

              <div className="industry-benefit-stat">

                <TrendingUp size={22} />

                <div>

                  <strong>
                    Proactive
                  </strong>

                  <span>
                    Security Approach
                  </span>

                </div>

              </div>


              <div className="industry-benefit-stat">

                <ShieldCheck size={22} />

                <div>

                  <strong>
                    24/7
                  </strong>

                  <span>
                    Operational Readiness
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Benefits;