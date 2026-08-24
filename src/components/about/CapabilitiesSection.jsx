import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";
import "./CapabilitiesSection.css";

export default function CapabilitiesSection() {
  return (
    <section className="section ds-capabilities-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Visual Image Panel */}
          <div className="col-lg-5">
            <Reveal direction="left">
              <div className="ds-capabilities-visual">
                <img
                  src="/images/physical-security.jpg"
                  alt="Dominion Security Guard Capabilities"
                  className="ds-capabilities-img"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="ds-capabilities-visual-overlay" />
                <div className="ds-capabilities-badge">
                  <ShieldCheck size={18} />
                  <div>
                    <strong>ENTERPRISE PROTECTION</strong>
                    <span>Integrated Defense Services</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Capabilities List */}
          <div className="col-lg-7">
            <div className="ds-capabilities-content">
              <Reveal direction="up">
                <span className="section-label">OUR CAPABILITIES</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  From security officers on the ground
                  <br />
                  <span>to protection behind the scenes.</span>
                </h2>
              </Reveal>

              <div className="ds-capabilities-list mt-4">
                {services.map((service, index) => (
                  <Reveal key={service.slug} direction="up" delay={0.05 * index}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="ds-capability-item"
                    >
                      <span className="ds-cap-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="ds-cap-info">
                        <h3>{service.title}</h3>
                        <p>{service.shortDescription || "Specialized security service"}</p>
                      </div>
                      <ArrowRight size={16} className="ds-cap-arrow" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
