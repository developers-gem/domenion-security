import "./ServiceHero.css";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function ServiceHero() {
  return (
    <section className="service-hero">

      <div className="hero-overlay"></div>

      <div className="container">

        <div className="row service-hero-content align-items-center">

          {/* LEFT */}

          <div className="col-lg-7">

            <span className="hero-tag">
              <ShieldCheck size={18} />
              Enterprise Security Solutions
            </span>

            <h1>
              Security
              <br />
              Without
              <span> Compromise.</span>
            </h1>

            <p>
              We protect businesses, government agencies,
              critical infrastructure and communities through
              professional security services, advanced technology
              and highly trained personnel.
            </p>

            <div className="hero-buttons">

              <Link
                to="/contact"
                className="btn btn-danger"
              >
                Request Quote
              </Link>

              <a
                href="#services"
                className="btn btn-outline-light explore-btn"
              >
                Explore Services
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-lg-5">

            <div className="hero-image">

              <img
                src="/images/services/hero.png"
                alt="Professional Security Officer"
              />

            </div>

          </div>

        </div>

       

      </div>

    </section>
  );
}

export default ServiceHero;