import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../../common/Reveal";
import "./ServiceDetailCovers.css";

export default function ServiceDetailCovers({ service }) {
  // Extract features or highlights or fallback to 6 structured scope points
  const rawFeatures = service.features || [];
  const coversList = rawFeatures.length >= 6
    ? rawFeatures.slice(0, 6).map((f, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: f.title,
        desc: f.text,
      }))
    : (service.highlights || []).length >= 6
    ? service.highlights.slice(0, 6).map((h, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: h,
        desc: "Specialized post order protection protocol.",
      }))
    : [
        { num: "01", title: "Access Control & Verification", desc: "Rigorous entry point management and personnel screening." },
        { num: "02", title: "Facility & Perimeter Patrols", desc: "Routine and random inspections to maintain total site security." },
        { num: "03", title: "Visitor & Logistics Management", desc: "Structured guest registration and asset tracking protocols." },
        { num: "04", title: "CCTV & Surveillance Monitoring", desc: "Continuous video monitoring and real-time incident detection." },
        { num: "05", title: "Rapid Emergency Response", desc: "Immediate dispatch for alarm activations and security events." },
        { num: "06", title: "Compliance & Daily Reporting", desc: "Detailed activity logs and regulatory compliance documentation." },
      ];

  return (
    <section className="section ds-detail-covers-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHAT THIS SERVICE COVERS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Comprehensive scope built for
                <br />
                <span>your operational environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Our scope encompasses physical guarding, electronic monitoring, and structured response procedures tailored specifically for {service.badge || "your organization"}.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 6-Item Numbered Scope Grid */}
        <div className="row g-4">
          {coversList.map((item, idx) => (
            <div key={item.num} className="col-md-6 col-lg-4">
              <Reveal direction="up" delay={0.06 * idx}>
                <div className="ds-cover-item-card">
                  <div className="ds-cover-card-header">
                    <span className="ds-cover-num">{item.num}</span>
                    <h3 className="ds-cover-title">{item.title}</h3>
                  </div>
                  <p className="ds-cover-desc">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
