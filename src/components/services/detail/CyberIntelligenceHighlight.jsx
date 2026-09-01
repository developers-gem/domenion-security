import { Link } from "react-router-dom";
import { ArrowRight, Eye, ShieldCheck, Cpu, Radar } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./CyberIntelligenceHighlight.css";

export default function CyberIntelligenceHighlight() {
  return (
    <section className="section ds-cyber-intel-section">
      <div className="container">
        <div className="ds-cyber-intel-card">
          <div className="row align-items-center g-4 lg:g-5">
            <div className="col-lg-7">
              <div className="ds-cyber-intel-content">
                <Reveal direction="fade">
                  <div className="ds-cyber-intel-eyebrow">
                    <Radar size={16} className="ds-gold-icon" />
                    <span>HIGHLIGHTED CYBER CAPABILITY</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h3 className="ds-cyber-intel-title">
                    INTELLIGENCE GATHERING <span className="ds-gold-text">SECURITY</span>
                  </h3>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="ds-cyber-intel-desc">
                    Positioned directly within our Cyber Security framework, Intelligence Gathering Security provides proactive open-source intelligence (OSINT), threat reconnaissance, digital asset surveillance, and corporate counter-surveillance.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="ds-cyber-intel-features">
                    <div className="ds-intel-feat-item">
                      <ShieldCheck size={18} className="ds-gold-icon" />
                      <span>Proactive OSINT Reconnaissance</span>
                    </div>
                    <div className="ds-intel-feat-item">
                      <Cpu size={18} className="ds-gold-icon" />
                      <span>Cyber Threat Intelligence Integration</span>
                    </div>
                    <div className="ds-intel-feat-item">
                      <Eye size={18} className="ds-gold-icon" />
                      <span>Corporate Counter-Surveillance</span>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.4}>
                  <div className="mt-4">
                    <Link
                      to="/services/intelligence-gathering-security"
                      className="ds-cyber-intel-btn"
                    >
                      <span>Explore Intelligence Gathering Detail</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="col-lg-5">
              <Reveal direction="left" delay={0.2}>
                <div className="ds-cyber-intel-visual">
                  <div className="ds-intel-badge-box">
                    <Radar size={32} className="ds-gold-icon" />
                    <h4>Strategic Cyber Intelligence</h4>
                    <p>Threat detection beyond perimeter defenses.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
