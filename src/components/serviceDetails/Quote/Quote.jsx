import { useState } from "react";
import "./Quote.css";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { quotesAPI } from "../../../services/api";

function Quote({ service }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    estimatedBudget: "",
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

    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitError("Please fill in required fields (Name, Email, Phone).");
      return;
    }

    try {
      setSubmitting(true);
      await quotesAPI.submitQuote({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: service?.title || "Security Service",
        estimatedBudget: formData.estimatedBudget,
        message: formData.message,
      });

      setSubmitSuccess(`Quote request for ${service?.title || "Security"} submitted successfully! A representative will contact you shortly.`);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        estimatedBudget: "",
        message: "",
      });
    } catch (err) {
      setSubmitError(err.message || "Failed to submit quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="service-quote section">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* LEFT */}
          <div className="col-lg-5">
            <span className="section-label">REQUEST A QUOTE</span>
            <h2 className="section-title">Let's Secure Your Business Today</h2>
            <p className="section-description">
              Need help with <strong>{service.title}</strong>? Tell us about your requirements and our specialists will prepare a customized security solution.
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

            <form className="quote-card" onSubmit={handleSubmit}>
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
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
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
                  <select className="form-select" disabled>
                    <option value={service.slug}>{service.title}</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <select
                    name="estimatedBudget"
                    className="form-select"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="">Select Budget (Optional)</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k+">$25k+</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder={`Tell us about your ${service.title} requirements...`}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                <div className="col-12">
                  <button className="btn btn-danger btn-lg" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="me-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="me-2" />
                        Request Free Consultation
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

export default Quote;