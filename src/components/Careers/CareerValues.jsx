import Reveal from "../common/Reveal";

const CAREER_VALUES = [
  {
    num: "01",
    tag: "RESPONSIBILITY",
    title: "Take ownership of the post.",
    desc: "Take full ownership of the environment, personnel, and post orders entrusted to your security team.",
  },
  {
    num: "02",
    tag: "PROFESSIONALISM",
    title: "Disciplined & accountable posture.",
    desc: "Present a clean, vigilant, and authoritative presence that instills trust across every client facility.",
  },
  {
    num: "03",
    tag: "AWARENESS",
    title: "Proactive situational alertness.",
    desc: "Maintain constant situational awareness to detect vulnerabilities and contain threats before they escalate.",
  },
  {
    num: "04",
    tag: "INTEGRITY",
    title: "Unyielding honesty & trust.",
    desc: "Uphold total accountability, accurate reporting, and uncompromised ethical standards across all operations.",
  },
];

export default function CareerValues() {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHAT WE LOOK FOR</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Strong people. <span className="text-domenion-gold">Professional standards.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                We seek individuals who take pride in their duty, demonstrate high operational integrity, and embody Domenion's security standards.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAREER_VALUES.map((item, idx) => (
            <div key={item.tag}>
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col h-full group">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-domenion-gold font-heading text-2xl font-extrabold">{item.num}</span>
                    <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">{item.tag}</span>
                  </div>

                  <h3 className="text-white font-heading text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

