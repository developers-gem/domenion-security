import { useState } from "react";
import "./LocalQuote.css";
import {
  MapPin,
  Building2,
  Shield,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { quotesAPI } from "../../../services/api";

function LocalQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "Security Guards",
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
      setSubmitError("Please fill in all required fields (Name, Email, Phone).");
      return;
    }

    try {
      setSubmitting(true);
      await quotesAPI.submitQuote({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        service: formData.service,
        message: formData.message,
      });

      setSubmitSuccess("Local security quote request submitted successfully! Our regional team will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        service: "Security Guards",
        message: "",
      });
    } catch (err) {
      setSubmitError(err.message || "Failed to submit local quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="local-quote section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Side */}
          <div className="col-lg-5">
            <span className="section-label">REQUEST A QUOTE</span>
            <h2 className="section-title">Find Security Services Near You</h2>
            <p className="section-description">
              Tell us about your location and security requirements. Our local team will prepare a customized protection plan and provide a free consultation.
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

            <form className="quote-form" onSubmit={handleSubmit}>
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
                    name="location"
                    className="form-control"
                    placeholder="City / State"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                <div className="col-12">
                  <select
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="Security Guards">Security Guards</option>
                    <option value="Executive Protection">Executive Protection</option>
                    <option value="Mobile Patrol">Mobile Patrol</option>
                    <option value="Construction Security">Construction Security</option>
                    <option value="Fire Watch">Fire Watch</option>
                    <option value="Event Security">Event Security</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Describe your security requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={submitting}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-danger btn-lg" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="me-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Free Quote
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

export default LocalQuote;