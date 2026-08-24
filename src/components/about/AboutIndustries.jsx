import { Link } from "react-router-dom";
import {
  Building2,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Truck,
  Cpu,
  Plane,
  HardHat,
  Home as HomeIcon,
  ArrowRight,
} from "lucide-react";
import Reveal from "../common/Reveal";
import { industries } from "../../data/industries";
import "./AboutIndustries.css";

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

export default function AboutIndustries() {
  return (
    <section className="section ds-about-industries-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHAT WE PROTECT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Security tailored for the environments
                <br />
                <span>that keep your world moving.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Every sector faces unique threat vectors, regulatory compliance standards,
                and operational risks. Dominion designs custom-tailored protection programs
                for critical environments.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Sectors Showcase Grid */}
        <div className="row g-4">
          {industries.map((ind, index) => {
            const Icon = INDUSTRY_ICONS[ind.slug] || Building2;
            return (
              <div key={ind.slug} className="col-6 col-md-4 col-lg-3">
                <Reveal direction="up" delay={0.05 * index}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="ds-about-ind-card"
                  >
                    <div className="ds-about-ind-header">
                      <span className="ds-ind-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="ds-ind-icon">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="ds-ind-title">{ind.title}</h3>
                    <p className="ds-ind-subtext">
                      {ind.shortDescription || "Specialized security coverage"}
                    </p>

                    <div className="ds-ind-link">
                      <span>Explore Sector</span>
                      <ArrowRight size={14} className="ds-ind-arrow-icon" />
                    </div>
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
