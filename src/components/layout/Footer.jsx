import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import Reveal from "../common/Reveal";

/**
 * Domenion Security Enterprise Footer Component.
 * Styled purely with Tailwind CSS (Clean Domenion Blue Theme).
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-domenion-blue text-white pt-16 pb-8 border-t border-domenion-gold/20 relative z-10"
      role="contentinfo"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= FOOTER MAIN ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* COLUMN 1: BRAND */}
          <div className="lg:col-span-4">
            <Reveal direction="up">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="flex flex-col leading-none w-fit"
                  aria-label="Domenion Security Home"
                >
                  <span className="text-white font-heading text-2xl font-extrabold tracking-wider">
                    DOMENION
                  </span>
                  <span className="text-domenion-gold font-heading text-xs font-bold tracking-[0.25em] mt-1">
                    SECURITY
                  </span>
                </Link>

                <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                  Professional security solutions designed to protect people,
                  property, infrastructure and critical information across
                  commercial and enterprise environments.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-wider uppercase hover:text-white transition-colors w-fit mt-2"
                >
                  <span>REQUEST A SECURITY QUOTE</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* COLUMN 2: SERVICES */}
          <div className="lg:col-span-2">
            <Reveal direction="up" delay={0.1}>
              <div className="flex flex-col gap-3">
                <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase mb-1">
                  SERVICES
                </span>
                <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-sm">
                  <li>
                    <Link
                      to="/services/physical-security"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Physical Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/cyber-security"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Cyber Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/data-center-security"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Data Center Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/airport-security"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Airport Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/executive-protection"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Executive Protection
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/mobile-patrol"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Mobile Patrol
                    </Link>
                  </li>
                </ul>

                <Link
                  to="/services"
                  className="text-domenion-gold font-heading text-xs font-bold hover:text-white transition-colors mt-2 inline-block no-underline"
                >
                  VIEW ALL SERVICES →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div className="lg:col-span-2">
            <Reveal direction="up" delay={0.2}>
              <div className="flex flex-col gap-3">
                <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase mb-1">
                  COMPANY
                </span>
                <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-sm">
                  <li>
                    <Link
                      to="/about"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/industries"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Industries
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/service-areas"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Service Areas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-white/80 hover:text-domenion-gold transition-colors font-medium"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* COLUMN 4: CONTACT */}
          <div className="lg:col-span-4">
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-col gap-4">
                <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase mb-1">
                  CONTACT
                </span>

                <a
                  href="tel:+16024384445"
                  className="flex items-start gap-3 text-white hover:text-domenion-gold transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-white/10 text-domenion-gold grid place-items-center flex-shrink-0 group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col">
                    <small className="text-[10px] text-domenion-gold font-bold tracking-wider uppercase">
                      CALL US 24/7
                    </small>
                    <strong className="text-sm font-bold font-heading">
                      (602) 438-4445
                    </strong>
                  </div>
                </a>

                <a
                  href="mailto:Domenionseurityllc@gmail.com"
                  className="flex items-start gap-3 text-white hover:text-domenion-gold transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-white/10 text-domenion-gold grid place-items-center flex-shrink-0 group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <small className="text-[10px] text-domenion-gold font-bold tracking-wider uppercase">
                      EMAIL INQUIRIES
                    </small>
                    <strong className="text-sm font-bold font-heading">
                      Domenionseurityllc@gmail.com
                    </strong>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-white">
                  <div className="w-8 h-8 rounded bg-white/10 text-domenion-gold grid place-items-center flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div className="flex flex-col">
                    <small className="text-[10px] text-domenion-gold font-bold tracking-wider uppercase">
                      NATIONWIDE COVERAGE
                    </small>
                    <strong className="text-sm font-bold font-heading">
                      Licensed, Bonded & 50-State Coverage
                    </strong>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ================= NEWSLETTER BAR ================= */}
        <Reveal direction="up" delay={0.4}>
          <div className="bg-white/5 border border-domenion-gold/30 rounded-xl p-6 sm:p-8 mb-12 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-1 max-w-xl text-center lg:text-left">
              <span className="text-domenion-gold font-heading text-[11px] font-extrabold tracking-widest uppercase">
                SECURITY INSIGHTS
              </span>
              <h3 className="text-white font-heading text-xl font-bold">
                Stay informed on security risk trends.
              </h3>
              <p className="text-white/75 text-xs sm:text-sm">
                Get quarterly security analysis and threat briefs delivered to
                your inbox.
              </p>
            </div>

            <form
              className="flex items-center gap-2 w-full lg:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you! Security insights newsletter subscription confirmed.",
                );
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address for security newsletter"
                className="px-4 py-3 rounded bg-white text-domenion-blue placeholder-gray-500 font-sans text-sm outline-none focus:ring-2 focus:ring-domenion-gold w-full lg:w-72"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 rounded bg-domenion-gold text-domenion-blue font-heading font-extrabold text-sm hover:bg-domenion-gold-hover transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer hover:translate-y-0.5 active:translate-y-0.5 "
              >
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </Reveal>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70 font-heading">
          <p>© {currentYear} Domenion Security. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <Link
              to="/privacy-policy"
              className="hover:text-domenion-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-domenion-gold">•</span>
            <Link
              to="/terms"
              className="hover:text-domenion-gold transition-colors"
            >
              Terms & Conditions
            </Link>
            <span className="text-domenion-gold">•</span>
            <Link
              to="/accessibility"
              className="hover:text-domenion-gold transition-colors"
            >
              Accessibility
            </Link>
          </div>

          <div className="flex items-center gap-3 text-domenion-gold font-bold">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-domenion-gold hover:text-domenion-blue transition-colors"
            >
              in
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-domenion-gold hover:text-domenion-blue transition-colors"
            >
              f
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-domenion-gold hover:text-domenion-blue transition-colors"
            >
              ig
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
