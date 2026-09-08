import Reveal from "../../common/Reveal";

export default function ServiceDetailCovers({ service }) {
  // Extract features or highlights or fallback to 6 structured scope points
  const rawFeatures = service.features || [];
  const coversList = rawFeatures.length >= 6
    ? rawFeatures.slice(0, 6).map((f, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: f.title,
        desc: f.text,
      }))
    : (service.highlights || []).length >= 6
    ? service.highlights.slice(0, 6).map((h, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: h,
        desc: "Specialized post order protection protocol.",
      }))
    : [
        { num: "01", title: "Access Control & Verification", desc: "Rigorous entry point management and personnel screening." },
        { num: "02", title: "Facility & Perimeter Patrols", desc: "Routine and random inspections to maintain total site security." },
        { num: "03", title: "Visitor & Logistics Management", desc: "Structured guest registration and asset tracking protocols." },
        { num: "04", title: "CCTV & Surveillance Monitoring", desc: "Continuous video monitoring and real-time incident detection." },
        { num: "05", title: "Rapid Emergency Response", desc: "Immediate dispatch for alarm activations and security events." },
        { num: "06", title: "Compliance & Daily Reporting", desc: "Detailed activity logs and regulatory compliance documentation." },
      ];

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHAT THIS SERVICE COVERS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Comprehensive scope built for <span className="text-domenion-gold">your operational environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Our scope encompasses physical guarding, electronic monitoring, and structured response procedures tailored specifically for {service.badge || "your organization"}.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 6-Item Numbered Scope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coversList.map((item, idx) => (
            <div key={item.num}>
              <Reveal direction="up" delay={0.06 * idx}>
                <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-domenion-gold font-heading text-lg font-extrabold">{item.num}</span>
                    <h3 className="text-domenion-blue font-heading text-lg font-bold group-hover:text-domenion-gold transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

