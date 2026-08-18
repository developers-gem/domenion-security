import "./Hero.css";
import {
  ShieldCheck,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

function Hero({ service }) {
  return (
    <section
      className="service-hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(5,10,20,.82),
            rgba(5,10,20,.82)
          ),
          url(${service.heroImage})
        `,
      }}
    >
      <div className="container">

        <div className="row align-items-center min-vh-100">

          <div className="col-lg-7">

            <span className="section-label">
              {service.badge}
            </span>

            <h1>
              {service.title}
            </h1>

            <p>
              {service.shortDescription}
            </p>

            <div className="hero-buttons">

              <button className="btn btn-danger btn-lg">
                Request Security
                <ArrowRight
                  size={18}
                  className="ms-2"
                />
              </button>

              <button className="btn btn-outline-light btn-lg">
                <PhoneCall
                  size={18}
                  className="me-2"
                />
                (602) 438-4445
              </button>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="hero-card">

              <ShieldCheck size={55} />

              <h3>24/7 Protection</h3>

              <p>
                Licensed Officers • Mobile Patrol • Emergency Response
              </p>

              <div className="hero-stats">

                <div>
                  <h2>{service.stats.officers}</h2>
                  <span>Officers</span>
                </div>

                <div>
                  <h2>{service.stats.clients}</h2>
                  <span>Clients</span>
                </div>

                <div>
                  <h2>{service.stats.support}</h2>
                  <span>Support</span>
                </div>

                <div>
                  <h2>{service.stats.cities}</h2>
                  <span>Cities</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;