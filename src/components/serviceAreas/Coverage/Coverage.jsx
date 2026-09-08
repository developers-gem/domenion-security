import {
  ShieldCheck,
  TimerReset,
  Building2,
  MapPinned,
} from "lucide-react";
import Reveal from "../../common/Reveal";

const features = [
  {
    icon: MapPinned,
    title: "Nationwide Coverage",
    text: "Professional security services across major cities and commercial hubs throughout the United States.",
  },
  {
    icon: TimerReset,
    title: "Rapid Response",
    text: "Our mobile response teams are strategically positioned for fast deployment and emergency support.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed Professionals",
    text: "Every officer is trained, licensed and background verified before assignment.",
  },
  {
    icon: Building2,
    title: "Industry Expertise",
    text: "From healthcare to government facilities, we protect organizations of every size.",
  },
];

function Coverage() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border bg-neutral-light p-4">
                <img
                  src="/images/service-areas/coverage-map.png"
                  alt="Coverage Map"
                  className="w-full h-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">50-STATE SECURITY COVERAGE</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  Licensed, bonded, and providing professional security coverage across all 50 states.
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-600 font-sans text-base leading-relaxed mb-8">
                  Licensed, bonded, and providing professional security coverage across all 50 states with rapid deployment capabilities and 24/7 operational dispatch.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={index} direction="up" delay={0.05 * index}>
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-light border border-neutral-border">
                        <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                          <Icon size={20} />
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-domenion-blue font-heading text-base font-bold mb-1">{item.title}</h5>
                          <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Coverage;