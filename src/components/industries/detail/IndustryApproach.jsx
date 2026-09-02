import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../../common/Reveal";

const APPROACH_STEPS = [
  {
    step: "01",
    title: "UNDERSTAND",
    subtitle: "Facility & Operational Audit",
    desc: "We analyze shift patterns, visitor volume, access points, and site vulnerabilities.",
    icon: Search,
  },
  {
    step: "02",
    title: "ASSESS",
    subtitle: "Threat Vector Evaluation",
    desc: "Our security directors audit legal compliance, physical risks, and emergency escalation workflows.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DESIGN",
    subtitle: "Custom Post Orders & Rostering",
    desc: "We build tailored security guard post orders, visitor verification rules, and CCTV patrol routes.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Active Oversight",
    desc: "Continuous guard presence, daily post reporting, incident logs, and ongoing operational audits.",
    icon: BadgeCheck,
  },
];

export default function IndustryApproach({ industry }) {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR APPROACH</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
              Security designed around <span className="text-domenion-gold">the environment.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-Step Grid Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPROACH_STEPS.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={stage.step}>
                <Reveal direction="up" delay={0.08 * idx}>
                  <div className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">{stage.step}</span>
                      <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={18} />
                      </div>
                    </div>

                    <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-1">{stage.title}</span>
                    <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">{stage.subtitle}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{stage.desc}</p>
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

