import { Link } from "react-router-dom";
import { ShieldCheck, ChevronRight, LockKeyhole } from "lucide-react";
import Reveal from "../common/Reveal";
import "./AboutHero.css";

export default function AboutHero() {
  return (
    <section className="ds-about-hero-section">
      {/* Background with Dark Navy Gradient */}
      <div
        className="ds-about-hero-bg"
        style={{ backgroundImage: `url(/images/about-hero.jpg)` }}
      />
      <div className="ds-about-hero-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center g-4 lg:g-5">
          {/* Left Column: Story & Headlines */}
          <div className="col-lg-7">
            <div className="ds-about-hero-left">
              {/* Breadcrumb Nav */}
              <Reveal direction="fade">
                <div className="ds-about-breadcrumb">
                  <Link to="/">Home</Link>
                  <ChevronRight size={13} />
                  <span>About Us</span>
                </div>
              </Reveal>

              {/* Eyebrow */}
              <Reveal direction="right" delay={0.1}>
                <div className="ds-about-hero-eyebrow">
                  <ShieldCheck size={15} />
                  <span>ABOUT DOMENION SECURITY</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.2}>
                <h1 className="ds-about-hero-title">
                  Protection built
                  <br />
                  <span className="ds-gold-text">around what matters.</span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.3}>
                <p className="ds-about-hero-description">
                  Dominion Security provides disciplined, comprehensive security solutions
                  designed around the people, property, facilities and critical operations
                  we protect across commercial and enterprise environments.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Editorial Visual Panel */}
          <div className="col-lg-5">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-about-hero-visual-panel">
                {/* Gold Accent Border Layer */}
                <div className="ds-hero-gold-accent-line" />

                <div className="ds-hero-img-frame">
                  <img
                    src="/images/guard-4.jpg"
                    alt="Dominion Security Professional Guard Operations"
                    className="ds-hero-visual-img"
                    onError={(e) => {
                      e.target.src = "/images/about-security.jpg";
                    }}
                  />
                  <div className="ds-hero-img-overlay" />
                </div>

                {/* Floating Information Block */}
                <div className="ds-hero-visual-card">
                  <div className="ds-hero-card-badge">
                    <LockKeyhole size={14} />
                    <span>01</span>
                  </div>
                  <div className="ds-hero-card-info">
                    <strong>PEOPLE • PROPERTY • OPERATIONS</strong>
                    <span>Protected with purpose</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
