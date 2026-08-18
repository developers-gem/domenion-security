import "./Overview.css";
import {
  ShieldCheck,
  Users,
  Building2,
  Siren,
  CheckCircle2,
} from "lucide-react";

function Overview({ service }) {
  return (
    <section className="service-overview section">
      <div className="container">
        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <div className="overview-image">

              <img
                src={service.overviewImage}
                alt={service.title}
                className="img-fluid"
              />

              <div className="experience-card">
                <h2>20+</h2>
                <span>Years of Security Excellence</span>
              </div>

            </div>

          </div>

          <div className="col-lg-6">

            <span className="section-label">
              SERVICE OVERVIEW
            </span>

            <h2 className="section-title">
              {service.overviewTitle}
            </h2>

            <p className="section-description">
              {service.overviewDescription}
            </p>

            <div className="overview-icons">

              <div>
                <ShieldCheck />
                <span>Licensed Officers</span>
              </div>

              <div>
                <Users />
                <span>Professional Teams</span>
              </div>

              <div>
                <Building2 />
                <span>Business Protection</span>
              </div>

              <div>
                <Siren />
                <span>Emergency Response</span>
              </div>

            </div>

            <ul className="overview-list">

              {service.highlights.map((item, index) => (

                <li key={index}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>

              ))}

            </ul>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Overview;