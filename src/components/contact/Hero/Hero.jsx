import "./Hero.css";
import { PhoneCall, ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="contact-hero">

      <div className="hero-overlay"></div>

      <div className="container">

        <div className="row align-items-center min-vh-100">

          <div className="col-lg-7">

            <span className="section-label">
              CONTACT US
            </span>

            <h1>

              Let's Discuss
              <br />
              Your Security
              Needs

            </h1>

            <p>

              Whether you require on-site security officers,
              executive protection, mobile patrols or enterprise
              security solutions, our team is ready to help.

            </p>

            <div className="d-flex flex-wrap gap-3 mt-5">

              <button className="btn btn-danger">

                Get Free Consultation

              </button>

              <button className="btn btn-outline-light">

                Call Now

                <PhoneCall size={18} className="ms-2"/>

              </button>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="hero-image">

              <img
                src="/images/contact/hero.png"
                alt=""
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;