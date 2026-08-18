import "./Map.css";
import {
  ShieldCheck,
  MapPinned,
  Clock3,
  Building2,
} from "lucide-react";

const stats = [
  {
    icon: <MapPinned size={26} />,
    number: "50+",
    title: "Service Areas",
  },
  {
    icon: <Building2 size={26} />,
    number: "15+",
    title: "Regional Offices",
  },
  {
    icon: <ShieldCheck size={26} />,
    number: "1200+",
    title: "Security Officers",
  },
  {
    icon: <Clock3 size={26} />,
    number: "24/7",
    title: "Emergency Response",
  },
];

function Map() {
  return (
    <section className="contact-map section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            SERVICE COVERAGE
          </span>

          <h2 className="section-title">
            Nationwide Security Coverage
          </h2>

          <p className="section-description mx-auto">
            Our teams operate across multiple cities, providing fast,
            reliable and professional security services whenever and
            wherever they're needed.
          </p>

        </div>

        <div className="row g-5">

          <div className="col-lg-8">

            <div className="map-wrapper">

              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Los+Angeles,+California&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="coverage-card">

              <h3>
                Coverage Highlights
              </h3>

              <div className="coverage-stats">

                {stats.map((item, index) => (

                  <div className="coverage-item" key={index}>

                    <div className="coverage-icon">

                      {item.icon}

                    </div>

                    <div>

                      <h4>{item.number}</h4>

                      <span>{item.title}</span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Map;