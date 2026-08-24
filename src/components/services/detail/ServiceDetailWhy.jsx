import { ShieldCheck, Clock3, Layers3, MapPinned } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./ServiceDetailWhy.css";

const REASONS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Discipline",
    desc: "Vetted security personnel trained to follow operational post orders with vigilance.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "24/7 Dispatch Readiness",
    desc: "Continuous central monitoring and immediate emergency escalation capabilities.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Tailored Security Planning",
    desc: "Custom protection strategies engineered around your facility's unique threat vector.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Operational Transparency",
    desc: "Daily post activity logs, incident documentation, and continuous performance oversight.",
  },
];

export default function ServiceDetailWhy({ service }) {
  return (
    <section className="section ds-detail-why-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHY DOMINION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                Protection built around
                <br />
                <span>your environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-detail-why-desc">
                Dominion Security combines rigorous personnel selection, standardized post execution, and modern surveillance technology to deliver unyielding protection.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Numbered Differentiator Cards */}
        <div className="row g-4">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.08 * idx}>
                  <div className="ds-detail-why-card">
                    <div className="ds-detail-why-top">
                      <span className="ds-detail-why-num">{item.num}</span>
                      <div className="ds-detail-why-icon">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="ds-detail-why-title">{item.title}</h3>
                    <p className="ds-detail-why-text">{item.desc}</p>
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
