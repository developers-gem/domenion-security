import { Link } from "react-router-dom";
import { ArrowRight, Server, ShieldCheck, Cpu, LockKeyhole } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import "./DataCenterBanner.css";

export default function DataCenterBanner() {
  return (
    <section className="ds-datacenter-banner-section">
      {/* Visual Background with Dark Navy Overlay */}
      <div className="ds-datacenter-bg-wrap">
        <div
          className="ds-datacenter-bg-img"
          style={{
            backgroundImage: `url(/images/data-center-security.jpg)`,
          }}
        />
        <div className="ds-datacenter-navy-overlay" />
        <div className="ds-datacenter-grid-pattern" />
      </div>

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* Main Headline & Description Panel */}
          <div className="col-lg-7">
            <div className="ds-datacenter-content">
              <Reveal direction="fade">
                <div className="ds-datacenter-eyebrow">
                  <Server size={15} className="ds-gold-icon" />
                  <span>STRATEGIC CAPABILITY</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="ds-datacenter-title">
                  DATA CENTER <span className="ds-gold-highlight">SECURITY</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-datacenter-subtitle">
                  Protecting mission-critical data centers, infrastructure, systems and operations.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="ds-datacenter-desc">
                  Domenion Security provides multi-layered physical and operational security solutions 
                  specifically engineered for high-density data facilities, enterprise server halls, 
                  and mission-critical cloud infrastructure across the United States.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                <div className="ds-datacenter-actions">
                  <Button
                    to="/services/data-center-security"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                  >
                    Explore Data Center Defense
                  </Button>

                  <Link
                    to="/contact"
                    className="ds-datacenter-consult-link"
                  >
                    <span>Request Data Center Assessment</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Strategic Feature Badges Panel */}
          <div className="col-lg-5">
            <Reveal direction="left" delay={0.2}>
              <div className="ds-datacenter-badge-column">
                <div className="ds-dc-feature-box">
                  <div className="ds-dc-box-icon">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4>Multi-Layer Physical Defense</h4>
                    <p>Biometric access control, man-traps, and armed/unarmed perimeter guards.</p>
                  </div>
                </div>

                <div className="ds-dc-feature-box">
                  <div className="ds-dc-box-icon">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4>Mission-Critical Uptime</h4>
                    <p>24/7 continuous operations monitoring preventing unauthorized physical breaches.</p>
                  </div>
                </div>

                <div className="ds-dc-feature-box">
                  <div className="ds-dc-box-icon">
                    <LockKeyhole size={24} />
                  </div>
                  <div>
                    <h4>Compliance Readiness</h4>
                    <p>Meeting SOC 2, ISO 27001, FISMA, and NIST physical security standards.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
