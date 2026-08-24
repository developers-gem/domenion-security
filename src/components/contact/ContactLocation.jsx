import { MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ContactLocation.css";

const COVERED_REGIONS = [
  "Phoenix Metropolitan Area",
  "Tucson & Southern Arizona",
  "Scottsdale & East Valley Commercial Corridors",
  "Northern Arizona Regional Operations",
  "Statewide Critical Infrastructure Protection",
  "Multi-State & Nationwide Accounts",
];

export default function ContactLocation() {
  return (
    <section className="section ds-location-section" id="location-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Column: Visual Map / Architectural Panel */}
          <div className="col-lg-6">
            <Reveal direction="left">
              <div className="ds-loc-visual-frame">
                <div className="ds-loc-map-bg" />
                <div className="ds-loc-map-overlay" />

                <div className="ds-loc-pin-node">
                  <div className="ds-loc-pulse" />
                  <MapPin size={24} className="ds-loc-pin-icon" />
                </div>

                <div className="ds-loc-badge-card">
                  <div className="ds-loc-badge-header">
                    <ShieldCheck size={16} className="text-gold" />
                    <span>DOMINION SECURITY HEADQUARTERS</span>
                  </div>
                  <strong>ARIZONA & NATIONWIDE OPERATIONS</strong>
                  <p>24/7 Command Dispatch & Guard Operations</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Service Area Statement & Regions */}
          <div className="col-lg-6">
            <div className="ds-loc-content">
              <Reveal direction="up">
                <span className="section-label">SERVICE COVERAGE</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="section-title">
                  Protecting environments
                  <br />
                  <span>across Arizona & nationwide.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="ds-loc-lead mt-3">
                  Dominion Security provides licensed physical guarding, mobile patrol, data center defense, and security management across commercial centers, industrial sites, and critical infrastructure.
                </p>
              </Reveal>

              <div className="ds-loc-regions-grid mt-4">
                {COVERED_REGIONS.map((region, idx) => (
                  <Reveal key={region} direction="up" delay={0.05 * idx}>
                    <div className="ds-loc-region-item">
                      <CheckCircle2 size={15} className="ds-check-gold flex-shrink-0" />
                      <span>{region}</span>
                    </div>
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
