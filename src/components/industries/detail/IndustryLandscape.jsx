import Reveal from "../../common/Reveal";

export default function IndustryLandscape({ industry }) {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">THE SECURITY LANDSCAPE</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize">
                Understanding the operational realities of <span className="text-domenion-gold">{industry.badge || "your environment"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Security in {industry.title.toLowerCase()} must balance public access or high occupant volume with strict access controls, asset protection, and continuous threat monitoring.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3 Editorial Narrative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Reveal direction="up" delay={0.1}>
              <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                <span className="text-domenion-gold font-heading text-2xl font-extrabold mb-3">01</span>
                <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">Public vs. Restricted Access</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Managing public ingress while isolating high-security zones, administrative offices, and sensitive infrastructure.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal direction="up" delay={0.2}>
              <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                <span className="text-domenion-gold font-heading text-2xl font-extrabold mb-3">02</span>
                <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">Occupant & Asset Safety</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Protecting employees, guests, patients, and physical inventory with licensed security officers trained in de-escalation.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal direction="up" delay={0.3}>
              <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                <span className="text-domenion-gold font-heading text-2xl font-extrabold mb-3">03</span>
                <h3 className="text-domenion-blue font-heading text-lg font-bold mb-2">Operational Continuity</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Preventing disruption, unauthorized trespass, and security breaches through 24/7 monitoring and rapid dispatch.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

