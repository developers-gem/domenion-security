import Reveal from "../../common/Reveal";

export default function IndustryOverview({ industry }) {
  const panelImg = industry.overviewImage || industry.benefitsImage || "/images/company-security.jpg";

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Statement & Copy */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">{industry.badge || "SECTOR OVERVIEW"}</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  {industry.overviewTitle || `Protecting ${industry.title} with purpose & precision.`}
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed mb-3 font-medium">
                  {industry.overviewDescription || industry.shortDescription}
                </p>
                <p className="text-gray-600 font-sans text-base leading-relaxed">
                  Domenion Security establishes rigorous post orders, entry point access controls, visitor verification rules, and emergency escalation protocols specifically engineered for {industry.title.toLowerCase()}.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Architectural Visual Panel */}
          <div className="lg:col-span-6">
            <Reveal direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src={panelImg}
                  alt={industry.title}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                  <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">ENVIRONMENTAL DEFENSE</span>
                  <strong className="text-xs font-bold font-heading">{industry.badge || "Domenion SECURITY"}</strong>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

