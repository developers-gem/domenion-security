import { ShieldCheck, Clock3, Layers3, MapPinned } from "lucide-react";
import Reveal from "../common/Reveal";
import "./WhyChooseServices.css";

const DIFFERENTIATORS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Protection",
    desc: "Security solutions built around people, property, and critical enterprise assets.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Rapid Response",
    desc: "Fast, organized security dispatch and monitoring designed to contain threats immediately.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Customized Security",
    desc: "Physical guarding, surveillance, and access control tailored to your post orders.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Operational Readiness",
    desc: "Continuous training, daily activity logs, and 24/7 centralized security dispatch.",
  },
];

export default function WhyChooseServices() {
  return (
    <section className="section ds-why-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHY DOMINION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                Protection that goes
                <br />
                <span>beyond mere presence.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-why-serv-desc">
                We combine experienced security personnel, proven operational post orders,
                and modern surveillance technology to deliver unyielding protection for
                your organization.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Horizontal Differentiator List */}
        <div className="row g-4">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="ds-why-serv-card">
                    <div className="ds-why-serv-top">
                      <span className="ds-why-serv-num">{item.num}</span>
                      <div className="ds-why-serv-icon">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="ds-why-serv-title">{item.title}</h3>
                    <p className="ds-why-serv-text">{item.desc}</p>
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
