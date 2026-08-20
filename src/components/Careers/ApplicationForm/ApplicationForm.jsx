import { useState, useEffect } from "react";
import "./ApplicationForm.css";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { careersAPI, applicationsAPI } from "../../../services/api";

function ApplicationForm() {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    careerId: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const fetchPositions = async () => {
    try {
      const response = await careersAPI.getCareers();
      if (response && Array.isArray(response.data)) {
        setPositions(response.data);
      } else if (Array.isArray(response)) {
        setPositions(response);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.fullName || !formData.email || !formData.phone) {
      setSubmitError("Please fill in all required fields (Full Name, Email, Phone Number).");
      return;
    }

    try {
      setSubmitting(true);
      await applicationsAPI.submitApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        careerId: formData.careerId || undefined,
      });

      setSubmitSuccess("Application submitted successfully! Our HR team will reach out shortly.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        careerId: "",
        message: "",
      });
    } catch (err) {
      setSubmitError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="application-form section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <span className="section-label">APPLY TODAY</span>
            <h2 className="section-title">Start Your Security Career</h2>
            <p className="section-description">
              Complete the application below and our recruitment team will contact qualified candidates shortly.
            </p>
          </div>

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

            <form className="career-form" onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Full Name *"
                    value={formData.fullName}
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
                  <select
                    name="careerId"
                    className="form-select"
                    value={formData.careerId}
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="">Select Position (Optional)</option>
                    {positions.map((pos) => (
                      <option key={pos._id} value={pos._id}>
                        {pos.title} ({pos.location || "General"})
                      </option>
                    ))}
                    {positions.length === 0 && (
                      <>
                        <option value="Security Officer">Security Officer</option>
                        <option value="Mobile Patrol Officer">Mobile Patrol Officer</option>
                        <option value="Executive Protection">Executive Protection</option>
                        <option value="Control Room Operator">Control Room Operator</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Tell us about yourself and your security experience..."
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
                        Submit Application
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

export default ApplicationForm;