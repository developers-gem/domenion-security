import { ShieldCheck } from "lucide-react";
import Reveal from "../../common/Reveal";

export default function IndustryVisualBreak({ industry }) {
  const breakStatement = industry.badge
    ? `PROTECTION BUILT FOR ${industry.badge}.`
    : "PROTECTION BUILT FOR THE REAL WORLD.";

  return (
    <section className="relative py-24 sm:py-32 bg-domenion-blue text-white overflow-hidden text-center border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(${industry.benefitsImage || industry.heroImage || "/images/company-security.jpg"})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <Reveal direction="fade">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-6">
              <ShieldCheck size={16} className="text-domenion-gold" />
              <span>DOMENION OPERATIONAL EXCELLENCE</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-white font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {breakStatement}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
              Dependable security guard presence, 24/7 rapid emergency dispatch, and custom
              post order enforcement tailored around your facility.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

