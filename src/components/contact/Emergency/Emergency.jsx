import "./Emergency.css";
import {
  PhoneCall,
  ShieldAlert,
  Clock3,
  ArrowRight,
} from "lucide-react";

function Emergency() {
  return (
    <section className="emergency-section">

      <div className="container">

        <div className="row align-items-center g-4">

          <div className="col-lg-8">

            <span className="emergency-label">

              <ShieldAlert size={18} />

              24/7 Emergency Response

            </span>

            <h2>

              Need Immediate Security Assistance?

            </h2>

            <p>

              Our emergency response teams are available 24 hours a day.
              Whether it's a security breach, emergency guard deployment,
              executive protection or rapid mobile patrol, we're ready.

            </p>

            <div className="emergency-info">

              <div>

                <PhoneCall size={20} />

                <span>(800) 555-1234</span>

              </div>

              <div>

                <Clock3 size={20} />

                <span>Average Response: Under 30 Minutes</span>

              </div>

            </div>

          </div>

          <div className="col-lg-4 text-lg-end">

            <button className="btn btn-light btn-lg">

              Request Immediate Assistance

              <ArrowRight
                size={18}
                className="ms-2"
              />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Emergency;