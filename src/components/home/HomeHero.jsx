import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LockKeyhole,
} from "lucide-react";

import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { quotesAPI } from "../../services/api";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomeHero.css";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/guard-2.jpg",
    eyebrow: "ENTERPRISE SECURITY SOLUTIONS",
    titleLine1: "Security without",
    titleHighlight: "compromise.",
    description:
      "Comprehensive physical, digital and critical infrastructure security solutions designed to protect people, property, operations and valuable assets.",
    primaryCtaText: "Get a Security Quote",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/services",
  },
  {
    id: 2,
    image: "/images/services/cyber-security/hero.jpg",
    eyebrow: "PROTECTION THAT PERFORMS",
    titleLine1: "Prepared for every",
    titleHighlight: "security challenge.",
    description:
      "From licensed security officers to 24/7 active surveillance, Dominion delivers tailored defense strategies built around your organization.",
    primaryCtaText: "Our Capabilities",
    primaryCtaLink: "/services",
    secondaryCtaText: "Request a Quote",
    secondaryCtaLink: "/contact",
  },
  {
    id: 3,
    image: "/images/company-security.jpg",
    eyebrow: "SECURITY YOU CAN TRUST",
    titleLine1: "Protecting what",
    titleHighlight: "matters most.",
    description:
      "Reliable security personnel, disciplined operational procedures and customized protection for commercial, residential and government environments.",
    primaryCtaText: "Why Dominion",
    primaryCtaLink: "/about",
    secondaryCtaText: "Contact Us",
    secondaryCtaLink: "/contact",
  },
  {
    id: 4,
    image: "/images/data-center-security.jpg",
    eyebrow: "24/7 SECURITY OPERATIONS",
    titleLine1: "Protection that never",
    titleHighlight: "takes a day off.",
    description:
      "Dependable round-the-clock security monitoring, mobile patrols and emergency response teams designed to give you complete peace of mind.",
    primaryCtaText: "Get Protected",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/services",
  },
];

