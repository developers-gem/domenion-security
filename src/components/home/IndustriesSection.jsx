import { Link } from "react-router-dom";
import {
  Building2,
  Landmark,
  Truck,
  HardHat,
  Plane,
  HeartPulse,
  ShoppingBag,
  Home as HomeIcon,
  Cpu,
  ArrowRight,
} from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { industries } from "../../data/industries";
import "./IndustriesSection.css";

const INDUSTRY_ICONS = {
  government: Landmark,
  healthcare: HeartPulse,
  commercial: Building2,
  retail: ShoppingBag,
  warehousing: Truck,
  "data-centers": Cpu,
  airports: Plane,
  transportation: Truck,
  construction: HardHat,
  residential: HomeIcon,
};

export default function IndustriesSection() {
  return (
    <section className="section ds-industries-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">INDUSTRIES WE PROTECT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Security tailored to
                <br />
                <span>the environments you operate in.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Every sector faces unique threats, regulatory compliance standards, and
                operational vulnerabilities. Dominion provides custom-tailored security
                programs built around your specific industry.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Sectors Grid */}
        <div className="row g-4">
          {industries.map((ind, index) => {
            const Icon = INDUSTRY_ICONS[ind.slug] || Building2;
            return (
              <div key={ind.slug} className="col-6 col-md-4 col-lg-3">
                <Reveal direction="up" delay={0.05 * index}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="ds-industry-card"
                  >
                    <div className="ds-industry-icon-wrap">
                      <Icon size={24} />
                    </div>

                    <h3 className="ds-industry-title">{ind.title}</h3>

                    <p className="ds-industry-desc">
                      {ind.shortDescription || "Specialized security coverage"}
                    </p>

                    <div className="ds-industry-link">
                      <span>View Sector Details</span>
                      <ArrowRight size={14} className="ds-ind-arrow" />
                    </div>
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-5 text-center">
          <Reveal direction="up" delay={0.4}>
            <Button to="/industries" variant="primary" icon={ArrowRight}>
              Explore All Industry Solutions
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
