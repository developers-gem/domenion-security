import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Eye,
  Award,
} from "lucide-react";

import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* =========================================
          PAGE HERO
      ========================================= */}
      <section className="about-hero">

        <div className="about-hero-bg"></div>

        <div className="container position-relative">

          <div className="row">

            <div className="col-lg-8">

              <span className="section-label">
                About Domenion Security
              </span>

              <h1>
                Security built
                <br />
                <span>around what matters.</span>
              </h1>

              <p>
                Domenion Security provides comprehensive security
                solutions designed to protect people, property,
                infrastructure and information in an increasingly
                complex world.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          COMPANY INTRODUCTION
      ========================================= */}
      <section className="about-introduction section">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <div className="about-image-wrap">

                <img
                  src="/images/about-security.jpg"
                  alt="Domenion Security professional"
                />

                <div className="about-image-card">

                  <span>
                    01
                  </span>

                  <strong>
                    Security
                    <br />
                    Without
                    <br />
                    Compromise.
                  </strong>

                </div>

              </div>

            </div>


            <div className="col-lg-6">

              <div className="about-content">

                <span className="section-label">
                  Who We Are
                </span>

                <h2 className="section-title">
                  Experience,
                  <br />
                  discipline &
                  <br />
                  <span>preparedness.</span>
                </h2>

                <p className="about-lead">
                  Domenion Security delivers professional security
                  solutions built around the real-world requirements
                  of the organizations and communities we protect.
                </p>

                <p>
                  From professional security officers and mobile
                  patrol teams to critical infrastructure, data
                  center and cybersecurity solutions, our approach
                  combines experienced personnel, modern technology
                  and disciplined security practices.
                </p>

                <p>
                  We focus on understanding each environment,
                  identifying vulnerabilities and building security
                  programs designed to provide dependable protection,
                  preparedness and response.
                </p>

                <Link
                  to="/contact"
                  className="about-text-link"
                >
                  Talk to our security team
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          MISSION / VISION
      ========================================= */}
      <section className="mission-section section">

        <div className="container">

          <div className="row g-4">

            {/* Mission */}
            <div className="col-lg-6">

              <div className="mission-card">

                <div className="mission-icon">
                  <Target size={25} />
                </div>

                <span className="mission-number">
                  01
                </span>

                <span className="mission-label">
                  Our Mission
                </span>

                <h3>
                  Protect people,
                  <br />
                  property & purpose.
                </h3>

                <p>
                  Our mission is to deliver dependable security
                  solutions through experienced personnel,
                  disciplined operations and a proactive approach
                  to protection.
                </p>

              </div>

            </div>


            {/* Vision */}
            <div className="col-lg-6">

              <div className="mission-card mission-card-light">

                <div className="mission-icon">
                  <Eye size={25} />
                </div>

                <span className="mission-number">
                  02
                </span>

                <span className="mission-label">
                  Our Vision
                </span>

                <h3>
                  A safer,
                  <br />
                  more prepared future.
                </h3>

                <p>
                  We strive to establish a modern security
                  organization capable of protecting increasingly
                  complex physical, digital and critical
                  environments.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CORE VALUES
      ========================================= */}
      <section className="values-section section">

        <div className="container">

          <div className="row align-items-end mb-5">

            <div className="col-lg-7">

              <span className="section-label">
                What We Stand For
              </span>

              <h2 className="section-title">
                Built on strong
                <br />
                <span>security principles.</span>
              </h2>

            </div>

            <div className="col-lg-4 offset-lg-1 mt-4 mt-lg-0">

              <p className="section-description">
                Effective security requires more than personnel
                and technology. It requires a culture built around
                accountability, preparation and trust.
              </p>

            </div>

          </div>


          <div className="row g-0 values-grid">

            {/* Value 1 */}
            <div className="col-md-6 col-lg-3">

              <div className="value-card">

                <span className="value-number">
                  01
                </span>

                <ShieldCheck size={27} />

                <h3>
                  Integrity
                </h3>

                <p>
                  We operate with accountability, professionalism
                  and respect for the responsibility entrusted to us.
                </p>

              </div>

            </div>


            {/* Value 2 */}
            <div className="col-md-6 col-lg-3">

              <div className="value-card">

                <span className="value-number">
                  02
                </span>

                <ShieldCheck size={27} />

                <h3>
                  Readiness
                </h3>

                <p>
                  We prepare for potential threats before they
                  become incidents.
                </p>

              </div>

            </div>


            {/* Value 3 */}
            <div className="col-md-6 col-lg-3">

              <div className="value-card">

                <span className="value-number">
                  03
                </span>

                <ShieldCheck size={27} />

                <h3>
                  Excellence
                </h3>

                <p>
                  We continuously improve our people, processes
                  and security capabilities.
                </p>

              </div>

            </div>


            {/* Value 4 */}
            <div className="col-md-6 col-lg-3">

              <div className="value-card">

                <span className="value-number">
                  04
                </span>

                <ShieldCheck size={27} />

                <h3>
                  Trust
                </h3>

                <p>
                  We build lasting relationships through reliable
                  service and consistent performance.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          COMPANY TIMELINE
      ========================================= */}
      <section className="timeline-section section">

        <div className="container">

          <div className="row">

            <div className="col-lg-5">

              <span className="section-label">
                Our Journey
              </span>

              <h2 className="section-title">
                Growing with
                <br />
                <span>the threat landscape.</span>
              </h2>

              <p className="section-description mt-4">
                Security continues to evolve. Domenion is built
                to evolve with it, bringing together physical,
                technical and specialized capabilities.
              </p>

            </div>


            <div className="col-lg-6 offset-lg-1 mt-5 mt-lg-0">

              <div className="timeline">

                <div className="timeline-item">

                  <span>
                    01
                  </span>

                  <div>
                    <small>
                      FOUNDATION
                    </small>

                    <h3>
                      Professional Protection
                    </h3>

                    <p>
                      Establishing disciplined security operations
                      centered around dependable protection.
                    </p>
                  </div>

                </div>


                <div className="timeline-item">

                  <span>
                    02
                  </span>

                  <div>
                    <small>
                      EXPANSION
                    </small>

                    <h3>
                      Integrated Capabilities
                    </h3>

                    <p>
                      Expanding capabilities across physical,
                      mobile and specialized security environments.
                    </p>
                  </div>

                </div>


                <div className="timeline-item">

                  <span>
                    03
                  </span>

                  <div>
                    <small>
                      MODERN SECURITY
                    </small>

                    <h3>
                      Technology & Intelligence
                    </h3>

                    <p>
                      Combining personnel, technology and
                      intelligence-driven security practices.
                    </p>
                  </div>

                </div>


                <div className="timeline-item">

                  <span>
                    04
                  </span>

                  <div>
                    <small>
                      TODAY
                    </small>

                    <h3>
                      Enterprise Security
                    </h3>

                    <p>
                      Delivering security solutions for increasingly
                      complex organizations and critical environments.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CERTIFICATIONS
      ========================================= */}
      <section className="certification-section section">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="section-label">
                Credentials & Standards
              </span>

              <h2 className="section-title">
                Built for
                <br />
                <span>trust & accountability.</span>
              </h2>

              <p className="section-description mt-4">
                Domenion Security is committed to maintaining
                professional standards, regulatory requirements
                and responsible security practices.
              </p>

            </div>


            <div className="col-lg-6">

              <div className="certification-list">

                <div className="certification-item">

                  <div className="certification-icon">
                    <Award size={23} />
                  </div>

                  <div>
                    <h3>
                      Licensing & Compliance
                    </h3>

                    <p>
                      Security operations aligned with applicable
                      licensing and regulatory requirements.
                    </p>
                  </div>

                  <ArrowUpRight size={18} />

                </div>


                <div className="certification-item">

                  <div className="certification-icon">
                    <Award size={23} />
                  </div>

                  <div>
                    <h3>
                      Professional Standards
                    </h3>

                    <p>
                      A commitment to disciplined operations,
                      training and professional conduct.
                    </p>
                  </div>

                  <ArrowUpRight size={18} />

                </div>


                <div className="certification-item">

                  <div className="certification-icon">
                    <Award size={23} />
                  </div>

                  <div>
                    <h3>
                      BBB Accreditation
                    </h3>

                    <p>
                      Accreditation and certification information
                      can be managed through the company CMS.
                    </p>
                  </div>

                  <ArrowUpRight size={18} />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}
      <section className="about-cta">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <span className="section-label">
                Let's Secure What Matters
              </span>

              <h2>
                Have a security
                <br />
                challenge?
              </h2>

            </div>

            <div className="col-lg-4 mt-4 mt-lg-0">

              <p>
                Tell us about your environment and our team
                can help identify the right security approach.
              </p>

              <Link
                to="/contact"
                className="btn btn-primary"
              >
                Request a Security Quote
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;