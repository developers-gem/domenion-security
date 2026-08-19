import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import "./Header.css";

import { services } from "../../data/services";
import {industries } from "../../data/industries";

function Header() {
  return (
    <header className="site-header">

      <div className="header-inner">

        {/* ================= LOGO ================= */}

        <Link to="/" className="site-logo">

          <div className="logo-mark">
            D
          </div>

          <div className="logo-text">
            <strong>DOMENION</strong>
            <small>SECURITY SERVICES</small>
          </div>

        </Link>


        {/* ================= DESKTOP NAV ================= */}

        <nav className="desktop-nav">

          <Link to="/" className="nav-link">
            Home
          </Link>


          <Link to="/about" className="nav-link">
            About
          </Link>


          {/* ================= SERVICES ================= */}

          <div className="nav-dropdown">

            <Link
              to="/services"
              className="nav-link nav-dropdown-link"
            >
              Services

              <ChevronDown size={14} />
            </Link>


            <div className="mega-menu services-menu">

              <div className="mega-service-grid">

                {services.map((service, index) => (

                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="industry-service-link"
                  >

                    <span className="service-menu-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="service-menu-title">
                      {service.title}
                    </span>

                    <ChevronRight
                      size={15}
                      className="mega-arrow"
                    />

                  </Link>

                ))}

              </div>

            </div>

          </div>


       {/* ================= INDUSTRIES ================= */}

        <div className="nav-dropdown">

            <Link
              to="/industries"
              className="nav-link nav-dropdown-link"
            >
              Industries

              <ChevronDown size={14} />
            </Link>


            <div className="mega-menu services-menu">

              <div className="mega-service-grid">

                {industries.map((industry, index) => (

                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="industry-service-link"
                  >

                    <span className="service-menu-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="service-menu-title">
                      {industry.title}
                    </span>

                    <ChevronRight
                      size={15}
                      className="mega-arrow"
                    />

                  </Link>

                ))}

              </div>

            </div>

          </div>

{/* <div className="nav-dropdown">

  <Link
    to="/industries"
    className="nav-link nav-dropdown-link"
  >
    Industries
    <ChevronDown size={14} />
  </Link>

  <div className="mega-menu industries-menu">

    <div className="industry-list">

      <Link to="/industries/government">
        Government
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/healthcare">
        Healthcare
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/commercial">
        Commercial
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/retail">
        Retail
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/warehousing">
        Warehousing
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/data-centers">
        Data Centers
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/airports">
        Airports
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/transportation">
        Transportation
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/construction">
        Construction
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/residential">
        Residential
        <ChevronRight size={15} />
      </Link>

      <Link to="/industries/financial-institutions">
        Financial Institutions
        <ChevronRight size={15} />
      </Link>

    </div>

  </div>

</div> */}
          {/* ================= OTHER LINKS ================= */}

          <Link to="/careers" className="nav-link">
            Careers
          </Link>

          <Link to="/contact" className="nav-link">
            Contact
          </Link>

        </nav>


        {/* ================= HEADER ACTION ================= */}

        <div className="header-actions">

          <Link
            to="/contact"
            className="header-quote"
          >
            Request Quote
          </Link>

        </div>


        {/* ================= MOBILE BUTTON ================= */}

        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>

      </div>

    </header>
  );
}

export default Header;