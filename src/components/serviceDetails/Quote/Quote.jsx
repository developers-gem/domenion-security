import "./Quote.css";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
} from "lucide-react";

function Quote({ service }) {
  return (
    <section className="service-quote section">

      <div className="container">

        <div className="row g-5 align-items-center">

          {/* LEFT */}

          <div className="col-lg-5">

            <span className="section-label">
              REQUEST A QUOTE
            </span>

            <h2 className="section-title">
              Let's Secure Your Business Today
            </h2>

            <p className="section-description">
              Need help with <strong>{service.title}</strong>? Tell us about
              your requirements and our specialists will prepare a customized
              security solution.
            </p>

            <div className="contact-box">
              <Phone size={22} />
              <div>
                <h5>Call Us</h5>
                <p>(602) 438-4445</p>
              </div>
            </div>

            <div className="contact-box">
              <Mail size={22} />
              <div>
                <h5>Email</h5>
                <p>DomenionSecurityLLC@gmail.com</p>
              </div>
            </div>

            <div className="contact-box">
              <MapPin size={22} />
              <div>
                <h5>Office</h5>
                <p>Nationwide Coverage Across USA</p>
              </div>
            </div>

            <div className="contact-box">
              <Clock3 size={22} />
              <div>
                <h5>Availability</h5>
                <p>24 Hours • 7 Days a Week</p>
              </div>
            </div>

          </div>

          {/* RIGHT */}

          <div className="col-lg-7">

            <form className="quote-card">

              <div className="row g-4">

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Company Name"
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
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option value={service.slug}>
                      {service.title}
                    </option>

                  </select>

                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option>Select Budget</option>
                    <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k+</option>

                  </select>

                </div>

                <div className="col-md-6">

                  <input
                    type="date"
                    className="form-control"
                  />

                </div>

                <div className="col-md-6">

                  <input
                    type="file"
                    className="form-control"
                  />

                </div>

                <div className="col-12">

                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder={`Tell us about your ${service.title} requirements...`}
                  />

                </div>

                <div className="col-12">

                  <button
                    className="btn btn-danger btn-lg"
                    type="submit"
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