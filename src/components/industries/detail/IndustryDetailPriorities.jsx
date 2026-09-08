import { CheckCircle2 } from "lucide-react";
import Reveal from "../../common/Reveal";

export default function IndustryDetailPriorities({ industry }) {
  const prioritiesList = industry.highlights || [
    "Facility Security & Perimeter Control",
    "Personnel & Occupant Safety",
    "Controlled Access & Badging Verification",
    "Continuous Video Surveillance Monitoring",
    "24/7 Security Patrols & Escalation",
    "Detailed Activity Logs & Incident Documentation",
  ];

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">PROTECTION PRIORITIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Operational priorities tailored <span className="text-domenion-gold">for {industry.badge || "your sector"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Every environment requires tailored post orders and continuous performance verification to safeguard life, property, and operational continuity.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Priorities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prioritiesList.map((item, idx) => (
            <div key={idx}>
              <Reveal direction="up" delay={0.04 * idx}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-neutral-border hover:border-domenion-gold/50 shadow-sm hover:shadow-md transition-all duration-200">
                  <CheckCircle2 size={18} className="text-domenion-gold flex-shrink-0" />
                  <span className="text-domenion-blue font-heading text-sm font-bold">{item}</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

