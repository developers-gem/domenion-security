import CountUpModule from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Users, Clock3, Award } from "lucide-react";
import Reveal from "../common/Reveal";
import "./TrustStatsBar.css";

// Interop check for react-countup default export vs module object
const CountUp =
  typeof CountUpModule === "function"
    ? CountUpModule
    : CountUpModule?.default || CountUpModule;

const STATS_DATA = [
  {
    id: 1,
    icon: Award,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
    subtext: "Proven security leadership",
  },
  {
    id: 2,
    icon: Clock3,
    value: 24,
    suffix: "/7",
    label: "Security Coverage",
    subtext: "Round-the-clock protection",
  },
  {
    id: 3,
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Licensed Personnel",
    subtext: "Verified security officers",
  },
  {
    id: 4,
    icon: ShieldCheck,
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Client Satisfaction",
    subtext: "Dependable operational standards",
  },
];

export default function TrustStatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="ds-trust-stats-section" ref={ref}>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="col-6 col-lg-3">
                <Reveal direction="up" delay={idx * 0.1}>
                  <div className="ds-stat-card">
                    <div className="ds-stat-header">
                      <div className="ds-stat-icon-wrap">
                        {Icon && <Icon size={22} />}
                      </div>
                      <div className="ds-stat-number">
                        {isInView && CountUp ? (
                          <CountUp
                            start={0}
                            end={stat.value}
                            duration={2.5}
                            decimals={stat.decimals || 0}
                            suffix={stat.suffix}
                          />
                        ) : (
                          `${stat.value}${stat.suffix}`
                        )}
                      </div>
                    </div>
                    <h3 className="ds-stat-label">{stat.label}</h3>
                    <p className="ds-stat-subtext">{stat.subtext}</p>
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
