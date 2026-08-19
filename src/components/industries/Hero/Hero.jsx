import "./Hero.css";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="industries-hero">

      <div className="hero-overlay"></div>

      <div className="container">

        <div className="row min-vh-100 align-items-center">

          <div className="col-lg-7">

            <span className="section-label">

              INDUSTRIES WE SERVE

            </span>

            <h1>

              Protecting Every
              Industry With
              Confidence.

            </h1>

            <p>

              From government facilities and healthcare institutions
              to commercial properties and critical infrastructure,
              we deliver security solutions tailored to every industry.

            </p>

            <div className="d-flex gap-3 mt-5">

              <button className="btn btn-danger">

                Request Quote

              </button>

              <button className="btn btn-outline-light">

                Explore Industries

                <ArrowRight size={18}/>

              </button>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="hero-image">

              <img
                src="/images/industries/hero.png"
                alt="industries-hero-image"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;