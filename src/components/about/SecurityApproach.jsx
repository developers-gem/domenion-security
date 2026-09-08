import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../common/Reveal";

const APPROACH_STAGES = [
  {
    step: "01",
    title: "ASSESS",
    subtitle: "Threat & Vulnerability Audit",
    desc: "We analyze facility layouts, entry points, operational patterns, and specific threat vectors to identify vulnerabilities.",
    icon: Search,
  },
  {
    step: "02",
    title: "PLAN",
    subtitle: "Custom Protection Strategy",
    desc: "Our security directors build post orders, staffing rosters, access control rules, and emergency escalation workflows.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DEPLOY",
    subtitle: "Personnel & Systems On-Site",
    desc: "Licensed security officers, mobile patrol units, and monitoring systems are deployed under strict operational protocols.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Response & Continuous Audit",
    desc: "Active surveillance, daily post logs, incident reporting, and continuous operational optimization ensure lasting security.",
    icon: BadgeCheck,
  },
];

export default function SecurityApproach() {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR APPROACH</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Security isn't <span className="text-domenion-gold">one-size-fits-all.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                Effective protection starts with understanding the environment, identifying
                risks, and building a custom operational strategy around the people,
                assets, and operations that matter most.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4-Stage Horizontal / Vertical Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPROACH_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={stage.step}>
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">{stage.step}</span>
                      <div className="w-9 h-9 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center">
                        <Icon size={20} />
                      </div>
                    </div>

                    <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-1">{stage.title}</span>
                    <h3 className="text-white font-heading text-lg font-bold mb-2">{stage.subtitle}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{stage.desc}</p>
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

