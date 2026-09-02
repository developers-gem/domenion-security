import { Search, ClipboardList, ShieldAlert, BadgeCheck } from "lucide-react";
import Reveal from "../common/Reveal";

const STAGES = [
  {
    step: "01",
    title: "ASSESS",
    subtitle: "Risk Evaluation",
    desc: "Comprehensive threat analysis and facility risk audit.",
    icon: Search,
  },
  {
    step: "02",
    title: "PLAN",
    subtitle: "Post Orders Design",
    desc: "Customized security strategy and access control protocols.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "DEPLOY",
    subtitle: "On-Site Guards & Systems",
    desc: "Licensed officers and monitoring technology active on site.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "PROTECT",
    subtitle: "24/7 Active Oversight",
    desc: "Continuous monitoring, rapid response, and daily post reporting.",
    icon: BadgeCheck,
  },
];

export default function ServicesApproach() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR APPROACH</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              A security strategy built <span className="text-domenion-gold">around your environment.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-Stage Process Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={stage.step}>
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
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

