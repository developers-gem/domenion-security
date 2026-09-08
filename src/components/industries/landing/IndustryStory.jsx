import Reveal from "../../common/Reveal";

export default function IndustryStory() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Architectural Security Visual */}
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src="/images/industries/story-context.jpg"
                  alt="Domenion Security Environmental Protection"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                  <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">
                    SECURITY IN CONTEXT
                  </span>
                  <strong className="text-xs font-bold font-heading">
                    ENVIRONMENT-SPECIFIC DEFENSE
                  </strong>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Context Narrative */}
          <div className="lg:col-span-5">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                  THE Domenion DIFFERENCE
                </span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight capitalize">
                  Different environments require{" "}
                  <span className="text-domenion-gold">
                    different security strategies.
                  </span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed mb-3 font-medium">
                  A high-occupancy hospital emergency room cannot be secured
                  like a remote data center or a commercial office tower.
                </p>
                <p className="text-gray-600 font-sans text-base leading-relaxed">
                  Domenion Security designs custom post orders, visitor
                  verification protocols, and emergency escalation matrices
                  tailored around the physical layout, operational pace, and
                  regulatory requirements of each facility we protect.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
