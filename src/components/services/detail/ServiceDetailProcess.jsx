import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./ServiceDetailProcess.css";

const PROCESS_STAGES = [
  {
    step: "01",
    action: "UNDERSTAND",
    title: "Environment & Requirements",
    desc: "We analyze your facility, access points, shift hours, and operational risk factors.",
    icon: Search,
  },
  {
    step: "02",
    action: "ASSESS",
    title: "Risk & Vulnerability Audit",
    desc: "Our security directors audit entry vectors, threat vulnerabilities, and compliance needs.",
    icon: ClipboardList,
  },
  {
    step: "03",
    action: "IMPLEMENT",
    title: "Post Orders & Personnel",
    desc: "We establish custom post orders, deploy licensed guards, and integrate surveillance monitoring.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    action: "PROTECT",
    title: "24/7 Oversight & Dispatch",
    desc: "Active post coverage, daily log reporting, incident escalation, and ongoing security audits.",
    icon: BadgeCheck,
  },
];

export default function ServiceDetailProcess({ service }) {
  return (
    <section className="section ds-detail-proc-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">OUR PROCESS</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              A clear approach to
              <br />
              <span>security planning.</span>
            </h2>
          </Reveal>
        </div>

        {/* Horizontal Timeline on Desktop / Vertical on Mobile */}
        <div className="ds-detail-proc-timeline">
          <div className="ds-detail-proc-connecting-line" />

          <div className="row g-4">
            {PROCESS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={stage.step} className="col-md-6 col-lg-3">
                  <Reveal direction="up" delay={0.08 * idx}>
                    <div className="ds-proc-stage-card">
                      <div className="ds-proc-card-top">
                        <span className="ds-proc-step-num">{stage.step}</span>
                        <div className="ds-proc-icon">
                          <Icon size={18} />
                        </div>
                      </div>

                      <span className="ds-proc-action">{stage.action}</span>
                      <h3 className="ds-proc-title">{stage.title}</h3>
                      <p className="ds-proc-desc">{stage.desc}</p>
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
