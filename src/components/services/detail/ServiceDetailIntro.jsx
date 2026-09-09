import Reveal from "../../common/Reveal";

export default function ServiceDetailIntro({ service }) {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Eyebrow + Large Statement */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OVERVIEW</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize">
                  {service.overviewTitle || `Protection built around your ${service.badge || "environment"}.`}
                </h2>
              </Reveal>

              <div className="h-0.5 w-16 bg-domenion-gold mt-6 rounded-full" />
            </div>
          </div>

          {/* Right Column: 2 Concise Explanatory Paragraphs */}
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-4">
              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed font-medium">
                  {service.overviewDescription ||
                    service.description ||
                    `Domenion Security delivers tailored ${service.title} designed around the operational demands, entry vectors, and regulatory standards of your facility.`}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="text-gray-600 font-sans text-base leading-relaxed">
                  Our security directors establish disciplined post orders, rapid escalation workflows,
                  and integrated surveillance monitoring to safeguard your personnel, infrastructure, and core business assets round the clock.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

