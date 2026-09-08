import { CheckCircle2, ShieldCheck } from "lucide-react";
import Reveal from "../../common/Reveal";

export default function ServiceDetailCapabilities({ service }) {
  const panelImg = service.overviewImage || service.benefitsImage || service.heroImage || "/images/physical-security.jpg";
  const benefitsList = service.benefits || [
    "Licensed & background-verified security personnel",
    "Tailored post orders & operational procedures",
    "24/7 security dispatch & monitoring oversight",
    "Integrated access control & visitor verification",
    "Proactive risk mitigation & daily activity logs",
    "Rapid emergency incident management",
  ];

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Image Panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src={panelImg}
                  alt={service.title}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-domenion-gold/40 text-domenion-blue flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-domenion-gold text-domenion-blue grid place-items-center flex-shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-domenion-blue font-heading text-xs font-extrabold">{service.badge || "SECURITY CAPABILITY"}</strong>
                    <span className="text-gray-600 text-[10px]">Verified Operational Excellence</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Capabilities & Benefits Checklist */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">KEY CAPABILITIES</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                  {service.benefitsTitle || "Engineered for maximum protection & peace of mind."}
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-600 font-sans text-base leading-relaxed mt-4 mb-6">
                  {service.benefitsDescription ||
                    `Our structured ${service.title} approach ensures your organization maintains continuous oversight, regulatory compliance, and rapid threat response.`}
                </p>
              </Reveal>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefitsList.map((benefit, idx) => (
                  <div key={idx}>
                    <Reveal direction="up" delay={0.05 * idx}>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-light border border-neutral-border">
                        <CheckCircle2 size={18} className="text-domenion-gold flex-shrink-0 mt-0.5" />
                        <span className="text-domenion-blue font-heading text-sm font-bold">{benefit}</span>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

