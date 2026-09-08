import { ShieldCheck, Clock3, Layers3, MapPinned } from "lucide-react";
import Reveal from "../common/Reveal";

const DIFFERENTIATORS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Protection",
    desc: "Security solutions built around people, property, and critical enterprise assets.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Rapid Response",
    desc: "Fast, organized security dispatch and monitoring designed to contain threats immediately.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Customized Security",
    desc: "Physical guarding, surveillance, and access control tailored to your post orders.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Operational Readiness",
    desc: "Continuous training, daily activity logs, and 24/7 centralized security dispatch.",
  },
];

export default function WhyChooseServices() {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                WHY Domenion
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 capitalize">
                Protection that goes{" "}
                <span className="text-domenion-gold">
                  beyond mere presence.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                We combine experienced security personnel, proven operational
                post orders, and modern surveillance technology to deliver
                unyielding protection for your organization.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Horizontal Differentiator List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="h-full flex flex-col">
                <Reveal
                  direction="up"
                  delay={0.1 * idx}
                  className="h-full flex-1 flex flex-col"
                >
                  <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col flex-1 h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-xl font-extrabold">
                        {item.num}
                      </span>
                      <div className="w-9 h-9 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="text-white font-heading text-lg font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed flex-1">
                      {item.desc}
                    </p>
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