export default function HomeHero() {
  // Quote form state (Preserving existing backend payload structure)
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Physical Security",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!quoteData.name || !quoteData.email || !quoteData.phone) {
      setSubmitError("Please fill in all required fields (Name, Email, Phone).");
      return;
    }

    try {
      setSubmitting(true);
      await quotesAPI.submitQuote({
        name: quoteData.name,
        email: quoteData.email,
        phone: quoteData.phone,
        service: quoteData.service,
        message: quoteData.message,
      });

      setSubmitSuccess(
        "Quote request submitted successfully! Our security team will contact you shortly."
      );
      setQuoteData({
        name: "",
        email: "",
        phone: "",
        service: "Physical Security",
        message: "",
      });
    } catch (err) {
      setSubmitError(
        err.message || "Failed to submit quote request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="ds-hero-section">
      {/* Background Swiper Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        className="ds-hero-swiper"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="ds-hero-slide-inner">
              <div
                className="ds-hero-bg-img"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="ds-hero-overlay" />

              <div className="container position-relative ds-hero-container">
                <div className="row align-items-center g-4 lg:g-5">
                  {/* Left Column: Cinematic Headline & Content */}
                  <div className="col-lg-7">
                    <div className="ds-hero-content">
                      <Reveal direction="fade" delay={0.1}>
                        <div className="ds-hero-eyebrow">
                          <ShieldCheck size={16} />
                          <span>{slide.eyebrow}</span>
                        </div>
                      </Reveal>

                      <Reveal direction="up" delay={0.2}>
                        <h1 className="ds-hero-title">
                          {slide.titleLine1}{" "}
                          <span className="ds-gold-text">
                            {slide.titleHighlight}
                          </span>
                        </h1>
                      </Reveal>

                      <Reveal direction="up" delay={0.3}>
                        <p className="ds-hero-description">
                          {slide.description}
                        </p>
                      </Reveal>

                      <Reveal direction="up" delay={0.4}>
                        <div className="ds-hero-actions">
                          <Button
                            to={slide.primaryCtaLink}
                            variant="primary"
                            size="lg"
                            icon={ArrowRight}
                          >
                            {slide.primaryCtaText}
                          </Button>
                          <Button
                            to={slide.secondaryCtaLink}
                            variant="outline"
                            size="lg"
                          >
                            {slide.secondaryCtaText}
                          </Button>
                        </div>
                      </Reveal>

                      <Reveal direction="up" delay={0.5}>
                        <div className="ds-hero-trust-bar">
                          <div className="ds-trust-item">
                            <ShieldCheck size={20} className="ds-trust-icon" />
                            <div>
                              <strong>Licensed Protection</strong>
                              <span>Verified Security Personnel</span>
                            </div>
                          </div>
                          <div className="ds-trust-item">
                            <Clock3 size={20} className="ds-trust-icon" />
                            <div>
                              <strong>24/7 Operations</strong>
                              <span>Rapid Emergency Response</span>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>

                  {/* Right Column: Floating Security Consultation Quote Form */}
                  <div className="col-lg-5">
                    <Reveal direction="left" delay={0.3}>
                      <div className="ds-hero-quote-card">
                        <div className="ds-quote-card-header">
                          <div className="ds-quote-badge">
                            <LockKeyhole size={14} />
                            <span>SECURITY CONSULTATION</span>
                          </div>
                          <h2>
                            Tell us what you
                            <br />
                            need protected.
                          </h2>
                          <p>
                            Speak with our security specialists for a customized
                            defense strategy.
                          </p>
                        </div>

                        {submitSuccess && (
                          <div
                            className="alert alert-success d-flex align-items-center mb-3 p-2 small"
                            role="alert"
                          >
                            <CheckCircle2 size={16} className="me-2 flex-shrink-0" />
                            <div>{submitSuccess}</div>
                          </div>
                        )}

                        {submitError && (
                          <div
                            className="alert alert-danger d-flex align-items-center mb-3 p-2 small"
                            role="alert"
                          >
                            <AlertCircle size={16} className="me-2 flex-shrink-0" />
                            <div>{submitError}</div>
                          </div>
                        )}

                        <form className="ds-quote-form" onSubmit={handleQuoteSubmit}>
                          <div className="row g-2">
                            <div className="col-md-6">
                              <input
                                type="text"
                                name="name"
                                className="ds-input"
                                placeholder="Your Full Name *"
                                value={quoteData.name}
                                onChange={handleQuoteChange}
                                required
                                disabled={submitting}
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="email"
                                name="email"
                                className="ds-input"
                                placeholder="Email Address *"
                                value={quoteData.email}
                                onChange={handleQuoteChange}
                                required
                                disabled={submitting}
                              />
                            </div>
                            <div className="col-12">
                              <input
                                type="tel"
                                name="phone"
                                className="ds-input"
                                placeholder="Phone Number *"
                                value={quoteData.phone}
                                onChange={handleQuoteChange}
                                required
                                disabled={submitting}
                              />
                            </div>
                            <div className="col-12">
                              <select
                                name="service"
                                className="ds-input ds-select"
                                value={quoteData.service}
                                onChange={handleQuoteChange}
                                disabled={submitting}
                              >
                                <option value="Physical Security">
                                  Physical Security
                                </option>
                                <option value="Data Center Security">
                                  Data Center Security
                                </option>
                                <option value="Cyber Security">
                                  Cyber Security
                                </option>
                                <option value="Mobile Patrol">
                                  Mobile Patrol
                                </option>
                                <option value="Executive Protection">
                                  Executive Protection
                                </option>
                                <option value="Security Consulting">
                                  Security Consulting
                                </option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div className="col-12">
                              <textarea
                                name="message"
                                className="ds-input ds-textarea"
                                rows="3"
                                placeholder="Briefly describe your security requirements..."
                                value={quoteData.message}
                                onChange={handleQuoteChange}
                                disabled={submitting}
                              />
                            </div>
                            <div className="col-12 mt-3">
                              <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                loading={submitting}
                                icon={ArrowRight}
                              >
                                Request a Quote
                              </Button>
                            </div>
                          </div>
                        </form>

                        <div className="ds-quote-phone-footer">
                          <Phone size={14} className="ds-phone-icon" />
                          <span>Immediate Need?</span>
                          <a href="tel:+16024384445">(602) 438-4445</a>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
