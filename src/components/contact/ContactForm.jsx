import { useState } from "react";
import {
  ShieldCheck,
  Clock3,
  Headset,
  CheckCircle2,
  Send,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";
import { contactAPI } from "../../services/api";
import Reveal from "../common/Reveal";
import "./ContactForm.css";

const PROMISES = [
  "Free Environmental Security Consultation",
  "Fast Response within 1 Business Day",
  "Customized Security Post Orders",
  "Licensed & Certified Security Personnel",
];

export default function ContactForm() {
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setSubmitError("Please fill in all required fields (Name, Email, Phone, and Message).");
      return;
    }

    try {
      setSubmitting(true);
      await contactAPI.submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      });

      setSubmitSuccess("REQUEST RECEIVED — Thank you for contacting Dominion Security! Our security representatives have received your request and will follow up shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "Security Guard Services",
        message: "",
      });
    } catch (err) {
      setSubmitError(err.message || "We couldn't submit your request right now. Please try again or contact Dominion directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section ds-contact-form-section" id="contact-form-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Left Column: Value Promises & Contact Direct Lines */}
          <div className="col-lg-5">
            <div className="ds-cform-left">
              <Reveal direction="up">
                <span className="section-label">GET IN TOUCH</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  Let's discuss your
                  <br />
                  <span>security requirements.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-cform-intro-desc mt-3">
                  Our security directors and specialists are ready to evaluate your site parameters, analyze operational risks, and recommend a tailored protection strategy.
                </p>
              </Reveal>

              {/* Feature Cards */}
              <div className="ds-cform-features mt-4">
                <Reveal direction="up" delay={0.25}>
                  <div className="ds-cform-feature-item">
                    <ShieldCheck size={22} className="ds-cform-feat-icon" />
                    <div>
                      <h4>Professional Security Leadership</h4>
                      <p>Consult with directors who understand environmental security vectors.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-cform-feature-item">
                    <Clock3 size={22} className="ds-cform-feat-icon" />
                    <div>
                      <h4>Rapid Response Window</h4>
                      <p>Most quote requests receive a detailed response within 24 hours.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.35}>
                  <div className="ds-cform-feature-item">
                    <Headset size={22} className="ds-cform-feat-icon" />
                    <div>
                      <h4>24/7 Operations Oversight</h4>
                      <p>Active central dispatch available around the clock.</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Checklist */}
              <div className="ds-cform-checklist mt-4">
                {PROMISES.map((item, idx) => (
                  <div key={idx} className="ds-cform-check-item">
                    <CheckCircle2 size={16} className="ds-check-gold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct Lines */}
              <div className="ds-cform-direct-lines mt-4">
                <a href="tel:+16024384445" className="ds-direct-line-link">
                  <Phone size={15} />
                  <span>Call: (602) 438-4445</span>
                </a>
                <a href="mailto:Domenionseurityllc@gmail.com" className="ds-direct-line-link">
                  <Mail size={15} />
                  <span>Email: Domenionseurityllc@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="col-lg-7">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-cform-card">
                <div className="ds-cform-card-header">
                  <span className="ds-cform-card-eyebrow">SECURITY CONSULTATION</span>
                  <h3 className="ds-cform-card-title">Request a Security Quote</h3>
                </div>

                {submitSuccess && (
                  <div className="ds-cform-alert ds-cform-alert-success">
                    <CheckCircle2 size={18} className="flex-shrink-0" />
                    <span>{submitSuccess}</span>
                  </div>
                )}

                {submitError && (
                  <div className="ds-cform-alert ds-cform-alert-error">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="ds-main-contact-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="contact-name" className="ds-form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        className="ds-input-field"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="contact-email" className="ds-form-label">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className="ds-input-field"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="contact-phone" className="ds-form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        className="ds-input-field"
                        placeholder="(602) 555-0199"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="contact-company" className="ds-form-label">
                        Company / Property Name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        className="ds-input-field"
                        placeholder="Acme Real Estate LLC"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="contact-subject" className="ds-form-label">
                        Primary Security Service Needed
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        className="ds-select-field"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={submitting}
                      >
                        <option value="Security Guard Services">Security Guard Services</option>
                        <option value="Professional Mobile Patrol">Professional Mobile Patrol</option>
                        <option value="Executive Protection">Executive Protection</option>
                        <option value="Data Center Security">Data Center Security</option>
                        <option value="Government Security Services">Government Security Services</option>
                        <option value="Risk Assessment Services">Risk Assessment Services</option>
                        <option value="Enterprise Cyber Security">Enterprise Cyber Security</option>
                        <option value="General Inquiry">General Security Inquiry</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="contact-message" className="ds-form-label">
                        Security Requirements & Site Overview <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        className="ds-textarea-field"
                        placeholder="Please describe your facility type, location, shift hours, and any specific post requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="ds-submit-quote-btn"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin me-2" />
                            <span>SENDING REQUEST...</span>
                          </>
                        ) : (
                          <>
                            <span>REQUEST A SECURITY QUOTE</span>
                            <Send size={15} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
