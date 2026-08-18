import "./LocalQuote.css";
import {
  MapPin,
  Building2,
  Shield,
  Send,
} from "lucide-react";

function LocalQuote() {
  return (
    <section className="local-quote section">

      <div className="container">

        <div className="row align-items-center g-5">

          {/* Left Side */}

          <div className="col-lg-5">

            <span className="section-label">
              REQUEST A QUOTE
            </span>

            <h2 className="section-title">
              Find Security Services
              Near You
            </h2>

            <p className="section-description">

              Tell us about your location and security requirements.
              Our local team will prepare a customized protection plan
              and provide a free consultation.

            </p>

            <div className="quote-feature">

              <MapPin size={24} />

              <div>

                <h5>Local Security Teams</h5>

                <p>Fast deployment from the nearest regional office.</p>

              </div>

            </div>

            <div className="quote-feature">

              <Building2 size={24} />

              <div>

                <h5>Customized Protection</h5>

                <p>Solutions tailored for your industry and property.</p>

              </div>

            </div>

            <div className="quote-feature">

              <Shield size={24} />

              <div>

                <h5>Licensed Professionals</h5>

                <p>Experienced officers with verified credentials.</p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-7">

            <form className="quote-form">

              <div className="row g-4">

                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />

                </div>

                <div className="col-md-6">

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                  />

                </div>

                <div className="col-md-6">

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                  />

                </div>

                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="City / State"
                  />

                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option>Select Service</option>

                    <option>Security Guards</option>

                    <option>Executive Protection</option>

                    <option>Mobile Patrol</option>

                    <option>Construction Security</option>

                    <option>Fire Watch</option>

                    <option>Event Security</option>

                  </select>

                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option>Property Type</option>

                    <option>Commercial</option>

                    <option>Residential</option>

                    <option>Healthcare</option>

                    <option>Warehouse</option>

                    <option>Retail</option>

                    <option>Government</option>

                  </select>

                </div>

                <div className="col-12">

                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Describe your security requirements..."
                  ></textarea>

                </div>

                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-danger btn-lg"
                  >

                    Get Free Quote

                    <Send
                      size={18}
                      className="ms-2"
                    />

                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LocalQuote;