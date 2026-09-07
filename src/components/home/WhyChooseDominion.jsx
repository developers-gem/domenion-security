import { ShieldCheck, Clock3, Layers3, MapPinned, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

const WHY_CARDS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Professional Security Teams",
    desc: "Rigorous background vetting and continuous training ensure highly disciplined, professional officers on site.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Rapid Response & 24/7 Operations",
    desc: "Fast, organized security dispatch and monitoring designed to contain threats and resolve incidents immediately.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Integrated Capabilities",
    desc: "Physical guarding, CCTV monitoring, access control, and cybersecurity working together as one defense strategy.",
  },
  {
    num: "04",
    icon: MapPinned,
    title: "Nationwide Coverage",
    desc: "Scalable security support structured to serve commercial enterprises, critical sites, and multi-location operations.",
  },
];

export default function WhyChooseDomenion() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHY CHOOSE DOMENION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Security built on <span className="text-domenion-gold">discipline, readiness and trust.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                We combine experienced security professionals, proven operational
                procedures, and modern surveillance technology to deliver complete
                peace of mind.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={card.num}>
                <Reveal direction="up" delay={0.1 * idx}>
                  <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-xl font-extrabold">{card.num}</span>
                      <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={22} />
                      </div>
                    </div>

                    <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2 leading-snug">{card.title}</h3>

                    <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                    <div className="h-0.5 w-8 bg-domenion-gold/40 mt-6 rounded-full group-hover:w-16 transition-all duration-300" />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12">
          <Reveal direction="up" delay={0.4}>
            <div className="bg-domenion-blue text-white rounded-xl p-8 shadow-lg border border-domenion-gold/30 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1 text-center lg:text-left">
                <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">SECURITY-FIRST. CLIENT-FOCUSED.</span>
                <h3 className="text-white font-heading text-2xl font-extrabold">A security partner built around your operational needs.</h3>
              </div>
              <Button to="/contact" variant="primary" icon={ArrowRight}>
                Talk To Our Team
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

