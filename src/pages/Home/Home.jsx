import { useState } from "react";
import "./Home.css";
import {
    ArrowRight,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Clock3,
  Layers3,
  MapPinned,
  MapPin,
  Globe2,
  Phone,
  UsersRound,
  Target,
  BadgeCheck,
  Award,
  LockKeyhole,
  FileCheck2,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import { quotesAPI } from "../../services/api";

function Home() {
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
        setSubmitError("Please fill in required fields (Name, Email, Phone).");
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

        setSubmitSuccess("Quote request submitted successfully! Our team will contact you shortly.");
        setQuoteData({ name: "", email: "", phone: "", service: "Physical Security", message: "" });
      } catch (err) {
        setSubmitError(err.message || "Failed to submit quote request. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
        <>
        <main className="home-page">

            {/* ================= HERO ================= */}
            <section className="hero-section">

                <div className="hero-bg">
                    <img
                        src="/images/security-hero.jpg"
                        alt="Domenion Security professional"
                    />
                </div>

                <div className="hero-overlay"></div>

                <div className="container position-relative">
                    <div className="row align-items-center g-5">

                        {/* LEFT CONTENT */}
                        <div className="col-lg-7">

                            <div className="hero-eyebrow">
                                <ShieldCheck size={15} />
                                <span>ENTERPRISE SECURITY SOLUTIONS</span>
                            </div>

                            <h1 className="hero-title">
                                Security without
                                <span> compromise.</span>
                            </h1>

                            <p className="hero-description">
                                Comprehensive physical, digital and critical infrastructure
                                security solutions designed to protect what matters most.
                            </p>

                            <div className="hero-actions">

                                <Link to="/contact" className="hero-btn hero-btn-primary">
                                    Get a Security Quote
                                    <ArrowRight size={17} />
                                </Link>

                                <Link to="/services" className="hero-btn hero-btn-outline">
                                    Explore Services
                                    <ArrowRight size={17} />
                                </Link>

                            </div>

                            <div className="hero-trust">

                                <div className="hero-trust-item">
                                    <ShieldCheck size={19} />
                                    <div>
                                        <strong>Professional Protection</strong>
                                        <span>Security solutions built around your needs</span>
                                    </div>
                                </div>

                                <div className="hero-trust-item">
                                    <Clock3 size={19} />
                                    <div>
                                        <strong>Rapid Response</strong>
                                        <span>Dependable protection when it matters</span>
                                    </div>
                                </div>

                            </div>

                        </div>


                        {/* QUOTE FORM */}
                        <div className="col-lg-5">

                            <div className="hero-quote-card">

                                <div className="quote-card-heading">
                                    <span>SECURITY CONSULTATION</span>

                                    <h2>
                                        Tell us what
                                        <br />
                                        you need protected.
                                    </h2>

                                    <p>
                                        Speak with our security team about a solution
                                        tailored to your organization.
                                    </p>
                                </div>

                                {submitSuccess && (
                                    <div className="alert alert-success d-flex align-items-center mb-3 p-2 small" role="alert">
                                        <CheckCircle2 size={16} className="me-2 flex-shrink-0" />
                                        <div>{submitSuccess}</div>
                                    </div>
                                )}

                                {submitError && (
                                    <div className="alert alert-danger d-flex align-items-center mb-3 p-2 small" role="alert">
                                        <AlertCircle size={16} className="me-2 flex-shrink-0" />
                                        <div>{submitError}</div>
                                    </div>
                                )}

                                <form className="quote-form" onSubmit={handleQuoteSubmit}>

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name *"
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
                                                value={quoteData.service}
                                                onChange={handleQuoteChange}
                                                disabled={submitting}
                                            >
                                                <option value="Physical Security">Physical Security</option>
                                                <option value="Data Center Security">Data Center Security</option>
                                                <option value="Cyber Security">Cyber Security</option>
                                                <option value="Mobile Patrol">Mobile Patrol</option>
                                                <option value="Executive Protection">Executive Protection</option>
                                                <option value="Security Consulting">Security Consulting</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <textarea
                                                name="message"
                                                rows="4"
                                                placeholder="Tell us about your security requirements"
                                                value={quoteData.message}
                                                onChange={handleQuoteChange}
                                                disabled={submitting}
                                            ></textarea>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="quote-submit" disabled={submitting}>
                                                {submitting ? (
                                                    <>
                                                        <Loader2 size={16} className="me-2 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Request a Quote
                                                        <ArrowRight size={17} />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </div>

                                </form>


                                <div className="quote-phone">
                                    <Phone size={15} />

                                    <span>
                                        Need immediate assistance?
                                    </span>

                                    <a href="tel:+18000000000">
                                        Call Our Security Team
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="hero-scroll">
                    <span>SCROLL TO EXPLORE</span>
                    <div></div>
                </div>

            </section>

            {/* ================= COMPANY INTRODUCTION ================= */}
            <section className="company-intro">

                <div className="container">

                    <div className="row align-items-center g-5">

                        {/* IMAGE */}
                        <div className="col-lg-6">

                            <div className="company-intro-visual">

                                <img
                                    src="/images/company-security.jpg"
                                    alt="Domenion Security professional"
                                />

                                <div className="company-intro-accent"></div>

                                <div className="company-intro-badge">
                                    <span>01</span>
                                    <strong>
                                        Security
                                        <br />
                                        Without
                                        <br />
                                        Compromise.
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* CONTENT */}
                        <div className="col-lg-6">

                            <div className="company-intro-content">

                                <span className="section-label">
                                    About Domenion
                                </span>

                                <h2 className="section-title">
                                    Protection built
                                    <br />
                                    <span>around what matters.</span>
                                </h2>

                                <p className="company-intro-lead">
                                    Domenion Security provides comprehensive security solutions
                                    designed to protect people, property, infrastructure and
                                    information in an increasingly complex world.
                                </p>

                                <p>
                                    From professional security officers and mobile patrol teams
                                    to critical infrastructure, data center and cybersecurity
                                    solutions, our approach combines experienced personnel,
                                    modern technology and disciplined security practices.
                                </p>


                                {/* TRUST POINTS */}
                                <div className="company-intro-points">

                                    <div className="company-intro-point">
                                        <span>01</span>

                                        <div>
                                            <h3>Experienced Protection</h3>

                                            <p>
                                                Professional security solutions built around
                                                real-world operational requirements.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="company-intro-point">
                                        <span>02</span>

                                        <div>
                                            <h3>Integrated Capabilities</h3>

                                            <p>
                                                Physical, digital and specialized security
                                                capabilities working together.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="company-intro-point">
                                        <span>03</span>

                                        <div>
                                            <h3>Security-Minded Approach</h3>

                                            <p>
                                                A proactive approach focused on prevention,
                                                preparedness and response.
                                            </p>
                                        </div>
                                    </div>

                                </div>


                                <Link
                                    to="/about"
                                    className="company-intro-link"
                                >
                                    Learn More About Domenion
                                    <ArrowRight size={17} />
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= WHY CHOOSE DOMENION ================= */}
            <section className="why-domenion-section">
                <div className="container">

                    {/* SECTION HEADER */}
                    <div className="row align-items-end mb-5">

                        <div className="col-lg-7">
                            <span className="section-label">
                                Why Choose Domenion
                            </span>

                            <h2 className="why-domenion-title">
                                Security that goes
                                <br />
                                <span>beyond protection.</span>
                            </h2>
                        </div>

                        <div className="col-lg-5 mt-4 mt-lg-0">
                            <p className="why-domenion-intro">
                                We combine experienced security professionals, proven
                                processes and modern technology to create protection
                                strategies built around the unique needs of every client.
                            </p>
                        </div>

                    </div>


                    {/* FEATURE CARDS */}
                    <div className="row g-0 why-domenion-cards">

                        {/* CARD 01 */}
                        <div className="col-lg-3 col-md-6">

                            <article className="why-card">

                                <div className="d-flex justify-content-between align-items-start">

                                    <span className="why-number">
                                        01
                                    </span>

                                    <div className="why-icon">
                                        <Shield size={25} strokeWidth={1.5} />
                                    </div>

                                </div>

                                <div className="why-card-content">

                                    <h3>
                                        Professional
                                        <br />
                                        Security Teams
                                    </h3>

                                    <p>
                                        Trained security professionals focused on
                                        maintaining a dependable and disciplined
                                        security presence.
                                    </p>

                                </div>

                                <div className="why-arrow">
                                    <ArrowRight size={18} />
                                </div>

                            </article>

                        </div>


                        {/* CARD 02 */}
                        <div className="col-lg-3 col-md-6">

                            <article className="why-card">

                                <div className="d-flex justify-content-between align-items-start">

                                    <span className="why-number">
                                        02
                                    </span>

                                    <div className="why-icon">
                                        <Clock3 size={25} strokeWidth={1.5} />
                                    </div>

                                </div>

                                <div className="why-card-content">

                                    <h3>
                                        Responsive
                                        <br />
                                        Security
                                    </h3>

                                    <p>
                                        Security solutions designed for fast,
                                        organized and dependable response when
                                        situations demand action.
                                    </p>

                                </div>

                                <div className="why-arrow">
                                    <ArrowRight size={18} />
                                </div>

                            </article>

                        </div>


                        {/* CARD 03 */}
                        <div className="col-lg-3 col-md-6">

                            <article className="why-card">

                                <div className="d-flex justify-content-between align-items-start">

                                    <span className="why-number">
                                        03
                                    </span>

                                    <div className="why-icon">
                                        <Layers3 size={25} strokeWidth={1.5} />
                                    </div>

                                </div>

                                <div className="why-card-content">

                                    <h3>
                                        Integrated
                                        <br />
                                        Capabilities
                                    </h3>

                                    <p>
                                        Physical, digital and specialized security
                                        capabilities working together as one
                                        coordinated solution.
                                    </p>

                                </div>

                                <div className="why-arrow">
                                    <ArrowRight size={18} />
                                </div>

                            </article>

                        </div>


                        {/* CARD 04 */}
                        <div className="col-lg-3 col-md-6">

                            <article className="why-card">

                                <div className="d-flex justify-content-between align-items-start">

                                    <span className="why-number">
                                        04
                                    </span>

                                    <div className="why-icon">
                                        <MapPinned size={25} strokeWidth={1.5} />
                                    </div>

                                </div>

                                <div className="why-card-content">

                                    <h3>
                                        Nationwide
                                        <br />
                                        Coverage
                                    </h3>

                                    <p>
                                        Scalable security support designed to serve
                                        organizations across locations and operational
                                        environments.
                                    </p>

                                </div>

                                <div className="why-arrow">
                                    <ArrowRight size={18} />
                                </div>

                            </article>

                        </div>

                    </div>


                    {/* BOTTOM CTA */}
                    <div className="row mt-5 pt-4">

                        <div className="col-12">

                            <div className="why-bottom-cta">

                                <div>
                                    <span>
                                        SECURITY-FIRST. CLIENT-FOCUSED.
                                    </span>

                                    <h3>
                                        A security partner built around your needs.
                                    </h3>
                                </div>

                                <Link
                                    to="/contact"
                                    className="btn btn-primary"
                                >
                                    Talk To Our Team
                                    <ArrowRight size={17} />
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            

            {/* ================= SECURITY CATEGORIES ================= */}
            <section className="security-categories-section">
                <div className="container">

                    {/* HEADER */}
                    <div className="row align-items-end security-categories-header">

                        <div className="col-lg-7">
                            <span className="section-label">
                                Security Capabilities
                            </span>

                            <h2 className="security-categories-title">
                                Protection for
                                <br />
                                <span>every environment.</span>
                            </h2>
                        </div>

                        <div className="col-lg-5 mt-4 mt-lg-0">
                            <p className="security-categories-description">
                                From physical protection to critical infrastructure and
                                digital security, Domenion delivers specialized solutions
                                designed for the environments you operate in.
                            </p>
                        </div>

                    </div>


                    {/* FEATURED SERVICE */}
                    <div className=" adjust row mt-5">

                        <div className="col-12">

                            <Link
                                to="/services/physical-security"
                                className="security-featured-card"
                            >

                                <img
                                    src="/images/physical-security.jpg"
                                    alt="Physical Security"
                                />

                                <div className="security-featured-overlay"></div>

                                <div className="security-featured-content">

                                    <div>
                                        <span className="security-service-number">
                                            01
                                        </span>

                                        <span className="security-service-label">
                                            PHYSICAL SECURITY
                                        </span>

                                        <h3>
                                            Professional protection
                                            <br />
                                            where it matters most.
                                        </h3>

                                        <p>
                                            Armed and unarmed guards, commercial security,
                                            residential protection, construction security,
                                            retail security and event security.
                                        </p>
                                    </div>

                                    <span className="security-explore">
                                        Explore Physical Security
                                        <ArrowRight size={18} />
                                    </span>

                                </div>

                            </Link>

                        </div>

                    </div>


                    {/* SERVICE GRID */}
                    <div className="row g-0 security-service-grid">

                        {/* DATA CENTER */}
                        <div className="col-lg-4 col-md-6">

                            <Link
                                to="/services/data-center-security"
                                className="security-service-card"
                            >

                                <img
                                    src="/images/data-center-security.jpg"
                                    alt="Data Center Security"
                                />

                                <div className="security-service-overlay"></div>

                                <div className="security-service-content">

                                    <div className="d-flex justify-content-between">
                                        <span className="security-service-number">
                                            02
                                        </span>

                                        <ArrowRight
                                            className="security-card-arrow"
                                            size={20}
                                        />
                                    </div>

                                    <div className="security-service-bottom">

                                        <span className="security-service-label">
                                            DATA CENTER SECURITY
                                        </span>

                                        <h3>
                                            Critical infrastructure
                                            protection.
                                        </h3>

                                        <p>
                                            Access control, physical monitoring,
                                            facility protection and security operations.
                                        </p>

                                    </div>

                                </div>

                            </Link>

                        </div>


                        {/* CYBER */}
                        <div className="col-lg-4 col-md-6">

                            <Link
                                to="/services/cyber-security"
                                className="security-service-card"
                            >

                                <img
                                    src="/images/cyber-security.jpg"
                                    alt="Cyber Security"
                                />

                                <div className="security-service-overlay"></div>

                                <div className="security-service-content">

                                    <div className="d-flex justify-content-between">
                                        <span className="security-service-number">
                                            03
                                        </span>

                                        <ArrowRight
                                            className="security-card-arrow"
                                            size={20}
                                        />
                                    </div>

                                    <div className="security-service-bottom">

                                        <span className="security-service-label">
                                            CYBER SECURITY
                                        </span>

                                        <h3>
                                            Defending your
                                            digital environment.
                                        </h3>

                                        <p>
                                            Network security, endpoint protection,
                                            threat detection and security monitoring.
                                        </p>

                                    </div>

                                </div>

                            </Link>

                        </div>


                        {/* MOBILE PATROL */}
                        <div className="col-lg-4 col-md-6">

                            <Link
                                to="/services/mobile-patrol"
                                className="security-service-card"
                            >

                                <img
                                    src="/images/mobile-patrol.jpg"
                                    alt="Mobile Patrol"
                                />

                                <div className="security-service-overlay"></div>

                                <div className="security-service-content">

                                    <div className="d-flex justify-content-between">
                                        <span className="security-service-number">
                                            04
                                        </span>

                                        <ArrowRight
                                            className="security-card-arrow"
                                            size={20}
                                        />
                                    </div>

                                    <div className="security-service-bottom">

                                        <span className="security-service-label">
                                            MOBILE PATROL
                                        </span>

                                        <h3>
                                            Visible presence.
                                            Rapid response.
                                        </h3>

                                        <p>
                                            Vehicle patrol, alarm response, night patrol
                                            and incident reporting.
                                        </p>

                                    </div>

                                </div>

                            </Link>

                        </div>

                    </div>


                    {/* BOTTOM SERVICE LINK */}
                    <div className="text-center mt-5">

                        <Link
                            to="/services"
                            className="btn btn-dark"
                        >
                            View All Security Services
                            <ArrowRight size={17} />
                        </Link>

                    </div>

                </div>
            </section>

            {/* ================= INDUSTRIES SERVED ================= */}
            <section className="industries-section">
                <div className="container">

                    {/* HEADER */}
                    <div className="row align-items-end mb-5">

                        <div className="col-lg-7">
                            <span className="section-label">
                                Industries We Protect
                            </span>

                            <h2 className="industries-title">
                                Security expertise
                                <br />
                                <span>across industries.</span>
                            </h2>
                        </div>

                        <div className="col-lg-5 mt-4 mt-lg-0">
                            <p className="industries-description">
                                Domenion Security provides specialized protection for
                                organizations operating in demanding, high-value and
                                security-sensitive environments.
                            </p>
                        </div>

                    </div>


                    {/* INDUSTRY SHOWCASE */}
                    <div className="row g-0 industries-showcase">

                        {/* LEFT LIST */}
                        <div className="col-lg-5">

                            <div className="industry-list">

                                <Link
                                    to="/industries/government"
                                    className="industry-item active"
                                >
                                    <div>
                                        <span>01</span>
                                        <h3>Government</h3>
                                    </div>

                                    <ArrowUpRight size={21} />
                                </Link>


                                <Link
                                    to="/industries/healthcare"
                                    className="industry-item"
                                >
                                    <div>
                                        <span>02</span>
                                        <h3>Healthcare</h3>
                                    </div>

                                    <ArrowUpRight size={21} />
                                </Link>


                                <Link
                                    to="/industries/data-centers"
                                    className="industry-item"
                                >
                                    <div>
                                        <span>03</span>
                                        <h3>Data Centers</h3>
                                    </div>

                                    <ArrowUpRight size={21} />
                                </Link>


                                <Link
                                    to="/industries/commercial"
                                    className="industry-item"
                                >
                                    <div>
                                        <span>04</span>
                                        <h3>Commercial</h3>
                                    </div>

                                    <ArrowUpRight size={21} />
                                </Link>


                                <Link
                                    to="/industries/transportation"
                                    className="industry-item"
                                >
                                    <div>
                                        <span>05</span>
                                        <h3>Transportation</h3>
                                    </div>

                                    <ArrowUpRight size={21} />
                                </Link>


                                <Link
                                    to="/industries/construction"
                                    className="industry-item"
                                >
                                    <div>
                                        <span>06</span>
                                        <h3>Construction</h3>
                                    </div>

                                    <ArrowUpRight size={21} />
                                </Link>

                            </div>

                        </div>


                        {/* RIGHT IMAGE */}
                        <div className="col-lg-7">

                            <div className="industry-feature">

                                <img
                                    src="/images/industries-security.jpg"
                                    alt="Domenion Security protecting critical industries"
                                />

                                <div className="industry-feature-overlay"></div>

                                <div className="industry-feature-content">

                                    <span>
                                        GOVERNMENT SECURITY
                                    </span>

                                    <h3>
                                        Protecting critical
                                        <br />
                                        operations.
                                    </h3>

                                    <p>
                                        Security solutions designed for government facilities,
                                        sensitive environments and organizations requiring
                                        disciplined protection.
                                    </p>

                                    <Link
                                        to="/industries/government"
                                        className="industry-feature-link"
                                    >
                                        Explore Industry
                                        <ArrowRight size={17} />
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ALL INDUSTRIES */}
                    <div className="row mt-5">

                        <div className="col-12">

                            <div className="industries-bottom">

                                <div>
                                    <span>PROTECTION WITHOUT LIMITS</span>

                                    <p>
                                        Government • Healthcare • Commercial • Retail •
                                        Warehousing • Data Centers • Airports • Transportation
                                        • Construction • Residential • Financial Institutions
                                    </p>
                                </div>

                                <Link
                                    to="/industries"
                                    className="btn btn-primary"
                                >
                                    View All Industries
                                    <ArrowRight size={17} />
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

        {/* ================= SECURITY STATISTICS ================= */}
<section className="security-stats-section">
  <div className="container">

    <div className="row align-items-center mb-5">

      <div className="col-lg-6">
        <span className="section-label">
          Domenion By The Numbers
        </span>

        <h2 className="security-stats-title">
          Built around
          <br />
          <span>trust and readiness.</span>
        </h2>
      </div>

      <div className="col-lg-6 mt-4 mt-lg-0">
        <p className="security-stats-description">
          Our security approach combines experienced professionals,
          responsive operations and scalable solutions to support
          organizations across demanding environments.
        </p>
      </div>

    </div>


    {/* STATS */}
    <div className="row g-0 security-stats-grid">

      {/* 01 */}
      <div className="col-lg-3 col-md-6">

        <div className="security-stat">

          <span className="security-stat-number">
            24<span>/7</span>
          </span>

          <div className="security-stat-line"></div>

          <h3>
            Security
            <br />
            Readiness
          </h3>

          <p>
            Prepared to support your security requirements
            around the clock.
          </p>

        </div>

      </div>


      {/* 02 */}
      <div className="col-lg-3 col-md-6">

        <div className="security-stat">

          <span className="security-stat-number">
            10<span>+</span>
          </span>

          <div className="security-stat-line"></div>

          <h3>
            Industry
            <br />
            Environments
          </h3>

          <p>
            Specialized capabilities across diverse
            operational environments.
          </p>

        </div>

      </div>


      {/* 03 */}
      <div className="col-lg-3 col-md-6">

        <div className="security-stat">

          <span className="security-stat-number">
            01
          </span>

          <div className="security-stat-line"></div>

          <h3>
            Integrated
            <br />
            Partner
          </h3>

          <p>
            One trusted security partner for multiple
            protection requirements.
          </p>

        </div>

      </div>


      {/* 04 */}
      <div className="col-lg-3 col-md-6">

        <div className="security-stat">

          <span className="security-stat-number">
            US
          </span>

          <div className="security-stat-line"></div>

          <h3>
            Nationwide
            <br />
            Coverage
          </h3>

          <p>
            Scalable security support designed for
            organizations across locations.
          </p>

        </div>

      </div>

    </div>


    {/* TRUST BAR */}
    <div className="row mt-5">

      <div className="col-12">

        <div className="security-trust-bar">

          <div className="d-flex align-items-center gap-3">

            <div className="security-trust-icon">
              <ShieldCheck size={20} strokeWidth={1.6} />
            </div>

            <div>
              <span>
                SECURITY-FIRST APPROACH
              </span>

              <p>
                Protection designed around your people,
                property, infrastructure and information.
              </p>
            </div>

          </div>

          <Link
            to="/contact"
            className="security-trust-link"
          >
            Discuss Your Security Needs
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

    </div>

  </div>
</section>

{/* ================= COVERAGE AREAS ================= */}
<section className="coverage-section">
  <div className="container">

    <div className="row align-items-end mb-5">

      <div className="col-lg-7">
        <span className="section-label">
          Coverage Areas
        </span>

        <h2 className="coverage-title">
          Local expertise.
          <br />
          <span>National reach.</span>
        </h2>
      </div>

      <div className="col-lg-5 mt-4 mt-lg-0">
        <p className="coverage-description">
          Domenion Security is positioned to support organizations
          across regional markets while maintaining a scalable
          approach for nationwide security requirements.
        </p>
      </div>

    </div>


    {/* COVERAGE SHOWCASE */}
    <div className="row g-0 coverage-showcase">

      {/* LEFT CONTENT */}
      <div className="col-lg-5">

        <div className="coverage-locations">

          <div className="coverage-location active">

            <div className="coverage-location-top">

              <span className="coverage-number">
                01
              </span>

              <MapPin size={19} />

            </div>

            <div>
              <span className="coverage-state">
                ARIZONA
              </span>

              <h3>
                Arizona Operations
              </h3>

              <p>
                Security solutions supporting commercial,
                government, residential and critical environments.
              </p>
            </div>

          </div>


          <div className="coverage-location">

            <div className="coverage-location-top">

              <span className="coverage-number">
                02
              </span>

              <MapPin size={19} />

            </div>

            <div>
              <span className="coverage-state">
                CALIFORNIA
              </span>

              <h3>
                California Operations
              </h3>

              <p>
                Scalable protection for organizations operating
                across demanding environments.
              </p>
            </div>

          </div>


          <div className="coverage-location">

            <div className="coverage-location-top">

              <span className="coverage-number">
                03
              </span>

              <Globe2 size={19} />

            </div>

            <div>
              <span className="coverage-state">
                NATIONWIDE
              </span>

              <h3>
                Nationwide Coverage
              </h3>

              <p>
                Built with a scalable model for organizations
                requiring security support across multiple locations.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT VISUAL */}
      <div className="col-lg-7">

        <div className="coverage-map">

          <div className="coverage-map-grid"></div>

          <div className="coverage-map-glow"></div>

          {/* Decorative USA-style silhouette */}
          <div className="usa-outline">
            <span className="usa-line line-1"></span>
            <span className="usa-line line-2"></span>
            <span className="usa-line line-3"></span>
            <span className="usa-line line-4"></span>
            <span className="usa-line line-5"></span>
            <span className="usa-line line-6"></span>
          </div>


          {/* Arizona */}
          <div className="map-point map-point-arizona">

            <span className="map-point-pulse"></span>

            <span className="map-point-dot"></span>

            <div className="map-point-label">
              <strong>ARIZONA</strong>
              <small>ACTIVE COVERAGE</small>
            </div>

          </div>


          {/* California */}
          <div className="map-point map-point-california">

            <span className="map-point-pulse"></span>

            <span className="map-point-dot"></span>

            <div className="map-point-label">
              <strong>CALIFORNIA</strong>
              <small>ACTIVE COVERAGE</small>
            </div>

          </div>


          {/* Nationwide */}
          <div className="coverage-map-center">

            <ShieldCheck
              size={27}
              strokeWidth={1.4}
            />

            <span>
              NATIONWIDE
            </span>

            <small>
              SECURITY CAPABILITIES
            </small>

          </div>


          <div className="coverage-map-caption">
            DOMENION SECURITY
            <span>•</span>
            NATIONAL COVERAGE READY
          </div>

        </div>

      </div>

    </div>


    {/* CTA */}
    <div className="row mt-5">

      <div className="col-12">

        <div className="coverage-cta">

          <div>
            <span>
              NEED SECURITY OUTSIDE OUR CURRENT MARKETS?
            </span>

            <h3>
              Let's discuss your coverage requirements.
            </h3>
          </div>

          <Link
            to="/contact"
            className="btn btn-primary"
          >
            Request Coverage
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

    </div>

  </div>
</section>

{/* ================= TESTIMONIALS ================= */}
<section className="testimonials-section">
  <div className="container">

    <div className="row align-items-end mb-5">

      <div className="col-lg-7">
        <span className="section-label">
          Client Perspective
        </span>

        <h2 className="testimonials-title">
          Trusted when
          <br />
          <span>security matters most.</span>
        </h2>
      </div>

      <div className="col-lg-5 mt-4 mt-lg-0">
        <p className="testimonials-description">
          Strong security relationships are built on reliability,
          responsiveness and confidence. Here's what our clients
          value about working with Domenion Security.
        </p>
      </div>

    </div>


    {/* FEATURED TESTIMONIAL */}
    <div className="testimonial-feature">

      <div className="row g-0 align-items-stretch">

        {/* QUOTE */}
        <div className="col-lg-8">

          <div className="testimonial-main">

            <div className="testimonial-quote-mark">
              “
            </div>

            <blockquote>
              Domenion Security provides the professionalism,
              responsiveness and level of attention we expect
              from a trusted security partner.
            </blockquote>

            <div className="testimonial-author">

              <div className="testimonial-author-avatar">
                DS
              </div>

              <div>
                <strong>
                  Security Operations Director
                </strong>

                <span>
                  Commercial Client
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* SIDE TRUST PANEL */}
        <div className="col-lg-4">

          <div className="testimonial-trust">

            <span className="testimonial-trust-label">
              WHY CLIENTS STAY
            </span>

            <div className="testimonial-trust-item">
              <ShieldCheck size={20} />
              <span>Professional Protection</span>
            </div>

            <div className="testimonial-trust-item">
              <Clock3 size={20} />
              <span>Responsive Operations</span>
            </div>

            <div className="testimonial-trust-item">
              <UsersRound size={20} />
              <span>Experienced Personnel</span>
            </div>

            <div className="testimonial-trust-item">
              <Target size={20} />
              <span>Security-Focused Solutions</span>
            </div>

          </div>

        </div>

      </div>

    </div>


    {/* SMALL TESTIMONIALS */}
    <div className="row g-4 mt-4">

      <div className="col-lg-4">

        <div className="testimonial-small">

          <div className="testimonial-stars">
            ★★★★★
          </div>

          <p>
            “The team has consistently demonstrated
            professionalism and attention to detail.”
          </p>

          <div className="testimonial-small-author">
            <span>01</span>
            <div>
              <strong>Operations Manager</strong>
              <small>Enterprise Client</small>
            </div>
          </div>

        </div>

      </div>


      <div className="col-lg-4">

        <div className="testimonial-small">

          <div className="testimonial-stars">
            ★★★★★
          </div>

          <p>
            “Their team understands that security is about
            people, preparation and accountability.”
          </p>

          <div className="testimonial-small-author">
            <span>02</span>
            <div>
              <strong>Facility Director</strong>
              <small>Critical Infrastructure</small>
            </div>
          </div>

        </div>

      </div>


      <div className="col-lg-4">

        <div className="testimonial-small">

          <div className="testimonial-stars">
            ★★★★★
          </div>

          <p>
            “A dependable security partner with a clear
            commitment to protecting our operations.”
          </p>

          <div className="testimonial-small-author">
            <span>03</span>
            <div>
              <strong>Security Manager</strong>
              <small>Commercial Client</small>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>

