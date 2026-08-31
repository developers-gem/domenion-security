import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./HomeHero.css";

export default function HomeHero() {
  return (
    <section className="ds-hero-section">
      {/* Background Video */}
      <div className="ds-hero-video-wrap">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/company-security.jpg"
          className="ds-hero-video-element"
          src="/videos/hero-bg.mp4"
        />
        <div className="ds-hero-video-overlay" />
      </div>

      {/* Minimal Left-Aligned Text Overlay (No cards, no clutter) */}
      <div className="ds-hero-content-container">
        <div className="ds-hero-content-inner">
          <Reveal direction="fade" delay={0.1}>
            <div className="ds-hero-eyebrow">
              <ShieldCheck size={16} />
              <span>ENTERPRISE SECURITY SOLUTIONS</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h1 className="ds-hero-title">
              Security without{" "}
              <span className="ds-gold-text">compromise.</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="ds-hero-description">
              Comprehensive physical, digital and critical infrastructure security
              solutions designed to protect people, property, operations and valuable assets.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="ds-hero-actions">
              <Button
                to="/services"
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                Explore Services
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
