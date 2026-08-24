import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";
import "./FeaturedServices.css";

const FEATURED_SLUGS = [
  "physical-security",
  "cyber-security",
  "data-center-security",
  "executive-protection",
];

export default function FeaturedServices() {
  const featuredList = FEATURED_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug)
  ).filter(Boolean);

  return (
    <section className="section ds-featured-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">FEATURED CAPABILITIES</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="ds-showcase-title"  >
              Enterprise security solutions,
              <br />
              <span>built for high-risk environments.</span>
            </h2>
          </Reveal>
        </div>

        {/* Alternating Editorial Showcase Blocks */}
        <div className="ds-featured-showcase-wrap">
          {featuredList.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={service.slug} className="ds-featured-showcase-row">
                <div className="row align-items-center g-5">
                  {/* Visual Image Column (Alternates) */}
                  <div className={`col-lg-6 ${isEven ? "order-lg-1" : "order-lg-2"}`}>
                    <Reveal direction={isEven ? "left" : "right"}>
                      <div className="ds-showcase-img-wrap">
                        <img
                          src={service.heroImage || "/images/physical-security.jpg"}
                          alt={service.title}
                          className="ds-showcase-img"
                          onError={(e) => {
                            e.target.src = "/images/company-security.jpg";
                          }}
                        />
                        <div className="ds-showcase-overlay" />
                        <span className="ds-showcase-badge-num">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </Reveal>
                  </div>

                  {/* Content Column (Alternates) */}
                  <div className={`col-lg-6 ${isEven ? "order-lg-2" : "order-lg-1"}`}>
                    <div className="ds-showcase-content">
                      <Reveal direction={isEven ? "right" : "left"} delay={0.1}>
                        <span className="ds-showcase-badge">{service.badge}</span>
                      </Reveal>

                      <Reveal direction={isEven ? "right" : "left"} delay={0.2}>
                        <h3 className="ds-showcase-title">{service.title}</h3>
                      </Reveal>

                      <Reveal direction={isEven ? "right" : "left"} delay={0.3}>
                        <p className="ds-showcase-desc">
                          {service.description ||
                            service.shortDescription ||
                            "Enterprise protection capabilities engineered for mission-critical facilities and assets."}
                        </p>
                      </Reveal>

                      <Reveal direction={isEven ? "right" : "left"} delay={0.4}>
                        <div className="mt-4">
                          <Button
                            to={`/services/${service.slug}`}
                            variant="primary"
                            icon={ArrowRight}
                          >
                            Explore {service.badge}
                          </Button>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
