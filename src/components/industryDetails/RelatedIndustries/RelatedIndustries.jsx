import "./RelatedIndustries.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { industries } from "../../../data/industries";

function RelatedIndustries({ industry }) {

  const related = industries
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 3);

  return (
    <section className="related-industries section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            MORE INDUSTRIES
          </span>

          <h2 className="section-title">
            Explore Other Industries We Protect
          </h2>

          <p className="section-description mx-auto">
            Discover specialized security solutions designed for different
            industries and operational environments.
          </p>

        </div>

        <div className="row g-4">

          {related.map((item) => (

            <div
              className="col-lg-4 col-md-6"
              key={item.slug}
            >

              <Link
                to={`/industries/${item.slug}`}
                className="related-industry-card"
              >

                <img
                  src={item.heroImage}
                  alt={item.title}
                />

                <div className="related-overlay"></div>

                <div className="related-content">

                  <span>
                    {item.badge}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <div className="related-link">

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

export default RelatedIndustries;