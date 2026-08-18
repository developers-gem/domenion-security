import "./ContactForm.css";
import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Headset,
  Send,
} from "lucide-react";

const features = [
  "Free Security Consultation",
  "24/7 Emergency Response",
  "Nationwide Coverage",
  "Licensed & Certified Officers",
];

function ContactForm() {
  return (
    <section className="contact-form-section section">

      <div className="container">

        <div className="row g-5 align-items-center">

          {/* Left */}

          <div className="col-lg-5">

            <span className="section-label">
              GET IN TOUCH
            </span>

            <h2 className="section-title">
              Let's Secure
              Your Business
            </h2>

            <p className="section-description">

              Our specialists are ready to understand your
              security requirements and recommend the right
              protection strategy.

            </p>

            <div className="contact-feature">

              <ShieldCheck size={26} />

              <div>

                <h5>Professional Security Experts</h5>

                <p>
                  Experienced consultants helping businesses of every size.
                </p>

              </div>

            </div>

            <div className="contact-feature">

              <Clock3 size={26} />

              <div>

                <h5>Fast Response Time</h5>

                <p>
                  Most inquiries receive a response within one business day.
                </p>

              </div>

            </div>

            <div className="contact-feature">

              <Headset size={26} />

              <div>

                <h5>24/7 Customer Support</h5>

                <p>
                  Emergency assistance available around the clock.
                </p>

              </div>

            </div>

            <ul className="contact-list">

              {features.map((item, index) => (

                <li key={index}>

                  <CheckCircle2 size={18} />

                  {item}

                </li>

              ))}

            </ul>

          </div>

          {/* Right */}

          <div className="col-lg-7">

            <form className="contact-form">

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
                    placeholder="Company Name"
                  />
                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option>Select Service</option>
                    <option>Security Guard Services</option>
                    <option>Executive Protection</option>
                    <option>Mobile Patrol</option>
                    <option>Risk Assessment</option>
                    <option>Cyber Security</option>

                  </select>

                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option>Estimated Budget</option>
                    <option>$5,000+</option>
                    <option>$10,000+</option>
                    <option>$25,000+</option>
                    <option>$50,000+</option>

                  </select>

                </div>

                <div className="col-12">

                  <textarea
                    rows="6"
                    className="form-control"
                    placeholder="Tell us about your security requirements..."
                  ></textarea>

                </div>

                <div className="col-12">

                  <button className="btn btn-danger btn-lg">

                    Send Message

                    <Send size={18} className="ms-2"/>

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

export default ContactForm;