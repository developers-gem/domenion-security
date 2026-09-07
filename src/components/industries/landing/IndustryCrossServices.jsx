import { Link } from "react-router-dom";
import { ArrowRight, Layers, Check } from "lucide-react";
import Reveal from "../../common/Reveal";

const MAP_ITEMS = [
  {
    sector: "COMMERCIAL REAL ESTATE",
    services: [
      { name: "Professional Physical Security", slug: "physical-security" },
      { name: "Professional Mobile Patrol", slug: "mobile-patrol" },
      { name: "Risk Assessment Services", slug: "risk-assessment" },
    ],
  },
  {
    sector: "DATA CENTERS & TECH",
    services: [
      { name: "Data Center Security", slug: "data-center-security" },
      { name: "Enterprise Cyber Security", slug: "cyber-security" },
      { name: "Risk Assessment Services", slug: "risk-assessment" },
    ],
  },
  {
    sector: "GOVERNMENT & INSTITUTIONAL",
    services: [
      { name: "Government Security Services", slug: "government-security" },
      { name: "Clearance Security Solutions", slug: "clearance-solutions" },
      { name: "Top Secret Security Solutions", slug: "top-secret-solutions" },
    ],
  },
];

export default function IndustryCrossServices() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">MULTI-LAYERED DEFENSE</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
              One environment. <span className="text-domenion-gold">Multiple layers of protection.</span>
            </h2>
          </Reveal>
        </div>

        {/* Industry -> Security Needs -> Domenion Services Map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MAP_ITEMS.map((item, idx) => (
            <div key={item.sector}>
              <Reveal direction="up" delay={0.1 * idx}>
                <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-neutral-border">
                    <div className="w-8 h-8 rounded bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center">
                      <Layers size={16} />
                    </div>
                    <span className="text-domenion-blue font-heading text-xs font-extrabold tracking-widest uppercase">{item.sector}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {item.services.map((svc) => (
                      <Link
                        key={svc.slug}
                        to={`/services/${svc.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-light border border-neutral-border hover:border-domenion-gold text-domenion-blue text-xs font-heading font-bold transition-all duration-200 group/link text-decoration-none"
                      >
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-domenion-gold flex-shrink-0" />
                          <span className="group-hover/link:text-domenion-gold transition-colors">{svc.name}</span>
                        </div>
                        <ArrowRight size={13} className="text-domenion-gold group-hover/link:translate-x-1 transition-transform flex-shrink-0" />
                      </Link>
                    ))}
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

