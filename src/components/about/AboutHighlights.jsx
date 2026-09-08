import { ShieldCheck, Clock3, Target, Award } from "lucide-react";
import Reveal from "../common/Reveal";

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
    <section className="py-16 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.id}>
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="bg-white border border-neutral-border rounded-xl p-6 shadow-sm hover:border-domenion-gold/50 transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="text-domenion-gold font-heading text-xl font-extrabold">{item.number}</span>
                    </div>

                    <h3 className="text-domenion-blue font-heading text-base font-bold mb-1 leading-snug">{item.label}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
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

