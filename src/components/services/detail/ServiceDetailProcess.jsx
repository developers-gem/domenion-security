import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../../common/Reveal";

const PROCESS_STAGES = [
  {
    step: "01",
    action: "UNDERSTAND",
    title: "Environment & Requirements",
    desc: "We analyze your facility, access points, shift hours, and operational risk factors.",
    icon: Search,
  },
  {
    step: "02",
    action: "ASSESS",
    title: "Risk & Vulnerability Audit",
    desc: "Our security directors audit entry vectors, threat vulnerabilities, and compliance needs.",
    icon: ClipboardList,
  },
  {
    step: "03",
    action: "IMPLEMENT",
    title: "Post Orders & Personnel",
    desc: "We establish custom post orders, deploy licensed guards, and integrate surveillance monitoring.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    action: "PROTECT",
    title: "24/7 Oversight & Dispatch",
    desc: "Active post coverage, daily log reporting, incident escalation, and ongoing security audits.",
    icon: BadgeCheck,
  },
];

export default function ServiceDetailProcess({ service }) {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR PROCESS</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 capitalize">
              A clear approach to <span className="text-domenion-gold">security planning.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-Step Timeline Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {PROCESS_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={stage.step} className="h-full flex flex-col">
                <Reveal direction="up" delay={0.08 * idx} className="h-full flex flex-1 flex-col">
                  <div className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">{stage.step}</span>
                      <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={18} />
                      </div>
                    </div>

                    <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-1">{stage.action}</span>
                    <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">{stage.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{stage.desc}</p>
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

