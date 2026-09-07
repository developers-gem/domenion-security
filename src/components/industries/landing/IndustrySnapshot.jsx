import Reveal from "../../common/Reveal";

export default function IndustrySnapshot() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Statement */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">ENVIRONMENTAL ADAPTABILITY</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  ONE APPROACH DOESN'T FIT <span className="text-domenion-gold">EVERY ENVIRONMENT.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed mb-3 font-medium">
                  From government facilities and financial institutions to healthcare, retail,
                  transportation, and critical infrastructure, security requirements change with the environment.
                </p>
                <p className="text-gray-600 font-sans text-base leading-relaxed">
                  Domenion Security analyzes post orders, access vectors, visitor flows, and threat models for each specific sector—deploying trained personnel and integrated surveillance engineered specifically for that environment.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Counter Box */}
          <div className="lg:col-span-4">
            <Reveal direction="left" delay={0.2}>
              <div className="bg-domenion-blue text-white rounded-2xl p-8 border border-domenion-gold/30 shadow-xl flex flex-col items-center text-center">
                <span className="text-domenion-gold font-heading text-5xl font-extrabold mb-1">11+</span>
                <span className="text-white font-heading text-sm font-extrabold tracking-widest uppercase mb-2">PROTECTED SECTORS</span>
                <p className="text-white/75 text-xs leading-relaxed">Custom security post orders engineered per environment.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

