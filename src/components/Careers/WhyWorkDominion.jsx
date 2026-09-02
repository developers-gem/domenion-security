import Reveal from "../common/Reveal";

const VALUE_ROWS = [
  {
    num: "01",
    title: "PROFESSIONAL GROWTH",
    desc: "Build experience through meaningful security work across commercial, critical infrastructure, and institutional posts.",
  },
  {
    num: "02",
    title: "PURPOSEFUL WORK",
    desc: "Contribute to environments where security matters—protecting occupants, assets, and operational continuity every day.",
  },
  {
    num: "03",
    title: "TEAM ENVIRONMENT",
    desc: "Work alongside disciplined security professionals who value mutual accountability, clear communication, and respect.",
  },
  {
    num: "04",
    title: "OPPORTUNITY",
    desc: "Explore roles across Dominion's physical guarding, mobile patrol, data center defense, and security management operations.",
  },
];

export default function WhyWorkDominion() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border" id="why-dominion">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHY DOMINION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Work that matters. <span className="text-domenion-gold">A team that cares.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Security is built on people. We value professionalism, responsibility, situational awareness, and a commitment to doing the job right.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Large Editorial Value Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUE_ROWS.map((row, idx) => (
            <div key={row.num}>
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-border">
                      <span className="text-domenion-gold font-heading text-2xl font-extrabold">{row.num}</span>
                      <h3 className="text-domenion-blue font-heading text-base font-bold uppercase">{row.title}</h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

