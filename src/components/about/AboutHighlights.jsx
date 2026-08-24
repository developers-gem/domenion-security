import { ShieldCheck, Clock3, Target, Award } from "lucide-react";
import Reveal from "../common/Reveal";
import "./AboutHighlights.css";

const HIGHLIGHTS_DATA = [
  {
    id: 1,
    icon: Clock3,
    number: "24/7",
    label: "Security Coverage",
    desc: "Round-the-clock physical & digital protection",
  },
  {
    id: 2,
    icon: Target,
    number: "01",
    label: "Dedicated Security Approach",
    desc: "Custom operational post orders per facility",
  },
  {
    id: 3,
    icon: ShieldCheck,
    number: "100%",
    label: "Client-Focused Protection",
    desc: "Tailored to your organizational risk profile",
  },
  {
    id: 4,
    icon: Award,
    number: "24/7",
    label: "Operational Readiness",
    desc: "Rapid emergency response & dispatch units",
  },
];

export default function AboutHighlights() {
  return (
    <section className="ds-about-highlights-section">
      <div className="container">
        <div className="row g-4 justify-content-center">
          {HIGHLIGHTS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="col-6 col-lg-3">
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="ds-highlight-card">
                    <div className="ds-highlight-header">
                      <div className="ds-highlight-icon">
                        <Icon size={22} />
                      </div>
                      <span className="ds-highlight-num">{item.number}</span>
                    </div>

                    <h3 className="ds-highlight-label">{item.label}</h3>
                    <p className="ds-highlight-desc">{item.desc}</p>
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
