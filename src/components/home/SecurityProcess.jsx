import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import "./SecurityProcess.css";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "ASSESS",
    subtitle: "Threat & Risk Audit",
    desc: "We perform a thorough evaluation of your facility, operational vulnerabilities, access points, and specific threat vectors.",
    icon: Search,
  },
  {
    step: "02",
    title: "PLAN",
    subtitle: "Custom Security Strategy",
    desc: "Our security architects design customized protocols, staffing rosters, surveillance coverage, and emergency escalation procedures.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DEPLOY",
    subtitle: "Personnel & Systems On-Site",
    desc: "Licensed security officers and modern monitoring systems are deployed, backed by rigorous post-order enforcement.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Response & Oversight",
    desc: "Continuous surveillance, mobile patrol checks, daily activity reporting, and continuous operational optimization.",
    icon: BadgeCheck,
  },
];

export default function SecurityProcess() {
  return (
    <section className="section ds-process-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">HOW WE PROTECT</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              A disciplined, 4-step security process.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="section-description mt-3">
              From initial risk assessment to 24/7 active protection, our operational
              framework ensures your organization is prepared for every situation.
            </p>
          </Reveal>
        </div>

        {/* 4-Step Timeline Workflow */}
        <div className="ds-process-timeline-wrap">
          <div className="ds-process-connecting-line" />

          <div className="row g-4">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="col-md-6 col-lg-3">
                  <Reveal direction="up" delay={0.1 * idx}>
                    <div className="ds-process-card">
                      <div className="ds-process-badge-wrap">
                        <div className="ds-process-num">{step.step}</div>
                        <div className="ds-process-icon">
                          <Icon size={20} />
                        </div>
                      </div>

                      <span className="ds-process-action">{step.title}</span>
                      <h3 className="ds-process-subtitle">{step.subtitle}</h3>
                      <p className="ds-process-desc">{step.desc}</p>
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
