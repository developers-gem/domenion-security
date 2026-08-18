import "./Hero.css";
import { MapPinned, PhoneCall, ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="service-area-hero">

      <div className="hero-overlay"></div>

      <div className="container">

        <div className="row align-items-center min-vh-100">

          <div className="col-lg-7">

            <span className="section-label">
              SERVICE AREAS
            </span>

            <h1>
              Trusted Security
              <br />
              Across The Nation
            </h1>

            <p>
              Domenion Security delivers professional security solutions
              across multiple states and cities with licensed officers,
              rapid response teams, mobile patrols and enterprise-grade
              protection for businesses, government agencies and
              residential communities.
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

                (800) 555-1234

              </button>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="coverage-card">

              <div className="coverage-header">

                <MapPinned size={42} />

                <h3>Coverage Summary</h3>

              </div>

              <div className="coverage-list">

                <div>
                  <h2>50+</h2>
                  <span>Cities Covered</span>
                </div>

                <div>
                  <h2>15+</h2>
                  <span>Regional Offices</span>
                </div>

                <div>
                  <h2>1200+</h2>
                  <span>Security Officers</span>
                </div>

                <div>
                  <h2>24/7</h2>
                  <span>Emergency Response</span>
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