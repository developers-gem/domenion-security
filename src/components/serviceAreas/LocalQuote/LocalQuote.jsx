import { useState } from "react";
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
import Reveal from "../../common/Reveal";

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
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side */}
          <div className="lg:col-span-5">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">REQUEST A QUOTE</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                Find Security Services <span className="text-domenion-gold">Near You</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base leading-relaxed mb-8">
                Tell us about your location and security requirements. Our local team will prepare a customized protection plan and provide a free consultation.
              </p>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal direction="up" delay={0.3}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-domenion-blue font-heading text-base font-bold mb-1">Local Security Teams</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Fast deployment from the nearest regional office.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.35}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h5 className="text-domenion-blue font-heading text-base font-bold mb-1">Customized Protection</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Solutions tailored for your industry and property.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h5 className="text-domenion-blue font-heading text-base font-bold mb-1">Licensed Professionals</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Experienced officers with verified credentials.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.2}>
              <div className="bg-white border border-neutral-border p-8 rounded-2xl shadow-xl">
                {submitSuccess && (
                  <div className="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium">
                    <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                    <div>{submitSuccess}</div>
                  </div>
                )}

                {submitError && (
                  <div className="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm font-medium">
                    <AlertCircle size={20} className="text-rose-600 flex-shrink-0" />
                    <div>{submitError}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                        placeholder="(602) 438-4445"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">City / State</label>
                      <input
                        type="text"
                        name="location"
                        className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                        placeholder="Phoenix, AZ"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">Select Service</label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
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

                  <div>
                    <label className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">Requirement Details</label>
                    <textarea
                      name="message"
                      rows="4"
                      className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                      placeholder="Describe your facility, timeline, and security needs..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={submitting}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-domenion-gold text-domenion-blue rounded-xl font-heading text-sm font-extrabold tracking-wider uppercase hover:bg-domenion-gold/90 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span>Get Free Quote</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalQuote;
