import { useState } from "react";
import "./ContactForm.css";
import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Headset,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { contactAPI } from "../../../services/api";

const features = [
  "Free Security Consultation",
  "24/7 Emergency Response",
  "Nationwide Coverage",
  "Licensed & Certified Officers",
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Security Guard Services",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitError("Please fill in all required fields (Name, Email, Phone, and Message).");
      return;
    }

    try {
      setSubmitting(true);
      await contactAPI.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitSuccess("Thank you! Your contact request has been received. A security representative will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "Security Guard Services",
        message: "",
      });
    } catch (err) {
      setSubmitError(err.message || "Failed to submit contact request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section section">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Left */}
          <div className="col-lg-5">
            <span className="section-label">GET IN TOUCH</span>
            <h2 className="section-title">Let's Secure Your Business</h2>
            <p className="section-description">
              Our specialists are ready to understand your security requirements and recommend the right protection strategy.
            </p>

            <div className="contact-feature">
              <ShieldCheck size={26} />
              <div>
                <h5>Professional Security Experts</h5>
                <p>Experienced consultants helping businesses of every size.</p>
              </div>
            </div>

            <div className="contact-feature">
              <Clock3 size={26} />
              <div>
                <h5>Fast Response Time</h5>
                <p>Most inquiries receive a response within one business day.</p>
              </div>
            </div>

            <div className="contact-feature">
              <Headset size={26} />
              <div>
                <h5>24/7 Customer Support</h5>
                <p>Emergency assistance available around the clock.</p>
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
            {submitSuccess && (
              <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                <CheckCircle2 size={20} className="me-2" />
                <div>{submitSuccess}</div>
              </div>
            )}

            {submitError && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <AlertCircle size={20} className="me-2" />
                <div>{submitError}</div>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                <div className="col-12">
                  <select
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="Security Guard Services">Security Guard Services</option>
                    <option value="Executive Protection">Executive Protection</option>
                    <option value="Mobile Patrol">Mobile Patrol</option>
                    <option value="Risk Assessment">Risk Assessment</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    name="message"
                    rows="6"
                    className="form-control"
                    placeholder="Tell us about your security requirements... *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button className="btn btn-danger btn-lg" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="me-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="ms-2" />
                      </>
                    )}
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