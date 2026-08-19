import "./Hero.css";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="career-hero">

      <div className="hero-overlay"></div>

      <div className="container">

        <div className="row align-items-center min-vh-100">

          <div className="col-lg-7">

            <span className="section-label">
              CAREERS
            </span>

            <h1>
              Build Your Career
              <br />
              Protect What Matters.
            </h1>

            <p>
              Join one of the fastest-growing security companies and become
              part of a professional team dedicated to protecting people,
              businesses, and critical infrastructure.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-5">

              <button className="btn btn-danger btn-lg">
                Apply Now
              </button>

              <button className="btn btn-outline-light btn-lg">
                View Open Positions
                <ArrowRight size={18} className="ms-2"/>
              </button>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="career-image">

              <img
                src="/images/careers/hero.jpg"
                alt="Security Career"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;