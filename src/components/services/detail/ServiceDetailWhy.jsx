import { ShieldCheck, Clock3, Layers3, MapPinned } from "lucide-react";
import Reveal from "../../common/Reveal";

const REASONS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Discipline",
    desc: "Vetted security personnel trained to follow operational post orders with vigilance.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "24/7 Dispatch Readiness",
    desc: "Continuous central monitoring and immediate emergency escalation capabilities.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Tailored Security Planning",
    desc: "Custom protection strategies engineered around your facility's unique threat vector.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Operational Transparency",
    desc: "Daily post activity logs, incident documentation, and continuous performance oversight.",
  },
];

export default function ServiceDetailWhy({ service }) {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHY Domenion</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 capitalize">
                Protection built around <span className="text-domenion-gold">your environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                Domenion Security combines rigorous personnel selection, standardized post execution, and modern surveillance technology to deliver unyielding protection.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Numbered Differentiator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="h-full flex flex-col">
                <Reveal direction="up" delay={0.08 * idx} className="h-full flex flex-1 flex-col">
                  <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-xl font-extrabold">{item.num}</span>
                      <div className="w-9 h-9 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-white font-heading text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-white/75 text-sm leading-relaxed flex-1">{item.desc}</p>
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

