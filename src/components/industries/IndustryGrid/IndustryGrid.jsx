import "./IndustryGrid.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { industries } from "../../../data/industries";

function IndustriesGrid() {
  return (
    <section className="industries-grid section">

      <div className="container">

        <div className="row mb-5">

          <div className="col-lg-8">

            <span className="section-label">
              INDUSTRIES WE PROTECT
            </span>

            <h2 className="section-title">
              Security Solutions
              <br />
              Built For Every Industry
            </h2>

            <p className="section-description">
              From government facilities and healthcare organizations
              to critical infrastructure and commercial properties,
              our security teams deliver protection tailored to the
              unique risks of every environment.
            </p>

          </div>

        </div>


        <div className="row g-4">

          {industries.map((industry, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={industry.slug}
            >

              <Link
                to={`/industries/${industry.slug}`}
                className="industry-card"
              >

                <img
                  src={industry.heroImage}
                  alt={industry.title}
                />

                <div className="industry-overlay"></div>

                <div className="industry-content">

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {industry.title}
                  </h3>

                  <div className="industry-link">

                    Explore Industry

                    <ArrowRight size={18} />

                  </div>

                </div>

              </Link>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default IndustriesGrid;