import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./IndustryApproach.css";

const APPROACH_STEPS = [
  {
    step: "01",
    title: "UNDERSTAND",
    subtitle: "Facility & Operational Audit",
    desc: "We analyze shift patterns, visitor volume, access points, and site vulnerabilities.",
    icon: Search,
  },
  {
    step: "02",
    title: "ASSESS",
    subtitle: "Threat Vector Evaluation",
    desc: "Our security directors audit legal compliance, physical risks, and emergency escalation workflows.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DESIGN",
    subtitle: "Custom Post Orders & Rostering",
    desc: "We build tailored security guard post orders, visitor verification rules, and CCTV patrol routes.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Active Oversight",
    desc: "Continuous guard presence, daily post reporting, incident logs, and ongoing operational audits.",
    icon: BadgeCheck,
  },
];

export default function IndustryApproach({ industry }) {
  return (
    <section className="section ds-ind-app-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">OUR APPROACH</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              Security designed around
              <br />
              <span>the environment.</span>
            </h2>
          </Reveal>
        </div>

        {/* Vertical Visual Path */}
        <div className="ds-ind-vertical-path-wrap">
          <div className="ds-ind-vertical-line" />

          <div className="row g-4 justify-content-center">
            {APPROACH_STEPS.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={stage.step} className="col-lg-8">
                  <Reveal direction="up" delay={0.1 * idx}>
                    <div className="ds-ind-path-node-card">
                      <div className="ds-ind-node-num-badge">
                        <span>{stage.step}</span>
                      </div>

                      <div className="ds-ind-node-content">
                        <div className="ds-ind-node-header">
                          <span className="ds-ind-node-action">{stage.title}</span>
                          <h3 className="ds-ind-node-title">{stage.subtitle}</h3>
                        </div>
                        <p className="ds-ind-node-desc">{stage.desc}</p>
                      </div>

                      <div className="ds-ind-node-icon">
                        <Icon size={20} />
                      </div>
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
