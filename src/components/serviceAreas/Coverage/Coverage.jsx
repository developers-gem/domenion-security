import "./Coverage.css";
import {
  ShieldCheck,
  TimerReset,
  Building2,
  MapPinned,
} from "lucide-react";

const features = [
  {
    icon: <MapPinned size={32} />,
    title: "Nationwide Coverage",
    text: "Professional security services across major cities and commercial hubs throughout the United States.",
  },
  {
    icon: <TimerReset size={32} />,
    title: "Rapid Response",
    text: "Our mobile response teams are strategically positioned for fast deployment and emergency support.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Licensed Professionals",
    text: "Every officer is trained, licensed and background verified before assignment.",
  },
  {
    icon: <Building2 size={32} />,
    title: "Industry Expertise",
    text: "From healthcare to government facilities, we protect organizations of every size.",
  },
];

function Coverage() {
  return (
    <section className="coverage-section section">

      <div className="container">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <div className="coverage-image">

              <img
                src="/images/service-areas/coverage-map.png"
                alt="Coverage Map"
              />

            </div>

          </div>

          <div className="col-lg-6">

            <span className="section-label">
              NATIONWIDE COVERAGE
            </span>

            <h2 className="section-title">
              Security Services Wherever You Need Them
            </h2>

            <p className="section-description">

              Our regional offices and field teams allow us to provide
              consistent, high-quality protection across multiple
              states with rapid deployment capabilities.

            </p>

            <div className="row g-4 mt-2">

              {features.map((item, index) => (

                <div className="col-md-6" key={index}>

                  <div className="coverage-feature">

                    <div className="feature-icon">

                      {item.icon}

                    </div>

                    <div>

                      <h5>{item.title}</h5>

                      <p>{item.text}</p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Coverage;