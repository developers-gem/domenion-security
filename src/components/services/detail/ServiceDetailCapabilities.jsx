import { CheckCircle2, ShieldCheck } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./ServiceDetailCapabilities.css";

export default function ServiceDetailCapabilities({ service }) {
  const panelImg = service.overviewImage || service.benefitsImage || service.heroImage || "/images/physical-security.jpg";
  const benefitsList = service.benefits || [
    "Licensed & background-verified security personnel",
    "Tailored post orders & operational procedures",
    "24/7 security dispatch & monitoring oversight",
    "Integrated access control & visitor verification",
    "Proactive risk mitigation & daily activity logs",
    "Rapid emergency incident management",
  ];

  return (
    <section className="section ds-detail-caps-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Visual Image Panel */}
          <div className="col-lg-5">
            <Reveal direction="left">
              <div className="ds-detail-caps-visual">
                <img
                  src={panelImg}
                  alt={service.title}
                  className="ds-caps-img"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="ds-caps-overlay" />
                <div className="ds-caps-badge">
                  <ShieldCheck size={18} />
                  <div>
                    <strong>{service.badge || "SECURITY CAPABILITY"}</strong>
                    <span>Verified Operational Excellence</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Capabilities & Benefits Checklist */}
          <div className="col-lg-7">
            <div className="ds-detail-caps-content">
              <Reveal direction="up">
                <span className="section-label">KEY CAPABILITIES</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  {service.benefitsTitle || "Engineered for maximum protection & peace of mind."}
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="mt-3 text-secondary-custom">
                  {service.benefitsDescription ||
                    `Our structured ${service.title} approach ensures your organization maintains continuous oversight, regulatory compliance, and rapid threat response.`}
                </p>
              </Reveal>

              {/* Benefits Checklist */}
              <div className="ds-caps-checklist mt-4">
                <div className="row g-3">
                  {benefitsList.map((benefit, idx) => (
                    <div key={idx} className="col-sm-6">
                      <Reveal direction="up" delay={0.05 * idx}>
                        <div className="ds-benefit-check-item">
                          <CheckCircle2 size={18} className="ds-check-gold-icon" />
                          <span>{benefit}</span>
                        </div>
                      </Reveal>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
