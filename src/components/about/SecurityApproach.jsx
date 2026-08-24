import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import "./SecurityApproach.css";

const APPROACH_STAGES = [
  {
    step: "01",
    title: "ASSESS",
    subtitle: "Threat & Vulnerability Audit",
    desc: "We analyze facility layouts, entry points, operational patterns, and specific threat vectors to identify vulnerabilities.",
    icon: Search,
  },
  {
    step: "02",
    title: "PLAN",
    subtitle: "Custom Protection Strategy",
    desc: "Our security directors build post orders, staffing rosters, access control rules, and emergency escalation workflows.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DEPLOY",
    subtitle: "Personnel & Systems On-Site",
    desc: "Licensed security officers, mobile patrol units, and monitoring systems are deployed under strict operational protocols.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Response & Continuous Audit",
    desc: "Active surveillance, daily post logs, incident reporting, and continuous operational optimization ensure lasting security.",
    icon: BadgeCheck,
  },
];

export default function SecurityApproach() {
  return (
    <section className="section ds-approach-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">OUR APPROACH</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                Security isn't one-size-fits-all.
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-approach-desc">
                Effective protection starts with understanding the environment, identifying
                risks, and building a custom operational strategy around the people,
                assets, and operations that matter most.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4-Stage Horizontal / Vertical Timeline */}
        <div className="ds-approach-timeline-wrap">
          <div className="ds-approach-connecting-line" />

          <div className="row g-4">
            {APPROACH_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={stage.step} className="col-md-6 col-lg-3">
                  <Reveal direction="up" delay={0.1 * idx}>
                    <div className="ds-approach-card">
                      <div className="ds-approach-card-top">
                        <span className="ds-approach-num">{stage.step}</span>
                        <div className="ds-approach-icon">
                          <Icon size={20} />
                        </div>
                      </div>

                      <span className="ds-approach-action">{stage.title}</span>
                      <h3 className="ds-approach-subtitle">{stage.subtitle}</h3>
                      <p className="ds-approach-text">{stage.desc}</p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
