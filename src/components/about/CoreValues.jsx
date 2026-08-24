import { ShieldCheck, Target, Award, Users } from "lucide-react";
import Reveal from "../common/Reveal";
import "./CoreValues.css";

const VALUES_DATA = [
  {
    num: "01",
    title: "DISCIPLINE",
    subtitle: "Preparation & Rigorous Post Execution",
    desc: "Every operation begins with preparation. Our officers follow post orders with strict attention to duty, appearance, and protocol.",
  },
  {
    num: "02",
    title: "INTEGRITY",
    subtitle: "Accountability & Transparency",
    desc: "We operate with total accountability, clear communication, and unyielding respect for the trust placed in our security team.",
  },
  {
    num: "03",
    title: "RESPONSIBILITY",
    subtitle: "Protection of Life & Assets",
    desc: "We take full ownership of the environments we protect, ensuring proactive risk mitigation and vigilant post coverage.",
  },
  {
    num: "04",
    title: "READINESS",
    subtitle: "24/7 Preparedness & Emergency Alertness",
    desc: "Security threats require immediate action. We maintain 24/7 operational readiness and emergency escalation response.",
  },
  {
    num: "05",
    title: "TRUST",
    subtitle: "Long-Term Client Relationships",
    desc: "We build enduring security partnerships through consistent service delivery, reliable presence, and verified performance.",
  },
  {
    num: "06",
    title: "PROFESSIONALISM",
    subtitle: "High Standards & Continuous Training",
    desc: "Our security personnel receive continuous training in de-escalation, legal compliance, access control, and customer service.",
  },
];

export default function CoreValues() {
  return (
    <section className="section ds-values-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">OUR VALUES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                The principles behind
                <br />
                every protection decision.
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-values-intro-desc">
                Effective security requires more than personnel and surveillance systems.
                It requires a corporate culture built around unyielding accountability,
                thorough preparation, and mutual trust.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial Value List Layout */}
        <div className="row g-4">
          {VALUES_DATA.map((val, idx) => (
            <div key={val.num} className="col-md-6 col-lg-4">
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="ds-value-editorial-card">
                  <div className="ds-val-card-header">
                    <span className="ds-val-num">{val.num}</span>
                    <span className="ds-val-title">{val.title}</span>
                  </div>

                  <h3 className="ds-val-subtitle">{val.subtitle}</h3>
                  <p className="ds-val-desc">{val.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
