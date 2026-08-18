import "./Intro.css";
import {
  ShieldCheck,
  Building2,
  BriefcaseBusiness,
  Landmark,
} from "lucide-react";

function Intro() {
  return (
    <section className="industry-intro section">

      <div className="container">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <div className="intro-image">

              <img
                src="/images/industries/intro.jpg"
                alt="Industries"
              />

              <div className="experience-box">

                <h2>25+</h2>

                <span>Years Experience</span>

              </div>

            </div>

          </div>

          <div className="col-lg-6">

            <span className="section-label">

              INDUSTRY EXPERTISE

            </span>

            <h2 className="section-title">

              Security Solutions
              Built Around
              Your Industry

            </h2>

            <p className="section-description">

              Every industry faces unique security risks. Our experienced
              professionals design customized security strategies that
              protect people, property, assets and daily operations.

            </p>

            <div className="row g-4 mt-4">

              <div className="col-sm-6">

                <div className="intro-card">

                  <ShieldCheck />

                  <h5>Critical Infrastructure</h5>

                </div>

              </div>

              <div className="col-sm-6">

                <div className="intro-card">

                  <Building2 />

                  <h5>Commercial Security</h5>

                </div>

              </div>

              <div className="col-sm-6">

                <div className="intro-card">

                  <BriefcaseBusiness />

                  <h5>Corporate Protection</h5>

                </div>

              </div>

              <div className="col-sm-6">

                <div className="intro-card">

                  <Landmark />

                  <h5>Government Services</h5>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Intro;