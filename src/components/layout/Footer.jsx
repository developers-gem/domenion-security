import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="container">

        {/* ================= FOOTER MAIN ================= */}
        <div className="row footer-main">

          {/* BRAND */}
          <div className="col-lg-4 col-md-6">

            <div className="footer-brand">

              <Link to="/" className="footer-logo">
                DOMENION
                <span>SECURITY</span>
              </Link>

              <p>
                Professional security solutions designed to protect
                people, property, infrastructure and information.
              </p>

              <Link
                to="/contact"
                className="footer-quote-link"
              >
                Request a Security Quote
                <ArrowUpRight size={17} />
              </Link>

            </div>

          </div>


          {/* SERVICES */}
          <div className="col-lg-2 col-md-6 mt-5 mt-lg-0">

            <div className="footer-column">

              <span className="footer-heading">
                SERVICES
              </span>

              <ul>

                <li>
                  <Link to="/services/physical-security">
                    Physical Security
                  </Link>
                </li>

                <li>
                  <Link to="/services/cyber-security">
                    Cyber Security
                  </Link>
                </li>

                <li>
                  <Link to="/services/data-center-security">
                    Data Center Security
                  </Link>
                </li>

                <li>
                  <Link to="/services/airport-security">
                    Airport Security
                  </Link>
                </li>

                <li>
                  <Link to="/services/executive-protection">
                    Executive Protection
                  </Link>
                </li>

                <li>
                  <Link to="/services/mobile-patrol">
                    Mobile Patrol
                  </Link>
                </li>

              </ul>

            </div>

          </div>


          {/* COMPANY */}
          <div className="col-lg-2 col-md-6 mt-5 mt-lg-0">

            <div className="footer-column">

              <span className="footer-heading">
                COMPANY
              </span>

              <ul>

                <li>
                  <Link to="/about">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/industries">
                    Industries
                  </Link>
                </li>

                <li>
                  <Link to="/service-areas">
                    Service Areas
                  </Link>
                </li>

                <li>
                  <Link to="/careers">
                    Careers
                  </Link>
                </li>

                <li>
                  <Link to="/blog">
                    Security Insights
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Contact
                  </Link>
                </li>

              </ul>

            </div>

          </div>


          {/* CONTACT */}
          <div className="col-lg-4 col-md-6 mt-5 mt-lg-0">

            <div className="footer-column footer-contact">

              <span className="footer-heading">
                CONTACT
              </span>


              <a
                href="tel:+16024384445"
                className="footer-contact-item"
              >

                <Phone size={18} />

                <div>
                  <small>CALL US</small>

                  <strong>
                    (602) 438-4445
                  </strong>
                </div>

              </a>


              <a
                href="mailto:DomenionSecurityLLC@gmail.com"
                className="footer-contact-item"
              >

                <Mail size={18} />

                <div>
                  <small>EMAIL</small>

                  <strong>
                    DomenionSecurityLLC@gmail.com
                  </strong>
                </div>

              </a>


              <div className="footer-contact-item">

                <MapPin size={18} />

                <div>
                  <small>COVERAGE</small>

                  <strong>
                    Arizona • California • Nationwide
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= NEWSLETTER ================= */}
        <div className="footer-newsletter">

          <div>

            <span>
              SECURITY INSIGHTS
            </span>

            <h3>
              Stay informed.
            </h3>

            <p>
              Get security insights and industry updates
              delivered to your inbox.
            </p>

          </div>


          <form
            className="footer-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your interest! Newsletter subscriptions will open soon.");
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />

            <button type="submit">
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>

        </div>


        {/* ================= FOOTER BOTTOM ================= */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Domenion Security.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/accessibility">
              Accessibility
            </Link>

          </div>


          <div className="footer-socials">

            <a href="#" aria-label="LinkedIn">
              in
            </a>

            <a href="#" aria-label="Facebook">
              f
            </a>

            <a href="#" aria-label="Instagram">
              ig
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;