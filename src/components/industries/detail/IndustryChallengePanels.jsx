import Reveal from "../../common/Reveal";

const CHALLENGES = [
  {
    num: "01",
    tag: "ACCESS",
    title: "Perimeter & Entry Point Verification",
    desc: "Rigorous badging, credential verification, and visitor logging at all facility access points.",
  },
  {
    num: "02",
    tag: "PEOPLE",
    title: "Occupant & Personnel Protection",
    desc: "Licensed security guards trained in de-escalation, conflict resolution, and emergency evacuation.",
  },
  {
    num: "03",
    tag: "ASSETS",
    title: "Inventory & Infrastructure Security",
    desc: "Active perimeter patrols, CCTV monitoring, and theft deterrence for critical assets.",
  },
  {
    num: "04",
    tag: "OPERATIONS",
    title: "Uncompromised Business Continuity",
    desc: "Standardized post orders and 24/7 central dispatch to ensure continuous operational momentum.",
  },
];

export default function IndustryChallengePanels({ industry }) {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">S</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize ">
                4 core security pillars for <span className="text-domenion-gold">{industry.badge || "this sector"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                Domenion structures every security deployment around 4 critical operational dimensions to eliminate security blind spots.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Horizontal Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {CHALLENGES.map((item, idx) => (
            <div key={item.num} className="h-full flex flex-col">
              <Reveal direction="up" delay={0.08 * idx} className="h-full flex-1 flex flex-col">
                <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col flex-1 h-full group">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-domenion-gold font-heading text-2xl font-extrabold">{item.num}</span>
                    <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">{item.tag}</span>
                  </div>

                  <h3 className="text-white font-heading text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

