import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../common/Reveal";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "ASSESS",
    subtitle: "Threat & Risk Audit",
    desc: "We perform a thorough evaluation of your facility, operational vulnerabilities, access points, and specific threat vectors.",
    icon: Search,
  },
  {
    step: "02",
    title: "PLAN",
    subtitle: "Custom Security Strategy",
    desc: "Our security architects design customized protocols, staffing rosters, surveillance coverage, and emergency escalation procedures.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DEPLOY",
    subtitle: "Personnel & Systems On-Site",
    desc: "Licensed security officers and modern monitoring systems are deployed, backed by rigorous post-order enforcement.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Response & Oversight",
    desc: "Continuous surveillance, mobile patrol checks, daily activity reporting, and continuous operational optimization.",
    icon: BadgeCheck,
  },
];

export default function SecurityProcess() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
              HOW WE PROTECT
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 capitalize">
              A disciplined, 4-step security process.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed mt-3">
              From initial risk assessment to 24/7 active protection, our
              operational framework ensures your organization is prepared for
              every situation.
            </p>
          </Reveal>
        </div>

        {/* 4-Step Timeline Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="h-full flex flex-col">
                <Reveal
                  direction="up"
                  delay={0.1 * idx}
                  className="h-full flex-1 flex flex-col"
                >
                  <div className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col flex-1 h-full group relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={20} />
                      </div>
                    </div>

                    <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-1">
                      {step.title}
                    </span>

                    <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2 leading-snug">
                      {step.subtitle}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed flex-1">
                      {step.desc}
                    </p>

                    <div className="h-0.5 w-8 bg-domenion-gold/40 mt-6 rounded-full group-hover:w-16 transition-all duration-300" />
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
