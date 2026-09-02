import { ShieldCheck, Quote } from "lucide-react";
import Reveal from "../common/Reveal";

export default function SecurityPhilosophy() {
  return (
    <section className="relative py-24 sm:py-32 bg-domenion-blue text-white overflow-hidden text-center border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/data-center-security.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <Reveal direction="fade">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-6">
              <ShieldCheck size={16} className="text-domenion-gold" />
              <span>DOMENION SECURITY PHILOSOPHY</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <Quote size={40} className="text-domenion-gold/40 mb-4" />
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <blockquote className="text-white font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold italic leading-relaxed mb-6">
              "Protection is more than presence. It is preparation, discipline, and the
              unwavering ability to respond when it matters most."
            </blockquote>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">DOMENION SECURITY OPERATIONAL STANDARD</span>
              <span className="text-white/70 text-xs font-medium">Preparedness • Readiness • Trust</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

