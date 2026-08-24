import { Building2, ShieldCheck, Landmark, HardHat, Cpu, Home as HomeIcon } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./ServiceDetailAudience.css";

const AUDIENCE_ENVIRONMENTS = [
  {
    num: "01",
    title: "Commercial & Corporate Real Estate",
    desc: "Office towers, corporate headquarters, and multi-tenant commercial complexes requiring executive access control.",
    icon: Building2,
  },
  {
    num: "02",
    title: "Mission-Critical Infrastructure",
    desc: "Data centers, energy facilities, logistics hubs, and communications infrastructure requiring high-security post orders.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Government & Institutional Facilities",
    desc: "Municipal buildings, public works, civic centers, and educational institutions demanding licensed guard presence.",
    icon: Landmark,
  },
  {
    num: "04",
    title: "Industrial & Construction Sites",
    desc: "Active construction projects, manufacturing plants, and heavy equipment yards vulnerable to theft and trespass.",
    icon: HardHat,
  },
];

export default function ServiceDetailAudience({ service }) {
  return (
    <section className="section ds-detail-aud-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">TARGET ENVIRONMENTS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Engineered for your
                <br />
                <span>specific facility type.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Dominion customizes post orders, guard credentials, and emergency escalation workflows for the operational realities of your environment.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Environment Cards */}
        <div className="row g-4">
          {AUDIENCE_ENVIRONMENTS.map((env, idx) => {
            const Icon = env.icon;
            return (
              <div key={env.num} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.08 * idx}>
                  <div className="ds-aud-env-card">
                    <div className="ds-aud-card-header">
                      <span className="ds-aud-num">{env.num}</span>
                      <div className="ds-aud-icon">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="ds-aud-title">{env.title}</h3>
                    <p className="ds-aud-desc">{env.desc}</p>
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
