import "./CTA.css";
import { ArrowRight, PhoneCall } from "lucide-react";

function CTA() {
  return (
    <section className="services-cta">

      <div className="cta-overlay"></div>

      <div className="container">

        <div className="row align-items-center gy-5">

          <div className="col-lg-8">

            <span className="section-label text-white">
              GET STARTED TODAY
            </span>

            <h2>
              Ready To Secure
              <br />
              Your Business?
            </h2>

            <p>
              Whether you need on-site security officers, executive
              protection, mobile patrols, cybersecurity, or complete
              enterprise security solutions, our experts are ready to
              help you protect what matters most.
            </p>

          </div>

          <div className="col-lg-4">

            <div className="cta-box">

              <h4>Need Immediate Assistance?</h4>

              <a href="tel:+1234567890" className="cta-phone">

                <PhoneCall size={20} />

                +1 (602) 438-4445

              </a>

              <button className="btn btn-danger w-100 mt-4">

                Request Consultation

                <ArrowRight size={18} />

              </button>

              <button className="btn btn-outline-light w-100 mt-3">

                Explore Services

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;