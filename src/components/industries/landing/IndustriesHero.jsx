import { ShieldCheck, ArrowDown } from "lucide-react";
import Reveal from "../../common/Reveal";
import Button from "../../common/Button";
import "./IndustriesHero.css";

export default function IndustriesHero() {
  const handleScrollToExplorer = () => {
    const el = document.getElementById("industry-explorer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ds-ind-hero-section">
      {/* Full-width Immersive Background Image */}
      <div
        className="ds-ind-hero-bg"
        style={{ backgroundImage: `url(/images/industries/hero-main.jpg)` }}
      />
      <div className="ds-ind-hero-overlay" />

      <div className="container position-relative text-center">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <Reveal direction="fade">
            <div className="ds-ind-hero-eyebrow">
              <ShieldCheck size={16} />
              <span>INDUSTRIES WE PROTECT</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal direction="up" delay={0.1}>
            <h1 className="ds-ind-hero-title">
              Security built for
              <br />
              <span className="ds-gold-text">the environments that matter.</span>
            </h1>
          </Reveal>

          {/* Supporting Text */}
          <Reveal direction="up" delay={0.2}>
            <p className="ds-ind-hero-desc">
              Security requirements change with every environment. Our approach adapts to
              the people, property, critical infrastructure, and operations that need protection.
            </p>
          </Reveal>

          {/* Explore Button */}
          <Reveal direction="up" delay={0.3}>
            <div className="mt-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleScrollToExplorer}
                icon={ArrowDown}
              >
                Explore Sectors & Environments
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
