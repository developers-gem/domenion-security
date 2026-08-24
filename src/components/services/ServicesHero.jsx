import { Link } from "react-router-dom";
import { ShieldCheck, ChevronRight, LockKeyhole } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ServicesHero.css";

export default function ServicesHero() {
  return (
    <section className="ds-services-hero-section">
      <div
        className="ds-services-hero-bg"
        style={{ backgroundImage: `url(/images/security-hero.jpg)` }}
      />
      <div className="ds-services-hero-overlay" />

      <div className="container position-relative">
        <div className="row align-items-center g-4 lg:g-5">
          {/* Left Column: Headlines & Story */}
          <div className="col-lg-7">
            <div className="ds-services-hero-left">
              {/* Breadcrumb Nav */}
              <Reveal direction="fade">
                <div className="ds-services-breadcrumb">
                  <Link to="/">Home</Link>
                  <ChevronRight size={13} />
                  <span>Services</span>
                </div>
              </Reveal>

              {/* Eyebrow */}
              <Reveal direction="right" delay={0.1}>
                <div className="ds-services-hero-eyebrow">
                  <ShieldCheck size={15} />
                  <span>OUR SECURITY SERVICES</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.2}>
                <h1 className="ds-services-hero-title">
                  Protection built
                  <br />
                  <span className="ds-gold-text">around your needs.</span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.3}>
                <p className="ds-services-hero-description">
                  From professional physical security to specialized enterprise defense,
                  Dominion delivers security solutions designed around the environments
                  and operations we protect.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Editorial Visual Panel */}
          <div className="col-lg-5">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-services-hero-visual-panel">
                <div className="ds-services-gold-accent-line" />

                <div className="ds-services-img-frame">
                  <img
                    src="/images/physical-security.jpg"
                    alt="Dominion Security Operations"
                    className="ds-services-visual-img"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="ds-services-img-overlay" />
                </div>

                {/* Floating Information Block */}
                <div className="ds-services-visual-card">
                  <div className="ds-services-card-badge">
                    <LockKeyhole size={14} />
                    <span>14 CAPABILITIES</span>
                  </div>
                  <div className="ds-services-card-info">
                    <strong>PHYSICAL • CYBER • INFRASTRUCTURE</strong>
                    <span>Integrated defense capabilities.</span>
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
