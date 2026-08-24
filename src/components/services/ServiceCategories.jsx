import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, LockKeyhole, Cpu, Award } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ServiceCategories.css";

const SERVICE_GROUPS = [
  {
    category: "PHYSICAL SECURITY",
    icon: ShieldCheck,
    items: [
      { name: "Professional Physical Security Services", slug: "physical-security" },
      { name: "Professional Mobile Patrol Services", slug: "mobile-patrol" },
      { name: "Professional Executive Protection Services", slug: "executive-protection" },
      { name: "Professional Commercial Security Services", slug: "commercial-security" },
      { name: "Professional Residential Security Services", slug: "residential-security" },
    ],
  },
  {
    category: "SPECIALIZED INDUSTRIAL PROTECTION",
    icon: LockKeyhole,
    items: [
      { name: "Professional Airport Security Services", slug: "airport-security" },
      { name: "Professional Transportation Security Services", slug: "transportation-security" },
      { name: "Professional Construction Site Security Services", slug: "construction-security" },
      { name: "Professional Government Security Services", slug: "government-security" },
    ],
  },
  {
    category: "ENTERPRISE & DIGITAL DEFENSE",
    icon: Cpu,
    items: [
      { name: "Enterprise Cyber Security Services", slug: "cyber-security" },
      { name: "Professional Data Center Security Services", slug: "data-center-security" },
      { name: "Professional Security Risk Assessment Services", slug: "risk-assessment" },
    ],
  },
  {
    category: "HIGH-LEVEL CLEARANCE",
    icon: Award,
    items: [
      { name: "Clearance Security Solutions", slug: "clearance-solutions" },
      { name: "Top Secret Security Solutions", slug: "top-secret-solutions" },
    ],
  },
];

export default function ServiceCategories() {
  return (
    <section className="section ds-categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">SERVICE CATEGORIES</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              Targeted capabilities by security sector.
            </h2>
          </Reveal>
        </div>

        {/* Editorial Category Group Layout */}
        <div className="row g-4">
          {SERVICE_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={group.category} className="col-md-6">
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="ds-category-group-card">
                    <div className="ds-cat-header">
                      <div className="ds-cat-icon">
                        <Icon size={18} />
                      </div>
                      <span className="ds-cat-title">{group.category}</span>
                    </div>

                    <ul className="ds-cat-list">
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link to={`/services/${item.slug}`}>
                            <span>{item.name}</span>
                            <ArrowRight size={14} className="ds-cat-arrow" />
                          </Link>
                        </li>
                      ))}
                    </ul>
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
