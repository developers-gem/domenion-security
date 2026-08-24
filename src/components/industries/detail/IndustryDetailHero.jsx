import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../../common/Button";
import Reveal from "../../common/Reveal";
import "./IndustryDetailHero.css";

export default function IndustryDetailHero({ industry }) {
  const heroImg = industry.heroImage || industry.overviewImage || "/images/company-security.jpg";

  return (
    <section className="ds-ind-detail-hero-section">
      <div
        className="ds-ind-detail-hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="ds-ind-detail-hero-overlay" />

      <div className="container position-relative text-center">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb Nav */}
          <Reveal direction="fade">
            <div className="ds-ind-detail-breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/industries">Industries</Link>
              <ChevronRight size={13} />
              <span>{industry.badge || "Industry Detail"}</span>
            </div>
          </Reveal>

          {/* Eyebrow */}
          <Reveal direction="up" delay={0.1}>
            <div className="ds-ind-detail-eyebrow">
              <ShieldCheck size={15} />
              <span>{industry.badge || "DOMINION INDUSTRY PROTECTION"}</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal direction="up" delay={0.2}>
            <h1 className="ds-ind-detail-title">
              {industry.title}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal direction="up" delay={0.3}>
            <p className="ds-ind-detail-desc">
              {industry.shortDescription || industry.overviewDescription}
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal direction="up" delay={0.4}>
            <div className="ds-ind-detail-actions mt-4">
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Request a Security Quote
              </Button>
              <Button to="/industries" variant="outline-light" size="lg">
                Explore All Sectors
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
