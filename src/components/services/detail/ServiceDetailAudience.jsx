import { Building2, Landmark, HardHat, Cpu } from "lucide-react";
import Reveal from "../../common/Reveal";

const AUDIENCE_ENVIRONMENTS = [
  {
    num: "01",
    title: "Commercial & Corporate Real Estate",
    desc: "Office towers, corporate headquarters, and multi-tenant commercial complexes requiring executive access control.",
    icon: Building2,
  },
  {
    num: "02",
    title: "Mission-Critical Infrastructure",
    desc: "Data centers, energy facilities, logistics hubs, and communications infrastructure requiring high-security post orders.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Government & Institutional Facilities",
    desc: "Municipal buildings, public works, civic centers, and educational institutions demanding licensed guard presence.",
    icon: Landmark,
  },
  {
    num: "04",
    title: "Industrial & Construction Sites",
    desc: "Active construction projects, manufacturing plants, and heavy equipment yards vulnerable to theft and trespass.",
    icon: HardHat,
  },
];

export default function ServiceDetailAudience({ service }) {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">TARGET ENVIRONMENTS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Engineered for your <span className="text-domenion-gold">specific facility type.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Dominion customizes post orders, guard credentials, and emergency escalation workflows for the operational realities of your environment.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Environment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCE_ENVIRONMENTS.map((env, idx) => {
            const Icon = env.icon;
            return (
              <div key={env.num}>
                <Reveal direction="up" delay={0.08 * idx}>
                  <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">{env.num}</span>
                      <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">{env.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{env.desc}</p>
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

