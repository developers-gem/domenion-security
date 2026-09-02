import { ShieldCheck, Clock3, Layers3, MapPinned } from "lucide-react";
import Reveal from "../common/Reveal";

const FEATURE_BLOCKS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Protection",
    desc: "Vetted, state-licensed security officers trained to enforce post orders with discipline and vigilance.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Rapid Response",
    desc: "Organized emergency response and monitoring designed to contain threats and resolve incidents immediately.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Customized Solutions",
    desc: "Physical guarding, CCTV monitoring, and access control combined into one tailored defense strategy.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Reliable Operations",
    desc: "Scalable security support structured to serve commercial enterprises and multi-location operations.",
  },
];

export default function WhyDominion() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHY DOMINION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Protection backed by <span className="text-domenion-gold">discipline and readiness.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                We combine experienced security personnel, proven operational procedures,
                and modern surveillance technology to deliver complete peace of mind.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            return (
              <div key={block.num}>
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">{block.num}</span>
                      <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">{block.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{block.desc}</p>
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