{/* ================= CERTIFICATIONS ================= */}
<section className="certifications-section">
  <div className="container">

    <div className="row align-items-end mb-5">

      <div className="col-lg-7">
        <span className="section-label">
          Trust & Compliance
        </span>

        <h2 className="certifications-title">
          Standards that
          <br />
          <span>support confidence.</span>
        </h2>
      </div>

      <div className="col-lg-5 mt-4 mt-lg-0">
        <p className="certifications-description">
          Security requires more than a uniform. It requires
          accountability, professional standards and a commitment
          to operating responsibly.
        </p>
      </div>

    </div>


    {/* TRUST CARDS */}
    <div className="row g-0 certifications-grid">

      {/* LICENSED */}
      <div className="col-lg-3 col-md-6">

        <div className="certification-card">

          <div className="certification-icon">
            <ShieldCheck
              size={27}
              strokeWidth={1.5}
            />
          </div>

          <span className="certification-number">
            01
          </span>

          <h3>
            Licensed
            <br />
            Security
          </h3>

          <p>
            Professional security operations built around
            applicable licensing and regulatory requirements.
          </p>

          <span className="certification-status">
            COMPLIANCE
          </span>

        </div>

      </div>


      {/* BBB */}
      <div className="col-lg-3 col-md-6">

        <div className="certification-card">

          <div className="certification-icon">
            <BadgeCheck
              size={27}
              strokeWidth={1.5}
            />
          </div>

          <span className="certification-number">
            02
          </span>

          <h3>
            BBB
            <br />
            Accreditation
          </h3>

          <p>
            Business credibility and customer trust information
            can be presented here once verified.
          </p>

          <span className="certification-status">
            VERIFIED DETAILS
          </span>

        </div>

      </div>


      {/* PROFESSIONAL */}
      <div className="col-lg-3 col-md-6">

        <div className="certification-card">

          <div className="certification-icon">
            <Award
              size={27}
              strokeWidth={1.5}
            />
          </div>

          <span className="certification-number">
            03
          </span>

          <h3>
            Professional
            <br />
            Standards
          </h3>

          <p>
            Security personnel and operational standards designed
            around consistent service delivery.
          </p>

          <span className="certification-status">
            QUALITY FOCUSED
          </span>

        </div>

      </div>


      {/* SECURITY */}
      <div className="col-lg-3 col-md-6">

        <div className="certification-card">

          <div className="certification-icon">
            <LockKeyhole
              size={27}
              strokeWidth={1.5}
            />
          </div>

          <span className="certification-number">
            04
          </span>

          <h3>
            Security
            <br />
            First
          </h3>

          <p>
            Protection strategies designed to safeguard people,
            property, infrastructure and information.
          </p>

          <span className="certification-status">
            SECURITY FOCUSED
          </span>

        </div>

      </div>

    </div>


    {/* BOTTOM TRUST BAR */}
    <div className="row mt-5">

      <div className="col-12">

        <div className="certification-bottom">

          <div className="certification-bottom-content">

            <div className="certification-bottom-icon">
              <FileCheck2
                size={22}
                strokeWidth={1.5}
              />
            </div>

            <div>
              <span>
                LICENSING & COMPLIANCE
              </span>

              <p>
                Detailed licensing, certifications and compliance
                documentation can be presented here.
              </p>
            </div>

          </div>

          <Link
            to="/about"
            className="certification-link"
          >
            Learn About Domenion
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

    </div>

  </div>
