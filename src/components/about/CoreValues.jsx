import Reveal from "../common/Reveal";

const VALUES_DATA = [
  {
    num: "01",
    title: "DISCIPLINE",
    subtitle: "Preparation & Rigorous Post Execution",
    desc: "Every operation begins with preparation. Our officers follow post orders with strict attention to duty, appearance, and protocol.",
  },
  {
    num: "02",
    title: "INTEGRITY",
    subtitle: "Accountability & Transparency",
    desc: "We operate with total accountability, clear communication, and unyielding respect for the trust placed in our security team.",
  },
  {
    num: "03",
    title: "RESPONSIBILITY",
    subtitle: "Protection of Life & Assets",
    desc: "We take full ownership of the environments we protect, ensuring proactive risk mitigation and vigilant post coverage.",
  },
  {
    num: "04",
    title: "READINESS",
    subtitle: "24/7 Preparedness & Emergency Alertness",
    desc: "Security threats require immediate action. We maintain 24/7 operational readiness and emergency escalation response.",
  },
  {
    num: "05",
    title: "TRUST",
    subtitle: "Long-Term Client Relationships",
    desc: "We build enduring security partnerships through consistent service delivery, reliable presence, and verified performance.",
  },
  {
    num: "06",
    title: "PROFESSIONALISM",
    subtitle: "High Standards & Continuous Training",
    desc: "Our security personnel receive continuous training in de-escalation, legal compliance, access control, and customer service.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                OUR VALUES
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize">
                The principles behind{" "}
                <span className="text-domenion-gold">
                  every protection decision.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                Effective security requires more than personnel and surveillance
                systems. It requires a corporate culture built around unyielding
                accountability, thorough preparation, and mutual trust.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial Value List Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {VALUES_DATA.map((val, idx) => (
            <div key={val.num} className="h-full flex flex-col">
              <Reveal
                direction="up"
                delay={0.08 * idx}
                className="h-full flex-1 flex flex-col"
              >
                <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col flex-1 h-full group">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-domenion-gold font-heading text-xl font-extrabold">
                      {val.num}
                    </span>
                    <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                      {val.title}
                    </span>
                  </div>

                  <h3 className="text-white font-heading text-lg font-bold mb-2">
                    {val.subtitle}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed flex-1">
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
