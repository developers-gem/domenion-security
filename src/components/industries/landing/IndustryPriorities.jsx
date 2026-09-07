import Reveal from "../../common/Reveal";

const PRIORITIES_DATA = [
  { num: "01", title: "ACCESS & CONTROL", desc: "Verifying credentials, visitor logs, and perimeter entry points across all shift hours." },
  { num: "02", title: "PEOPLE & ASSET PROTECTION", desc: "Safeguarding employees, visitors, patients, residents, and high-value physical inventory." },
  { num: "03", title: "THREAT AWARENESS", desc: "Continuous surveillance monitoring and proactive risk detection before breaches occur." },
  { num: "04", title: "OPERATIONAL CONTINUITY", desc: "Mitigating security interruptions to keep essential facility operations running smoothly." },
  { num: "05", title: "SITE SECURITY", desc: "Routine perimeter checks, vehicle patrols, and secure keyholding procedures." },
  { num: "06", title: "RESPONSE READINESS", desc: "24/7 emergency dispatch and standardized incident escalation protocols." },
];

export default function IndustryPriorities() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">SECURITY PRIORITIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Core priorities across <span className="text-domenion-gold">every protected sector.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Regardless of industry type, Domenion Security structures every operational program around 6 core security pillars.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 6 Editorial Horizontal Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIORITIES_DATA.map((item, idx) => (
            <div key={item.num}>
              <Reveal direction="up" delay={0.06 * idx}>
                <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-border">
                    <span className="text-domenion-gold font-heading text-2xl font-extrabold">{item.num}</span>
                    <h3 className="text-domenion-blue font-heading text-sm font-bold tracking-wider">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