</section>

{/* ================= LATEST BLOGS ================= */}
<section className="latest-blogs-section">
  <div className="container">

    <div className="row align-items-end mb-5">

      <div className="col-lg-7">
        <span className="section-label">
          Security Insights
        </span>

        <h2 className="latest-blogs-title">
          Knowledge that
          <br />
          <span>keeps you prepared.</span>
        </h2>
      </div>

      <div className="col-lg-5 mt-4 mt-lg-0">

        <p className="latest-blogs-description">
          Explore security insights, industry developments,
          emerging threats and practical guidance from
          the world of professional security.
        </p>

      </div>

    </div>


    {/* BLOG CARDS */}
    <div className="row g-4">


      {/* BLOG 01 */}
      <div className="col-lg-4 col-md-6">

        <article className="blog-card">

          <div className="blog-image">

            <img
              src="/images/blog-security.jpg"
              alt="Professional security officer"
            />

            <span className="blog-category">
              PHYSICAL SECURITY
            </span>

          </div>


          <div className="blog-content">

            <div className="blog-meta">
              <span>SECURITY INSIGHTS</span>
              <span>•</span>
              <span>06 MIN READ</span>
            </div>

            <h3>
              Building a Security Strategy
              for Modern Organizations
            </h3>

            <p>
              Learn how a layered security strategy can help
              organizations protect people, property and
              critical operations.
            </p>

            <Link
              to="/blog"
              className="blog-read-more"
            >
              Read Article
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </article>

      </div>


      {/* BLOG 02 */}
      <div className="col-lg-4 col-md-6">

        <article className="blog-card">

          <div className="blog-image">

            <img
              src="/images/blog-datacenter.jpg"
              alt="Data center security"
            />

            <span className="blog-category">
              DATA CENTER SECURITY
            </span>

          </div>


          <div className="blog-content">

            <div className="blog-meta">
              <span>SECURITY INSIGHTS</span>
              <span>•</span>
              <span>05 MIN READ</span>
            </div>

            <h3>
              Protecting Critical
              Infrastructure
            </h3>

            <p>
              Discover the physical and operational security
              considerations involved in protecting sensitive
              infrastructure and data center environments.
            </p>

            <Link
              to="/blog"
              className="blog-read-more"
            >
              Read Article
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </article>

      </div>


      {/* BLOG 03 */}
      <div className="col-lg-4 col-md-6">

        <article className="blog-card">

          <div className="blog-image">

            <img
              src="/images/blog-risk.jpg"
              alt="Security risk assessment"
            />

            <span className="blog-category">
              RISK ASSESSMENT
            </span>

          </div>


          <div className="blog-content">

            <div className="blog-meta">
              <span>SECURITY INSIGHTS</span>
              <span>•</span>
              <span>07 MIN READ</span>
            </div>

            <h3>
              Why Risk Assessment
              Should Come First
            </h3>

            <p>
              Understand how identifying vulnerabilities early
              can help create a more effective and proactive
              security program.
            </p>

            <Link
              to="/blog"
              className="blog-read-more"
            >
              Read Article
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </article>

      </div>

    </div>


    {/* VIEW ALL */}
    <div className="row mt-5">

      <div className="col-12">

        <div className="blogs-bottom">

          <div>
            <span>
              DOMENION SECURITY JOURNAL
            </span>

            <p>
              Practical insights for a changing security landscape.
            </p>
          </div>

          <Link
            to="/blog"
            className="btn btn-dark"
          >
            View All Insights
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

    </div>

  </div>
