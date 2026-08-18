import "./CTA.css";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function CTA({ industry }) {
  return (
    <section className="industry-cta">

      <div className="industry-cta-overlay"></div>

      <div className="container position-relative">

        <div className="row align-items-center g-5">

          {/* LEFT */}

          <div className="col-lg-8">

            <span className="industry-cta-label">

              <ShieldCheck size={17} />

              INDUSTRY SECURITY EXPERTS

            </span>

            <h2>
              Protect Your
              <br />
              <span>{industry?.title || "Organization"}</span>
            </h2>

            <p>
              Get a customized security strategy designed around
              your industry's unique risks, requirements and
              operational environment.
            </p>

          </div>


          {/* RIGHT */}

          <div className="col-lg-4">

            <div className="industry-cta-buttons">

              <Link
                to="/contact"
                className="btn btn-danger btn-lg"
              >

                Request a Quote

                <ArrowRight
                  size={18}
                  className="ms-2"
                />

              </Link>

              <a
                href="tel:18005551234"
                className="btn btn-outline-light btn-lg"
              >

                <PhoneCall
                  size={18}
                  className="me-2"
                />

                Call Us

              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;