import Reveal from "../common/Reveal";

export default function ServicesIntro() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Intro Copy */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR CAPABILITIES</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  Security designed <span className="text-domenion-gold">for real-world risk.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed mb-4">
                  Every environment presents distinct operational threats, access control
                  challenges, and regulatory compliance standards. Dominion Security
                  delivers customized defense solutions tailored to your organization.
                </p>
                <p className="text-gray-600 font-sans text-base leading-relaxed">
                  Combining trained security officers, advanced surveillance monitoring,
                  mobile patrols, and enterprise cybersecurity, our integrated approach
                  ensures total operational preparedness.
                </p>
              </Reveal>

              <div className="h-0.5 w-16 bg-domenion-gold mt-6 rounded-full" />
            </div>
          </div>

          {/* Right Column: Architectural Visual Panel */}
          <div className="lg:col-span-6">
            <Reveal direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src="/images/about-security.jpg"
                  alt="Dominion Security Operations Officer"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex items-center gap-4 text-domenion-blue">
                  <span className="w-10 h-10 rounded-lg bg-domenion-gold text-domenion-blue font-heading font-extrabold text-sm flex items-center justify-center flex-shrink-0">01</span>
                  <div className="flex flex-col">
                    <strong className="text-domenion-blue font-heading text-xs font-extrabold tracking-wider">INTEGRATED PROTECTION</strong>
                    <span className="text-gray-600 text-xs mt-0.5">Physical • Cyber • Infrastructure</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

