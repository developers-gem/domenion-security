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

      setSubmitSuccess("REQUEST RECEIVED — Thank you for contacting Domenion Security! Our security representatives have received your request and will follow up shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "Security Guard Services",
        message: "",
      });
    } catch (err) {
      setSubmitError(err.message || "We couldn't submit your request right now. Please try again or contact Domenion directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border" id="contact-form-section">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Promises & Contact Direct Lines */}
          <div className="lg:col-span-5">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">GET IN TOUCH</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  Let's discuss your <span className="text-domenion-gold">security requirements.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-600 font-sans text-base leading-relaxed mb-6">
                  Our security directors and specialists are ready to evaluate your site parameters, analyze operational risks, and recommend a tailored protection strategy.
                </p>
              </Reveal>

              {/* Feature Cards */}
              <div className="space-y-4 mb-6">
                <Reveal direction="up" delay={0.25}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-border">
                    <ShieldCheck size={20} className="text-domenion-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-domenion-blue font-heading text-sm font-bold mb-1">Professional Security Leadership</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">Consult with directors who understand environmental security vectors.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-border">
                    <Clock3 size={20} className="text-domenion-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-domenion-blue font-heading text-sm font-bold mb-1">Rapid Response Window</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">Most quote requests receive a detailed response within 24 hours.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.35}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-border">
                    <Headset size={20} className="text-domenion-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-domenion-blue font-heading text-sm font-bold mb-1">24/7 Operations Oversight</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">Active central dispatch available around the clock.</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Checklist */}
              <div className="space-y-2 mb-6">
                {PROMISES.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-semibold">
                    <CheckCircle2 size={16} className="text-domenion-gold flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct Lines */}
              <div className="pt-4 border-t border-neutral-border flex flex-col gap-2">
                <a href="tel:+16024384445" className="inline-flex items-center gap-2 text-xs font-heading font-bold text-domenion-blue hover:text-domenion-gold transition-colors">
                  <Phone size={15} className="text-domenion-gold" />
                  <span>Call: (602) 438-4445</span>
                </a>
                <a href="mailto:Domenionseurityllc@gmail.com" className="inline-flex items-center gap-2 text-xs font-heading font-bold text-domenion-blue hover:text-domenion-gold transition-colors">
                  <Mail size={15} className="text-domenion-gold" />
                  <span>Email: Domenionseurityllc@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <Reveal direction="left" delay={0.2}>
              <div className="bg-white border border-neutral-border p-8 rounded-2xl shadow-xl">
                <div className="mb-6 pb-4 border-b border-neutral-border">
                  <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">SECURITY CONSULTATION</span>
                  <h3 className="text-domenion-blue font-heading text-2xl font-extrabold mt-1">Request a Security Quote</h3>
                </div>

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
                      <label htmlFor="contact-name" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
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
                      <label htmlFor="contact-email" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
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
                      <label htmlFor="contact-phone" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
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
                      <label htmlFor="contact-company" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                        Company / Property Name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                        placeholder="Acme Real Estate LLC"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                      Primary Security Service Needed
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
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

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                      Security Requirements & Site Overview *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                      placeholder="Please describe your facility type, location, shift hours, and any specific post requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-domenion-gold text-domenion-blue rounded-xl font-heading text-sm font-extrabold tracking-wider uppercase hover:bg-domenion-gold/90 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>SENDING REQUEST...</span>
                      </>
                    ) : (
                      <>
                        <span>REQUEST A SECURITY QUOTE</span>
                        <Send size={15} />
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

