import { Link } from "react-router-dom";
import { ArrowRight, Layers, ShieldCheck, Check } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./IndustryCrossServices.css";

const MAP_ITEMS = [
  {
    sector: "COMMERCIAL REAL ESTATE",
    services: [
      { name: "Professional Physical Security", slug: "physical-security" },
      { name: "Professional Mobile Patrol", slug: "mobile-patrol" },
      { name: "Risk Assessment Services", slug: "risk-assessment" },
    ],
  },
  {
    sector: "DATA CENTERS & TECH",
    services: [
      { name: "Data Center Security", slug: "data-center-security" },
      { name: "Enterprise Cyber Security", slug: "cyber-security" },
      { name: "Risk Assessment Services", slug: "risk-assessment" },
    ],
  },
  {
    sector: "GOVERNMENT & INSTITUTIONAL",
    services: [
      { name: "Government Security Services", slug: "government-security" },
      { name: "Clearance Security Solutions", slug: "clearance-solutions" },
      { name: "Top Secret Security Solutions", slug: "top-secret-solutions" },
    ],
  },
];

export default function IndustryCrossServices() {
  return (
    <section className="section ds-cross-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">MULTI-LAYERED DEFENSE</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              One environment.
              <br />
              <span>Multiple layers of protection.</span>
            </h2>
          </Reveal>
        </div>

        {/* Industry -> Security Needs -> Dominion Services Map */}
        <div className="row g-4 justify-content-center">
          {MAP_ITEMS.map((item, idx) => (
            <div key={item.sector} className="col-md-6 col-lg-4">
              <Reveal direction="up" delay={0.1 * idx}>
                <div className="ds-cross-map-card">
                  <div className="ds-cross-card-header">
                    <Layers size={18} className="ds-cross-icon" />
                    <span className="ds-cross-sector">{item.sector}</span>
                  </div>

                  <div className="ds-cross-services-list">
                    {item.services.map((svc) => (
                      <Link
                        key={svc.slug}
                        to={`/services/${svc.slug}`}
                        className="ds-cross-svc-link"
                      >
                        <Check size={14} className="ds-check-icon" />
                        <span>{svc.name}</span>
                        <ArrowRight size={13} className="ds-arrow-icon" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
