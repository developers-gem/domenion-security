import { ShieldCheck, Clock3, Layers3, MapPinned } from "lucide-react";
import Reveal from "../common/Reveal";
import "./WhyDominion.css";

const FEATURE_BLOCKS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Protection",
    desc: "Vetted, state-licensed security officers trained to enforce post orders with discipline and vigilance.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Rapid Response",
    desc: "Organized emergency response and monitoring designed to contain threats and resolve incidents immediately.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Customized Solutions",
    desc: "Physical guarding, CCTV monitoring, and access control combined into one tailored defense strategy.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Reliable Operations",
    desc: "Scalable security support structured to serve commercial enterprises and multi-location operations.",
  },
];

export default function WhyDominion() {
  return (
    <section className="section ds-why-dominion-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHY DOMINION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Protection backed by
                <br />
                <span>discipline and readiness.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                We combine experienced security personnel, proven operational procedures,
                and modern surveillance technology to deliver complete peace of mind.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Feature Blocks */}
        <div className="row g-4">
          {FEATURE_BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            return (
              <div key={block.num} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="ds-why-dom-card">
                    <div className="ds-why-dom-header">
                      <span className="ds-why-dom-num">{block.num}</span>
                      <div className="ds-why-dom-icon">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="ds-why-dom-title">{block.title}</h3>
                    <p className="ds-why-dom-desc">{block.desc}</p>
                    <div className="ds-why-dom-accent" />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
