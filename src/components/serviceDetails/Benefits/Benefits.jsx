import "./Benefits.css";
import {
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

function Benefits({ service }) {
  return (
    <section className="service-benefits section">

      <div className="container">

        <div className="row align-items-center g-5">

          {/* LEFT */}

          <div className="col-lg-6">

            <div className="benefits-image">

              <img
                src={service.benefitsImage}
                alt={service.title}
                className="img-fluid"
              />

              <div className="floating-card">

                <ShieldCheck size={34} />

                <div>

                  <h3>
                    {service.benefitStats.experience}
                  </h3>

                  <span>
                    {service.benefitStats.experienceText}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-lg-6">

            <span className="section-label">
              WHY {service.badge}
            </span>

            <h2 className="section-title">
              {service.benefitsTitle}
            </h2>

            <p className="section-description">
              {service.benefitsDescription}
            </p>

            <div className="benefits-list">

              {service.benefits.map((item, index) => (

                <div
                  className="benefit-item"
                  key={index}
                >

                  <CheckCircle2 size={18} />

                  <span>{item}</span>

                </div>

              ))}

            </div>

            <div className="benefit-stats">

              <div className="stat-box">

                <TrendingUp size={24} />

                <h3>
                  {service.benefitStats.satisfaction}
                </h3>

                <p>
                  {service.benefitStats.satisfactionText}
                </p>

              </div>

              <div className="stat-box">

                <ShieldCheck size={24} />

                <h3>
                  {service.benefitStats.readiness}
                </h3>

                <p>
                  {service.benefitStats.readinessText}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Benefits;