</section>

{/* ================= FINAL CONTACT CTA ================= */}
<section className="final-cta-section">
  <div className="container">

    <div className="final-cta-wrapper">

      {/* LEFT */}
      <div className="final-cta-content">

        <span className="section-label">
          Start a Conversation
        </span>

        <h2>
          Your security.
          <br />
          <span>Our responsibility.</span>
        </h2>

        <p>
          Tell us what you need to protect. Our team can help
          identify the right security solution for your people,
          property, operations and critical assets.
        </p>


        <div className="final-cta-actions">

          <Link
            to="/contact"
            className="btn btn-primary"
          >
            Request a Security Quote
            <ArrowRight size={17} />
          </Link>

          <a
            href="tel:+18000000000"
            className="final-phone-link"
          >
            <Phone size={18} />

            <span>
              <small>24/7 SECURITY SUPPORT</small>
              <strong>+1 (602) 438-4445
</strong>
            </span>
          </a>

        </div>

      </div>


      {/* RIGHT */}
      <div className="final-cta-panel">

        <div className="final-cta-panel-icon">
          <ShieldCheck
            size={30}
            strokeWidth={1.4}
          />
        </div>

        <span>
          SECURITY CONSULTATION
        </span>

        <h3>
          Let's build a security
          strategy around your needs.
        </h3>

        <p>
          Commercial security, government protection,
          critical infrastructure, executive protection
          and specialized security services.
        </p>

        <Link
          to="/contact"
          className="final-panel-link"
        >
          Contact Domenion
          <ArrowUpRight size={17} />
        </Link>

      </div>

    </div>


    {/* QUICK CONTACT STRIP */}
    <div className="row g-0 final-contact-strip">

      <div className="col-lg-4 col-md-6">

        <div className="final-contact-item">

          <div className="final-contact-icon">
            <Phone size={19} />
          </div>

          <div>
            <span>CALL US</span>

            <a href="tel:+16024384445">
              +1 (602) 438-4445

            </a>
          </div>

        </div>

      </div>


      <div className="col-lg-4 col-md-6">

        <div className="final-contact-item">

          <div className="final-contact-icon">
            <Mail size={19} />
          </div>

          <div>
            <span>EMAIL US</span>

            <a href="mailto:DomenionSecurityLLC@gmail.com">
              DomenionSecurityLLC@gmail.com
            </a>
          </div>

        </div>

      </div>


      <div className="col-lg-4 col-md-12">

        <div className="final-contact-item">

          <div className="final-contact-icon">
            <MapPin size={19} />
          </div>

          <div>
            <span>COVERAGE</span>

            <strong>
              Arizona • California • Nationwide
            </strong>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>

        </main>
        </>
    );
}

export default Home;