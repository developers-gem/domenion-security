import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import Reveal from "../common/Reveal";
import "./Footer.css";

/**
 * Dominion Security Enterprise Footer Component.
 * Features deep black (#030810) background, gold typography accents (#c7a45b),
 * 4-column structured layout, newsletter subscription, and dynamic copyright.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* ================= FOOTER MAIN ================= */}
        <div className="row footer-main g-4 lg:g-5">
          {/* COLUMN 1: BRAND */}
          <div className="col-lg-4 col-md-6">
            <Reveal direction="up">
              <div className="footer-brand">
                <Link to="/" className="footer-logo" aria-label="Dominion Security Home">
                  <span className="footer-logo-title">DOMENION</span>
                  <span className="footer-logo-subtitle">SECURITY</span>
                </Link>

                <p className="footer-brand-desc">
                  Professional security solutions designed to protect people, property,
                  infrastructure and critical information across commercial and enterprise environments.
                </p>

                <Link to="/contact" className="footer-quote-link">
                  <span>REQUEST A SECURITY QUOTE</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* COLUMN 2: SERVICES */}
          <div className="col-lg-2 col-md-6 mt-4 mt-md-0">
            <Reveal direction="up" delay={0.1}>
              <div className="footer-column">
                <span className="footer-heading">SERVICES</span>
                <ul>
                  <li>
                    <Link to="/services/physical-security">Physical Security</Link>
                  </li>
                  <li>
                    <Link to="/services/cyber-security">Cyber Security</Link>
                  </li>
                  <li>
                    <Link to="/services/data-center-security">Data Center Security</Link>
                  </li>
                  <li>
                    <Link to="/services/airport-security">Airport Security</Link>
                  </li>
                  <li>
                    <Link to="/services/executive-protection">Executive Protection</Link>
                  </li>
                  <li>
                    <Link to="/services/mobile-patrol">Mobile Patrol</Link>
                  </li>
                </ul>

                <Link to="/services" className="footer-sublink">
                  VIEW ALL SERVICES →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div className="col-lg-2 col-md-6 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <div className="footer-column">
                <span className="footer-heading">COMPANY</span>
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/industries">Industries</Link>
                  </li>
                  <li>
                    <Link to="/service-areas">Service Areas</Link>
                  </li>
                  <li>
                    <Link to="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link to="/blog">Security Insights</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* COLUMN 4: CONTACT */}
          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.3}>
              <div className="footer-column footer-contact">
                <span className="footer-heading">CONTACT</span>

                <a href="tel:+16024384445" className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <Phone size={16} />
                  </div>
                  <div>
                    <small>CALL US 24/7</small>
                    <strong>(602) 438-4445</strong>
                  </div>
                </a>

                <a href="mailto:Domenionseurityllc@gmail.com" className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <small>EMAIL INQUIRIES</small>
                    <strong>Domenionseurityllc@gmail.com</strong>
                  </div>
                </a>

                <div className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <small>NATIONWIDE COVERAGE</small>
                    <strong>Licensed, Bonded & 50-State Coverage</strong>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ================= NEWSLETTER BAR ================= */}
        <Reveal direction="up" delay={0.4}>
          <div className="footer-newsletter">
            <div className="footer-newsletter-text">
              <span className="footer-newsletter-label">SECURITY INSIGHTS</span>
              <h3>Stay informed on security risk trends.</h3>
              <p>Get quarterly security analysis and threat briefs delivered to your inbox.</p>
            </div>

            <form
              className="footer-newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Security insights newsletter subscription confirmed.");
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address for security newsletter"
                required
              />
              <button type="submit">
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </Reveal>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="footer-bottom">
          <p>© {currentYear} Domenion Security. All rights reserved.</p>

          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-dot">•</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="footer-dot">•</span>
            <Link to="/accessibility">Accessibility</Link>
          </div>

          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;