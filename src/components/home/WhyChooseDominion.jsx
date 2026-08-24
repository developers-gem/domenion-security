import { ShieldCheck, Clock3, Layers3, MapPinned, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./WhyChooseDominion.css";

const WHY_CARDS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional\nSecurity Teams",
    desc: "Rigorous background vetting and continuous training ensure highly disciplined, professional officers on site.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Rapid Response\n& 24/7 Operations",
    desc: "Fast, organized security dispatch and monitoring designed to contain threats and resolve incidents immediately.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Integrated\nCapabilities",
    desc: "Physical guarding, CCTV monitoring, access control, and cybersecurity working together as one defense strategy.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Nationwide\nCoverage",
    desc: "Scalable security support structured to serve commercial enterprises, critical sites, and multi-location operations.",
  },
];

export default function WhyChooseDominion() {
  return (
    <section className="section ds-why-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHY CHOOSE DOMENION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Security built on
                <br />
                <span>discipline, readiness and trust.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                We combine experienced security professionals, proven operational
                procedures, and modern surveillance technology to deliver complete
                peace of mind.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Pillar Cards */}
        <div className="row g-4">
          {WHY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={card.num} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="ds-why-card">
                    <div className="ds-why-card-top">
                      <span className="ds-why-num">{card.num}</span>
                      <div className="ds-why-icon">
                        <Icon size={24} />
                      </div>
                    </div>

                    <h3 className="ds-why-card-title">{card.title}</h3>

                    <p className="ds-why-card-desc">{card.desc}</p>

                    <div className="ds-why-card-border-glow" />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-5">
          <Reveal direction="up" delay={0.4}>
            <div className="ds-why-bottom-banner">
              <div>
                <span className="ds-banner-sub">SECURITY-FIRST. CLIENT-FOCUSED.</span>
                <h3>A security partner built around your operational needs.</h3>
              </div>
              <Button to="/contact" variant="primary" icon={ArrowRight}>
                Talk To Our Team
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
