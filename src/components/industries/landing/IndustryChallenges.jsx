import Reveal from "../../common/Reveal";

const CHALLENGE_BLOCKS = [
  {
    num: "01",
    tag: "PEOPLE",
    title: "Protecting human lives & daily occupants.",
    desc: "From employees and healthcare patients to passengers, residents, and visitors, every environment requires specialized de-escalation, crowd control, and visitor screening protocols.",
  },
  {
    num: "02",
    tag: "PROPERTY",
    title: "Safeguarding physical assets & facilities.",
    desc: "Commercial real estate, data center servers, construction materials, and transportation fleets present unique physical entry vectors and perimeter vulnerabilities.",
  },
  {
    num: "03",
    tag: "OPERATIONS",
    title: "Ensuring uncompromised business continuity.",
    desc: "Security incidents cause costly operational downtime. Our post orders and 24/7 dispatch protocols maintain seamless operational momentum across all facilities.",
  },
];

export default function IndustryChallenges() {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                THE SECURITY CHALLENGE
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize">
                Every environment{" "}
                <span className="text-domenion-gold">has its own risks.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                Effective protection requires understanding the distinct
                vulnerabilities of people, property, and operational continuity
                within each specific sector.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3 Large Editorial Challenge Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {CHALLENGE_BLOCKS.map((block, idx) => (
            <div key={block.tag} className="h-full flex flex-col">
              <Reveal
                direction="up"
                delay={0.1 * idx}
                className="h-full flex-1 flex flex-col"
              >
                <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col h-full group">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-domenion-gold font-heading text-2xl font-extrabold">
                      {block.num}
                    </span>
                    <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                      {block.tag}
                    </span>
                  </div>

                  <h3 className="text-white font-heading text-xl font-bold mb-3 capitalize">
                    {block.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed flex-1">
                    {block.desc}
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
