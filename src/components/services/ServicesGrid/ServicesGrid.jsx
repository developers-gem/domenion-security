import "./ServicesGrid.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../../data/services";

function ServicesGrid() {
  return (
    <section className="services-grid section" id="services">

      <div className="container">

        {/* HEADER */}

        <div className="row mb-5">

          <div className="col-lg-8">

            <span className="section-label">
              OUR SERVICES
            </span>

            <h2 className="section-title">
              Complete Security
              <br />
              Solutions Portfolio
            </h2>

          </div>

        </div>


        {/* SERVICES */}

        <div className="row g-4">

          {services.map((item, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={item.slug}
            >

              <Link
                to={`/services/${item.slug}`}
                className="service-box"
              >

                <img
                  src={item.heroImage}
                  alt={item.title}
                />

                <div className="service-overlay"></div>

                <div className="service-content">

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <div className="learn-more">

                    Learn More

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

export default ServicesGrid;