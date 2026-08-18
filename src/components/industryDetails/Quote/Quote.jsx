import "./Quote.css";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
} from "lucide-react";

function Quote({ industry }) {
  return (
    <section className="industry-quote section">

      <div className="container">

        <div className="row g-5 align-items-center">

          {/* LEFT CONTENT */}

          <div className="col-lg-5">

            <span className="section-label">
              REQUEST A QUOTE
            </span>

            <h2 className="section-title">
              Let's Secure Your
              <br />
              {industry.title}
            </h2>

            <p className="section-description">
              Tell us about your security requirements and our
              specialists will develop a customized protection
              strategy for your organization.
            </p>


            <div className="industry-contact-list">

              <div className="industry-contact-item">

                <Phone size={21} />

                <div>
                  <h5>Call Us</h5>
                  <p>(800) 555-1234</p>
                </div>

              </div>


              <div className="industry-contact-item">

                <Mail size={21} />

                <div>
                  <h5>Email</h5>
                  <p>info@domenionsecurity.com</p>
                </div>

              </div>


              <div className="industry-contact-item">

                <MapPin size={21} />

                <div>
                  <h5>Coverage</h5>
                  <p>Nationwide Coverage Across USA</p>
                </div>

              </div>


              <div className="industry-contact-item">

                <Clock3 size={21} />

                <div>
                  <h5>Availability</h5>
                  <p>24 Hours • 7 Days a Week</p>
                </div>

              </div>

            </div>

          </div>


          {/* FORM */}

          <div className="col-lg-7">

            <form className="industry-quote-card">

              <div className="row g-4">

                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    required
                  />

                </div>


                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    required
                  />

                </div>


                <div className="col-md-6">

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />

                </div>


                <div className="col-md-6">

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />

                </div>


                <div className="col-md-6">

                  <select
                    className="form-select"
                    defaultValue={industry.slug}
                  >

                    <option value={industry.slug}>
                      {industry.title}
                    </option>

                  </select>

                </div>


                <div className="col-md-6">

                  <select
                    className="form-select"
                    defaultValue=""
                  >

                    <option value="" disabled>
                      Select Budget
                    </option>

                    <option value="5k-10k">
                      $5k - $10k
                    </option>

                    <option value="10k-25k">
                      $10k - $25k
                    </option>

                    <option value="25k-plus">
                      $25k+
                    </option>

                  </select>

                </div>


                <div className="col-md-6">

                  <input
                    type="date"
                    className="form-control"
                  />

                </div>


                <div className="col-md-6">

                  <select
                    className="form-select"
                    defaultValue=""
                  >

                    <option value="" disabled>
                      Security Coverage
                    </option>

                    <option value="24-7">
                      24/7 Security
                    </option>

                    <option value="business-hours">
                      Business Hours
                    </option>

                    <option value="custom">
                      Custom Schedule
                    </option>

                  </select>

                </div>


                <div className="col-12">

                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Describe your security requirements..."
                    required
                  />

                </div>


                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-danger btn-lg industry-submit-btn"
                  >

                    <Send
                      size={18}
                      className="me-2"
                    />

                    Request Free Consultation

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

export default Quote;