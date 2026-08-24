import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ServicesApproach.css";

const STAGES = [
  {
    step: "01",
    title: "ASSESS",
    subtitle: "Risk Evaluation",
    desc: "Comprehensive threat analysis and facility risk audit.",
    icon: Search,
  },
  {
    step: "02",
    title: "PLAN",
    subtitle: "Post Orders Design",
    desc: "Customized security strategy and access control protocols.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DEPLOY",
    subtitle: "On-Site Guards & Systems",
    desc: "Licensed officers and monitoring technology active on site.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Active Oversight",
    desc: "Continuous monitoring, rapid response, and daily post reporting.",
    icon: BadgeCheck,
  },
];

export default function ServicesApproach() {
  return (
    <section className="section ds-serv-approach-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">OUR APPROACH</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              A security strategy built
              <br />
              <span>around your environment.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-Stage Process Timeline */}
        <div className="ds-serv-approach-timeline">
          <div className="ds-serv-connecting-line" />

          <div className="row g-4">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={stage.step} className="col-md-6 col-lg-3">
                  <Reveal direction="up" delay={0.1 * idx}>
                    <div className="ds-serv-approach-card">
                      <div className="ds-serv-card-top">
                        <span className="ds-serv-step-num">{stage.step}</span>
                        <div className="ds-serv-step-icon">
                          <Icon size={18} />
                        </div>
                      </div>

                      <span className="ds-serv-step-action">{stage.title}</span>
                      <h3 className="ds-serv-step-title">{stage.subtitle}</h3>
                      <p className="ds-serv-step-desc">{stage.desc}</p>
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
