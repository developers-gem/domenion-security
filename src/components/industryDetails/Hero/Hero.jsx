import "./Hero.css";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

function Hero({ industry }) {
  return (
    <section className="industry-hero">

      {/* Background Image */}
      <div
        className="industry-hero-bg"
        style={{
          backgroundImage: `url(${industry.heroImage})`,
        }}
      />

      {/* Overlay */}
      <div className="industry-hero-overlay" />

      <div className="container position-relative">

        <div className="industry-hero-content">

          {/* CENTER CONTENT */}

          <div className="industry-hero-main text-center">

            <div className="industry-hero-tag">

              <ShieldCheck size={18} />

              <span>
                {industry.badge}
              </span>

            </div>


            <h1>

              Security Solutions
              <br />

              <span>
                Built for {industry.title}
              </span>

            </h1>


            <p className="industry-hero-description mx-auto">
              {industry.shortDescription}
            </p>


            <div className="industry-hero-buttons">

              <a
                href="#quote"
                className="btn btn-danger btn-lg"
              >

                Request Security

                <ArrowRight
                  size={18}
                  className="ms-2"
                />

              </a>


              <a
                href="tel:18005551234"
                className="btn btn-outline-light btn-lg"
              >

                <PhoneCall
                  size={18}
                  className="me-2"
                />

                (800) 555-1234

              </a>

            </div>

          </div>


          {/* STATS */}

          <div className="industry-hero-stats">

            <div className="industry-stat">

              <strong>24/7</strong>

              <span>
                Security Coverage
              </span>

            </div>


            <div className="industry-stat">

              <strong>1200+</strong>

              <span>
                Security Professionals
              </span>

            </div>


            <div className="industry-stat">

              <strong>50+</strong>

              <span>
                Cities Covered
              </span>

            </div>


            <div className="industry-stat">

              <strong>20+</strong>

              <span>
                Years Experience
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;