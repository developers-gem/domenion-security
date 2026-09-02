import CountUpModule from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Users, Clock3, Award } from "lucide-react";
import Reveal from "../common/Reveal";

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
    <section className="bg-neutral-light py-16 sm:py-20 border-y border-neutral-border text-domenion-blue" ref={ref}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR TRACK RECORD</span>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-2">
              High-performing security operations across the nation.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id}>
                <Reveal direction="up" delay={idx * 0.1}>
                  <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        {Icon && <Icon size={22} />}
                      </div>
                      <div className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
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
                    <h3 className="text-domenion-blue font-heading text-base font-bold">{stat.label}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">{stat.subtext}</p>
                    <div className="h-0.5 w-8 bg-domenion-gold/40 mt-4 rounded-full group-hover:w-16 transition-all duration-300" />
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

